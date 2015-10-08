'use strict';

const ms = require('ms');
const _ = require('lodash');

function toCacheControl(options) {
  let headerValue = options.private? 'private': 'public';

  if (_.isNumber(options.maxAge)) {
    headerValue += `, max-age=${options.maxAge}`;
  } else if (_.isString(options.maxAge)) {
    const milliseconds = ms(options.maxAge);
    if (_.isUndefined(milliseconds)) {
      throw new Error(`Invalid unit for max-age: "${options.maxAge}"`);
    }
    headerValue += `, max-age=${(milliseconds / 1000)}`;
  }

  if (options.noCache) {
    headerValue += ', no-cache';
  }

  if (options.noStore) {
    headerValue += ', no-store';
  }

  if (options.mustRevalidate) {
    headerValue += ', must-revalidate';
  }

  return headerValue;
}

function withCacheControl(options) {
  const headerValue = toCacheControl(options);
  return function cacheControlMiddlware(req, res, next) {
    res.set('Cache-Control', headerValue);
    next();
  };
}

module.exports = {
  toCacheControl,
  withCacheControl,
  noCache: withCacheControl({noCache: true, mustRevalidate: true, maxAge: 0})
};
