(window.webpackJsonp=window.webpackJsonp||[]).push([[94,95],{156:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0,n(269),n(270),n(271);var r,a=n(85),o=function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)if(Object.prototype.hasOwnProperty.call(e,n)){var r=Object.defineProperty&&Object.getOwnPropertyDescriptor?Object.getOwnPropertyDescriptor(e,n):{};r.get||r.set?Object.defineProperty(t,n,r):t[n]=e[n]}return t.default=e,t}(n(0)),i=(r=n(1))&&r.__esModule?r:{default:r},l=n(273),s=n(286);function u(e){return(u="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function c(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function d(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function f(e,t,n){return t&&d(e.prototype,t),n&&d(e,n),e}function p(e,t){return!t||"object"!==u(t)&&"function"!=typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function m(e){return(m=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function g(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&y(e,t)}function y(e,t){return(y=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function _(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var b=(0,l.css)("&.dnb-loan-sausage{margin:2rem 0;padding:2rem 0;background:var(--color-light-grey);",";.dnb-loan-sausage__header{display:flex;justify-content:space-between;}.dnb-loan-sausage__title{display:flex;align-items:flex-end;}.dnb-loan-sausage__title__key{font-size:1.125rem;margin-right:0.5rem;}.dnb-loan-sausage__title__value,.dnb-loan-sausage__title__currency{font-size:2rem;}",";.dnb-loan-sausage__title__modal-container{margin-left:0.5rem;}.dnb-loan-sausage__sausage{margin:1rem 0 1rem 0;display:flex;border-radius:2rem;background-color:var(--color-mint-green-alt);position:relative;}.dnb-loan-sausage__sausage__bar{width:100%;height:2rem;}.dnb-loan-sausage__sausage__item__description{font-size:0.75rem;display:flex;align-items:center;align-content:center;justify-content:center;position:absolute;bottom:-1.75rem;width:100%;}.dnb-loan-sausage__sausage__description-line{width:100%;height:1px;background:var(--color-summer-green);}.dnb-loan-sausage__sausage__description-text{margin:0 0.5rem;}}.dnb-loan-sausage__sausage__item{text-align:center;border-radius:0 2rem 2rem 0;position:relative;background-color:transparent;}.dnb-loan-sausage__sausage__item:first-child{background-color:var(--color-mint-green);border-radius:2rem;z-index:1;.dnb-loan-sausage__sausage__item__description{padding-right:calc(2rem / 2);}}"),h=function(e){function t(){return c(this,t),p(this,m(t).apply(this,arguments))}return g(t,o.Component),f(t,[{key:"render",value:function(){var e=this.props,t=e.equity,n=e.currency,r=e.loan;return o.default.createElement("div",{className:(0,a.css)(b)+" dnb-loan-sausage"},o.default.createElement("div",{className:"dnb-width-limit"},o.default.createElement("div",{className:"dnb-loan-sausage__inner"},o.default.createElement("div",{className:"dnb-loan-sausage__header"},o.default.createElement("div",{className:"dnb-loan-sausage__title"},o.default.createElement("h3",{className:"dnb-loan-sausage__title__text typo-light","aria-describedby":"equity-modal-text"},o.default.createElement("span",{className:"dnb-loan-sausage__title__key"},"Egenkapital:"),o.default.createElement("span",{className:"dnb-loan-sausage__title__value"},t),o.default.createElement("span",{className:"dnb-loan-sausage__title__currency"},n)),o.default.createElement("div",{className:"dnb-loan-sausage__title__modal-container"},o.default.createElement(s.Modal,{type:"button",modal_trigger_text:"Trykk for mer info om egenkapital",modal_content:"Dette er litt ekstra informasjon om egenkapitalen.",content_id:"equity-modal-text"}))),o.default.createElement("div",{className:"dnb-loan-sausage__title"},o.default.createElement("h3",{className:"dnb-loan-sausage__title__text typo-light","aria-describedby":"loan-modal-text"},o.default.createElement("span",{className:"dnb-loan-sausage__title__key"},"Lån:"),o.default.createElement("span",{className:"dnb-loan-sausage__title__value"},r),o.default.createElement("span",{className:"dnb-loan-sausage__title__currency"},n)),o.default.createElement("div",{className:"dnb-loan-sausage__title__modal-container"},o.default.createElement(s.Modal,{type:"button",modal_trigger_text:"Trykk for mer info om lånbeløpet",modal_content:"Dette er litt ekstra informasjon om lånbeløpet.",content_id:"loan-modal-text"})))),o.default.createElement("div",{className:"dnb-loan-sausage__sausage"},o.default.createElement(v,{percentage:"25",title:"Egenkapital"}),o.default.createElement(v,{percentage:"75",title:"Lånemulighet"})))))}}]),t}();t.default=h,_(h,"propTypes",{equity:i.default.string.isRequired,currency:i.default.string.isRequired,loan:i.default.string.isRequired});var v=function(e){function t(){return c(this,t),p(this,m(t).apply(this,arguments))}return g(t,o.Component),f(t,[{key:"render",value:function(){var e=this.props,t=e.title,n=e.percentage;return o.default.createElement("div",{className:"dnb-loan-sausage__sausage__item",style:{flex:"0 0 ".concat(n,"%")}},o.default.createElement("div",{className:"dnb-loan-sausage__sausage__bar","aria-describedby":t.toLowerCase()}),o.default.createElement("div",{className:"dnb-loan-sausage__sausage__item__description typo-demi"},o.default.createElement("span",{className:"dnb-loan-sausage__sausage__description-line","aria-hidden":"true"}),o.default.createElement("span",{className:"dnb-loan-sausage__sausage__description-text",id:t.toLowerCase()},t),o.default.createElement("span",{className:"dnb-loan-sausage__sausage__description-line","aria-hidden":"true"})))}}]),t}();_(v,"propTypes",{title:i.default.string.isRequired,percentage:i.default.string.isRequired})},160:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0,n(269),n(270),n(271);var r=n(85),a=c(n(0)),o=n(273),i=u(n(777)),l=c(n(286)),s=u(n(156));function u(e){return e&&e.__esModule?e:{default:e}}function c(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)if(Object.prototype.hasOwnProperty.call(e,n)){var r=Object.defineProperty&&Object.getOwnPropertyDescriptor?Object.getOwnPropertyDescriptor(e,n):{};r.get||r.set?Object.defineProperty(t,n,r):t[n]=e[n]}return t.default=e,t}function d(e){return(d="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function f(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function p(e,t){return!t||"object"!==d(t)&&"function"!=typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function m(e){return(m=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function g(e,t){return(g=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}n(919),n(335),n(336);var y=(0,o.css)("background:white;"),_=function(e){function t(){return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),p(this,m(t).apply(this,arguments))}var n,o,u;return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&g(e,t)}(t,a.Component),n=t,(o=[{key:"componentDidMount",value:function(){l.default.enableWebComponents()}},{key:"render",value:function(){return a.default.createElement(l.Body,{className:"main"},a.default.createElement(i.default,null,a.default.createElement("title",null,"Example App"),a.default.createElement("link",{rel:"preload",href:"/static/FedraSansStd-Book-16f3175a8555daaac25d4ece485c9486.woff",as:"font",type:"font/woff",crossOrigin:!0})),a.default.createElement("div",{className:(0,r.css)(y)},a.default.createElement(l.MainNav,{notification_amount:"2",data:[{title:"Title 1",url:"?url1"},{title:"Title 2",url:"?url2"},{title:"Title 3",url:"?url3"},{title:"Title 4",url:"?url4"},{title:"Title 5",url:"?url5"},{title:"Title 6",url:"?url6"}]}),a.default.createElement("div",{className:"dnb-width-limit"},a.default.createElement(l.ViewTitle,{text:"Finansieringsbevis"})),a.default.createElement(l.StepIndicator,{data:b,active_item:"4"}),a.default.createElement(l.Form,null,a.default.createElement("fieldset",{className:"dnb-form__fieldset"},a.default.createElement("div",{className:"dnb-width-limit"},a.default.createElement(l.LineTitle,{content:"Din egenkapital og lånemulighet",tag:"legend"})),a.default.createElement(s.default,{equity:"1 808 888",loan:"4 300 000",currency:"kr"}),a.default.createElement("div",{className:"dnb-width-limit"},a.default.createElement(l.RangeSlider,{label_text:"Hvor mye ønsker du å kjøpe bolig for?",range_min:1e6,range_max:8e6,range_val:5908e3,range_step:1e5,range_output_description:"Kr",range_output_extra_information:"Maksimumsbeløpet inkluderer eventuell fellesgjeld og omkostninger ved kjøp.",range_modal_trigger_text:"Trykk for mer info",range_modal_text:"Dette er litt ekstra informasjon. Lorem ipsum lipsumbolius."}))),a.default.createElement(l.FormSummary,{title:"Hva vil dette koste?",text:"Dette er et estimat basert på eksempelrente og en nedbetalingstid på 25 år. Månedkostnadene inkluderer renter og avdrag.",descriptionListInfo:"* Du må alltid ta høyde for en renteøkning på 5%. Samtidig må du også vurdere hvordan lånekostnadene vil påvirke din økonomi.",descriptionListData:[{title:"Månedskostnad",value:"19 200 kr"},{title:"Månedkostnad ved 5% renteøkning",value:"31 500 kr*"}]})),a.default.createElement(l.ActionNav,{prev_href:"/uilib/demos/example-app-1/",next_href:"/uilib/demos/example-app-3/"},a.default.createElement("div",{className:"dnb-action-nav__item"},a.default.createElement(l.Button,{text:"Lagre",title:"Lagre",icon_position:"left",variant:"secondary",icon:"download"})),a.default.createElement("div",{className:"dnb-action-nav__item"},a.default.createElement(l.Button,{text:"Avbryt",title:"Avbryt",icon_position:"left",variant:"secondary",icon:"close"})))))}}])&&f(n.prototype,o),u&&f(n,u),t}();t.default=_;var b=JSON.stringify([{title:"Velg bolig",url:"?a"},{title:"Egenkapital bolig",url:"?b"},{title:"Din økonomi",url:"?c"},{title:"Dine muligheter",url:"?d"},{title:"Oppsummering",url:"?e"}])},269:function(e,t,n){n(784)("asyncIterator")},270:function(e,t,n){"use strict";var r=n(5),a=n(32),o=n(20),i=n(7),l=n(22),s=n(787).KEY,u=n(19),c=n(61),d=n(47),f=n(45),p=n(4),m=n(785),g=n(784),y=n(788),_=n(97),b=n(12),h=n(14),v=n(44),k=n(96),w=n(59),x=n(60),E=n(789),O=n(790),S=n(31),P=n(43),N=O.f,j=S.f,T=E.f,M=r.Symbol,C=r.JSON,R=C&&C.stringify,L=p("_hidden"),D=p("toPrimitive"),A={}.propertyIsEnumerable,F=c("symbol-registry"),I=c("symbols"),q=c("op-symbols"),z=Object.prototype,H="function"==typeof M,B=r.QObject,U=!B||!B.prototype||!B.prototype.findChild,W=o&&u(function(){return 7!=x(j({},"a",{get:function(){return j(this,"a",{value:7}).a}})).a})?function(e,t,n){var r=N(z,t);r&&delete z[t],j(e,t,n),r&&e!==z&&j(z,t,r)}:j,V=function(e){var t=I[e]=x(M.prototype);return t._k=e,t},J=H&&"symbol"==typeof M.iterator?function(e){return"symbol"==typeof e}:function(e){return e instanceof M},X=function(e,t,n){return e===z&&X(q,t,n),b(e),t=k(t,!0),b(n),a(I,t)?(n.enumerable?(a(e,L)&&e[L][t]&&(e[L][t]=!1),n=x(n,{enumerable:w(0,!1)})):(a(e,L)||j(e,L,w(1,{})),e[L][t]=!0),W(e,t,n)):j(e,t,n)},Y=function(e,t){b(e);for(var n,r=y(t=v(t)),a=0,o=r.length;o>a;)X(e,n=r[a++],t[n]);return e},G=function(e){var t=A.call(this,e=k(e,!0));return!(this===z&&a(I,e)&&!a(q,e))&&(!(t||!a(this,e)||!a(I,e)||a(this,L)&&this[L][e])||t)},K=function(e,t){if(e=v(e),t=k(t,!0),e!==z||!a(I,t)||a(q,t)){var n=N(e,t);return!n||!a(I,t)||a(e,L)&&e[L][t]||(n.enumerable=!0),n}},Z=function(e){for(var t,n=T(v(e)),r=[],o=0;n.length>o;)a(I,t=n[o++])||t==L||t==s||r.push(t);return r},Q=function(e){for(var t,n=e===z,r=T(n?q:v(e)),o=[],i=0;r.length>i;)!a(I,t=r[i++])||n&&!a(z,t)||o.push(I[t]);return o};H||(l((M=function(){if(this instanceof M)throw TypeError("Symbol is not a constructor!");var e=f(arguments.length>0?arguments[0]:void 0),t=function(n){this===z&&t.call(q,n),a(this,L)&&a(this[L],e)&&(this[L][e]=!1),W(this,e,w(1,n))};return o&&U&&W(z,e,{configurable:!0,set:t}),V(e)}).prototype,"toString",function(){return this._k}),O.f=K,S.f=X,n(786).f=E.f=Z,n(94).f=G,n(95).f=Q,o&&!n(46)&&l(z,"propertyIsEnumerable",G,!0),m.f=function(e){return V(p(e))}),i(i.G+i.W+i.F*!H,{Symbol:M});for(var $="hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables".split(","),ee=0;$.length>ee;)p($[ee++]);for(var te=P(p.store),ne=0;te.length>ne;)g(te[ne++]);i(i.S+i.F*!H,"Symbol",{for:function(e){return a(F,e+="")?F[e]:F[e]=M(e)},keyFor:function(e){if(!J(e))throw TypeError(e+" is not a symbol!");for(var t in F)if(F[t]===e)return t},useSetter:function(){U=!0},useSimple:function(){U=!1}}),i(i.S+i.F*!H,"Object",{create:function(e,t){return void 0===t?x(e):Y(x(e),t)},defineProperty:X,defineProperties:Y,getOwnPropertyDescriptor:K,getOwnPropertyNames:Z,getOwnPropertySymbols:Q}),C&&i(i.S+i.F*(!H||u(function(){var e=M();return"[null]"!=R([e])||"{}"!=R({a:e})||"{}"!=R(Object(e))})),"JSON",{stringify:function(e){for(var t,n,r=[e],a=1;arguments.length>a;)r.push(arguments[a++]);if(n=t=r[1],(h(t)||void 0!==e)&&!J(e))return _(t)||(t=function(e,t){if("function"==typeof n&&(t=n.call(this,e,t)),!J(t))return t}),r[1]=t,R.apply(C,r)}}),M.prototype[D]||n(15)(M.prototype,D,M.prototype.valueOf),d(M,"Symbol"),d(Math,"Math",!0),d(r.JSON,"JSON",!0)},273:function(e,t,n){"use strict";n.r(t);var r=n(0),a=n.n(r),o=n(85),i=n(1),l=n.n(i),s=n(62),u=/^((children|dangerouslySetInnerHTML|key|ref|autoFocus|defaultValue|defaultChecked|innerHTML|suppressContentEditableWarning|valueLink|accept|acceptCharset|accessKey|action|allow|allowFullScreen|allowTransparency|alt|async|autoComplete|autoPlay|capture|cellPadding|cellSpacing|challenge|charSet|checked|cite|classID|className|cols|colSpan|content|contentEditable|contextMenu|controls|controlsList|coords|crossOrigin|data|dateTime|default|defer|dir|disabled|download|draggable|encType|form|formAction|formEncType|formMethod|formNoValidate|formTarget|frameBorder|headers|height|hidden|high|href|hrefLang|htmlFor|httpEquiv|id|inputMode|integrity|is|keyParams|keyType|kind|label|lang|list|loop|low|marginHeight|marginWidth|max|maxLength|media|mediaGroup|method|min|minLength|multiple|muted|name|nonce|noValidate|open|optimum|pattern|placeholder|playsInline|poster|preload|profile|radioGroup|readOnly|referrerPolicy|rel|required|reversed|role|rows|rowSpan|sandbox|scope|scoped|scrolling|seamless|selected|shape|size|sizes|slot|span|spellCheck|src|srcDoc|srcLang|srcSet|start|step|style|summary|tabIndex|target|title|type|useMap|value|width|wmode|wrap|about|datatype|inlist|prefix|property|resource|typeof|vocab|autoCapitalize|autoCorrect|autoSave|color|itemProp|itemScope|itemType|itemID|itemRef|results|security|unselectable|accentHeight|accumulate|additive|alignmentBaseline|allowReorder|alphabetic|amplitude|arabicForm|ascent|attributeName|attributeType|autoReverse|azimuth|baseFrequency|baselineShift|baseProfile|bbox|begin|bias|by|calcMode|capHeight|clip|clipPathUnits|clipPath|clipRule|colorInterpolation|colorInterpolationFilters|colorProfile|colorRendering|contentScriptType|contentStyleType|cursor|cx|cy|d|decelerate|descent|diffuseConstant|direction|display|divisor|dominantBaseline|dur|dx|dy|edgeMode|elevation|enableBackground|end|exponent|externalResourcesRequired|fill|fillOpacity|fillRule|filter|filterRes|filterUnits|floodColor|floodOpacity|focusable|fontFamily|fontSize|fontSizeAdjust|fontStretch|fontStyle|fontVariant|fontWeight|format|from|fr|fx|fy|g1|g2|glyphName|glyphOrientationHorizontal|glyphOrientationVertical|glyphRef|gradientTransform|gradientUnits|hanging|horizAdvX|horizOriginX|ideographic|imageRendering|in|in2|intercept|k|k1|k2|k3|k4|kernelMatrix|kernelUnitLength|kerning|keyPoints|keySplines|keyTimes|lengthAdjust|letterSpacing|lightingColor|limitingConeAngle|local|markerEnd|markerMid|markerStart|markerHeight|markerUnits|markerWidth|mask|maskContentUnits|maskUnits|mathematical|mode|numOctaves|offset|opacity|operator|order|orient|orientation|origin|overflow|overlinePosition|overlineThickness|panose1|paintOrder|pathLength|patternContentUnits|patternTransform|patternUnits|pointerEvents|points|pointsAtX|pointsAtY|pointsAtZ|preserveAlpha|preserveAspectRatio|primitiveUnits|r|radius|refX|refY|renderingIntent|repeatCount|repeatDur|requiredExtensions|requiredFeatures|restart|result|rotate|rx|ry|scale|seed|shapeRendering|slope|spacing|specularConstant|specularExponent|speed|spreadMethod|startOffset|stdDeviation|stemh|stemv|stitchTiles|stopColor|stopOpacity|strikethroughPosition|strikethroughThickness|string|stroke|strokeDasharray|strokeDashoffset|strokeLinecap|strokeLinejoin|strokeMiterlimit|strokeOpacity|strokeWidth|surfaceScale|systemLanguage|tableValues|targetX|targetY|textAnchor|textDecoration|textRendering|textLength|to|transform|u1|u2|underlinePosition|underlineThickness|unicode|unicodeBidi|unicodeRange|unitsPerEm|vAlphabetic|vHanging|vIdeographic|vMathematical|values|vectorEffect|version|vertAdvY|vertOriginX|vertOriginY|viewBox|viewTarget|visibility|widths|wordSpacing|writingMode|x|xHeight|x1|x2|xChannelSelector|xlinkActuate|xlinkArcrole|xlinkHref|xlinkRole|xlinkShow|xlinkTitle|xlinkType|xmlBase|xmlns|xmlnsXlink|xmlLang|xmlSpace|y|y1|y2|yChannelSelector|z|zoomAndPan|for|class)|(on[A-Z].*)|((data|aria|x)-.*))$/i,c=Object(s.a)(u.test.bind(u));var d,f="__EMOTION_THEMING__",p=((d={})[f]=l.a.object,d);var m=c,g=function(e){return"theme"!==e&&"innerRef"!==e},y=function(){return!0},_=function(e,t){for(var n=2,r=arguments.length;n<r;n++){var a=arguments[n],o=void 0;for(o in a)e(o)&&(t[o]=a[o])}return t};var b=function(e,t){var n=function(r,a){var o,i,l,s;void 0!==a&&(o=a.e,i=a.label,l=a.target,s=r.__emotion_forwardProp&&a.shouldForwardProp?function(e){return r.__emotion_forwardProp(e)&&a.shouldForwardProp(e)}:a.shouldForwardProp);var u=r.__emotion_real===r,c=void 0===o&&u&&r.__emotion_base||r;return"function"!=typeof s&&(s="string"==typeof c&&c.charAt(0)===c.charAt(0).toLowerCase()?m:g),function(){var d=arguments,m=u&&void 0!==r.__emotion_styles?r.__emotion_styles.slice(0):[];if(void 0!==i&&m.push("label:"+i+";"),void 0===o)if(null==d[0]||void 0===d[0].raw)m.push.apply(m,d);else{m.push(d[0][0]);for(var g=d.length,b=1;b<g;b++)m.push(d[b],d[0][b])}var h=function(n){var r,a;function i(){return n.apply(this,arguments)||this}a=n,(r=i).prototype=Object.create(a.prototype),r.prototype.constructor=r,r.__proto__=a;var u=i.prototype;return u.componentWillMount=function(){void 0!==this.context[f]&&(this.unsubscribe=this.context[f].subscribe(function(e){this.setState({theme:e})}.bind(this)))},u.componentWillUnmount=function(){void 0!==this.unsubscribe&&this.context[f].unsubscribe(this.unsubscribe)},u.render=function(){var n=this.props,r=this.state;this.mergedProps=_(y,{},n,{theme:null!==r&&r.theme||n.theme||{}});var a="",i=[];return n.className&&(a+=void 0===o?e.getRegisteredStyles(i,n.className):n.className+" "),a+=void 0===o?e.css.apply(this,m.concat(i)):o,void 0!==l&&(a+=" "+l),t.createElement(c,_(s,{},n,{className:a,ref:n.innerRef}))},i}(t.Component);return h.displayName=void 0!==i?i:"Styled("+("string"==typeof c?c:c.displayName||c.name||"Component")+")",void 0!==r.defaultProps&&(h.defaultProps=r.defaultProps),h.contextTypes=p,h.__emotion_styles=m,h.__emotion_base=c,h.__emotion_real=h,h.__emotion_forwardProp=s,Object.defineProperty(h,"toString",{value:function(){return"."+l}}),h.withComponent=function(e,t){return n(e,void 0!==t?_(y,{},a,t):a).apply(void 0,m)},h}};return n};n.d(t,"flush",function(){return o.flush}),n.d(t,"hydrate",function(){return o.hydrate}),n.d(t,"cx",function(){return o.cx}),n.d(t,"merge",function(){return o.merge}),n.d(t,"getRegisteredStyles",function(){return o.getRegisteredStyles}),n.d(t,"injectGlobal",function(){return o.injectGlobal}),n.d(t,"keyframes",function(){return o.keyframes}),n.d(t,"css",function(){return o.css}),n.d(t,"sheet",function(){return o.sheet}),n.d(t,"caches",function(){return o.caches});var h=b(o,a.a);t.default=h},784:function(e,t,n){var r=n(5),a=n(21),o=n(46),i=n(785),l=n(31).f;e.exports=function(e){var t=a.Symbol||(a.Symbol=o?{}:r.Symbol||{});"_"==e.charAt(0)||e in t||l(t,e,{value:i.f(e)})}},785:function(e,t,n){t.f=n(4)},787:function(e,t,n){var r=n(45)("meta"),a=n(14),o=n(32),i=n(31).f,l=0,s=Object.isExtensible||function(){return!0},u=!n(19)(function(){return s(Object.preventExtensions({}))}),c=function(e){i(e,r,{value:{i:"O"+ ++l,w:{}}})},d=e.exports={KEY:r,NEED:!1,fastKey:function(e,t){if(!a(e))return"symbol"==typeof e?e:("string"==typeof e?"S":"P")+e;if(!o(e,r)){if(!s(e))return"F";if(!t)return"E";c(e)}return e[r].i},getWeak:function(e,t){if(!o(e,r)){if(!s(e))return!0;if(!t)return!1;c(e)}return e[r].w},onFreeze:function(e){return u&&d.NEED&&s(e)&&!o(e,r)&&c(e),e}}},788:function(e,t,n){var r=n(43),a=n(95),o=n(94);e.exports=function(e){var t=r(e),n=a.f;if(n)for(var i,l=n(e),s=o.f,u=0;l.length>u;)s.call(e,i=l[u++])&&t.push(i);return t}},789:function(e,t,n){var r=n(44),a=n(786).f,o={}.toString,i="object"==typeof window&&window&&Object.getOwnPropertyNames?Object.getOwnPropertyNames(window):[];e.exports.f=function(e){return i&&"[object Window]"==o.call(e)?function(e){try{return a(e)}catch(e){return i.slice()}}(e):a(r(e))}},919:function(e,t,n){"use strict";n.r(t);n(307)}}]);
//# sourceMappingURL=component---src-pages-uilib-demos-example-app-2-index-js-2f35000efcb634377dbb.js.map