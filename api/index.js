const express = require("express");
const app = express();

app.use(express.json());

const joi = require("joi");
const schema = joi.object({});

const fs = require("fs");
const path = require("path");
const pathToFIle = path.join(__dirname, "/users.json");
// let userId = 1;

app.get("/users", (req, res) => {
  fs.readFile(pathToFIle, "utf-8", (err, data) => {
    if (err) {
      console.log(err);
    } else {
      const users = JSON.parse(data);
      res.send({ users });
    }
  });
});

app.post("/users", (req, res) => {
  fs.readFile(pathToFIle, "utf-8", (err, data) => {
    if (err) {
      console.log(err);
    } else {
      let users = JSON.parse(data);
      let userId = users[users.length - 1].id + 1;
      users.push({ id: userId, ...req.body });
      fs.writeFile(pathToFIle, JSON.stringify(users, null, 2), (err) => {
        if (err) {
          console.log(err);
        } else {
          res.send({ id: userId });
        }
      });
    }
  });
});

app.listen(3000);

// fs.readFile(pathToFIle, "utf-8", (err, data) => {
//   if (err) {
//     console.log(err);
//   } else {
//     const newData = JSON.parse(data);
//     newData.mainPageCounter++;
//     res.send(`
// <h1>Main Page</h1>
// <a href="/about">About</a>
// `);
//     fs.writeFile(
//       path.join(__dirname, "/counters.json"),
//       JSON.stringify(newData, null, 2),
//       (err) => {
//         if (err) {
//           console.log(err);
//         }
//         console.log("File saved");
//       }
//     );
//   }
// });
