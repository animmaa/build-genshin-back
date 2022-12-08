const connection = require('../config/db_config');

const db = connection.promise();

const findAllUser = () => db.query('SELECT * FROM user');

const findUserByPseudo = (pseudo) =>
  db.query('SELECT * FROM user WHERE pseudo = ?', [pseudo]);

const createUser = ( pseudo, password ) =>
  db.query(
    'INSERT INTO user (pseudo, password) VALUES (?,?)',
    [pseudo, password]
  );

module.exports = {
  createUser,
  findAllUser,
  findUserByPseudo,
};
