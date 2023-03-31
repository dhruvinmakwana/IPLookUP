import styled from "styled-components";
import * as React from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import "react-toastify/dist/ReactToastify.css";
import useIPLookUPStore from "../../../state/State";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Button from "@mui/material/Button";
import MinimizeIcon from "@mui/icons-material/Minimize";
import IPAccordion from "./IPAccordion";

const ContainerDiv = styled.div`
  flex: 4;
  height: calc(100vh - 207px);
  overflow-y: scroll;
  padding: 10px;
`;

const ResultsCount = styled.div`
  text-align: right;
  font-style: italic;
  line-height: 2;
  float: ${(props) => (props.fixed ? "left" : "unset")};
  position: ${(props) => (props.fixed ? "absolute" : "inherit")};
  z-index: 99;
  left: ${(props) => (props.fixed ? "8px" : "unset")};
  top: ${(props) => (props.fixed ? "-10px" : "unset")};
`;

const Minimize = styled.div`
  align-self: end;
`;
export default function IPDetails() {
  const IPQueryResults = useIPLookUPStore((state) => state.IPQueryResults);
  const matches = useMediaQuery("(max-width:600px)");
  const [drawerOpen, setState] = React.useState(false);

  const toggleDrawer = (drawerOpen) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setState({ drawerOpen });
  };

  return (
    <>
      {matches ? (
        <>
          <Button
            style={{ padding: "15px" }}
            variant="contained"
            onClick={toggleDrawer(true)}
          >
            Open Results
          </Button>
          <SwipeableDrawer
            anchor="bottom"
            open={drawerOpen}
            onClose={toggleDrawer(false)}
            onOpen={toggleDrawer(true)}
          >
            <Minimize onClick={() => setState(false)}>
              <ResultsCount fixed>
                <p style={{ float: "left" }}>
                  Results found: ({IPQueryResults.length})
                </p>
              </ResultsCount>
              <MinimizeIcon />
            </Minimize>
            {IPQueryResults.map((detail, index) => (
              <IPAccordion detail={detail} mobile drawerHandler={setState} />
            ))}
          </SwipeableDrawer>
        </>
      ) : (
        <>
          <ContainerDiv>
            <ResultsCount>
              Results found: ({IPQueryResults.length})
            </ResultsCount>
            {IPQueryResults.map((detail, index) => (
              <IPAccordion detail={detail} />
            ))}
          </ContainerDiv>
        </>
      )}
    </>
  );
}
