import{P as f,r,j as e,M as j,B as d,G as t,a as m,g as h}from"./index-BCMjTDj-.js";import{j as y}from"./carousel.min-BoHqOkit.js";const u=()=>{const[i,n]=r.useState([]),[g,c]=r.useState(!0),p="https://executivetracking.cloudjiffy.net/Mahaasabha/file/downloadFile/?filePath=";return r.useEffect(()=>{(async()=>{var s;c(!0);try{const a=JSON.parse(sessionStorage.getItem("user")),x=(a==null?void 0:a.accessToken)||"",l=await m.get("https://executivetracking.cloudjiffy.net/Mahaasabha/advertisement/v1/getAllAdvertisementByPagination/{pageNumber}/{pageSize}?pageNumber=0&pageSize=10",{headers:{Authorization:`Bearer ${x}`}});n(Array.isArray((s=l.data)==null?void 0:s.content)?l.data.content:[])}catch(a){console.error("Error fetching banners:",a),n([])}finally{c(!1)}})()},[]),e.jsx(j,{border:!1,content:!1,children:e.jsx(d,{children:e.jsx(t,{container:!0,direction:"column",children:e.jsx(t,{item:!0,xs:12,children:g?e.jsx(d,{children:"Loading banners..."}):e.jsx(y.Carousel,{showThumbs:!1,infiniteLoop:!0,autoPlay:!0,interval:3e3,transitionTime:500,children:i.map((o,s)=>e.jsxs("div",{style:{height:"400px"},children:[" ",e.jsx("img",{src:`${p}${o.filePath}`,alt:o.altText||`Banner ${s+1}`,style:{width:"100%",height:"100%",objectFit:"cover"}})]},s))})})})})})};u.propTypes={isLoading:f.bool};const S=()=>{const[i,n]=r.useState(!0);return r.useEffect(()=>{n(!1)},[]),e.jsx(t,{container:!0,spacing:h,children:e.jsx(t,{item:!0,xs:12,children:e.jsx(t,{container:!0,spacing:h,children:e.jsx(t,{item:!0,lg:12,md:12,sm:12,xs:12,children:e.jsx(u,{isLoading:i})})})})})};export{S as default};
