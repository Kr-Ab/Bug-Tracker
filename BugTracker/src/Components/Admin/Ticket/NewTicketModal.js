import React, { useState, useEffect, useContext } from "react";
import { Context } from "./../../../Context";
import axios from "axios";
import { backend_route } from "./../../../GlobalVariables";
import { Toast } from "../../../animations/Alerts";
import { Fade } from '../../../animations/fade'

export function NewTicketModal() {

  const {
    listProjects,
    listTickets,
    setListTickets,
    user,
    setListProjects
  } = useContext(Context);

  const initialFormState = {
    name: "",
    description: "",
    projectId: undefined,
    type: "bug",
    priority: "low",
    imageDescription: "",
    file: {}
  };
  const [input, setInput] = useState(initialFormState);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setInput({ ...input, [name]: value });
  };

  const handleCreateTicket = e => {
    e.preventDefault();

    axios
      .post(
        `${backend_route}/api/global/ticket/createTicket`,
        {
          ...input
        },
        {
          params: {},
          headers: { "auth-token": window.sessionStorage.getItem("token") }
        }
      )
      .then(res => {
        setListTickets(res.data);

        Toast.fire({
          icon: "success",
          title: "Process executed with success"
        });
      })
      .catch(err => {
        console.log(err);
        Toast.fire({
          icon: "error",
          title: "Process NOT executed with success"
        });
      });
  };

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
  /////////////////////////////////////////////////////////////////////

  return (
    <Fade
      className="modal fade"
      id="exampleModal"
      tabIndex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h4 className="modal-title" id="exampleModalLabel">
              {("New Ticket")}
            </h4>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <div>
              <h4>{("Select project to attach")}</h4>
              <select
                value={input.projectId}
                name="projectId"
                onChange={handleInputChange}
                className="w-100  list-group"
                size="3"
              >
                {listProjects.map((project, index) => {
                  return (
                    <option
                      className={"list-group-item list-group-item-action "}
                      key={index}
                      value={project._id}
                    >
                      {project.name}
                    </option>
                  );
                })}
              </select>
            </div>
            <form className=" border border-light p-5">
              <h4> {("Create your new ticket")}</h4>

              <input
                type="text"
                value={input.name}
                name="name"
                onChange={handleInputChange}
                className="form-control mb-4"
                placeholder="Name"
              />

              <input
                type="text"
                value={input.description}
                name="description"
                onChange={handleInputChange}
                className="form-control mb-4"
                placeholder="Description"
              />
              <div>
                <h4> {("Priority")}</h4>
                <select
                  value={input.priority}
                  name="priority"
                  onChange={handleInputChange}
                  className="w-100 custom-select"
                >
                  <option value="low">{("low")}</option>
                  <option value="medium">{("medium")}</option>
                  <option value="high">{("high")}</option>
                  <option value="urgent">{("urgent")}</option>
                </select>
              </div>

              <div>
                <h4> {("Type")} </h4>
                <select
                  value={input.type}
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
              </div>

              <button
                type="button"
                onClick={handleCreateTicket}
                className="btn btn-success"
                data-dismiss="modal"
              >
                {("Create ticket and Close")}
              </button>
            </form>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-danger"
              data-dismiss="modal"
            >
              {("Close")}
            </button>
          </div>
        </div>
      </div>
    </Fade>
  );
}
