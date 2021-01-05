# 重学HTML

## HTML的定义
- 主要源流：XML 和 SGML
- html最早是SGML的一个子集，所以有SGML的DTD，DTD是SGML规定的定义它的子集的这样的文档的格式
- W3c想规范html。于是出来了XHTML，xhtml1.0对应HTML的4.2版本，是html4的严格模式
- HTML5 后：接受了 XML 和 SGML 灵感的一门独立语言
- SGML的DTD与XML的namespace
  - DTD
    - https://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd
      - 重点是实体定义见xhtml-lat1.ent
    - https://www.w3.org/TR/xhtml1/dtds.html
  - namaspace:
    - https://www.w3.org/1999/xhtml

## HTML标签语义
- 语义标签使用方法见wiki.html

## HTML语法
- **合法元素**
  - Element: `<tagName> </tagName>`
  - Text: `text`
  - Commont: `<!-- commonts -->`
  - DocumentType: `<!DOCTYPE html>`
  - ProcessingInstruction: `<?a 1?>`
    - 将数据 1 传给处理器 a
    - 预处理语法
  - CDATA: `<![CDATA[]]>`
    - 文本的另一种语法的表达
- **字符引用**
  - &#161; - `&#161;`
  - &amp; - `&amp;`
  - &lt; - `&lt;`
  - &quot; - `&quot;`
  - &apos; - `&apos;`
  - &#39; - `&#39;`


# 浏览器API

## DOM API
## 事件API
## Range API
## CSSOM
## CSSOM View
## 其它API