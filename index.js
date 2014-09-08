var exec = require('child_process').exec;
var spawn = require('child_process').spawn;
var fs = require('fs');
var byline = require('byline');

// Callbacks last commit
exports.lastCommit = function (cb) {
	var log = exec('git log -1 --pretty=format:"%H%n%ct"', function (error, stdout, stderr) {
		if (error) { cb(error); return; }
	  
	  var parts = stdout.split('\n');
	  var commit = {
	  	sha: parts[0],
	  	time: parts[1]	
	  };
	  
	  cb(null, commit);
	});
};

// Callbacks list of changed files
exports.changedFiles = function (range, cb) {
	var git = spawn('git', ['diff', range, '--name-status']);
	var changedFiles = [];

	var lineStream = byline.createStream(git.stdout);

	lineStream.on('data', function(line) {
		line = line.toString();
	  changedFiles.push({
	  	change: line.slice(0,1),
	  	file: line.slice(1).trim()
	  });
	});

	lineStream.on('error', function(error) {
	  cb(error);
	});

	lineStream.on('end', function() {
	  cb(null, changedFiles);
	});
};