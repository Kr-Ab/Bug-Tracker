import React, { useState, useEffect, useContext } from "react";
import { Context } from "../../Context";

import axios from "axios";
import { Toast } from "../../animations/Alerts";

import { backend_route } from "../../GlobalVariables";
import { CardPersonnel } from "../../Components/Admin/ManageProject/CardPerssonel";

export default function ManageProjectUsers() {

  const {
    listProjects,
    setListProjects,
    myPersonel,
    setMyPersonel,
    user
  } = useContext(Context);

  const [pickedPersonel, setPickedPersonel] = useState(undefined);
  const [pickedProject, setPickedProject] = useState(undefined);

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
  //////////////////////////////////////////////////////

  const handleOptionChangePersonel = e => {
    setPickedPersonel(e.target.value);
    // console.log(e.target.value);
    console.log(pickedPersonel);
  };

  const handleOptionChangeProject = e => {
    setPickedProject(e.target.value);
    // const { name, value } = e.target;
    // setPickedProject({ ...pickedProject, [name]: value });
  };

  const onSubmitAssignToProject = e => {
    e.preventDefault();
    axios
      .post(
        `${backend_route}/api/admin/project/assignUsersToProject`,
        {
          projectId: pickedProject,
          // projectName: pickedProject.projectName,
          userId: pickedPersonel
        },
        {
          params: {},
          headers: { "auth-token": window.sessionStorage.getItem("token") }
        }
      )
      .then(function(res) {
        console.log(res.data);
        Toast.fire({
          icon: "success",
          title: "Assigned to project with success"
        });
        setMyPersonel(res.data);
      })
      .catch(function(error) {
        console.log(error);
        Toast.fire({
          icon: "error",
          title: "Erro! to assign "
        });
      });
  };

  return (
    <div className="mt-3">
      <div className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-4">
              <form>
                <div>
                  <h4>{("List of projects")}</h4>
                  <small>{("Select")}:</small>
                  <select
                    value={pickedProject}
                    onChange={handleOptionChangeProject}
                    size="3"
                    className="w-100  list-group"
                  >
                    {listProjects.map((project, index) => {
                      return (
                        <option
                          key={index}
                          value={project._id}
                          className={"list-group-item list-group-item-action "}
                        >
                          {project.name}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <br />
                <div>
                  <h4>{("List of my perssonel")}</h4>
                  <small>{("Select")}:</small>

                  <select
                    value={pickedPersonel}
                    onChange={handleOptionChangePersonel}
                    size="3"
                    className="w-100  list-group"
                  >
                    {myPersonel.map((person, index) => {
                      return (
                        <option
                          key={index}
                          value={person._id}
                          className={"list-group-item list-group-item-action "}
                        >
                          {person.name}: {person.role}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <br />
                <button
                  onClick={onSubmitAssignToProject}
                  className="w-100  btn btn-warning"
                  type="submit"
                >
                  {("Assign Project")}
                </button>
                {/* <input type="submit" placeholder="AssignProject" /> */}
                {/* onSubmit={onSubmitAssignToProject} */}
              </form>
            </div>
            <div className="col-md-8">
              <CardPersonnel></CardPersonnel>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
