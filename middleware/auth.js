const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function(req, res, next) {
  // Get token from header
  const token = req.header('x-auth-token');

  // Check there is NO token, return a ERROR status
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  //   if there is a token, check its validity by verifying with the jwtSecret signature
  try {
    const decoded = jwt.verify(token, config.get('jwtSecret'));

    // if token is valid, obtain the User Id so user can access the route
    req.user = decoded.user;
    next(); // then move to the next middleware

    // if token is NOT valid, return the error
  } catch (error) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
