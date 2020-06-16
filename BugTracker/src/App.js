import React, {
  useState,
  useEffect,
  useContext,
  Suspense,
  lazy
} from "react";
import { Context } from "./Context";
import axios from "axios";

import { Router, Redirect } from "@reach/router";

import ManageRoleAssignment from "./pages/Admin/ManageRoleAssignment";
import ManageProjectUsers from "./pages/Admin/ManageProjectUsers";


import "./App.css";
import NotFound from "./pages/NotFound";
import { backend_route } from "./GlobalVariables";
import Spinner from "./utils/Spinner";
import Wrapper from "./Components/Layout/Wrapper";
import MainPanel from "./Components/Layout/MainPanel";

import Navbar from "./Components/Navbar";
import Sidebar from "./Components/Sidebar";

// const Navbar = lazy(() => import("./Components/Navbar"));
// const Sidebar = lazy(() => import("./Components/Sidebar"));

// const DashboardHome = lazy(() => import("./pages/DashboardHome"));
// const GetIn = lazy(() => import("./pages/GetIn"));
// const MyProjects = lazy(() => import("./pages/MyProjects"));
// const ProjectDetail = lazy(() => import("./pages/ProjectDetail"));
// const MyTickets = lazy(() => import("./pages/MyTickets"));
// const TicketDetail = lazy(() => import("./pages/TicketDetail"));
// const TicketEdit = lazy(() => import("./pages/TicketEdit"));

import GetIn from "./pages/GetIn";
import DashboardHome from "./pages/DashboardHome";
import MyProjects from "./pages/MyProjects";
import ProjectDetail from "./pages/ProjectDetail";
import MyTickets from "./pages/MyTickets";
import TicketDetail from "./pages/TicketDetail";
import TicketEdit from "./pages/TicketEdit";

function App(props) {
  const { isAuth, setIsAuth, setUser, setTypeUser } = useContext(
    Context
  );

  const [isLoading, setisLoading] = useState(true);
  useEffect(() => {
    axios
      .get(`${backend_route}/api/global/account/myAccount`, {
        params: {},
        headers: { "auth-token": window.sessionStorage.getItem("token") }
      })
      .then(function(data) {
        console.log(data);
        setIsAuth(true);
        if (data.data.assignedProjects) {
          if (data.data.role === "submitter") {
            setTypeUser("submitter");
            setUser(data.data);
          } else if (data.data.role === "developer") {
            setTypeUser("developer");
            setUser(data.data);
          } else if (data.data.role === "manager") {
            setTypeUser("manager");
            setUser(data.data);
          } else {
            setTypeUser("Unassigned");
            setUser(data.data);
          }
        } else {
          setTypeUser("admin");
          setUser(data.data);
        }
        setisLoading(false);
      })
      .catch(function(error) {
        console.log(error);
      });
  }, [isAuth]);

  return (
    <Suspense fallback={<Spinner />}>
      <Wrapper>
        <Sidebar />
        <MainPanel>
          <Navbar />
          <Router>
            {isAuth && <Redirect noThrow from="/getin" to="/dashboard" />}
            <GetIn path="/getin" />
            {!isAuth && <Redirect noThrow from="/" to="/getin" />}
            {isLoading ? (
              <NotFound default />
            ) : (
              <DashboardHome exact path="/dashboard" />
            )}
            {isAuth && <ManageRoleAssignment path="/manageRole" />}
            {isAuth && <ManageProjectUsers path="/manageProject" />}
            <MyProjects path="/myProjects" />
            <MyTickets path="/myTickets" />
            <ProjectDetail path="/myProjects/details/:projectId" />
            <TicketDetail path={`/myTickets/details/:ticketId`} />
            <TicketEdit path={`/myTickets/edit/:ticketId`} />
            <NotFound default />
          </Router>
        </MainPanel>
      </Wrapper>
    </Suspense>
  );
}

export default App;
