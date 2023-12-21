const fs = require("fs");
const path = require("path");

const counters = {
  mainPageCounter: 0,
  aboutPageCounter: 0,
};

fs.writeFileSync(
  path.join(__dirname, "./counters.json"),
  JSON.stringify(counters, null, 2)
);
