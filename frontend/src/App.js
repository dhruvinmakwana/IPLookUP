import { Link, useRoutes } from "react-router-dom";

import Routes from "./Routes";
import * as React from 'react';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import styled from "styled-components";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  const Div = styled.div`
          display: 'flex';
          flex-wrap: 'wrap';
  `
  const ElevatedDiv = styled.div`
          display:flex;
          align-items:center;
          justify-content: center;
          padding-top:5px;
          padding-bottom:5px;
          width: 100%;
          height: 50px;
    flex: 0 1 auto;
  `

  const Logo = styled.img`
          display: flex;
          height: 100%;
          margin: 0 10px 0 10px;
`
  return (
    <>
      <Div>
        <ElevatedDiv >
          <Logo src="images/logo.svg"></Logo>
          <h2>IPLookUP</h2>
        </ElevatedDiv>

      </Div>
        <ToastContainer />

        <Routes />
    </>
  );
}

export default App;
