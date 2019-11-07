# README #
# sfra_demo

This is a sample repository that complements the Fast Path to B2C Developer Certification.  This program is available in the Partner Community (https://partners.salesforce.com/_ui/core/chatter/groups/GroupProfilePage?g=0F93A000000HYcs.

The goal is to provide sample files to showcase key concepts used in Storefront Reference Application (SFRA), Page Designer, Jobs Framework and OCAPI.

The examples cover these areas:
1. Extending controllers, models and scripts
2. Client-side Javascript that supports new data coming from an extended model
3. B2C Commerce form definition: newsletter.xml
4. Form ISML using attributes from the form definition
5. Form client-side javascript to submit form to controller and handle errors back from controller
6. Controller to show a form, handle submission coming from client-side, and sending back results to the client-side 
7. Implementation of CSRF (Cross Site Request Forgery) protection in controller and ISML file
8. Custom object (aka CO) creation (requires import of CO metadata, which is included)
9. Transaction handling in controller (saves data to persistent CO)
10. Use of a middleware event in controller: route:BeforeComplete
11. Use of Logger class to log an error when CO has not been defined
12 Use of steptypes.json to define a custom job step
13. Custom script specified in steptypes.json that deletes COs for a given CO type

# Getting Started

1. Clone this repository.
2. Install npm dependancies `npm install`.
3. Open package.json file and modify `paths.base` property to point to your locally installed app_storefront_base cartridge. The provided path assumes the storefront-reference-architecture folder is a sibling of sfra_demo folder.
4. Run `npm run compile:js` to compile client-side javascript.  There is no scss to compile.
5. Run `npm run uploadCartridge` if you have a properly configured dw.json with login credentials to your sandbox. Consult the storefront-reference-architecture repo for an example of this file.
6. In Business Manager, add sfra_demo to your site's cartridge path. The path must contain this cartridge in front of  app_storefront_base (which comes with SFRA).  Example: sfra_demo:app_storefront_base
7. In Business Manager, under Administration > Site Development > Import & Export, upload and import the newslettersubscription_co_metadata.xml.  This CO definition is required for the demo to work.
8. On a browser, invoke the Newsletter-Show route for in your site.  For example: https://<your_sandbox>/on/demandware.store/Sites-<your_site>-Site/en_US/Newsletter-Show.
9. To demonstrate a custom job step, add the sfra_demo cartridge to the Business Manager site cartridge path. 
   a. Create a new job using Administration -> Operations -> Jobs 
   b. Configure a job step: in the drop-down of steps, choose the custom.DeleteCustomObjects and provide the appropriate parameter.

# Compiling your application

* `npm run compile:js` - Compiles all js files and aggregates them.
* `npm run uploadCartridge` - Uploads the cartridge to your sandbox. A properly configured dw.json file is required (see initial commit for this repo to find a sample. Modify to point to your sandbox and active version).

# Testing
Since this is a demonstration cartridge, there are no automated tests.

# Contributing
Since this is a demonstration cartridge, suggestions for improvement are welcomed. Please contact jorge.hernandez@salesforce.com. Only properly commented code will be accepted.
