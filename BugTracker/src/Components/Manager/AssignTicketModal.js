import React, { useState, useEffect, useContext } from "react";
import { Context } from "../../Context";
import axios from "axios";
import { backend_route } from "../../GlobalVariables";
import { Toast } from "../../animations/Alerts";
import { Fade } from '../../animations/fade'

export default function AssignTicketModal() {
  const { listProjects, listTickets, setListTickets, user } = useContext(
    Context
  );

  useEffect(() => {
    axios
      .get(`${backend_route}/api/manager/ticket/getTicketsByAssignedProjects`, {
        headers: { "auth-token": window.sessionStorage.getItem("token") }
      })
      .then(res => {
        if (res.request.status === 200) {
          // console.log(listTickets);
          // let arrayTickets = [];
          try {
            console.log("tickets que me han sido assignados");
            console.log(res.data);

            setListTickets(res.data);
          } catch (error) {
            console.log(error);
            setListTickets([]);
          }
        } else {
          console.log("error pe chino");
        }
      });
  }, []);

  // quiero a los DEV QUE ESTEN ASIGNOS A LOS PROYECTO QUE YO ESTOY ASSINGANOD

  const [devs, setDevs] = useState([]);

  useEffect(() => {
    axios
      .get(`${backend_route}/api/manager/project/myDevsForAssignedProjects`, {
        headers: { "auth-token": window.sessionStorage.getItem("token") }
      })
      .then(res => {
        setDevs(res.data);
        console.log(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  // GET LIST OF TICKETS DE LOS PROYECTOS QUE ME HAN SIDO ASIGNADOS

  //asign ticket to dev

  const [pickedTicket, setPickedTicket] = useState(undefined);
  const handleOptionChangeTicket = e => {
    setPickedTicket(e.target.value);
    console.log(e.target.value);
  };

  const [pickedDeveloper, setPickedDeveloper] = useState(undefined);

  const handleOptionChangeDeveloper = e => {
    setPickedDeveloper(e.target.value);
    console.log(e.target.value);
  };

  const onAssignTicketToDev = () => {
    axios
      .post(
        `${backend_route}/api/global/ticket/assignTicketToDev`,
        {
          devId: pickedDeveloper,
          ticketId: pickedTicket
        },
        {
          params: {},
          headers: { "auth-token": window.sessionStorage.getItem("token") }
        }
      )
      .then(res => {
        Toast.fire({
          icon: "success",
          title: "Process executed with success"
        });
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
  };
  return (
    <Fade>
      {/* <!-- Button trigger modal --> */}
      <button
        type="button"
        class="btn btn-warning"
        data-toggle="modal"
        data-target="#exampleModal2"
      >
        {("Assign")}
      </button>
      {/* <!-- Modal --> */}
      <div
        class="modal fade"
        id="exampleModal2"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title" id="exampleModalLabel">
                {("ASSIGN TICKET TO DEV")}
              </h4>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <div>
                <h4> {("Pick your ticket")}</h4>

                <select
                  value={pickedTicket}
                  onChange={handleOptionChangeTicket}
                  className="w-100 list-group"
                  size="2"
                >
                  {listTickets.map((ticket, index) => {
                    return (
                      <option
                        className={"list-group-item list-group-item-action "}
                        key={index}
                        value={ticket._id}
                      >
                        {ticket.name}
                      </option>
                    );
                  })}
                </select>
              </div>
              <br />
              <div>
                <h4> {("Pick your dev")}</h4>

                <select
                  value={pickedDeveloper}
                  onChange={handleOptionChangeDeveloper}
                  className="w-100 list-group"
                  size="2"
                >
                  {devs.map((dev, index) => {
                    return (
                      <option
                        className={"list-group-item list-group-item-action "}
                        key={index}
                        value={dev._id}
                      >
                        {dev.name}
                      </option>
                    );
                  })}
                </select>
              </div>
              <br />
              <button
                // onSubmit={onSubmitRegistro}
                type="button"
                onClick={onAssignTicketToDev}
                class="btn btn-warning"
                data-dismiss="modal"
              >
                {("Assing and close")}
              </button>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-danger" data-dismiss="modal">
                {("Close")}
              </button>
            </div>
          </div>
        </div>
      </div>
    </Fade>
  );
}
