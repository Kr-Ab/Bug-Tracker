import React, { useState, useEffect, useContext } from "react";
import { Context } from "../../Context";
import axios from "axios";
// Validation --------------------------------------------->
import { useForm } from "react-hook-form";
import { backend_route } from "../../GlobalVariables";
import { CardProjects } from "../../Components/Admin/Project/CardProjects";
import { Toast } from "../../animations/Alerts";
import { Fade } from '../../animations/fade'

export const MyProjectsAdmin = () => {

  // Validation --------------------------------------------->
  const { register, handleSubmit, watch, errors } = useForm();
  const { listProjects, setListProjects, user, setMyPersonel } = useContext(
    Context
  );

  // const initialFormState = {
  //   name: "",
  //   description: ""
  // };
  // const [input, setInput] = useState(initialFormState);

  // const handleInputChange = event => {
  //   const { name, value } = event.target;
  //   setInput({ ...input, [name]: value }); //anade el name y surname mas al adduser
  // };

  const onSubmit = (data, e) => {
    // e.preventDefault();
    // if (!input) return;
    // setInput(initialFormState);
    e.target.reset();
    axios
      .post(`${backend_route}/api/admin/project/createProject`, data, {
        params: {},
        headers: { "auth-token": window.sessionStorage.getItem("token") }
      })
      .then(res => {
        if (res.request.status === 200) {
          console.log("proyecto creado correctamente");
          Toast.fire({
            icon: "success",
            title: "Process executed with success"
          });
          // me trae la lista de de proyectos
          console.log(res.data);
          setListProjects(res.data);
        } else {
          console.log("error pe chino");
        }
      });
  };

  return (
    <Fade className="mt-3">
      <div className="content">
        <div className="container-fluid">
          <div>
            <h4> {("Create New Project")} </h4>
            <button
              type="button"
              className="btn btn-warning"
              data-toggle="modal"
              data-target="#exampleModal"
            >
              {("New Project")}
            </button>
            {/* <!-- Modal --> */}
            <div
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
                    <h5 className="modal-title" id="exampleModalLabel">
                      {("Create New Project")}
                    </h5>
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
                    <form
                      className=" border border-light p-5"
                      onSubmit={handleSubmit(onSubmit)}
                    >
                      <div className=" mb-4">
                        <input
                          type="text"
                          // value={input.name}
                          // onChange={handleInputChange}
                          name="name"
                          className="form-control"
                          placeholder="Name"
                          ref={register({
                            required: true,
                            minLength: 4
                          })}
                        />
                        {errors.name && errors.name.type === "required" && (
                          <p className="errorValidation text-alert ">
                            Your input is required
                          </p>
                        )}
                        {errors.name && errors.name.type === "minLength" && (
                          <p className="errorValidation text-alert ">
                            Min 4 letter
                          </p>
                        )}
                      </div>
                      <div className=" mb-4">
                        <input
                          type="text"
                          // value={input.description}
                          // onChange={handleInputChange}
                          name="description"
                          className="form-control "
                          placeholder="Description"
                          ref={register({})}
                        />
                      </div>

                      <button
                        // onSubmit={onSubmitRegistro}
                        // onClick={onSubmit}
                        // type="button"
                        // data-dismiss="modal"
                        className="btn btn-warning"
                        type="submit"
                      >
                        {("Create project")}
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
            </div>
          </div>
          <hr />
          <CardProjects></CardProjects>
        </div>
      </div>
    </Fade>
  );
};

export default MyProjectsAdmin;
