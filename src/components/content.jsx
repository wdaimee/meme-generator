import React from 'react';

const Content = (props) => {
    return(
        <div className="content" ref={props.contentContainerRef}>
        {/* Image Preview */}
        <img src={props.activeImage} alt="meme" />

        {/* Text at the Top */}
        <h1>{props.textTop}</h1>

        {/* Text at the Bottom */}
        <h2>{props.textBottom}</h2>
      </div>
    )
}

export default Content;