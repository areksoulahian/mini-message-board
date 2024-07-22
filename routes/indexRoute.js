const express = require('express');
const router = express.Router();

const ensureAuthenticated = require('../controllers/authMiddleware');


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
// router.get('/', getHome);
router.get('/', ensureAuthenticated, getHome);

/* GET new page. */
// router.get('/new', getNew);
router.get('/new', ensureAuthenticated, getNew);

/* POST new message */
router.post('/new', postNewMessage);

/* GET edit message page */
router.get('/edit/:id', getEditMessage);

/* POST update message page */
router.put('/edit/:id', updateMessage);

/* POST delete message page */
router.delete('/delete/:id', deleteMessage);

/* GET about page. */
router.get('/about', getAbout);

module.exports = router;
