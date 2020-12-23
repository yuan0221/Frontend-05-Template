const css = require('css');

let currentToken = null;
let currentAttribute = null;

let stack = [{type: 'document', children: []}];
let currentTextNode = null;


// addCSSRule函数，把css规则暂存到一个数组里
let rules = [];
function addCSSRules(text) {
  var ast = css.parse(text);
  rules.push(...ast.stylesheet.rules);
}


function computeCSS(element) {
  // console.log(rules);
  // console.log("compute CSS for Element", element);
  // 获取父元素
  var elements = stack.slice().reverse();
  if(!element.computedStyle) {
    element.computedStyle = {};
  }

  function specificity(selector) {
    var p = [0, 0, 0, 0];
    var selectorParts = selector.split(' ');
    for(var part of selectorParts) {
      if(part.charAt(0) === '#') {
        p[1] += 1;
      } else if(part.charAt(0) === '.') {
        p[2] += 1;
      } else {
        p[3] += 1;
      }
    }
    return p;
  }

  function compare(sp1, sp2) {
    if(sp1[0] - sp2[0]) 
      return sp1[0] - sp2[0];
    if(sp1[1] - sp2[1]) 
      return sp1[1] - sp2[1];
    if(sp1[2] - sp2[2]) 
      return sp1[2] - sp2[2];

    return sp1[3] - sp2[3];
  }

  for(let rule of rules) {
    // 按空格分割选择器
    var selectorParts = rule.selectors[0].split(" ").reverse();

    if(!match(element, selectorParts[0])) 
      continue;

    let matched = false;

    var j = 1;
    for(var i = 0; i < elements.length; i++) {
      if(match(elements[i], selectorParts[j])) {
        j++;
      }
    }

    if(j >= selectorParts.length) 
      matched = true;

    if(matched) {
      // 如果匹配到，加入
      // console.log("Element", element, "matched rule", rule);

      var sp = specificity(rule.selectors[0]);
      var computedStyle = element.computedStyle;


      for(var declaration of rule.declarations) {
        if(!computedStyle[declaration.property]) 
          computedStyle[declaration.property] = {};

        if(!computedStyle[declaration.property].specificity) {
          computedStyle[declaration.property].value = declaration.value;
          computedStyle[declaration.property].specificity = sp;
        } else if(compare(computedStyle[declaration.property].specificity, sp) < 0) {
          computedStyle[declaration.property].value = declaration.value;
          computedStyle[declaration.property].specificity = sp;
        }
      }

      console.log(element.computedStyle);
    }
  }
}


function match(element, selector) {
  if(!selector || !element.attributes) 
    return false;

  if(selector.charAt(0) === '#') {
    var attr = element.attributes.filter(attr => attr.name === 'id')[0]
    if(attr && attr.value === selector.replace('#', '')) 
      return true;
  } else if(selector.charAt(0) === '.') {
    var attr = element.attributes.filter(attr => attr.name === 'class')[0]
    if(attr && attr.value === selector.replace('.', '')) 
      return true;
  } else {
    if(element.tagName === selector)
      return true;
  }
  return false;
}

function emit(token) {

  let top = stack[stack.length - 1];  

  if(token.type === 'startTag') {
    let element = {
      type: 'element',
      children: [],
      attributes: []
    }
    element.tagName = token.tagName;

    for(let p in token) {
      if(p !== 'type' && p !== 'tagName') {
        element.attributes.push({
          name: p,
          value: token[p]
        });
      }
    }

    computeCSS(element);

    top.children.push(element);
    // 建立父子关系，  便于后续获取一个元素的所有父元素
    element.parent = top;

    if(!token.isSelfClosing) 
      stack.push(element);

    currentTextNode = null;

  } else if(token.type === 'endTag') {
    if(top.tagName !== token.tagName) {
      throw new Error("Tag start end doesn't match!");
    } else {
      // 遇到style标签，执行添加css规则的操作
      // link标签，import样式忽略，只考虑内联，和style标签
      if(top.tagName === 'style') {
        addCSSRules(top.children[0].content);
      }
      stack.pop();
    }
    currentTextNode = null;
  } else if(token.type === 'text') {
    if(currentTextNode === null) {
      currentTextNode = {
        type: 'text',
        content: ''
      }
      top.children.push(currentTextNode);
    }
    currentTextNode.content += token.content;
  }
}


const EOF = Symbol('EOF');  //EOF: End Of File

function data(c) {
  if(c === '<') {
    // <html>
    // 调试看到tagOpen不把c传出去，这样下次进来的字符就是从'h'开始
    return tagOpen;
  } else if(c == EOF) {
    emit({
      type: 'EOF'
    });
    return ;
  } else {
    emit({
      type: 'text',
      content: c
    });
    return data;
  }
}

function tagOpen(c) {
  if(c === '/') {
    // </html>
    // endTagOpen不把c传出去，这样下次进来的字符就是从'h'开始
    return endTagOpen;
  } else if(c.match(/^[a-zA-Z]$/)) {
    currentToken = {
      type: 'startTag',
      tagName: ''
    }
    return tagName(c);
  } else {
    emit({
      type: 'text',
      content: c
    })
    return ;
  }
}

