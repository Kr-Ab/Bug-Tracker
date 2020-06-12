// import React, { useState, useEffect, useContext } from "react";
// import { Context } from "./../Context";
// import axios from "axios";

// export function GetPersonal() {
//   const { setListProyects } = useContext(Context);
//   useEffect(() => {
//     axios
//       .get("http://localhost:3000/api/project/myProjects", {
//         headers: { "auth-token": window.sessionStorage.getItem("token") }
//       })
//       .then(res => {
//         if (res.request.status === 200) {
//           console.log("proyecto creado correctamente");
//           // me trae la lista de de proyectos
//           console.log(res.data);
//           setListProyects(res.data);
//         } else {
//           console.log("error pe chino");
//         }
//       });
//   }, []);
// }
