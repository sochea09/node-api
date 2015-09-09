var express = require('express');
var router = express.Router();

router.get('/', function(req, res){
    res.json("Welcome node API...");
})

module.exports = router;