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
    listProjects,
    setListTickets
  } = useContext(Context);
  ////////////////////////////////////////////////////////////////////////////////////////////

  // LOGIG PAGINATION ///////////////////////////////////
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentTickets = filteredArray.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = pageNumber => setCurrentPage(pageNumber);
  // const totalPersonel = myPersonel.length;

  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(filteredArray.length / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  //////////////////////////////////////////////////////
  // GET LIST OF TICKETS
  useEffect(() => {
    axios
      .get(`${backend_route}/api/admin/ticket/getListOfTickets`, {
        headers: { "auth-token": window.sessionStorage.getItem("token") }
      })
      .then(res => {
        if (res.request.status === 200) {
          try {
            console.log(res.data);
            setListTickets(res.data);
          } catch (error) {
            console.log(error);
          }
        } else {
          console.log("error pe chino");
        }
      });
  }, []);
  //////////////////////////////////////////////////////

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
            if (res.request.status === 200) {
              setListTickets(res.data);
              SuccesCenterTimer.fire();
            } else {
              console.log("error");
            }
          });
      }
    });
  };
  /////////////////////////////////////////////////////////////////////

  return (
    <Fade className="table-responsive">
      <table className="table ">
        <thead className=" ">
          <tr>
            <th className="font-weight-bold"> {("title")}</th>
            <th className="font-weight-bold">{("projectName")}</th>
            <th className="font-weight-bold">{("assignedDeveloper")}</th>
            <th className="font-weight-bold">{("priority")}</th>
            <th className="font-weight-bold">{("status")}</th>
            <th className="font-weight-bold">{("type")}</th>
            <th className="font-weight-bold">{("createdAt")}</th>
            <th className="font-weight-bold">{("details")}</th>
          </tr>
        </thead>
        <tbody>
          {currentTickets.map((ticket, index) => {
            return (
              <tr key={index}>
                <td>{ticket.name}</td>
                <td>{ticket.byProjectName}</td>

                <td>
                  {ticket.assignedDeveloper && ticket.assignedDeveloper.devName}
                </td>
                <td> {ticket.priority}</td>
                <td> {ticket.status}</td>
                <td> {ticket.type}</td>
                <td> {ticket.createdAt}</td>

                <td className="text-secondary">
                  <Link to={`./details/${ticket._id}`}>{("details")}</Link>
                  <br />
                  <Link to={`./edit/${ticket._id}`}>{("edit")}</Link>
                  <br />
                  <button
                    className="btn btn-warning btn-sm"
                    onClick={() => {
                      onDeleteTicketById(ticket._id);
                    }}
                  >
                    {("Delete")}
                    <i className="material-icons ml-1">delete_forever</i>
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
