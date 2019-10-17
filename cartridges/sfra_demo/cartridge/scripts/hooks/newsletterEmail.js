'use strict';

exports.send = function (customerEmail, templateContext) {
    var HashMap = require('dw/util/HashMap');
    var Mail = require('dw/net/Mail');
    var Resource = require('dw/web/Resource');
    var Site = require('dw/system/Site');
    var Template = require('dw/util/Template');

    var context = new HashMap();
    var email = new Mail();
    var template = new Template('/newsletter/confirmationEmail');
    var content = template.render(context).text;

    email.addTo(customerEmail);
    email.setFrom(Site.current.getCustomPreferenceValue('customerServiceEmail') || 'no-reply@salesforce.com');
    email.setSubject(Resource.msg('newsletter.confirmation.subject', 'newsletter', null));
    email.setContent(content, 'text/html', 'UTF-8');
    email.send();
}