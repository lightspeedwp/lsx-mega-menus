import _extends from "@babel/runtime/helpers/esm/extends";
import { createElement } from "@wordpress/element";

/**
 * Internal dependencies
 */
import PositionUI from './ui';

const PositionControl = props => {
  return createElement(PositionUI, _extends({}, props, {
    isToolbar: false
  }));
};

const PositionToolbar = props => {
  return createElement(PositionUI, _extends({}, props, {
    isToolbar: true
  }));
};
/**
 * @see https://github.com/WordPress/gutenberg/blob/HEAD/packages/block-editor/src/components/alignment-control/README.md
 */


export { PositionControl, PositionToolbar };
//# sourceMappingURL=index.js.map