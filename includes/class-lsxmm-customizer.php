<?php
if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * LSX Mega Menus Customizer Class
 *
 * @package   LSX Mega Menus
 * @author    LightSpeed
 * @license   GPL3
 * @link
 * @copyright 2018 LightSpeed
 */
class LSXMM_Customizer {

	/**
	 * Constructor.
	 */
	public function __construct() {
		add_action( 'customize_controls_enqueue_scripts', array( $this, 'enqueue_customizer_scripts' ) );
		add_action( 'customize_controls_print_footer_scripts', array( $this, 'print_configurator' ) );
		add_action( 'customize_controls_print_footer_scripts', array( $this, 'print_templates' ) );
		add_action( 'customize_controls_enqueue_scripts', array( $this, 'load_data' ) );
		add_action( 'init', array( $this, 'ajax_actions' ) );

		add_action( 'customize_register', array( $this, 'customizer_preview' ), 1 );
		add_action( 'customize_preview_init', array( $this, 'customize_preview_init' ), 999 );

		add_filter( 'pre_update_option_sidebars_widgets', array( $this, 'sidebars_widgets_save' ), 10, 2 );
		add_filter( 'option_sidebars_widgets', array( $this, 'sidebars_widgets_load' ) );
		//add_action( 'customize_register', array( $this, 'nav_menu_customizer_options' ) );
	}

	/**
	 * Register Ajax actions.
	 */
	public function ajax_actions() {
		add_action( 'wp_ajax_lsxmm-save-data', array( $this, 'save_data' ) );
	}

	/**
	 * Class file and filters to build dynamic settings to be used on the site preview.
	 */
	public function customizer_preview() {
		include_once( 'class-lsxmm-setting.php' );

		add_filter( 'customize_dynamic_setting_args', array( $this, 'filter_dynamic_setting_args' ), 10, 2 );
		add_filter( 'customize_dynamic_setting_class', array( $this, 'filter_dynamic_setting_class' ), 10, 3 );
	}

	/**
	 * Enqueue scripts and stylesheets.
	 */
	public function enqueue_customizer_scripts() {
		// Style.
		wp_enqueue_style( 'lsx-mega-menus-admin', LSX_Mega_Menus()->plugin_url . 'assets/css/lsx-mega-menus-admin.css', array(), LSX_Mega_Menus()->version, 'all' );
		wp_style_add_data( 'lsx-mega-menus-admin', 'rtl', 'replace' );

		// Vendor.
		wp_enqueue_script( 'lsx-mega-menus-customizer-gridstack', LSX_Mega_Menus()->plugin_url . 'assets/js/vendor/gridstack.min.js', array( 'jquery', 'jquery-ui-draggable', 'jquery-ui-resizable', 'jquery-ui-widget', 'jquery-ui-mouse', 'underscore' ), LSX_Mega_Menus()->version );

		wp_enqueue_script( 'lsx-mega-menus-customizer-model-widget', LSX_Mega_Menus()->plugin_url . 'assets/js/models/widget.js', array( 'jquery', 'wp-backbone', 'customize-controls', 'nav-menu' ), LSX_Mega_Menus()->version );
		wp_enqueue_script( 'lsx-mega-menus-customizer-collection-widgets', LSX_Mega_Menus()->plugin_url . 'assets/js/collections/widgets.js', array( 'jquery', 'wp-backbone', 'customize-controls', 'nav-menu' ), LSX_Mega_Menus()->version );
		wp_enqueue_script( 'lsx-mega-menus-customizer-model-mega-menu', LSX_Mega_Menus()->plugin_url . 'assets/js/models/mega-menu.js', array( 'jquery', 'wp-backbone', 'customize-controls', 'nav-menu' ), LSX_Mega_Menus()->version );
		wp_enqueue_script( 'lsx-mega-menus-collection-mega-menus', LSX_Mega_Menus()->plugin_url . 'assets/js/collections/mega-menus.js', array( 'jquery', 'wp-backbone', 'customize-controls', 'nav-menu' ), LSX_Mega_Menus()->version );
		wp_enqueue_script( 'lsx-mega-menus-customizer-view-customizer', LSX_Mega_Menus()->plugin_url . 'assets/js/views/customizer.js', array( 'jquery', 'wp-backbone', 'customize-controls', 'nav-menu' ), LSX_Mega_Menus()->version );
		wp_enqueue_script( 'lsx-mega-menus-customizer-view-configurator', LSX_Mega_Menus()->plugin_url . 'assets/js/views/configurator.js', array( 'jquery', 'wp-backbone', 'customize-controls', 'nav-menu' ), LSX_Mega_Menus()->version );
		wp_enqueue_script( 'lsx-mega-menus-customizer-view-widget', LSX_Mega_Menus()->plugin_url . 'assets/js/views/widget.js', array( 'jquery', 'wp-backbone', 'customize-controls', 'nav-menu' ), LSX_Mega_Menus()->version );
		wp_enqueue_script( 'lsx-mega-menus-customizer-view-add-widgets', LSX_Mega_Menus()->plugin_url . 'assets/js/views/add-widgets.js', array( 'jquery', 'wp-backbone', 'customize-controls', 'nav-menu' ), LSX_Mega_Menus()->version );

		wp_enqueue_script( 'lsx-mega-menus-customizer-js', LSX_Mega_Menus()->plugin_url . 'assets/js/lsx-mega-menus.min.js', array( 'jquery', 'jquery-ui-draggable', 'jquery-ui-resizable', 'jquery-ui-widget', 'jquery-ui-mouse', 'underscore', 'wp-backbone', 'customize-controls', 'nav-menu' ), LSX_Mega_Menus()->version );
	}

