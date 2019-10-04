const express = require("express");
const https = require("https");

const { bloggersIds } = require("./data");

const { YOUTUBE_API } = process.env;

const app = express();

app.use(express.static(__dirname + "/dist"));

app.get("/", (req, res) => {
  res.sendFile("index.html", { root: __dirname });
});

app.get("/api/votes", (req, res) => {
  const ids = bloggersIds.join(",");

  https
    .get(
      "https://testnet1.wavesnodes.com/addresses/data/3NCNoPsUGinvErayNYFzNfDYSbDA8gFzA3d",
      apiRes => {
        apiRes.setEncoding("utf8");

        // wait for data
        apiRes.on("data", function(chunk) {
          res.write(chunk);
        });

        apiRes.on("close", function() {
          res.end();
        });

        apiRes.on("end", function() {
          res.end();
        });
      }
    )
    .on("error", function(e) {
      console.log(e.message);
      res.writeHead(500);
      res.end();
    });
});

app.get("/api/bloggers", (req, res) => {
  const ids = bloggersIds.join(",");

  https
    .get(
      `https://www.googleapis.com/youtube/v3/channels?part=snippet&id=${ids}&fields=items(id%2Csnippet%2Fthumbnails%2Csnippet%2Ftitle)&key=${YOUTUBE_API}`,
      apiRes => {
        apiRes.setEncoding("utf8");

        // wait for data
        apiRes.on("data", function(chunk) {
          res.write(chunk);
        });

        apiRes.on("close", function() {
          res.end();
        });

        apiRes.on("end", function() {
          res.end();
        });
      }
    )
    .on("error", function(e) {
      console.log(e.message);
      res.writeHead(500);
      res.end();
    });
});

let port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(__dirname);
  console.log("Listening Port " + port);
});
