const { match } = require("node-match-path");

module.exports = (middo) => {
  middo.route = (path, handler) => {
    return (req, res, next) => {
      const matcher = match(path, req.url);
      if (matcher.matches) {
        req.params = matcher.params;
        handler(req, res, next);
      } else {
        next();
      }
    }
  }

  middo.cors = (req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    next();
  }
}