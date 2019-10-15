'use strict';

var base = module.superModule;

function applyCustomCache(req, res, next) {
    res.cachePeriod = 6; // eslint-disable-line no-param-reassign
    res.cachePeriodUnit = 'hours'; // eslint-disable-line no-param-reassign
    next();
}

base.applyCustomCache = applyCustomCache;

module.exports = base;