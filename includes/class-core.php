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
		add_action( 'enqueue_block_editor_assets', array( $this, 'register_block_variations' ) );
		add_action( 'init', array( $this, 'register_block_type' ), 20 );
		add_filter( 'render_block', array( $this, 'render_mega_menu_block' ), 10, 2 );
	}

	/**
	 * Registers our block variations.
	 *
	 * @return void
	 */
	public function register_block_variations() {
		wp_enqueue_script(
			'lsx-mega-menu-block',
			LSX_MEGAMENU_URL . '/build/blocks.js',
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
			LSX_BLOCKS_PATH . 'src/',
		);
	}

	/**
	 * Renders our mega menu template part.
	 *
	 * @param string $block_content
	 * @param array $block
	 * @return string
	 */
	public function render_mega_menu_block( $block_content = '', $block = [] ) {
		if ( ! isset( $block['blockName'] ) || 'lsx-blocks/megamenu' === $block['blockName'] ) {
			return $block_content;
		}

		$menu_name = trim( strip_tags( $block_content ) );
		if ( '' === $menu_name ) {
			return $block_content;
		}

		$menu = get_page_by_path( $menu_name, OBJECT, 'wp_template_part' );
		if ( null === $menu ) {
			return $block_content;
		}

		$block_content = apply_filters( 'the_content', $menu->post_content );
		return $block_content;
	}
}
