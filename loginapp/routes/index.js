var express = require('express');
var router = express.Router();

let Message = require('../models/message');
// Get Homepage
router.get('/', ensureAuthenticated, function(req, res){
	res.render('index');
});

function ensureAuthenticated(req,res,next){
	if(req.isAuthenticated()){
		return next();
	}else{
		req.flash('success_msg','Please Login to continue');
		res.redirect('/users/login');
	}
}

router.post('/',function(req,res){
	let message = new Message();
	message.name = req.body.name;
	message.title = req.body.title;
	message.message = req.body.message;

	//Validaton
	req.checkBody('name', 'Name is required').notEmpty();
	req.checkBody('title', 'Title is required').notEmpty();
	req.checkBody('message', ' Please Enter the message').notEmpty();

	var errors = req.validationErrors();
	if(errors){
		res.render('index',{
			errors : errors
		});
	}else{
		/*var newMessage = new Message({
			name : name,
			title : title,
			message : message
		});*/
		//mongoose not alloowin to throw errors
		//Static variables not working too , figure it out validationErrors
		//Probably new version of mongoose

		/*Message.createMessage(newMessage,function(err,message){
			if(err) throw err
			console.log(message);
		});*/
		req.flash('success_msg','Your message was sent successfully');
		res.redirect('/');
	}
});

module.exports = router;
