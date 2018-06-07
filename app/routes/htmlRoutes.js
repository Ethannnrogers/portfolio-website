var path = require('path');

function htmlRoutes(app) {
  app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/../public/home.html'));
  });

  app.get("/resume", function (req, res) {
    res.sendFile(path.join(__dirname + '/../public/resume.html'));
  });

  app.use(function (req, res) {
    res.sendFile(path.join(__dirname + '/../public/style.css'));
  });
}

module.exports = htmlRoutes;