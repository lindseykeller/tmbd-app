import React from "react";
import Hamburger from "./Hamburger";
import Movie from "./Movie";
const Header = () => {
 
  return (
    <>
      <header>
        <div className="navbar">
            <h2>Film Finder</h2>
          <a href="#home">Movies</a>
          <a href="#news">TV</a>
          <div className="dropdown">
            <button className="dropbtn">
                <Hamburger />
            </button>
            <div className="dropdown-content">
              <div className="header">
  
              </div>
              <div className="row">
                <div className="column">
                  <a href="">Movies</a>
            
                </div>
                <div className="column">
                <a href="">Series</a>
                  
                </div>
                <div className="column">
                <a href="">A-Z</a>
               
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header