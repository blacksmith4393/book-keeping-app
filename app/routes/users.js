const express = require('express');
const router = express.Router();

router.post('/register', function(req, res, next) {
  res.send('REGISTERED');
});
router.post('/authenticate', function(req, res, next) {
  res.send('AUTHENTICATE');
});
router.get('/profile', function(req, res, next) {
  res.send('PROFILE');
});


module.exports = router;