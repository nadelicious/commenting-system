var  comments = require('../model/comments_model.js');

exports.corsSettings = function(req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
	res.header('Access-Control-Allow-Headers', 'origin, content-type, accept');
	// deal with OPTIONS method during a preflight request
	if (req.method === 'OPTIONS') {
		res.send(200);
	} else {
		next();
	}
}

exports.fetchComment = function(req,res){
	comments.fetchComment({},function(err,docs){
		if(err){
			res.statusCode= 404;
			throw err;
		}
		 res.send(docs);
	});
}

exports.addComment = function(req,res){
	var obj ={
	 username: req.body.username,
	 description:req.body.description,
	 points: req.body.points,
	 date: req.body.date
	};
	comments.addComment(obj,function(err,docs){
		if(err){
			res.statusCode= 404;
			throw err;
		}
		res.send(200, docs);
	});
}


exports.updateVote = function(req,res){
	var id = req.params.id;
	var obj = {
		votes: req.body.votes
	};
	comments.updateVote(id,obj,function(err,docs){
		if(err){
			res.statusCode= 404;
			throw err;
		}
		res.send(200, docs);
	});
}

exports.deleteComment = function(req,res){
	var id = req.params.id;
	comments.deleteComment(id,function(err,docs){
		if(err){
			res.statusCode= 404;
			throw err;
		}
		res.send(200, docs);
	});
}