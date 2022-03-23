module.exports = function (app) {
    // Import node-fetch v2, new version gives trouble
    const fetch = require("node-fetch");

   // post request, to post the itunes media 
    app.post("/postitunes", (req, res) => {
      let url = req.body.url;  
      fetch(url)
        .then((res) => res.json())
        .then(
          (result) => {
            res.json({ message: result });
          },
          (error) => {
            console.log("Itunes API failed to load. Error is: " + error);
          }
        );
  
    });
  };