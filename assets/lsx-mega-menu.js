

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

			//check parent padding.
			let paddingCheck = 0;

			header.find( menuSelector ).each(function(){
				let adjustHeight = 0;
				let anchorBottom = 0;
				if ( 0 === paddingCheck ) {
					console.log(jQuery(this).parent().offset().top);
					console.log(jQuery(this).parent().height());
					anchorBottom = jQuery(this).parent().offset().top + jQuery(this).parent().height();
				}
				jQuery(this).css('top', anchorBottom );
			});
		}
	};

	/**
	 * On window load.
	 *
	 * @package    lsx
	 * @subpackage scripts
	 */
	$(window).on( 'load', function () {
		lsxMegaMenu.parseHeaderHeight();
	});	
})(jQuery, window, document);