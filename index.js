var exec = require('child_process').exec;
var spawn = require('child_process').spawn;
var fs = require('fs');
var es = require('event-stream');

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

// Callbacks list of files tracked by git
exports.trackedFiles = function (treeish, cb) {
	var lsTreeCmd = 'git ls-tree --full-tree --name-only -r ' + treeish;
	var log = exec(lsTreeCmd, function (error, stdout, stderr) {
		if (error) { cb(error); return; }

		var files = stdout.split('\n');
	  
	  // Chop off empty line at end
	  files.pop();
	  
	  cb(null, files);
	});
};

// Callbacks list of changed files
exports.changedFiles = function (range, cb) {
	var git = spawn('git', ['diff', range, '--name-status']);
	var changedFiles = [];

	git.stdout
		.pipe(es.split())
		.pipe(es.map(function (line, cb) {
	    changedFiles.push({
			  change: line.slice(0,1),
	      file: line.slice(1).trim()
	    });
	    cb(null, line);
	  }))
	  .on('end', function() {
		  cb(null, changedFiles);
		})
		.on('error', function(error) {
		  cb(error);
		});
};