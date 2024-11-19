import{r as i,j as e,c as F,b as u,T as l,I as y}from"./index-Djsfy_Oq.js";import{d as H}from"./Edit-CWCknw8m.js";import{d as U}from"./Delete-CtFrHhEW.js";import{D as z,a as G}from"./DialogTitle-s7brXHWk.js";import{D as L}from"./DialogContent-DHscOiCv.js";import{D as J}from"./DialogActions-hyJVfphP.js";import{T as Y,a as q,b as K,c as g,d as o,e as Q,f as V}from"./TableRow-DpUlrRrC.js";const b=[{id:"memberId",label:"Member ID",minWidth:80},{id:"fullName",label:"Full Name",minWidth:150},{id:"userName",label:"User Name",minWidth:150},{id:"gender",label:"Gender",minWidth:100},{id:"mobileNumber",label:"Mobile Number",minWidth:150},{id:"mailId",label:"Mail ID",minWidth:200},{id:"profilePicPath",label:"Profile Pic",minWidth:150},{id:"insertedDate",label:"Inserted Date",minWidth:150},{id:"updatedDate",label:"Updated Date",minWidth:150},{id:"status",label:"Status",minWidth:120},{id:"edit",label:"Edit",minWidth:80},{id:"delete",label:"Delete",minWidth:80}],re=()=>{const[c,f]=i.useState(0),[m,w]=i.useState(10),[p,x]=i.useState([]),[E,j]=i.useState(0),[I,P]=i.useState(!1),[r,W]=i.useState({fullName:"",userName:"",gender:"",mobileNumber:"",mailId:"",profilePicPath:"",status:"Inactive"}),[k,N]=i.useState(!0),[v,T]=i.useState(""),S=async(t,a)=>{N(!0);try{const n=JSON.parse(sessionStorage.getItem("user")),d=(n==null?void 0:n.accessToken)||"",D=await fetch(`https://executivetracking.cloudjiffy.net/Mahaasabha/member/v1/getAllMembersByPagination/{pageNumber}/{pageSize}?pageNumber=${t}&pageSize=${a}`,{method:"GET",headers:{"Content-Type":"application/json",Authorization:`Bearer ${d}`}});if(!D.ok)throw new Error("Network response was not ok");const C=await D.json();x(C.content),j(C.totalElements)}catch(n){T("Failed to fetch members: "+n.message)}finally{N(!1)}};i.useEffect(()=>{S(c,m)},[c,m]);const M=(t,a)=>{f(a)},R=t=>{w(+t.target.value),f(0)},A=t=>{console.log(`Edit clicked for ID: ${t}`)},O=t=>{console.log(`Delete clicked for ID: ${t}`)},B=()=>{P(!0)},h=()=>{P(!1)},s=t=>{const{name:a,value:n}=t.target;W({...r,[a]:n})},_=async t=>{t.preventDefault();try{const a=await fetch("YOUR_API_CREATE_ENDPOINT_HERE",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(r)});if(!a.ok)throw new Error("Network response was not ok");const n=await a.json();x(d=>[...d,n]),h(),j(d=>d+1)}catch(a){console.error("Error creating member:",a)}},$=t=>{const a={year:"numeric",month:"2-digit",day:"2-digit"};return new Date(t).toLocaleDateString(void 0,a)};return k?e.jsx("div",{children:"Loading..."}):v?e.jsx("div",{children:v}):e.jsxs(F,{sx:{width:"100%",overflow:"hidden",mt:5},children:[e.jsx(u,{variant:"contained",sx:{margin:"10px"},onClick:B,children:"+ ADD MEMBER"}),e.jsxs(z,{open:I,onClose:h,children:[e.jsx(G,{children:"Add New Member"}),e.jsxs(L,{children:[e.jsx(l,{autoFocus:!0,margin:"dense",name:"fullName",label:"Full Name",type:"text",fullWidth:!0,variant:"standard",value:r.fullName,onChange:s}),e.jsx(l,{margin:"dense",name:"userName",label:"User Name",type:"text",fullWidth:!0,variant:"standard",value:r.userName,onChange:s}),e.jsx(l,{margin:"dense",name:"gender",label:"Gender",type:"text",fullWidth:!0,variant:"standard",value:r.gender,onChange:s}),e.jsx(l,{margin:"dense",name:"mobileNumber",label:"Mobile Number",type:"text",fullWidth:!0,variant:"standard",value:r.mobileNumber,onChange:s}),e.jsx(l,{margin:"dense",name:"mailId",label:"Mail ID",type:"email",fullWidth:!0,variant:"standard",value:r.mailId,onChange:s}),e.jsx(l,{margin:"dense",name:"profilePicPath",label:"Profile Pic Path",type:"text",fullWidth:!0,variant:"standard",value:r.profilePicPath,onChange:s})]}),e.jsxs(J,{children:[e.jsx(u,{onClick:h,children:"Cancel"}),e.jsx(u,{onClick:_,children:"Add Member"})]})]}),e.jsx(Y,{sx:{maxHeight:440},children:e.jsxs(q,{stickyHeader:!0,"aria-label":"sticky table",children:[e.jsx(K,{children:e.jsx(g,{children:b.map(t=>e.jsx(o,{align:t.align||"left",style:{minWidth:t.minWidth,fontWeight:"bold"},children:t.label},t.id))})}),e.jsx(Q,{children:p.length>0?p.map(t=>e.jsx(g,{hover:!0,role:"checkbox",tabIndex:-1,children:b.map(a=>{const n=t[a.id];return a.id==="edit"?e.jsx(o,{align:"left",children:e.jsx(y,{onClick:()=>A(t.memberId),color:"primary",children:e.jsx(H,{})})},a.id):a.id==="delete"?e.jsx(o,{align:"left",children:e.jsx(y,{onClick:()=>O(t.memberId),color:"secondary",children:e.jsx(U,{})})},a.id):a.id==="insertedDate"||a.id==="updatedDate"?e.jsx(o,{align:"left",children:$(n)},a.id):e.jsx(o,{align:"left",children:n},a.id)})},t.memberId)):e.jsx(g,{children:e.jsx(o,{colSpan:b.length,align:"center",children:"No data available"})})})]})}),e.jsx(V,{rowsPerPageOptions:[10,25,50],component:"div",count:E,rowsPerPage:m,page:c,onPageChange:M,onRowsPerPageChange:R})]})};export{re as default};
