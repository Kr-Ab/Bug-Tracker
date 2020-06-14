import React, { useState } from "react";
import { Search } from "./Search";
import { Table } from "./Table";
import "./../../styles.css";
import { Fade } from '../../../animations/fade'


export function CardProjects() {

  const [filteredArray, setFilteredArray] = useState([]);
  return (
    <Fade className="card">
      <div className="card-header card-header-danger">
        <h4 className="card-title ">{("Your Projects")} </h4>
        <p className="card-category">
          {("All your projects in your database")}
        </p>
      </div>
      <div className="card-body">
        <Search setFilteredArray={setFilteredArray}></Search>
        <Table filteredArray={filteredArray}></Table>
      </div>
    </Fade>
  );
}
