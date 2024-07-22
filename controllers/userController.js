const fs = require('fs');
const bcrypt = require('bcryptjs');
const filePath = './models/users.json';

const readUsers = () => {
  const data = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(data);
};

const writeUsers = (users) => {
  fs.writeFileSync(filePath, JSON.stringify(users, null, 2));
};

const registerUser = async (username, password) => {
  const users = readUsers();
  const hashedPassword = await bcrypt.hash(password, 10);

  users.push({
    id: Date.now().toString(),
    username,
    password: hashedPassword,
  });

  writeUsers(users);
};

module.exports = {
  registerUser,
};