	/**
	 * Add hooks for the Customizer preview.
	 */
	public function customize_preview_init() {
		add_action( 'wp_enqueue_scripts', array( $this, 'customize_preview_enqueue' ) );
	}

	/**
	 * Enqueue scripts for the Customizer preview.
	 */
	public function customize_preview_enqueue() {
		wp_enqueue_script( 'lsx-mega-menus-customizer-preview-js', LSX_Mega_Menus()->plugin_url . 'assets/js/lsx-mega-menus-preview.min.js', array( 'jquery', 'customize-preview' ), LSX_Mega_Menus()->version, true );
	}

	/**
	 * Container for configurator panel.
	 */
	public function print_configurator() {
	?>
		<div id="lsxmm-configurator">
			<div class="lsxmm-actions">
			</div>
			<div class="lsxmm-gridstack-wrapper lsxmm-grid-empty">
				<p class="lsxmm-grid-empty-notice"><?php esc_attr_e( 'Add a widget to start. Drag and drop to re-arrange their display order. Adjust the width of each widget by dragging its edges.', 'lsx-mega-menus' ); ?></p>
				<div class="grid-stack lsxmm-gridstack"></div>
			</div>
			<button type="button" class="button-secondary lsxmm-add-new-widget"><span><?php esc_attr_e( 'Add a Widget', 'lsx-mega-menus' ); ?></span></button>
			<div class="lsxmm-add-widgets">
				<div class="lsxmm-widgets-filter">
					<label class="screen-reader-text" for="lsxmm-widgets-filter"><?php esc_attr_e( 'Search Widgets', 'lsx-mega-menus' ); ?></label>
					<input type="search" id="lsxmm-widgets-filter" placeholder="<?php esc_attr_e( 'Search widgets&hellip;', 'lsx-mega-menus' ); ?>" />
				</div>
				<div class="lsxmm-widgets-list"></div>
			</div>
		</div>
	<?php
	}

	/**
	 * Template for the configurator side panel.
	 */
	public function print_templates() {
		?>
		<script type="text/html" id="tmpl-lsxmm-configurator">
			<div class="lsxmm-section-title">
				<h1 class="lsxmm-item-title"><?php printf( esc_html__( '%sMega Menu%s: {{ data.item_title }}', 'lsx-mega-menus' ), '<strong>', '</strong>' ); ?></h1>
				<span class="lsxmm-fullscreen-checkbox">
					<label for="lsxmm-fullscreen-mega-menu-{{ data.item_id }}">
						<input type="checkbox" id="lsxmm-fullscreen-mega-menu-{{ data.item_id }}" class="lsxmm-fullscreen-mega-menu" value="_blank" name="lsxmm-fullscreen-mega-menu" {{ data.fullscreenChecked }}>
						<?php esc_attr_e( 'Fullscreen', 'lsx-mega-menus' ); ?>
					</label>
				</span>
				<span class="lsxmm-enable-checkbox">
					<label for="lsxmm-enable-mega-menu-{{ data.item_id }}">
						<input type="checkbox" id="lsxmm-enable-mega-menu-{{ data.item_id }}" class="lsxmm-enable-mega-menu" value="_blank" name="lsxmm-enable-mega-menu" {{ data.checked }}>
						<?php esc_attr_e( 'Enable', 'lsx-mega-menus' ); ?>
					</label>
				</span>
			</div>
			<p class="lsxmm-notice"><?php esc_attr_e( 'A Mega Menu can only be added to a top level menu item. This Mega Menu will not be displayed.', 'lsx-mega-menus' ); ?></p>
		</script>
		<?php
	}

