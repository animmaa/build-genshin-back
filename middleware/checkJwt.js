const jwt = require('jsonwebtoken');

const checkJwt = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(402).json();
  }

  try {
    jwt.verify(req.headers.authorization, process.env.SECRET_KEY);
    return next();
  } catch (err) {
    return res.status(401).json();
  }
};

module.exports = checkJwt;
