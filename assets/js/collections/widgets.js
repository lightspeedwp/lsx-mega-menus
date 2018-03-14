( function( wp, $ ) {

	'use strict';

	if ( ! wp || ! wp.customize ) { return; }

	// Set up our namespace.
	var api = wp.customize;

	api.LSXMM = api.LSXMM || {};

	/**
	 * wp.customize.LSXMM.WidgetsCollection
	 *
	 * Collection for widget models.
	 *
	 * @constructor
	 * @augments Backbone.Model
	 */
	api.LSXMM.WidgetsCollection = Backbone.Collection.extend({
		model: api.LSXMM.WidgetModel
	});

} )( window.wp, jQuery );