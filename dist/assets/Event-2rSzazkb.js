import{d as ke,r as l,e as te,_ as v,f as ne,h as oe,i as ie,s as H,c as le,k as je,l as ce,m as Q,j as a,n as we,o as de,p as $,u as ue,q as Se,C as De,t as Ne,a as O,M as Pe,B as ae,b as z,G as Te,g as Ie,I as re,T as q}from"./index-BCMjTDj-.js";import{d as Me}from"./Add-ARitWxv6.js";import{d as Be}from"./Edit-BAFAy0Gz.js";import{d as Oe}from"./DeleteForever-CaN8Bdgl.js";import{T as Fe,a as Re,b as Ae,c as K,d as W,e as Le}from"./TableRow-C6k8ikuc.js";import{T as Ue}from"./TablePagination-au4wXnx7.js";import{D as ze,a as We}from"./DialogTitle-D85XLa7F.js";import{D as $e}from"./DialogActions-Db_kJuz6.js";import{A as He}from"./Alert-BxmTgsDR.js";import{C as _e}from"./CircularProgress-DMkT-NtX.js";import"./LastPage-aK0Jz_ev.js";function Ge(t={}){const{autoHideDuration:n=null,disableWindowBlurListener:e=!1,onClose:c,open:d,resumeHideDuration:j}=t,u=ke();l.useEffect(()=>{if(!d)return;function o(i){i.defaultPrevented||(i.key==="Escape"||i.key==="Esc")&&(c==null||c(i,"escapeKeyDown"))}return document.addEventListener("keydown",o),()=>{document.removeEventListener("keydown",o)}},[d,c]);const w=te((o,i)=>{c==null||c(o,i)}),x=te(o=>{!c||o==null||u.start(o,()=>{w(null,"timeout")})});l.useEffect(()=>(d&&x(n),u.clear),[d,n,x,u]);const f=o=>{c==null||c(o,"clickaway")},p=u.clear,m=l.useCallback(()=>{n!=null&&x(j??n*.5)},[n,j,x]),P=o=>i=>{const g=o.onBlur;g==null||g(i),m()},F=o=>i=>{const g=o.onFocus;g==null||g(i),p()},b=o=>i=>{const g=o.onMouseEnter;g==null||g(i),p()},T=o=>i=>{const g=o.onMouseLeave;g==null||g(i),m()};return l.useEffect(()=>{if(!e&&d)return window.addEventListener("focus",m),window.addEventListener("blur",p),()=>{window.removeEventListener("focus",m),window.removeEventListener("blur",p)}},[e,d,m,p]),{getRootProps:(o={})=>{const i=v({},ne(t),ne(o));return v({role:"presentation"},o,i,{onBlur:P(i),onFocus:F(i),onMouseEnter:b(i),onMouseLeave:T(i)})},onClickAway:f}}function Je(t){return oe("MuiSnackbarContent",t)}ie("MuiSnackbarContent",["root","message","action"]);const qe=["action","className","message","role"],Ke=t=>{const{classes:n}=t;return de({root:["root"],action:["action"],message:["message"]},Je,n)},Xe=H(le,{name:"MuiSnackbarContent",slot:"Root",overridesResolver:(t,n)=>n.root})(({theme:t})=>{const n=t.palette.mode==="light"?.8:.98,e=je(t.palette.background.default,n);return v({},t.typography.body2,{color:t.vars?t.vars.palette.SnackbarContent.color:t.palette.getContrastText(e),backgroundColor:t.vars?t.vars.palette.SnackbarContent.bg:e,display:"flex",alignItems:"center",flexWrap:"wrap",padding:"6px 16px",borderRadius:(t.vars||t).shape.borderRadius,flexGrow:1,[t.breakpoints.up("sm")]:{flexGrow:"initial",minWidth:288}})}),Qe=H("div",{name:"MuiSnackbarContent",slot:"Message",overridesResolver:(t,n)=>n.message})({padding:"8px 0"}),Ve=H("div",{name:"MuiSnackbarContent",slot:"Action",overridesResolver:(t,n)=>n.action})({display:"flex",alignItems:"center",marginLeft:"auto",paddingLeft:16,marginRight:-8}),Ye=l.forwardRef(function(n,e){const c=ce({props:n,name:"MuiSnackbarContent"}),{action:d,className:j,message:u,role:w="alert"}=c,x=Q(c,qe),f=c,p=Ke(f);return a.jsxs(Xe,v({role:w,square:!0,elevation:6,className:we(p.root,j),ownerState:f,ref:e},x,{children:[a.jsx(Qe,{className:p.message,ownerState:f,children:u}),d?a.jsx(Ve,{className:p.action,ownerState:f,children:d}):null]}))});function Ze(t){return oe("MuiSnackbar",t)}ie("MuiSnackbar",["root","anchorOriginTopCenter","anchorOriginBottomCenter","anchorOriginTopRight","anchorOriginBottomRight","anchorOriginTopLeft","anchorOriginBottomLeft"]);const et=["onEnter","onExited"],tt=["action","anchorOrigin","autoHideDuration","children","className","ClickAwayListenerProps","ContentProps","disableWindowBlurListener","message","onBlur","onClose","onFocus","onMouseEnter","onMouseLeave","open","resumeHideDuration","TransitionComponent","transitionDuration","TransitionProps"],nt=t=>{const{classes:n,anchorOrigin:e}=t,c={root:["root",`anchorOrigin${$(e.vertical)}${$(e.horizontal)}`]};return de(c,Ze,n)},se=H("div",{name:"MuiSnackbar",slot:"Root",overridesResolver:(t,n)=>{const{ownerState:e}=t;return[n.root,n[`anchorOrigin${$(e.anchorOrigin.vertical)}${$(e.anchorOrigin.horizontal)}`]]}})(({theme:t,ownerState:n})=>{const e={left:"50%",right:"auto",transform:"translateX(-50%)"};return v({zIndex:(t.vars||t).zIndex.snackbar,position:"fixed",display:"flex",left:8,right:8,justifyContent:"center",alignItems:"center"},n.anchorOrigin.vertical==="top"?{top:8}:{bottom:8},n.anchorOrigin.horizontal==="left"&&{justifyContent:"flex-start"},n.anchorOrigin.horizontal==="right"&&{justifyContent:"flex-end"},{[t.breakpoints.up("sm")]:v({},n.anchorOrigin.vertical==="top"?{top:24}:{bottom:24},n.anchorOrigin.horizontal==="center"&&e,n.anchorOrigin.horizontal==="left"&&{left:24,right:"auto"},n.anchorOrigin.horizontal==="right"&&{right:24,left:"auto"})})}),at=l.forwardRef(function(n,e){const c=ce({props:n,name:"MuiSnackbar"}),d=ue(),j={enter:d.transitions.duration.enteringScreen,exit:d.transitions.duration.leavingScreen},{action:u,anchorOrigin:{vertical:w,horizontal:x}={vertical:"bottom",horizontal:"left"},autoHideDuration:f=null,children:p,className:m,ClickAwayListenerProps:P,ContentProps:F,disableWindowBlurListener:b=!1,message:T,open:R,TransitionComponent:o=Ne,transitionDuration:i=j,TransitionProps:{onEnter:g,onExited:A}={}}=c,I=Q(c.TransitionProps,et),V=Q(c,tt),S=v({},c,{anchorOrigin:{vertical:w,horizontal:x},autoHideDuration:f,disableWindowBlurListener:b,TransitionComponent:o,transitionDuration:i}),_=nt(S),{getRootProps:C,onClickAway:G}=Ge(v({},S)),[D,L]=l.useState(!0),N=Se({elementType:se,getSlotProps:C,externalForwardedProps:V,ownerState:S,additionalProps:{ref:e},className:[_.root,m]}),U=M=>{L(!0),A&&A(M)},J=(M,y)=>{L(!1),g&&g(M,y)};return!R&&D?null:a.jsx(De,v({onClickAway:G},P,{children:a.jsx(se,v({},N,{children:a.jsx(o,v({appear:!0,in:R,timeout:i,direction:w==="top"?"down":"up",onEnter:J,onExited:U},I,{children:p||a.jsx(Ye,v({message:T,action:u},F))}))}))}))}),rt="https://executivetracking.cloudjiffy.net/Mahaasabha/event/v1",st=async(t,n)=>{try{const e=await O.post("https://executivetracking.cloudjiffy.net/Mahaasabha/event/v1/createEvent",t,{headers:n});return e.data.responseCode===201?{success:!0,message:"Advertisement added successfully"}:{success:!1,message:e.data.errorMessage}}catch(e){throw console.error("Error adding event:",e),e}},ot=async(t,n=0,e=10)=>{try{return await O.get(`https://executivetracking.cloudjiffy.net/Mahaasabha/event/v1/getAllEventByPagination/{pageNumber}/{pageSize}?pageNumber=${n}&pageSize=${e}`,{headers:t})}catch(c){throw console.error("Error fetching events:",c),c}},it=async(t,n)=>{try{return(await O.get(`https://executivetracking.cloudjiffy.net/Mahaasabha/event/v1/getEventByEventId/{eventId}?eventId=${t}`,{headers:n})).data}catch(e){throw console.error("Error fetching event by ID:",e),e}},lt=async(t,n)=>{try{const e=await O.put("https://executivetracking.cloudjiffy.net/Mahaasabha/event/v1/update",t,{headers:n});return e.data.responseCode===201?{success:!0,message:e.data.message}:{success:!1,message:e.data.errorMessage}}catch(e){throw console.error("Error updating event:",e),e}},ct=async(t,n)=>{try{const e=await O.delete(`${rt}/deleteEventById/${t}`,{headers:n});return e.data.responseCode===200?{success:!0,message:e.data.message}:{success:!1,message:e.data.errorMessage}}catch(e){throw console.error("Error deleting event:",e),e}},X=[{id:"eventId",label:"ID"},{id:"eventName",label:"Name",minWidth:100},{id:"description",label:"Description",minWidth:100},{id:"file",label:"File",minWidth:100},{id:"createdBy",label:"Created By",align:"right"},{id:"updatedBy",label:"Updated By",align:"right"},{id:"insertedDate",label:"Inserted Date",align:"right"},{id:"updatedDate",label:"Updated Date",align:"right"},{id:"actions",label:"Actions",align:"right"}],Et=()=>{ue();const[t,n]=l.useState(0),[e,c]=l.useState(10),[d,j]=l.useState([]),[u,w]=l.useState(!1),[x,f]=l.useState(!1),[p,m]=l.useState({eventName:"",description:""}),[P,F]=l.useState(null),[b,T]=l.useState({}),[R,o]=l.useState(!1),[i,g]=l.useState(null),[A,I]=l.useState(""),[V,S]=l.useState(""),[_,C]=l.useState(!1),[G,D]=l.useState(""),[L,N]=l.useState("success"),U=l.useRef(null),[J,M]=l.useState(!1),y=JSON.parse(sessionStorage.getItem("user")),B={"Content-type":"application/json",Authorization:`Bearer ${(y==null?void 0:y.accessToken)||""}`},pe=(s,r)=>n(r),he=s=>{c(+s.target.value),n(0)},ge="https://executivetracking.cloudjiffy.net/Mahaasabha/file/downloadFile/?filePath=",fe=async()=>{var s;M(!0);try{const r=await ot(B),E=(((s=r==null?void 0:r.data)==null?void 0:s.content)||[]).map(k=>{var Z,ee;return{eventId:k.eventId,eventName:k.eventName,description:k.description,file:k.filePath?a.jsx("img",{src:ge+k.filePath,alt:k.fileName,style:{width:100,height:50}}):"NO IMAGE FOUND",insertedDate:new Intl.DateTimeFormat("en-US").format(new Date(k.insertedDate)),updatedDate:new Intl.DateTimeFormat("en-US").format(new Date(k.updatedDate)),createdBy:((Z=k.createdBy)==null?void 0:Z.userName)||"No User",updatedBy:((ee=k.updatedBy)==null?void 0:ee.userName)||"No User"}});j(E),t*e>=E.length&&n(0)}catch(r){console.error("Error fetching events:",r),D("Failed to fetch events."),N("error"),C(!0)}finally{M(!1)}if(J)return a.jsx(_e,{})};l.useEffect(()=>{fe()},[R]),l.useEffect(()=>{t*e>=d.length&&n(0)},[d,e]);const me=()=>{const s={};return p.eventName.trim()||(s.eventName="Enter the Event Name"),p.description.trim()||(s.description="Enter the Description"),s},Y=s=>{const{name:r,value:h}=s.target;m(E=>({...E,[r]:h})),T(E=>({...E,[r]:null}))},ve=async s=>{try{confirm("Do you want to delete"),await ct(s,B),o(r=>!r)}catch(r){console.error("Error deleting event:",r),D("Failed to delete event."),N("error"),C(!0)}},ye=async s=>{w(!0),f(!0);try{const h=await it(s,B);F(h.eventId),m({eventName:h.eventName||"",description:h.description||""}),I(h.fileName||"")}catch(r){console.error("Error fetching event data:",r),D("Failed to fetch event details."),N("error"),C(!0)}},xe=()=>{w(!1),m({eventName:"",description:""}),f(!0)},be=s=>{const r=s.target.files[0];if(!r){S("Please select a file.");return}if(!["image/jpeg","image/png","image/jpg"].includes(r.type)){S("Only JPG, JPEG, and PNG files are allowed.");return}if(r.size>5*1024*1024){S("File size should not exceed 5MB.");return}g(r),I(r.name),S("")},Ce=async()=>{var r;if(!i){S("No file selected");return}const s=new FormData;s.append("file",i);try{const h=await O.post("https://executivetracking.cloudjiffy.net/Mahaasabha/file/uploadFile",s,{headers:{...B,"Content-Type":"multipart/form-data"}});if((r=h.data)!=null&&r.filePath)console.log("hii"),I(h.data.filePath),D("File uploaded successfully!"),N("success");else throw new Error("Invalid response from the server.")}catch(h){console.error("Error uploading file:",h),D("File upload failed."),N("error")}finally{C(!0)}},Ee=async s=>{s.preventDefault();const r=me();if(Object.keys(r).length>0){T(r);return}const h={...p,eventId:u?P:0,fileName:A||"",createdBy:u?void 0:{userId:y==null?void 0:y.userId},updatedBy:u?{userId:y==null?void 0:y.userId}:void 0,insertedDate:u?void 0:new Date().toISOString(),updatedDate:u?new Date().toISOString():void 0};try{u?await lt(P,h,B):await st(h,B),m({eventName:"",description:""}),I(""),U.current.value=null,o(E=>!E),f(!1),D(u?"Event updated successfully!":"Event added successfully!"),N("success"),C(!0)}catch(E){console.error("Error saving event:",E),D("Failed to save event."),N("error"),C(!0)}};return a.jsx(a.Fragment,{children:a.jsxs(Pe,{title:a.jsxs(ae,{sx:{display:"flex",justifyContent:"space-between",alignItems:"center"},children:[a.jsx("span",{children:"Events"}),a.jsx(z,{variant:"contained",color:"primary",onClick:xe,startIcon:a.jsx(Me,{}),"aria-label":"Add Event",children:"Add"})]}),children:[a.jsx(Te,{container:!0,spacing:Ie}),a.jsxs(le,{children:[a.jsx(Fe,{children:a.jsxs(Re,{stickyHeader:!0,children:[a.jsx(Ae,{children:a.jsx(K,{children:X.map(s=>a.jsx(W,{align:s.align,style:{minWidth:s.minWidth},children:s.label},s.id))})}),a.jsx(Le,{children:d.length===0?a.jsx(K,{children:a.jsx(W,{colSpan:X.length,align:"center",children:"No events found."})}):d.slice(t*e,t*e+e).map(s=>a.jsxs(K,{hover:!0,children:[X.map(r=>{const h=s[r.id];return a.jsx(W,{align:r.align,children:h},r.id)}),a.jsxs(W,{align:"right",children:[a.jsx(re,{onClick:()=>ye(s.eventId),children:a.jsx(Be,{})}),a.jsx(re,{onClick:()=>ve(s.eventId),color:"error",children:a.jsx(Oe,{})})]})]},s.eventId))})]})}),a.jsx(Ue,{rowsPerPageOptions:[10,25,50],component:"div",count:d.length,rowsPerPage:e,page:t,onPageChange:pe,onRowsPerPageChange:he})]}),a.jsxs(ze,{open:x,onClose:()=>f(!1),maxWidth:"sm",fullWidth:!0,children:[a.jsx(We,{children:u?"Edit Event":"Add Event"}),a.jsxs(ae,{component:"form",onSubmit:Ee,p:2,children:[a.jsx(q,{fullWidth:!0,label:"Event Name",name:"eventName",value:p.eventName,onChange:Y,error:!!b.eventName,helperText:b.eventName,margin:"normal"}),a.jsx(q,{fullWidth:!0,label:"Description",name:"description",value:p.description,onChange:Y,error:!!b.description,helperText:b.description,margin:"normal",multiline:!0,rows:4}),a.jsx(q,{margin:"normal",fullWidth:!0,id:"photoName",label:"File Name",name:"photoName",autoComplete:"photoName",value:p.photoName,disabled:!0,helperText:b.photoName,error:!!b.photoName,InputProps:{endAdornment:a.jsx(z,{variant:"contained",color:"primary",onClick:Ce,children:"Upload"})}}),a.jsx("input",{type:"file",onChange:be,ref:U,style:{marginTop:20}}),a.jsxs($e,{sx:{mt:2},children:[a.jsx(z,{onClick:()=>f(!1),color:"secondary",children:"Cancel"}),a.jsx(z,{type:"submit",variant:"contained",color:"primary",children:u?"Update":"Add"})]})]})]}),a.jsx(at,{open:_,autoHideDuration:3e3,onClose:()=>C(!1),children:a.jsx(He,{onClose:()=>C(!1),severity:L,variant:"filled",children:G})})]})})};export{Et as default};
