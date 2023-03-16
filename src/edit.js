import { SelectControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { BlockControls, InnerBlocks, useInnerBlocksProps, InspectorControls, RichText, useBlockProps, store as blockEditorStore, getColorClassName } from '@wordpress/block-editor';
import { LinkUI } from '@wordpress/block-library/build-module/navigation-link/link-ui';
import { useMergeRefs, usePrevious } from '@wordpress/compose';
import { useState, useEffect, useRef } from '@wordpress/element';
import { speak } from '@wordpress/a11y';


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

	const { useSelect } = wp.data;
	const [isLinkOpen, setIsLinkOpen] = useState(false); // Use internal state instead of a ref to make sure that the component
	const [popoverAnchor, setPopoverAnchor] = useState(null);
	const ref = useRef();
	const itemLabelPlaceholder = __('Add text…');

	// Get the wp_template_parts
	const templateParts = useSelect( ( select ) => {
		return select( 'core' ).getEntityRecords( 'postType', 'wp_template_part' )
	} )


	let html = '';

	if ( null === templateParts ) {
		html = ( <div>Loading</div> );
	} else {

		/*html = createElement(RichText, {
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
		});*/

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
	return createElement(RichText, {
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
}