function endTagOpen(c) {
  if(c.match(/^[a-zA-Z]$/)) {
    currentToken = {
      type: 'endTag',
      tagName: ''
    }
    return tagName(c);
  } else if(c === '>') {

  } else if(c == EOF) {
    
  } else {

  }
}

function tagName(c) {
  // html中有四种有效的空白符
  // \t tab符
  // \n 换行符
  // \f 走纸换页符
  // 正常空格
  if(c.match(/^[\t\n\f ]$/)) {
    return beforeAttributeName;
  } else if(c === '/') {
    return selfClosingStartTag;
  } else if(c.match(/^[a-zA-Z]$/)) {
    currentToken.tagName += c;
    return tagName;
  } else if(c === '>') {
    emit(currentToken);
    return data;
  } else {
    return tagName;
  }
}


// 处理属性
function beforeAttributeName(c) {
  if(c.match(/^[\t\n\f ]$/)) {
    return beforeAttributeName;
  } else if(c === '/' || c === '>' || c == EOF) {
    return afterAttributeName(c);
  } else if(c === '=') {
    return beforeAttributeName;
  } else {
    currentAttribute = {
      name: '',
      value: ''
    }
    return attributeName(c);
  }
}

function afterAttributeName(c) {
  if(c.match(/^[\t\n\f ]$/)) {
    return afterAttributeName;
  } else if(c === '/') {
    return selfClosingStartTag;
  } else if(c === '=') {
    return beforeAttributeValue;
  } else if(c === '>') {
    currentToken[currentAttribute.name] = currentAttribute.value;
    emit(currentToken);
    return data;
  } else if(c == EOF) {

  } else {
    currentToken[currentAttribute.name] = currentAttribute.value;
    currentAttribute = {
      name: '',
      value: ''
    };
    return attributeName(c); 
  }
}

function attributeName(c) {
  if(c.match(/^[\t\n\f ]$/) || c === '/' || c === '>' || c == EOF) {
    return afterAttributeName(c);
  } else if(c === '=') {
    return beforeAttributeValue;
  } else if(c === '\u0000') {

  } else if(c === "\"" || c === "'" || c === "<") {

  } else {
    currentAttribute.name += c;
    return attributeName;
  }
}

function beforeAttributeValue(c) {
  if(c.match(/^[\t\n\f ]$/) || c === '/' || c === '>' || c == EOF) {
    return beforeAttributeValue;
  } else if(c === "\"") {
    return doubleQuotedAttributeValue;
  } else if(c === "\'") {
    return singleQuotedAttributeValue;
  } else if(c === '>') {

  } else {
    return UnquotedAttributeValue(c);
  }
}

function doubleQuotedAttributeValue(c) {
  if(c === "\"") {
    currentToken[currentAttribute.name] = currentAttribute.value;
    return afterQuotedAttributeValue;
  } else if(c === '\u0000') {

  } else if(c == EOF) {

  } else {
    currentAttribute.value += c;
    return doubleQuotedAttributeValue;
  }
}

function singleQuotedAttributeValue(c) {
  if(c === "\'") {
    currentToken[currentAttribute.name] = currentAttribute.value;
    return afterQuotedAttributeValue;
  } else if(c === '\u0000') {

  } else if(c == EOF) {

  } else {
    currentAttribute.value += c;
    return doubleQuotedAttributeValue;
  }
}

function afterQuotedAttributeValue(c) {
  if(c.match(/^[\t\n\f ]$/)) {
    return beforeAttributeName;
  } else if(c === '/') {
    return selfClosingStartTag;
  } else if(c === '>') {
    currentToken[currentAttribute.name] = currentAttribute.value;
    emit(currentToken);
    return data;
  } else if(c == EOF) {

  } else {
    currentAttribute.value += c;
    return doubleQuotedAttributeValue;
  }
}

function UnquotedAttributeValue(c) {
  if(c.match(/^[\t\n\f ]$/)) {
    currentToken[currentAttribute.name] = currentAttribute.value;
    return beforeAttributeName;
  } else if(c === '/') {
    currentToken[currentAttribute.name] = currentAttribute.value;
    return selfClosingStartTag;
  } else if(c === '>') {
    currentToken[currentAttribute.name] = currentAttribute.value;
    emit(currentToken);
    return data;
  } else if(c === '\u0000') {

  } else if(c === "\"" || c === "'" || c === "<" || c === "=" || c === "`") {

  } else if(c == EOF) {

  } else {
    currentAttribute.value += c;
    return UnquotedAttributeValue;
  }
}

function selfClosingStartTag(c) {
  if(c === '>') {
    currentToken.isSelfClosing = true;
    emit(currentToken);
    return data;
  }  else if(c == EOF) {

  } else {

  }
}

module.exports.parseHTML = function parseHTML(html) {
  let state = data;
  for(let c of html) {
    state = state(c);
  }
  state = state(EOF);
  console.log(stack[0]);
}