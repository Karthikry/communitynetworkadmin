import{h as g,i as p,s as u,_ as a,r as d,l as f,m,j as x,n as D,o as y}from"./index-BCMjTDj-.js";function A(s){return g("MuiDialogActions",s)}p("MuiDialogActions",["root","spacing"]);const S=["className","disableSpacing"],b=s=>{const{classes:t,disableSpacing:o}=s;return y({root:["root",!o&&"spacing"]},A,t)},C=u("div",{name:"MuiDialogActions",slot:"Root",overridesResolver:(s,t)=>{const{ownerState:o}=s;return[t.root,!o.disableSpacing&&t.spacing]}})(({ownerState:s})=>a({display:"flex",alignItems:"center",padding:8,justifyContent:"flex-end",flex:"0 0 auto"},!s.disableSpacing&&{"& > :not(style) ~ :not(style)":{marginLeft:8}})),R=d.forwardRef(function(t,o){const e=f({props:t,name:"MuiDialogActions"}),{className:n,disableSpacing:l=!1}=e,c=m(e,S),i=a({},e,{disableSpacing:l}),r=b(i);return x.jsx(C,a({className:D(r.root,n),ownerState:i,ref:o},c))});export{R as D};
