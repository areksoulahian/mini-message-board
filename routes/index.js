const express = require('express');
const router = express.Router();
const { 
  readMessages,
  writeMessages,
  getHome,
  getNew,
  postNewMessage,
  getEditMessage,
  updateMessage,
  deleteMessage,
  getAbout } = require('../controllers/indexController');

/* GET home page. */
router.get('/', getHome);

/* GET new page. */
router.get('/new', getNew);

/* POST new message */
router.post('/new', postNewMessage);

/* GET edit message page */
router.get('/edit/:id', getEditMessage);

/* POST update message page */
router.post('/edit/:id', updateMessage);

/* POST delete message page */
router.post('/delete', deleteMessage);

/* GET about page. */
router.get('/about', getAbout);

module.exports = router;
