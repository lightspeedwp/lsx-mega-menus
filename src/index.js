import { registerBlockType } from '@wordpress/blocks';
import { page, addSubmenu } from '@wordpress/icons';

import NavigationSubmenuEdit from './edit';
import Save from './save';
import metadata from './block.json';

const megaMenuTransforms = {
	from: [{
	  type: 'block',
	  blocks: ['core/home-link','core/navigation-link','core/submenu'],
	  transform: () => {
		return (0,wp.blocks.createBlock)(metadata.name);
	  }
	}]
  };
  /* harmony default export */ var menuTransforms = (megaMenuTransforms);

const attributes = {
	menu: {
		type: "string"
	},
	id: {
		type: "number"
	},
	opensInNewTab: {
		type: "boolean",
		"default": false
	},
	url: {
		type: "string"
	},
	title: {
		type: "string"
	},
	kind: {
		type: "string"
	},
	isTopLevelItem: {
		type: "boolean"
	}
}  

registerBlockType( 
	metadata.name, {
		title: metadata.title,
		description: metadata.description,
		edit: NavigationSubmenuEdit,
		save: Save,
		transforms: menuTransforms,
		attributes: attributes
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
