import styled, { css } from "styled-components";

import "react-toastify/dist/ReactToastify.css";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import useIPLookUPStore from "../../../state/State";
import Flag from "react-world-flags";
import PublicIcon from "@mui/icons-material/Public";
import { countries } from "country-data";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import Clock from "react-live-clock";
import MapIcon from "@mui/icons-material/Map";
import MarkunreadMailboxIcon from "@mui/icons-material/MarkunreadMailbox";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import ShareLocationIcon from "@mui/icons-material/ShareLocation";
import PlaceIcon from "@mui/icons-material/Place";

const Div = styled.div`
  display: flex;
  justify-content: center;
  column-gap: 10px;
`;
const H3 = styled.h3`
  margin: 0;
`;
const H4 = styled.h4`
  margin: 0;
`;
export default function IPDetails() {
  const IPQueryResults = useIPLookUPStore((state) => state.IPQueryResults);
  const setSelectedIP = useIPLookUPStore((state) => state.setSelectedIP);
  const Div = styled.div`
    justify-content: left;
    gap: 10px;
    display: flex;
    align-items: center;
  `;

  const ContainerDiv = styled.div`
    display: flex;
    width: 50%%;
  `;

  return (

      <ContainerDiv>
        {IPQueryResults.map((detail, index) => (
          <Accordion onClick={()=>setSelectedIP(detail)}>
            <AccordionSummary
              style={{ justifyContent: "space-between" }}
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              class="IP-details"
              on
            >
              <Typography>
                <H3>IP Address: {detail.ip_address}</H3>
                <br />
                <H4>
                  Local Time:{" "}
                  <Clock
                    format={"HH:mm:ss"}
                    ticking={true}
                    timezone={detail.location.time_zone}
                  />
                </H4>
              </Typography>
              <Flag
                code={detail.country_code}
                height="32"
                fallback={<span>Unknown</span>}
              />
            </AccordionSummary>
            <AccordionDetails>
              <Div>
                <PublicIcon /><b className="property">Country:</b>
                <span>
                  {countries[detail.country_code].name}({detail.country_code})
                </span>
              </Div>
              <Div>
                  <LocationCityIcon /><b className="property" >City:</b> <span>{detail.city_name}</span>
              </Div>
              <Div>
                  <MarkunreadMailboxIcon /><b className="property" >Postal code:</b> <span>{detail.postal_code}</span>
              </Div>
              <Div>
                <PlaceIcon /> <b className="property" >Longitude/Latitude:</b>
                <span>
                  {detail.location.longitude} {detail.location.latitude}
                </span>
              </Div>
              <Div>
                <AccessTimeIcon /><b className="property" >Timezone:</b>
                  <span> {detail.location.time_zone}</span>
              </Div>
              <Div>
                <ShareLocationIcon /><b className="property" >Accuracy radius:</b>
                <span> {detail.location.accuracy_radius}</span>
              </Div>
            </AccordionDetails>
          </Accordion>
        ))}
      </ContainerDiv>

  );
}
