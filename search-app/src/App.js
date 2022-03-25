import React from "react";
import Favourites from "./Components/Favourites";
import DisplayResults from "./Components/Display";
import Header from "./Components/TopBar";
import getSafe from "./Components/getSafe";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

// App Component
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      formSubmitted: false,
      items: {},
      resultsArray: [],
      resultsLoaded: false,

      // Defaults
      searchTerm: "artist name",
      mediaType: "all",
      newUrl: null,

      favourite: [],
    };

    // this - binding 
    this.componentDidMount = this.componentDidMount.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangeSearchTerm = this.handleChangeSearchTerm.bind(this);
    this.handleChangeMediaType = this.handleChangeMediaType.bind(this);

    this.sortData = this.sortData.bind(this);
    this.fetchAgain = this.fetchAgain.bind(this);
    this.handleFavourite = this.handleFavourite.bind(this);
    this.deleteFavourite = this.deleteFavourite.bind(this);
  }

  handleFavourite(track, artist, collection, kindOfMedia) {
    let fav = {
      track: track,
      artist: artist,
      collection: collection,
      kindOfMedia: kindOfMedia,
    };

    this.state.favourite.push(fav);
    this.setState(
      {
        favourite: this.state.favourite,
      },
    );
  }

// Submit handler goes here
  handleSubmit(event) {
    let searchTerm = this.state.searchTerm;
    let mediaType = this.state.mediaType;
    let editedSearchTerm = searchTerm.replace(" ", "+");
    let url = `https://itunes.apple.com/search?term=${editedSearchTerm}&media=${mediaType}&limit=5`;

    this.setState(
      {
        newUrl: url,
        resultsLoaded: false,
      },
      () => {
        console.log("New url saved to state: " + this.state.newUrl);
        this.fetchAgain();
      }
    );
  }
// Change term
  handleChangeSearchTerm(event) {
    // Add form data to state variable
    this.setState(
      {
        searchTerm: event.target.value,
      },
      () => console.log("Search term is: " + this.state.searchTerm)
    );
  }

// Change type
  handleChangeMediaType(event) {
    this.setState(
      {
        mediaType: event.target.value,
      },
      () => console.log("Media type is: " + this.state.mediaType)
    );
  }
  deleteFavourite(index) {
    let favs = this.state.favourite;
    favs.splice(index, 1);

    this.setState(
      { favourite: favs },
      console.log("Favourite has been deleted from state.")
    );
  }

  // Function to create results to display
  sortData() {
    let results = [];
    let array = [];
    let initialArray = [];

    if (this.state.resultsLoaded === false) {
      initialArray = Object.entries(this.state.items);

      array = initialArray[1][1];

      if (array.length === 0) {
        return <p className="RText">Nothing yet, try another search...</p>;
      }
      for (let i = 0; i <= array.length - 1; i++) {
     
        let imgSource = "";
        let track = "";
        let artist = "";
        let collection = "";
        let kindOfMedia = "";

        if (<getSafe request={() => array[i].artworkUrl100} /> === undefined) {
          imgSource = "No artwork given";
        } else {
          imgSource = array[i].artworkUrl100;
        }

        if (<getSafe request={() => array[i].trackName} /> === undefined) {
          track = "No track name given";
        } else {
          track = array[i].trackName;
        }

        if (<geSafe request={() => array[i].artistName} /> === undefined) {
          artist = "No artist name given";
        } else {
          artist = array[i].artistName;
        }

        if (<getSafe request={() => array[i].collectionName} /> === undefined) {
          collection = "No collection name given";
        } else {
          collection = array[i].collectionName;
        }

        if (<getSafe request={() => array[i].kind} /> === undefined) {
          kindOfMedia = "No collection name given";
        } else {
          kindOfMedia = array[i].kind;
        }

    // Results, add to the mix...
        results.push(
          <div className="resultsListItem" key={i}>
            <img src={imgSource} alt="Album Art" className="artworkImg" />

            <div className="ulListDiv">
              <ul>
                <li>
                  {" "}
                  <b>Track Name:</b> {track}{" "}
                </li>
                <li>
                  {" "}
                  <b>Artist Name:</b> {artist}{" "}
                </li>
                <li>
                  {" "}
                  <b>Collection Name:</b> {collection}{" "}
                </li>
                <li>
                  {" "}
                  <b>Kind of Media:</b> {kindOfMedia}{" "}
                </li>
              </ul>
            </div>

            <Button
              variant="light"
              type="button"
              onClick={() =>
                this.handleFavourite(track, artist, collection, kindOfMedia)
              }
            >
              Add Favourite
            </Button>
          </div>
        );
      }
      this.setState({ resultsArray: results, resultsLoaded: true }, () =>
        console.log("Sortdata function has run. Results Array saved in state.")
      );
    }
  }
  fetchAgain() {
    let newUrl = this.state.newUrl;

    fetch("/postitunes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        url: newUrl,
      }),
    })
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState(
            {
              resultsLoaded: false,
              isLoaded: true,
              items: result.message,
            },
            () => {
              this.sortData();
            }
          );
        },
        (error) => {
          this.setState(
            {
              resultsLoaded: false,
              isLoaded: true,
              error,
            },
            () => console.log("Media fetch failed with the error: " + error)
          );
        }
      );
  }
// componentDidMount function
  componentDidMount() {
    if (this.state.isLoaded === false) {
      console.log("First fetch has run.");
      fetch("/getitunes")
        .then((res) => res.json())
        .then(
          (result) => {
            this.setState(
              {
                isLoaded: true,
                items: result.message,
              },
              () => {
                this.sortData();
              }
            );
          },
          (error) => {
            this.setState({
              isLoaded: true,
              error,
            });
          }
        );
    }
  }

  // Render it all
  render() {
    const { error, isLoaded, searchTerm, mediaType, resultsArray, favourite } =
      this.state;

    if (error) {
      return <div> Error: {error.message} </div>;

    } else if (!isLoaded) {
      return <div> Loading... </div>;

    } else {
      return (
        <div className="app">
          <Header
            handleSubmit={this.handleSubmit}
            handleChangeSearchTerm={this.handleChangeSearchTerm}
            handleChangeMediaType={this.handleChangeMediaType}
          />

          <div className="mainPage">
          <Favourites
              newFavourite={favourite}
              deleteFavourite={this.deleteFavourite}
            />

          <DisplayResults
              searchTerm={searchTerm}
              mediaType={mediaType}
              resultsArray={resultsArray}
            />
          </div>
        </div>
      );
    }
  }
}

export default App;