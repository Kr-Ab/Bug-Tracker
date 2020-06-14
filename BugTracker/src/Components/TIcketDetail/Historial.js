import React, { useState, useEffect, useContext } from "react";
import { Fade } from '../../animations/fade'

export function Historial({ historiesDetail, setHistoriesDetail }) {

  ////////////////////////Card-General////////////////////////
  const [filteredArray, setFilteredArray] = useState([]);
  ////////////////////////Card-General////////////////////////

  ////////////////////////Search////////////////////////
  const [searchedWord, setSearchedWord] = useState("");
  useEffect(() => {
    setFilteredArray(historiesDetail);
  }, [historiesDetail]);

  const itemsFiltered = (searchedItem, arrayOfObject) => {
    let arrayFiltered = arrayOfObject.filter(function(obj) {
      let objectClean = {};

      objectClean["property"] = obj["property"];
      if (obj["oldValue"]) {
        objectClean["oldValue"] = obj["oldValue"];
      } else {
        objectClean["oldValue"] = "";
      }
      objectClean["newValue"] = obj["newValue"];
      objectClean["dateChange"] = obj["dateChange"];

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
    setFilteredArray(itemsFiltered(searchedWord, historiesDetail));
    console.log(searchedWord);
  }, [searchedWord]);
  ////////////////////////Search////////////////////////

  // LOGIG PAGINATION ///////////////////////////////////
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(3);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentHistoriesForThisTicket = filteredArray.slice(
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
      <div className="card-header card-header-success">
        <h4 className="card-title "> {("Tickets History")} </h4>
        <p className="card-category">
          {("All history information for this ticket")}
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
                className="btn btn-white btn-round btn-just-icon"
              >
                <i className="material-icons">search</i>
                <div className="ripple-container"></div>
              </button>
            </div>
          </div>
          {/* ///////////////////Search/////////////////////////// */}
          <table className="table ">
            <thead className=" ">
              <tr>
                <th className="font-weight-bold">{("Property")}</th>
                <th className="font-weight-bold">{("Old Value")}</th>
                <th className="font-weight-bold">{("New Value")}</th>
                <th className="font-weight-bold">{("Data Changed")}</th>
              </tr>
            </thead>
            <tbody>
              {currentHistoriesForThisTicket.map((history, index) => {
                return (
                  <tr key={index}>
                    <td>{history.property}</td>
                    <td> {history.oldValue}</td>
                    <td> {history.newValue}</td>
                    <td> {history.dateChange}</td>
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
