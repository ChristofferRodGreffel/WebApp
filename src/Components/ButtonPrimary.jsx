import React from "react";

export const ButtonPrimary = (props) => {
  return (
    <button type={props.type} disabled={props.disabled} onClick={props.function} className="button-primary">
      {props.content}
      {props.icon}
    </button>
  );
};
