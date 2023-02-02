const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 3002;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "public/notes.html"));
});

app.get("/api/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "db/db.json"));
});

app.post("/api/notes", (req, res) => {
  fs.readFile("./db/db.json", "utf8", (err, data) => {
    let error;
    let incoming = req.body;
    incoming["id"] = uuidv4();
    let existingcontent = JSON.parse(data);
    existingcontent.push(incoming);
    fs.writeFile(
      "./db/db.json",
      JSON.stringify(existingcontent, null, "\t"),
      (err) => {
        error = err;
        let response = error ? error : "success";
        res.send(response);
      }
      
    );
  });
  
});

app.delete("/api/notes/:id", (req, res) => {
  let error;
  fs.readFile("./db/db.json", "utf8", (err, data) => {
    let id = req.params.id;
    let existingcontent = JSON.parse(data);
    for (let i = 0; i < existingcontent.length; i++) {
      if (existingcontent[i].id === id) {
        existingcontent.splice(i, 1);
        break;
      }
    }
    fs.writeFile(
      "./db/db.json",
      JSON.stringify(existingcontent, null, "\t"),
      (err) => {
        error = err;
      }
    );
  });
  let response = error ? error : 'success';
  res.send(response);
});

app.listen(PORT, () => {
  console.log(`Port ${PORT}, server is listening...`);
});
