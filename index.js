const express = require("express");
const path = require("path");

const app = express();

app.use(
  (req, res, next) => {
    console.log(req.method, req.url);
    next();
  },
  express.static('./front', {
    extensions: ['html', 'js', 'css', 'cma'],
  }),
  express.static('./dist', {
    extensions: ['js', 'css'],
  })
);

app.listen(3000, () => {
  console.log("Server started on port 3000");
});