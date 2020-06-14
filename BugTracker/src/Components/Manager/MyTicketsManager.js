import React, { useState, useEffect, useContext } from "react";
import { Context } from "../../Context";
import axios from "axios";
import { Link } from "@reach/router";

import { backend_route } from "../../GlobalVariables";
import AssignTicketModal from "./AssignTicketModal";
import { Toast } from "../../animations/Alerts";
import Swal from "sweetalert2";
import { SuccesCenterTimer } from "../../animations/Alerts";
import { Fade } from '../../animations/fade'

export default function MyTicketsManager() {
  const { listProjects, listTickets, setListTickets, user } = useContext(
    Context
  );

  const onDeleteTicketById = ticketId => {
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
            `${backend_route}/api/global/ticket/deleteTicketById`,
            { ticketId: ticketId },
            {
              headers: { "auth-token": window.sessionStorage.getItem("token") }
            }
          )
          .then(res => {
            console.log("ticket eliminado correctamente");
            setListTickets(res.data);
            SuccesCenterTimer.fire();
          })
          .catch(err => {
            console.log(err);
          });
      }
    });
  };

  ////////////////////////Card-General////////////////////////
  const [filteredArray, setFilteredArray] = useState([]);
  ////////////////////////Card-General////////////////////////

  ////////////////////////Search////////////////////////

  const [searchedWord, setSearchedWord] = useState("");
  useEffect(() => {
    setFilteredArray(listTickets);
  }, [listTickets]);

  const itemsFiltered = (searchedItem, arrayOfObject) => {
    let arrayFiltered = arrayOfObject.filter(function(obj) {
      let objectClean = {};
      objectClean["name"] = obj["name"];
      objectClean["byProjectName"] = obj["byProjectName"];
      if (obj["assignedDeveloper"]) {
        objectClean["assignedDeveloper"] = obj["assignedDeveloper"]["devName"];
      } else {
        objectClean["assignedDeveloper"] = "";
      }
      objectClean["priority"] = obj["priority"];
      objectClean["status"] = obj["status"];
      objectClean["type"] = obj["type"];
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
    // filtro por cada input del usuario
    setFilteredArray(itemsFiltered(searchedWord, listTickets));
    console.log(searchedWord);
  }, [searchedWord]);
  ////////////////////////Search////////////////////////

  // LOGIG PAGINATION ///////////////////////////////////
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentListOfTickets = filteredArray.slice(
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
          {/* LAYOUT */}
          {/* YOUR CONTENT  */}
          <h4>{("Assign Ticket to Developer")} </h4>
          <AssignTicketModal></AssignTicketModal>
          <hr />
          <div class="card">
            <div class="card-header card-header-success">
              <h4 class="card-title ">{("Your Tickets")}</h4>
              <p class="card-category">
                {("All your Tickets in your database")}
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
                    <th className="font-weight-bold">{("title")}</th>
                    <th className="font-weight-bold">{("projectName")}</th>
                    <th className="font-weight-bold">
                      {("assignedDeveloper")}
                    </th>
                    <th className="font-weight-bold">{("priority")}</th>
                    <th className="font-weight-bold">{("status")}</th>
                    <th className="font-weight-bold">{("type")}</th>
                    <th className="font-weight-bold">{("createdAt")}</th>
                    <th className="font-weight-bold">{("details")}</th>
                  </thead>
                  <tbody>
                    {currentListOfTickets.map((ticket, index) => {
                      return (
                        <tr key={index}>
                          <td>{ticket.name}</td>
                          <td>{ticket.byProjectName}</td>

                          <td>
                            {ticket.assignedDeveloper &&
                              ticket.assignedDeveloper.devName}
                          </td>
                          <td> {ticket.priority}</td>
                          <td> {ticket.status}</td>
                          <td> {ticket.type}</td>
                          <td> {ticket.createdAt}</td>
                          <td class="text-primary">
                            <Link to={`./details/${ticket._id}`}>
                              {("details")}
                            </Link>
                          </td>
                          <td class="text-primary">
                            <button
                              className="btn btn-warning btn-sm"
                              onClick={() => {
                                onDeleteTicketById(ticket._id);
                              }}
                            >
                              {("Delete")}
                              <i className="material-icons ml-1">
                                delete_forever
                              </i>
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                  <tfoot>
                    <tr>
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
                    </tr>
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
