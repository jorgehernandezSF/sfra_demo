'use strict';

var server = require('server');
var URLUtils = require('dw/web/URLUtils');
//Use the following for CSRF protection: add middleware in routes and hidden field on form
var csrfProtection = require('*/cartridge/scripts/middleware/csrf');

server.get(
    'Show',
    server.middleware.https,
    csrfProtection.generateToken,
    function (req, res, next) {
        var actionUrl = URLUtils.url('NewsletterV3-Handler');
        var newsletterForm = server.forms.getForm('newsletter');
        newsletterForm.clear();

        res.render('/newsletter/newslettersignup', {
            actionUrl: actionUrl,
            newsletterForm: newsletterForm
        });

        next();
    }
);

server.post(
    'Handler',
    csrfProtection.validateAjaxRequest,
    server.middleware.https,
    function (req, res, next) {
    	var newsletterForm = server.forms.getForm('newsletter');
		var CustomObjectMgr = require('dw/object/CustomObjectMgr');

		// Perform any server-side validation before this point, and invalidate form accordingly.
    	if (newsletterForm.valid) {
    		//var Transaction = require('dw/system/Transaction');
            try {
                //Transaction.wrap(function () {
                var CustomObject = CustomObjectMgr.createCustomObject('NewsletterSubscription', newsletterForm.email.value);
        	    CustomObject.custom.firstName = newsletterForm.fname.value;
        	    CustomObject.custom.lastName = newsletterForm.lname.value;

                res.json({
                    success: true,
                    redirectUrl: URLUtils.url('NewsletterV3-Success').toString()
                });
                //});
            } catch (e) {
            	var err = e;
            	var Resource = require('dw/web/Resource');
            	if (err.javaName === "MetaDataException") {
            		/* Duplicate primary key on CO: send back message to client-side, but don't log error. 
            		   This is possible if the user tries to subscribe with the same email multiple times */
                	res.json({
                		success: false,
                        error: [Resource.msg('error.subscriptionexists', 'newsletter', null)]
                    });
            	} else {
                    /* Missing CO definition: Log error with message for site admin, set the response to error, 
            		   and send error page URL to client-side */
            		var Logger = require('dw/system/Logger');
            		Logger.getLogger("newsletter subscription").error(Resource.msg('error.customobjectmissing', 'newsletter', null));
            		// Show Newsletter error page: there is nothing else to do
                    res.setStatusCode(500);
                    res.json({
                        error: true,
                        redirectUrl: URLUtils.url('Error-Start').toString()
                    });
            	}
            }
    	} else {
    		// Handle server-side validation errors here: this is just an example
            res.setStatusCode(500);
            res.json({
        		success: false,
                error: [Resource.msg('error.crossfieldvalidation', 'newsletter', null)]
            });
    	}

        next();
    }
);

server.get(
    'Success',
    server.middleware.https,
    function (req, res, next) {
        res.render('/newsletter/newslettersuccess', {
            continueUrl: URLUtils.url('NewsletterV3-Show'),
        	newsletterForm: server.forms.getForm('newsletter')
        });

        next();
    }
);

module.exports = server.exports();