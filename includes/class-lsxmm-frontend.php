<?php
if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * LSX Mega Menus Frontend Class
 *
 * @package   LSX Mega Menus
 * @author    LightSpeed
 * @license   GPL3
 * @link
 * @copyright 2018 LightSpeed
 */
class LSXMM_Frontend {

	/**
	 * Constructor.
	 */
	public function __construct() {
		add_filter( 'walker_nav_menu_start_el', array( $this, 'nav_menu_start_el' ), 10, 4 );
		add_filter( 'wp_nav_menu_objects', array( $this, 'wp_nav_menu_objects' ), 10, 2 );
		add_filter( 'lsx_nav_menu_css_class', array( $this, 'nav_menu_css_class' ), 10, 4 );
		add_action( 'wp_enqueue_scripts', array( $this, 'enqueue_frontend_scripts' ), 999 );

		if ( is_admin() ) {
			add_filter( 'lsx_customizer_colour_selectors_main_menu', array( $this, 'customizer_nav_colours_handler' ), 15, 2 );
		}

		add_filter( 'widget_title', array( $this, 'link_widget_titles' ), 300, 1 );
		add_shortcode( 'lsx_title_link', array( $this, 'widget_title_link' ) );
	}

	/**
	 * Enqueue frontend scripts.
	 */
	public function enqueue_frontend_scripts() {
		wp_enqueue_style( 'lsx-mega-menus', LSX_Mega_Menus()->plugin_url . 'assets/css/lsx-mega-menus.css', array(), LSX_Mega_Menus()->version, 'all' );
		wp_style_add_data( 'lsx-mega-menus', 'rtl', 'replace' );
	}

	/**
	 * Add a Mega Menu to a specific menu item.
	 */
	public function nav_menu_start_el( $item_output, $item, $depth = 0, $args = array() ) {
		if ( $this->_is_mega_menu( $item->ID ) && 0 === $depth ) {
			$html = $this->create_mega_menu( $item->ID );

			if ( '' !== $html ) {
				$item_output = preg_replace( '/>([^<]+)<\/a>/i', ' data-toggle="dropdown" class="dropdown-toggle" aria-haspopup="true">$1 <span class="caret"></span></a>', $item_output );
				$item_output .= $html;
			}
		}

		return $item_output;
	}

	/**
	 * Build Mega Menu output.
	 */
	public function create_mega_menu( $id ) {
		$html		= '';
		$rows_html	= '';
		$mega_menu	= $this->_get_mega_menu( $id );
		$rows		= $this->_get_rows( $mega_menu['widgets'] );

		foreach ( $rows as $row ) {
			if ( empty( $row ) ) {
				continue;
			}

			$row_html		= '';
			$count			= 0;
			$columns		= 0;
			$max_columns	= 12;
			$widget_count	= count( $row );
			$widgets		= $this->_sort_wigets_by_position( $row );

			foreach ( $widgets as $widget ) {
				$widget_content = $this->_do_widget( $widget['id'] );

				if ( $widget_content ) {
					$count++;
				} else {
					$widget_count--;
					continue;
				}

				// Used to calculate empty columns between widgets.
				$empty = 0;

				// Init array for widget row classes.
				$classes = array();

				// Calculate empty space between columns.
				if ( $columns < intval( $widget['x'] ) ) {
					$empty = intval( $widget['x'] ) - $columns;
				}

				// Add pre class and add empty columns to $columns var.
				if ( 0 < $empty ) {
					$classes[] = 'lsxmm-pre-' . $empty;
					$columns = $columns + $empty;
				}

				$columns = $columns + intval( $widget['w'] );

				$classes[] = 'lsxmm-span-' . intval( $widget['w'] );

				if ( $widget_count === $count ) {
					if ( $max_columns === $columns ) {
						$classes[] = 'lsxmm-last';
					} else {
						$classes[] = 'lsxmm-post-' . ( $max_columns - $columns );
					}

					$count = 0;
				}

				$classes = apply_filters( 'lsxmm_widget_classes', $classes );

				$row_html .= '<div class="' . implode( ' ', $classes ) . '">' . $widget_content . '</div>';
			}

			if ( '' !== $row_html ) {
				$rows_html .= '<div class="' . apply_filters( 'lsxmm_row_classes', 'lsxmm-row' ) . '">' . $row_html . '</div>';
			}
		}

		if ( '' !== $rows_html ) {
			$html = '<ul role="menu" class=" dropdown-menu lsxmm-sub-menu">
						<li>
							<div class="' . apply_filters( 'lsxmm_mega_menu_classes', 'lsxmm-mega-menu' ) . '">
								' . $rows_html . '
							</div>
						</li>
					</ul>';
		}

		return $html;
	}

