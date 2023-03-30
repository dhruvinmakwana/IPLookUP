import styled, {css} from 'styled-components'
import TextField from '@mui/material/TextField';
import useIPLookUPStore from '../../state/State';
import IPInput from "./Components/IPInput";
import IPDetails from "./Components/IPDetails";
import MapView from "./Components/Map";

export default function Home(props) {

    const Div = styled.div`
      justify-content: center;
      display: flex;
      align-items: center;
    `
    return (

        <div>

            <div>
                <IPInput></IPInput>
            </div>
            <Div>
                <IPDetails className="IP-details-view"></IPDetails>
                <MapView className="IP-map-view"></MapView>
            </Div>
        </div>);
}
