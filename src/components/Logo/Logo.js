import React from "react";
import Tilt from 'react-parallax-tilt';
import logo from './logo_transparent.png';
import './Logo.css';

const Logo = () => {
    return (
       <div className="ma4 mt0">
        <Tilt className="Tilt br2 shadow-2" options={{ max:25}} style={{ height: 150, width: 150}} >
            <div className="Tilt-inner pa3">
                <img  alt='logo' src={logo}/>
            </div>
        </Tilt>
       </div>
    );
}

export default Logo;
