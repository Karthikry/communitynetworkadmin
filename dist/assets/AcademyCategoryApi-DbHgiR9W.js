import{c,e as d}from"./index-BoyrWkQt.js";const r=async e=>await c({method:"GET",url:`${d}/academiccategory/v1/getAllAcademicCategory`,headers:e}),s=async(e,a)=>await c({method:"GET",url:`${d}/academiccourse/v1/getAcademicCoursesByCategoryId/{categoryId}?categoryId=${a}`,headers:e}),t=async(e,a)=>await c({method:"GET",url:`${d}/academiccourse/v1/getAcademicCourseByCourseId/{courseId}?courseId=${a}`,headers:e}),u=async(e,a)=>await c({method:"GET",url:`${d}/academicmodule/v1/getAcademicModulesByCourseId/{courseId}?courseId=${a}`,headers:e}),m=async(e,a)=>await c({method:"GET",url:`${d}/academictopic/v1/getAcademicTopicsByModuleId/{moduleId}?moduleId=${a}`,headers:e});export{t as a,u as b,m as c,r as d,s as f};
