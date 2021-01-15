<?php
/*
 * Plugin Name: LSX Mega Menus
 * Plugin URI:  https://www.lsdev.biz/product/lsx-mega-menus/
 * Description: The LSX Mega Menus extension creates custom, full-width dropdown menus that contain images, widgets and more that seamlessly tie into your LSX WordPress site.
 * Version:     1.2.6
 * Author:      LightSpeed
 * Author URI:  https://www.lsdev.biz/
 * License:     GPL3
 * License URI: https://www.gnu.org/licenses/gpl-3.0.html
 * Text Domain: lsx-mega-menus
 * Domain Path: /languages
 */

// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
	die;
}


/**
 * Required functions
 */
require_once( 'includes/lsx-functions.php' );

/**
 * Returns the main instance of LSX_Mega_Menus to prevent the need to use globals.
 */
function LSX_Mega_Menus() {
	return LSX_Mega_Menus::instance();
}

LSX_Mega_Menus();

/**
 * Main LSX_Mega_Menus Class
 */
final class LSX_Mega_Menus {

	/**
	 * The single instance of LSX_Mega_Menus.
	 */
	private static $_instance = null;

	/**
	 * The token.
	 */
	public $token;

	/**
	 * The version number.
	 */
	public $version;

	/**
	 * Constructor function.
	 */
	public function __construct() {
		$this->token		= 'lsx-mega-menus';
		$this->plugin_url	= plugin_dir_url( __FILE__ );
		$this->plugin_path	= plugin_dir_path( __FILE__ );
		$this->version		= '1.2.5';

		// Register activation hook.
		register_activation_hook( __FILE__, array( $this, 'install' ) );

		// Load plugin text domain.
		add_action( 'init', array( $this, 'load_plugin_textdomain' ) );

		// Include all the necessary files.
		$this->setup();
	}

	/**
	 * Main LSX_Mega_Menus Instance
	 * Ensures only one instance of LSX_Mega_Menus is loaded or can be loaded.
	 */
	public static function instance() {
		if ( is_null( self::$_instance ) ) {
			self::$_instance = new self();
		}

		return self::$_instance;
	}

	/**
	 * Load the localisation file.
	 */
	public function load_plugin_textdomain() {
		load_plugin_textdomain( 'lsx-mega-menus', false, dirname( plugin_basename( __FILE__ ) ) . '/languages/' );
	}

	/**
	 * Installation.
	 * Runs on activation.
	 * Logs the version number and assigns a notice message to a WordPress option.
	 */
	public function install() {
		$this->_log_version_number();

		$url = admin_url() . 'customize.php?';
		$url .= 'url=' . urlencode( site_url() . '?lsx-mega-menus=true' );
		$url .= '&return=' . urlencode( admin_url() . 'plugins.php' );
		$url .= '&lsx-mega-menus=true';

		$notices = array();
		$notices[] = sprintf( esc_html__( '%sThanks for installing the LSX Mega Menus extension. To get started, visit the %sCustomizer%s.%s', 'lsx-mega-menus' ), '<p>', '<a href="' . $url . '">', '</a>', '</p>' );

		update_option( 'lsxmm_activation_notice', $notices );
	}

	/**
	 * Log the plugin version number.
	 */
	private function _log_version_number() {
		update_option( $this->token . '-version', $this->version );
	}

	/**
	 * Include all the necessary files.
	 * Only executes if LSX or a child theme using LSX as a parent is active and the extension specific filter returns true.
	 * Child themes can disable this extension using the lsx_mega_menus_supported filter
	 */
	public function setup() {
		$theme = wp_get_theme();

		/*
		Include admin all the time so that the LSXMM Sidebar stays
		registered even if you switch to a non supported theme.
		*/
		include_once( 'includes/class-lsxmm-admin.php' );

		if ( 'LSX' === $theme->name || 'lsx' === $theme->template && apply_filters( 'lsx_mega_menus_supported', true ) ) {
			add_action( 'admin_notices', array( $this, 'customizer_notice' ) );

			include_once( 'includes/class-lsxmm-customizer.php' );
			include_once( 'includes/class-lsxmm-frontend.php' );
		}
	}

	/**
	 * Display a notice linking to the Customizer
	 */
	public function customizer_notice() {
		$notices = get_option( 'lsxmm_activation_notice' );

		if ( $notices = get_option( 'lsxmm_activation_notice' ) ) {
			foreach ( $notices as $notice ) {
				echo '<div class="updated">' . $notice . '</div>';
			}

			delete_option( 'lsxmm_activation_notice' );
		}
	}

}
