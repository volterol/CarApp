import React from "react";
import logo from './carbook-logo-resized.png';
import './Header.css';

const Header = ({ onRouteChange, isSignedIn, name }) => {
  return (
      <header className="flex justify-between items-center w-full font-sans text-lg bg-white shadow-md p-4">
          <div className="flex-grow flex justify-start items-center">
              <Image src={logo} alt="logo" width={150} height={50} />
          </div>
          <div className="flex-grow-[2]"></div>
          <div className="flex-grow">
              <nav className="flex justify-end items-center pr-8">
                  {isSignedIn ? (
                      <>
                          <div className="text-sm mr-4">{`Logged in as ${name}`}</div>
                          <div className="cursor-pointer px-5 py-2.5 hover:text-blue-600" onClick={() => onRouteChange('signout')}>Sign Out</div>
                      </>
                  ) : (
                      <>
                          <div className="cursor-pointer px-5 py-2.5 hover:text-blue-600" onClick={() => onRouteChange('signin')}>Sign In</div>
                          <div className="cursor-pointer px-5 py-2.5 hover:text-blue-600" onClick={() => onRouteChange('register')}>Register</div>
                      </>
                  )}
              </nav>
          </div>
      </header>
  )
}

export default Header