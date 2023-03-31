import styled from "styled-components";
import useIPLookUPStore from "../../state/State";
import IPInput from "./Components/IPInput";
import IPDetails from "./Components/IPDetails";
import MapView from "./Components/Map";
import Grid from "@mui/material//Grid";
import useMediaQuery from "@mui/material/useMediaQuery";

const Div = styled.div`
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
`;
const MessageDiv = styled.div`
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
`;
export default function Home() {
  const IPQueryResults = useIPLookUPStore((state) => state.IPQueryResults);
  const matches = useMediaQuery("(max-width:600px)");
  let message;
  if (IPQueryResults.length === 0) {
    message = "Please enter a valid IP address to begin.";
  }

  return (
    <Div>
      <div>
        <IPInput></IPInput>
      </div>

      {IPQueryResults.length > 0 ? (
        matches ? (
          <>
            <Grid
              container
              style={{
                height: "100%",
                paddingTop: "10px",
                flexWrap: "wrap-reverse",
                justifyContent: "center",
              }}
            >
              <Grid item xs={12} sm={8}>
                <MapView className="IP-map-view"></MapView>
              </Grid>
            </Grid>
            <IPDetails className="IP-details-view"></IPDetails>
          </>
        ) : (
          <Grid container style={{ height: "100%", paddingTop: "10px" }}>
            <Grid item xs={0} sm={4}>
              <IPDetails className="IP-details-view"></IPDetails>
            </Grid>
            <Grid item xs={12} sm={8}>
              <MapView className="IP-map-view"></MapView>
            </Grid>
          </Grid>
        )
      ) : (
        <MessageDiv>
          <h3>{message}</h3>
        </MessageDiv>
      )}
    </Div>
  );
}
