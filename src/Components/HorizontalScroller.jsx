import React from "react";
import { FIREBASE_AUTH } from "../../firebase-config";

// Komponenten er udviklet fælles i gruppen.

// This component is a shell for the horizontal scrolling behaviour in the app.

const HorizontalScroller = (props) => {
  const userId = FIREBASE_AUTH.currentUser?.uid;

  return (
    <div className="horizontal-scroller">
      <h1>{props.scrollerTitle}</h1>
      <div className="media-scroller">{props.content}</div>
      {props.edit && props.delete && (
        <div className="hs-menu">
          {props.list.author == userId ? (
            <>
              <p>{props.edit}</p>
              <p onClick={() => props.handleDeleteList(props.list)}>{props.delete}</p>
            </>
          ) : (
            <>
              <p onClick={() => props.handleLeaveList(props.list)}>Leave list</p>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default HorizontalScroller;
