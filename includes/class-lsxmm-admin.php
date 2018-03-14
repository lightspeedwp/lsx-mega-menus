<?php
if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * LSX Mega Menus Admin Class
 *
 * @package   LSX Mega Menus
 * @author    LightSpeed
 * @license   GPL3
 * @link
 * @copyright 2018 LightSpeed
 */
class LSXMM_Admin {

	/**
	 * Constructor.
	 */
	public function __construct() {
		add_action( 'widgets_init', array( $this, 'register_lsxmm_sidebar' ), 5 );
		add_action( 'current_screen', array( $this, 'hide_sidebar' ) );
		add_filter( 'sidebars_widgets', array( $this, 'filter_widgets' ) );
	}

	/**
	 * Register LSXMM Sidebar.
	 */
	public function register_lsxmm_sidebar() {
		register_sidebar( array(
			'name'			=> esc_html__( 'LSXMM Sidebar', 'lsx-mega-menus' ),
			'id'			=> 'lsxmm-sidebar',
			'description'	=> esc_html__( 'Widgets in this area will be shown on all posts and pages.', 'lsx-mega-menus' ),
			'before_widget'	=> '<li id="%1$s" class="widget %2$s">',
			'after_widget'	=> '</li>',
			'before_title'	=> '<h2 class="widgettitle">',
			'after_title'	=> '</h2>',
		) );
	}

	/**
	 * Hide our sidebar from the widgets admin page.
	 */
	public function hide_sidebar() {
		global $wp_registered_sidebars;

		$current_screen = get_current_screen();

		if ( 'widgets' === $current_screen->id ) {
			if ( array_key_exists( 'lsxmm-sidebar', $wp_registered_sidebars ) ) {
				unset( $wp_registered_sidebars['lsxmm-sidebar'] );
			}
		}
	}

	/**
	 * Make sure LSXMM widgets don't show up in the inactive sidebar.
	 */
	public function filter_widgets( $widgets ) {
		global $pagenow;

		if ( isset( $pagenow ) && 'widgets.php' === $pagenow ) {
			if ( array_key_exists( 'lsxmm-sidebar', $widgets ) ) {
				unset( $widgets['lsxmm-sidebar'] );
			}
		}

		return $widgets;
	}

}

new LSXMM_Admin();