	/**
	 * Load saved data.
	 */
	public function load_data() {
		$saved_mega_menus = array();
		$saved_data = get_option( 'LSXMM_DATA' );
		$active_sidebars = get_option( 'sidebars_widgets' );

		if ( $saved_data ) {
			foreach ( $saved_data as $item => $menu ) {
				if ( is_nav_menu_item( $item ) ) {
					$widgets = array();

					if ( is_array( $menu['widgets'] ) ) {
						foreach ( $menu['widgets'] as $widget ) {
							if ( in_array( $widget['id'], $active_sidebars['lsxmm-sidebar'] ) ) {
								$widgets[] = $widget;
							}
						}
					}

					$saved_mega_menus[] = array(
						'item_id'	 => $item,
						'active'	 => $menu['active'],
						'fullscreen' => $menu['fullscreen'],
						'widgets'	 => $widgets,
					);
				}
			}
		}

		$settings = array(
			'nonce'				=> wp_create_nonce( 'lsxmm-ajax-nonce' ),
			'savedMegaMenus'	=> $saved_mega_menus,
			'l10n'				=> array(
				'mega_menu'		=> __( 'Mega Menu', 'lsx-mega-menus' ),
			),
		);

		$data = sprintf( 'var _wpCustomizeLSXMMSettings = %s;', wp_json_encode( $settings ) );
		wp_scripts()->add_data( 'lsx-mega-menus-customizer-js', 'data', $data );
	}

	/**
	 * Save data.
	 */
	public function save_data() {
		if ( ! is_user_logged_in() ) {
			wp_die( 0 );
		}

		check_ajax_referer( 'lsxmm-ajax-nonce', 'nonce' );

		if ( ! isset( $_POST['data'] ) ) {
			return;
		}

		$saved_data = get_option( 'LSXMM_DATA', array() );

		// Loop through data and also sanitize it.
		foreach ( wp_unslash( $_POST['data'] ) as $k => $v ) {
			if ( ! isset( $v['item_id'] ) || '' === $v['item_id'] ) {
				continue;
			}

			$item_id = intval( $v['item_id'] );
			$mega_menu = array();

			if ( isset( $v['active'] ) && true === json_decode( $v['active'] ) ) {
				$mega_menu['active'] = true;
			} else {
				$mega_menu['active'] = false;
			}

			if ( isset( $v['fullscreen'] ) && true === json_decode( $v['fullscreen'] ) ) {
				$mega_menu['fullscreen'] = true;
			} else {
				$mega_menu['fullscreen'] = false;
			}

			$mega_menu['widgets'] = array();

			if ( isset( $v['widgets'] ) && is_array( $v['widgets'] ) ) {
				foreach ( $v['widgets'] as $widget ) {
					if ( ! isset( $widget['id'] ) || '' === sanitize_text_field( $widget['id'] ) ) {
						continue;
					}

					$mega_menu['widgets'][] = array(
						'id'	=> sanitize_text_field( $widget['id'] ),
						'x'		=> intval( $widget['x'] ),
						'y'		=> intval( $widget['y'] ),
						'w'		=> intval( $widget['w'] ),
						'h'		=> intval( $widget['h'] ),
					);
				}
			}

			if ( array_key_exists( $item_id, $saved_data ) ) {
				unset( $saved_data[ $item_id ] );
			}

			$saved_data[ $item_id ] = $mega_menu;
		}

		if ( ! empty( $saved_data ) ) {
			update_option( 'LSXMM_DATA', $saved_data );
		}

		wp_send_json_success();
	}

