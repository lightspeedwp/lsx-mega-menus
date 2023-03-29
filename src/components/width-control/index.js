import _extends from "@babel/runtime/helpers/esm/extends";
import { createElement } from "@wordpress/element";

/**
 * Internal dependencies
 */
import WidthUI from './ui';

const WidthControl = props => {
  return createElement(WidthUI, _extends({}, props, {
    isToolbar: false
  }));
};

const WidthToolbar = props => {
  return createElement(WidthUI, _extends({}, props, {
    isToolbar: true
  }));
};
/**
 * @see https://github.com/WordPress/gutenberg/blob/HEAD/packages/block-editor/src/components/alignment-control/README.md
 */


export { WidthControl, WidthToolbar };
//# sourceMappingURL=index.js.map