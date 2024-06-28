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

// @desc    Get /
// @route   GET /
const getHome = (req, res) => {
    const messages = readMessages();
    res.render('index', { title: 'Mini Messageboard', userPost: messages });
};

// @desc    Get /new
// @route   GET /new
const getNew = (req, res) => {
    res.render('new', { title: 'New Message' });
};

// @desc    POST /new
// @route   POST /new
const postNewMessage = (req, res) => {
    const messages = readMessages();
    messages.push({
        messageId: Date.now().toString(),
        text: req.body.text,
        user: req.body.user,
        added: new Date().toUTCString(),
    });
    writeMessages(messages);
    res.redirect('/');
};

// @desc    GET /edit/:id
// @route   GET /edit/:id
const getEditMessage = (req, res) => {
    const messages = readMessages();
    const messagePost = messages.find(
        (element) => element.messageId === req.params.id
    );
    if (messagePost) {
        res.render('edit', { title: 'Edit Message', userPost: messagePost });
    } else {
        res.redirect('/');
    }
};

// @desc    POST /edit/:id
// @route   POST /edit/:id
const updateMessage = (req, res) => {
    const messages = readMessages();
    const messagePost = messages.find(
        (element) => element.messageId === req.params.id
    );
    if (messagePost) {
        messagePost.text = req.body.text;
        messagePost.user = req.body.user;
        writeMessages(messages);
        res.redirect('/');
    } else {
        res.redirect('/');
    }
};

// @desc    POST /delete
// @route   POST /delete
const deleteMessage = (req, res) => {
    const requestedMessageId = req.body.messageId;
    let messages = readMessages();
    messages = messages.filter(
        (element) => element.messageId !== requestedMessageId
    );
    writeMessages(messages);
    res.redirect('/');
};

// @desc    GET /about
// @route   GET /about
const getAbout = (req, res) => {
    res.render('about', { title: 'About' });
};

module.exports = {
    readMessages,
    writeMessages,
    getHome,
    getNew,
    postNewMessage,
    getEditMessage,
    updateMessage,
    deleteMessage,
    getAbout,
};