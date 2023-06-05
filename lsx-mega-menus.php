<?php
/*
 * Plugin Name: LSX Mega Menus
 * Plugin URI:  https://www.lsdev.biz/product/lsx-mega-menus/
 * Description: The LSX Mega Menus extension creates custom, full-width dropdown menus that contain images, widgets and more that seamlessly tie into your LSX WordPress site.
 * Version:     2.0.0
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

define('LSX_MEGAMENU_PATH', plugin_dir_path(__FILE__));
define('LSX_MEGAMENU_CORE', __FILE__);
define('LSX_MEGAMENU_URL', plugin_dir_url(__FILE__));
define('LSX_MEGAMENU_VER', '2.0.0');

require_once LSX_MEGAMENU_PATH . 'includes/class-core.php';

/**
 * Returns the main instance of LSX_Mega_Menus to prevent the need to use globals.
 * 
 * @return object \LSX\MegaMenus\Core();
 */
function LSX_Mega_Menus() {
	global $lsx_mega_menu;
	if ( null === $lsx_mega_menu ) {
		$lsx_mega_menu = new \LSX\MegaMenus\Core();
		$lsx_mega_menu->init();
	}
	return $lsx_mega_menu;
}

LSX_Mega_Menus();
