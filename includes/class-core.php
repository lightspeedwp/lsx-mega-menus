<?php
namespace LSX\MegaMenus;

/**
 * LSX Mega Menu.
 *
 * @package lsx-mega-menus
 */
class Core {

	/**
	 * Holds the LI CSS class we raplce our attributes with
	 */
	var $mega_menu_selectors = 'wp-block-lsx-lsx-mega-menu';

    /**
     * Constructor.
     */
    public function __construct() {
    }

	public function init() {
		add_action( 'enqueue_block_editor_assets', array( $this, 'register_blocks' ) );
		add_action( 'init', array( $this, 'register_block_type' ), 20 );
		add_action( 'after_setup_theme', array( $this, 'enqueue_block_scripts' ), 10 );
		add_filter( 'render_block', array( $this, 'render_mega_menu_block' ), 10, 3 );
		add_filter( 'script_loader_tag', array( $this, 'cf_async_disable' ), 10, 3 );
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

		wp_register_script( 'lsx-mega-menu-scripts',  LSX_MEGAMENU_URL . '/assets/lsx-mega-menu.js', array( 'jquery' ) );

		register_block_type(
			LSX_MEGAMENU_PATH . 'src/mega-menu/',
			array(
				'render_callback' => 'render_block_core_navigation_submenu',
				'script_handles' => array( 'lsx-mega-menu-scripts' ),
			)
		);

		register_block_type(
			LSX_MEGAMENU_PATH . 'src/menu-item/',
			array(
				'render_callback' => array( $this, 'render_mega_menu_item_block' ),
			)
		);
	}

	/**
	 * A function to detect variation, and alter the query args.
	 * 
	 * Following the https://developer.wordpress.org/news/2022/12/building-a-book-review-grid-with-a-query-loop-block-variation/
	 *
	 * @param string|null   $pre_render   The pre-rendered content. Default null.
	 * @param array         $parsed_block The block being rendered.
	 * @param WP_Block|null $parent_block If this is a nested block, a reference to the parent block.
	 */
	public function render_mega_menu_block( $block_content, $parsed_block, $block_obj ) {
		// Determine if this is the custom block variation.
		if ( isset( $parsed_block['blockName'] ) && 'lsx/lsx-mega-menu' === $parsed_block['blockName'] ) {
			$attributes = $block_obj->__get( 'attributes' );
			if ( isset( $attributes['position'] ) ) {
				$block_content = str_replace( $this->mega_menu_selectors, $this->mega_menu_selectors . ' has-position-' . $attributes['position'], $block_content );
			}

			if ( isset( $attributes['width'] ) ) {
				$block_content = str_replace( $this->mega_menu_selectors, $this->mega_menu_selectors . ' has-width-' . $attributes['width'], $block_content );
			}
		}
		return $block_content;
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
	public function render_mega_menu_item_block( $attributes, $content, $block ) {

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
	public function enqueue_block_scripts() {
		wp_enqueue_block_style(
			'lsx/lsx-mega-menu',
			array(
				'handle' => 'lsx-mega-menu-styles',
				'src'    => LSX_MEGAMENU_URL . '/assets/lsx-mega-menu.css',
				'path'   => LSX_MEGAMENU_PATH . '/assets/lsx-mega-menu.css',
			),
		);
	}

	/**
	 * Make comment reply button work with CloudFlare Rocket Loader
	 *
	 * @param string $tag The current tag being used.
	 * @param string $handle The current handle outputting.
	 * @param string $src The current image src.
	 * @return string
	 */
	public function cf_async_disable( $tag, $handle, $src ) {
		if ( 'lsx-mega-menu-scripts' !== $handle ) {
			return $tag;
		}
		if ( 'jquery' !== $handle ) {
			return $tag;
		}
		return str_replace( ' src', ' data-cfasync="false" src', $tag );
	}
}
