import React, { useState, useEffect } from "react";
import { navigate } from "@reach/router";

import axios from "axios";

import { backend_route } from "./../GlobalVariables";
import { SuccesCenterTimer, ErrorCenterTimer } from "./../animations/Alerts";

export default props => {
  // props.ticketId

  useEffect(() => {
    axios
      .post(
        `${backend_route}/api/global/ticket/getTicketById`,
        { ticketId: props.ticketId },
        {
          params: {},
          headers: { "auth-token": window.sessionStorage.getItem("token") }
        }
      )
      .then(function(res) {
        setTicketToEdit({ ...res.data, ticketId: props.ticketId });
        console.log(ticketToEdit);
      })
      .catch(function(error) {
        console.log(error);
      });
  }, []);
  const [ticketToEdit, setTicketToEdit] = useState({});

  const handleInputChange = event => {
    const { name, value } = event.target;
    setTicketToEdit({ ...ticketToEdit, [name]: value });
    console.log(ticketToEdit);
  };

  const onUpdateTicket = () => {
    console.log("update");

    axios
      .post(
        `${backend_route}/api/global/ticket/updateTicketById`,
        {
          ...ticketToEdit
        },
        {
          headers: { "auth-token": window.sessionStorage.getItem("token") }
        }
      )
      .then(res => {
        setTicketToEdit(res.data);
        SuccesCenterTimer.fire();
        navigate("/myTickets");
      })
      .catch(err => {
        ErrorCenterTimer.fire();
        console.log(err);
        navigate("/myTickets");
      });
  };

  const onNavigateToTickets = () => {
    navigate("/myTickets");
  };

  return (
    <div className="mt-3">
      <div className="content">
        <div className="container-fluid">
          <div className="row">
            <div class="col-md-8">
              <div class="card">
                <div class="card-header card-header-success">
                  <h4 class="card-title ">{("Edit Ticket")} </h4>
                  <button
                    onClick={onNavigateToTickets}
                    class="btn btn-link  btn-sm   text-white"
                  >
                    <i class="material-icons">arrow_back</i>

                    {("Back to list")}
                  </button>
                </div>
                <div class="card-body">
                  <div class="table-responsive">
                    <table class="table table-sm">
                      <tbody id="tbody">
                        <tr>
                          <td>
                            <h4>{("Ticket Title")}</h4>
                            <input
                              type="text"
                              value={ticketToEdit.name}
                              name="name"
                              onChange={handleInputChange}
                              className="form-control mb-4"
                              placeholder="Name"
                            />
                          </td>
                          <td>
                            <h4>{("Ticket Description")}</h4>

                            <input
                              type="text"
                              name="description"
                              value={ticketToEdit.description}
                              onChange={handleInputChange}
                              className="form-control mb-4"
                              placeholder="Description"
                            />
                          </td>
                        </tr>
                        <br />
                        <tr>
                          <td>
                            <h4>{("Project")}</h4>
                            <p>{ticketToEdit.byProjectName}</p>
                          </td>
                          <td>
                            <h4> {("Assigned Developer")}</h4>

                            <p>
                              {ticketToEdit.assignedDeveloper &&
                                ticketToEdit.assignedDeveloper.devName}
                            </p>
                          </td>
                        </tr>
                        <br />
                        <tr>
                          <td>
                            <h4>{("Ticket Priority")}</h4>

                            <select
                              value={ticketToEdit.priority}
                              name="priority"
                              onChange={handleInputChange}
                              className="w-100 custom-select"
                            >
                              <option value="low">{("low")}</option>
                              <option value="medium">{("medium")}</option>
                              <option value="high">{("high")}</option>
                              <option value="urgent">{("urgent")}</option>
                            </select>
                          </td>
                          <td>
                            <h4>{("Ticket Status")}</h4>
                            <select
                              value={ticketToEdit.status}
                              name="status"
                              onChange={handleInputChange}
                              className="w-100 custom-select"
                            >
                              <option value="informed">
                                {("Informed")}
                              </option>
                              <option value="inprogress">
                                {("In Progress")}
                              </option>
                              <option value="closed">{("Closed")}</option>
                            </select>
                          </td>
                        </tr>
                        <br />
                        <tr>
                          <td>
                            <h4>{("Ticket Type")}</h4>
                            <select
                              value={ticketToEdit.type}
                              name="type"
                              onChange={handleInputChange}
                              className="w-100 custom-select"
                            >
                              <option value="bug">
                                {("Bug")}/{("Error")}
                              </option>
                              <option value="feature">
                                {("Feature")}/{("Request")}
                              </option>
                              <option value="inquiry">
                                {("Inquiry")}/{("Question")}
                              </option>
                            </select>
                          </td>
                        </tr>
                      </tbody>
                      <tfoot>
                        <button
                          type="button"
                          onClick={onUpdateTicket}
                          class="btn btn-info"
                        >
                          {("Update Ticket")}
                        </button>
                      </tfoot>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// export default TicketEdit;
