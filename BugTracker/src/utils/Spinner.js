import React from "react";

export default function Spinner() {
  return (
    <div>
      <img className="spinner" src={require("./../images/loading.gif")} alt="" />
    </div>
  );
}
