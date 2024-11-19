import{r as c,j as t,c as z,b as g,I as T,T as S}from"./index-Djsfy_Oq.js";import{d as J}from"./Edit-CWCknw8m.js";import{d as M}from"./Delete-CtFrHhEW.js";import{T as U,a as H,b as L,c as f,d as x,e as _,f as G}from"./TableRow-DpUlrRrC.js";import{D as Y,a as q}from"./DialogTitle-s7brXHWk.js";import{D as K}from"./DialogContent-DHscOiCv.js";import{D as Q}from"./DialogActions-hyJVfphP.js";const C=[{id:"countryId",label:"ID",minWidth:50},{id:"countryName",label:"Country Name",minWidth:150},{id:"description",label:"Description",minWidth:200},{id:"createdBy",label:"Created By",minWidth:150},{id:"updatedBy",label:"Updated By",minWidth:150},{id:"insertedDate",label:"Inserted Date",minWidth:180},{id:"updatedDate",label:"Updated Date",minWidth:180},{id:"actions",label:"Actions",minWidth:100,align:"center"}],re=()=>{const[y,j]=c.useState(0),[p,k]=c.useState(10),[N,I]=c.useState([]),[v,B]=c.useState(0),[b,d]=c.useState(null),[E,D]=c.useState(!1),[m,P]=c.useState("add"),[i,l]=c.useState({countryId:0,countryName:"",description:""});c.useEffect(()=>{u()},[y,p]);const u=async()=>{try{const e=JSON.parse(sessionStorage.getItem("user")),o=(e==null?void 0:e.accessToken)||"",a=await fetch(`https://executivetracking.cloudjiffy.net/Mahaasabha/country/v1/getAllCountryByPagination/{pageNumber}/{pageSize}?pageNumber=${y}&pageSize=${p}`,{method:"GET",headers:{"Content-Type":"application/json",Authorization:`Bearer ${o}`}});if(!a.ok)throw new Error(`Error: ${a.statusText}`);const r=await a.json(),s=r.content.map(n=>({countryId:n.countryId,countryName:n.countryName,description:n.description,createdBy:n.createdBy.fullName||n.createdBy.userName,updatedBy:n.updatedBy.fullName||n.updatedBy.userName,insertedDate:new Date(n.insertedDate).toLocaleDateString(),updatedDate:new Date(n.updatedDate).toLocaleDateString()}));I(s),B(r.totalElements)}catch(e){d(e.message),console.error("Failed to fetch countries:",e)}},A=(e,o)=>{j(o)},W=e=>{k(+e.target.value),j(0)},w=(e,o={})=>{P(e),l(o),D(!0)},h=()=>{D(!1),l({countryId:0,countryName:"",description:""})},$=async()=>{m==="add"?await O():await F()},O=async()=>{try{const e=JSON.parse(sessionStorage.getItem("user")||"{}"),o=(e==null?void 0:e.accessToken)||"",a={countryName:i.countryName,description:i.description,createdBy:{fullName:e.fullName||e.userName,mobileNumber:e.mobileNumber,userId:e.userId,userName:e.userName}},r=await fetch("https://executivetracking.cloudjiffy.net/Mahaasabha/country/v1/createCountry",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${o}`},body:JSON.stringify(a)});if(!r.ok){const s=await r.json();throw console.error("Failed to add country:",s),new Error(`Error: ${r.statusText}`)}u(),h()}catch(e){d(e.message),console.error("Failed to add country:",e)}},F=async()=>{try{const e=JSON.parse(sessionStorage.getItem("user")||"{}"),o=(e==null?void 0:e.accessToken)||"",a={countryId:i.countryId,countryName:i.countryName,description:i.description,updatedBy:{fullName:e.fullName||e.userName,mobileNumber:e.mobileNumber,userId:e.userId,userName:e.userName}},r=await fetch("https://executivetracking.cloudjiffy.net/Mahaasabha/country/v1/updateCountry",{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${o}`},body:JSON.stringify(a)});if(!r.ok){const s=await r.json();throw console.error("Failed to edit country:",s),new Error(`Error: ${r.statusText}`)}u(),h()}catch(e){d(e.message),console.error("Failed to edit country:",e)}},R=async e=>{if(window.confirm("Are you sure you want to delete this city?"))try{const a=JSON.parse(sessionStorage.getItem("user")||"{}"),r=(a==null?void 0:a.accessToken)||"";console.log("Deleting city with ID:",e);const s=await fetch(`https://executivetracking.cloudjiffy.net/Mahaasabha/country/v1/deleteCountryById/${e}`,{method:"DELETE",headers:{"Content-Type":"application/json",Authorization:`Bearer ${r}`}});if(!s.ok){const n=await s.json();throw console.error("Failed to delete city:",n),new Error(`Error: ${s.statusText}`)}console.log("Delete successful:",await s.json()),u()}catch(a){d(a.message),console.error("Failed to delete city:",a)}};return t.jsxs(z,{sx:{width:"100%",overflow:"hidden",mt:5},children:[t.jsx(g,{variant:"contained",sx:{margin:"10px"},onClick:()=>w("add"),children:"+ ADD COUNTRY"}),b&&t.jsxs("div",{style:{color:"red",textAlign:"center"},children:["Error: ",b]}),t.jsx(U,{sx:{maxHeight:440},children:t.jsxs(H,{stickyHeader:!0,"aria-label":"sticky table",children:[t.jsx(L,{children:t.jsx(f,{children:C.map(e=>t.jsx(x,{align:e.align||"left",style:{minWidth:e.minWidth,fontWeight:"bold"},children:e.label},e.id))})}),t.jsx(_,{children:N.length>0?N.map(e=>t.jsx(f,{hover:!0,role:"checkbox",tabIndex:-1,children:C.map(o=>{const a=e[o.id];return t.jsx(x,{align:o.align||"left",children:o.id==="actions"?t.jsxs(t.Fragment,{children:[t.jsx(T,{onClick:()=>w("edit",e),color:"primary",children:t.jsx(J,{})}),t.jsx(T,{onClick:()=>R(e.countryId),color:"secondary",children:t.jsx(M,{})})]}):a},o.id)})},e.countryId)):t.jsx(f,{children:t.jsx(x,{colSpan:C.length,align:"center",children:"No records found."})})})]})}),t.jsx(G,{rowsPerPageOptions:[10,25,50],component:"div",count:v,rowsPerPage:p,page:y,onPageChange:A,onRowsPerPageChange:W}),t.jsxs(Y,{open:E,onClose:h,children:[t.jsx(q,{children:m==="add"?"Add Country":"Edit Country"}),t.jsxs(K,{children:[t.jsx(S,{autoFocus:!0,margin:"dense",id:"countryName",label:"Country Name",fullWidth:!0,value:i.countryName,onChange:e=>l({...i,countryName:e.target.value})}),t.jsx(S,{margin:"dense",id:"description",label:"Description",fullWidth:!0,value:i.description,onChange:e=>l({...i,description:e.target.value})})]}),t.jsxs(Q,{children:[t.jsx(g,{onClick:h,children:"Cancel"}),t.jsx(g,{onClick:$,variant:"contained",children:m==="add"?"Add":"Save"})]})]})]})};export{re as default};
