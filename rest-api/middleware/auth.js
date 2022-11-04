const jwt = require('jsonwebtoken');

function auth(req, res, next) {

   let autorizationHeader = req.get('Authorization');
   if (autorizationHeader) {
      let token = autorizationHeader.split(' ')[1];

      try {
         let decoded = jwt.verify(token, 'somesuperSecret');
         //    req.user = decoded.user;
         req.user = decoded

      } catch (error) {
         return next();
      }
   }
   next();
}
function isAuth(req, res, next) {
   if (!req.user) {
      res.status(401)
         .json({ message: "Unauthorized!" })
   }
   next();
};

module.exports = {
   isAuth,
   auth
}