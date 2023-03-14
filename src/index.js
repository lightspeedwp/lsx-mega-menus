import { registerBlockType } from '@wordpress/blocks';

import Edit from './edit';
import Save from './save';
import metadata from './block.json';

const megaMenuTransforms = {
	from: [{
	  type: 'block',
	  blocks: ['core/home-link','core/social-links','core/spacer','core/site-logo','core/search','core/navigation-link'],
	  transform: () => {
		return (0,wp.blocks.createBlock)('lsx-blocks/megamenu');
	  }
	}]
  };
  /* harmony default export */ var menuTransforms = (megaMenuTransforms);

registerBlockType( 
	metadata.name, {
		title: metadata.title,
		description: metadata.description,
		edit: Edit,
		save: Save,
		transforms: menuTransforms
	}
);

/*wp.blocks.registerBlockVariation( 'core/navigation-submenu', {
    name: metadata.name,
    title: metadata.title,
    description: metadata.description,
    isActive: ( { namespace } ) => {
        return (
            namespace === metadata.name
        );
    },
    }
);*/
