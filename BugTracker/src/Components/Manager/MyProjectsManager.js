import React, { useState, useEffect, useContext } from "react";
import { Context } from "../../Context";
import axios from "axios";
import { Link } from "@reach/router";
import { Fade } from '../../animations/fade'

import { backend_route } from "./../../GlobalVariables";

export default function MyProjectsManager() {

  const { listProjects, setListProjects, user, setMyPersonel } = useContext(
    Context
  );

  const [loading, setloading] = useState(true);

  //Call for Assigned Projects
  useEffect(() => {
    axios
      .get(`${backend_route}/api/manager/project/getAssignedProjects`, {
        headers: { "auth-token": window.sessionStorage.getItem("token") }
      })
      .then(res => {
        if (res.request.status === 200) {
          try {
            setListProjects(res.data);
            setloading(false);
            console.log(res.data);
          } catch (error) {
            console.log(error);
          }
        } else {
          console.log("error pe chino");
        }
      });
  }, []);

  ////////////////////////Card-General////////////////////////
  const [filteredArray, setFilteredArray] = useState([]);
  ////////////////////////Card-General////////////////////////

  ////////////////////////Search////////////////////////

  const [searchedWord, setSearchedWord] = useState("");
  useEffect(() => {
    setFilteredArray(listProjects);
  }, [listProjects]);

  const itemsFiltered = (searchedItem, arrayOfObject) => {
    let arrayFiltered = arrayOfObject.filter(function(obj) {
      let objectClean = {};
      objectClean["name"] = obj["name"];
      objectClean["description"] = obj["description"];
      for (let key in objectClean) {
        if (
          JSON.stringify(objectClean[key])
            .toLowerCase()
            .includes(searchedItem.toLowerCase())
        ) {
          return objectClean;
        }
      }
    });
    return arrayFiltered;
  };

  const handleSearchedWord = e => {
    setSearchedWord(e.target.value);
  };

  useEffect(() => {
    // filtro por cada input del usuario
    setFilteredArray(itemsFiltered(searchedWord, listProjects));
    console.log(searchedWord);
  }, [searchedWord]);
  ////////////////////////Search////////////////////////

  // LOGIG PAGINATION ///////////////////////////////////
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentListOfProjects = filteredArray.slice(
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
  //////////////////////////////////////////////////////

  return (
    <Fade className="mt-3">
      <div className="content">
        <div className="container-fluid">
          <div class="card">
            <div class="card-header card-header-info">
              <h4 class="card-title ">{("Your Projects")} </h4>
              <p class="card-category">
                {("All your projects in your database")}
              </p>
            </div>
            <div class="card-body">
              <div class="table-responsive">
                {/* ///////////////////Search/////////////////////////// */}
                <div className="input-group no-border w-100  d-flex flex-row-reverse">
                  <div className="input-group no-border w-50  ">
                    <input
                      className="form-control"
                      type="text"
                      value={searchedWord}
                      onChange={handleSearchedWord}
                      placeholder="Search"
                    />
                    <button
                      type="submit"
                      class="btn btn-white btn-round btn-just-icon"
                    >
                      <i class="material-icons">search</i>
                      <div class="ripple-container"></div>
                    </button>
                  </div>
                </div>
                {/* ///////////////////Search/////////////////////////// */}
                <table class="table ">
                  <thead className="font-weight-bold">
                    <th>{("Username")}</th>
                    <th>{("Description")}</th>
                    {/* <th>Details</th> */}
                  </thead>
                  <tbody>
                    {loading ? (
                      <img
                        src={require("./../../images/loading.gif")}
                        width={"80px"}
                        alt=""
                      />
                    ) : (
                      currentListOfProjects.map((project, index) => {
                        return (
                          <tr key={index}>
                            <td>{project.name}</td>
                            <td> {project.description}</td>
                            {/* <td class="text-primary">
                              <Link to={`./details/${project._id}`}>
                                details
                              </Link>
                            </td> */}
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                  <tfoot>
                    <td>
                      <nav>
                        <ul className="pagination">
                          {pageNumbers.map(number => (
                            <li key={number} className="page-item">
                              <a
                                onClick={() => paginate(number)}
                                className="page-link"
                              >
                                {number}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </nav>
                    </td>
                  </tfoot>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fade>
  );
}
