'use strict';


const assert = require('assert');
const { searchByTags } = require('../lib');

describe('Search By Tag', function() {
  describe('When url is tag=eq:a|b&tag=eq:c&tag=not:d', function() {
    it('Should return a record that equal to c and (a or b) and not d', function(done) {
      const res = searchByTags(['eq:a|b', 'eq:c', 'not:d']);
      assert.deepEqual(res.eqAnd, ['c']);
      assert.deepEqual(res.eqOr, ['a','b']);
      assert.deepEqual(res.notEqAnd, ['d']);
      done();
    });
  });

  describe('When url is a single tag', function() {
    describe('tag=eq:a', function() {
      it('Should check if tags include `a`', function(done) {
        const res = searchByTags('eq:a');
        assert.deepEqual(res.eqAnd, ['a']);
        done();
      });
    });

    describe('tag=eq:a|b', function() {
      it('Should check if tags include `a` or `b`', function(done) {
        const res = searchByTags('eq:a|b');
        assert.deepEqual(res.eqOr, ['a','b']);
        done();
      });
    });

    describe('tag=not:a', function() {
      it('Should check if tags not include `a`', function(done) {
        const res = searchByTags('not:a');
        assert.deepEqual(res.notEqAnd, ['a']);
        done();
      });
    });
  });
});
