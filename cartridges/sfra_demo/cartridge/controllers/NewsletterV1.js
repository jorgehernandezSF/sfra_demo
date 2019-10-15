'use strict';

var server = require('server');

server.get(
    'Show',
    server.middleware.https,
    function (req, res, next) {
        var actionUrl = dw.web.URLUtils.url('NewsletterV1-Handler');
        var newsletterForm = server.forms.getForm('newsletter');
        newsletterForm.clear();

        res.render('/newsletter/newslettersignupV1', {
            actionUrl: actionUrl,
            newsletterForm: newsletterForm
        });

        next();
    }
);

server.post(
    'Handler',
    server.middleware.https,
    function (req, res, next) {
    	var newsletterForm = server.forms.getForm('newsletter');
    	var continueUrl = dw.web.URLUtils.url('NewsletterV1-Show');

		// Perform any server-side validation before this point, and invalidate form accordingly
    	if (newsletterForm.valid) {
    		// Send back a success status, and a redirect to another route
            res.render('/newsletter/newslettersuccess', {
                continueUrl: continueUrl,
            	newsletterForm: newsletterForm
            });
    	} else {
    		// Handle server-side validation errors here: this is just an example
            res.render('/newsletter/newslettererror', {
                errorMsg: dw.web.Resource.msg('error.crossfieldvalidation', 'newsletter', null),
            	continueUrl: continueUrl
            });
    	}

        next();
    }
);

module.exports = server.exports();