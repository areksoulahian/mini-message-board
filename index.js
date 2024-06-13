const express = require('express');
const router = express.Router();
const fs = require('fs');
const filePath = './messages.json';

// const messages = [
//   {
//     messageId: "0",
//     text: "Hi there!",
//     user: "Amando",
//     added: new Date(),
//   },
//   {
//     messageId: "1",
//     text: "Hello World!",
//     user: "Charles",
//     added: new Date(),
//   },
// ];

/* Helper function to read message from json file */
const readMessages = () => {
  const data = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(data);
};

/* Helper function to write message from json file */
const writeMessages = (messages) => {
  fs.writeFileSync(filePath, JSON.stringify(messages, null, 2));
};

/* base path for application deployment */
const basePath = '';

/* Middleware to set basePath globally */
router.use((req, res, next) => {
  res.locals.basePath = basePath;
  next();
});

/* GET home page. */
router.get(`${basePath}/`, (req, res) => {
  const messages = readMessages();
  res.render('index', { title: 'Mini Messageboard', userPost: messages });
});

/* GET new page. */
router.get(`${basePath}/new`, (req, res) => {
  res.render('new', { title: 'New Message' });
});

/* POST new message */
router.post(`${basePath}/new`, (req, res) => {
  const messages = readMessages();
  messages.push({
    messageId: Date.now().toString(),
    text: req.body.text,
    user: req.body.user,
    added: new Date().toUTCString(),
  });
  writeMessages(messages);
  res.redirect(`${basePath}/`);
});

/* GET edit message page */
router.get(`${basePath}/edit/:id`, (req, res) => {
  const messages = readMessages();
  const messagePost = messages.find(
    (element) => element.messageId === req.params.id
  );
  if (messagePost) {
    res.render('edit', { title: 'Edit Message', userPost: messagePost });
  } else {
    res.redirect(`${basePath}/`);
  }
});

/* POST update message page */
router.post(`${basePath}/edit/:id`, (req, res) => {
  const messages = readMessages();
  const messagePost = messages.find(
    (element) => element.messageId === req.params.id
  );
  if (messagePost) {
    messagePost.text = req.body.text;
    messagePost.user = req.body.user;
    writeMessages(messages);
    res.redirect(`${basePath}/`);
  } else {
    res.redirect(`${basePath}/`);
  }
});

/* POST delete message page */
router.post(`${basePath}/delete`, (req, res) => {
  const requestedMessageId = req.body.messageId;
  // const index = messages.findIndex(element => element.messageId === requestedMessageId);
  // if (index !== -1) {
  //   messages.splice(index, 1);
  // }
  let messages = readMessages();
  messages = messages.filter(
    (element) => element.messageId !== requestedMessageId
  );
  writeMessages(messages);
  res.redirect(`${basePath}/`);
});

/* GET about page. */
router.get(`${basePath}/about`, (req, res) => {
  res.render('about', { title: 'About' });
});

module.exports = router;
