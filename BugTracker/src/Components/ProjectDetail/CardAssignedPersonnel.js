import React, { useState, useContext, useEffect } from "react";
import { backend_route } from "../../GlobalVariables";
import axios from "axios";
import { Fade } from '../../animations/fade'

export default function CardAssignedPersonnel({ props }) {
  //////////////////////////Get Assigned Personel for this project/////////////////

  const [personelForThisProject, setPersonelForThisProject] = useState([]);

  useEffect(() => {
    axios
      .post(
        `${backend_route}/api/admin/project/getAssignedPersonelToThisProject`,
        { projectId: props.projectId },
        {
          params: {},
          headers: { "auth-token": window.sessionStorage.getItem("token") }
        }
      )
      .then(function(res) {
        //array de personel for this PROJECT
        setPersonelForThisProject(res.data);
        console.log(res.data);
      })
      .catch(function(error) {
        console.log(error);
      });
  }, []);

  //////////////////////////Get Assigned Personel for this project/////////////////

  ////////////////////////Card-General////////////////////////
  const [filteredArray, setFilteredArray] = useState([]);
  ////////////////////////Card-General////////////////////////

  ////////////////////////Search////////////////////////

  const [searchedWord, setSearchedWord] = useState("");
  useEffect(() => {
    setFilteredArray(personelForThisProject);
  }, [personelForThisProject]);

  const itemsFiltered = (searchedItem, arrayOfObject) => {
    let arrayFiltered = arrayOfObject.filter(function(obj) {
      let objectClean = {};
      objectClean["name"] = obj["name"];
      objectClean["email"] = obj["email"];
      if (obj["role"]) {
        objectClean["role"] = obj["role"];
      } else {
        objectClean["role"] = "";
      }
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
    setFilteredArray(itemsFiltered(searchedWord, personelForThisProject));
    console.log(searchedWord);
  }, [searchedWord]);
  ////////////////////////Search////////////////////////

  // LOGIG PAGINATION ///////////////////////////////////
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentAssignedPersonnel = filteredArray.slice(
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
    <Fade className="card">
      <div className="card-header card-header-info">
        <h4 className="card-title ">{("Assigned Personel")} </h4>
        <p className="card-category">
          {("All your personnel for this project")}{" "}
        </p>
      </div>
      <div className="card-body">
        <div className="table-responsive">
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
          <table className="table ">
            <thead className="">
              <tr>
                <th className="font-weight-bold">{("Username")}</th>
                <th className="font-weight-bold">{("Email")}</th>
                <th className="font-weight-bold">{("Role")} </th>
              </tr>
            </thead>
            <tbody>
              {currentAssignedPersonnel.map((personel, index) => {
                return (
                  <tr key={index}>
                    <td>{personel.name}</td>
                    <td> {personel.email}</td>
                    <td> {personel.role}</td>
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
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </Fade>
  );
}
