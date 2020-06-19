import React from "react";
import logo from "../../assets/logo.svg";

const Header = () => {
  return (
    <header className="App-header">
      <p>
        <img src={logo} className="App-logo" alt="logo" /> Blog
      </p>
    </header>
  );
};

export default Header;
