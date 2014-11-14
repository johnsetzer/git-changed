var exec = require('child_process').exec;
var spawn = require('child_process').spawn;
var fs = require('fs');
var es = require('event-stream');

var getCwd = function () {
  return !!process.env.CWD ? process.env.CWD : '.';
};

// Callbacks last commit
exports.lastCommit = function (cb) {
  var cmd = 'git -C ' + getCwd() + ' log -1 --pretty=format:"%H%n%ct"';
  var log = exec(cmd, function (error, stdout, stderr) {
    if (error) { cb(error); return; }
    
    var parts = stdout.split('\n');
    var commit = {
      sha: parts[0],
      time: parseInt(parts[1])
    };
    
    cb(null, commit);
  });
};

// Callbacks list of files tracked by git
exports.trackedFiles = function (treeish, cb) {
  var lsTreeCmd = 'git -C ' + getCwd() + ' ls-tree --full-tree --name-only -r ' + treeish;
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
  var git = spawn('git', ['-C ' + getCwd(), 'diff', range, '--name-status']);
  var changedFiles = [];

  git.stdout
    .pipe(es.split())
    .pipe(es.map(function (line, cb) {
      var change = line.slice(0,1).trim();
      var file = line.slice(1).trim();
      if (change && file) {
        changedFiles.push({
          change: change,
          file: file
        });
      }
      cb(null, line);
    }))
    .on('end', function() {
      cb(null, changedFiles);
    })
    .on('error', function(error) {
      cb(error);
    });
};