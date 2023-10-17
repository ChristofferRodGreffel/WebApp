import React from "react";

export const ButtonPrimary = (props) => {
  return (
    <button type={props.type} disabled={props.disabled} className="button-primary">
      {props.content}
    </button>
  );
};
