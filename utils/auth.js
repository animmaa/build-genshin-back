const jwt = require('jsonwebtoken');

const generateJwt = (pseudo) => jwt.sign(
  // on lui crée un jwt
  {
    pseudo,
  },
  process.env.SECRET_KEY,
);

module.exports = {
  generateJwt,
};
