import MyTicketsAdmin from '../Components/Admin/MyTicketsAdmin'
import MyTicketsDeveloper from '../Components/Developer/MyTicketsDeveloper'
import MyTicketsManager from '../Components/Manager/MyTicketsManager'
import MyTicketsSubmitter from '../Components/Submitter/MyTicketsSubmitter'

import { Context } from "./../Context";
import React, {

  useContext
 
} from "react";

export default function MyProjects() {
  const {  typeUser } = useContext(
    Context
  );

  return (
    <div>
      {typeUser === "admin" && <MyTicketsAdmin/>}
      {typeUser === "manager" && <MyTicketsManager/>}
      {typeUser === "developer" && <MyTicketsDeveloper/>}
      {typeUser === "submitter" && <MyTicketsSubmitter/>}
    </div>
  )
}
