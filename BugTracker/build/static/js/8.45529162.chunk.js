(this.webpackJsonpbugtracker=this.webpackJsonpbugtracker||[]).push([[8],{78:function(e,t,a){"use strict";a.d(t,"a",(function(){return c}));var n=a(7);function l(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function c(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?l(Object(a),!0).forEach((function(t){Object(n.a)(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):l(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}},87:function(e,t,a){"use strict";a.r(t);var n=a(7),l=a(1),c=a(78),r=a(0),o=a.n(r),i=(a(3),a(11)),s=a(5),u=a.n(s),m=a(6),d=a(8);t.default=function(e){Object(r.useEffect)((function(){u.a.post("".concat(m.a,"/api/global/ticket/getTicketById"),{ticketId:e.ticketId},{params:{},headers:{"auth-token":window.sessionStorage.getItem("token")}}).then((function(t){p(Object(c.a)({},t.data,{ticketId:e.ticketId})),console.log(s)})).catch((function(e){console.log(e)}))}),[]);var t=Object(r.useState)({}),a=Object(l.a)(t,2),s=a[0],p=a[1],E=function(e){var t=e.target,a=t.name,l=t.value;p(Object(c.a)({},s,Object(n.a)({},a,l))),console.log(s)};return o.a.createElement("div",{className:"mt-3"},o.a.createElement("div",{className:"content"},o.a.createElement("div",{className:"container-fluid"},o.a.createElement("div",{className:"row"},o.a.createElement("div",{class:"col-md-8"},o.a.createElement("div",{class:"card"},o.a.createElement("div",{class:"card-header card-header-success"},o.a.createElement("h4",{class:"card-title "},"Edit Ticket"," "),o.a.createElement("button",{onClick:function(){Object(i.d)("/myTickets")},class:"btn btn-link  btn-sm   text-white"},o.a.createElement("i",{class:"material-icons"},"arrow_back"),"Back to list")),o.a.createElement("div",{class:"card-body"},o.a.createElement("div",{class:"table-responsive"},o.a.createElement("table",{class:"table table-sm"},o.a.createElement("tbody",{id:"tbody"},o.a.createElement("tr",null,o.a.createElement("td",null,o.a.createElement("h4",null,"Ticket Title"),o.a.createElement("input",{type:"text",value:s.name,name:"name",onChange:E,className:"form-control mb-4",placeholder:"Name"})),o.a.createElement("td",null,o.a.createElement("h4",null,"Ticket Description"),o.a.createElement("input",{type:"text",name:"description",value:s.description,onChange:E,className:"form-control mb-4",placeholder:"Description"}))),o.a.createElement("br",null),o.a.createElement("tr",null,o.a.createElement("td",null,o.a.createElement("h4",null,"Project"),o.a.createElement("p",null,s.byProjectName)),o.a.createElement("td",null,o.a.createElement("h4",null," ","Assigned Developer"),o.a.createElement("p",null,s.assignedDeveloper&&s.assignedDeveloper.devName))),o.a.createElement("br",null),o.a.createElement("tr",null,o.a.createElement("td",null,o.a.createElement("h4",null,"Ticket Priority"),o.a.createElement("select",{value:s.priority,name:"priority",onChange:E,className:"w-100 custom-select"},o.a.createElement("option",{value:"low"},"low"),o.a.createElement("option",{value:"medium"},"medium"),o.a.createElement("option",{value:"high"},"high"),o.a.createElement("option",{value:"urgent"},"urgent"))),o.a.createElement("td",null,o.a.createElement("h4",null,"Ticket Status"),o.a.createElement("select",{value:s.status,name:"status",onChange:E,className:"w-100 custom-select"},o.a.createElement("option",{value:"informed"},"Informed"),o.a.createElement("option",{value:"inprogress"},"In Progress"),o.a.createElement("option",{value:"closed"},"Closed")))),o.a.createElement("br",null),o.a.createElement("tr",null,o.a.createElement("td",null,o.a.createElement("h4",null,"Ticket Type"),o.a.createElement("select",{value:s.type,name:"type",onChange:E,className:"w-100 custom-select"},o.a.createElement("option",{value:"bug"},"Bug","/","Error"),o.a.createElement("option",{value:"feature"},"Feature","/","Request"),o.a.createElement("option",{value:"inquiry"},"Inquiry","/","Question"))))),o.a.createElement("tfoot",null,o.a.createElement("button",{type:"button",onClick:function(){console.log("update"),u.a.post("".concat(m.a,"/api/global/ticket/updateTicketById"),Object(c.a)({},s),{headers:{"auth-token":window.sessionStorage.getItem("token")}}).then((function(e){p(e.data),d.d.fire(),Object(i.d)("/myTickets")})).catch((function(e){d.b.fire(),console.log(e),Object(i.d)("/myTickets")}))},class:"btn btn-info"},"Update Ticket")))))))))))}}}]);
//# sourceMappingURL=8.45529162.chunk.js.map