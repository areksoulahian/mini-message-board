const express = require('express');
const router = express.Router();
const fs = require('fs');
const filePath = './messages.json';

/* Helper function to read message from json file */
const readMessages = () => {
  const data = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(data);
};

/* Helper function to write message from json file */
const writeMessages = (messages) => {
  fs.writeFileSync(filePath, JSON.stringify(messages, null, 2));
};

const formatDate = (utcString) => {
  const date = new Date(utcString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });
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
  const messages = readMessages().reverse();
  messages.forEach((m) => (m.formattedDate = formatDate(m.added)));
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
    messagePost.formattedDate = formatDate(messagePost.added);
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
