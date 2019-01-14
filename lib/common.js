'use strict';

const isString = (str) => typeof str === "string" || str instanceof String;

const EQUAL_AND = 'eqAnd';
const EQUAL_OR = 'eqOr';
const NOT_EQUAL_AND = 'notEqAnd';


const buildQuery = (_tag) => {
  const res = {
    name: null,
    value: null
  };

  if (_tag.split(':')[0] === 'eq') {
    if (_tag.indexOf('|') > -1) {
      const tmp = [];
      // Using overlap operator && - have elements in common
      // tags=eq:a|b|c => get tags a or b or c
      _tag.split(':')[1].split('|').forEach((_eqTag) => {
        tmp.push(_eqTag);
      });
      res.name = EQUAL_OR;
      res.value = tmp;

    } else {
      // Using contains operator @> - all in query must be in item
      // tag=eq:a&tag=eq:b => tags must have `a` and `b`
      res.name = EQUAL_AND;
      res.value = _tag.split(':')[1];
    }
  }
  else if (_tag.split(':')[0] === 'not') {
    // We're only support `tag=not:a&tag=not:b`
    // We don't support `not:a|b`
    // must not be in item
    // tag=not:a&tag=not:b => tags must NOT have `a` and `b`
    res.name = NOT_EQUAL_AND;
    res.value = _tag.split(':')[1];
  }

  return res;
};

module.exports = {
  _isString: isString,
  _buildQuery: buildQuery,
  CONSTANTS: { EQUAL_AND, EQUAL_OR, NOT_EQUAL_AND }
};