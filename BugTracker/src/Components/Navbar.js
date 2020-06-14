import React, { useContext } from "react";
import { Context } from "./../Context";
import "./styles.css";
import { Fade } from '../animations/fade'

export default ({ isLoading }) => {
  const { removeAuth, user } = useContext(Context);
  try {
    var btnRemoveAuth = document.getElementById("removeAuth");
    btnRemoveAuth.addEventListener("click", () => {
      removeAuth();
    });
  } catch (error) {
    console.log(error);
  }

  return (
    <Fade>
      <nav
        style={{ zIndex: 10 }}
        className="navbar navbar-expand-lg bg-light navbar-absolute fixed-top navbartracker mb-2 "
      >
        <div className="container-fluid">
          <div className="navbar-wrapper">
            <div className="d-flex justify-content-center align-items-center">
              <h5 className="text-secondary m-0">
                {("Logged in as")} :
                <span className="text-dark text-capitalize font-weight-normal">
                  {user.name}
                </span>
              </h5>
            </div>
          </div>

          <div className="navbar-form"></div>

          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            aria-controls="navigation-index"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="sr-only">Toggle navigation</span>
            <span className="navbar-toggler-icon icon-bar"></span>
            <span className="navbar-toggler-icon icon-bar"></span>
            <span className="navbar-toggler-icon icon-bar"></span>
          </button>

          <div className="collapse navbar-collapse justify-content-end">
            <ul className="navbar-nav">

              <button
                type="submit"
                onClick={removeAuth}
                className=" btn btn-danger w-100"
                id="removeAuth"
              >
                {("Log out")}
              </button>
            </ul>
          </div>
        </div>
      </nav>
    </Fade>
  );
};
