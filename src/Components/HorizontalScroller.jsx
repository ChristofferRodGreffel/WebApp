import React from "react";

// Komponenten er udviklet fælles i gruppen.

// This component is a shell for the horizontal scrolling behaviour in the app.

const HorizontalScroller = (props) => {
  return (
    <div className="horizontal-scroller">
      <h1>{props.scrollerTitle}</h1>
      <div className="media-scroller">{props.content}</div>
      <div className="hs-menu">
        <p>{props.edit}</p>
        <p onClick={() => props.handleDeleteList(props.list)}>{props.delete}</p>
      </div>
    </div>
  );
};

export default HorizontalScroller;
