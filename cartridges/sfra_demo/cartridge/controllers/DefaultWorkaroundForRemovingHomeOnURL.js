'use strict';

var server = require('server');
server.extend(module.superModule);

var cache = require('*/cartridge/scripts/middleware/cache');
var pageMetaData = require('*/cartridge/scripts/middleware/pageMetaData');

server.replace('Start', cache.applyDefaultCache, function (req, res, next) {
    var URLUtils = require('dw/web/URLUtils');
    res.render('/home/homePage');
    next();
}, pageMetaData.computedPageMetaData);

//module.exports = server.exports();

