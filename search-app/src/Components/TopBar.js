import React from "react";
import logo from "../itunes-logo.jpeg";
import SearchBox from "./SearchBox";
import "../App.css";

// Function to display header for page. Includes search form component
function Header(props) {
  return (
    <header className="header">
      <img src={logo} className="logo" alt="logo" />
            <SearchBox
        handleSubmit={props.handleSubmit}
        handleChangeSearchTerm={props.handleChangeSearchTerm}
        handleChangeMediaType={props.handleChangeMediaType}
      />
    </header>
  );
}

export default Header;