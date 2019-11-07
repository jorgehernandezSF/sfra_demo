'use strict';

/**
 * Script file for rendering an assets.topsellertile component
 */

//Initialize constants
const Template = require('dw/util/Template');
const HashMap = require('dw/util/HashMap');
const URLUtils = require('dw/web/URLUtils');
const CatalogMgr = require('dw/catalog/CatalogMgr');
const ProductSearchModel = require('dw/catalog/ProductSearchModel');

/**
 * @function renderTopSeller
 * @description Helper function used to render the top seller product tile component.
 *
 * @param {Object} componentContext Represents the context object containing configurable component data used by the componentRenderer
 * @returns {String} Returns the mark-up string representing the specified component
 */
function renderTopSeller (componentContext) {
    // Initialize model: must be a HashMap
	let model = new HashMap();
    let content = componentContext.content;
    let category = content.category;

    // Initialize the sorting rule using top-sellers (or pass as a parameter?)
    let sortingRule = CatalogMgr.getSortingRule('top-sellers');

    let psm = new ProductSearchModel();
    psm.setCategoryID(category.ID);
    psm.setSortingRule(sortingRule);
    psm.search();

    var hits = psm.getProductSearchHits();

    // Initialize the product
    let product = null;
    while (hits.hasNext() && (!product || !product.isOnline())) {
        product = hits.next().getProduct();
    }
    
    // Fallback to product name in case no headline is explicitly given
    if (!content.headline && product) {
        content.headline = product.getName();
    }
    model.headline = content.headline;

    // If product exists, get the image
    if (product) {
        let images = product.getImages('large');
        let productImage = images.iterator().next();
        if (productImage) {
            model.image = {
                src : productImage.getAbsURL(),
                alt : productImage.getAlt()
            };
        }
        model.url = URLUtils.url('Product-Show', 'pid', product.ID);
    }

    // Show promotion message only if entered
    if (content.promotion_message) {
    	model.promotion_message = content.promotion_message;
    }
    
    // Render specific ISML (try rendering producttile?)
    return new Template('experience/components/my_assets/topsellertile').render(model).text;
};

//Export the view-renderer
module.exports.render = renderTopSeller;