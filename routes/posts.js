var models = require('../models');

var express = require('express');
var router = express.Router();

var log = function (inst) {
    console.dir(inst.get())
}

//get all posts
router.get('', function(req, res){
    models.Post.findAll({
        attributes: ['id', 'title'],
        where: { visible: true },
        order: '"createdAt" DESC'
    }).then(function (posts) {
            posts.forEach(log)
            res.json({status: true, message: posts})
    })
})

//get post details
router.get('/:id', function(req, res){
    models.Post.find({where: {id: req.params.id}}).then(function(posts){
        if(posts) {
            res.json({status: true, message: posts})
        }else{
            res.send(204,{status: false, message: "Post not found."})
        }
    })
})

//create post
router.post('', function(req, res){
    var title = req.body.title;
    var content = req.body.content;

    models.Post.create({title: title, content: content}).then(function(){
        res.send(201,{status: true, message: "Post created!"})
    })

})

//update post
router.post('/:id', function(req, res){
    var id = req.params.id;
    var title = req.body.title;
    var content = req.body.content;

    models.Post.update({title: title, content: content},{id: id}).then(function(){
        res.send("Post updated!")
    })

})

//delete post
router.post('/:id/delete', function(req, res){
    models.Post.update({visible: 0},{id: req.params.id}).then(function(){
        res.send("Post delete!")
    })
})

module.exports = router;

