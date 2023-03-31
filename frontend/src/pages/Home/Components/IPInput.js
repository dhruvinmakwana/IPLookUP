import styled from "styled-components";
import useIPLookUPStore from "../../../state/State";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SearchIcon from "@mui/icons-material/Search";
import { useState, createRef, useEffect } from "react";
import Switch from "@mui/material/Switch";
import { FormControlLabel } from "@mui/material";

const Div = styled.div`
  display: flex;
  justify-content: center;
  column-gap: 10px;
`;

export default function IPInput() {
  const ipInputs = useIPLookUPStore((state) => state.ipInputs);
  const bulkIpInputs = useIPLookUPStore((state) => state.bulkIpInputs);
  const multiInputType = useIPLookUPStore((state) => state.multiInputType);
  const activeInput = useIPLookUPStore((state) => state.activeInput);
  const setIPInputValue = useIPLookUPStore((state) => state.setIPInputValue);
  const setBulkIPInputValue = useIPLookUPStore(
    (state) => state.setBulkIPInputValue
  );
  const setInputType = useIPLookUPStore((state) => state.setInputType);
  const setFocusedIPInput = useIPLookUPStore(
    (state) => state.setFocusedIPInput
  );
  const fetchIPDetailsFromAPI = useIPLookUPStore(
    (state) => state.fetchIPDetailsFromAPI
  );

  const [inputRefsArray] = useState(() =>
    Array.from({ length: ipInputs.length }, () => createRef())
  );

  const inputLabel = { inputProps: { "aria-label": "Switch demo" } };

  function goToNextField() {
    inputRefsArray[activeInput + 1]?.current.focus();
    setFocusedIPInput(activeInput + 1);
  }

  function onChangeHandler(e) {
    setIPInputValue(e.currentTarget.value);
    if (e.currentTarget.value.length === 3) {
      goToNextField();
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
  function handleFocus(e,index) {
    e.target.select()
    setFocusedIPInput(index)
  }
  return (
    <div>
      <Div>
        <FormControlLabel
          control={
            <Switch
              {...inputLabel}
              onChange={(e) => setInputType(e.target.checked)}
            />
          }
          labelPlacement="start"
          label="Want to enter multiple IPs?"
        />
      </Div>
      <Div>
        {!multiInputType ? (
          <>
            {inputRefsArray.map((ref, index) => (
              <>
                <TextField
                  key={`input-${index}`}
                  variant="outlined"
                  inputRef={ref}
                  id={`field-${index}`}
                  required
                  onChange={onChangeHandler}
                  onFocus={(e) => handleFocus(e,index)}
                  onKeyDown={onKeyDownHandler}
                  focused={activeInput === index}
                  autoComplete="off"
                  inputProps={{
                    inputMode: "numeric",
                    pattern: "[0-9]*",
                    maxLength: 3,
                    autoComplete: "new-password",
                    form: {
                      autoComplete: "new-password",
                    },
                    style: {
                      width: 30,
                      textAlign: "center",
                    },
                  }}
                />
                {index < ipInputs.length - 1 ? (
                  <img
                    src="/images/circle.svg"
                    key={`icon-${index}`}
                    style={{ width: "10px" }}
                  />
                ) : (
                  <></>
                )}
              </>
            ))}
            <Button
              variant="outlined"
              onClick={() => fetchIPDetailsFromAPI()}
              disabled={ipInputs.some((elm) => elm === "")}
            >
              <SearchIcon sx={{ fontSize: 30 }} />
            </Button>
          </>
        ) : (
          <>
            <TextField
              variant="outlined"
              required
              value={bulkIpInputs}
              onChange={(e) => setBulkIPInputValue(e.currentTarget.value)}
              multiline
              sx={{
                "& .MuiInputBase-input": {
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                },
              }}
              inputProps={{
                autoComplete: "new-password",
                form: {
                  autoComplete: "new-password",
                },
                style: {
                  width: "85%",
                },
              }}
              style={{ width: "85%" }}
              autoComplete="off"
              placeholder={"Enter comma seperated IP address values."}
            />
            <Button
              variant="outlined"
              onClick={() => fetchIPDetailsFromAPI(true)}
              disabled={bulkIpInputs.length === 0}
            >
              <SearchIcon sx={{ fontSize: 30 }} />
            </Button>
          </>
        )}
      </Div>
    </div>
  );
}
