const fs = require("fs");
const path = require("path");

const users = [
  {
    id: 1,
    firstName: "Alex",
    surname: "Lepin",
    age: 26,
    city: "Saint-Petersburg",
  },
];

const recorder = fs.writeFile(
  path.join(__dirname, "/users.json"),
  JSON.stringify(users, null, 2),
  (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("The file is recorded");
    }
  }
);

module.exports = { recorder };
