'use strict';

var server = require('server');
var x = require('*/cartridge/controllers/AppendExample');

server.extend(x);
server.append('Start', function(req, res, next) {
	var viewdata = res.getViewData() 
	res.setViewData({ param1: 	viewdata.param1 + ' and now AppendExample2 extends the first one' });
	res.render("pdictexample");
	next();
});

module.exports = server.exports();
