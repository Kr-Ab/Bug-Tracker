(this.webpackJsonpbugtracker=this.webpackJsonpbugtracker||[]).push([[5,9,10],{75:function(e,t,a){"use strict";a.r(t);var n=a(0),c=a.n(n),l=a(3),r=(a(13),a(4));t.default=function(e){e.isLoading;var t=Object(n.useContext)(l.a),a=t.removeAuth,s=t.user;try{document.getElementById("removeAuth").addEventListener("click",(function(){a()}))}catch(o){console.log(o)}return c.a.createElement(r.a,null,c.a.createElement("nav",{style:{zIndex:10},className:"navbar navbar-expand-lg bg-light navbar-absolute fixed-top navbartracker mb-2 "},c.a.createElement("div",{className:"container-fluid"},c.a.createElement("div",{className:"navbar-wrapper"},c.a.createElement("div",{className:"d-flex justify-content-center align-items-center"},c.a.createElement("h5",{className:"text-secondary m-0"},"Logged in as"," :",c.a.createElement("span",{className:"text-dark text-capitalize font-weight-normal"},s.name)))),c.a.createElement("div",{className:"navbar-form"}),c.a.createElement("button",{className:"navbar-toggler",type:"button","data-toggle":"collapse","aria-controls":"navigation-index","aria-expanded":"false","aria-label":"Toggle navigation"},c.a.createElement("span",{className:"sr-only"},"Toggle navigation"),c.a.createElement("span",{className:"navbar-toggler-icon icon-bar"}),c.a.createElement("span",{className:"navbar-toggler-icon icon-bar"}),c.a.createElement("span",{className:"navbar-toggler-icon icon-bar"})),c.a.createElement("div",{className:"collapse navbar-collapse justify-content-end"},c.a.createElement("ul",{className:"navbar-nav"},c.a.createElement("button",{type:"submit",onClick:a,className:" btn btn-danger w-100",id:"removeAuth"},"Log out"))))))}},76:function(e,t,a){"use strict";a.r(t);var n=a(1),c=a(0),l=a.n(c),r=a(3),s=a(11);a(13);t.default=function(){var e=Object(c.useContext)(r.a),t=e.user,o=e.typeUser,i=Object(c.useState)(window.sessionStorage.getItem("active")||"dashboard"),m=Object(n.a)(i,2),d=m[0],u=m[1],E=function(e){"dashboard"==e?(window.sessionStorage.setItem("active","dashboard"),u("dashboard")):"manageRole"==e?(window.sessionStorage.setItem("active","manageRole"),u("manageRole")):"manageProject"==e?(window.sessionStorage.setItem("active","manageProject"),u("manageProject")):"myProjects"==e?(window.sessionStorage.setItem("active","myProjects"),u("myProjects")):"myTickets"==e&&(window.sessionStorage.setItem("active","myTickets"),u("myTickets"))};return l.a.createElement("div",{className:"sidebar","data-color":"danger"},l.a.createElement("div",{className:"d-flex flex-row logo"},l.a.createElement("div",{className:"d-flex flex-row"},l.a.createElement("div",null,l.a.createElement("img",{src:a(77),width:"80px",alt:""})),l.a.createElement("div",{className:"overflow-hidden w-75"},l.a.createElement("h3",null,"Welcome"),l.a.createElement("h4",{className:"font-weight-normal text-capitalize overflow-hidden"},t.name)))),l.a.createElement("div",{className:"sidebar-wrapper"},l.a.createElement("ul",{className:"nav navbar-nav"},l.a.createElement("li",{className:"dashboard"==d?"active":"nav-item"},l.a.createElement(s.a,{className:"nav-link",to:"/",onClick:function(){E("dashboard")}},l.a.createElement("i",{className:"material-icons"},"dashboard"),l.a.createElement("p",null,"Dashboard"))),"admin"===o&&l.a.createElement(c.Fragment,null,l.a.createElement("li",{className:"manageRole"==d?"active":"nav-item"},l.a.createElement(s.a,{className:"nav-link",to:"/manageRole",onClick:function(){E("manageRole")}},l.a.createElement("i",{className:"material-icons"},"group_add"),l.a.createElement("p",null,"Manage Role Assignment"))),l.a.createElement("li",{className:"manageProject"==d?"nav-item active":"nav-item"},l.a.createElement(s.a,{onClick:function(){E("manageProject")},className:"nav-link",to:"/manageProject"},l.a.createElement("i",{className:"material-icons"},'"people_alt"'),l.a.createElement("p",null,"Manage Projects Users")))),l.a.createElement("li",{className:"myProjects"==d?"nav-item active":"nav-item"},l.a.createElement(s.a,{onClick:function(){E("myProjects")},className:"nav-link",to:"/myProjects"},l.a.createElement("i",{className:"material-icons"},"library_books"),l.a.createElement("p",null,"My projects"))),l.a.createElement("li",{className:"myTickets"==d?"nav-item active":"nav-item"},l.a.createElement(s.a,{onClick:function(){E("myTickets")},className:"nav-link",to:"/myTickets"},l.a.createElement("i",{className:"material-icons"},"loyalty"),l.a.createElement("p",null,"My tickets"," "))))))}},77:function(e,t,a){e.exports=a.p+"static/media/logo.c368e003.png"},89:function(e,t,a){"use strict";a.r(t);var n=a(0),c=a.n(n),l=a(3),r=a(5),s=a.n(r),o=a(18),i=a(6),m=a(1),d=a(4);function u(e){var t=e.setFilteredArray,a=Object(n.useContext)(l.a).listProjects,r=Object(n.useState)(""),s=Object(m.a)(r,2),o=s[0],i=s[1];Object(n.useEffect)((function(){t(a)}),[a]);return Object(n.useEffect)((function(){var e;t((e=o,a.filter((function(t){var a={};for(var n in a.name=t.name,a.description=t.description,a)if(JSON.stringify(a[n]).toLowerCase().includes(e.toLowerCase()))return a})))),console.log(o)}),[o]),c.a.createElement(d.a,{className:"input-group no-border w-100  d-flex flex-row-reverse"},c.a.createElement("div",{className:"input-group no-border w-50"},c.a.createElement("input",{className:"form-control",type:"text",value:o,onChange:function(e){i(e.target.value)},placeholder:"Search"}),c.a.createElement("button",{type:"submit",class:"btn btn-white btn-round btn-just-icon"},c.a.createElement("i",{class:"material-icons"},"Search"),c.a.createElement("div",{class:"ripple-container"}))))}var E=a(11),b=(a(13),a(10)),p=a.n(b),g=a(8);function f(e){for(var t=e.filteredArray,a=Object(n.useContext)(l.a),r=(a.myPersonel,a.setMyPersonel),o=a.setListProjects,u=(a.listProjects,Object(n.useState)(1)),b=Object(m.a)(u,2),f=b[0],v=b[1],h=Object(n.useState)(5),j=Object(m.a)(h,1)[0],N=f*j,y=N-j,w=t.slice(y,N),O=[],k=1;k<=Math.ceil(t.length/j);k++)O.push(k);Object(n.useEffect)((function(){s.a.get("".concat(i.a,"/api/admin/project/myProjects"),{headers:{"auth-token":window.sessionStorage.getItem("token")}}).then((function(e){console.log(e.data),o(e.data)})).catch((function(e){console.log(e)}))}),[]);return c.a.createElement(d.a,{className:"table-responsive"},c.a.createElement("table",{className:"table"},c.a.createElement("thead",{className:" "},c.a.createElement("tr",null,c.a.createElement("th",{className:"font-weight-bold"},"Project"),c.a.createElement("th",{className:"font-weight-bold"},"Description"),c.a.createElement("th",{className:"font-weight-bold"},"Details"))),c.a.createElement("tbody",null,w.map((function(e,t){return c.a.createElement("tr",{key:t},c.a.createElement("td",null,e.name),c.a.createElement("td",null," ",e.description),c.a.createElement("td",{className:""},c.a.createElement(E.a,{to:"./details/".concat(e._id)},"details")),c.a.createElement("td",{className:""},c.a.createElement("button",{type:"button",className:"btn btn-warning btn-sm ",onClick:function(){var t;t=e._id,p.a.fire({title:"Are you sure?",text:"You won' be able to revert this!",icon:"warning",showCancelButton:!0,confirmButtonColor:"#4caf50",cancelButtonColor:"#d33",confirmButtonText:"Yes, delete it!"}).then((function(e){e.value&&s.a.post("".concat(i.a,"/api/admin/project/deleteProjectById"),{projectId:t},{params:{},headers:{"auth-token":window.sessionStorage.getItem("token")}}).then((function(e){200===e.request.status?(console.log(e.data),o(e.data),s.a.post("".concat(i.a,"/api/admin/project/deleteAllAssignedProjects"),{projectId:t},{params:{},headers:{"auth-token":window.sessionStorage.getItem("token")}}).then((function(e){200===e.request.status?(console.log(e.data),r(e.data),g.d.fire()):console.log("error")}))):console.log("error")}))}))}},"Delete",c.a.createElement("i",{className:"material-icons h-100 w-100"},"delete_forever"))))}))),c.a.createElement("tfoot",null,c.a.createElement("tr",null,c.a.createElement("td",null,c.a.createElement("nav",null,c.a.createElement("ul",{className:"pagination"},O.map((function(e){return c.a.createElement("li",{key:e,className:"page-item"},c.a.createElement("a",{onClick:function(){return v(e)},className:"page-link"},e))})))))))))}function v(){var e=Object(n.useState)([]),t=Object(m.a)(e,2),a=t[0],l=t[1];return c.a.createElement(d.a,{className:"card"},c.a.createElement("div",{className:"card-header card-header-danger"},c.a.createElement("h4",{className:"card-title "},"Your Projects"," "),c.a.createElement("p",{className:"card-category"},"All your projects in your database")),c.a.createElement("div",{className:"card-body"},c.a.createElement(u,{setFilteredArray:l}),c.a.createElement(f,{filteredArray:a})))}var h=function(){var e=Object(o.a)(),t=e.register,a=e.handleSubmit,r=(e.watch,e.errors),m=Object(n.useContext)(l.a),u=(m.listProjects,m.setListProjects);m.user,m.setMyPersonel;return c.a.createElement(d.a,{className:"mt-3"},c.a.createElement("div",{className:"content"},c.a.createElement("div",{className:"container-fluid"},c.a.createElement("div",null,c.a.createElement("h4",null," ","Create New Project"," "),c.a.createElement("button",{type:"button",className:"btn btn-danger","data-toggle":"modal","data-target":"#exampleModal"},"New Project"),c.a.createElement("div",{className:"modal fade",id:"exampleModal",tabIndex:"-1",role:"dialog","aria-labelledby":"exampleModalLabel","aria-hidden":"true"},c.a.createElement("div",{className:"modal-dialog",role:"document"},c.a.createElement("div",{className:"modal-content"},c.a.createElement("div",{className:"modal-header"},c.a.createElement("h5",{className:"modal-title",id:"exampleModalLabel"},"Create New Project"),c.a.createElement("button",{type:"button",className:"close","data-dismiss":"modal","aria-label":"Close"},c.a.createElement("span",{"aria-hidden":"true"},"\xd7"))),c.a.createElement("div",{className:"modal-body"},c.a.createElement("form",{className:" border border-light p-5",onSubmit:a((function(e,t){t.target.reset(),s.a.post("".concat(i.a,"/api/admin/project/createProject"),e,{params:{},headers:{"auth-token":window.sessionStorage.getItem("token")}}).then((function(e){200===e.request.status?(g.e.fire({icon:"success",title:"Process executed with success"}),console.log(e.data),u(e.data)):console.log("error")}))}))},c.a.createElement("div",{className:" mb-4"},c.a.createElement("input",{type:"text",name:"name",className:"form-control",placeholder:"Name",ref:t({required:!0,minLength:4})}),r.name&&"required"===r.name.type&&c.a.createElement("p",{className:"errorValidation text-alert "},"Your input is required"),r.name&&"minLength"===r.name.type&&c.a.createElement("p",{className:"errorValidation text-alert "},"Min 4 letter")),c.a.createElement("div",{className:" mb-4"},c.a.createElement("input",{type:"text",name:"description",className:"form-control ",placeholder:"Description",ref:t({})})),c.a.createElement("button",{className:"btn btn-success",type:"submit"},"Create project"))),c.a.createElement("div",{className:"modal-footer"},c.a.createElement("button",{type:"button",className:"btn btn-danger","data-dismiss":"modal"},"Close")))))),c.a.createElement("hr",null),c.a.createElement(v,null))))};a(75),a(76);function j(){var e=Object(n.useContext)(l.a),t=e.listProjects,r=e.setListProjects,o=Object(n.useState)(!0),u=Object(m.a)(o,2),E=u[0],b=u[1];return Object(n.useEffect)((function(){s.a.get("".concat(i.a,"/api/developer/project/getAssignedProjects"),{headers:{"auth-token":window.sessionStorage.getItem("token")}}).then((function(e){if(200===e.request.status)try{b(!1),r(e.data),console.log(e.data)}catch(t){console.log(t)}else console.log("error pe chino")}))}),[]),c.a.createElement(d.a,{className:"mt-3"},c.a.createElement("div",{className:"content"},c.a.createElement("div",{className:"container-fluid"},c.a.createElement("div",{class:"card"},c.a.createElement("div",{class:"card-header card-header-info"},c.a.createElement("h4",{class:"card-title "},"Your Projects"," "),c.a.createElement("p",{class:"card-category"},"All your projects in your database")),c.a.createElement("div",{class:"card-body"},c.a.createElement("div",{class:"table-responsive"},c.a.createElement("table",{class:"table "},c.a.createElement("thead",{className:"font-weight-bold"},c.a.createElement("th",null,"Username"),c.a.createElement("th",null,"Description")),c.a.createElement("tbody",null,E?c.a.createElement("img",{src:a(16),width:"80px",alt:""}):t.map((function(e,t){return c.a.createElement("tr",{key:t},c.a.createElement("td",null,e.name),c.a.createElement("td",null," ",e.description))}))),c.a.createElement("tfoot",null))))))))}function N(){var e=Object(n.useContext)(l.a),t=e.listProjects,r=e.setListProjects,o=(e.user,e.setMyPersonel,Object(n.useState)(!0)),u=Object(m.a)(o,2),E=u[0],b=u[1];Object(n.useEffect)((function(){s.a.get("".concat(i.a,"/api/manager/project/getAssignedProjects"),{headers:{"auth-token":window.sessionStorage.getItem("token")}}).then((function(e){if(200===e.request.status)try{r(e.data),b(!1),console.log(e.data)}catch(t){console.log(t)}else console.log("error")}))}),[]);var p=Object(n.useState)([]),g=Object(m.a)(p,2),f=g[0],v=g[1],h=Object(n.useState)(""),j=Object(m.a)(h,2),N=j[0],y=j[1];Object(n.useEffect)((function(){v(t)}),[t]);Object(n.useEffect)((function(){var e;v((e=N,t.filter((function(t){var a={};for(var n in a.name=t.name,a.description=t.description,a)if(JSON.stringify(a[n]).toLowerCase().includes(e.toLowerCase()))return a})))),console.log(N)}),[N]);for(var w=Object(n.useState)(1),O=Object(m.a)(w,2),k=O[0],x=O[1],P=Object(n.useState)(5),S=Object(m.a)(P,1)[0],C=k*S,L=C-S,I=f.slice(L,C),A=[],M=1;M<=Math.ceil(f.length/S);M++)A.push(M);return c.a.createElement(d.a,{className:"mt-3"},c.a.createElement("div",{className:"content"},c.a.createElement("div",{className:"container-fluid"},c.a.createElement("div",{class:"card"},c.a.createElement("div",{class:"card-header card-header-success"},c.a.createElement("h4",{class:"card-title "},"Your Projects"," "),c.a.createElement("p",{class:"card-category"},"All your projects in your database")),c.a.createElement("div",{class:"card-body"},c.a.createElement("div",{class:"table-responsive"},c.a.createElement("div",{className:"input-group no-border w-100  d-flex flex-row-reverse"},c.a.createElement("div",{className:"input-group no-border w-50  "},c.a.createElement("input",{className:"form-control",type:"text",value:N,onChange:function(e){y(e.target.value)},placeholder:"Search"}),c.a.createElement("button",{type:"submit",class:"btn btn-white btn-round btn-just-icon"},c.a.createElement("i",{class:"material-icons"},"search"),c.a.createElement("div",{class:"ripple-container"})))),c.a.createElement("table",{class:"table "},c.a.createElement("thead",{className:"font-weight-bold"},c.a.createElement("th",null,"Username"),c.a.createElement("th",null,"Description")),c.a.createElement("tbody",null,E?c.a.createElement("img",{src:a(16),width:"80px",alt:""}):I.map((function(e,t){return c.a.createElement("tr",{key:t},c.a.createElement("td",null,e.name),c.a.createElement("td",null," ",e.description))}))),c.a.createElement("tfoot",null,c.a.createElement("td",null,c.a.createElement("nav",null,c.a.createElement("ul",{className:"pagination"},A.map((function(e){return c.a.createElement("li",{key:e,className:"page-item"},c.a.createElement("a",{onClick:function(){return x(e)},className:"page-link"},e))})))))))))))))}function y(){var e=Object(n.useContext)(l.a),t=e.listProjects,r=e.setListProjects,o=Object(n.useState)(!0),u=Object(m.a)(o,2),E=u[0],b=u[1];Object(n.useEffect)((function(){s.a.get("".concat(i.a,"/api/submitter/project/getAssignedProjects"),{headers:{"auth-token":window.sessionStorage.getItem("token")}}).then((function(e){if(200===e.request.status)try{b(!1),r(e.data),console.log(e.data)}catch(t){console.log(t)}else console.log("error")}))}),[]);var p=Object(n.useState)([]),g=Object(m.a)(p,2),f=g[0],v=g[1],h=Object(n.useState)(""),j=Object(m.a)(h,2),N=j[0],y=j[1];Object(n.useEffect)((function(){v(t)}),[t]);Object(n.useEffect)((function(){var e;v((e=N,t.filter((function(t){var a={};for(var n in a.name=t.name,a.description=t.description,a)if(JSON.stringify(a[n]).toLowerCase().includes(e.toLowerCase()))return a})))),console.log(N)}),[N]);for(var w=Object(n.useState)(1),O=Object(m.a)(w,2),k=O[0],x=O[1],P=Object(n.useState)(5),S=Object(m.a)(P,1)[0],C=k*S,L=C-S,I=f.slice(L,C),A=[],M=1;M<=Math.ceil(f.length/S);M++)A.push(M);return c.a.createElement(d.a,{className:"mt-3"},c.a.createElement("div",{className:"content"},c.a.createElement("div",{className:"container-fluid"},c.a.createElement("div",null," ","List of projects"),c.a.createElement("div",{class:"card"},c.a.createElement("div",{class:"card-header card-header-warning"},c.a.createElement("h4",{class:"card-title "},"Your Projects"),c.a.createElement("p",{class:"card-category"},"All your projects in your database")),c.a.createElement("div",{class:"card-body"},c.a.createElement("div",{class:"table-responsive"},c.a.createElement("div",{className:"input-group no-border w-100  d-flex flex-row-reverse"},c.a.createElement("div",{className:"input-group no-border w-50  "},c.a.createElement("input",{className:"form-control",type:"text",value:N,onChange:function(e){y(e.target.value)},placeholder:"Search"}),c.a.createElement("button",{type:"submit",class:"btn btn-white btn-round btn-just-icon"},c.a.createElement("i",{class:"material-icons"},"search"),c.a.createElement("div",{class:"ripple-container"})))),c.a.createElement("table",{class:"table "},c.a.createElement("thead",{className:"font-weight-bold"},c.a.createElement("th",null,"Username"),c.a.createElement("th",null,"Description")),c.a.createElement("tbody",null,E?c.a.createElement("img",{src:a(16),width:"80px",alt:""}):I.map((function(e,t){return c.a.createElement("tr",{key:t},c.a.createElement("td",null,e.name),c.a.createElement("td",null," ",e.description))}))),c.a.createElement("tfoot",null,c.a.createElement("tr",null,c.a.createElement("td",null,c.a.createElement("nav",null,c.a.createElement("ul",{className:"pagination"},A.map((function(e){return c.a.createElement("li",{key:e,className:"page-item"},c.a.createElement("a",{onClick:function(){return x(e)},className:"page-link"},e))}))))))))))))))}function w(){var e=Object(n.useContext)(l.a).typeUser;return c.a.createElement("div",null,"admin"===e&&c.a.createElement(h,null),"manager"===e&&c.a.createElement(N,null),"developer"===e&&c.a.createElement(j,null),"submitter"===e&&c.a.createElement(y,null))}a.d(t,"default",(function(){return w}))}}]);
//# sourceMappingURL=5.05f40fa8.chunk.js.map