	/**
	 * Stops WordPress from saving our custom sidebar data into the default sidebars_widgets option.
	 */
	public function sidebars_widgets_save( $sidebars ) {
		if ( array_key_exists( 'lsxmm-sidebar', $sidebars ) ) {
			unset( $sidebars['lsxmm-sidebar'] );
		}

		return $sidebars;
	}

	/**
	 * Load our custom data when looking for Sidebars and Widgets.
	 */
	public function sidebars_widgets_load( $sidebars ) {
		$lsxmm_widgets = $this->get_lsxmm_widgets();

		if ( ! empty( $lsxmm_widgets ) ) {
			$sidebars['lsxmm-sidebar'] = $lsxmm_widgets;

			if ( array_key_exists( 'wp_inactive_widgets', $sidebars ) ) {
				foreach ( $sidebars['wp_inactive_widgets'] as $key => $widget ) {
					if ( in_array( $widget, $lsxmm_widgets ) ) {
						unset( $sidebars['wp_inactive_widgets'][ $key ] );
					}
				}
			}
		}

		return $sidebars;
	}

	/**
	 * Get all widgets assigned to a Mega Menu location.
	 */
	public function get_lsxmm_widgets() {
		$lsxmm_widgets = array();
		$saved_data = get_option( 'LSXMM_DATA' );

		if ( $saved_data ) {
			foreach ( $saved_data as $item => $menu ) {
				if ( is_nav_menu_item( $item ) ) {
					$widgets = $menu['widgets'];

					if ( is_array( $widgets ) ) {
						foreach ( $widgets as $widget ) {
							$lsxmm_widgets[] = $widget['id'];
						}
					}
				}
			}
		}

		return $lsxmm_widgets;
	}

	/**
	 * Filter a dynamic setting's constructor args.
	 *
	 * For a dynamic setting to be registered, this filter must be employed
	 * to override the default false value with an array of args to pass to
	 * the WP_Customize_Setting constructor.
	 */
	public function filter_dynamic_setting_args( $setting_args, $setting_id ) {
		if ( preg_match( LSXMM_Mega_Menu_Setting::ID_PATTERN, $setting_id ) ) {
			$setting_args = array(
				'type' => LSXMM_Mega_Menu_Setting::TYPE,
			);
		}

		return $setting_args;
	}

	/**
	 * Allow non-statically created settings to be constructed with custom WP_Customize_Setting subclass.
	 */
	public function filter_dynamic_setting_class( $setting_class, $setting_id, $setting_args ) {
		unset( $setting_id );

		if ( ! empty( $setting_args['type'] ) && LSXMM_Mega_Menu_Setting::TYPE === $setting_args['type'] ) {
			$setting_class = 'LSXMM_Mega_Menu_Setting';
		}

		return $setting_class;
	}

	/**
	 * Registers the fullscreen customizer options
	 *
	 * @param object $wp_customize
	 * @return void
	 */
	public function nav_menu_customizer_options( $wp_customize ) {
		$nav_menus = wp_get_nav_menus();
		if ( ! empty( $nav_menus ) ) {
			foreach ( $nav_menus as $nav_menu ) {
				$menu_setting_id = 'nav_menu[' . $nav_menu->term_id . ']';
				$wp_customize->add_setting(
					'lsx_mega_menu_fullscreen_' . $nav_menu->term_id,
					array(
						'capability'        => 'edit_theme_options',
						'default'           => 0,
						'sanitize_callback' => array( $this, 'sanitize_checkbox' ),
					)
				);

				// add 'menu primary flex' checkbox control.
				$wp_customize->add_control(
					'lsx_mega_menu_fullscreen_' . $nav_menu->term_id,
					array(
						'label'    => __( 'Set the mega menus to full width.', 'lsx-mega-menus' ),
						'section'  => $menu_setting_id,
						'settings' => 'lsx_mega_menu_fullscreen_' . $nav_menu->term_id,
						'std'      => '0',
						'type'     => 'checkbox',
						'priority' => 1,
					)
				);
			}
		}
	}

	// sanitize checkbox fields.
	public function sanitize_checkbox( $input, $setting ) {
		return sanitize_key( $input ) === '1' ? 1 : 0;
	}

}

new LSXMM_Customizer();
