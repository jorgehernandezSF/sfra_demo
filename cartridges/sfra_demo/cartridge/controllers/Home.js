'use strict';

var server = require('server');
var cache = require('*/cartridge/scripts/middleware/cache');

//extend Home controller functionality using the extend method
server.extend(module.superModule);

//insert functionality before the Show route using server.prepend
server.prepend('Show', cache.applyDefaultCache, function (req, res, next) {
	var viewData = res.getViewData();
	viewData.param1 = 'This is from prepend';
	res.setViewData(viewData);
	next();
});

/* 
 * Reuse the viewData from the prepend, and append new data + a query parameter value
 * Also, use a custom middleware method: it extends the base cache.js script
*/
server.append('Show', cache.applyCustomCache, function (req, res, next) {
	var viewData = res.getViewData();
	//declare param1 as a variable that equals 'General company details.'
    var appendParam = 'This is from append';
    var queryparam = req.querystring.param ? req.querystring.param : "no parameter was passed";

	//Here grab whatever prepend added to viewData + the message here + the optional query string param
	res.setViewData({
		param1: viewData.param1 + ' AND ' + appendParam + ' AND querystring param = ' + queryparam,
		param2: res.cachePeriod + ' ' + res.cachePeriodUnit
	});
	next();
});

module.exports = server.exports();
