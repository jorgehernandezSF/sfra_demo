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
        var actionUrl = dw.web.URLUtils.url('NewsletterV2-Handler');
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

		// Perform any server-side validation before this point, and invalidate form accordingly.
    	if (newsletterForm.valid) {
    		// Show the success page
            res.json({
                success: true,
                redirectUrl: URLUtils.url('NewsletterV2-Success').toString()
            });
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
            continueUrl: URLUtils.url('NewsletterV2-Show'),
        	newsletterForm: server.forms.getForm('newsletter')
        });

        next();
    }
);

module.exports = server.exports();