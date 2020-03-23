( function( wp, $ ) {

	'use strict';

	if ( ! wp || ! wp.customize ) { return; }

	// Set up our namespace.
	var api = wp.customize;

	api.LSXMM = api.LSXMM || {};

	/**
	 * wp.customize.LSXMM.ConfiguratorView
	 *
	 * View class for the menu item configurator panel.
	 *
	 * @constructor
	 * @augments wp.Backbone.View
	 * @augments Backbone.View
	 */
	api.LSXMM.ConfiguratorView = wp.Backbone.View.extend({

		el: '#lsxmm-configurator',
		configurator: null,
		grid: null,
		model: null,
		template: null,
		menuItemID: null,
		menuItemTitle: '',
		menuItemisTopLevel: false,
		menuItemControl: null,
		addWidgets: null,
		widgetViews: [],
		events: {
			'click .lsxmm-add-new-widget': 'toggleAddWidgets',
			'click .lsxmm-enable-mega-menu': 'enableCheckbox',
			'click .lsxmm-fullscreen-mega-menu': 'fullscreenCheckbox'
		},

		initialize: function() {
			var self = this;

			self.template = wp.template( 'lsxmm-configurator' );
			self.configurator = self.$el.find( '.lsxmm-gridstack' );

			// Initialize gridstack.js
			self.initGridstack();

			// The view with all of the available widgets
			self.addWidgets = new api.LSXMM.AddWidgetsView({ parent: self });

			// Listen to events from the parent view
			Backbone.on( 'LSXMMLoadMegaMenu', self.loadMegaMenu, self );
			Backbone.on( 'LSXMMCloseConfigurator', self.close, self );

			// Close widget search if you click outside the panel
			$( '#customize-controls, #lsxmm-configurator' ).on( 'click keydown', function( e ) {
				var isAddNewBtn = $( e.target ).is( '.lsxmm-add-new-widget, .lsxmm-add-new-widget *' ),
					isAddWidgetsPanel = $( e.target ).is( '.lsxmm-add-widgets, .lsxmm-add-widgets *' );
				if ( $( '.lsxmm-add-widgets' ).hasClass( 'lsxmm-adding-widgets' ) && ! isAddWidgetsPanel && ! isAddNewBtn ) {
					self.closeAddWidgets();
				}
			} );
		},

		initGridstack: function() {
			var self = this;

			self.grid = self.configurator.gridstack( {
				item_class: 'grid-stack-item',
				width: 12,
				height: 10,
				cell_height: 40,
				cell_width: 40,
				resizable: {
					handles: 'e, w'
				}
			} ).data( 'gridstack' );
		},

		loadMegaMenu: function( megaMenu ) {
			var self = this;

			// If it's the same item, close and remove widgets.
			if ( self._sameMenuItem( megaMenu ) ) {
				self.close();
				return;
			}

			// Remove temporary setting
			self.destroySetting();

			// Empty configurator
			self.emptyConfigurator();

			// Load items
			self.menuItemID = megaMenu.item_id;
			self.menuItemTitle = megaMenu.item_title;
			self.menuItemisTopLevel = megaMenu.item_top_level;

			// Open configurator
			self.open();
		},

		open: function() {
			var self = this;

			self.setupModel();

			// Look for changes in the grid
			self.configurator.bind( 'change', _.bind( self.updateWidgets, self ) );

			// Add grid empty default class
			this.configurator.closest( '.lsxmm-gridstack-wrapper' ).addClass( 'lsxmm-grid-empty' );

			// Render widgets
			self.render();

			// Open configurator
			$( 'body' ).addClass( 'lsxmm-panel-visible' );

			// Add notice if item is not top level
			self.toggleTopLevelNotice( false );

			if ( false === self.menuItemisTopLevel ) {
				self.toggleTopLevelNotice( true );
			}

			self.menuItemControl = api.control( 'nav_menu_item[' + String( self.menuItemID ) + ']' );

			if ( self.menuItemControl ) {
				self.menuItemSetting = _.bind( self.trackTopLevelNotice, self );
				self.menuItemControl.setting.bind( 'change', self.menuItemSetting );
			}

			// Send notification to parent view
			Backbone.trigger( 'LSXMMConfiguratorStatus', { 'open': true, 'item_id': self.menuItemID } );
		},

		close: function() {
			var self = this;

			// Close any open widgets
			this.configurator.find( '.lsxmm-widget-content-visible' ).animate({ 'height': '40' }, 200, function() {
				$( this ).removeClass( 'lsxmm-widget-content-visible' );
				$( this ).width( 'auto' );
			});

			// Close configurator
			$( 'body' ).removeClass( 'lsxmm-panel-visible' );

			// Remove top level notice
			self.toggleTopLevelNotice( false );

			// Send notification to parent view
			Backbone.trigger( 'LSXMMConfiguratorStatus', { 'open': false, 'item_id': self.menuItemID } );

			/* The last step of the addWidget() function is to focus on the form control for the added
			widget. It uses jQuery slideDown() and changes the margin of the container. This sets the margin
			back to normal and prevents the widgets panel from having an incorrect margin. */
			$( '#accordion-panel-widgets' ).find( '.control-panel-content' ).css( 'margin-top', 'inherit' );

			// Remove temporary setting
			self.destroySetting();

			// Empty configurator
			self.emptyConfigurator();
		},

		emptyConfigurator: function() {
			var self = this;

			// Empty current item id
			self.menuItemID = null;
			self.menuItemTitle = '';

			// Unbind widget watch
			self.configurator.unbind();

			// Stop tracking top level notice for this menu
			if ( self.menuItemControl ) {
				self.menuItemControl.setting.unbind( 'change', self.menuItemSetting );
				self.menuItemControl = null;
			}

			// Detach widgets from Gridstack, but keep them in the DOM
			_.each( self.grid.grid.nodes, function( node ) {
				self.grid.remove_widget( node.el, false );

				// Hide widget so that it doesn't show up in a different Mega Menu.
				node.el.hide();
			});
		},

		render: function() {
			var self = this, data, widgets;

			data = self.model.toJSON();

			data.item_title = self.menuItemTitle;

			// Handle the checkbox
			if ( true === data.active ) {
				data.checked = 'checked';
			}

			// Handle the fullscreen checkbox
			if ( true === data.fullscreen ) {
				data.fullscreenChecked = 'checked';
			}

			self.$el.find( '.lsxmm-actions' ).html( self.template( data ) );

			// Add widgets to grid
			widgets = self.model.get( 'widgets' );

			_.each( widgets.models, self.processWidget, self );

			this.updateWidgets();

			return self;
		},

		setupModel: function() {
			var self = this, megaMenu;

			megaMenu = api.LSXMM.MegaMenusData.find( function( model ) {
				return model.get( 'item_id' ) === self.menuItemID;
			});

			// If an intance of this Mega Menu data doesn't exist, create it
			if ( _.isEmpty( megaMenu ) ) {
				megaMenu = new api.LSXMM.MegaMenuModel({
					'item_id': self.menuItemID
				});
			}

			// Add active indicator to the nav item
			this.setActiveMenu( this.menuItemID, megaMenu.get( 'active' ) );

			// Add model to collection
			api.LSXMM.MegaMenusData.add( megaMenu );

			self.model = megaMenu;
		},

		enableCheckbox: function( event ) {
			var $checkbox;

			$checkbox = $( event.currentTarget );

			this.model.set({
				'active': $checkbox.is( ':checked' )
			});

			// Add active indicator to the nav item
			this.setActiveMenu( this.menuItemID, $checkbox.is( ':checked' ) );

			// Update preview
			this.updatePreview();
		},

		fullscreenCheckbox: function( event ) {
			var $checkbox;
			$checkbox = $( event.currentTarget );
			this.model.set({
				'fullscreen': $checkbox.is( ':checked' )
			});
		},

		processWidget: function( widget ) {
			var model, childWidgetItemView, widgetExists;
			
			if ( undefined == widget ) {
				return;
			}
			model = JSON.stringify(this.model.get( 'widgets' ) );
			model = this.model.get( 'widgets' ).get( widget.id );

			// Add widget model to collection
			if ( ! model ) {
				this.model.get( 'widgets' ).add( widget );
			}

			// Widget view already exists?
			widgetExists = _.find( this.widgetViews, function( widgetView ) {
				if ( widgetView.id === widget.id ) {
					return widgetView;
				}
				console.log( 'test 3' + widgetView );
				return false;
			});

			if ( widgetExists ) {
				this.grid.add_widget( widgetExists.$el, this.model.get( 'x' ), this.model.get( 'y' ), this.model.get( 'w' ), this.model.get( 'h' ) );

				// Display previously hidden widget
				widgetExists.$el.show();
				return;
			}

			childWidgetItemView = new api.LSXMM.WidgetView({
				parent: this,
				model: widget,
				id: 'lsxmm-widget-' + widget.id,
				className: 'grid-stack-widget'
			});

			childWidgetItemView.render();

			/* Save view to later be reused instead of creating new views each time a
			widget needs to be added to the grid. */
			this.widgetViews.push( childWidgetItemView );
		},

		updateWidgets: function() {

			// Maybe toggle empty class on the grid
			this.maybeToggleEmptyClass();

			// Loop through changes and update model data
			_.each( this._getGridData(), this.updateSingleWidget, this );

			// Update preview
			this.updatePreview();
		},

		updateSingleWidget: function( widget ) {
			var model = this.model.get( 'widgets' ).get( widget.id );

			if ( parseInt( model.get( 'x' ), 10 ) !== parseInt( widget.x, 10 ) ) {
				model.set( 'x', parseInt( widget.x, 10 ) );
			}

			if ( parseInt( model.get( 'y' ), 10 ) !== parseInt( widget.y, 10 ) ) {
				model.set( 'y', parseInt( widget.y, 10 ) );
			}

			if ( parseInt( model.get( 'w' ), 10 ) !== parseInt( widget.w, 10 ) ) {
				model.set( 'w', parseInt( widget.w, 10 ) );
			}

			if ( parseInt( model.get( 'h' ), 10 ) !== parseInt( widget.h, 10 ) ) {
				model.set( 'h', parseInt( widget.h, 10 ) );
			}
		},

		_sameMenuItem: function( menuItem ) {
			var self = this;

			if ( menuItem.item_id === self.menuItemID ) {
				return true;
			}

			return false;
		},

		_getGridData: function() {
			var node, res = _.map( this.configurator.find( '.grid-stack-item:visible' ), function( el ) {
				el = $( el );
				node = el.data( '_gridstack_node' );
				return {
					id: _.escape( el.attr( 'data-widget-id' ) ),
					x: parseInt( node.x, 10 ),
					y: parseInt( node.y, 10 ),
					w: parseInt( node.width, 10 ),
					h: parseInt( node.height, 10 )
				};
			});

			return res;
		},

		toggleAddWidgets: function( event ) {
			var $btn = $( event.currentTarget );

			event.preventDefault();

			if ( $btn.hasClass( 'toggled' ) ) {
				this.closeAddWidgets();
			} else {
				this.openAddWidgets();
			}
		},

		openAddWidgets: function() {
			var $btn = $( '.lsxmm-add-new-widget' ),
				$widgets = this.addWidgets.$el;

			$btn.addClass( 'toggled' );
			$widgets.addClass( 'lsxmm-adding-widgets' );
		},

		closeAddWidgets: function() {
			var $btn = $( '.lsxmm-add-new-widget' ),
				$widgets = this.addWidgets.$el;

			$btn.removeClass( 'toggled' );
			$widgets.removeClass( 'lsxmm-adding-widgets' );
			$widgets.find( '.lsxmm-widgets-list' ).scrollTop( 0 );

			// Empty Search
			this.addWidgets.clearSearch();
		},

		maybeToggleEmptyClass: function() {
			var isEmpty = true,
				items = this._getGridData();

			if ( items && 0 < items.length ) {
				isEmpty = false;
			}

			this.configurator.closest( '.lsxmm-gridstack-wrapper' ).toggleClass( 'lsxmm-grid-empty', isEmpty );
		},

		trackTopLevelNotice: function( setting ) {
			var self = this;

			if ( setting.menu_item_parent !== 0 ) {
				self.toggleTopLevelNotice( true );
			} else {
				self.toggleTopLevelNotice( false );
			}
		},

		toggleTopLevelNotice: function( toggle ) {
			this.$el.toggleClass( 'lsxmm-not-top-level', toggle );
		},

		updatePreview: function() {
			var settingID, settingArgs, settingData, setting;

			settingID = 'mega_menu[' + String( this.menuItemID ) + ']';

			settingArgs	= {
				type: 'mega_menu',
				transport: 'refresh',
				previewer: api.previewer
			};

			settingData			= this.model.toJSON();

			settingData.widgets	= settingData.widgets.toJSON();

			if ( api.has( settingID ) ) {
				setting = api( settingID );
			} else {
				setting = api.create( settingID, settingID, {}, settingArgs );
			}

			// Prevent setting triggering Customizer dirty state when set.
			setting.callbacks.disable();

			// Only update/preview if there's actually something new.
			if ( ! _.isEqual( settingData, setting.get() ) ) {
				setting.set( settingData );
				setting.preview();
			}
		},

		destroySetting: function() {
			var oldSettingID, oldSetting;

			oldSettingID = 'mega_menu[' + String( this.menuItemID ) + ']';

			if ( api.has( oldSettingID ) ) {
				oldSetting = api( oldSettingID );
				oldSetting.callbacks.disable(); // Prevent setting triggering Customizer dirty state when set.
				oldSetting.set( false );
				oldSetting.preview();
				oldSetting._dirty = false;
			}
		},

		setActiveMenu: function( item, display ) {
			var $item = $( '#accordion-panel-nav_menus #customize-control-nav_menu_item-' + item ).find( '.menu-item-handle' );
			$item.toggleClass( 'lsxmm-is-mega-menu', display );
		}
	});

} )( window.wp, jQuery );

