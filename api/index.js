const express = require("express");
const app = express();
app.use(express.json());

const { userScheme, idScheme } = require("./validation/scheme.js");
const { checkUserParams, checkUserId } = require("./validation/validator.js");

const fs = require("fs");
const path = require("path");
const pathToFIle = path.join(__dirname, "/users.json");

// Получение всех пользователей
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

// Получение пользователя с конкретным id
app.get("/users/:id", checkUserId(idScheme), (req, res) => {
  const idUpdateUser = +req.params.id;
  fs.readFile(pathToFIle, "utf-8", (err, data) => {
    if (err) {
      console.log(err);
    } else {
      const users = JSON.parse(data);
      const updateUser = users.find((user) => user.id === idUpdateUser);
      if (updateUser) {
        fs.writeFile(pathToFIle, JSON.stringify(users, null, 2), (err) => {
          if (err) {
            console.log(err);
          } else {
            res.send({ updateUser });
          }
        });
      } else {
        res.status(404).send({ updateUser: null });
      }
    }
  });
});

// Добавление новго пользователя
app.post("/users", checkUserParams(userScheme), (req, res) => {
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

// Изменение данных конкретного пользователя
app.put("/users/:id", checkUserId(idScheme), (req, res) => {
  const idUpdateUser = +req.params.id;
  fs.readFile(pathToFIle, "utf-8", (err, data) => {
    if (err) {
      console.log(err);
    } else {
      const users = JSON.parse(data);
      const updateUser = users.find((user) => user.id === idUpdateUser);
      if (updateUser) {
        updateUser.firstName = req.body.firstName;
        updateUser.surname = req.body.surname;
        updateUser.age = req.body.age;
        updateUser.city = req.body.city;
        fs.writeFile(pathToFIle, JSON.stringify(users, null, 2), (err) => {
          if (err) {
            console.log(err);
          } else {
            res.send({ updateUser });
          }
        });
      } else {
        res.status(404).send({ updateUser: null });
      }
    }
  });
});

// Удаление конкретного пользователя
app.delete("/users/:id", checkUserId(idScheme), (req, res) => {
  const idDeletedUser = +req.params.id;
  fs.readFile(pathToFIle, "utf-8", (err, data) => {
    if (err) {
      console.log(err);
    } else {
      const users = JSON.parse(data);
      const deletedUser = users.find((user) => user.id === idDeletedUser);
      const userIndex = users.indexOf(deletedUser);
      if (userIndex != -1) {
        users.splice(userIndex, 1);
        fs.writeFile(pathToFIle, JSON.stringify(users, null, 2), (err) => {
          if (err) {
            console.log(err);
          } else {
            res.send({ deletedUser });
          }
        });
      } else {
        res.status(404).send({ deletedUser: null });
      }
    }
  });
});

app.listen(3000);
