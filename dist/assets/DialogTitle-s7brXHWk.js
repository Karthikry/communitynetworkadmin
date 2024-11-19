import{n as $,t as S,r as c,v as u,$ as V,a0 as q,Q as p,y as r,c as R,F as j,u as G,H as w,X as J,j as n,N as h,O as N,a1 as Z,h as oo}from"./index-Djsfy_Oq.js";function ao(a){return S("MuiDialog",a)}const C=$("MuiDialog",["root","scrollPaper","scrollBody","container","paper","paperScrollPaper","paperScrollBody","paperWidthFalse","paperWidthXs","paperWidthSm","paperWidthMd","paperWidthLg","paperWidthXl","paperFullWidth","paperFullScreen"]),F=c.createContext({}),eo=["aria-describedby","aria-labelledby","BackdropComponent","BackdropProps","children","className","disableEscapeKeyDown","fullScreen","fullWidth","maxWidth","onBackdropClick","onClick","onClose","open","PaperComponent","PaperProps","scroll","TransitionComponent","transitionDuration","TransitionProps"],io=u(V,{name:"MuiDialog",slot:"Backdrop",overrides:(a,o)=>o.backdrop})({zIndex:-1}),ro=a=>{const{classes:o,scroll:e,maxWidth:i,fullWidth:l,fullScreen:t}=a,d={root:["root"],container:["container",`scroll${p(e)}`],paper:["paper",`paperScroll${p(e)}`,`paperWidth${p(String(i))}`,l&&"paperFullWidth",t&&"paperFullScreen"]};return N(d,ao,o)},to=u(q,{name:"MuiDialog",slot:"Root",overridesResolver:(a,o)=>o.root})({"@media print":{position:"absolute !important"}}),lo=u("div",{name:"MuiDialog",slot:"Container",overridesResolver:(a,o)=>{const{ownerState:e}=a;return[o.container,o[`scroll${p(e.scroll)}`]]}})(({ownerState:a})=>r({height:"100%","@media print":{height:"auto"},outline:0},a.scroll==="paper"&&{display:"flex",justifyContent:"center",alignItems:"center"},a.scroll==="body"&&{overflowY:"auto",overflowX:"hidden",textAlign:"center","&::after":{content:'""',display:"inline-block",verticalAlign:"middle",height:"100%",width:"0"}})),so=u(R,{name:"MuiDialog",slot:"Paper",overridesResolver:(a,o)=>{const{ownerState:e}=a;return[o.paper,o[`scrollPaper${p(e.scroll)}`],o[`paperWidth${p(String(e.maxWidth))}`],e.fullWidth&&o.paperFullWidth,e.fullScreen&&o.paperFullScreen]}})(({theme:a,ownerState:o})=>r({margin:32,position:"relative",overflowY:"auto","@media print":{overflowY:"visible",boxShadow:"none"}},o.scroll==="paper"&&{display:"flex",flexDirection:"column",maxHeight:"calc(100% - 64px)"},o.scroll==="body"&&{display:"inline-block",verticalAlign:"middle",textAlign:"left"},!o.maxWidth&&{maxWidth:"calc(100% - 64px)"},o.maxWidth==="xs"&&{maxWidth:a.breakpoints.unit==="px"?Math.max(a.breakpoints.values.xs,444):`max(${a.breakpoints.values.xs}${a.breakpoints.unit}, 444px)`,[`&.${C.paperScrollBody}`]:{[a.breakpoints.down(Math.max(a.breakpoints.values.xs,444)+32*2)]:{maxWidth:"calc(100% - 64px)"}}},o.maxWidth&&o.maxWidth!=="xs"&&{maxWidth:`${a.breakpoints.values[o.maxWidth]}${a.breakpoints.unit}`,[`&.${C.paperScrollBody}`]:{[a.breakpoints.down(a.breakpoints.values[o.maxWidth]+32*2)]:{maxWidth:"calc(100% - 64px)"}}},o.fullWidth&&{width:"calc(100% - 64px)"},o.fullScreen&&{margin:0,width:"100%",maxWidth:"100%",height:"100%",maxHeight:"none",borderRadius:0,[`&.${C.paperScrollBody}`]:{margin:0,maxWidth:"100%"}})),mo=c.forwardRef(function(o,e){const i=j({props:o,name:"MuiDialog"}),l=G(),t={enter:l.transitions.duration.enteringScreen,exit:l.transitions.duration.leavingScreen},{"aria-describedby":d,"aria-labelledby":x,BackdropComponent:g,BackdropProps:b,children:U,className:A,disableEscapeKeyDown:y=!1,fullScreen:I=!1,fullWidth:E=!1,maxWidth:L="sm",onBackdropClick:v,onClick:P,onClose:f,open:M,PaperComponent:X=R,PaperProps:T={},scroll:_="paper",TransitionComponent:H=Z,transitionDuration:B=t,TransitionProps:Y}=i,z=w(i,eo),m=r({},i,{disableEscapeKeyDown:y,fullScreen:I,fullWidth:E,maxWidth:L,scroll:_}),k=ro(m),D=c.useRef(),K=s=>{D.current=s.target===s.currentTarget},O=s=>{P&&P(s),D.current&&(D.current=null,v&&v(s),f&&f(s,"backdropClick"))},W=J(x),Q=c.useMemo(()=>({titleId:W}),[W]);return n.jsx(to,r({className:h(k.root,A),closeAfterTransition:!0,components:{Backdrop:io},componentsProps:{backdrop:r({transitionDuration:B,as:g},b)},disableEscapeKeyDown:y,onClose:f,open:M,ref:e,onClick:O,ownerState:m},z,{children:n.jsx(H,r({appear:!0,in:M,timeout:B,role:"presentation"},Y,{children:n.jsx(lo,{className:h(k.container),onMouseDown:K,ownerState:m,children:n.jsx(so,r({as:X,elevation:24,role:"dialog","aria-describedby":d,"aria-labelledby":W},T,{className:h(k.paper,T.className),ownerState:m,children:n.jsx(F.Provider,{value:Q,children:U})}))})}))}))});function no(a){return S("MuiDialogTitle",a)}const ho=$("MuiDialogTitle",["root"]),co=["className","id"],po=a=>{const{classes:o}=a;return N({root:["root"]},no,o)},uo=u(oo,{name:"MuiDialogTitle",slot:"Root",overridesResolver:(a,o)=>o.root})({padding:"16px 24px",flex:"0 0 auto"}),go=c.forwardRef(function(o,e){const i=j({props:o,name:"MuiDialogTitle"}),{className:l,id:t}=i,d=w(i,co),x=i,g=po(x),{titleId:b=t}=c.useContext(F);return n.jsx(uo,r({component:"h2",className:h(g.root,l),ownerState:x,ref:e,variant:"h6",id:t??b},d))});export{mo as D,go as a,ho as d};