import{r as s,D as $,j as e,M as c,G as o,A as t,b as I,F as R,H as B}from"./index-BCMjTDj-.js";import{d as T}from"./InfoOutlined-BsUtV6LR.js";import{a as G,b as Y,c as z}from"./UpskillsCategoryApi-76kPBS1k.js";import{A as p}from"./Alert-BxmTgsDR.js";import{B as f}from"./Box-w4tAwpec.js";const q=()=>{const[i,j]=s.useState({}),[E,g]=s.useState([]),[M,b]=s.useState([]),[d,k]=s.useState(null),[D,F]=s.useState(null),[y,l]=s.useState(null),[v,u]=s.useState(null),[C,h]=s.useState(null),N=$(),{courseId:a}=N.state||{},x={"Content-type":"application/json",Authorization:"Bearer "+JSON.parse(sessionStorage.getItem("user")).accessToken},A=async()=>{try{const n=(await G(x,a)).data;n?(j(n),h(null)):(j({}),h("Course data not found."));const S=(await Y(x,a)).data;S.length>0?(g(S),l(null)):(g([]),l("No modules found for this course."))}catch(r){console.error("Error fetching data:",r),h("Failed to fetch course data."),l("Failed to fetch modules.")}},U=async r=>{try{const m=(await z(x,r)).data;m.length>0?(b(m),u(null)):(b([]),u("No topics found for this module."))}catch(n){console.error("Error fetching topics:",n),u("Failed to fetch topics.")}};s.useEffect(()=>{a&&A()},[a]);const V=r=>{F(r),U(r)},w=r=>{k(d===r?null:r)};return e.jsxs(e.Fragment,{children:[C?e.jsx(c,{sx:{mt:2},children:e.jsx(p,{severity:"error",children:C})}):e.jsx(c,{sx:{mt:2},children:e.jsxs(o,{container:!0,spacing:2,children:[e.jsx(o,{item:!0,xs:12,md:6,children:e.jsxs(f,{children:[e.jsxs(t,{variant:"h4",gutterBottom:!0,children:[i.courseName,e.jsx(I,{sx:{justifyContent:"right",alignItems:"center",borderRadius:"50%",backgroundColor:"transparent","&:hover":{backgroundColor:"action.hover"}},onClick:()=>w(null),children:e.jsx(T,{})})]}),e.jsxs(f,{sx:{display:"flex",alignItems:"center",mt:2},children:[e.jsxs(t,{variant:"h6",children:["₹",i.sellingPrice]}),e.jsxs(t,{variant:"body1",sx:{color:"text.secondary",textDecoration:"line-through",ml:2},children:["₹",i.courseMrp]}),e.jsxs(t,{variant:"body2",sx:{color:"green",ml:2},children:[i.discount,"% off"]})]}),d===null&&e.jsxs(t,{variant:"h5",sx:{mt:2},children:["Description: ",i.description]})]})}),e.jsx(o,{item:!0,xs:12,md:6,children:e.jsx(f,{children:e.jsx("iframe",{title:"YouTube Video",src:`https://www.youtube.com/embed/${i.videoUrl}`,frameBorder:"0",allowFullScreen:!0,style:{width:"100%",height:"350px",borderRadius:"20px"}})})})]})}),e.jsx(c,{sx:{mt:2},children:y?e.jsx(p,{severity:"error",children:y}):e.jsx(o,{container:!0,spacing:2,children:E.map(r=>e.jsx(o,{item:!0,xs:12,sm:6,md:3,children:e.jsx(R,{onClick:()=>V(r.moduleId),sx:{border:"1px solid #ccc",borderRadius:"8px",boxShadow:"0 4px 8px rgba(0, 0, 0, 0.1)",transition:"transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out","&:hover":{transform:"scale(1.03)",boxShadow:"0 8px 16px rgba(0, 0, 0, 0.2)",cursor:"pointer"},margin:2},children:e.jsxs(B,{children:[e.jsx(t,{variant:"h5",gutterBottom:!0,children:r.moduleName}),e.jsx(t,{variant:"body2",children:r.description})]})})},r.moduleId))})}),D&&e.jsx(c,{sx:{mt:2},children:v?e.jsx(p,{severity:"error",children:v}):e.jsx(o,{container:!0,spacing:2,children:M.map(r=>e.jsx(o,{item:!0,xs:12,sm:6,md:4,children:e.jsx(R,{sx:{border:"1px solid #ccc",borderRadius:"8px",boxShadow:"0 4px 8px rgba(0, 0, 0, 0.1)",transition:"transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out","&:hover":{transform:"scale(1.03)",boxShadow:"0 8px 16px rgba(0, 0, 0, 0.2)",cursor:"pointer"},margin:2},children:e.jsxs(B,{children:[r.videoUrl&&e.jsx("iframe",{title:`YouTube Video for ${r.topicName}`,src:`https://www.youtube.com/embed/${r.videoUrl}`,frameBorder:"0",allowFullScreen:!0,style:{width:"100%",height:"200px",borderRadius:"8px",marginTop:"10px"}}),e.jsxs(t,{variant:"h5",gutterBottom:!0,sx:{mt:2},children:[r.topicName,e.jsx(I,{sx:{justifyContent:"right",alignItems:"center",borderRadius:"50%",backgroundColor:"transparent","&:hover":{backgroundColor:"action.hover"}},onClick:()=>w(r.topicId),children:e.jsx(T,{})})]}),d===r.topicId&&e.jsx(t,{variant:"body2",children:r.description})]})})},r.topicId))})})]})};export{q as default};