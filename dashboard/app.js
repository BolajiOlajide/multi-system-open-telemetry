const express = require("express");
const { countAllRequests } = require("./monitoring");

const app = express();

app.use(countAllRequests());

const port = 3000;

const getUrlContents = (url, fetch) => {
  return new Promise((resolve, reject) => {
    fetch(url, resolve, reject)
      .then((res) => res.text())
      .then((body) => resolve(body));
  });
};

app.get("/dashboard", async (req, res) => {
  //fetch data running from second service
  const movies = await getUrlContents(
    "http://movies:3000/movies",
    require("node-fetch")
  );
  res.type("json");
  res.send(JSON.stringify({ dashboard: movies }));
});

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
