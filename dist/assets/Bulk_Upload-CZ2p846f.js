import{u as q,r,j as a,M as L,G as S,g as Q,b as l,c as V,T as _}from"./index-Djsfy_Oq.js";import{D,a as w}from"./DialogTitle-s7brXHWk.js";import{D as E}from"./DialogContent-DHscOiCv.js";import{D as W}from"./DialogActions-hyJVfphP.js";import{T as K,a as X,b as Z,c as f,d as n,e as ee,f as ae}from"./TableRow-DpUlrRrC.js";import{f as ie}from"./format-cwXK75ha.js";const p=[{id:"membershipId",label:"ID",minWidth:120},{id:"applicationNumber",label:"Application Number",minWidth:180},{id:"membershipCode",label:"Membership Code",minWidth:180},{id:"referanceMembershipCode",label:"Reference Membership Code",minWidth:200},{id:"isAlive",label:"Is Alive",minWidth:120},{id:"fullName",label:"Full Name",minWidth:200},{id:"dob",label:"Date of Birth",minWidth:160},{id:"age",label:"Age",minWidth:120},{id:"bloodGroup",label:"Blood Group",minWidth:150},{id:"mobileNumber",label:"Mobile Number",minWidth:180},{id:"alternativeMobileNumber",label:"Alternative Mobile Number",minWidth:200},{id:"gothra",label:"Gothra",minWidth:150},{id:"emailId",label:"Email ID",minWidth:200},{id:"gender",label:"Gender",minWidth:120},{id:"isMarried",label:"Is Married",minWidth:160},{id:"femaleFamilyRefMembershipCode",label:"Female Family Ref Membership Code",minWidth:200},{id:"occupation",label:"Occupation",minWidth:180},{id:"qualification",label:"Qualification",minWidth:180},{id:"address",label:"Address",minWidth:250},{id:"city",label:"City",minWidth:150},{id:"country",label:"Country",minWidth:150},{id:"edit",label:"Edit",align:"center",minWidth:120},{id:"delete",label:"Delete",align:"center",minWidth:120}],de=()=>{const m=q(),[b,x]=r.useState(0),[g,N]=r.useState(10),[y,A]=r.useState([]),[F,I]=r.useState(0),[j,P]=r.useState(null),[B,o]=r.useState(!1),[d,C]=r.useState(null),[O,c]=r.useState(!1),[u,k]=r.useState({}),[v,M]=r.useState(""),[T,$]=r.useState(""),h=async()=>{try{const e=JSON.parse(sessionStorage.getItem("user")),i=(e==null?void 0:e.accessToken)||"",t=await fetch(`https://executivetracking.cloudjiffy.net/Mahaasabha/membership/v1/getAllMembershipByPagination/{pageNumber}/{pageSize}?pageNumber=${b}&pageSize=${g}`,{method:"GET",headers:{"Content-Type":"application/json",Authorization:`Bearer ${i}`}});if(!t.ok)throw new Error(`Error: ${t.status}`);const s=await t.json();A(s.content||[]),I(s.totalElements||0)}catch(e){P(e.message),console.error("Failed to fetch family data:",e)}},U=e=>{k(e),c(!0)},z=async e=>{try{window.confirm("Are you sure you want to delete");const i=JSON.parse(sessionStorage.getItem("user")),t=(i==null?void 0:i.accessToken)||"",s=await fetch(`https://executivetracking.cloudjiffy.net/Mahaasabha/membership/v1/deleteMembershipById/${e}`,{method:"DELETE",headers:{Authorization:`Bearer ${t}`}});if(!s.ok)throw new Error(`Error: ${s.status}`);await h(),$("Member successfully deleted.")}catch(i){console.error("Failed to delete member:",i)}},G=async()=>{try{const e=JSON.parse(sessionStorage.getItem("user")),i=(e==null?void 0:e.accessToken)||"",t=await fetch("https://executivetracking.cloudjiffy.net/Mahaasabha/membership/v1/updateMembership",{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${i}`},body:JSON.stringify(u)});if(!t.ok)throw new Error(`Error: ${t.status}`);c(!1),await h()}catch(e){console.error("Failed to update member:",e)}},R=()=>{o(!0),M("")},J=e=>{C(e.target.files[0])},H=async()=>{if(!d)return;const e=JSON.parse(sessionStorage.getItem("user")),i=(e==null?void 0:e.accessToken)||"",t=new FormData;t.append("file",d);try{const s=await fetch("https://executivetracking.cloudjiffy.net/Mahaasabha/membership/v1/membershipBulkUploadFile?userId=2",{method:"POST",headers:{Authorization:`Bearer ${i}`},body:t});if(!s.ok)throw new Error(`Error: ${s.status}`);await h(),o(!1),C(null),M("Data has been successfully updated!"),window.alert("Data has been successfully updated!")}catch(s){console.error("Failed to upload file:",s)}};return r.useEffect(()=>{h()},[b,g]),a.jsxs(L,{title:"Membership Details",children:[a.jsx(S,{container:!0,spacing:Q,justifyContent:"flex-end",children:a.jsx(S,{item:!0,children:a.jsx(l,{variant:"contained",color:"primary",onClick:R,children:"Bulk Upload"})})}),v&&a.jsx("div",{style:{color:"green",marginTop:m.spacing(2)},children:v}),T&&a.jsx("div",{style:{color:"green",marginTop:m.spacing(2)},children:T}),a.jsxs(D,{open:B,onClose:()=>o(!1),children:[a.jsx(w,{children:"Upload file"}),a.jsxs(E,{children:[a.jsxs(l,{variant:"contained",component:"label",children:["Upload",a.jsx("input",{type:"file",hidden:!0,onChange:J})]}),d?a.jsx("span",{children:d.name}):a.jsx("span",{children:"No file selected"})]}),a.jsxs(W,{children:[a.jsx(l,{onClick:()=>o(!1),color:"primary",children:"Cancel"}),a.jsx(l,{onClick:H,color:"primary",children:"Upload"})]})]}),a.jsxs(V,{sx:{width:"100%",overflow:"hidden",marginTop:m.spacing(2)},children:[j&&a.jsxs("div",{style:{color:"red"},children:["Error: ",j]}),a.jsx(K,{sx:{maxHeight:440},children:a.jsxs(X,{stickyHeader:!0,"aria-label":"sticky table",children:[a.jsx(Z,{children:a.jsx(f,{children:p.map(e=>a.jsx(n,{align:e.align,style:{minWidth:e.minWidth,fontWeight:600,fontSize:14},children:e.label},e.id))})}),a.jsx(ee,{children:y.length>0?y.map(e=>a.jsx(f,{hover:!0,role:"checkbox",tabIndex:-1,children:p.map(i=>{const t=e[i.id];if(i.id==="edit")return a.jsx(n,{align:i.align,children:a.jsx(l,{variant:"outlined",color:"primary",onClick:()=>U(e),children:"Edit"})},i.id);if(i.id==="delete")return a.jsx(n,{align:i.align,children:a.jsx(l,{variant:"outlined",color:"secondary",onClick:()=>z(e.membershipId),children:"Delete"})},i.id);if(i.id==="isAlive")return a.jsx(n,{align:i.align,style:{padding:"16px 24px"},children:t===!0?"Yes":t===!1?"No":"Not Available"},i.id);if(i.id==="dob"){const Y=t?ie(new Date(t),"MM/dd/yyyy"):"Not Available";return a.jsx(n,{align:i.align,style:{padding:"16px 24px"},children:Y},i.id)}const s=t||"Not Available";return a.jsx(n,{align:i.align,style:{padding:"16px 24px"},children:typeof s=="boolean"?s?"Yes":"No":s},i.id)})},e.membershipId)):a.jsx(f,{children:a.jsx(n,{colSpan:p.length,align:"center",children:"No data available"})})})]})}),a.jsx(ae,{rowsPerPageOptions:[10,25,100],component:"div",count:F,rowsPerPage:g,page:b,onPageChange:(e,i)=>x(i),onRowsPerPageChange:e=>{N(+e.target.value),x(0)}})]}),a.jsxs(D,{open:O,onClose:()=>c(!1),children:[a.jsx(w,{children:"Edit Member Details"}),a.jsx(E,{children:p.filter(e=>e.id!=="membershipId"&&e.id!=="applicationNumber"&&e.id!=="edit"&&e.id!=="delete").map(e=>a.jsx(_,{label:e.label,fullWidth:!0,value:u[e.id]||"",onChange:i=>k({...u,[e.id]:i.target.value}),margin:"normal"},e.id))}),a.jsxs(W,{children:[a.jsx(l,{onClick:()=>c(!1),color:"primary",children:"Cancel"}),a.jsx(l,{onClick:G,color:"primary",children:"Save"})]})]})]})};export{de as default};
