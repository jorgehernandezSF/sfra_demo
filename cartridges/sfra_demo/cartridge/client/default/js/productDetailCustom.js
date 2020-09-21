'use strict';
var base = require('base/product/base');

function updateAvailability(e, response) {
	var availabilityValue = '';
	var availabilityMessages = response.product.ats.messages;
	if (!response.product.readyToOrder) {
	    availabilityValue = '<li><div>' + response.resources.info_selectforstock + '</div></li>';
	} else {
	    availabilityMessages.forEach(function (message) {
	        availabilityValue += '<li><div>' + message + '</div></li>';
	    });
	}

	$('div.availability', response.$productContainer)
	    .data('ready-to-order', response.product.readyToOrder)
	    .data('available', response.product.available);

	$('.availability-msg', response.$productContainer)
	    .empty().html(availabilityValue);

	if ($('.global-availability').length) {
	    var allAvailable = $('.product-availability').toArray()
	        .every(function (item) { return $(item).data('available'); });

	    var allReady = $('.product-availability').toArray()
	        .every(function (item) { return $(item).data('ready-to-order'); });

	    $('.global-availability')
	        .data('ready-to-order', allReady)
	        .data('available', allAvailable);

	    $('.global-availability .availability-msg').empty()
	        .html(allReady ? response.message : response.resources.info_selectforstock);
	}
}

$(document).ready(function () {
    $('body').off('product:updateAvailability').on('product:updateAvailability', updateAvailability);
    base.updateAvailability = updateAvailability;
    module.exports = base;
});