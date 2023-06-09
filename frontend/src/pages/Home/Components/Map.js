import styled from "styled-components";
import { Map, Marker } from "pigeon-maps";
import { useState } from "react";
import useIPLookUPStore from "../../../state/State";

const ContainerDiv = styled.div`
  display: flex;
  height: 100%;
  flex: 6;
`;
const MessageDiv = styled.div`
  display: flex;
  height: 100%;
  justify-content: center;
  flex: 6 1 0%;
  align-items: center;
  text-align: center;
`;

export default function MapView() {
  const [hue, setHue] = useState(0);
  const color = `hsl(${hue % 360}deg 39% 70%)`;
  const selectedIP = useIPLookUPStore((state) => state.selectedIP);
  let center = [50.879, 4.6997];
  let message = "Select any search results to view the location on the map.";
  if (selectedIP?.location?.latitude && selectedIP?.location?.longitude) {
    center = [
      Number(selectedIP?.location?.latitude),
      Number(selectedIP?.location?.longitude),
    ];
  }
  return (
    <ContainerDiv>
      {selectedIP?.location ? (
        <Map center={center} defaultZoom={11} animate={true}>
          <Marker
            width={50}
            anchor={[
              Number(selectedIP?.location?.latitude),
              Number(selectedIP?.location?.longitude),
            ]}
            color={color}
            onClick={() => setHue(hue + 20)}
          />
          <Marker
            width={50}
            anchor={[
              Number(selectedIP?.location?.latitude),
              Number(selectedIP?.location?.longitude),
            ]}
            color={color}
            onClick={() => setHue(hue + 20)}
          >
            {/*<CustomIcon />*/}
          </Marker>
        </Map>
      ) : (
        <MessageDiv>
          <h3>{message}</h3>
        </MessageDiv>
      )}
    </ContainerDiv>
  );
}
