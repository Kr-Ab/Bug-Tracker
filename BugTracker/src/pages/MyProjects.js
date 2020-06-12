import MyProjectsAdmin from "../Components/Admin/MyProjectsAdmin";
import MyProjectsDeveloper from "../Components/Developer/MyProjectsDeveloper";
import MyProjectsManager from "../Components/Manager/MyProjectsManager";
import MyProjectsSubmitter from "../Components/Submitter/MyProjectsSubmitter";

import { Context } from "./../Context";
import React, { useContext } from "react";

export default function MyProjects() {
  const { typeUser } = useContext(Context);

  return (
    <div>
      {typeUser === "admin" && <MyProjectsAdmin />}
      {typeUser === "manager" && <MyProjectsManager />}
      {typeUser === "developer" && <MyProjectsDeveloper />}
      {typeUser === "submitter" && <MyProjectsSubmitter />}
    </div>
  );
}
