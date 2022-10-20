import React from "react";

const ResponseDisplay =  (props) => {
    return(
        <div className="responseDisplayDiv">
            <h1>{props.contentTitle}</h1>
            <code>
                {props.displayContent}
            </code>
         </div>
    )
}

export default ResponseDisplay;