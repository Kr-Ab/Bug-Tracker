import React, { useState, useEffect, useContext } from "react";
import { Context } from "./../Context";
import { navigate } from "@reach/router";
import Login from "./../Components/GetIn/Login";
import Register from "./../Components/GetIn/Register";
import DemoUser from "../Components/GetIn/DemoUser";
import styled from "styled-components";

export default () => {
  const { isAuth } = useContext(Context);
  const [isLogginActive, setIsLogginActive] = useState("login");

  return (
    <BackgroundStyle>
      {isLogginActive === "login" && (
        <Login
          isLogginActive={isLogginActive}
          setIsLogginActive={setIsLogginActive}
        />
      )}
      {isLogginActive === "register" && (
        <Register
          isLogginActive={isLogginActive}
          setIsLogginActive={setIsLogginActive}
        ></Register>
      )}
      {isLogginActive === "demouser" && (
        <DemoUser
          isLogginActive={isLogginActive}
          setIsLogginActive={setIsLogginActive}
        ></DemoUser>
      )}
    </BackgroundStyle>
  );
};

const BackgroundStyle = styled.div`
  background-image: linear-gradient(to top, #B9F6CA 0%, #1DE9B6 100%);
  width: 100%;
  height: 100%;
  position: absolute !important;
  top: 0 !important;
  left: 0 !important;
  z-index: 20;
  display: flex;
  align-items: center;
  justify-content: center;
`;
// export default GetIn;
