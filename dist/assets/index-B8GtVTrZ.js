import{r as t,E as A,j as e,G as s,F as N,H as B,A as E,B as x,b as k,P as F,M as u,g as p}from"./index-BCMjTDj-.js";import{j as T}from"./carousel.min-BoHqOkit.js";import{b as f}from"./banner1-CmZASOGj.js";import{d as D,f as I}from"./UpskillsCategoryApi-76kPBS1k.js";import{A as L}from"./Alert-BxmTgsDR.js";const P=()=>{const[a,c]=t.useState(!1),[l,y]=t.useState([]),[g,d]=t.useState(null),b=A(),m={"Content-type":"application/json",Authorization:"Bearer "+JSON.parse(sessionStorage.getItem("user")).accessToken},C=()=>{c(!0)},w=async()=>{try{const o=(await D(m)).data;if(o){const n=o.sort((i,S)=>i.categoryName.localeCompare(S.categoryName)).map(i=>({categoryId:i.categoryId,categoryName:i.categoryName}));y(n)}}catch(r){console.error("Error fetching categories:",r),d("Failed to fetch categories.")}};t.useEffect(()=>{w()},[]);const v=async(r,o)=>{try{const n=(await I(m,r)).data;n.length>0?b("courses",{state:{categoryId:r,categoryName:o,details:n}}):d("No courses found for this category.")}catch(h){console.error("Error fetching courses:",h),d("Failed to fetch courses.")}};return e.jsxs("div",{children:[g&&e.jsx(L,{severity:"error",children:g}),e.jsx(s,{container:!0,spacing:2,children:(a?l:l.slice(0,8)).map(r=>e.jsx(s,{item:!0,xs:12,sm:6,md:4,lg:3,children:e.jsx(N,{sx:{border:"1px solid #ccc",borderRadius:"8px",boxShadow:"0 4px 8px rgba(0, 0, 0, 0.1)",transition:"transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out","&:hover":{transform:"scale(1.03)",boxShadow:"0 8px 16px rgba(0, 0, 0, 0.2)",cursor:"pointer"},margin:2},onClick:()=>v(r.categoryId,r.categoryName),children:e.jsx(B,{children:e.jsx(E,{variant:"h5",sx:{mb:1},children:r.categoryName})})})},r.categoryId))}),l.length>8&&!a&&e.jsx(x,{sx:{textAlign:{sm:"right",xs:"center"},mt:2,mr:2},children:e.jsx(k,{variant:"contained",color:"primary",onClick:C,children:"View All"})})]})},j=()=>e.jsxs(e.Fragment,{children:[e.jsx(u,{border:!1,content:!1,sx:{mt:1},children:e.jsx(x,{children:e.jsx(s,{container:!0,direction:"column",children:e.jsx(s,{item:!0,xs:12,children:e.jsxs(T.Carousel,{showThumbs:!1,infiniteLoop:!0,autoPlay:!0,interval:3e3,transitionTime:500,children:[e.jsx("div",{style:{height:"100%"},children:e.jsx("img",{src:f,alt:"Banner 1",style:{width:"100%",height:"100%",objectFit:"cover"}})}),e.jsx("div",{style:{height:"100%"},children:e.jsx("img",{src:f,alt:"Banner 1",style:{width:"100%",height:"100%",objectFit:"cover"}})})]})})})})}),e.jsx(u,{border:!1,content:!1,sx:{mt:4,width:"100%"},children:e.jsx(x,{sx:{mt:2,mb:2},children:e.jsx(P,{})})})]});j.propTypes={isLoading:F.bool};const J=()=>{const[a,c]=t.useState(!0);return t.useEffect(()=>{c(!1)},[]),e.jsx(s,{container:!0,spacing:p,children:e.jsx(s,{item:!0,xs:12,children:e.jsx(s,{container:!0,spacing:p,children:e.jsx(s,{item:!0,lg:12,md:12,sm:12,xs:12,children:e.jsx(j,{isLoading:a})})})})})};export{J as default};