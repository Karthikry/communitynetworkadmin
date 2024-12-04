import{r as c,j as t,c as J,b as g,I as S,T as f}from"./index-BCMjTDj-.js";import{d as M}from"./Edit-BAFAy0Gz.js";import{d as R}from"./Delete-DQ5tIu97.js";import{T as H,a as L,b as U,c as x,d as b,e as _}from"./TableRow-C6k8ikuc.js";import{T as G}from"./TablePagination-au4wXnx7.js";import{D as Y,a as q}from"./DialogTitle-D85XLa7F.js";import{D as K}from"./DialogContent-B8Y-o2C7.js";import{D as Q}from"./DialogActions-Db_kJuz6.js";import"./LastPage-aK0Jz_ev.js";const C=[{id:"cityId",label:"ID",minWidth:50},{id:"cityName",label:"City Name",minWidth:150},{id:"description",label:"Description",minWidth:200},{id:"pincode",label:"Pincode",minWidth:100},{id:"createdBy",label:"Created By",minWidth:150},{id:"updatedBy",label:"Updated By",minWidth:150},{id:"insertedDate",label:"Inserted Date",minWidth:180},{id:"updatedDate",label:"Updated Date",minWidth:180},{id:"actions",label:"Actions",minWidth:100,align:"center"}],ne=()=>{const[u,j]=c.useState(0),[y,v]=c.useState(10),[N,I]=c.useState([]),[k,B]=c.useState(0),[D,l]=c.useState(null),[E,w]=c.useState(!1),[m,P]=c.useState("add"),[o,d]=c.useState({cityId:0,cityName:"",description:"",pincode:""});c.useEffect(()=>{h()},[u,y]);const h=async()=>{try{const e=JSON.parse(sessionStorage.getItem("user")),i=(e==null?void 0:e.accessToken)||"",a=await fetch(`https://executivetracking.cloudjiffy.net/Mahaasabha/city/v1/getAllCityByPagination/{pageNumber}/{pageSize}?pageNumber=${u}&pageSize=${y}`,{method:"GET",headers:{"Content-Type":"application/json",Authorization:`Bearer ${i}`}});if(!a.ok)throw new Error(`Error: ${a.statusText}`);const s=await a.json(),r=s.content.map(n=>({cityId:n.cityId,cityName:n.cityName,description:n.description,pincode:n.pincode,createdBy:n.createdBy.fullName||n.createdBy.userName,updatedBy:n.updatedBy.fullName||n.updatedBy.userName,insertedDate:new Date(n.insertedDate).toLocaleDateString(),updatedDate:new Date(n.updatedDate).toLocaleDateString()}));I(r),B(s.totalElements)}catch(e){l(e.message),console.error("Failed to fetch cities:",e)}},W=(e,i)=>{j(i)},A=e=>{v(+e.target.value),j(0)},T=(e,i={})=>{P(e),d(i),w(!0)},p=()=>{w(!1),d({cityId:0,cityName:"",description:"",pincode:""})},$=async()=>{m==="add"?await O():await F()},O=async()=>{try{const e=JSON.parse(sessionStorage.getItem("user")||"{}"),i=(e==null?void 0:e.accessToken)||"",a={cityName:o.cityName,description:o.description,pincode:o.pincode,createdBy:{fullName:e.fullName||e.userName,mobileNumber:e.mobileNumber,userId:e.userId,userName:e.userName}},s=await fetch("https://executivetracking.cloudjiffy.net/Mahaasabha/city/v1/createCity",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${i}`},body:JSON.stringify(a)});if(!s.ok){const r=await s.json();throw console.error("Failed to add city:",r),new Error(`Error: ${s.statusText}`)}h(),p()}catch(e){l(e.message),console.error("Failed to add city:",e)}},F=async()=>{try{const e=JSON.parse(sessionStorage.getItem("user")||"{}"),i=(e==null?void 0:e.accessToken)||"",a={cityId:o.cityId,cityName:o.cityName,description:o.description,pincode:o.pincode,updatedBy:{fullName:e.fullName||e.userName,mobileNumber:e.mobileNumber,userId:e.userId,userName:e.userName}},s=await fetch("https://executivetracking.cloudjiffy.net/Mahaasabha/city/v1/updateCity",{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${i}`},body:JSON.stringify(a)});if(!s.ok){const r=await s.json();throw console.error("Failed to edit city:",r),new Error(`Error: ${s.statusText}`)}h(),p()}catch(e){l(e.message),console.error("Failed to edit city:",e)}},z=async e=>{if(window.confirm("Are you sure you want to delete this city?"))try{const a=JSON.parse(sessionStorage.getItem("user")||"{}"),s=(a==null?void 0:a.accessToken)||"";console.log("Deleting city with ID:",e);const r=await fetch(`https://executivetracking.cloudjiffy.net/Mahaasabha/city/v1/deleteCityById/${e}`,{method:"DELETE",headers:{"Content-Type":"application/json",Authorization:`Bearer ${s}`}});if(!r.ok){const n=await r.json();throw console.error("Failed to delete city:",n),new Error(`Error: ${r.statusText}`)}console.log("Delete successful:",await r.json()),h()}catch(a){l(a.message),console.error("Failed to delete city:",a)}};return t.jsxs(J,{sx:{width:"100%",overflow:"hidden",mt:5},children:[t.jsx(g,{variant:"contained",sx:{margin:"10px"},onClick:()=>T("add"),children:"+ ADD CITY"}),D&&t.jsxs("div",{style:{color:"red",textAlign:"center"},children:["Error: ",D]}),t.jsx(H,{sx:{maxHeight:440},children:t.jsxs(L,{stickyHeader:!0,"aria-label":"sticky table",children:[t.jsx(U,{children:t.jsx(x,{children:C.map(e=>t.jsx(b,{align:e.align||"left",style:{minWidth:e.minWidth,fontWeight:"bold"},children:e.label},e.id))})}),t.jsx(_,{children:N.length>0?N.map(e=>t.jsx(x,{hover:!0,role:"checkbox",tabIndex:-1,children:C.map(i=>{const a=e[i.id];return t.jsx(b,{align:i.align||"left",children:i.id==="actions"?t.jsxs(t.Fragment,{children:[t.jsx(S,{onClick:()=>T("edit",e),color:"primary",children:t.jsx(M,{})}),t.jsx(S,{onClick:()=>z(e.cityId),color:"secondary",children:t.jsx(R,{})})]}):a||"Not Available"},i.id)})},e.cityId)):t.jsx(x,{children:t.jsx(b,{colSpan:C.length,align:"center",sx:{padding:20},children:"No rows"})})})]})}),t.jsx(G,{rowsPerPageOptions:[10,25,100],component:"div",count:k,rowsPerPage:y,page:u,onPageChange:W,onRowsPerPageChange:A}),t.jsxs(Y,{open:E,onClose:p,fullWidth:!0,children:[t.jsx(q,{children:m==="add"?"Add City":"Edit City"}),t.jsxs(K,{children:[t.jsx(f,{margin:"dense",label:"City Name",fullWidth:!0,value:o.cityName,onChange:e=>d({...o,cityName:e.target.value})}),t.jsx(f,{margin:"dense",label:"Description",fullWidth:!0,value:o.description,onChange:e=>d({...o,description:e.target.value})}),t.jsx(f,{margin:"dense",label:"Pincode",fullWidth:!0,value:o.pincode,onChange:e=>d({...o,pincode:e.target.value})})]}),t.jsxs(Q,{children:[t.jsx(g,{onClick:p,color:"primary",children:"Cancel"}),t.jsx(g,{onClick:$,color:"primary",children:m==="add"?"Add":"Save"})]})]})]})};export{ne as default};
