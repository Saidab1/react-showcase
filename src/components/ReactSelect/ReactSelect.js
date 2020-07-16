/** @jsx jsx */
import React from "react";
import chroma from "chroma-js";
import { css, jsx } from "@emotion/core";
import { stateOptions } from "./data";
import Select from "react-select";

const dot = (color = "#ccc") => ({
  alignItems: "center",
  display: "flex",

  ":before": {
    backgroundColor: color,
    borderRadius: 10,
    content: '" "',
    display: "block",
    marginRight: 8,
    height: 10,
    width: 10,
  },
});

const colourStyles = {
  menu: (styles) => ({ ...styles, width: 250, marginLeft: "42.5%" }),
  control: (styles) => ({
    ...styles,
    backgroundColor: "white",
    width: 250,
    margin: "auto",
  }),
  option: (styles, { data, isDisabled, isFocused, isSelected }) => {
    const color = chroma(data.color);
    return {
      ...styles,
      width: 250,
      margin: "auto",
      backgroundColor: isDisabled
        ? null
        : isSelected
        ? data.color
        : isFocused
        ? color.alpha(0.1).css()
        : null,
      color: isDisabled
        ? "#ccc"
        : isSelected
        ? chroma.contrast(color, "white") > 2
          ? "white"
          : "black"
        : data.color,
      cursor: isDisabled ? "not-allowed" : "default",

      ":active": {
        ...styles[":active"],
        backgroundColor:
          !isDisabled && (isSelected ? data.color : color.alpha(0.3).css()),
      },
    };
  },
  input: (styles) => ({ ...styles, width: 250, ...dot() }),
  placeholder: (styles) => ({ ...styles, ...dot() }),
  singleValue: (styles, { data }) => ({ ...styles, ...dot(data.color) }),
};

export default () => (
  <React.Fragment>
    <h2 css={{textAlign:"center", marginBottom:"20px", marginTop:"10px", fontWeight:"bold"}}>Select a State</h2>
    <Select
      defaultValue={stateOptions[2]}
      label="Single select"
      options={stateOptions}
      styles={colourStyles}
    />
  </React.Fragment>
);
