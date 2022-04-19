const http = require("http");

class Middo {
  constructor() {
    this.middleware = [];

    this.server = this.server.bind(this);
  }

  use(handler) {
    this.middleware.push(handler);
  }

  server(req, res) {
    let index = -1;

    let next = function () {
      index++;

      const handler = this.middleware[index];

      if (!handler) {
        index = -1;
        return;
      }

      handler(req, res, next);
    }

    next = next.bind(this);

    next();
  }

  listen(port) {
    const server = http.createServer(this.server);
    server.listen(port);
    return server;
  }
}

function initMiddo() {
  return new Middo();
}

const assignMiddleware = require("./middleware");
assignMiddleware(initMiddo);

initMiddo._ = {};
initMiddo._.Middo = Middo;

module.exports = initMiddo;