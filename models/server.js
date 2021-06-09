const express = require("express");

//* Middlewares
const cors = require("cors");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.apiPath = '/api';
    this.paths = {
      items: `${this.apiPath}/items`,
    }
    this.optionCors = {
      origin: process.env.FRONTEND_URL
    };

    //* Middlewares
    this.middlewares();
    //* Routes
    this.routes();
  }

  middlewares() {
    //* CORS
    this.app.use(cors(this.optionCors));
    //* Reading and parsing the body
    this.app.use(express.json());
  }

  routes() {
    this.app.use(this.paths.items, require('../routes/items.routes'));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Server running at http://localhost:${this.port}`);
    });
  }
}

module.exports = Server;