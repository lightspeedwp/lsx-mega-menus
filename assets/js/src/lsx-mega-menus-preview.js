(function( wp, $ ){
	if ( ! wp || ! wp.customize ) { return; }

	var api = wp.customize;

	api.LSXMMPreview = {
		init: function () {
			this.clearControlFocus();
		},

		/**
		 * Removes the default on hover title and clears the default shift+click
		 * event used to focus the widget control.
		 */
		clearControlFocus: function() {
			var selector = '.lsxmm-mega-menu .widget';

			$( selector ).removeAttr( 'title' );
			$( selector ).on( 'click', function() {
				return false;
			} );
		}
	};

	$(function () {
		api.LSXMMPreview.init();
	});
})( window.wp, jQuery );
