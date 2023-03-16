import { SelectControl } from '@wordpress/components';

/**
 * Output our menu selector.
 *
 * @return {WPElement} Element to render.
 */
export default function Edit( props ) {
	const { useSelect } = wp.data;

	// Get the wp_template_parts
	const templateParts = useSelect( ( select ) => {
		return select( 'core' ).getEntityRecords( 'postType', 'wp_template_part' )
	} )

	let html = '';

	if ( null === templateParts ) {
		html = ( <div>Loading</div> );
	} else {

		let options = [];
		options.push( { value: '', label: 'Select a mega menu:' } );
		templateParts.forEach( ( part ) => {
			if ( -1 < part.slug.search('mega-menu')  ) {
				options.push( { value : part.slug, label : part.title.rendered } )
			}
		});

		html = (
			<SelectControl
				value={ props.attributes.menu }
				onChange={ ( menu ) => {
					props.setAttributes( { menu } );
				} }
				options={ options }
			/>
		);
	}
	return html;
}