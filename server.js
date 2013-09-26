var express = require('express');
var mongoose = require('mongoose');
var route =require('./routes/routes.js');
var app =express();

mongoose.connect('localhost', 'db_comments');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback() {
  console.log('Connected to DB');
});
app.configure(function(){
	app.locals.pretty = true;
	app.use(express.bodyParser());
	app.use(route.corsSettings);
	app.use(express.methodOverride());
	app.use(express.static(__dirname + '/public'));
	app.use(app.router);
});
app.get('/comments',route.fetchComment);
app.post('/comments',route.addComment);
app.put('/comments/:id',route.updateVote);
app.delete('/comments/:id',route.deleteComment);
app.listen(3000);
console.log('Application is running at localhost:3000');