	/**
	 * Remove sub items that may be under a Mega Menu.
	 */
	public function wp_nav_menu_objects( $sorted_menu_items, $args ) {
		$parents = array();
		$to_remove = array();

		// Get all parents that are mega menus.
		foreach ( $sorted_menu_items as $item ) {
			if ( 0 === intval( $item->menu_item_parent ) && $this->_is_mega_menu( $item->ID ) ) {
				$parents[] = $item;
			}
		}

		// Get all items that are sub items of a parent.
		foreach ( $parents as $parent ) {
			$to_remove = array_merge( $to_remove, $this->_look_for_subitems( $parent->ID, $sorted_menu_items ) );
		}

		// Now remove these items from the main array.
		foreach ( $sorted_menu_items as $key => $item ) {
			if ( in_array( $item->ID, $to_remove ) ) {
				unset( $sorted_menu_items[ $key ] );
			}
		}

		$sorted_menu_items = array_values( $sorted_menu_items );
		return $sorted_menu_items;
	}

	/**
	 * Add a 'menu-item-has-children' class to mega menu item, if it doens't have it yet.
	 * Add a 'dropdown' class to mega menu item, if it doens't have it yet.
	 */
	public function nav_menu_css_class( $classes, $item, $args = array(), $depth = 0 ) {
		if ( 0 === $depth && $this->_is_mega_menu( $item->ID ) ) {
			$classes[] = 'lsxmm-active';
			if ( true === $this->_is_mega_menu_fullscreen( $item->ID ) || '1' === $this->_is_mega_menu_fullscreen( $item->ID ) ) {
				$classes[] = 'lsxmm-fullscreen';
			}
			if ( ! in_array( 'menu-item-has-children', $classes ) ) {
				$classes[] = 'menu-item-has-children';
			}
			if ( ! in_array( 'dropdown', $classes ) ) {
				$classes[] = 'dropdown';
			}
		}
		return array_filter( $classes );
	}

	/**
	 * Get a widget by widget id.
	 * Based on the "Widget Shortcode" plugin available at https://wordpress.org/plugins/widget-shortcode/
	 */
	private function _do_widget( $widget_id ) {
		global $_wp_sidebars_widgets, $wp_registered_widgets, $wp_registered_sidebars;

		$args = apply_filters( 'lsxmm_do_widget_args', array(
			'before_widget' => '<aside id="%1$s" class="widget %2$s">',
			'after_widget'  => '</aside>',
			'before_title'	=> '<h3 class="widget-title">',
			'after_title'	=> '</h3>',
		) );

		if ( empty( $widget_id ) || ! isset( $wp_registered_widgets[ $widget_id ] ) ) {
			return;
		}

		// Get the widget instance options.
		$widget_number = preg_replace( '/[^0-9]/', '', $widget_id );
		$options       = get_option( $wp_registered_widgets[ $widget_id ]['callback'][0]->option_name );
		$instance      = $options[ $widget_number ];
		$class         = get_class( $wp_registered_widgets[ $widget_id ]['callback'][0] );
		$widgets_map   = $this->_widget_shortcode_get_widgets_map();

		// Maybe the widget is removed or deregistered.
		if ( ! isset( $widgets_map[ $widget_id ] ) ) {
			return;
		}

		$_original_widget_position = $widgets_map[ $widget_id ];

		// Maybe the widget is removed or deregistered.
		if ( ! $class ) {
			return;
		}

		if ( ! isset( $wp_registered_sidebars[ $_original_widget_position ] ) ) {
			return;
		}

		$params = array(
			'name'          => $wp_registered_sidebars[ $_original_widget_position ]['name'],
			'id'            => $wp_registered_sidebars[ $_original_widget_position ]['id'],
			'description'   => $wp_registered_sidebars[ $_original_widget_position ]['description'],
			'before_widget' => $args['before_widget'],
			'before_title'  => $args['before_title'],
			'after_title'   => $args['after_title'],
			'after_widget'  => $args['after_widget'],
			'widget_id'     => $widget_id,
			'widget_name'   => $wp_registered_widgets[ $widget_id ]['name'],
			'lsx_mm'	    => true,
		);

		// Substitute HTML id and class attributes into before_widget.
		$class_name = '';

		foreach ( (array) $wp_registered_widgets[ $widget_id ]['classname'] as $cn ) {
			if ( is_string( $cn ) ) {
				$class_name .= '_' . $cn;
			} elseif ( is_object( $cn ) ) {
				$class_name .= '_' . get_class( $cn );
			}
		}

		$class_name = ltrim( $class_name, '_' );

		$params['before_widget'] = sprintf( $params['before_widget'], $widget_id, $class_name );

		// Render the widget.
		ob_start();
		the_widget( $class, $instance, $params );
		$content = ob_get_clean();

		return $content;
	}

	/**
	 * Returns an array of all widgets as the key, their position as the value.
	 */
	private function _widget_shortcode_get_widgets_map() {
		$sidebars_widgets = wp_get_sidebars_widgets();
		$widgets_map = array();

		if ( ! empty( $sidebars_widgets ) ) {
			foreach ( $sidebars_widgets as $position => $widgets ) {
				if ( ! empty( $widgets ) ) {
					foreach ( $widgets as $widget ) {
						$widgets_map[ $widget ] = $position;
					}
				}
			}
		}

		return $widgets_map;
	}

