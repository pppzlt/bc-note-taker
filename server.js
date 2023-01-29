const express = require("express");
const path = require("path");
const PORT = 3002;
const app = express();


app.get("/", (req, res) => {
  console.log(__dirname)
  res.sendFile(path.join(__dirname, "public/index.html"));
});

app.get("/notes", (req, res) => {
  console.log(__dirname)
  res.sendFile(path.join(__dirname, "public/notes.html"));
});

app.get("/api/notes", (req, res) => {
  res.sendFile(path.join(__dirname, 'db/db.json'))
  console.log('good')
})

app.use(express.static("public"));

app.listen(PORT, () => {
  console.log("Server is listening...");
});
