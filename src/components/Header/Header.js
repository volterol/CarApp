import React from "react";

const Header = ({ onRouteChange, isSignedIn, name }) => {
  return (
      <header className="flex justify-between items-center w-full font-sans text-lg p-4">
          <div className="flex-grow flex justify-start items-center font-semibold text-4xl text-emerald-950 leading-snug tracking-tighter">
              Carpp
          </div>
          <div className="flex-grow-[2]"></div>
          <div className="flex-grow">
              <nav className="flex justify-end items-center pr-8 space-x-1.5">
                  {isSignedIn ? (
                      <>
                         <div className="text-sm mr-4">{`Logged in as ${name}`}</div>
                         <div className="cursor-pointer px-5 py-2.5 hover:text-blue-600" 
                            onClick={() => onRouteChange('signout')}>Sign Out
                         </div>
                      </>
                  ) : (
                      <>
                         <div 
                            className="cursor-pointer text-emerald-950 text-sm font-semibold border-2 rounded px-5 py-2.5 hover:bg-stone-200 " 
                            onClick={() => onRouteChange('signin')}
                            >Sign In
                         </div>
                         <div 
                            className="cursor-pointer text-white text-sm font-semibold px-5 py-2.5 rounded bg-green-950 hover:bg-emerald-700 " 
                            onClick={() => onRouteChange('register')}
                            >Register
                         </div>
                      </>
                  )}
              </nav>
          </div>
      </header>
  )
}

export default Header