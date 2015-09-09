var models = require('../models/user');
var express = require('express');
var router = express.Router();

router.get('/', function(req, res){
    models.User.findAll().then(function(users){
        res.json(users);
    });
});

module.exports = router;