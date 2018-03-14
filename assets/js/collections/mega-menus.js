( function( wp, $ ) {

	'use strict';

	if ( ! wp || ! wp.customize ) { return; }

	// Set up our namespace.
	var api = wp.customize;

	api.LSXMM = api.LSXMM || {};

	/**
	 * wp.customize.LSXMM.MegaMenusCollection
	 *
	 * Collection for mega menus models.
	 *
	 * @constructor
	 * @augments Backbone.Model
	 */
	api.LSXMM.MegaMenusCollection = Backbone.Collection.extend({
		model: api.LSXMM.MegaMenuModel
	});

} )( window.wp, jQuery );