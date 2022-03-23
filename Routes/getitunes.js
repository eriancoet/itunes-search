module.exports = function (app) {
    // Import node-fetch v2, the new version has some issues
    const fetch = require("node-fetch");
  
// get request url with itunes api
    app.get("/getitunes", (req, res) => {
      let url = "https://itunes.apple.com/search?term=jack+johnson&limit=10";
  
      fetch(url)
        .then((res) => res.json())
        .then(
          (result) => {
            res.json({ message: result });
          },
          (error) => {
            console.log("Get request failed. Error is: " + error);
          }
        );
  
    });
  };