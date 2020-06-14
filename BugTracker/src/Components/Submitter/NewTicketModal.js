import React, { useState, useEffect, useContext } from "react";
import { Context } from "../../Context";
import axios from "axios";
import { backend_route } from "../../GlobalVariables";
import { Toast } from "../../animations/Alerts";
import { Fade } from '../../animations/fade'

export function NewTicketModal() {

  const {
    listProjects,
    setListProjects,
    listTickets,
    setListTickets,
    user
  } = useContext(Context);

  const initialFormState = {
    name: "",
    description: "",
    projectId: undefined,
    type: "bug",
    priority: "low",
    imageDescription: ""
  };
  const [input, setInput] = useState(initialFormState);
  const [loading, setloading] = useState(true);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setInput({ ...input, [name]: value });
  };

  useEffect(() => {
    axios
      .get(`${backend_route}/api/submitter/project/getAssignedProjects`, {
        headers: { "auth-token": window.sessionStorage.getItem("token") }
      })
      .then(res => {
        setListProjects(res.data);
        setloading(false);
        console.log(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

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
        console.log(res.data);

        console.log("ticket creado correctamente");
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
  return (
    <Fade>
      <button
        type="button"
        className="btn btn-danger"
        data-toggle="modal"
        data-target="#exampleModal"
      >
        {("New Ticket")}
      </button>

      {/* <!-- Modal --> */}
      <div
        className="modal fade"
        id="exampleModal"
        tabindex="-1"
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
                <h4>{("Select project to attach")} </h4>
                <select
                  value={input.projectId}
                  name="projectId"
                  onChange={handleInputChange}
                  className="w-100 list-group"
                  size="2"
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
                <h4>{("Create your new ticket")} </h4>

                <input
                  type="text"
                  name="name"
                  onChange={handleInputChange}
                  className="form-control mb-4"
                  placeholder="Name"
                />
                <textarea
                  required={true}
                  rows="4"
                  cols="50"
                  className="form-control  mb-4"
                  onChange={handleInputChange}
                  name="description"
                  type="text"
                  placeholder="Description"
                ></textarea>

                <div>
                  <h4>Priority </h4>
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
                  <h4>{("Type")} </h4>
                  <select
                    value={input.type}
                    name="type"
                    onChange={handleInputChange}
                    className="w-100 custom-select"
                  >
                    <option value="bug">
                      {("Bug")} /{("Error")}
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
              <button type="button" className="btn btn-danger" data-dismiss="modal">
                {("Close")}
              </button>
            </div>
          </div>
        </div>
      </div>
    </Fade>
  );
}
