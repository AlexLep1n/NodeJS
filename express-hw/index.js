const express = require("express");
const app = express();
const fs = require("fs");
const path = require("path");
const pathToFIle = path.join(__dirname, "/counters.json");

app.get("/", (req, res) => {
  fs.readFile(pathToFIle, "utf-8", (err, data) => {
    if (err) {
      console.log(err);
    } else {
      const newData = JSON.parse(data);
      newData.mainPageCounter++;
      res.send(`
  <h1>Main Page</h1>
  <a href="/about">About</a>
  <p>Просмотров ${newData.mainPageCounter}</p>
  `);
      fs.writeFile(
        path.join(__dirname, "/counters.json"),
        JSON.stringify(newData, null, 2),
        (err) => {
          if (err) {
            console.log(err);
          }
          console.log("File saved");
        }
      );
    }
  });
});

app.get("/about", (req, res) => {
  fs.readFile(pathToFIle, "utf-8", (err, data) => {
    if (err) {
      console.log(err);
    } else {
      const newData = JSON.parse(data);
      newData.aboutPageCounter++;
      res.send(`
      <h1>About Page</h1>
      <a href="/">Main</a>
      <p>Просмотров ${newData.aboutPageCounter}</p>
      `);
      fs.writeFile(
        path.join(__dirname, "/counters.json"),
        JSON.stringify(newData, null, 2),
        (err) => {
          if (err) {
            console.log(err);
          }
          console.log("File saved");
        }
      );
    }
  });
});

app.use((req, res) => {
  if (res.status(404)) {
    res.send(`<h1>Page 404</h1>`);
  }
});

app.listen(3000);
