var express = require('express');
var passport = require('passport');
var router = express.Router();

/* GET users listing. */
router.post('/login', passport.authenticate('local', {successReturnToOrRedirect: '/', failureRedirect: '/login.html'}), function(req, res, next) {
  res.redirect('/board');
});
router.get('/exit', function() {
  process.exit(1);
});
module.exports = router;
