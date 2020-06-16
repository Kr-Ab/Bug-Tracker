import React, { useState, useEffect } from "react";
import { Fade } from '../../animations/fade'

export default function CardTicketsForThisProject({
  listTicketsForThisProject
}) {

  ////////////////////////Card-General////////////////////////
  const [filteredArray, setFilteredArray] = useState([]);
  ////////////////////////Card-General////////////////////////

  ////////////////////////Search////////////////////////

  const [searchedWord, setSearchedWord] = useState("");
  useEffect(() => {
    setFilteredArray(listTicketsForThisProject);
  }, [listTicketsForThisProject]);

  const itemsFiltered = (searchedItem, arrayOfObject) => {
    let arrayFiltered = arrayOfObject.filter(function(obj) {
      let objectClean = {};
      objectClean["name"] = obj["name"];
      if (obj["assignedDeveloper"]) {
        objectClean["assignedDeveloper"] = obj["assignedDeveloper"]["devName"];
      } else {
        objectClean["assignedDeveloper"] = "";
      }
      if (obj["submiter"]) {
        objectClean["submiter"] = obj["submiter"]["name"];
      } else {
        objectClean["submiter"] = "";
      }
      objectClean["status"] = obj["status"];
      objectClean["createdAt"] = obj["createdAt"];

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
    setFilteredArray(itemsFiltered(searchedWord, listTicketsForThisProject));
    console.log(searchedWord);
  }, [searchedWord]);
  ////////////////////////Search////////////////////////

  // LOGIG PAGINATION ///////////////////////////////////
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentTicketsForThisProject = filteredArray.slice(
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

  return (
    <Fade className="card">
      <div className="card-header card-header-success">
        <h4 className="card-title "> {("Tickets for This project")} </h4>
        <p className="card-category">
          {("All your tickets for this project")}
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
                <th className="font-weight-bold">{("Title")}</th>
                <th className="font-weight-bold">{("Developer")}</th>
                <th className="font-weight-bold">{("Submitter")}</th>
                <th className="font-weight-bold">{("Status")}</th>
                <th className="font-weight-bold">{("Created at")}</th>
              </tr>
            </thead>
            <tbody>
              {currentTicketsForThisProject.map((ticket, index) => {
                return (
                  <tr key={index}>
                    <td>{ticket.name}</td>
                    <td> {ticket.submitter.name}</td>
                    <td>
                      {ticket.assignedDeveloper &&
                        ticket.assignedDeveloper.devName}
                    </td>
                    <td> {ticket.status}</td>

                    <td> {ticket.createdAt}</td>
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
