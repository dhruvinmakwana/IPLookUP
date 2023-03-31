import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Typography from "@mui/material/Typography";
import Clock from "react-live-clock";
import AccordionDetails from "@mui/material/AccordionDetails";
import PublicIcon from "@mui/icons-material/Public";
import { countries } from "country-data";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import MarkunreadMailboxIcon from "@mui/icons-material/MarkunreadMailbox";
import PlaceIcon from "@mui/icons-material/Place";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ShareLocationIcon from "@mui/icons-material/ShareLocation";
import * as React from "react";
import useIPLookUPStore from "../../../state/State";
import styled from "styled-components";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import Flag from "react-world-flags";

const H3 = styled.h3`
  margin: 0;
`;

const H4 = styled.h4`
  margin: 0;
`;

const Div = styled.div`
  justify-content: left;
  gap: 10px;
  display: flex;
  align-items: center;
`;

const LocateOnMap = styled.div`
  position: absolute;
  top: 13px;
  right: 30px;
`;

const AccordianContainer = styled.div`
  position: relative;
`;

export default function IPAccordion(props) {
  const locateMe = (detail) => {
    props.drawerHandler(false);
    setSelectedIP(detail);
    // e.preventDefault();
  };

  const setSelectedIP = useIPLookUPStore((state) => state.setSelectedIP);

  return (
    <AccordianContainer>
      <Accordion onClick={() => !props.mobile && setSelectedIP(props.detail)}>
        <AccordionSummary
          style={{ justifyContent: "space-between" }}
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          className={`IP-details ${props.mobile ? "mobile" : ""}`}
        >
          <Typography>
            <H3>IP Address: {props?.detail?.ip_address ?? "Not available"}</H3>
            <br />
            <H4>
              Local Time:{" "}
              <Clock
                format={"HH:mm:ss"}
                ticking={true}
                timezone={props.detail.location.time_zone}
              />
            </H4>
          </Typography>
          <Flag
            code={props.detail.country_code}
            height="32"
            fallback={<span>Unknown</span>}
          />
        </AccordionSummary>
        <AccordionDetails>
          <Div>
            <PublicIcon />
            <b className="property">Country:</b>
            <span>
              {countries[props.detail.country_code].name}(
              {props?.detail?.country_code ?? "Not available"})
            </span>
          </Div>
          <Div>
            <LocationCityIcon />
            <b className="property">City:</b>
            <span>{props?.detail?.city_name ?? "Not Available"}</span>
          </Div>
          <Div>
            <MarkunreadMailboxIcon />
            <b className="property">Postal code:</b>
            <span>{props?.detail?.postal_code ?? "Not available"}</span>
          </Div>
          <Div>
            <PlaceIcon /> <b className="property">Longitude , Latitude:</b>
            <span>
              {props?.detail?.location?.longitude &&
              props?.detail?.location?.latitude
                ? props?.detail?.location?.longitude +
                  " , " +
                  props?.detail?.location?.latitude
                : "Not available"}
            </span>
          </Div>
          <Div>
            <AccessTimeIcon />
            <b className="property">Timezone:</b>
            <span> {props?.detail?.location.time_zone ?? "Not available"}</span>
          </Div>
          <Div>
            <ShareLocationIcon />
            <b className="property">Accuracy radius:</b>
            <span>
              {" "}
              {props?.detail?.location.accuracy_radius ?? "Not available"}
            </span>
          </Div>
        </AccordionDetails>
      </Accordion>
      {props.mobile ? (
        <LocateOnMap
          onClick={() => locateMe(props.detail)}
          tooltip={"locate on map"}
        >
          <MyLocationIcon />
        </LocateOnMap>
      ) : (
        <></>
      )}
    </AccordianContainer>
  );
}
