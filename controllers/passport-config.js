const fs = require('fs');
const filePath = './models/users.json';

const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

// Read users from JSON file
const readUsers = () => {
  const data = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(data);
};

function initialize(passport) {
  const authenticateUser = async (username, password, done) => {
    const users = readUsers(); // Get the users from the JSON file
    const user = users.find(user => user.username === username);
    if (user == null) {
      return done(null, false, { message: 'No user with that username' });
    }

    try {
      if (await bcrypt.compare(password, user.password)) {
        return done(null, user);
      } else {
        return done(null, false, { message: 'Password incorrect' });
      }
    } catch (e) {
      return done(e);
    }
  };

  passport.use(new LocalStrategy(authenticateUser));
  passport.serializeUser((user, done) => done(null, user.id));
  passport.deserializeUser((id, done) => {
    const users = readUsers(); // Get the users from the JSON file
    const user = users.find(user => user.id === id);
    return done(null, user);
  });
}

module.exports = initialize;
