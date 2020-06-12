import React, { useState, useContext, useEffect } from "react";
import { Context } from "../../../Context";

import Swal from "sweetalert2";
import { SuccesCenterTimer } from "../../../animations/Alerts";

import { backend_route } from "../../../GlobalVariables";
import axios from "axios";
import "./../../styles.css";
import { Fade } from '../../../animations/fade'

export function Table({ filteredArray }) {
  //// LOGIG PAGINATION////////////////////////////////////

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(5);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPersonnel = filteredArray.slice(
    indexOfFirstPost,
    indexOfLastPost
  );

  // Change page
  const paginate = pageNumber => setCurrentPage(pageNumber);
  // const totalPersonel = myPersonel.length;

  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(filteredArray.length / postsPerPage); i++) {
    pageNumbers.push(i);
  }
  ////////////////////////////////////////////////////////////////////////////////////////////
  const { setMyPersonel } = useContext(Context);
  ////////////////////////////////////////////////////////////////////////////////////////////

  useEffect(() => {
    axios
      .get(`${backend_route}/api/admin/personnel/myPersonel`, {
        params: {},
        headers: { "auth-token": window.sessionStorage.getItem("token") }
      })
      .then(function(res) {
        setMyPersonel(res.data);
      })
      .catch(function(error) {
        console.log(error);
      });
  }, []);

  const onDeletePersonal = personId => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won' be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then(result => {
      if (result.value) {
        axios
          .post(
            `${backend_route}/api/admin/personnel/deletePersonalById`,
            {
              personnelId: personId
            },
            {
              params: {},
              headers: { "auth-token": window.sessionStorage.getItem("token") }
            }
          )
          .then(res => {
            console.log("perssonel eliminado correctamente");
            console.log(res.data);

            axios
              .get(`${backend_route}/api/admin/personnel/myPersonel`, {
                headers: {
                  "auth-token": window.sessionStorage.getItem("token")
                }
              })
              .then(res => {
                if (res.request.status === 200) {
                  console.log("lista de mis personal");
                  console.log(res.data);
                  setMyPersonel(res.data);
                  SuccesCenterTimer.fire();
                } else {
                  console.log("error pe chino");
                }
              })
              .catch(err => {
                console.log(err);
              });
          })
          .catch(err => {});
      }
    });
  };

  return (
    <Fade className="table-responsive">
      <table className="table ">
        <thead>
          <tr>
            <th className="font-weight-bold">{("Username")}</th>
            <th className="font-weight-bold">{("Email")}</th>
            <th className="font-weight-bold">{("Role")}</th>
          </tr>
        </thead>
        <tbody>
          {currentPersonnel.map((person, index) => {
            return (
              <tr key={index}>
                <td>{person.name}</td>
                <td> {person.email}</td>
                <td className="">{person.role}</td>
                {/* <td>Edit</td> */}
                <td>
                  <button
                    type="button"
                    className="btn btn-danger btn-sm"
                    onClick={() => {
                      onDeletePersonal(person._id);
                    }}
                  >
                    {("Delete")}

                    <i className="material-icons ml-2  ">delete_forever</i>
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
        <hr />
        <tfoot>
          <tr>
            <td>
              <nav>
                <ul className="pagination  ">
                  {pageNumbers.map(number => (
                    <li key={number} className="page-item bg-light">
                      <a onClick={() => paginate(number)} className="page-link">
                        {number}
                      </a>
                    </li>
                  ))}
                  <span className="ml-1 mt-2 font-weight-light">
                    ... {("pages")}
                  </span>
                </ul>
              </nav>
            </td>
          </tr>
        </tfoot>
      </table>
    </Fade>
  );
}
