import React, { useState, useEffect, useContext } from "react";
import { Context } from "../../Context";
import axios from "axios";
import Navbar from "../Navbar";
import Sidebar from "../Sidebar";
import { backend_route } from "../../GlobalVariables";
import { Link } from "@reach/router";
import { Toast } from "../../animations/Alerts";
import "./../../App.css";
import { Fade } from '../../animations/fade'
import { NewTicketModal } from "../Submitter/NewTicketModal";
export default function MyTicketsDeveloper() {

  const { listTickets, setListTickets } = useContext(Context);
  const [loading, setloading] = useState(true);

  useEffect(() => {
    axios
      .get(
        `${backend_route}/api/developer/ticket/getTicketsByAssignedManager`,
        {
          headers: { "auth-token": window.sessionStorage.getItem("token") }
        }
      )
      .then(res => {
        if (res.request.status === 200) {
          try {
            console.log(res.data);

            setListTickets(res.data);
            setloading(false);
          } catch (error) {
            console.log(error);
          }
        } else {
          console.log("error pe chino");
        }
      });
  }, []);

  const [ticketId, setTicketId] = useState("");
  const [status, setStatus] = useState();

  useEffect(() => {
    axios
      .post(
        `${backend_route}/api/developer/ticket/updateTicketStatusByDev`,
        { status: status, ticketId: ticketId },
        {
          headers: { "auth-token": window.sessionStorage.getItem("token") }
        }
      )
      .then(res => {
        Toast.fire({
          icon: "success",
          title: "Process executed with success"
        });
        axios
          .get(
            `${backend_route}/api/developer/ticket/getTicketsByAssignedManager`,
            {
              headers: {
                "auth-token": window.sessionStorage.getItem("token")
              }
            }
          )
          .then(res => {
            console.log(res.data);

            setListTickets(res.data);
          })
          .catch(err => {
            console.log(err);
            Toast.fire({
              icon: "error",
              title: "Process NOT executed with success"
            });
          });
      })
      .catch(err => {
        console.log(err);

        Toast.fire({
          icon: "error",
          title: "Process NOT executed with success"
        });
      });
  }, [status]);

  const handleStatusChange = e => {
    setStatus(e.target.value);
    setTicketId(e.target.name);
    // console.log(ticketId);
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
        <h4>{("Create New Ticket")} </h4>
          <NewTicketModal></NewTicketModal>

          <hr />
          <div className="card">
            <div className="card-header card-header-info">
              <h4 className="card-title ">{("Your Tickets")}</h4>
              <p className="card-category">
                {("All your Tickets in your database")}
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
                  <thead className="font-weight-bold">
                    <tr>
                      <th>{("Name")}</th>
                      <th>{("Assigned Developer")}</th>
                      <th>{("Priority")}</th>
                      <th>{("Status")}</th>
                      <th>{("Details")}</th>
                      <th>{("Change Status")}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loading ? (
                      <tr>
                        <td>
                          <img
                            src={require("./../../images/loading.gif")}
                            width={"80px"}
                            alt=""
                          />
                        </td>
                      </tr>
                    ) : (
                      currentListOfTickets.map((ticket, index) => {
                        return (
                          <tr key={index}>
                            <td>{ticket.name}</td>
                            <td>
                              {ticket.assignedDeveloper &&
                                ticket.assignedDeveloper.devName}
                            </td>
                            <td> {ticket.priority}</td>
                            <td>{ticket.status}</td>
                            <td className="text-secondary">
                              <Link to={`./details/${ticket._id}`}>
                                <td>{("details")}</td>
                              </Link>
                            </td>
                            <td>
                              <select
                                value={ticket.status}
                                name={ticket._id}
                                onChange={handleStatusChange}
                                className={`w-75 btn btn-warning  btn-sm list-group`}
                              >
                                <option
                                  className={
                                    "optionDanger list-group-item list-group-item-action  b "
                                  }
                                  value="informado"
                                >
                                  {("Informado")}
                                </option>
                                <option
                                  className={
                                    "optionWarning list-group-item list-group-item-action   "
                                  }
                                  value="inprogress"
                                >
                                  {("In Progress")}
                                </option>
                                <option
                                  className={
                                    "optionInfo list-group-item list-group-item-action   "
                                  }
                                  value="closed"
                                >
                                  {("Closed")}
                                </option>
                              </select>
                            </td>
                          </tr>
                        );
                      })
                    )}
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
          </div>
        </div>
      </div>
    </Fade>
  );
}
