( function( wp, $ ) {

	'use strict';

	if ( ! wp || ! wp.customize ) { return; }

	// Set up our namespace.
	var api = wp.customize;

	api.LSXMM = api.LSXMM || {};

	/**
	 * wp.customize.LSXMM.MegaMenuModel
	 *
	 * A single mega menu model.
	 *
	 * @constructor
	 * @augments Backbone.Model
	 */
	api.LSXMM.MegaMenuModel = Backbone.Model.extend({
		defaults: {
			item_id: null,
			active: true,
			widgets: null,
			fullscreen: true,
		},

		initialize: function() {
			var newObj, itemId = this.get( 'item_id' ), orderedWidgets;

			// Look for saved data
			jQuery.map( api.LSXMM.data.savedMegaMenus, function( obj ) {
				if ( obj.item_id === itemId ) {
					newObj = obj; // Or return obj.name, whatever.
				}
			});

			if ( newObj ) {

				// Sort widgets by row
				orderedWidgets = _.sortBy( newObj.widgets, 'y' );

				this.set({
					'widgets': new api.LSXMM.WidgetsCollection( orderedWidgets ),
					'active': newObj.active,
					'fullscreen': newObj.fullscreen
				});
			} else {
				this.set({
					'widgets': new api.LSXMM.WidgetsCollection()
				});
			}

			this.on( 'change', this.maybeChangeState );
		},

		maybeChangeState: function() {
			var isSaved = api.state( 'saved' ).get();

			if ( isSaved ) {

				// Change the customizer state to enaable the save button
				api.state( 'saved' ).set( false );
			}
		}

	});

} )( window.wp, jQuery );
