const express = require("express");
const app = express();
const port = 5000;
const path = require("path");

app.use(express.static(path.join(__dirname, "public")));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("try");
});

app.listen(port, () => {
  console.log(`Port ${port} running`);
});
