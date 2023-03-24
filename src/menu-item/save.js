import { createElement } from "@wordpress/element";

/**
 * WordPress dependencies
 */
import { InnerBlocks } from '@wordpress/block-editor';
export default function save() {
	console.log('Mega Save');
	console.log(createElement(InnerBlocks.Content, null));
  return createElement(InnerBlocks.Content, null);
}
//# sourceMappingURL=save.js.map