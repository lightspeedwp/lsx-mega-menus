

var lsxMegaMenu = Object.create(null);

(function($, window, document, undefined) {
	"use strict";

	/**
	 * Detects the header height, and sets the full width menus accordingly.
	 *
	 * @package    lsx
	 * @subpackage scripts
	 */
	lsxMegaMenu.parseHeaderHeight = function() {
		let header       = jQuery('header');
		let menuSelector = '.wp-block-lsx-lsx-mega-menu.wp-block-navigation__submenu-container.has-width-full';

		if ( 0 < header.length && 0 < header.find( menuSelector ).length ) {

			let headerHeight = header.height();
			if ( jQuery('body').hasClass('admin-bar') ) {
				headerHeight = headerHeight + jQuery('#wpadminbar').height();
			}

			//check parent padding.
			let paddingCheck = 0;

			header.find( menuSelector ).each(function(){
				let adjustHeight = 0;
				if ( 0 === paddingCheck ) {
					let anchorBottom = jQuery(this).parent().offset().top + jQuery(this).parent().height();
					console.log( headerHeight - anchorBottom );
					adjustHeight = headerHeight - anchorBottom;
				}
				
				jQuery(this).css('top', ( headerHeight - adjustHeight ) );
			});
		}
	};

	/**
	 * On window load.
	 *
	 * @package    lsx
	 * @subpackage scripts
	 */
	$(document).on('ready', function () {
		lsxMegaMenu.parseHeaderHeight();
	});
})(jQuery, window, document);