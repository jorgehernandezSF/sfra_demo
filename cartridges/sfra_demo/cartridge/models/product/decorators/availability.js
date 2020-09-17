'use strict';

var Resource = require('dw/web/Resource');

var base = module.superModule;

module.exports = function (object, quantity, minOrderQuantity, availabilityModel) {
    // Invoke the availability model on the base
    base.call(this, object, quantity, minOrderQuantity, availabilityModel);

    // Define a new property in the model with ATS as its value
    Object.defineProperty(object, 'ats', {
        enumerable: true,
        value: getATSMessage(availabilityModel)
    });
};

function getATSMessage(availabilityModel) {
    var ATS = {};
    ATS.messages = [];
    var inventoryRecord = availabilityModel.inventoryRecord;

    // Add a new message to the array of availability messages (just like the base does)
    if(inventoryRecord) {
        ATS.messages.push(
            Resource.msgf(
                'label.quantity.in.stock',
                'common',
                null,
                inventoryRecord.ATS.value
            )
        );
    }

    return ATS;
}