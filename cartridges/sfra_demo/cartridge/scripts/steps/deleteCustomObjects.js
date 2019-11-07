'use strict';

var CustomObjectMgr = require('dw/object/CustomObjectMgr');
var Transaction = require('dw/system/Transaction');

/**
 * @function deleteCOs
 * @description Function that deletes all custom object for a CO type passed as a parameter.
 *
 * @param {Object} parameters Represents the parameters defined in the steptypes.json file
 */
module.exports = {
	deleteCOs : function deleteCOs(parameters) {

		var iterator = require('dw/util/Iterator');
		
		//Search COs by type only, no query string, no sorting
		iterator = CustomObjectMgr.queryCustomObjects(parameters.CustomObjectType, '', null);
		
		while (iterator.hasNext()) {
			var customObject = iterator.next();
			Transaction.wrap(function () {
			    CustomObjectMgr.remove(customObject);
			});	
		}
	}
};