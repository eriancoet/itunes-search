const express = require("express");
const path = require("path");
const cluster = require("cluster");
const numCPUs = require("os").cpus().length;

const bodyParser = require("body-parser");
// Helmet for security
//const helmet = require("helmet");
const isDev = process.env.NODE_ENV !== "production";
// Port 3000
const PORT = process.env.PORT || 3000;

if (!isDev && cluster.isMaster) {
  console.error(`Node cluster master ${process.pid} is running`);

  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker, code, signal) => {
    console.error(
      `Node cluster worker ${worker.process.pid} exited: code ${code}, signal ${signal}`
    );
  });
} else {
  const app = express();

  /*app.use(
    helmet({
      contentSecurityPolicy: false,
    })
  );
  */
// Body Parser
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

// routes require
  require("./Routes/getitunes.js")(app);
  require("./Routes/postitunes.js")(app);

  app.get("/api", function (req, res) {
    res.set("Content-Type", "application/json");
    res.send('{"message":"Hello World!"}');
  });
  
app.use(express.static(path.join(__dirname, 'search-app/build')));

app.get("*", function (request, response) {
    response.sendFile(
      path.resolve(__dirname, "search-app", "build", "index.html")
    );
  });

  app.listen(PORT, function () {
    console.error(
      `Node ${
        isDev ? "dev server" : "cluster worker " + process.pid
      }: listening on port ${PORT}`
    );
  });
}