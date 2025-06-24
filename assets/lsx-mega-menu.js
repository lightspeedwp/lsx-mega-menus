var lsxMegaMenu = Object.create(null);

(function($, window, document, undefined) {
	"use strict";

	/**
	 * Detects the header height, and sets the full width menus accordingly.
	 *
	 * @package    lsx
	 * @subpackage scripts
	 */
	lsxMegaMenu.addCSS = function( css ) {
		let header = jQuery('head');

		if ( 0 < header.length ) {
			let styleTag = '<style >' + css + '</style>';
			header.append( styleTag );
		}
	};

	/**
	 * On window load.
	 *
	 * @package    lsx
	 * @subpackage scripts
	 */
	$(window).on( 'load', function () {
		lsxMegaMenu.addCSS();
	});	
})(jQuery, window, document);