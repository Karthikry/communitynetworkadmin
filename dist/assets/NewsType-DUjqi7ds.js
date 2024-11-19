import{r as d,j as t,c as J,b as g,I as S,T as C}from"./index-Djsfy_Oq.js";import{d as M}from"./Edit-CWCknw8m.js";import{d as R}from"./Delete-CtFrHhEW.js";import{T as H,a as L,b as U,c as T,d as p,e as _,f as G}from"./TableRow-DpUlrRrC.js";import{D as Y,a as q}from"./DialogTitle-s7brXHWk.js";import{D as K}from"./DialogContent-DHscOiCv.js";import{D as Q}from"./DialogActions-hyJVfphP.js";const N=[{id:"newsTypeId",label:"News Type ID",minWidth:120},{id:"newsTypeName",label:"News Type Name",minWidth:180},{id:"description",label:"Description",minWidth:200},{id:"createdBy",label:"Created By",minWidth:150},{id:"updatedBy",label:"Updated By",minWidth:150},{id:"insertedDate",label:"Inserted Date",minWidth:180},{id:"updatedDate",label:"Updated Date",minWidth:180},{id:"edit",label:"Edit",minWidth:80},{id:"delete",label:"Delete",minWidth:80}],ne=()=>{const[c,f]=d.useState(0),[l,v]=d.useState(10),[x,k]=d.useState([]),[E,I]=d.useState(0),[b,h]=d.useState(null),[B,j]=d.useState(!1),[m,P]=d.useState("add"),[o,y]=d.useState({newsTypeId:0,newsTypeName:"",description:""});d.useEffect(()=>{u()},[c,l]);const u=async()=>{try{const e=JSON.parse(sessionStorage.getItem("user")),a=(e==null?void 0:e.accessToken)||"",s=await fetch(`https://executivetracking.cloudjiffy.net/Mahaasabha/newstype/v1/getAllNewsTypeByPagination/{pageNumber}/{pageSize}?pageNumber=${c}&pageSize=${l}`,{method:"GET",headers:{"Content-Type":"application/json",Authorization:`Bearer ${a}`}});if(!s.ok)throw new Error(`Error: ${s.statusText}`);const n=await s.json(),i=n.content.map(r=>({newsTypeId:r.newsTypeId,newsTypeName:r.newsTypeName,description:r.description,createdBy:r.createdBy.fullName||r.createdBy.userName,updatedBy:r.updatedBy.fullName||r.updatedBy.userName,insertedDate:new Date(r.insertedDate).toLocaleDateString(),updatedDate:new Date(r.updatedDate).toLocaleDateString()}));k(i),I(n.totalElements)}catch(e){h(e.message),console.error("Failed to fetch news types:",e)}},W=(e,a)=>{f(a)},A=e=>{v(+e.target.value),f(0)},D=(e,a={})=>{P(e),y(a),j(!0)},w=()=>{j(!1),y({newsTypeId:0,newsTypeName:"",description:""})},$=async()=>{m==="add"?await O():await F()},O=async()=>{try{const e=JSON.parse(sessionStorage.getItem("user")),a=(e==null?void 0:e.accessToken)||"",s={newsTypeName:o.newsTypeName,description:o.description,createdBy:{fullName:e.fullName||e.userName,mobileNumber:e.mobileNumber,userId:e.userId,userName:e.userName}},n=await fetch("https://executivetracking.cloudjiffy.net/Mahaasabha/newstype/v1/createNewsType",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${a}`},body:JSON.stringify(s)});if(!n.ok){const i=await n.json();throw console.error("Failed to add news type:",i),new Error(`Error: ${n.statusText}`)}u(),w()}catch(e){h(e.message),console.error("Failed to add news type:",e)}},F=async()=>{try{const e=JSON.parse(sessionStorage.getItem("user")),a=(e==null?void 0:e.accessToken)||"",s={newsTypeId:o.newsTypeId,newsTypeName:o.newsTypeName,description:o.description,updatedBy:{fullName:e.fullName||e.userName,mobileNumber:e.mobileNumber,userId:e.userId,userName:e.userName}},n=await fetch("https://executivetracking.cloudjiffy.net/Mahaasabha/newstype/v1/updateNewsType",{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${a}`},body:JSON.stringify(s)});if(!n.ok){const i=await n.json();throw console.error("Failed to edit news type:",i),new Error(`Error: ${n.statusText}`)}u(),w()}catch(e){h(e.message),console.error("Failed to edit news type:",e)}},z=async e=>{if(window.confirm("Are you sure you want to delete this news type?"))try{const s=JSON.parse(sessionStorage.getItem("user")),n=(s==null?void 0:s.accessToken)||"",i=await fetch(`https://executivetracking.cloudjiffy.net/Mahaasabha/newstype/v1/deleteNewsTypeById/${e}`,{method:"DELETE",headers:{"Content-Type":"application/json",Authorization:`Bearer ${n}`}});if(!i.ok){const r=await i.json();throw console.error("Failed to delete news type:",r),new Error(`Error: ${i.statusText}`)}u()}catch(s){h(s.message),console.error("Failed to delete news type:",s)}};return t.jsxs(J,{sx:{width:"100%",overflow:"hidden",mt:5},children:[t.jsx(g,{variant:"contained",sx:{margin:"10px"},onClick:()=>D("add"),children:"+ ADD NEWS TYPE"}),b&&t.jsxs("div",{style:{color:"red",textAlign:"center"},children:["Error: ",b]}),t.jsx(H,{sx:{maxHeight:440},children:t.jsxs(L,{stickyHeader:!0,"aria-label":"sticky table",children:[t.jsx(U,{children:t.jsx(T,{children:N.map(e=>t.jsx(p,{align:e.align||"left",style:{minWidth:e.minWidth,fontWeight:"bold"},children:e.label},e.id))})}),t.jsx(_,{children:x.length>0?x.slice(c*l,c*l+l).map(e=>t.jsx(T,{hover:!0,role:"checkbox",tabIndex:-1,children:N.map(a=>{const s=e[a.id];return a.id==="edit"?t.jsx(p,{align:"left",children:t.jsx(S,{onClick:()=>D("edit",e),color:"primary",children:t.jsx(M,{})})},a.id):a.id==="delete"?t.jsx(p,{align:"left",children:t.jsx(S,{onClick:()=>z(e.newsTypeId),color:"secondary",children:t.jsx(R,{})})},a.id):t.jsx(p,{align:a.align||"left",children:s||"Not Available"},a.id)})},e.newsTypeId)):t.jsx(T,{children:t.jsx(p,{colSpan:N.length,align:"center",sx:{padding:20},children:"No rows"})})})]})}),t.jsx(G,{rowsPerPageOptions:[10,25,100],component:"div",count:E,rowsPerPage:l,page:c,onPageChange:W,onRowsPerPageChange:A}),t.jsxs(Y,{open:B,onClose:w,children:[t.jsx(q,{children:m==="add"?"Add News Type":"Edit News Type"}),t.jsxs(K,{children:[t.jsx(C,{autoFocus:!0,margin:"dense",label:"News Type Name",type:"text",fullWidth:!0,variant:"outlined",value:o.newsTypeName,onChange:e=>y({...o,newsTypeName:e.target.value})}),t.jsx(C,{margin:"dense",label:"Description",type:"text",fullWidth:!0,variant:"outlined",value:o.description,onChange:e=>y({...o,description:e.target.value})})]}),t.jsxs(Q,{children:[t.jsx(g,{onClick:w,color:"primary",children:"Cancel"}),t.jsx(g,{onClick:$,color:"primary",children:m==="add"?"Add":"Save"})]})]})]})};export{ne as default};
