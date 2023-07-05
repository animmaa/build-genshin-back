const connection = require('../config/db_config');

const db = connection.promise();

const findAllUser = () => db.query('SELECT * FROM user');

const findUserByPseudo = (pseudo) => db.query('SELECT * FROM user WHERE pseudo = ?', [pseudo]);

const findUserByEmail = (email) =>
  db.query('SELECT * FROM user WHERE email = ?', [email]);

const createUser = (email, pseudo, password) => db.query(
  'INSERT INTO user (email, pseudo, password) VALUES (?,?,?)',
  [email, pseudo, password],
);

module.exports = {
  createUser,
  findAllUser,
  findUserByEmail,
  findUserByPseudo,
};
