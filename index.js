
'use strict';

const UnitMultiplier = { };

UnitMultiplier.seconds =  1;
UnitMultiplier.minutes =  60 * UnitMultiplier.seconds;
UnitMultiplier.hours   =  60 * UnitMultiplier.minutes;
UnitMultiplier.days    =  24 * UnitMultiplier.hours;
UnitMultiplier.weeks   =  7 * UnitMultiplier.days;
UnitMultiplier.months  =  30 * UnitMultiplier.days;
UnitMultiplier.years   =  365 * UnitMultiplier.days;

function toSeconds(amount, unit) {
  if (unit in UnitMultiplier) {
    return UnitMultiplier[unit] * amount;
  } else {
    throw new Error('Invalidad Unit: ' + unit);
  }
}

function toCacheControl(options) {
  let headerValue = options.private? 'private': 'public';

  if (options.maxAge) {
    const maxAgeInSeconds = toSeconds(options.maxAge, options.unit || 'seconds');
    headerValue += ', max-age= ' + maxAgeInSeconds;
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
  return function(req, res, next) {
    res.header('Cache-Control', headerValue);
    next();
  }
}

module.exports = {
  toCacheControl: toCacheControl,
  withCacheControl: withCacheControl
}
