var assert = require('assert');
import {parseHTML} from "../src/parser.js";

describe('parse html:', function() {
  it('<a>asd</a>', function() {
    parseHTML('<a>asd</a>');
    assert.equal(1, 1);
  });
})