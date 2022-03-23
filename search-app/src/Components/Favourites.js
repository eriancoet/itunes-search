import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";

// function for the favourites component
function Favourites(props) {
  let favouriteArray = [];
  let favourite = [];

  // Only display favourites if there actually are favourites clicked
  if (props.newFavourite.length !== 0) {
    favouriteArray = props.newFavourite;

    // For loop to push the favourites
    for (let i = 0; i <= favouriteArray.length - 1; i++) {
      favourite.push(
        <div className="FDiv" key={i}>
          <div className="deleteButton">
            <button
              type="button"
              variant="light"
              onClick={() => props.deleteFavourite(i)}
            >
              &nbsp;
            </button>
          </div>
          <ul key={i}>
            <li><strong>Track Name:</strong> {favouriteArray[i].track}</li>
            <li><strong>Artist Name:</strong> {favouriteArray[i].artist}</li>
            <li><strong>Collection:</strong> {favouriteArray[i].collection}</li>
            <li><strong>Media Type:</strong> {favouriteArray[i].kindOfMedia}</li>
          </ul>

        </div>
      );
    }

  } else {
    favourite = (
      <p className="greyP">Click on Add favourites in the results tab...</p>
    );
  }
// Return to display the logic on the clientside.
  return (
    <div className="favourites">
      <div className="FTitle">
        <h2>Favourites</h2>
      </div>
      {favourite}
    </div>
  );
}

export default Favourites;