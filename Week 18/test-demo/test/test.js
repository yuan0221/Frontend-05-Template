var assert = require('assert');
// const add = require("../add.js");
import {add} from "../add.js";

describe('add function test', function() {
  it('1+2 should be 3', function() {
    assert.equal(add(1, 2), 3);
  });
  
  it('1+3 should be 4', function() {
    assert.equal(add(1, 3), 4);
  });
})
