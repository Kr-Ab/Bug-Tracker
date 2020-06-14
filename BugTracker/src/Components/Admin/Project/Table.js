import React, { useState, useContext, useEffect } from "react";
import { Context } from "../../../Context";
import { Link } from "@reach/router";

import { backend_route } from "../../../GlobalVariables";
import axios from "axios";
import "./../../styles.css";
import Swal from "sweetalert2";
import { SuccesCenterTimer } from "../../../animations/Alerts";
import { Fade } from '../../../animations/fade'

export function Table({ filteredArray }) {

  ////////////////////////////////////////////////////////////////////////////////////////////
  const {
    myPersonel,
    setMyPersonel,
    setListProjects,
    listProjects
  } = useContext(Context);
  ////////////////////////////////////////////////////////////////////////////////////////////

  // LOGIG PAGINATION ///////////////////////////////////
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentProjects = filteredArray.slice(
    indexOfFirstPost,
    indexOfLastPost
  );

  // Change page
  const paginate = pageNumber => setCurrentPage(pageNumber);

  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(filteredArray.length / postsPerPage); i++) {
    pageNumbers.push(i);
  }
  //////////////////////////////////////////////////////

  useEffect(() => {
    axios
      .get(`${backend_route}/api/admin/project/myProjects`, {
        headers: { "auth-token": window.sessionStorage.getItem("token") }
      })
      .then(function(res) {
        console.log(res.data);
        setListProjects(res.data);
      })
      .catch(function(error) {
        console.log(error);
      });
  }, []);
  //////////////////////////////////////////////////////

  /////////////////////////////////////////////////////////////////////
  const onDeleteProjectById = projectId => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won' be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#4caf50",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then(result => {
      if (result.value) {
        axios
          .post(
            `${backend_route}/api/admin/project/deleteProjectById`,
            { projectId: projectId },
            {
              params: {},
              headers: { "auth-token": window.sessionStorage.getItem("token") }
            }
          )
          .then(res => {
            if (res.request.status === 200) {
              console.log(res.data);
              setListProjects(res.data);

              axios
                .post(
                  `${backend_route}/api/admin/project/deleteAllAssignedProjects`,
                  { projectId: projectId },
                  {
                    params: {},
                    headers: {
                      "auth-token": window.sessionStorage.getItem("token")
                    }
                  }
                )
                .then(res => {
                  if (res.request.status === 200) {
                    console.log(res.data);
                    setMyPersonel(res.data);
                    SuccesCenterTimer.fire();
                  } else {
                    console.log("error");
                  }
                });
            } else {
              console.log("error");
            }
          });
      }
    });
  };

  return (
    <Fade className="table-responsive">
      <table className="table">
        <thead className=" ">
          <tr>
            <th className="font-weight-bold">{("Project")}</th>
            <th className="font-weight-bold">{("Description")}</th>
            <th className="font-weight-bold">{("Details")}</th>
          </tr>
        </thead>
        <tbody>
          {currentProjects.map((project, index) => {
            return (
              <tr key={index}>
                <td>{project.name}</td>
                <td> {project.description}</td>
                <td className="">
                  <Link to={`./details/${project._id}`}>{("details")}</Link>
                </td>
                <td className="">
                  <button
                    type="button"
                    className="btn btn-warning btn-sm "
                    onClick={() => {
                      onDeleteProjectById(project._id);
                    }}
                  >
                    {("Delete")}

                    <i className="material-icons h-100 w-100">delete_forever</i>
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
        <tfoot>
          <tr>
            <td>
              <nav>
                <ul className="pagination">
                  {pageNumbers.map(number => (
                    <li key={number} className="page-item">
                      <a onClick={() => paginate(number)} className="page-link">
                        {number}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </td>
          </tr>
        </tfoot>
      </table>
    </Fade>
  );
}
