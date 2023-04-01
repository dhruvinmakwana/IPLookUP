import Routes from "./Routes";
import * as React from "react";
import styled from "styled-components";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Div = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;
const ElevatedDiv = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 5px;
  padding-bottom: 5px;
  width: 100%;
  height: 50px;
  flex: 0 1 auto;
`;

const Logo = styled.img`
  display: flex;
  height: 100%;
  margin: 0 10px 0 10px;
`;
const SubHeading = styled.em``;

function App() {
  return (
    <>
      <Div>
        <ElevatedDiv>
          <Logo src="images/logo.svg"></Logo>
          <h2>IPLookUP</h2>
        </ElevatedDiv>
        <SubHeading>Get geo-location data form an IP address</SubHeading>
      </Div>
      <ToastContainer />

      <Routes />
    </>
  );
}

export default App;
