import React from "react";

const HorizontalScroller = (props) => {
  return (
    <div>
      <h1>{props.scrollerTitle}</h1>
      <div className="media-scroller">{props.content}</div>
    </div>
  );
};

export default HorizontalScroller;
