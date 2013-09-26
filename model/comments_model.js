var mongoose = require('mongoose');
var COMMENTS = mongoose.model('cl_comments', {
  username:String, 
  description: String,
  points: Number,
  date:Date
});

exports.fetchComment = function(obj,callback){
	COMMENTS.find(obj,function(err,res){
		if(err) return callback(err);
		callback(null,res);
	});
}

exports.addComment = function(obj,callback){
	var comments = new COMMENTS(obj);
	comments.save(function(err,res){
		if(err) return callback(err);
		callback(null,res);
	});
}

exports.updateVote = function(id, obj, callback){
	COMMENTS.findByIdAndUpdate(id, { $set: obj }, {}, function(err, res){
		if(err) return callback(err);
		callback(null,res);	
	});
}

exports.deleteComment = function(id,callback){
	COMMENTS.findByIdAndRemove(id,function(err,res){
		if(err) return callback(err);
		callback(null,res);
	});
}
