import _extends from "@babel/runtime/helpers/esm/extends";
import { createElement } from "@wordpress/element";

/**
 * WordPress dependencies
 */
import { __, isRTL } from '@wordpress/i18n';
import { ToolbarDropdownMenu, ToolbarGroup } from '@wordpress/components';
import { alignRight, alignCenter } from '@wordpress/icons';

import { alignLeft } from '../icons';

const DEFAULT_ALIGNMENT_CONTROLS = [{
  icon: alignLeft,
  title: __('Align submenu left'),
  align: 'left'
}, {
  icon: alignCenter,
  title: __('Align submenu center'),
  align: 'center'
}, {
  icon: alignRight,
  title: __('Align submenu right'),
  align: 'right'
}];
const POPOVER_PROPS = {
  position: 'bottom right',
  variant: 'toolbar'
};

function AlignmentUI(_ref) {
  let {
    value,
    onChange,
    alignmentControls = DEFAULT_ALIGNMENT_CONTROLS,
    label = __('Align submenu'),
    describedBy = __('Change submenu alignment'),
    isCollapsed = true,
    isToolbar
  } = _ref;

  function applyOrUnset(align) {
    return () => onChange(value === align ? undefined : align);
  }

  const activeAlignment = alignmentControls.find(control => control.align === value);

  function setIcon() {
    if (activeAlignment) return activeAlignment.icon;
    return isRTL() ? alignRight : alignLeft;
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
        align
      } = control;
      const isActive = value === align;
      return { ...control,
        isActive,
        role: isCollapsed ? 'menuitemradio' : undefined,
        onClick: applyOrUnset(align)
      };
    })
  }, extraProps));
}

export default AlignmentUI;
//# sourceMappingURL=ui.js.map