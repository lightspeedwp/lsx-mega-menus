import { createElement, Fragment } from "@wordpress/element";

import { SelectControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { BlockControls, InnerBlocks, useInnerBlocksProps, InspectorControls, RichText, useBlockProps, store as blockEditorStore, getColorClassName } from '@wordpress/block-editor';


import { useMergeRefs, usePrevious } from '@wordpress/compose';
import { useState, useEffect, useRef } from '@wordpress/element';
import { speak } from '@wordpress/a11y';

/**
 * External dependencies
 */
import classnames from 'classnames';
import { LinkUI } from '../node_modules/@wordpress/block-library/build-module/navigation-link/link-ui';
import { ItemSubmenuIcon } from '../node_modules/@wordpress/block-library/build-module/navigation-submenu/icons';
import { updateAttributes } from '../node_modules/@wordpress/block-library/build-module/navigation-link/update-attributes';

/**
 * Output our menu selector.
 *
 * @return {WPElement} Element to render.
 */
export default function Edit( props ) {

	let {
		attributes,
		isSelected,
		setAttributes,
		mergeBlocks,
		onReplace,
		context,
		clientId
	} = props;

	const {
		label,
		type,
		url,
		description,
		rel,
		title
	} = attributes;

	const {
		showSubmenuIcon,
		maxNestingLevel,
		openSubmenusOnClick
	} = context;

	const useIsDraggingWithin = elementRef => {
		const [isDraggingWithin, setIsDraggingWithin] = useState(false);
		useEffect(() => {
		  const {
			ownerDocument
		  } = elementRef.current;
	  
		  function handleDragStart(event) {
			// Check the first time when the dragging starts.
			handleDragEnter(event);
		  } // Set to false whenever the user cancel the drag event by either releasing the mouse or press Escape.
	  
	  
		  function handleDragEnd() {
			setIsDraggingWithin(false);
		  }
	  
		  function handleDragEnter(event) {
			// Check if the current target is inside the item element.
			if (elementRef.current.contains(event.target)) {
			  setIsDraggingWithin(true);
			} else {
			  setIsDraggingWithin(false);
			}
		  } // Bind these events to the document to catch all drag events.
		  // Ideally, we can also use `event.relatedTarget`, but sadly that
		  // doesn't work in Safari.
	  
	  
		  ownerDocument.addEventListener('dragstart', handleDragStart);
		  ownerDocument.addEventListener('dragend', handleDragEnd);
		  ownerDocument.addEventListener('dragenter', handleDragEnter);
		  return () => {
			ownerDocument.removeEventListener('dragstart', handleDragStart);
			ownerDocument.removeEventListener('dragend', handleDragEnd);
			ownerDocument.removeEventListener('dragenter', handleDragEnter);
		  };
		}, []);
		return isDraggingWithin;
	  };

	const { useSelect } = wp.data;
	const [isLinkOpen, setIsLinkOpen] = useState(false); // Use internal state instead of a ref to make sure that the component
	const [popoverAnchor, setPopoverAnchor] = useState(null);
	const ref = useRef();
	const listItemRef = useRef(null);
	const isDraggingWithin = useIsDraggingWithin(listItemRef);

	const ParentElement = openSubmenusOnClick ? 'button' : 'a';
	
	const blockProps = useBlockProps({
		ref: useMergeRefs([setPopoverAnchor, listItemRef]),
		className: classnames('wp-block-navigation-item', 
		{
			'is-dragging-within': isDraggingWithin,
			'has-link': !!url,
			'open-on-click': openSubmenusOnClick
		})
	  }); // Always use overlay colors for submenus.

	// Get the wp_template_parts
	const templateParts = useSelect( ( select ) => {
		return select( 'core' ).getEntityRecords( 'postType', 'wp_template_part' )
	} )
	const itemLabelPlaceholder = __('Add text…');

	let html = {};

	if ( null === templateParts ) {
		html = ( <div>Loading</div> );
	} else {

		// Build the link interface

		let titleInput = createElement(RichText, {
			ref: ref,
			identifier: "label",
			className: "wp-block-navigation-item__label",
			value: label,
			onChange: labelValue => setAttributes({
			  label: labelValue
			}),
			"aria-label": __('Navigation link text'),
			placeholder: itemLabelPlaceholder,
			withoutInteractiveFormatting: true,
			allowedFormats: ['core/bold', 'core/italic', 'core/image', 'core/strikethrough'],
			onClick: () => {
			  if (! openSubmenusOnClick && !url) {
				setIsLinkOpen(true);
			  }
			}
		});

		let linkInput = createElement( LinkUI, {
			className: "wp-block-navigation-link__inline-link-input",
			clientId: clientId,
			link: attributes,
			anchor: popoverAnchor,
		});

		let spanArrow = createElement(
			"span",
			{
				className: "wp-block-navigation__submenu-icon"
		  	},
			createElement(ItemSubmenuIcon, null)
		);

		let anchorLink = createElement(
			ParentElement,
			{
				className: "wp-block-navigation-item__content"
		  	},
			titleInput,
			linkInput,
			spanArrow
		);

		html = createElement("div", blockProps, anchorLink );

		/*let options = [];
		options.push( { value: '', label: 'None' } );
		templateParts.forEach( ( part ) => {
			if ( -1 < part.slug.search('mega-menu')  ) {
				options.push( { value : part.slug, label : part.title.rendered } )
			}
		});
		html = (
			<SelectControl
				label={ 'Select a mega menu:' }
				value={ props.attributes.menu }
				onChange={ ( menu ) => {
					props.setAttributes( { menu } );
				} }
				options={ options }
			/>
		);*/
	}
	return html;
}