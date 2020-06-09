"use strict";
// //val1 es el valor antiguo
// //val2 es el nnuevo valor
// function saveChangesOnTicket(
//     val1: any,
//     val2: any,
//     property: any,
//     userId: any,
//     projectId: any,
//     ticketId: any
//   ) {
//     if (val1 !== val2) {
//       Admin.findById(userId, async (err, admin: any) => {
//         for (let i = 0; i < admin.projects.length; i++) {
//           if (admin.projects[i]._id == projectId) {
//             for (let j = 0; j < admin.projects[i].tickets.length; j++) {
//               if (admin.projects[i].tickets[j]._id == ticketId) {
//                 admin.projects[i].tickets[j].historial.push({
//                   old: val1,
//                   new: val2,
//                   property: "assignedDev",
//                   createAt: "value"
//                 });
//                 try {
//                   const savedUser = await admin.save();
//                   return;
//                 } catch (err) {
//                   console.log(err);
//                 }
//               }
//             }
//           }
//         }
//       });
//       //save changes
//       //hacer un post que guardara la data en un array de objetos
//       // [{old:val1,new:val2,property:assignedDev,createAt:value}]
//     }
//   }
