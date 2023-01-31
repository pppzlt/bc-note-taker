const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

const express = require("express");
const path = require("path");
const PORT = 3002;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  console.log(__dirname);
  res.sendFile(path.join(__dirname, "public/index.html"));
});

app.get("/notes", (req, res) => {
  // console.log(__dirname)
  res.sendFile(path.join(__dirname, "public/notes.html"));
});

app.get("/api/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "db/db.json"));
  console.log("good");
});

app.post("/api/notes", (req, res) => {
  console.log(req.body);
  fs.readFile("./db/db.json", "utf8", (err, data) => {
    let incoming = req.body
    incoming["id"] = uuidv4();
    let existingcontent = JSON.parse(data);
    existingcontent.push(incoming);
    fs.writeFile("./db/db.json", JSON.stringify(existingcontent, null, "\t"), (err) => {
      console.log(err);
    });
  });
  let response = "success";
  res.send(response);
});

app.delete("/api/notes/:id", (req, res) => {});

app.listen(PORT, () => {
  console.log(`Port ${PORT}, server is listening...`);
});
