/** @jsx jsx */
/** @jsxFrag */

import React from "react";
import { jsx } from "theme-ui";

interface ButtonProps {
  children: React.ReactNode;
  url?: string;
  options?: {
    color?: string;
    type?: string;
  };
}
const Button: React.FC<ButtonProps> = (props) => {
  // "& button:nth-of-type(even)": {
  //   bg: "transparent",
  //   border: "1px solid var(--theme-ui-colors-primary)",
  //   color: "primary",
  // },
  // "& button:nth-of-type(odd)": {
  //   bg: "primary",
  //   color: "background",
  //   border: "none",
  // }

  const bg = props?.options?.color
    ? {
        bg: props.options.color,
        color: "background",
        border: "none",
      }
    : {
        bg: "transparent",
        border: "1px solid var(--theme-ui-colors-primary)",
        color: "primary",
      };

  const style = {
    textDecoration: "none",
    fontSize: "1em",
    display: "inline-block",
    textAlign: "center",
    fontWeight: "600",
    verticalAlign: "middle",
    borderRadius: "5px",
    padding: "0.5em 1em",
    margin: "0.5em 0.5em 0 0",
    cursor: "pointer",
    ...bg,
    "&:hover": {
      opacity: 0.8,
    },
  };

  if (!props.url && props.options?.type === "submit") {
    return (
      <button
        sx={{
          ...style,
        }}
        type="submit"
      >
        {props.children}
      </button>
    );
  }

  return (
    <a
      sx={{
        ...style,
      }}
      href={props.url}
    >
      {props.children}
    </a>
  );
};

export default Button;
