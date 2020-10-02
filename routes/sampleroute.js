

const router = require('express').Router();
const verify = require('../middleware/verifytoken');

router.post('/', verify, (req, res) => {
   res.json( {
       "text" : "This is my first post",
       "user" : req.user
   });
})

module.exports = router;