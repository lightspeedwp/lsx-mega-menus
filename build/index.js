!function(){var e={184:function(e,t){var o;!function(){"use strict";var n={}.hasOwnProperty;function r(){for(var e=[],t=0;t<arguments.length;t++){var o=arguments[t];if(o){var l=typeof o;if("string"===l||"number"===l)e.push(o);else if(Array.isArray(o)){if(o.length){var a=r.apply(null,o);a&&e.push(a)}}else if("object"===l){if(o.toString!==Object.prototype.toString&&!o.toString.toString().includes("[native code]")){e.push(o.toString());continue}for(var s in o)n.call(o,s)&&o[s]&&e.push(s)}}}return e.join(" ")}e.exports?(r.default=r,e.exports=r):void 0===(o=function(){return r}.apply(t,[]))||(e.exports=o)}()}},t={};function o(n){var r=t[n];if(void 0!==r)return r.exports;var l=t[n]={exports:{}};return e[n](l,l.exports,o),l.exports}o.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return o.d(t,{a:t}),t},o.d=function(e,t){for(var n in t)o.o(t,n)&&!o.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},function(){"use strict";var e=window.wp.blocks,t=window.wp.element,n=o(184),r=o.n(n),l=window.wp.data,a=window.wp.components,s=window.wp.keycodes,c=window.wp.i18n,i=window.wp.blockEditor,u=window.wp.url,m=window.wp.dom,p=window.wp.primitives,g=(0,t.createElement)(p.SVG,{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24"},(0,t.createElement)(p.Path,{d:"M15.6 7.2H14v1.5h1.6c2 0 3.7 1.7 3.7 3.7s-1.7 3.7-3.7 3.7H14v1.5h1.6c2.8 0 5.2-2.3 5.2-5.2 0-2.9-2.3-5.2-5.2-5.2zM4.7 12.4c0-2 1.7-3.7 3.7-3.7H10V7.2H8.4c-2.9 0-5.2 2.3-5.2 5.2 0 2.9 2.3 5.2 5.2 5.2H10v-1.5H8.4c-2 0-3.7-1.7-3.7-3.7zm4.6.9h5.3v-1.5H9.3v1.5z"})),d=window.wp.coreData,k=window.wp.a11y,f=window.wp.compose;const v=()=>(0,t.createElement)(a.SVG,{xmlns:"http://www.w3.org/2000/svg",width:"12",height:"12",viewBox:"0 0 12 12",fill:"none"},(0,t.createElement)(a.Path,{d:"M1.50002 4L6.00002 8L10.5 4",strokeWidth:"1.5"}));var C=window.wp.htmlEntities;function b(e,t){switch(e){case"post":case"page":return{type:"post",subtype:e};case"category":return{type:"term",subtype:"category"};case"tag":return{type:"term",subtype:"post_tag"};case"post_format":return{type:"post-format"};default:return"taxonomy"===t?{type:"term",subtype:e}:"post-type"===t?{type:"post",subtype:e}:{}}}function h(o){let{clientId:n}=o;const{getBlock:r,blockTransforms:s}=(0,l.useSelect)((e=>{const{getBlock:t,getBlockRootClientId:o,getBlockTransformItems:r}=e(i.store);return{getBlock:t,blockTransforms:r(t(n),o(n))}}),[n]),{replaceBlock:u}=(0,l.useDispatch)(i.store),m=["core/page-list","core/site-logo","core/social-links","core/search"],p=s.filter((e=>m.includes(e.name)));return null!=p&&p.length&&n?(0,t.createElement)("div",{className:"link-control-transform"},(0,t.createElement)("h3",{className:"link-control-transform__subheading"},(0,c.__)("Transform")),(0,t.createElement)("div",{className:"link-control-transform__items"},p.map(((o,l)=>(0,t.createElement)(a.Button,{key:`transform-${l}`,onClick:()=>u(n,(0,e.switchToBlockType)(r(n),o.name)),className:"link-control-transform__item"},(0,t.createElement)(i.BlockIcon,{icon:o.icon}),o.title))))):null}function w(e){const{saveEntityRecord:o}=(0,l.useDispatch)(d.store),{label:n,url:r,opensInNewTab:s,type:u,kind:p}=e.link,g={url:r,opensInNewTab:s,title:n&&(0,m.__unstableStripHTML)(n)};return(0,t.createElement)(a.Popover,{placement:"bottom",onClose:e.onClose,anchor:e.anchor,__unstableSlotName:"__unstable-block-tools-after",shift:!0},(0,t.createElement)(i.__experimentalLinkControl,{hasTextControl:!0,hasRichPreviews:!0,className:e.className,value:g,showInitialSuggestions:!0,withCreateSuggestion:e.hasCreateSuggestion,createSuggestion:async function(t){const n=e.link.type||"page",r=await o("postType",n,{title:t,status:"draft"});return{id:r.id,type:n,title:(0,C.decodeEntities)(r.title.rendered),url:r.link,kind:"post-type"}},createSuggestionButtonText:e=>{let o;
/* translators: %s: search term. */
return o="post"===u?(0,c.__)("Create draft post: <mark>%s</mark>"):(0,c.__)("Create draft page: <mark>%s</mark>"),(0,t.createInterpolateElement)((0,c.sprintf)(o,e),{mark:(0,t.createElement)("mark",null)})},noDirectEntry:!!u,noURLSuggestion:!!u,suggestionsQuery:b(u,p),onChange:e.onChange,onRemove:e.onRemove,onCancel:e.onCancel,renderControlBottom:r?null:()=>(0,t.createElement)(h,{clientId:e.clientId})}))}var y=window.wp.escapeHtml;function _(e,t){var o,n;const{textColor:r,customTextColor:l,backgroundColor:a,customBackgroundColor:s,overlayTextColor:c,customOverlayTextColor:i,overlayBackgroundColor:u,customOverlayBackgroundColor:m,style:p}=e,g={};return t&&i?g.customTextColor=i:t&&c?g.textColor=c:l?g.customTextColor=l:r?g.textColor=r:null!=p&&null!==(o=p.color)&&void 0!==o&&o.text&&(g.customTextColor=p.color.text),t&&m?g.customBackgroundColor=m:t&&u?g.backgroundColor=u:s?g.customBackgroundColor=s:a?g.backgroundColor=a:null!=p&&null!==(n=p.color)&&void 0!==n&&n.background&&(g.customTextColor=p.color.background),g}const x="lsx/lsx-mega-menu",E=["core/navigation-link","core/navigation-submenu","core/page-list","lsx/lsx-mega-menu-item"],B={name:"lsx/lsx-mega-menu-item"};var T=JSON.parse('{"u2":"lsx/lsx-mega-menu","TN":"LSX Mega Menu","WL":"An example block to display a string from post meta.","Y4":{"label":{"type":"string"},"type":{"type":"string"},"description":{"type":"string"},"rel":{"type":"string"},"id":{"type":"number"},"opensInNewTab":{"type":"boolean","default":false},"url":{"type":"string"},"title":{"type":"string"},"kind":{"type":"string"},"isTopLevelItem":{"type":"boolean"},"align":{"type":"string"}},"EI":["inserter","textColor","customTextColor","backgroundColor","customBackgroundColor","overlayTextColor","customOverlayTextColor","overlayBackgroundColor","customOverlayBackgroundColor","fontSize","customFontSize","showSubmenuIcon","maxNestingLevel","openSubmenusOnClick","style"],"be":{"reusable":false,"html":false}}'),S={from:[{type:"block",blocks:["core/home-link","core/navigation-link","core/submenu"],transform:()=>(0,wp.blocks.createBlock)(T.u2)}]};(0,e.registerBlockType)(T.u2,{title:T.TN,description:T.WL,edit:function(e){let{attributes:o,isSelected:n,setAttributes:p,mergeBlocks:C,onReplace:b,context:h,clientId:T}=e;const{label:S,type:N,url:I,description:L,rel:R,title:M,align:H}=o,{showSubmenuIcon:P,maxNestingLevel:O,openSubmenusOnClick:A}=h,{__unstableMarkNextChangeAsNotPersistent:D,replaceBlock:z}=(0,l.useDispatch)(i.store),[U,j]=(0,t.useState)(!1),[F,V]=(0,t.useState)(null),$=(0,t.useRef)(null),G=(e=>{const[o,n]=(0,t.useState)(!1);return(0,t.useEffect)((()=>{const{ownerDocument:t}=e.current;function o(e){l(e)}function r(){n(!1)}function l(t){e.current.contains(t.target)?n(!0):n(!1)}return t.addEventListener("dragstart",o),t.addEventListener("dragend",r),t.addEventListener("dragenter",l),()=>{t.removeEventListener("dragstart",o),t.removeEventListener("dragend",r),t.removeEventListener("dragenter",l)}}),[]),o})($),W=(0,c.__)("Add text…"),J=(0,t.useRef)(),K=(0,d.useResourcePermissions)("pages"),X=(0,d.useResourcePermissions)("posts"),{isAtMaxNesting:Y,isTopLevelItem:Q,isParentOfSelectedBlock:q,isImmediateParentOfSelectedBlock:Z,hasChildren:ee,selectedBlockHasChildren:te,onlyDescendantIsEmptyLink:oe}=(0,l.useSelect)((e=>{const{hasSelectedInnerBlock:t,getSelectedBlockClientId:o,getBlockParentsByBlockName:n,getBlock:r,getBlockCount:l,getBlockOrder:a}=e(i.store);let s;const c=a(o());if(1===(null==c?void 0:c.length)){var u;const e=r(c[0]);s="core/navigation-link"===(null==e?void 0:e.name)&&!(null!=e&&null!==(u=e.attributes)&&void 0!==u&&u.label)}return{isAtMaxNesting:n(T,x).length>=O,isTopLevelItem:0===n(T,x).length,isParentOfSelectedBlock:t(T,!0),isImmediateParentOfSelectedBlock:t(T,!1),hasChildren:!!l(T),selectedBlockHasChildren:!(null==c||!c.length),onlyDescendantIsEmptyLink:s}}),[T]);(0,f.usePrevious)(ee),(0,t.useEffect)((()=>{A||I||j(!0)}),[]),(0,t.useEffect)((()=>{D(),p({isTopLevelItem:Q})}),[Q]),(0,t.useEffect)((()=>{n||j(!1)}),[n]),(0,t.useEffect)((()=>{U&&I&&((0,u.isURL)((0,u.prependHTTP)(S))&&/^.+\.[a-z]+/.test(S)?function(){J.current.focus();const{ownerDocument:e}=J.current,{defaultView:t}=e,o=t.getSelection(),n=e.createRange();n.selectNodeContents(J.current),o.removeAllRanges(),o.addRange(n)}():(0,m.placeCaretAtHorizontalEdge)(J.current,!0))}),[I]);let ne=!1;N&&"page"!==N?"post"===N&&(ne=X.canCreate):ne=K.canCreate;const{textColor:re,customTextColor:le,backgroundColor:ae,customBackgroundColor:se}=_(h,!Q),ce=(0,i.useBlockProps)({ref:(0,f.useMergeRefs)([V,$]),className:r()("wp-block-navigation-item",{"is-editing":n||q,"is-dragging-within":G,"has-link":!!I,"has-child":ee,"has-text-color":!!re||!!le,[(0,i.getColorClassName)("color",re)]:!!re,"has-background":!!ae||se,[(0,i.getColorClassName)("background-color",ae)]:!!ae,"open-on-click":A,[`has-alignment-${H}`]:H}),style:{color:!re&&le,backgroundColor:!ae&&se},onKeyDown:function(e){s.isKeyboardEvent.primary(e,"k")&&j(!0)}}),ie=_(h,!0),ue=Y?E.filter((e=>"lsx/lsx-mega-menu"!==e)):E,me=function(e){return{className:r()("wp-block-navigation__submenu-container",{"has-text-color":!(!e.textColor&&!e.customTextColor),[`has-${e.textColor}-color`]:!!e.textColor,"has-background":!(!e.backgroundColor&&!e.customBackgroundColor),[`has-${e.backgroundColor}-background-color`]:!!e.backgroundColor}),style:{color:e.customTextColor,backgroundColor:e.customBackgroundColor}}}(ie),pe=(0,i.useInnerBlocksProps)(me,{allowedBlocks:ue,__experimentalDefaultBlock:B,__experimentalDirectInsert:!0,__experimentalCaptureToolbars:!0,renderAppender:!!(n||Z&&!te||ee)&&i.InnerBlocks.ButtonBlockAppender}),ge=A?"button":"a";return(0,t.createElement)(t.Fragment,null,(0,t.createElement)(i.BlockControls,null,(0,t.createElement)(a.ToolbarGroup,null,!A&&(0,t.createElement)(a.ToolbarButton,{name:"link",icon:g,title:(0,c.__)("Link"),shortcut:s.displayShortcut.primary("k"),onClick:()=>j(!0)}),(0,t.createElement)(i.AlignmentControl,{value:H,onChange:e=>p({align:e})}))),(0,t.createElement)(i.InspectorControls,null,(0,t.createElement)(a.PanelBody,{title:(0,c.__)("Link settings")},(0,t.createElement)(a.TextControl,{__nextHasNoMarginBottom:!0,value:S||"",onChange:e=>{p({label:e})},label:(0,c.__)("Label"),autoComplete:"off"}),(0,t.createElement)(a.TextControl,{__nextHasNoMarginBottom:!0,value:I||"",onChange:e=>{p({url:e})},label:(0,c.__)("URL"),autoComplete:"off"}),(0,t.createElement)(a.TextareaControl,{__nextHasNoMarginBottom:!0,value:L||"",onChange:e=>{p({description:e})},label:(0,c.__)("Description"),help:(0,c.__)("The description will be displayed in the menu if the current theme supports it.")}),(0,t.createElement)(a.TextControl,{__nextHasNoMarginBottom:!0,value:M||"",onChange:e=>{p({title:e})},label:(0,c.__)("Link title"),autoComplete:"off"}),(0,t.createElement)(a.TextControl,{__nextHasNoMarginBottom:!0,value:R||"",onChange:e=>{p({rel:e})},label:(0,c.__)("Link rel"),autoComplete:"off"}))),(0,t.createElement)("div",ce,(0,t.createElement)(ge,{className:"wp-block-navigation-item__content"},(0,t.createElement)(i.RichText,{ref:J,identifier:"label",className:"wp-block-navigation-item__label",value:S,onChange:e=>p({label:e}),onMerge:C,onReplace:b,"aria-label":(0,c.__)("Navigation link text"),placeholder:W,withoutInteractiveFormatting:!0,allowedFormats:["core/bold","core/italic","core/image","core/strikethrough"],onClick:()=>{A||I||j(!0)}}),!A&&U&&(0,t.createElement)(w,{className:"wp-block-navigation-link__inline-link-input",clientId:T,link:o,onClose:()=>j(!1),anchor:F,hasCreateSuggestion:ne,onRemove:()=>{p({url:""}),(0,k.speak)((0,c.__)("Link removed."),"assertive")},onChange:e=>{!function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=arguments.length>1?arguments[1]:void 0,o=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};const{label:n="",kind:r="",type:l=""}=o,{title:a="",url:s="",opensInNewTab:c,id:i,kind:m=r,type:p=l}=e,g=a.replace(/http(s?):\/\//gi,""),d=s.replace(/http(s?):\/\//gi,""),k=a&&a!==n&&g!==d?(0,y.escapeHTML)(a):n||(0,y.escapeHTML)(d),f="post_tag"===p?"tag":p.replace("-","_"),v=["post","page","tag","category"].indexOf(f)>-1,C=!m&&!v||"custom"===m?"custom":m;t({url:s?encodeURI((0,u.safeDecodeURI)(s)):s,...k&&{label:k},...void 0!==c&&{opensInNewTab:c},...i&&Number.isInteger(i)&&{id:i},...C&&{kind:C},...f&&"URL"!==f&&{type:f}})}(e,p,o)}})),(P||A)&&(0,t.createElement)("span",{className:"wp-block-navigation__submenu-icon"},(0,t.createElement)(v,null)),(0,t.createElement)("div",pe)))},save:function(){return(0,t.createElement)(i.InnerBlocks.Content,null)},transforms:S,attributes:T.Y4,usesContext:T.EI,supports:T.be,editorStyle:"wp-block-navigation-link-editor",style:"wp-block-navigation-link"});var N=JSON.parse('{"u2":"lsx/lsx-mega-menu-item","TN":"LSX Mega Menu"}');(0,e.registerBlockType)(N.u2,{title:N.TN,edit:function(e){const{useSelect:o}=wp.data,n=o((e=>e("core").getEntityRecords("postType","wp_template_part")));let r="";if(null===n)r=(0,t.createElement)("div",null,"Loading");else{let o=[];o.push({value:"",label:"Select a mega menu:"}),n.forEach((e=>{-1<e.slug.search("mega-menu")&&o.push({value:e.slug,label:e.title.rendered})})),r=(0,t.createElement)(a.SelectControl,{value:e.attributes.menu,onChange:t=>{e.setAttributes({menu:t})},options:o})}return r},save:function(){return(0,t.createElement)(i.InnerBlocks.Content,null)}})}()}();