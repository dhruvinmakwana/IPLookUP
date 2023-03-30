import styled, {css} from 'styled-components'
import { Map, Marker } from "pigeon-maps"
import {useState} from "react";
const ContainerDiv = styled.div`
    display: flex;
  width: 50%%;
  `;

export default function MapView(props) {
    const [hue, setHue] = useState(0)
    const color = `hsl(${hue % 360}deg 39% 70%)`

    return (

        <ContainerDiv>

            <Map defaultCenter={[50.879, 4.6997]} defaultZoom={11}>
                <Marker
                    width={50}
                    anchor={[50.879, 4.6997]}
                    color={color}
                    onClick={() => setHue(hue + 20)}
                />
                <Marker
                    width={50}
                    anchor={[50.879, 4.6997]}
                    color={color}
                    onClick={() => setHue(hue + 20)}
                >
                    {/*<CustomIcon />*/}
                </Marker>
            </Map>
        </ContainerDiv>);
}
