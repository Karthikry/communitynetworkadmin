import{r as x,F as Oe,H as we}from"./index-BoyrWkQt.js";var Re={},ee={},fe={},oe={},he;function Ee(){return he||(he=1,function(t){(function(n,r){r(t,x,Oe)})(we,function(n,r,i){Object.defineProperty(n,"__esModule",{value:!0}),n.setHasSupportToCaptureOption=E;var e=a(r),o=a(i);function a(l){return l&&l.__esModule?l:{default:l}}var s=Object.assign||function(l){for(var d=1;d<arguments.length;d++){var S=arguments[d];for(var u in S)Object.prototype.hasOwnProperty.call(S,u)&&(l[u]=S[u])}return l};function f(l,d){var S={};for(var u in l)d.indexOf(u)>=0||Object.prototype.hasOwnProperty.call(l,u)&&(S[u]=l[u]);return S}function h(l,d){if(!(l instanceof d))throw new TypeError("Cannot call a class as a function")}var m=function(){function l(d,S){for(var u=0;u<S.length;u++){var b=S[u];b.enumerable=b.enumerable||!1,b.configurable=!0,"value"in b&&(b.writable=!0),Object.defineProperty(d,b.key,b)}}return function(d,S,u){return S&&l(d.prototype,S),u&&l(d,u),d}}();function v(l,d){if(!l)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return d&&(typeof d=="object"||typeof d=="function")?d:l}function _(l,d){if(typeof d!="function"&&d!==null)throw new TypeError("Super expression must either be null or a function, not "+typeof d);l.prototype=Object.create(d&&d.prototype,{constructor:{value:l,enumerable:!1,writable:!0,configurable:!0}}),d&&(Object.setPrototypeOf?Object.setPrototypeOf(l,d):l.__proto__=d)}var g=!1;function E(l){g=l}try{addEventListener("test",null,Object.defineProperty({},"capture",{get:function(){E(!0)}}))}catch{}function B(){var l=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{capture:!0};return g?l:l.capture}function ie(l){if("touches"in l){var d=l.touches[0],S=d.pageX,u=d.pageY;return{x:S,y:u}}var b=l.screenX,I=l.screenY;return{x:b,y:I}}var z=function(l){_(d,l);function d(){var S;h(this,d);for(var u=arguments.length,b=Array(u),I=0;I<u;I++)b[I]=arguments[I];var w=v(this,(S=d.__proto__||Object.getPrototypeOf(d)).call.apply(S,[this].concat(b)));return w._handleSwipeStart=w._handleSwipeStart.bind(w),w._handleSwipeMove=w._handleSwipeMove.bind(w),w._handleSwipeEnd=w._handleSwipeEnd.bind(w),w._onMouseDown=w._onMouseDown.bind(w),w._onMouseMove=w._onMouseMove.bind(w),w._onMouseUp=w._onMouseUp.bind(w),w._setSwiperRef=w._setSwiperRef.bind(w),w}return m(d,[{key:"componentDidMount",value:function(){this.swiper&&this.swiper.addEventListener("touchmove",this._handleSwipeMove,B({capture:!0,passive:!1}))}},{key:"componentWillUnmount",value:function(){this.swiper&&this.swiper.removeEventListener("touchmove",this._handleSwipeMove,B({capture:!0,passive:!1}))}},{key:"_onMouseDown",value:function(u){this.props.allowMouseEvents&&(this.mouseDown=!0,document.addEventListener("mouseup",this._onMouseUp),document.addEventListener("mousemove",this._onMouseMove),this._handleSwipeStart(u))}},{key:"_onMouseMove",value:function(u){this.mouseDown&&this._handleSwipeMove(u)}},{key:"_onMouseUp",value:function(u){this.mouseDown=!1,document.removeEventListener("mouseup",this._onMouseUp),document.removeEventListener("mousemove",this._onMouseMove),this._handleSwipeEnd(u)}},{key:"_handleSwipeStart",value:function(u){var b=ie(u),I=b.x,w=b.y;this.moveStart={x:I,y:w},this.props.onSwipeStart(u)}},{key:"_handleSwipeMove",value:function(u){if(this.moveStart){var b=ie(u),I=b.x,w=b.y,X=I-this.moveStart.x,de=w-this.moveStart.y;this.moving=!0;var Pe=this.props.onSwipeMove({x:X,y:de},u);Pe&&u.cancelable&&u.preventDefault(),this.movePosition={deltaX:X,deltaY:de}}}},{key:"_handleSwipeEnd",value:function(u){this.props.onSwipeEnd(u);var b=this.props.tolerance;this.moving&&this.movePosition&&(this.movePosition.deltaX<-b?this.props.onSwipeLeft(1,u):this.movePosition.deltaX>b&&this.props.onSwipeRight(1,u),this.movePosition.deltaY<-b?this.props.onSwipeUp(1,u):this.movePosition.deltaY>b&&this.props.onSwipeDown(1,u)),this.moveStart=null,this.moving=!1,this.movePosition=null}},{key:"_setSwiperRef",value:function(u){this.swiper=u,this.props.innerRef(u)}},{key:"render",value:function(){var u=this.props;u.tagName;var b=u.className,I=u.style,w=u.children;u.allowMouseEvents,u.onSwipeUp,u.onSwipeDown,u.onSwipeLeft,u.onSwipeRight,u.onSwipeStart,u.onSwipeMove,u.onSwipeEnd,u.innerRef,u.tolerance;var X=f(u,["tagName","className","style","children","allowMouseEvents","onSwipeUp","onSwipeDown","onSwipeLeft","onSwipeRight","onSwipeStart","onSwipeMove","onSwipeEnd","innerRef","tolerance"]);return e.default.createElement(this.props.tagName,s({ref:this._setSwiperRef,onMouseDown:this._onMouseDown,onTouchStart:this._handleSwipeStart,onTouchEnd:this._handleSwipeEnd,className:b,style:I},X),w)}}]),d}(r.Component);z.displayName="ReactSwipe",z.propTypes={tagName:o.default.string,className:o.default.string,style:o.default.object,children:o.default.node,allowMouseEvents:o.default.bool,onSwipeUp:o.default.func,onSwipeDown:o.default.func,onSwipeLeft:o.default.func,onSwipeRight:o.default.func,onSwipeStart:o.default.func,onSwipeMove:o.default.func,onSwipeEnd:o.default.func,innerRef:o.default.func,tolerance:o.default.number.isRequired},z.defaultProps={tagName:"div",allowMouseEvents:!1,onSwipeUp:function(){},onSwipeDown:function(){},onSwipeLeft:function(){},onSwipeRight:function(){},onSwipeStart:function(){},onSwipeMove:function(){},onSwipeEnd:function(){},innerRef:function(){},tolerance:0},n.default=z})}(oe)),oe}(function(t){(function(n,r){r(t,Ee())})(we,function(n,r){Object.defineProperty(n,"__esModule",{value:!0});var i=e(r);function e(o){return o&&o.__esModule?o:{default:o}}n.default=i.default})})(fe);var F={},Se={exports:{}};/*!
	Copyright (c) 2018 Jed Watson.
	Licensed under the MIT License (MIT), see
	http://jedwatson.github.io/classnames
*/(function(t){(function(){var n={}.hasOwnProperty;function r(){for(var o="",a=0;a<arguments.length;a++){var s=arguments[a];s&&(o=e(o,i(s)))}return o}function i(o){if(typeof o=="string"||typeof o=="number")return o;if(typeof o!="object")return"";if(Array.isArray(o))return r.apply(null,o);if(o.toString!==Object.prototype.toString&&!o.toString.toString().includes("[native code]"))return o.toString();var a="";for(var s in o)n.call(o,s)&&o[s]&&(a=e(a,s));return a}function e(o,a){return a?o?o+" "+a:o+a:o}t.exports?(r.default=r,t.exports=r):window.classNames=r})()})(Se);var Ie=Se.exports;Object.defineProperty(F,"__esModule",{value:!0});F.default=void 0;var A=Te(Ie);function Te(t){return t&&t.__esModule?t:{default:t}}function Me(t,n,r){return n in t?Object.defineProperty(t,n,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[n]=r,t}var Ce={ROOT:function(n){return(0,A.default)(Me({"carousel-root":!0},n||"",!!n))},CAROUSEL:function(n){return(0,A.default)({carousel:!0,"carousel-slider":n})},WRAPPER:function(n,r){return(0,A.default)({"thumbs-wrapper":!n,"slider-wrapper":n,"axis-horizontal":r==="horizontal","axis-vertical":r!=="horizontal"})},SLIDER:function(n,r){return(0,A.default)({thumbs:!n,slider:n,animated:!r})},ITEM:function(n,r,i){return(0,A.default)({thumb:!n,slide:n,selected:r,previous:i})},ARROW_PREV:function(n){return(0,A.default)({"control-arrow control-prev":!0,"control-disabled":n})},ARROW_NEXT:function(n){return(0,A.default)({"control-arrow control-next":!0,"control-disabled":n})},DOT:function(n){return(0,A.default)({dot:!0,selected:n})}};F.default=Ce;var K={},te={};Object.defineProperty(te,"__esModule",{value:!0});te.outerWidth=void 0;var Le=function(n){var r=n.offsetWidth,i=getComputedStyle(n);return r+=parseInt(i.marginLeft)+parseInt(i.marginRight),r};te.outerWidth=Le;var N={};Object.defineProperty(N,"__esModule",{value:!0});N.default=void 0;var De=function(n,r,i){var e=n===0?n:n+r,o=i==="horizontal"?[e,0,0]:[0,e,0],a="translate3d",s="("+o.join(",")+")";return a+s};N.default=De;var j={};Object.defineProperty(j,"__esModule",{value:!0});j.default=void 0;var Ae=function(){return window};j.default=Ae;Object.defineProperty(K,"__esModule",{value:!0});K.default=void 0;var T=ze(x),W=ne(F),We=te,me=ne(N),ke=ne(fe),V=ne(j);function ne(t){return t&&t.__esModule?t:{default:t}}function be(){if(typeof WeakMap!="function")return null;var t=new WeakMap;return be=function(){return t},t}function ze(t){if(t&&t.__esModule)return t;if(t===null||$(t)!=="object"&&typeof t!="function")return{default:t};var n=be();if(n&&n.has(t))return n.get(t);var r={},i=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var e in t)if(Object.prototype.hasOwnProperty.call(t,e)){var o=i?Object.getOwnPropertyDescriptor(t,e):null;o&&(o.get||o.set)?Object.defineProperty(r,e,o):r[e]=t[e]}return r.default=t,n&&n.set(t,r),r}function $(t){"@babel/helpers - typeof";return typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?$=function(r){return typeof r}:$=function(r){return r&&typeof Symbol=="function"&&r.constructor===Symbol&&r!==Symbol.prototype?"symbol":typeof r},$(t)}function ae(){return ae=Object.assign||function(t){for(var n=1;n<arguments.length;n++){var r=arguments[n];for(var i in r)Object.prototype.hasOwnProperty.call(r,i)&&(t[i]=r[i])}return t},ae.apply(this,arguments)}function Ne(t,n){if(!(t instanceof n))throw new TypeError("Cannot call a class as a function")}function He(t,n){for(var r=0;r<n.length;r++){var i=n[r];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}function $e(t,n,r){return n&&He(t.prototype,n),t}function Ue(t,n){if(typeof n!="function"&&n!==null)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(n&&n.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),n&&se(t,n)}function se(t,n){return se=Object.setPrototypeOf||function(i,e){return i.__proto__=e,i},se(t,n)}function xe(t){var n=Ke();return function(){var i=J(t),e;if(n){var o=J(this).constructor;e=Reflect.construct(i,arguments,o)}else e=i.apply(this,arguments);return Fe(this,e)}}function Fe(t,n){return n&&($(n)==="object"||typeof n=="function")?n:O(t)}function O(t){if(t===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}function Ke(){if(typeof Reflect>"u"||!Reflect.construct||Reflect.construct.sham)return!1;if(typeof Proxy=="function")return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],function(){})),!0}catch{return!1}}function J(t){return J=Object.setPrototypeOf?Object.getPrototypeOf:function(r){return r.__proto__||Object.getPrototypeOf(r)},J(t)}function P(t,n,r){return n in t?Object.defineProperty(t,n,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[n]=r,t}var je=function(n){return n.hasOwnProperty("key")},ce=function(t){Ue(r,t);var n=xe(r);function r(i){var e;return Ne(this,r),e=n.call(this,i),P(O(e),"itemsWrapperRef",void 0),P(O(e),"itemsListRef",void 0),P(O(e),"thumbsRef",void 0),P(O(e),"setItemsWrapperRef",function(o){e.itemsWrapperRef=o}),P(O(e),"setItemsListRef",function(o){e.itemsListRef=o}),P(O(e),"setThumbsRef",function(o,a){e.thumbsRef||(e.thumbsRef=[]),e.thumbsRef[a]=o}),P(O(e),"updateSizes",function(){if(!(!e.props.children||!e.itemsWrapperRef||!e.thumbsRef)){var o=T.Children.count(e.props.children),a=e.itemsWrapperRef.clientWidth,s=e.props.thumbWidth?e.props.thumbWidth:(0,We.outerWidth)(e.thumbsRef[0]),f=Math.floor(a/s),h=f<o,m=h?o-f:0;e.setState(function(v,_){return{itemSize:s,visibleItems:f,firstItem:h?e.getFirstItem(_.selectedItem):0,lastPosition:m,showArrows:h}})}}),P(O(e),"handleClickItem",function(o,a,s){if(!je(s)||s.key==="Enter"){var f=e.props.onSelectItem;typeof f=="function"&&f(o,a)}}),P(O(e),"onSwipeStart",function(){e.setState({swiping:!0})}),P(O(e),"onSwipeEnd",function(){e.setState({swiping:!1})}),P(O(e),"onSwipeMove",function(o){var a=o.x;if(!e.state.itemSize||!e.itemsWrapperRef||!e.state.visibleItems)return!1;var s=0,f=T.Children.count(e.props.children),h=-(e.state.firstItem*100)/e.state.visibleItems,m=Math.max(f-e.state.visibleItems,0),v=-m*100/e.state.visibleItems;h===s&&a>0&&(a=0),h===v&&a<0&&(a=0);var _=e.itemsWrapperRef.clientWidth,g=h+100/(_/a);return e.itemsListRef&&["WebkitTransform","MozTransform","MsTransform","OTransform","transform","msTransform"].forEach(function(E){e.itemsListRef.style[E]=(0,me.default)(g,"%",e.props.axis)}),!0}),P(O(e),"slideRight",function(o){e.moveTo(e.state.firstItem-(typeof o=="number"?o:1))}),P(O(e),"slideLeft",function(o){e.moveTo(e.state.firstItem+(typeof o=="number"?o:1))}),P(O(e),"moveTo",function(o){o=o<0?0:o,o=o>=e.state.lastPosition?e.state.lastPosition:o,e.setState({firstItem:o})}),e.state={selectedItem:i.selectedItem,swiping:!1,showArrows:!1,firstItem:0,visibleItems:0,lastPosition:0},e}return $e(r,[{key:"componentDidMount",value:function(){this.setupThumbs()}},{key:"componentDidUpdate",value:function(e){this.props.selectedItem!==this.state.selectedItem&&this.setState({selectedItem:this.props.selectedItem,firstItem:this.getFirstItem(this.props.selectedItem)}),this.props.children!==e.children&&this.updateSizes()}},{key:"componentWillUnmount",value:function(){this.destroyThumbs()}},{key:"setupThumbs",value:function(){(0,V.default)().addEventListener("resize",this.updateSizes),(0,V.default)().addEventListener("DOMContentLoaded",this.updateSizes),this.updateSizes()}},{key:"destroyThumbs",value:function(){(0,V.default)().removeEventListener("resize",this.updateSizes),(0,V.default)().removeEventListener("DOMContentLoaded",this.updateSizes)}},{key:"getFirstItem",value:function(e){var o=e;return e>=this.state.lastPosition&&(o=this.state.lastPosition),e<this.state.firstItem+this.state.visibleItems&&(o=this.state.firstItem),e<this.state.firstItem&&(o=e),o}},{key:"renderItems",value:function(){var e=this;return this.props.children.map(function(o,a){var s=W.default.ITEM(!1,a===e.state.selectedItem),f={key:a,ref:function(m){return e.setThumbsRef(m,a)},className:s,onClick:e.handleClickItem.bind(e,a,e.props.children[a]),onKeyDown:e.handleClickItem.bind(e,a,e.props.children[a]),"aria-label":"".concat(e.props.labels.item," ").concat(a+1),style:{width:e.props.thumbWidth}};return T.default.createElement("li",ae({},f,{role:"button",tabIndex:0}),o)})}},{key:"render",value:function(){var e=this;if(!this.props.children)return null;var o=T.Children.count(this.props.children)>1,a=this.state.showArrows&&this.state.firstItem>0,s=this.state.showArrows&&this.state.firstItem<this.state.lastPosition,f={},h=-this.state.firstItem*(this.state.itemSize||0),m=(0,me.default)(h,"px",this.props.axis),v=this.props.transitionTime+"ms";return f={WebkitTransform:m,MozTransform:m,MsTransform:m,OTransform:m,transform:m,msTransform:m,WebkitTransitionDuration:v,MozTransitionDuration:v,MsTransitionDuration:v,OTransitionDuration:v,transitionDuration:v,msTransitionDuration:v},T.default.createElement("div",{className:W.default.CAROUSEL(!1)},T.default.createElement("div",{className:W.default.WRAPPER(!1),ref:this.setItemsWrapperRef},T.default.createElement("button",{type:"button",className:W.default.ARROW_PREV(!a),onClick:function(){return e.slideRight()},"aria-label":this.props.labels.leftArrow}),o?T.default.createElement(ke.default,{tagName:"ul",className:W.default.SLIDER(!1,this.state.swiping),onSwipeLeft:this.slideLeft,onSwipeRight:this.slideRight,onSwipeMove:this.onSwipeMove,onSwipeStart:this.onSwipeStart,onSwipeEnd:this.onSwipeEnd,style:f,innerRef:this.setItemsListRef,allowMouseEvents:this.props.emulateTouch},this.renderItems()):T.default.createElement("ul",{className:W.default.SLIDER(!1,this.state.swiping),ref:function(g){return e.setItemsListRef(g)},style:f},this.renderItems()),T.default.createElement("button",{type:"button",className:W.default.ARROW_NEXT(!s),onClick:function(){return e.slideLeft()},"aria-label":this.props.labels.rightArrow})))}}]),r}(T.Component);K.default=ce;P(ce,"displayName","Thumbs");P(ce,"defaultProps",{axis:"horizontal",labels:{leftArrow:"previous slide / item",rightArrow:"next slide / item",item:"slide item"},selectedItem:0,thumbWidth:80,transitionTime:350});var re={};Object.defineProperty(re,"__esModule",{value:!0});re.default=void 0;var qe=function(){return document};re.default=qe;var R={};Object.defineProperty(R,"__esModule",{value:!0});R.setPosition=R.getPosition=R.isKeyboardEvent=R.defaultStatusFormatter=R.noop=void 0;var Be=x,Xe=Ve(N);function Ve(t){return t&&t.__esModule?t:{default:t}}var Ye=function(){};R.noop=Ye;var Ge=function(n,r){return"".concat(n," of ").concat(r)};R.defaultStatusFormatter=Ge;var Je=function(n){return n?n.hasOwnProperty("key"):!1};R.isKeyboardEvent=Je;var Qe=function(n,r){if(r.infiniteLoop&&++n,n===0)return 0;var i=Be.Children.count(r.children);if(r.centerMode&&r.axis==="horizontal"){var e=-n*r.centerSlidePercentage,o=i-1;return n&&(n!==o||r.infiniteLoop)?e+=(100-r.centerSlidePercentage)/2:n===o&&(e+=100-r.centerSlidePercentage),e}return-n*100};R.getPosition=Qe;var Ze=function(n,r){var i={};return["WebkitTransform","MozTransform","MsTransform","OTransform","transform","msTransform"].forEach(function(e){i[e]=(0,Xe.default)(n,"%",r)}),i};R.setPosition=Ze;var C={};Object.defineProperty(C,"__esModule",{value:!0});C.fadeAnimationHandler=C.slideStopSwipingHandler=C.slideSwipeAnimationHandler=C.slideAnimationHandler=void 0;var ge=x,et=tt(N),L=R;function tt(t){return t&&t.__esModule?t:{default:t}}function ve(t,n){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(t);n&&(i=i.filter(function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable})),r.push.apply(r,i)}return r}function k(t){for(var n=1;n<arguments.length;n++){var r=arguments[n]!=null?arguments[n]:{};n%2?ve(Object(r),!0).forEach(function(i){nt(t,i,r[i])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):ve(Object(r)).forEach(function(i){Object.defineProperty(t,i,Object.getOwnPropertyDescriptor(r,i))})}return t}function nt(t,n,r){return n in t?Object.defineProperty(t,n,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[n]=r,t}var rt=function(n,r){var i={},e=r.selectedItem,o=e,a=ge.Children.count(n.children)-1,s=n.infiniteLoop&&(e<0||e>a);if(s)return o<0?n.centerMode&&n.centerSlidePercentage&&n.axis==="horizontal"?i.itemListStyle=(0,L.setPosition)(-(a+2)*n.centerSlidePercentage-(100-n.centerSlidePercentage)/2,n.axis):i.itemListStyle=(0,L.setPosition)(-(a+2)*100,n.axis):o>a&&(i.itemListStyle=(0,L.setPosition)(0,n.axis)),i;var f=(0,L.getPosition)(e,n),h=(0,et.default)(f,"%",n.axis),m=n.transitionTime+"ms";return i.itemListStyle={WebkitTransform:h,msTransform:h,OTransform:h,transform:h},r.swiping||(i.itemListStyle=k(k({},i.itemListStyle),{},{WebkitTransitionDuration:m,MozTransitionDuration:m,OTransitionDuration:m,transitionDuration:m,msTransitionDuration:m})),i};C.slideAnimationHandler=rt;var it=function(n,r,i,e){var o={},a=r.axis==="horizontal",s=ge.Children.count(r.children),f=0,h=(0,L.getPosition)(i.selectedItem,r),m=r.infiniteLoop?(0,L.getPosition)(s-1,r)-100:(0,L.getPosition)(s-1,r),v=a?n.x:n.y,_=v;h===f&&v>0&&(_=0),h===m&&v<0&&(_=0);var g=h+100/(i.itemSize/_),E=Math.abs(v)>r.swipeScrollTolerance;return r.infiniteLoop&&E&&(i.selectedItem===0&&g>-100?g-=s*100:i.selectedItem===s-1&&g<-s*100&&(g+=s*100)),(!r.preventMovementUntilSwipeScrollTolerance||E||i.swipeMovementStarted)&&(i.swipeMovementStarted||e({swipeMovementStarted:!0}),o.itemListStyle=(0,L.setPosition)(g,r.axis)),E&&!i.cancelClick&&e({cancelClick:!0}),o};C.slideSwipeAnimationHandler=it;var ot=function(n,r){var i=(0,L.getPosition)(r.selectedItem,n),e=(0,L.setPosition)(i,n.axis);return{itemListStyle:e}};C.slideStopSwipingHandler=ot;var at=function(n,r){var i=n.transitionTime+"ms",e="ease-in-out",o={position:"absolute",display:"block",zIndex:-2,minHeight:"100%",opacity:0,top:0,right:0,left:0,bottom:0,transitionTimingFunction:e,msTransitionTimingFunction:e,MozTransitionTimingFunction:e,WebkitTransitionTimingFunction:e,OTransitionTimingFunction:e};return r.swiping||(o=k(k({},o),{},{WebkitTransitionDuration:i,MozTransitionDuration:i,OTransitionDuration:i,transitionDuration:i,msTransitionDuration:i})),{slideStyle:o,selectedStyle:k(k({},o),{},{opacity:1,position:"relative"}),prevStyle:k({},o)}};C.fadeAnimationHandler=at;Object.defineProperty(ee,"__esModule",{value:!0});ee.default=void 0;var y=lt(x),st=q(fe),D=q(F),ut=q(K),Y=q(re),G=q(j),H=R,Q=C;function q(t){return t&&t.__esModule?t:{default:t}}function _e(){if(typeof WeakMap!="function")return null;var t=new WeakMap;return _e=function(){return t},t}function lt(t){if(t&&t.__esModule)return t;if(t===null||U(t)!=="object"&&typeof t!="function")return{default:t};var n=_e();if(n&&n.has(t))return n.get(t);var r={},i=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var e in t)if(Object.prototype.hasOwnProperty.call(t,e)){var o=i?Object.getOwnPropertyDescriptor(t,e):null;o&&(o.get||o.set)?Object.defineProperty(r,e,o):r[e]=t[e]}return r.default=t,n&&n.set(t,r),r}function U(t){"@babel/helpers - typeof";return typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?U=function(r){return typeof r}:U=function(r){return r&&typeof Symbol=="function"&&r.constructor===Symbol&&r!==Symbol.prototype?"symbol":typeof r},U(t)}function ue(){return ue=Object.assign||function(t){for(var n=1;n<arguments.length;n++){var r=arguments[n];for(var i in r)Object.prototype.hasOwnProperty.call(r,i)&&(t[i]=r[i])}return t},ue.apply(this,arguments)}function ye(t,n){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(t);n&&(i=i.filter(function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable})),r.push.apply(r,i)}return r}function M(t){for(var n=1;n<arguments.length;n++){var r=arguments[n]!=null?arguments[n]:{};n%2?ye(Object(r),!0).forEach(function(i){c(t,i,r[i])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):ye(Object(r)).forEach(function(i){Object.defineProperty(t,i,Object.getOwnPropertyDescriptor(r,i))})}return t}function ft(t,n){if(!(t instanceof n))throw new TypeError("Cannot call a class as a function")}function ct(t,n){for(var r=0;r<n.length;r++){var i=n[r];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}function pt(t,n,r){return n&&ct(t.prototype,n),t}function dt(t,n){if(typeof n!="function"&&n!==null)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(n&&n.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),n&&le(t,n)}function le(t,n){return le=Object.setPrototypeOf||function(i,e){return i.__proto__=e,i},le(t,n)}function ht(t){var n=vt();return function(){var i=Z(t),e;if(n){var o=Z(this).constructor;e=Reflect.construct(i,arguments,o)}else e=i.apply(this,arguments);return mt(this,e)}}function mt(t,n){return n&&(U(n)==="object"||typeof n=="function")?n:p(t)}function p(t){if(t===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}function vt(){if(typeof Reflect>"u"||!Reflect.construct||Reflect.construct.sham)return!1;if(typeof Proxy=="function")return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],function(){})),!0}catch{return!1}}function Z(t){return Z=Object.setPrototypeOf?Object.getPrototypeOf:function(r){return r.__proto__||Object.getPrototypeOf(r)},Z(t)}function c(t,n,r){return n in t?Object.defineProperty(t,n,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[n]=r,t}var pe=function(t){dt(r,t);var n=ht(r);function r(i){var e;ft(this,r),e=n.call(this,i),c(p(e),"thumbsRef",void 0),c(p(e),"carouselWrapperRef",void 0),c(p(e),"listRef",void 0),c(p(e),"itemsRef",void 0),c(p(e),"timer",void 0),c(p(e),"animationHandler",void 0),c(p(e),"setThumbsRef",function(a){e.thumbsRef=a}),c(p(e),"setCarouselWrapperRef",function(a){e.carouselWrapperRef=a}),c(p(e),"setListRef",function(a){e.listRef=a}),c(p(e),"setItemsRef",function(a,s){e.itemsRef||(e.itemsRef=[]),e.itemsRef[s]=a}),c(p(e),"autoPlay",function(){y.Children.count(e.props.children)<=1||(e.clearAutoPlay(),e.props.autoPlay&&(e.timer=setTimeout(function(){e.increment()},e.props.interval)))}),c(p(e),"clearAutoPlay",function(){e.timer&&clearTimeout(e.timer)}),c(p(e),"resetAutoPlay",function(){e.clearAutoPlay(),e.autoPlay()}),c(p(e),"stopOnHover",function(){e.setState({isMouseEntered:!0},e.clearAutoPlay)}),c(p(e),"startOnLeave",function(){e.setState({isMouseEntered:!1},e.autoPlay)}),c(p(e),"isFocusWithinTheCarousel",function(){return e.carouselWrapperRef?!!((0,Y.default)().activeElement===e.carouselWrapperRef||e.carouselWrapperRef.contains((0,Y.default)().activeElement)):!1}),c(p(e),"navigateWithKeyboard",function(a){if(e.isFocusWithinTheCarousel()){var s=e.props.axis,f=s==="horizontal",h={ArrowUp:38,ArrowRight:39,ArrowDown:40,ArrowLeft:37},m=f?h.ArrowRight:h.ArrowDown,v=f?h.ArrowLeft:h.ArrowUp;m===a.keyCode?e.increment():v===a.keyCode&&e.decrement()}}),c(p(e),"updateSizes",function(){if(!(!e.state.initialized||!e.itemsRef||e.itemsRef.length===0)){var a=e.props.axis==="horizontal",s=e.itemsRef[0];if(s){var f=a?s.clientWidth:s.clientHeight;e.setState({itemSize:f}),e.thumbsRef&&e.thumbsRef.updateSizes()}}}),c(p(e),"setMountState",function(){e.setState({hasMount:!0}),e.updateSizes()}),c(p(e),"handleClickItem",function(a,s){if(y.Children.count(e.props.children)!==0){if(e.state.cancelClick){e.setState({cancelClick:!1});return}e.props.onClickItem(a,s),a!==e.state.selectedItem&&e.setState({selectedItem:a})}}),c(p(e),"handleOnChange",function(a,s){y.Children.count(e.props.children)<=1||e.props.onChange(a,s)}),c(p(e),"handleClickThumb",function(a,s){e.props.onClickThumb(a,s),e.moveTo(a)}),c(p(e),"onSwipeStart",function(a){e.setState({swiping:!0}),e.props.onSwipeStart(a)}),c(p(e),"onSwipeEnd",function(a){e.setState({swiping:!1,cancelClick:!1,swipeMovementStarted:!1}),e.props.onSwipeEnd(a),e.clearAutoPlay(),e.state.autoPlay&&e.autoPlay()}),c(p(e),"onSwipeMove",function(a,s){e.props.onSwipeMove(s);var f=e.props.swipeAnimationHandler(a,e.props,e.state,e.setState.bind(p(e)));return e.setState(M({},f)),!!Object.keys(f).length}),c(p(e),"decrement",function(){var a=arguments.length>0&&arguments[0]!==void 0?arguments[0]:1;e.moveTo(e.state.selectedItem-(typeof a=="number"?a:1))}),c(p(e),"increment",function(){var a=arguments.length>0&&arguments[0]!==void 0?arguments[0]:1;e.moveTo(e.state.selectedItem+(typeof a=="number"?a:1))}),c(p(e),"moveTo",function(a){if(typeof a=="number"){var s=y.Children.count(e.props.children)-1;a<0&&(a=e.props.infiniteLoop?s:0),a>s&&(a=e.props.infiniteLoop?0:s),e.selectItem({selectedItem:a}),e.state.autoPlay&&e.state.isMouseEntered===!1&&e.resetAutoPlay()}}),c(p(e),"onClickNext",function(){e.increment(1)}),c(p(e),"onClickPrev",function(){e.decrement(1)}),c(p(e),"onSwipeForward",function(){e.increment(1),e.props.emulateTouch&&e.setState({cancelClick:!0})}),c(p(e),"onSwipeBackwards",function(){e.decrement(1),e.props.emulateTouch&&e.setState({cancelClick:!0})}),c(p(e),"changeItem",function(a){return function(s){(!(0,H.isKeyboardEvent)(s)||s.key==="Enter")&&e.moveTo(a)}}),c(p(e),"selectItem",function(a){e.setState(M({previousItem:e.state.selectedItem},a),function(){e.setState(e.animationHandler(e.props,e.state))}),e.handleOnChange(a.selectedItem,y.Children.toArray(e.props.children)[a.selectedItem])}),c(p(e),"getInitialImage",function(){var a=e.props.selectedItem,s=e.itemsRef&&e.itemsRef[a],f=s&&s.getElementsByTagName("img")||[];return f[0]}),c(p(e),"getVariableItemHeight",function(a){var s=e.itemsRef&&e.itemsRef[a];if(e.state.hasMount&&s&&s.children.length){var f=s.children[0].getElementsByTagName("img")||[];if(f.length>0){var h=f[0];if(!h.complete){var m=function g(){e.forceUpdate(),h.removeEventListener("load",g)};h.addEventListener("load",m)}}var v=f[0]||s.children[0],_=v.clientHeight;return _>0?_:null}return null});var o={initialized:!1,previousItem:i.selectedItem,selectedItem:i.selectedItem,hasMount:!1,isMouseEntered:!1,autoPlay:i.autoPlay,swiping:!1,swipeMovementStarted:!1,cancelClick:!1,itemSize:1,itemListStyle:{},slideStyle:{},selectedStyle:{},prevStyle:{}};return e.animationHandler=typeof i.animationHandler=="function"&&i.animationHandler||i.animationHandler==="fade"&&Q.fadeAnimationHandler||Q.slideAnimationHandler,e.state=M(M({},o),e.animationHandler(i,o)),e}return pt(r,[{key:"componentDidMount",value:function(){this.props.children&&this.setupCarousel()}},{key:"componentDidUpdate",value:function(e,o){!e.children&&this.props.children&&!this.state.initialized&&this.setupCarousel(),!e.autoFocus&&this.props.autoFocus&&this.forceFocus(),o.swiping&&!this.state.swiping&&this.setState(M({},this.props.stopSwipingHandler(this.props,this.state))),(e.selectedItem!==this.props.selectedItem||e.centerMode!==this.props.centerMode)&&(this.updateSizes(),this.moveTo(this.props.selectedItem)),e.autoPlay!==this.props.autoPlay&&(this.props.autoPlay?this.setupAutoPlay():this.destroyAutoPlay(),this.setState({autoPlay:this.props.autoPlay}))}},{key:"componentWillUnmount",value:function(){this.destroyCarousel()}},{key:"setupCarousel",value:function(){var e=this;this.bindEvents(),this.state.autoPlay&&y.Children.count(this.props.children)>1&&this.setupAutoPlay(),this.props.autoFocus&&this.forceFocus(),this.setState({initialized:!0},function(){var o=e.getInitialImage();o&&!o.complete?o.addEventListener("load",e.setMountState):e.setMountState()})}},{key:"destroyCarousel",value:function(){this.state.initialized&&(this.unbindEvents(),this.destroyAutoPlay())}},{key:"setupAutoPlay",value:function(){this.autoPlay();var e=this.carouselWrapperRef;this.props.stopOnHover&&e&&(e.addEventListener("mouseenter",this.stopOnHover),e.addEventListener("mouseleave",this.startOnLeave))}},{key:"destroyAutoPlay",value:function(){this.clearAutoPlay();var e=this.carouselWrapperRef;this.props.stopOnHover&&e&&(e.removeEventListener("mouseenter",this.stopOnHover),e.removeEventListener("mouseleave",this.startOnLeave))}},{key:"bindEvents",value:function(){(0,G.default)().addEventListener("resize",this.updateSizes),(0,G.default)().addEventListener("DOMContentLoaded",this.updateSizes),this.props.useKeyboardArrows&&(0,Y.default)().addEventListener("keydown",this.navigateWithKeyboard)}},{key:"unbindEvents",value:function(){(0,G.default)().removeEventListener("resize",this.updateSizes),(0,G.default)().removeEventListener("DOMContentLoaded",this.updateSizes);var e=this.getInitialImage();e&&e.removeEventListener("load",this.setMountState),this.props.useKeyboardArrows&&(0,Y.default)().removeEventListener("keydown",this.navigateWithKeyboard)}},{key:"forceFocus",value:function(){var e;(e=this.carouselWrapperRef)===null||e===void 0||e.focus()}},{key:"renderItems",value:function(e){var o=this;return this.props.children?y.Children.map(this.props.children,function(a,s){var f=s===o.state.selectedItem,h=s===o.state.previousItem,m=f&&o.state.selectedStyle||h&&o.state.prevStyle||o.state.slideStyle||{};o.props.centerMode&&o.props.axis==="horizontal"&&(m=M(M({},m),{},{minWidth:o.props.centerSlidePercentage+"%"})),o.state.swiping&&o.state.swipeMovementStarted&&(m=M(M({},m),{},{pointerEvents:"none"}));var v={ref:function(g){return o.setItemsRef(g,s)},key:"itemKey"+s+(e?"clone":""),className:D.default.ITEM(!0,s===o.state.selectedItem,s===o.state.previousItem),onClick:o.handleClickItem.bind(o,s,a),style:m};return y.default.createElement("li",v,o.props.renderItem(a,{isSelected:s===o.state.selectedItem,isPrevious:s===o.state.previousItem}))}):[]}},{key:"renderControls",value:function(){var e=this,o=this.props,a=o.showIndicators,s=o.labels,f=o.renderIndicator,h=o.children;return a?y.default.createElement("ul",{className:"control-dots"},y.Children.map(h,function(m,v){return f&&f(e.changeItem(v),v===e.state.selectedItem,v,s.item)})):null}},{key:"renderStatus",value:function(){return this.props.showStatus?y.default.createElement("p",{className:"carousel-status"},this.props.statusFormatter(this.state.selectedItem+1,y.Children.count(this.props.children))):null}},{key:"renderThumbs",value:function(){return!this.props.showThumbs||!this.props.children||y.Children.count(this.props.children)===0?null:y.default.createElement(ut.default,{ref:this.setThumbsRef,onSelectItem:this.handleClickThumb,selectedItem:this.state.selectedItem,transitionTime:this.props.transitionTime,thumbWidth:this.props.thumbWidth,labels:this.props.labels,emulateTouch:this.props.emulateTouch},this.props.renderThumbs(this.props.children))}},{key:"render",value:function(){var e=this;if(!this.props.children||y.Children.count(this.props.children)===0)return null;var o=this.props.swipeable&&y.Children.count(this.props.children)>1,a=this.props.axis==="horizontal",s=this.props.showArrows&&y.Children.count(this.props.children)>1,f=s&&(this.state.selectedItem>0||this.props.infiniteLoop)||!1,h=s&&(this.state.selectedItem<y.Children.count(this.props.children)-1||this.props.infiniteLoop)||!1,m=this.renderItems(!0),v=m.shift(),_=m.pop(),g={className:D.default.SLIDER(!0,this.state.swiping),onSwipeMove:this.onSwipeMove,onSwipeStart:this.onSwipeStart,onSwipeEnd:this.onSwipeEnd,style:this.state.itemListStyle,tolerance:this.props.swipeScrollTolerance},E={};if(a){if(g.onSwipeLeft=this.onSwipeForward,g.onSwipeRight=this.onSwipeBackwards,this.props.dynamicHeight){var B=this.getVariableItemHeight(this.state.selectedItem);E.height=B||"auto"}}else g.onSwipeUp=this.props.verticalSwipe==="natural"?this.onSwipeBackwards:this.onSwipeForward,g.onSwipeDown=this.props.verticalSwipe==="natural"?this.onSwipeForward:this.onSwipeBackwards,g.style=M(M({},g.style),{},{height:this.state.itemSize}),E.height=this.state.itemSize;return y.default.createElement("div",{"aria-label":this.props.ariaLabel,className:D.default.ROOT(this.props.className),ref:this.setCarouselWrapperRef,tabIndex:this.props.useKeyboardArrows?0:void 0},y.default.createElement("div",{className:D.default.CAROUSEL(!0),style:{width:this.props.width}},this.renderControls(),this.props.renderArrowPrev(this.onClickPrev,f,this.props.labels.leftArrow),y.default.createElement("div",{className:D.default.WRAPPER(!0,this.props.axis),style:E},o?y.default.createElement(st.default,ue({tagName:"ul",innerRef:this.setListRef},g,{allowMouseEvents:this.props.emulateTouch}),this.props.infiniteLoop&&_,this.renderItems(),this.props.infiniteLoop&&v):y.default.createElement("ul",{className:D.default.SLIDER(!0,this.state.swiping),ref:function(z){return e.setListRef(z)},style:this.state.itemListStyle||{}},this.props.infiniteLoop&&_,this.renderItems(),this.props.infiniteLoop&&v)),this.props.renderArrowNext(this.onClickNext,h,this.props.labels.rightArrow),this.renderStatus()),this.renderThumbs())}}]),r}(y.default.Component);ee.default=pe;c(pe,"displayName","Carousel");c(pe,"defaultProps",{ariaLabel:void 0,axis:"horizontal",centerSlidePercentage:80,interval:3e3,labels:{leftArrow:"previous slide / item",rightArrow:"next slide / item",item:"slide item"},onClickItem:H.noop,onClickThumb:H.noop,onChange:H.noop,onSwipeStart:function(){},onSwipeEnd:function(){},onSwipeMove:function(){return!1},preventMovementUntilSwipeScrollTolerance:!1,renderArrowPrev:function(n,r,i){return y.default.createElement("button",{type:"button","aria-label":i,className:D.default.ARROW_PREV(!r),onClick:n})},renderArrowNext:function(n,r,i){return y.default.createElement("button",{type:"button","aria-label":i,className:D.default.ARROW_NEXT(!r),onClick:n})},renderIndicator:function(n,r,i,e){return y.default.createElement("li",{className:D.default.DOT(r),onClick:n,onKeyDown:n,value:i,key:i,role:"button",tabIndex:0,"aria-label":"".concat(e," ").concat(i+1)})},renderItem:function(n){return n},renderThumbs:function(n){var r=y.Children.map(n,function(i){var e=i;if(i.type!=="img"&&(e=y.Children.toArray(i.props.children).find(function(o){return o.type==="img"})),!!e)return e});return r.filter(function(i){return i}).length===0?(console.warn("No images found! Can't build the thumb list without images. If you don't need thumbs, set showThumbs={false} in the Carousel. Note that it's not possible to get images rendered inside custom components. More info at https://github.com/leandrowd/react-responsive-carousel/blob/master/TROUBLESHOOTING.md"),[]):r},statusFormatter:H.defaultStatusFormatter,selectedItem:0,showArrows:!0,showIndicators:!0,showStatus:!0,showThumbs:!0,stopOnHover:!0,swipeScrollTolerance:5,swipeable:!0,transitionTime:350,verticalSwipe:"standard",width:"100%",animationHandler:"slide",swipeAnimationHandler:Q.slideSwipeAnimationHandler,stopSwipingHandler:Q.slideStopSwipingHandler});var yt={};(function(t){Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"Carousel",{enumerable:!0,get:function(){return n.default}}),Object.defineProperty(t,"CarouselProps",{enumerable:!0,get:function(){return r.CarouselProps}}),Object.defineProperty(t,"Thumbs",{enumerable:!0,get:function(){return i.default}});var n=e(ee),r=yt,i=e(K);function e(o){return o&&o.__esModule?o:{default:o}}})(Re);const St="/assets/banner1-6uuV7cwd.png";export{St as b,Re as j};
