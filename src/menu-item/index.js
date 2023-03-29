import { registerBlockType } from '@wordpress/blocks';

import Edit from './edit';
import Save from './save';
import metadata from './block.json';

registerBlockType( 
	metadata.name, {
		title: metadata.title,
		edit: Edit,
		save: Save
	}
);
