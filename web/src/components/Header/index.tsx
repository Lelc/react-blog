import React from "react";
import { Link } from "react-router-dom";

import logo from "../../assets/logo.svg";

const Header = () => {
  return (
    <header className="App-header">
      <div className="logo">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Blog</p>
      </div>
      <nav>
        <Link to="/">Posts</Link>
        <Link to="/create-post">Create Post</Link>
      </nav>
    </header>
  );
};

export default Header;
