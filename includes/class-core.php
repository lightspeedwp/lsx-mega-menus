<?php
/**
 * LSX_Sharing
 *
 * @package lsx-mega-menus
 */
namespace LSX\MegaMenus;

/**
 * LSX Sharing class.
 *
 * @package lsx-mega-menus
 */
class Core {

    /**
     * The options for the plugin.
     *
     * @var array
     */
    public $options = array();

    /**
     * Constructor.
     */
    public function __construct() {
        $this->load_includes();
    }

	public function init() {
		add_action( 'enqueue_block_editor_assets', array( $this, 'register_block_variations' ) );
		add_action( 'init', array( $this, 'register_block_type' ), 20 );
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
	 * Registers the `core/social-link` blocks.
	 */
	function register_block_type() {
		register_block_type_from_metadata(
			LSX_MEGAMENU_PATH . 'src/sharing-link',
			array(
				'render_callback' => array( $this, 'render_sharing_link' ),
			)
		);
	}
}
