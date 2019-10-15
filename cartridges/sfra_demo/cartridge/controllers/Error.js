'use strict';

var server = require('server');
server.extend(module.superModule);

server.append('Start', function (req, res, next) {

    var viewData = res.getViewData();
    viewData.demo1 = {
        testVar: 'Demo1 cartridge appending to error page'
    };
    res.setViewData(viewData);

    next();
});

module.exports = server.exports();
