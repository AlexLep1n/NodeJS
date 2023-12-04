"use strict";

const http = require("http");
let mainCounter = 0;
let aboutCounter = 0;

const server = http.createServer((req, res) => {
  switch (req.url) {
    case "/":
      res.writeHead(200, { "Content-Type": "text/html; charset=UTF-8" });
      res.end(`
      <h1>Главная страница сайта</h1>
      <a href="/about">About page</a>
      <p>Количество посещений: ${++mainCounter}</p>
      `);
      break;

    case "/about":
      res.writeHead(200, { "Content-Type": "text/html; charset=UTF-8" });
      res.end(`
      <h1>Страница about</h1>
      <a href="/">Main page</a>
      <p>Количество посещений: ${++aboutCounter}</p>
      `);
      break;

    default:
      res.writeHead(404, { "Content-Type": "text/html; charset=UTF-8" });
      res.end(`
      <h1>Страница не найдена</h1>
      <a href="/">Back to main page</a>
      `);
      break;
  }
});

const port = 3000;
server.listen(port);
