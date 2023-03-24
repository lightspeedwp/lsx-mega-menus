<?php
namespace LSX\MegaMenus;

/**
 * LSX Mega Menu.
 *
 * @package lsx-mega-menus
 */
class Core {

    /**
     * Constructor.
     */
    public function __construct() {
    }

	public function init() {
		add_action( 'enqueue_block_editor_assets', array( $this, 'register_blocks' ) );
		add_action( 'init', array( $this, 'register_block_type' ), 20 );
		add_action( 'after_setup_theme', array( $this, 'enqueue_block_styles' ), 10 );
	}

	/**
	 * Registers our block variations.
	 *
	 * @return void
	 */
	public function register_blocks() {
		wp_enqueue_script(
			'lsx-mega-menu-block',
			LSX_MEGAMENU_URL . '/build/index.js',
			array( 'wp-blocks','wp-element','wp-primitives' )
		);
	}

	/**
	 * Registers the `lsx/lsx-mega-menu` block
	 * 
	 * @return void
	 */
	function register_block_type() {
		register_block_type(
			LSX_MEGAMENU_PATH . 'src/mega-menu/',
			array(
				'render_callback' => 'render_block_core_navigation_submenu',
			)
		);

		register_block_type(
			LSX_MEGAMENU_PATH . 'src/menu-item/',
			array(
				'render_callback' => array( $this, 'render_mega_menu_block_new' ),
			)
		);
	}

	/**
	 * Renders the `core/navigation-link` block.
	 *
	 * @param array    $attributes The block attributes.
	 * @param string   $content    The saved content.
	 * @param WP_Block $block      The parsed block.
	 *
	 * @return string Returns the post content with the legacy widget added.
	 */
	public function render_mega_menu_block_new( $attributes, $content, $block ) {

		// Don't render the block's subtree if it has no label.
		if ( empty( $attributes['menu'] ) ) {
			return '';
		}

		// Check if the menu exists
		$menu = get_page_by_path( $attributes['menu'], OBJECT, 'wp_template_part' );
		if ( null === $menu ) {
			return '';
		}

		$font_sizes      = block_core_navigation_link_build_css_font_sizes( $block->context );
		$classes         = array_merge(
			$font_sizes['css_classes']
		);
		$style_attribute = $font_sizes['inline_styles'];

		$css_classes = trim( implode( ' ', $classes ) );
		$is_active   = ! empty( $attributes['id'] ) && ( get_queried_object_id() === (int) $attributes['id'] );

		$wrapper_attributes = get_block_wrapper_attributes(
			array(
				'class' => $css_classes . ' wp-block-navigation-item' .
					( $is_active ? ' current-menu-item' : '' ),
				'style' => $style_attribute,
			)
		);

		$html  = '<li ' . $wrapper_attributes . '>';
		$html .= apply_filters( 'the_content', $menu->post_content );
		$html .= '</li>';

		return $html;
	}

	/**
	 * Registers our block specific styles.
	 *
	 * @return void
	 */
	public function enqueue_block_styles() {
		wp_enqueue_block_style(
			'lsx/lsx-mega-menu',
			array(
				'handle' => 'lsx-mega-menu-styles',
				'src'    => LSX_MEGAMENU_URL . '/assets/lsx-mega-menu.css',
				'path'   => LSX_MEGAMENU_PATH . '/assets/lsx-mega-menu.css',
			),
		);
	}
}
