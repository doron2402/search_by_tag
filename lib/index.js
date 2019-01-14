'use strict';

const { _isString, _buildQuery, CONSTANTS } = require('./common');

const searchByTags = (tags) => {

  const response = {};

  response[CONSTANTS.EQUAL_AND] = [];
  response[CONSTANTS.EQUAL_OR] = [];
  response[CONSTANTS.NOT_EQUAL_AND] = [];

  if (Array.isArray(tags)) {
    // multiple tags
    tags.forEach((item) => {
      const {name, value} = _buildQuery(item);
      if (Array.isArray(value)) {
        response[name] = response[name].concat(value);
      } else {
        response[name].push(value);
      }

    });
  } else if (_isString(tags)) {
    // single tag
    const {name, value} = _buildQuery(tags);
    if (Array.isArray(value)) {
      response[name] = response[name].concat(value);
    } else {
      response[name].push(value);
    }
  }

  return response;
};

module.exports = { searchByTags };
