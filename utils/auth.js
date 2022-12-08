const jwt = require('jsonwebtoken');

const generateJwt = (pseudo) => {
    return jwt.sign(
        // on lui crée un jwt
        {
          pseudo: pseudo,
        },
        process.env.SECRET_KEY
      );
}

module.exports = {
    generateJwt,
}