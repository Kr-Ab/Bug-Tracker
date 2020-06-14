import React, { useState, useEffect, useContext, Fragment } from "react";
import { Context } from "./../Context";
import axios from "axios";

import { Chart } from "react-google-charts";
import { backend_route } from "./../GlobalVariables";

export default () => {
  const { user, typeUser, setTypeUser } = useContext(Context);
  const [listOfTicketsToGraph, setListOfTicketsToGraph] = useState([]);
  useEffect(() => {
    if (typeUser === "admin") {
      axios
        .get(`${backend_route}/api/admin/ticket/getListOfTickets`, {
          headers: { "auth-token": window.sessionStorage.getItem("token") }
        })
        .then(res => {
          if (res.request.status === 200) {
            try {
              setListOfTicketsToGraph(res.data);
            } catch (error) {
              console.log(error);
              setListOfTicketsToGraph([]);
            }
          } else {
            console.log("error");
          }
        });
    } else if (typeUser === "manager") {
      axios
        .get(
          `${backend_route}/api/manager/ticket/getTicketsByAssignedProjects`,
          {
            headers: { "auth-token": window.sessionStorage.getItem("token") }
          }
        )
        .then(res => {
          if (res.request.status === 200) {
            try {
              setListOfTicketsToGraph(res.data);
            } catch (error) {
              console.log(error);
              setListOfTicketsToGraph([]);
            }
          } else {
            console.log("error");
          }
        });
    } else if (typeUser === "developer") {
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
              setListOfTicketsToGraph(res.data);
            } catch (error) {
              console.log(error);
              setListOfTicketsToGraph([]);
            }
          } else {
            console.log("error");
          }
        });
    } else if (typeUser === "submitter") {
      axios
        .get(
          `${backend_route}/api/submitter/ticket/getTicketsCreatedBySubmitter`,
          {
            headers: { "auth-token": window.sessionStorage.getItem("token") }
          }
        )
        .then(res => {
          if (res.request.status === 200) {
            try {
              setListOfTicketsToGraph(res.data);
            } catch (error) {
              console.log(error);
              setListOfTicketsToGraph([]);
            }
          } else {
            console.log("error");
          }
        });
    }
  }, []);

  const [priorityTickets, setPriorityTickets] = useState({
    urgentTickets: 0,
    highTickets: 0,
    mediumTickets: 0,
    lowTickets: 0
  });

  const [typeTickets, setTypeTickets] = useState({
    bugTickets: 0,
    featureTickets: 0,
    inquiryTickets: 0
  });

  const [statusTickets, setStatusTickets] = useState({
    informadoTickets: 0,
    inprogressTickets: 0,
    closedTickets: 0
  });

  const [ticketsAssignedToDevs, setTicketsAssignedToDevs] = useState([]);
  /////////////////////////////////////////////////////////////////////////////////
  useEffect(() => {
    let listTicketsWithAssignedDeveloper = [];

    for (let i = 0; i < listOfTicketsToGraph.length; i++) {
      if (listOfTicketsToGraph[i].assignedDeveloper) {
        listTicketsWithAssignedDeveloper.push(
          listOfTicketsToGraph[i].assignedDeveloper.devName
        );
      }
    }

    var countDevelopers = {};
    listTicketsWithAssignedDeveloper.forEach(function(i) {
      countDevelopers[i] = (countDevelopers[i] || 0) + 1;
    });
    let countToArray = Object.entries(countDevelopers);

    ///ADDING DATA TITLES
    // ["NAME ", "DEVELOPER"]
    let dataAssigned = [];

    dataAssigned.push(["NAME ", "DEVELOPER"]);
    for (let i = 0; i < countToArray.length; i++) {
      dataAssigned.push(countToArray[i]);
    }
    setTicketsAssignedToDevs(dataAssigned);

    //////////////////////////////////////////////////////////////////////

    let c1 = 0;
    let c2 = 0;
    let c3 = 0;
    let c4 = 0;

    for (let i = 0; i < listOfTicketsToGraph.length; i++) {
      if (listOfTicketsToGraph[i].priority == "urgent") {
        c1++;
      } else if (listOfTicketsToGraph[i].priority == "high") {
        c2++;
      } else if (listOfTicketsToGraph[i].priority == "medium") {
        c3++;
      } else if (listOfTicketsToGraph[i].priority == "low") {
        c4++;
      }
    }

    setPriorityTickets({
      ...priorityTickets,
      urgentTickets: c1,
      highTickets: c2,
      mediumTickets: c3,
      lowTickets: c4
    });

    /////////////////////////// ALL THE TYPES

    let c11 = 0;
    let c22 = 0;
    let c33 = 0;

    for (let i = 0; i < listOfTicketsToGraph.length; i++) {
      if (listOfTicketsToGraph[i].type == "bug") {
        c11++;
      } else if (listOfTicketsToGraph[i].type == "feature") {
        c22++;
      } else if (listOfTicketsToGraph[i].type == "inquiry") {
        c33++;
      }
    }

    setTypeTickets({
      ...typeTickets,
      bugTickets: c11,
      featureTickets: c22,
      inquiryTickets: c33
    });

    /////////////////////////// ALL THE STATUS

    let c111 = 0;
    let c222 = 0;
    let c333 = 0;

    for (let i = 0; i < listOfTicketsToGraph.length; i++) {
      if (listOfTicketsToGraph[i].status == "informado") {
        c111++;
      } else if (listOfTicketsToGraph[i].status == "inprogress") {
        c222++;
      } else if (listOfTicketsToGraph[i].status == "closed") {
        c333++;
      }
    }

    setStatusTickets({
      ...statusTickets,
      informadoTickets: c111,
      inprogressTickets: c222,
      closedTickets: c333
    });
  }, [listOfTicketsToGraph]);

  return (
    <Fragment>
      <div className="content ">
        <div className="container-fluid">
          {/* LAYOUT */}
          {/* YOUR CONTENT  */}
          <div className="row d-flex flex-row justify-content-around">
            <div className="col-md-6  p-3 mb-2  bg-white overflow-hidden">
              <div>
                <h3> {("Tickets by Priority")}</h3>
                <h4>{("All the tickets classify by priority")}</h4>
              </div>
              <div className="card bg-danger">
                <div className="card-header card-header-success ">
                  <Chart
                    height={"300px"}
                    chartType="Bar"
                    loader={
                      <img
                        src={require("./../images/loading.gif")}
                        width={"80px"}
                        alt=""
                      />
                    }
                    data={[
                      ["", "LOW", "MEDIUM", "HIGH", "URGENT"],
                      [
                        "PRIORITY",
                        priorityTickets.lowTickets,
                        priorityTickets.mediumTickets,
                        priorityTickets.highTickets,
                        priorityTickets.urgentTickets
                      ]
                    ]}
                    options={{
                      chart: {},
                      colors: ["#4CAF50", "#2196F3", "#FF9800", "#F44336"]
                    }}
                  ></Chart>
                </div>
              </div>
            </div>
            <div className="col-md-6 p-3 mb-2   bg-white overflow-hidden">
              <div>
                <h3>{("Tickets by Type")}</h3>
                <h4>{("All the tickets classify by type")}</h4>
              </div>
              <div className="card bg-danger">
                <div className="card-header card-header-success">
                  <Chart
                    chartType="PieChart"
                    loader={
                      <img
                        src={require("./../images/loading.gif")}
                        width={"80px"}
                        alt=""
                      />
                    }
                    height={"300px"}
                    data={[
                      ["TYPE ", "QUANTITY"],
                      ["FEATURE", typeTickets.featureTickets],
                      ["INQUIRY", typeTickets.inquiryTickets],
                      ["BUG", typeTickets.bugTickets]
                    ]}
                    options={{
                      pieHole: 0.3,
                      is3D: false,
                      colors: ["#2196F3", "#FF9800", "#F44336"]
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="col-md-6 p-3 mb-2  bg-white overflow-hidden">
              <div>
                <h3>{("Tickets By Status")}</h3>
                <h4>{("All the tickets classify by status")}</h4>
              </div>
              <div className="card bg-danger">
                <div className="card-header card-header-success">
                  <Chart
                    height={"300px"}
                    chartType="Bar"
                    loader={
                      <img
                        src={require("./../images/loading.gif")}
                        width={"80px"}
                        alt=""
                      />
                    }
                    data={[
                      ["", "INFORMED", "IN PROGRESS", "CLOSED"],
                      [
                        "STATUS",
                        statusTickets.informadoTickets,
                        statusTickets.inprogressTickets,
                        statusTickets.closedTickets
                      ]
                    ]}
                    options={{
                      chart: {},
                      colors: ["#F44336", "#FF9800", , "#4CAF50"],
                      bar : { Width : '70%' }
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="col-md-6 p-3 mb-2  bg-white overflow-hidden">
              <div>
                <h3>{("Tickets assigned to Developers")}</h3>
                <h4>{("All the tickets assigned to a developer")}</h4>
              </div>
              <div className="card bg-danger">
                <div className="card-header card-header-success">
                  <Chart
                    chartType="PieChart"
                    loader={
                      <img
                        src={require("./../images/loading.gif")}
                        width={"80px"}
                        alt=""
                      />
                    }
                    height={"300px"}
                    data={ticketsAssignedToDevs}
                    options={{
                      pieHole: 0.3,
                      is3D: false,
                      colors: ["#2196F3", "#FF9800", "#F44336"]
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

// export default DashboardHome;
