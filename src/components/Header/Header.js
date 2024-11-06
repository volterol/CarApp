import React from "react";
import logo from './carbook-logo-resized.png';
import './Header.css';

const Header = ({ onRouteChange, isSignedIn, name }) => {
    if (isSignedIn) {
      return (
        
        <header>
          <div className="header-left-container">
              <img alt='logo' src={logo}/>
          </div>
          <div className="header-centre-container"></div>
          <div className="header-right-container">
            <nav>
              <div className="f6"><p>{`Logged in as ${name}`}</p></div>
              <div className="link"><p onClick={() => onRouteChange('signout')}>Sign Out</p></div>
            </nav>
          </div>
        </header>
      );
    } else {
      return (
        <header>
          <div className="header-left-container">
              <img alt='logo' src={logo}/>
          </div>
          <div className="header-centre-container"></div>
          <div className="header-right-container">
            <nav className="header-nav">
              <div className="nav-item link"><p onClick={() => onRouteChange('signin')}>Sign In</p></div>
              <div className="nav-item link"><p onClick={() => onRouteChange('register')}>Register</p></div>
            </nav>
          </div>
        </header>
      );
    }
}

export default Header;