import React, { useState, useContext, useEffect } from "react";
import { Context } from "../../../Context";
import { Fade } from '../../../animations/fade'

export function Search({ setFilteredArray }) {
  const { myPersonel } = useContext(Context);
  const [searchedWord, setSearchedWord] = useState("");

  useEffect(() => {
    setFilteredArray(myPersonel);
  }, [myPersonel]);

  const itemsFiltered = (searchedItem, arrayOfObject) => {
    let arrayFiltered = arrayOfObject.filter(function(obj) {
      let objectClean = {};
      objectClean["name"] = obj["name"];
      objectClean["email"] = obj["email"];
      if (obj["assignedProjects"]) {
        for (let i = 0; i < obj["assignedProjects"].length; i++) {
          objectClean[i] = obj["assignedProjects"][i];
        }
      } else {
        objectClean["assignedProjects"] = "";
      }
      for (let key in objectClean) {
        if (
          JSON.stringify(objectClean[key])
            .toLowerCase()
            .includes(searchedItem.toLowerCase())
        ) {
          return objectClean;
        }
      }
    });
    return arrayFiltered;
  };

  const handleSearchedWord = e => {
    setSearchedWord(e.target.value);
  };

  useEffect(() => {
    setFilteredArray(itemsFiltered(searchedWord, myPersonel));
    console.log(searchedWord);
  }, [searchedWord]);

  return (
    <Fade className="input-group no-border w-100  d-flex flex-row-reverse">
      <div className="input-group no-border w-50  ">
        <input
          className="form-control"
          type="text"
          value={searchedWord}
          onChange={handleSearchedWord}
          placeholder="Search"
        />
        <button type="submit" class="btn btn-white btn-round btn-just-icon">
          <i class="material-icons">search</i>
          <div class="ripple-container"></div>
        </button>
      </div>
    </Fade>
  );
}
