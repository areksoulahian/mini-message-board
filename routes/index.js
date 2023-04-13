var express = require("express");
var router = express.Router();

const messages = [
  {
    text: "Hi there!",
    user: "Amando",
    added: new Date(),
  },
  {
    text: "Hello World!",
    user: "Charles",
    added: new Date(),
  },
];

/* GET home page. */
router.get("/", function (req, res) {
  res.render("index", { title: "Mini Messageboard", messages: messages });
});

/* GET new message page. */
router.get("/", function (req, res) {
  res.render("../views/form.ejs");
});

router.get("/new", function (req, res) {
  res.render("form");
});

router.post("/new", function (req, res) {
  const message = {
    name: req.body.name,
    message: req.body.message,
  };
  messages.push({
    text: req.body.message,
    user: req.body.author,
    added: new Date(),
  });
  res.redirect("/");
});

module.exports = router;
