// Current Commit
// git log -1 --pretty=format:"%H%n%ct"

// Changes
//git diff 4d6b687de8ea9207e15c40d066e1e45d53de9576..c6545dc69e4ff743607caa9348e2e4c111d32ba7 --name-status
// A       dir/renamed.js
// A       dir/renamed_and_replaced.js
// M       dir/second_level.css
// M       dir/second_level.js
// M       dir/will_be_renamed.js
// M       dir/will_be_renamed_and_replaced.js
// M       first_level.js
// D       dir/will_be_deleted.js

var spawn = require('child_process').spawn,
    ls    = spawn('git', ['diff', '4d6b687de8ea9207e15c40d066e1e45d53de9576..HEAD', '--name-status']);

// ls.stdout.pipe(process.stdout);



var fs = require('fs'), 
    byline = require('byline');


lineStream = byline.createStream(ls.stdout);

lineStream.on('data', function(line) {
  console.log(line.toString());
});

lineStream.on('end', function() {
  console.log('DONE');
});

// on('data', function (data) {
//   console.log('stdout: ' + data);
// });

// ls.stderr.on('data', function (data) {
//   console.log('stderr: ' + data);
// });

ls.on('close', function (code) {
  console.log('child process exited with code ' + code);
});