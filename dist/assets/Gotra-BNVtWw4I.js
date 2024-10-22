import{r as d,j as t,b as R,a as x,I as S,T as C}from"./index-BoyrWkQt.js";import{d as z}from"./Edit-2SSNZ3I4.js";import{d as J}from"./Delete-BTlMcuVb.js";import{T as M,a as H,b as L,c as b,d as g,e as U,f as _}from"./TableRow-BWgOi_6U.js";import{D as q,a as K,b as Q}from"./DialogTitle-D-tDGQQo.js";import{D as V}from"./DialogContent-DiWyJfmb.js";const y=[{id:"gotraId",label:"ID",minWidth:50},{id:"gotraName",label:"Gotra Name",minWidth:180},{id:"description",label:"Description",minWidth:200},{id:"createdBy",label:"Created By",minWidth:150},{id:"updatedBy",label:"Updated By",minWidth:150},{id:"insertedDate",label:"Inserted Date",minWidth:180},{id:"updatedDate",label:"Updated Date",minWidth:180},{id:"edit",label:"Edit",minWidth:80},{id:"delete",label:"Delete",minWidth:80}],oe=()=>{const[c,j]=d.useState(0),[l,v]=d.useState(10),[N,k]=d.useState([]),[I,B]=d.useState(0),[D,h]=d.useState(null),[E,T]=d.useState(!1),[f,G]=d.useState("add"),[n,u]=d.useState({gotraId:0,gotraName:"",description:""});d.useEffect(()=>{p()},[c,l]);const p=async()=>{try{const e=JSON.parse(sessionStorage.getItem("user")),a=(e==null?void 0:e.accessToken)||"",o=await fetch(`https://executivetracking.cloudjiffy.net/Mahaasabha/gotra/v1/getAllGotraByPagination/{pageNumber}/{pageSize}?pageNumber=${c}&pageSize=${l}`,{method:"GET",headers:{"Content-Type":"application/json",Authorization:`Bearer ${a}`}});if(!o.ok)throw new Error(`Error: ${o.statusText}`);const r=await o.json(),i=r.content.map(s=>({gotraId:s.gotraId,gotraName:s.gotraName,description:s.description,createdBy:s.createdBy.fullName||s.createdBy.userName,updatedBy:s.updatedBy.fullName||s.updatedBy.userName,insertedDate:new Date(s.insertedDate).toLocaleDateString(),updatedDate:new Date(s.updatedDate).toLocaleDateString()}));k(i),B(r.totalElements)}catch(e){h(e.message),console.error("Failed to fetch gotras:",e)}},P=(e,a)=>{j(a)},A=e=>{v(+e.target.value),j(0)},w=(e,a={})=>{G(e),u(a),T(!0)},m=()=>{T(!1),u({gotraId:0,gotraName:"",description:""})},W=async()=>{f==="add"?await $():await O()},$=async()=>{try{const e=JSON.parse(sessionStorage.getItem("user")),a=(e==null?void 0:e.accessToken)||"",o={gotraName:n.gotraName,description:n.description,createdBy:{fullName:e.fullName||e.userName,mobileNumber:e.mobileNumber,userId:e.userId,userName:e.userName}},r=await fetch("https://executivetracking.cloudjiffy.net/Mahaasabha/gotra/v1/createGotra",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${a}`},body:JSON.stringify(o)});if(!r.ok){const i=await r.json();throw console.error("Failed to add gotra:",i),new Error(`Error: ${r.statusText}`)}p(),m()}catch(e){h(e.message),console.error("Failed to add gotra:",e)}},O=async()=>{try{const e=JSON.parse(sessionStorage.getItem("user")),a=(e==null?void 0:e.accessToken)||"",o={gotraId:n.gotraId,gotraName:n.gotraName,description:n.description,updatedBy:{fullName:e.fullName||e.userName,mobileNumber:e.mobileNumber,userId:e.userId,userName:e.userName}},r=await fetch("https://executivetracking.cloudjiffy.net/Mahaasabha/gotra/v1/updateGotra",{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${a}`},body:JSON.stringify(o)});if(!r.ok){const i=await r.json();throw console.error("Failed to edit gotra:",i),new Error(`Error: ${r.statusText}`)}p(),m()}catch(e){h(e.message),console.error("Failed to edit gotra:",e)}},F=async e=>{if(window.confirm("Are you sure you want to delete this gotra?"))try{const o=JSON.parse(sessionStorage.getItem("user")),r=(o==null?void 0:o.accessToken)||"",i=await fetch(`https://executivetracking.cloudjiffy.net/Mahaasabha/gotra/v1/deleteGotraById/${e}`,{method:"DELETE",headers:{"Content-Type":"application/json",Authorization:`Bearer ${r}`}});if(!i.ok){const s=await i.json();throw console.error("Failed to delete gotra:",s),new Error(`Error: ${i.statusText}`)}p()}catch(o){h(o.message),console.error("Failed to delete gotra:",o)}};return t.jsxs(R,{sx:{width:"100%",overflow:"hidden",mt:5},children:[t.jsx(x,{variant:"contained",sx:{margin:"10px"},onClick:()=>w("add"),children:"+ ADD GOTRA"}),D&&t.jsxs("div",{style:{color:"red",textAlign:"center"},children:["Error: ",D]}),t.jsx(M,{sx:{maxHeight:440},children:t.jsxs(H,{stickyHeader:!0,"aria-label":"sticky table",children:[t.jsx(L,{children:t.jsx(b,{children:y.map(e=>t.jsx(g,{align:e.align||"left",style:{minWidth:e.minWidth,fontWeight:"bold"},children:e.label},e.id))})}),t.jsx(U,{children:N.length>0?N.slice(c*l,c*l+l).map(e=>t.jsx(b,{hover:!0,role:"checkbox",tabIndex:-1,children:y.map(a=>{const o=e[a.id];return a.id==="edit"?t.jsx(g,{align:"left",children:t.jsx(S,{onClick:()=>w("edit",e),color:"primary",children:t.jsx(z,{})})},a.id):a.id==="delete"?t.jsx(g,{align:"left",children:t.jsx(S,{onClick:()=>F(e.gotraId),color:"secondary",children:t.jsx(J,{})})},a.id):t.jsx(g,{align:a.align||"left",children:o||"Not Available"},a.id)})},e.gotraId)):t.jsx(b,{children:t.jsx(g,{colSpan:y.length,align:"center",sx:{padding:20},children:"No rows"})})})]})}),t.jsx(_,{rowsPerPageOptions:[10,25,100],component:"div",count:I,rowsPerPage:l,page:c,onPageChange:P,onRowsPerPageChange:A}),t.jsxs(q,{open:E,onClose:m,children:[t.jsx(K,{children:f==="add"?"Add Gotra":"Edit Gotra"}),t.jsxs(V,{children:[t.jsx(C,{autoFocus:!0,margin:"dense",label:"Gotra Name",fullWidth:!0,variant:"outlined",value:n.gotraName,onChange:e=>u({...n,gotraName:e.target.value})}),t.jsx(C,{margin:"dense",label:"Description",fullWidth:!0,variant:"outlined",value:n.description,onChange:e=>u({...n,description:e.target.value})})]}),t.jsxs(Q,{children:[t.jsx(x,{onClick:m,children:"Cancel"}),t.jsx(x,{onClick:W,children:f==="add"?"Add":"Save"})]})]})]})};export{oe as default};
