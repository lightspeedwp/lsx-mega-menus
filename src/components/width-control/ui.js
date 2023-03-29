import _extends from "@babel/runtime/helpers/esm/extends";
import { createElement } from "@wordpress/element";

/**
 * WordPress dependencies
 */
import { __, isRTL } from '@wordpress/i18n';
import { ToolbarDropdownMenu, ToolbarGroup } from '@wordpress/components';
import { stretchWide, stretchFullWidth } from '@wordpress/icons';

import { widthInherit } from '../icons';

const DEFAULT_ALIGNMENT_CONTROLS = [{
  icon: widthInherit,
  title: __('None'),
  info:  __('Max 640px Width'),
  align: 'inherit'
}, {
  icon: stretchWide,
  title: __('Wide Width'),
  info:  __('Max Width'),
  align: 'wide'
}, {
  icon: stretchFullWidth,
  title: __('Full Width'),
  align: 'full'
}];
const POPOVER_PROPS = {
  position: 'bottom right',
  variant: 'toolbar'
};

function WidthUI(_ref) {
  let {
    value,
    onChange,
    alignmentControls = DEFAULT_ALIGNMENT_CONTROLS,
    label = __('Set Width'),
    describedBy = __('Set submenu width'),
    isCollapsed = true,
    isToolbar
  } = _ref;

  function applyOrUnset(align) {
    return () => onChange(value === align ? undefined : align);
  }

  const activeAlignment = alignmentControls.find(control => control.align === value);

  function setIcon() {
    if (activeAlignment) return activeAlignment.icon;
    return widthInherit;
  }

  const UIComponent = isToolbar ? ToolbarGroup : ToolbarDropdownMenu;
  const extraProps = isToolbar ? {
    isCollapsed
  } : {
    toggleProps: {
      describedBy
    },
    popoverProps: POPOVER_PROPS
  };
  return createElement(UIComponent, _extends({
    icon: setIcon(),
    label: label,
    controls: alignmentControls.map(control => {
      const {
        align,
		info
      } = control;
      const isActive = value === align;
      return { ...control,
        isActive,
        role: isCollapsed ? 'menuitemradio' : undefined,
        onClick: applyOrUnset(align),
		info: info
      };
    })
  }, extraProps));
}

export default WidthUI;
//# sourceMappingURL=ui.js.map