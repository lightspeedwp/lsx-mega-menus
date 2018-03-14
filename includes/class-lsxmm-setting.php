<?php
if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * LSX Mega Menus Settings Class
 *
 * @package   LSX Mega Menus
 * @author    LightSpeed
 * @license   GPL3
 * @link
 * @copyright 2018 LightSpeed
 */
class LSXMM_Mega_Menu_Setting extends WP_Customize_Setting {

	const ID_PATTERN = '/^mega_menu\[(?P<id>-?\d+)\]$/';

	const TYPE = 'mega_menu';

	/**
	 * Setting type.
	 */
	public $type = self::TYPE;

	/**
	 * Default transport.
	 */
	public $transport = 'refresh';

	/**
	 * Whether or not preview() was called.
	 */
	protected $is_previewed = false;

	/**
	 * Storage of pre-setup menu item to prevent wasted calls to wp_setup_nav_menu_item().
	 */
	protected $value;

	/**
	 * Id of the menu item being previewed.
	 */
	protected $item_id;

	/**
	 * Handle previewing the setting.
	 */
	public function preview() {
		if ( $this->is_previewed ) {
			return;
		}

		$this->is_previewed = true;
		$undefined  = new stdClass(); // Symbol.
		$post_value = $this->post_value( $undefined );

		if ( $undefined === $post_value ) {
			$value = $this->_original_value;
		} else {
			$value = $post_value;
		}

		$this->value = $value;

		if ( ! isset( $this->value['item_id'] ) || '' === $this->value['item_id'] ) {
			return;
		}

		$this->item_id = intval( $this->value['item_id'] );

		add_filter( 'default_option_LSXMM_DATA', array( $this, 'filter_lsxmm_data' ) );
		add_filter( 'option_LSXMM_DATA', array( $this, 'filter_lsxmm_data' ) );
		add_filter( 'lsx_nav_menu_css_class', array( $this, 'add_dropdown_preview_class' ), 10, 4 );
	}

	/**
	 * Nothing to update.
	 */
	public function update( $value ) {}

	/**
	 * Sanitize data from customizer to be used on a filter.
	 */
	public function filter_lsxmm_data( $data ) {
		if ( ! $data ) {
			$lsxmm_data = array();
		} else {
			$lsxmm_data = $data;
		}

		$preview_data = $this->value;
		$mega_menu = array();

		if ( isset( $preview_data['active'] ) && true === $preview_data['active'] ) {
			$mega_menu['active'] = true;
		} else {
			$mega_menu['active'] = false;
		}

		$mega_menu['widgets'] = array();

		if ( isset( $preview_data['widgets'] ) && is_array( $preview_data['widgets'] ) ) {
			foreach ( $preview_data['widgets'] as $widget ) {
				if ( ! isset( $widget['id'] ) || '' === sanitize_text_field( $widget['id'] ) ) {
					continue;
				}

				$mega_menu['widgets'][] = array(
					'id' => sanitize_text_field( $widget['id'] ),
					'x'  => intval( $widget['x'] ),
					'y'  => intval( $widget['y'] ),
					'w'  => intval( $widget['w'] ),
					'h'  => intval( $widget['h'] ),
				);
			}
		}

		if ( ! empty( $mega_menu ) ) {
			if ( array_key_exists( $this->item_id, $lsxmm_data ) ) {
				unset( $lsxmm_data[ $this->item_id ] );
			}

			$lsxmm_data[ $this->item_id ] = $mega_menu;
		}

		return $lsxmm_data;
	}

	public function add_dropdown_preview_class( $classes, $item, $args = array(), $depth = 0 ) {
		if ( $this->item_id === $item->ID ) {
			$classes[] = 'lsxmm-doing-preview';
		}

		return array_filter( $classes );
	}

}
