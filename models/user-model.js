const connection = require('../config/db_config');

const db = connection.promise();

const createUser = ({ pseudo, email, avatar, password }) =>
  db.query(
    'INSERT INTO user (pseudo, email, avatar, password) VALUES (?,?,?,?)',
    [pseudo, email, avatar, password]
  );

module.exports = {
  createUser,
};
