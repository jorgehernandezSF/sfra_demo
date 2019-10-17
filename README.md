# README #
# plugin_newsletter

This is a sample repository to show how to implement a simple form in SFRA.
The plugin demonstrates several B2C Commerce concepts in one easy to follow example:
1. B2C Commerce form definition: newsletter.xml
2. Form ISML using attributes from the form definition
3. Form client-side javascript to submit form to controller and handle errors back from controller
4. Controller to show the form and handle submission
5. Implementation of CSRF (Cross Site Request Forgery) protection in controller and ISML file
6. Custom object (aka CO) creation (requires import of CO metadata, which is included)
7. Transaction handling in controller (saves data to persistent CO)
8. Use of a middleware event in controller: BeforeComplete
9. Use of Logger class to log an error when CO has not been defined
10. Sending validation error message back to the client-side

# Getting Started

1. Clone this repository.
2. Install npm dependancies `npm install`.
3. Open package.json file and modify `paths.base` property to point to your local app_storefront_base cartridge.
4. Run `npm run compile:js` to create client-side assets.  There is no scss to compile.
5. Run `npm run uploadCartridge` if you have a properly configured dw.json with login credentials to your SB
6. In Business Manager, add the plugin_newsletter cartridge to your site's cartridge path. The path must contain the SFRA base cartridge app_storefront_base.
7. In Business Manager, under Administration > Site Development > Import & Export, upload and import the newslettersubscription_co_metadata.xml.  This custom object definition is required for the demo to work.
8. On a browser, invoke the Newsletter-Show route for in your site.  For example: https://<your_sandbox>/on/demandware.store/Sites-<your_site>-Site/en_US/Newsletter-Show.

# NPM scripts
Use the provided NPM scripts to compile and upload changes to your Sandbox.

## Compiling your application

* `npm run compile:js` - Compiles all js files and aggregates them.
* `npm run uploadCartridge` - Uploads the cartridge to your sandbox. A properly configured dw.json file is required (see initial commit for this repo to find a sample. Modify to point to your sandbox and active version).

# Testing
Since this is a demonstration plugin, there are no automated tests.

# Contributing
Since this is a demonstration plugin, suggestions for improvement are welcomed. Please contact jorge.hernandez@salesforce.com. Only properly commented code will be accepted.
