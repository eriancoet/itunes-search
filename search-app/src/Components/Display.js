import React from "react";
import "../App.css";

// DisplayResults Component
function DisplayResults(props) {
  return (
    <div className="result">
      <h2>Search Results</h2>
      <p>
        Search term: <b>{props.searchTerm}</b>, Media type:{" "}
        <b>{props.mediaType}</b>
      </p>
      {props.resultsArray}
    </div>
  );
}
export default DisplayResults;