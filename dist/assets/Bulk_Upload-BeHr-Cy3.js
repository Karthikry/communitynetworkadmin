import{ad as q,u as L,r,j as a,M as Q,G as S,g as V,b as l,c as _,T as K}from"./index-BCMjTDj-.js";import{D as w,a as E}from"./DialogTitle-D85XLa7F.js";import{D as W}from"./DialogContent-B8Y-o2C7.js";import{D}from"./DialogActions-Db_kJuz6.js";import{T as X,a as Z,b as ee,c as f,d as n,e as ae}from"./TableRow-C6k8ikuc.js";import{f as ie}from"./format-cwXK75ha.js";import{T as te}from"./TablePagination-au4wXnx7.js";import"./LastPage-aK0Jz_ev.js";var se=q("plus","IconPlus",[["path",{d:"M12 5l0 14",key:"svg-0"}],["path",{d:"M5 12l14 0",key:"svg-1"}]]);const p=[{id:"membershipId",label:"ID",minWidth:120},{id:"applicationNumber",label:"Application Number",minWidth:180},{id:"membershipCode",label:"Membership Code",minWidth:180},{id:"referanceMembershipCode",label:"Reference Membership Code",minWidth:200},{id:"isAlive",label:"Is Alive",minWidth:120},{id:"fullName",label:"Full Name",minWidth:200},{id:"dob",label:"Date of Birth",minWidth:160},{id:"age",label:"Age",minWidth:120},{id:"bloodGroup",label:"Blood Group",minWidth:150},{id:"mobileNumber",label:"Mobile Number",minWidth:180},{id:"alternativeMobileNumber",label:"Alternative Mobile Number",minWidth:200},{id:"gothra",label:"Gothra",minWidth:150},{id:"emailId",label:"Email ID",minWidth:200},{id:"gender",label:"Gender",minWidth:120},{id:"isMarried",label:"Is Married",minWidth:160},{id:"femaleFamilyRefMembershipCode",label:"Female Family Ref Membership Code",minWidth:200},{id:"occupation",label:"Occupation",minWidth:180},{id:"qualification",label:"Qualification",minWidth:180},{id:"address",label:"Address",minWidth:250},{id:"city",label:"City",minWidth:150},{id:"country",label:"Country",minWidth:150},{id:"edit",label:"Edit",align:"center",minWidth:120},{id:"delete",label:"Delete",align:"center",minWidth:120}],me=()=>{const m=L(),[b,x]=r.useState(0),[g,N]=r.useState(10),[y,F]=r.useState([]),[I,A]=r.useState(0),[j,P]=r.useState(null),[B,o]=r.useState(!1),[d,v]=r.useState(null),[O,c]=r.useState(!1),[u,C]=r.useState({}),[k,M]=r.useState(""),[T,U]=r.useState(""),h=async()=>{try{const e=JSON.parse(sessionStorage.getItem("user")),i=(e==null?void 0:e.accessToken)||"",t=await fetch(`https://executivetracking.cloudjiffy.net/Mahaasabha/membership/v1/getAllMembershipByPagination/{pageNumber}/{pageSize}?pageNumber=${b}&pageSize=${g}`,{method:"GET",headers:{"Content-Type":"application/json",Authorization:`Bearer ${i}`}});if(!t.ok)throw new Error(`Error: ${t.status}`);const s=await t.json();F(s.content||[]),A(s.totalElements||0)}catch(e){P(e.message),console.error("Failed to fetch family data:",e)}},$=e=>{C(e),c(!0)},R=async e=>{try{window.confirm("Are you sure you want to delete");const i=JSON.parse(sessionStorage.getItem("user")),t=(i==null?void 0:i.accessToken)||"",s=await fetch(`https://executivetracking.cloudjiffy.net/Mahaasabha/membership/v1/deleteMembershipById/${e}`,{method:"DELETE",headers:{Authorization:`Bearer ${t}`}});if(!s.ok)throw new Error(`Error: ${s.status}`);await h(),U("Member successfully deleted.")}catch(i){console.error("Failed to delete member:",i)}},z=async()=>{try{const e=JSON.parse(sessionStorage.getItem("user")),i=(e==null?void 0:e.accessToken)||"",t=await fetch("https://executivetracking.cloudjiffy.net/Mahaasabha/membership/v1/updateMembership",{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${i}`},body:JSON.stringify(u)});if(!t.ok)throw new Error(`Error: ${t.status}`);c(!1),await h()}catch(e){console.error("Failed to update member:",e)}},G=()=>{o(!0),M("")},J=e=>{v(e.target.files[0])},H=async()=>{if(!d)return;const e=JSON.parse(sessionStorage.getItem("user")),i=(e==null?void 0:e.accessToken)||"",t=new FormData;t.append("file",d);try{const s=await fetch("https://executivetracking.cloudjiffy.net/Mahaasabha/membership/v1/membershipBulkUploadFile?userId=2",{method:"POST",headers:{Authorization:`Bearer ${i}`},body:t});if(!s.ok)throw new Error(`Error: ${s.status}`);await h(),o(!1),v(null),M("File Uploaded successfully!"),window.alert("File Uploaded successfully!")}catch(s){console.error("Failed to upload file:",s)}};return r.useEffect(()=>{h()},[b,g]),a.jsxs(Q,{title:"Membership Details",children:[a.jsx(S,{container:!0,spacing:V,justifyContent:"flex-end",children:a.jsx(S,{item:!0,children:a.jsx(l,{variant:"contained",color:"primary",onClick:G,children:"Bulk Upload"})})}),k&&a.jsx("div",{style:{color:"green",marginTop:m.spacing(2)},children:k}),T&&a.jsx("div",{style:{color:"green",marginTop:m.spacing(2)},children:T}),a.jsxs(w,{open:B,onClose:()=>o(!1),children:[a.jsx(E,{children:"Upload file"}),a.jsxs(W,{children:[a.jsxs(l,{variant:"contained",component:"label",children:[a.jsx(se,{}),"Browse File",a.jsx("input",{type:"file",hidden:!0,onChange:J})]}),d?a.jsx("span",{children:d.name}):a.jsx("span",{children:"No file selected"})]}),a.jsxs(D,{children:[a.jsx(l,{onClick:()=>o(!1),color:"primary",children:"Cancel"}),a.jsx(l,{onClick:H,color:"primary",children:"Upload"})]})]}),a.jsxs(_,{sx:{width:"100%",overflow:"hidden",marginTop:m.spacing(2)},children:[j&&a.jsxs("div",{style:{color:"red"},children:["Error: ",j]}),a.jsx(X,{sx:{maxHeight:440},children:a.jsxs(Z,{stickyHeader:!0,"aria-label":"sticky table",children:[a.jsx(ee,{children:a.jsx(f,{children:p.map(e=>a.jsx(n,{align:e.align,style:{minWidth:e.minWidth,fontWeight:600,fontSize:14},children:e.label},e.id))})}),a.jsx(ae,{children:y.length>0?y.map(e=>a.jsx(f,{hover:!0,role:"checkbox",tabIndex:-1,children:p.map(i=>{const t=e[i.id];if(i.id==="edit")return a.jsx(n,{align:i.align,children:a.jsx(l,{variant:"outlined",color:"primary",onClick:()=>$(e),children:"Edit"})},i.id);if(i.id==="delete")return a.jsx(n,{align:i.align,children:a.jsx(l,{variant:"outlined",color:"secondary",onClick:()=>R(e.membershipId),children:"Delete"})},i.id);if(i.id==="isAlive")return a.jsx(n,{align:i.align,style:{padding:"16px 24px"},children:t===!0?"Yes":t===!1?"No":"Not Available"},i.id);if(i.id==="dob"){const Y=t?ie(new Date(t),"MM/dd/yyyy"):"Not Available";return a.jsx(n,{align:i.align,style:{padding:"16px 24px"},children:Y},i.id)}const s=t||"Not Available";return a.jsx(n,{align:i.align,style:{padding:"16px 24px"},children:typeof s=="boolean"?s?"Yes":"No":s},i.id)})},e.membershipId)):a.jsx(f,{children:a.jsx(n,{colSpan:p.length,align:"center",children:"No data available"})})})]})}),a.jsx(te,{rowsPerPageOptions:[10,25,100],component:"div",count:I,rowsPerPage:g,page:b,onPageChange:(e,i)=>x(i),onRowsPerPageChange:e=>{N(+e.target.value),x(0)}})]}),a.jsxs(w,{open:O,onClose:()=>c(!1),children:[a.jsx(E,{children:"Edit Member Details"}),a.jsx(W,{children:p.filter(e=>e.id!=="membershipId"&&e.id!=="applicationNumber"&&e.id!=="edit"&&e.id!=="delete").map(e=>a.jsx(K,{label:e.label,fullWidth:!0,value:u[e.id]||"",onChange:i=>C({...u,[e.id]:i.target.value}),margin:"normal"},e.id))}),a.jsxs(D,{children:[a.jsx(l,{onClick:()=>c(!1),color:"primary",children:"Cancel"}),a.jsx(l,{onClick:z,color:"primary",children:"Save"})]})]})]})};export{me as default};