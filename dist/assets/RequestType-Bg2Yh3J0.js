import{r as d,j as t,b as F,a as T,I as w,T as S}from"./index-BoyrWkQt.js";import{d as z}from"./Edit-2SSNZ3I4.js";import{d as J}from"./Delete-BTlMcuVb.js";import{T as M,a as U,b as H,c as f,d as u,e as L,f as _}from"./TableRow-BWgOi_6U.js";import{D as G,a as Q,b as Y}from"./DialogTitle-D-tDGQQo.js";import{D as K}from"./DialogContent-DiWyJfmb.js";const x=[{id:"requestTypeId",label:"Request Type ID",minWidth:120},{id:"requestTypeName",label:"Request Type Name",minWidth:180},{id:"description",label:"Description",minWidth:200},{id:"createdBy",label:"Created By",minWidth:150},{id:"updatedBy",label:"Updated By",minWidth:150},{id:"insertedDate",label:"Inserted Date",minWidth:180},{id:"updatedDate",label:"Updated Date",minWidth:180},{id:"edit",label:"Edit",minWidth:80},{id:"delete",label:"Delete",minWidth:80}],se=()=>{const[c,q]=d.useState(0),[l,C]=d.useState(10),[b,v]=d.useState([]),[k,E]=d.useState(0),[j,p]=d.useState(null),[R,N]=d.useState(!1),[g,I]=d.useState("add"),[n,h]=d.useState({requestTypeId:0,requestTypeName:"",description:""});d.useEffect(()=>{y()},[c,l]);const y=async()=>{try{const e=JSON.parse(sessionStorage.getItem("user")),a=(e==null?void 0:e.accessToken)||"",s=await fetch(`https://executivetracking.cloudjiffy.net/Mahaasabha/requesttype/v1/getAllRequestTypeByPagination/{pageNumber}/{pageSize}?pageNumber=${c}&pageSize=${l}`,{method:"GET",headers:{"Content-Type":"application/json",Authorization:`Bearer ${a}`}});if(!s.ok)throw new Error(`Error: ${s.statusText}`);const r=await s.json(),i=r.content.map(o=>({requestTypeId:o.requestTypeId,requestTypeName:o.requestTypeName,description:o.description,createdBy:o.createdBy.fullName||o.createdBy.userName,updatedBy:o.updatedBy.fullName||o.updatedBy.userName,insertedDate:new Date(o.insertedDate).toLocaleDateString(),updatedDate:new Date(o.updatedDate).toLocaleDateString()}));v(i),E(r.totalElements)}catch(e){p(e.message),console.error("Failed to fetch request types:",e)}},B=(e,a)=>{q(a)},P=e=>{C(+e.target.value),q(0)},D=(e,a={})=>{I(e),h(a),N(!0)},m=()=>{N(!1),h({requestTypeId:0,requestTypeName:"",description:""})},W=async()=>{g==="add"?await A():await $()},A=async()=>{try{const e=JSON.parse(sessionStorage.getItem("user")),a=(e==null?void 0:e.accessToken)||"",s={requestTypeName:n.requestTypeName,description:n.description,createdBy:{fullName:e.fullName||e.userName,mobileNumber:e.mobileNumber,userId:e.userId,userName:e.userName}},r=await fetch("https://executivetracking.cloudjiffy.net/Mahaasabha/requesttype/v1/createRequestType",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${a}`},body:JSON.stringify(s)});if(!r.ok){const i=await r.json();throw console.error("Failed to add request type:",i),new Error(`Error: ${r.statusText}`)}y(),m()}catch(e){p(e.message),console.error("Failed to add request type:",e)}},$=async()=>{try{const e=JSON.parse(sessionStorage.getItem("user")),a=(e==null?void 0:e.accessToken)||"",s={requestTypeId:n.requestTypeId,requestTypeName:n.requestTypeName,description:n.description,updatedBy:{fullName:e.fullName||e.userName,mobileNumber:e.mobileNumber,userId:e.userId,userName:e.userName}},r=await fetch("https://executivetracking.cloudjiffy.net/Mahaasabha/requesttype/v1/updateRequestType",{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${a}`},body:JSON.stringify(s)});if(!r.ok){const i=await r.json();throw console.error("Failed to edit request type:",i),new Error(`Error: ${r.statusText}`)}y(),m()}catch(e){p(e.message),console.error("Failed to edit request type:",e)}},O=async e=>{if(window.confirm("Are you sure you want to delete this request type?"))try{const s=JSON.parse(sessionStorage.getItem("user")),r=(s==null?void 0:s.accessToken)||"",i=await fetch(`https://executivetracking.cloudjiffy.net/Mahaasabha/requesttype/v1/deleteRequestTypeById/${e}`,{method:"DELETE",headers:{"Content-Type":"application/json",Authorization:`Bearer ${r}`}});if(!i.ok){const o=await i.json();throw console.error("Failed to delete request type:",o),new Error(`Error: ${i.statusText}`)}y()}catch(s){p(s.message),console.error("Failed to delete request type:",s)}};return t.jsxs(F,{sx:{width:"100%",overflow:"hidden",mt:5},children:[t.jsx(T,{variant:"contained",sx:{margin:"10px"},onClick:()=>D("add"),children:"+ ADD REQUEST TYPE"}),j&&t.jsxs("div",{style:{color:"red",textAlign:"center"},children:["Error: ",j]}),t.jsx(M,{sx:{maxHeight:440},children:t.jsxs(U,{stickyHeader:!0,"aria-label":"sticky table",children:[t.jsx(H,{children:t.jsx(f,{children:x.map(e=>t.jsx(u,{align:e.align||"left",style:{minWidth:e.minWidth,fontWeight:"bold"},children:e.label},e.id))})}),t.jsx(L,{children:b.length>0?b.slice(c*l,c*l+l).map(e=>t.jsx(f,{hover:!0,role:"checkbox",tabIndex:-1,children:x.map(a=>{const s=e[a.id];return a.id==="edit"?t.jsx(u,{align:"left",children:t.jsx(w,{onClick:()=>D("edit",e),color:"primary",children:t.jsx(z,{})})},a.id):a.id==="delete"?t.jsx(u,{align:"left",children:t.jsx(w,{onClick:()=>O(e.requestTypeId),color:"secondary",children:t.jsx(J,{})})},a.id):t.jsx(u,{align:a.align||"left",children:s||"Not Available"},a.id)})},e.requestTypeId)):t.jsx(f,{children:t.jsx(u,{colSpan:x.length,align:"center",sx:{padding:20},children:"No rows"})})})]})}),t.jsx(_,{rowsPerPageOptions:[10,25,100],component:"div",count:k,rowsPerPage:l,page:c,onPageChange:B,onRowsPerPageChange:P}),t.jsxs(G,{open:R,onClose:m,children:[t.jsx(Q,{children:g==="add"?"Add Request Type":"Edit Request Type"}),t.jsxs(K,{children:[t.jsx(S,{autoFocus:!0,margin:"dense",label:"Request Type Name",type:"text",fullWidth:!0,variant:"outlined",value:n.requestTypeName,onChange:e=>h({...n,requestTypeName:e.target.value})}),t.jsx(S,{margin:"dense",label:"Description",type:"text",fullWidth:!0,variant:"outlined",value:n.description,onChange:e=>h({...n,description:e.target.value})})]}),t.jsxs(Y,{children:[t.jsx(T,{onClick:m,color:"primary",children:"Cancel"}),t.jsx(T,{onClick:W,color:"primary",children:g==="add"?"Add":"Save"})]})]})]})};export{se as default};
