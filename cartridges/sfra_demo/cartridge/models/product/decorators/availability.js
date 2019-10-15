'use strict';

var Resource = require('dw/web/Resource');

var base = module.superModule;

module.exports = function (object, quantity, minOrderQuantity, availabilityModel) {
    //invoke the availability model on the base
	base.call(this, object, quantity, minOrderQuantity, availabilityModel); 
	
	Object.defineProperty(object, 'ats', {
        enumerable: true,
        value: getATS(availabilityModel)
	});
};

function getATS (availabilityModel) {
    var availability = {};
    availability.messages = [];
    var inventoryRecord = availabilityModel.inventoryRecord;

    // Add a new message to the array of availability messages (just like the base does)
	if (inventoryRecord) {
        availability.messages.push(
            Resource.msgf(
                'label.quantity.in.stock',
                'common',
                null,
                inventoryRecord.ATS.value
            )
        ); 
	}
    
    return availability;
}