!function(){var e={184:function(e,t){var n;!function(){"use strict";var o={}.hasOwnProperty;function r(){for(var e=[],t=0;t<arguments.length;t++){var n=arguments[t];if(n){var l=typeof n;if("string"===l||"number"===l)e.push(n);else if(Array.isArray(n)){if(n.length){var i=r.apply(null,n);i&&e.push(i)}}else if("object"===l){if(n.toString!==Object.prototype.toString&&!n.toString.toString().includes("[native code]")){e.push(n.toString());continue}for(var a in n)o.call(n,a)&&n[a]&&e.push(a)}}}return e.join(" ")}e.exports?(r.default=r,e.exports=r):void 0===(n=function(){return r}.apply(t,[]))||(e.exports=n)}()}},t={};function n(o){var r=t[o];if(void 0!==r)return r.exports;var l=t[o]={exports:{}};return e[o](l,l.exports,n),l.exports}n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,{a:t}),t},n.d=function(e,t){for(var o in t)n.o(t,o)&&!n.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:t[o]})},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},function(){"use strict";var e=window.wp.blocks,t=window.wp.element,o=n(184),r=n.n(o),l=window.wp.data,i=window.wp.components,a=window.wp.keycodes,s=window.wp.i18n,c=window.wp.blockEditor,u=window.wp.url,p=window.wp.dom,d=window.wp.primitives,m=(0,t.createElement)(d.SVG,{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24"},(0,t.createElement)(d.Path,{d:"M15.6 7.2H14v1.5h1.6c2 0 3.7 1.7 3.7 3.7s-1.7 3.7-3.7 3.7H14v1.5h1.6c2.8 0 5.2-2.3 5.2-5.2 0-2.9-2.3-5.2-5.2-5.2zM4.7 12.4c0-2 1.7-3.7 3.7-3.7H10V7.2H8.4c-2.9 0-5.2 2.3-5.2 5.2 0 2.9 2.3 5.2 5.2 5.2H10v-1.5H8.4c-2 0-3.7-1.7-3.7-3.7zm4.6.9h5.3v-1.5H9.3v1.5z"})),g=(0,t.createElement)(d.SVG,{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24"},(0,t.createElement)(d.Path,{fillRule:"evenodd",clipRule:"evenodd",d:"m13.955 20.748 8-17.5-.91-.416L19.597 6H13.5v1.5h5.411l-1.6 3.5H13.5v1.5h3.126l-1.6 3.5H13.5l.028 1.5h.812l-1.295 2.832.91.416ZM17.675 16l-.686 1.5h4.539L21.5 16h-3.825Zm2.286-5-.686 1.5H21.5V11h-1.54ZM2 12c0 3.58 2.42 5.5 6 5.5h.5V19l3-2.5-3-2.5v2H8c-2.48 0-4.5-1.52-4.5-4S5.52 7.5 8 7.5h3.5V6H8c-3.58 0-6 2.42-6 6Z"})),v=window.wp.coreData,b=window.wp.a11y,k=window.wp.compose,w=window.wp["blockLibrary/buildModule/navigationSubmenu/icons"],f=window.wp["blockLibrary/buildModule/navigationLink/linkUi"],h=window.wp["blockLibrary/buildModule/navigationLink/updateAttributes"],y=window.wp["blockLibrary/buildModule/navigation/edit/utils"];const{name:C}={$schema:"https://schemas.wp.org/trunk/block.json",apiVersion:2,name:"core/navigation-submenu",title:"Submenu",category:"design",parent:["core/navigation"],description:"Add a submenu to your navigation.",textdomain:"default",attributes:{label:{type:"string"},type:{type:"string"},description:{type:"string"},rel:{type:"string"},id:{type:"number"},opensInNewTab:{type:"boolean",default:!1},url:{type:"string"},title:{type:"string"},kind:{type:"string"},isTopLevelItem:{type:"boolean",default:!0}},usesContext:["textColor","customTextColor","backgroundColor","customBackgroundColor","overlayTextColor","customOverlayTextColor","overlayBackgroundColor","customOverlayBackgroundColor","fontSize","customFontSize","showSubmenuIcon","maxNestingLevel","openSubmenusOnClick","style"],supports:{reusable:!1,html:!1},editorStyle:"wp-block-navigation-submenu-editor",style:"wp-block-navigation-submenu"},_=["core/navigation-link","core/navigation-submenu","core/page-list"],x={name:"core/navigation-link"};var B=JSON.parse('{"u2":"lsx/lsx-mega-menu","TN":"LSX Mega Menu","WL":"An example block to display a string from post meta."}'),E={from:[{type:"block",blocks:["core/home-link","core/navigation-link","core/submenu"],transform:()=>(0,wp.blocks.createBlock)(B.u2)}]};(0,e.registerBlockType)(B.u2,{title:B.TN,description:B.WL,edit:function(n){let{attributes:o,isSelected:d,setAttributes:B,mergeBlocks:E,onReplace:L,context:S,clientId:N}=n;console.log(n),console.log(S);const{label:I,type:T,url:H,description:M,rel:P,title:R}=o,{showSubmenuIcon:A,maxNestingLevel:O,openSubmenusOnClick:D}=S,{__unstableMarkNextChangeAsNotPersistent:V,replaceBlock:z}=(0,l.useDispatch)(c.store),[j,F]=(0,t.useState)(!1),[U,Z]=(0,t.useState)(null),G=(0,t.useRef)(null),K=(e=>{const[n,o]=(0,t.useState)(!1);return(0,t.useEffect)((()=>{const{ownerDocument:t}=e.current;function n(e){l(e)}function r(){o(!1)}function l(t){e.current.contains(t.target)?o(!0):o(!1)}return t.addEventListener("dragstart",n),t.addEventListener("dragend",r),t.addEventListener("dragenter",l),()=>{t.removeEventListener("dragstart",n),t.removeEventListener("dragend",r),t.removeEventListener("dragenter",l)}}),[]),n})(G),W=(0,s.__)("Add text…"),J=(0,t.useRef)(),X=(0,v.useResourcePermissions)("pages"),$=(0,v.useResourcePermissions)("posts"),{isAtMaxNesting:q,isTopLevelItem:Q,isParentOfSelectedBlock:Y,isImmediateParentOfSelectedBlock:ee,hasChildren:te,selectedBlockHasChildren:ne,onlyDescendantIsEmptyLink:oe}=(0,l.useSelect)((e=>{const{hasSelectedInnerBlock:t,getSelectedBlockClientId:n,getBlockParentsByBlockName:o,getBlock:r,getBlockCount:l,getBlockOrder:i}=e(c.store);let a;const s=i(n());if(1===(null==s?void 0:s.length)){var u;const e=r(s[0]);a="core/navigation-link"===(null==e?void 0:e.name)&&!(null!=e&&null!==(u=e.attributes)&&void 0!==u&&u.label)}return{isAtMaxNesting:o(N,C).length>=O,isTopLevelItem:0===o(N,C).length,isParentOfSelectedBlock:t(N,!0),isImmediateParentOfSelectedBlock:t(N,!1),hasChildren:!!l(N),selectedBlockHasChildren:!(null==s||!s.length),onlyDescendantIsEmptyLink:a}}),[N]),re=(0,k.usePrevious)(te);(0,t.useEffect)((()=>{D||H||F(!0)}),[]),(0,t.useEffect)((()=>{V(),B({isTopLevelItem:Q})}),[Q]),(0,t.useEffect)((()=>{d||F(!1)}),[d]),(0,t.useEffect)((()=>{j&&H&&((0,u.isURL)((0,u.prependHTTP)(I))&&/^.+\.[a-z]+/.test(I)?function(){J.current.focus();const{ownerDocument:e}=J.current,{defaultView:t}=e,n=t.getSelection(),o=e.createRange();o.selectNodeContents(J.current),n.removeAllRanges(),n.addRange(o)}():(0,p.placeCaretAtHorizontalEdge)(J.current,!0))}),[H]);let le=!1;T&&"page"!==T?"post"===T&&(le=$.canCreate):le=X.canCreate;const{textColor:ie,customTextColor:ae,backgroundColor:se,customBackgroundColor:ce}=(0,y.getColors)(S,!Q),ue=(0,c.useBlockProps)({ref:(0,k.useMergeRefs)([Z,G]),className:r()("wp-block-navigation-item",{"is-editing":d||Y,"is-dragging-within":K,"has-link":!!H,"has-child":te,"has-text-color":!!ie||!!ae,[(0,c.getColorClassName)("color",ie)]:!!ie,"has-background":!!se||ce,[(0,c.getColorClassName)("background-color",se)]:!!se,"open-on-click":D}),style:{color:!ie&&ae,backgroundColor:!se&&ce},onKeyDown:function(e){a.isKeyboardEvent.primary(e,"k")&&F(!0)}}),pe=(0,y.getColors)(S,!0),de=q?_.filter((e=>"core/navigation-submenu"!==e)):_,me=(0,y.getNavigationChildBlockProps)(pe),ge=(0,c.useInnerBlocksProps)(me,{allowedBlocks:de,__experimentalDefaultBlock:x,__experimentalDirectInsert:!0,__experimentalCaptureToolbars:!0,renderAppender:!!(d||ee&&!ne||te)&&c.InnerBlocks.ButtonBlockAppender}),ve=D?"button":"a";function be(){const t=(0,e.createBlock)("core/navigation-link",o);z(N,t)}(0,t.useEffect)((()=>{!te&&re&&(V(),be())}),[te,re]);const ke=!ne||oe;return(0,t.createElement)(t.Fragment,null,(0,t.createElement)(c.BlockControls,null,(0,t.createElement)(i.ToolbarGroup,null,!D&&(0,t.createElement)(i.ToolbarButton,{name:"link",icon:m,title:(0,s.__)("Link"),shortcut:a.displayShortcut.primary("k"),onClick:()=>F(!0)}),(0,t.createElement)(i.ToolbarButton,{name:"revert",icon:g,title:(0,s.__)("Convert to Link"),onClick:be,className:"wp-block-navigation__submenu__revert",isDisabled:!ke}))),(0,t.createElement)(c.InspectorControls,null,(0,t.createElement)(i.PanelBody,{title:(0,s.__)("Link settings")},(0,t.createElement)(i.TextControl,{__nextHasNoMarginBottom:!0,value:I||"",onChange:e=>{B({label:e})},label:(0,s.__)("Label"),autoComplete:"off"}),(0,t.createElement)(i.TextControl,{__nextHasNoMarginBottom:!0,value:H||"",onChange:e=>{B({url:e})},label:(0,s.__)("URL"),autoComplete:"off"}),(0,t.createElement)(i.TextareaControl,{__nextHasNoMarginBottom:!0,value:M||"",onChange:e=>{B({description:e})},label:(0,s.__)("Description"),help:(0,s.__)("The description will be displayed in the menu if the current theme supports it.")}),(0,t.createElement)(i.TextControl,{__nextHasNoMarginBottom:!0,value:R||"",onChange:e=>{B({title:e})},label:(0,s.__)("Link title"),autoComplete:"off"}),(0,t.createElement)(i.TextControl,{__nextHasNoMarginBottom:!0,value:P||"",onChange:e=>{B({rel:e})},label:(0,s.__)("Link rel"),autoComplete:"off"}))),(0,t.createElement)("div",ue,(0,t.createElement)(ve,{className:"wp-block-navigation-item__content"},(0,t.createElement)(c.RichText,{ref:J,identifier:"label",className:"wp-block-navigation-item__label",value:I,onChange:e=>B({label:e}),onMerge:E,onReplace:L,"aria-label":(0,s.__)("Navigation link text"),placeholder:W,withoutInteractiveFormatting:!0,allowedFormats:["core/bold","core/italic","core/image","core/strikethrough"],onClick:()=>{D||H||F(!0)}}),!D&&j&&(0,t.createElement)(f.LinkUI,{className:"wp-block-navigation-link__inline-link-input",clientId:N,link:o,onClose:()=>F(!1),anchor:U,hasCreateSuggestion:le,onRemove:()=>{B({url:""}),(0,b.speak)((0,s.__)("Link removed."),"assertive")},onChange:e=>{(0,h.updateAttributes)(e,B,o)}})),(A||D)&&(0,t.createElement)("span",{className:"wp-block-navigation__submenu-icon"},(0,t.createElement)(w.ItemSubmenuIcon,null)),(0,t.createElement)("div",ge)))},save:function(e){let{_ref:n}=e,{attributes:o,isSelected:r,setAttributes:l,mergeBlocks:i,onReplace:a,context:s,clientId:u}=n;const{showSubmenuIcon:p,maxNestingLevel:d,openSubmenusOnClick:m}=s,g=c.useBlockProps.save();return(0,t.createElement)("div",g,o.menu)},transforms:E,attributes:{menu:{type:"string"},id:{type:"number"},opensInNewTab:{type:"boolean",default:!1},url:{type:"string"},title:{type:"string"},kind:{type:"string"},isTopLevelItem:{type:"boolean"}}})}()}();