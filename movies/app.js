const express = require("express");
const app = express();
const port = 3000;

app.get("/movies", async function (req, res) {
  res.type("json");
  res.send({
    movies: [
      { name: "Jaws", genre: "Thriller" },
      { name: "Annie", genre: "Family" },
      { name: "Jurassic Park", genre: "Action" },
    ],
  });
});

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