	/**
	 * Given a menu item id, return the relevant option.
	 */
	private function _get_mega_menu( $item_id ) {
		if ( ! $item_id ) {
			return false;
		}

		$saved_data = get_option( 'LSXMM_DATA' );
		if ( $saved_data && array_key_exists( intval( $item_id ), $saved_data ) ) {
			return $saved_data[ intval( $item_id ) ];
		}

		return false;
	}

	/**
	 * Sort widgets by row.
	 */
	private function _get_rows( $mega_menu ) {
		$widget_rows = array();

		foreach ( $mega_menu as $widget ) {
			$widget_rows[ $widget['y'] ][] = $widget;
		}

		ksort( $widget_rows );
		return $widget_rows;
	}

	/**
	 * Sort widgets by their position on the grid.
	 */
	private function _sort_wigets_by_position( $widgets = array() ) {
		$ordered_widgets = array();

		foreach ( $widgets as $key => $widget ) {
			$ordered_widgets[ $key ] = $widget['x'];
		}

		array_multisort( $ordered_widgets, SORT_ASC, $widgets );

		return $widgets;
	}

	/**
	 * Given a menu item id, tell if it is a mega menu. Also returns false for mega menus that are not active.
	 */
	private function _is_mega_menu( $item_id ) {
		if ( ! $item_id ) {
			return false;
		}

		$saved_data = get_option( 'LSXMM_DATA' );

		if ( $saved_data && array_key_exists( intval( $item_id ), $saved_data ) ) {
			$mega_menu = $saved_data[ intval( $item_id ) ];

			if ( false === $mega_menu['active'] ) {
				return false;
			}

			if ( empty( $mega_menu['widgets'] ) ) {
				return false;
			}

			$widgets = $mega_menu['widgets'];

			if ( empty( $widgets ) ) {
				return false;
			}

			return true;
		}

		return false;
	}

	/**
	 * Given a menu item id, tell if it is a mega menu. Also returns false for mega menus that are not active.
	 */
	private function _is_mega_menu_fullscreen( $item_id ) {
		if ( ! $item_id ) {
			return false;
		}
		$saved_data = get_option( 'LSXMM_DATA' );
		if ( $saved_data && array_key_exists( intval( $item_id ), $saved_data ) ) {
			$mega_menu = $saved_data[ intval( $item_id ) ];

			if ( ! isset( $mega_menu['fullscreen'] ) || false === $mega_menu['fullscreen'] || '' === $mega_menu['fullscreen'] ) {
				return false;
			}
			return true;
		}
		return false;
	}

	/**
	 * Look for all the sub items of a parent item.
	 */
	private function _look_for_subitems( $parent, $items ) {
		$remove = array();

		foreach ( $items as $item ) {
			if ( intval( $item->menu_item_parent ) === $parent ) {
				$remove[] = $item->ID;
				$remove = array_merge( $remove, $this->_look_for_subitems( $item->ID, $items ) );
			}
		}

		return $remove;
	}

	/**
	 * Handle body colours that might be change by LSX Customiser.
	 */
	public function customizer_nav_colours_handler( $css, $colors ) {
		$css .= '
			@import "' . LSX_Mega_Menus()->plugin_path . '/assets/css/scss/customizer-mega-nav-colours";

			/**
			 * LSX Customizer - Nav (LSX Mega Menus)
			 */
			@include customizer-mega-nav-colours (
				$hover:   			' . $colors['main_menu_link_hover_color'] . ',
				$dropdown-link: 	' . $colors['main_menu_dropdown_link_color'] . '
			);
		';

		return $css;
	}

	/**
	 * Filters the widget title and adds in the link.
	 *
	 * @param string $title
	 * @return string
	 */
	public function link_widget_titles( $title = '' ) {
		$title = do_shortcode( $title );
		return $title;
	}

	/**
	 * [lsx_title_link url="https://example.com" title="Title" id=""]
	 *
	 * @param array $atts
	 * @return string
	 */
	public function widget_title_link( $atts ) {
		$clean_args = array();
		foreach ( $atts as $key => $value ) {
			$value              = html_entity_decode( $value );
			$value              = str_replace( '"', '', $value );
			$value              = str_replace( "'", "", $value );
			$clean_args[ $key ] = $value;
		}
		$a   = wp_parse_args(
			$clean_args,
			array(
				'url'   => '',
				'title' => '',
				'id'    => '',
			)
		);
		$url = $a['url'];
		if ( '' !== $a['id'] ) {
			$url = $a['id'];
		}
		return '<a href="' . $url . '">' . $a['title'] . '</a>';
	}
}

new LSXMM_Frontend();
