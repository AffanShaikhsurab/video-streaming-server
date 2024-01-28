import React from "react";
import "../Css/firstpage.css"; 

const firstpage = () => {
    return (
        <body>
        <div id="videoMetadataContainer"></div>
        <div className="container">
            <img
            className="background-image"
            src="public/assets/home.svg"
            alt="Wave background"
            />
            <nav id="menu">
            <a href="/index" title="Logo">
                <img className="logo" src="public/assets/media.svg" alt="Logo" />
            </a>
            </nav>
            <h1>Video Streaming Server</h1>
            <div className="links">
            <a href="http://localhost:5173">Home</a>
            </div>
        </div>
        </body>
    );
};

export default firstpage;
