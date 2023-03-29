import _extends from "@babel/runtime/helpers/esm/extends";
import { createElement } from "@wordpress/element";

/**
 * WordPress dependencies
 */
import { __, isRTL } from '@wordpress/i18n';
import { ToolbarDropdownMenu, ToolbarGroup } from '@wordpress/components';
import { justifyRight, justifyCenter, justifyLeft } from '@wordpress/icons';

const DEFAULT_ALIGNMENT_CONTROLS = [{
  icon: justifyLeft,
  title: __('Position left'),
  align: 'left'
}, {
  icon: justifyCenter,
  title: __('Position center'),
  align: 'center'
}, {
  icon: justifyRight,
  title: __('Position right'),
  align: 'right'
}];
const POPOVER_PROPS = {
  position: 'bottom right',
  variant: 'toolbar'
};

function PositionUI(_ref) {
  let {
    value,
    onChange,
    alignmentControls = DEFAULT_ALIGNMENT_CONTROLS,
    label = __('Position Submenu'),
    describedBy = __('Change submenu position'),
    isCollapsed = true,
    isToolbar
  } = _ref;

  function applyOrUnset(align) {
    return () => onChange(value === align ? undefined : align);
  }

  const activeAlignment = alignmentControls.find(control => control.align === value);

  function setIcon() {
    if (activeAlignment) return activeAlignment.icon;
    return isRTL() ? justifyRight : justifyLeft;
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

export default PositionUI;
//# sourceMappingURL=ui.js.map