import styled, {css} from "styled-components";
import useIPLookUPStore from "../../../state/State";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SearchIcon from "@mui/icons-material/Search";
import {useState, createRef, useEffect} from "react";
import CircleIcon from "@mui/icons-material/Circle";
import Switch from "@mui/material/Switch";
import {FormControlLabel} from "@mui/material";

const Div = styled.div`
  display: flex;
  justify-content: center;
  column-gap: 10px;
`;
export default function IPInput(props) {
    const ipInputs = useIPLookUPStore((state) => state.ipInputs);
    const multiInputType = useIPLookUPStore((state) => state.multiInputType);
    const activeInput = useIPLookUPStore((state) => state.activeInput);
    const setIPInputValue = useIPLookUPStore((state) => state.setIPInputValue);
    const setBulkIPInputValue = useIPLookUPStore((state) => state.setBulkIPInputValue);
    const setInputType = useIPLookUPStore((state) => state.setInputType);
    const setFocusedIPInput = useIPLookUPStore((state) => state.setFocusedIPInput);
    const fetchIPDetailsFromAPI = useIPLookUPStore((state) => state.fetchIPDetailsFromAPI);

    const [inputRefsArray] = useState(() => Array.from({length: ipInputs.length}, () => createRef()));

    const inputLabel = {inputProps: {"aria-label": "Switch demo"}};

    function goToNextField() {
        inputRefsArray[activeInput + 1]?.current.focus();
        setFocusedIPInput(activeInput + 1);
    }

    function onChangeHandler(e) {
        if (e.currentTarget.value.length === 3) {
            goToNextField();
        } else {
            setIPInputValue(e.currentTarget.value);
        }
    }

    function onKeyDownHandler(e) {
        if (e.keyCode === 110 || e.keyCode === 190) {
            if (ipInputs[activeInput]?.length > 0) {
                goToNextField();
            }
            e.preventDefault();
        }
    }

    return (<div>
            <Div>
                <FormControlLabel
                    control={<Switch
                        {...inputLabel}
                        onChange={(e) => setInputType(e.target.checked)}
                    />}
                    labelPlacement="start"
                    label="Enable multi IP input?"
                />
            </Div>
            <Div>
                {!multiInputType ? (<>
                        {inputRefsArray.map((ref, index) => (<>
                                <TextField
                                    key={index}
                                    variant="outlined"
                                    inputRef={ref}
                                    required
                                    onChange={onChangeHandler}
                                    onFocus={() => setFocusedIPInput(index)}
                                    onKeyDown={onKeyDownHandler}
                                    focused={activeInput === index}
                                    autoComplete="off"
                                    inputProps={{
                                        inputMode: "numeric", pattern: "[0-9]*", maxLength: 3,    autoComplete: 'new-password', style: {
                                            width: 30, textAlign: "center"
                                        },
                                    }}
                                />
                                {index < ipInputs.length - 1 ? (<CircleIcon
                                        sx={{fontSize: 10}}
                                        style={{margin: "auto 0"}}
                                    />) : (<></>)}
                            </>))}
                        <Button
                            variant="outlined"
                            onClick={fetchIPDetailsFromAPI}
                            disabled={ipInputs.some((elm) => elm === "")}
                        >
                            <SearchIcon sx={{fontSize: 30}}/>
                        </Button>
                    </>) : (<>
                        <TextField
                            variant="outlined"
                            required
                            onChange={(e) => setBulkIPInputValue(e.currentTarget.value)}
                            multiline
                            inputProps={{
                                autoComplete:"new-password",
                            style: {
                                width: "85%"
                            }
                        }}
                            style={{width:"85%"}}
                            autoComplete="off"
                            placeholder={"Enter comma seperated IP address values."}
                        />
                        <Button
                            variant="outlined"
                            onClick={fetchIPDetailsFromAPI}
                            inputProps={{
                                style: {
                                    height: 5,

                                },
                            }}
                        >
                            <SearchIcon sx={{fontSize: 30}}/>
                        </Button>
                    </>)}
            </Div>
        </div>);
}