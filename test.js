var gitChanged = require('./index.js');


gitChanged.lastCommit(function(err, commit) {
	console.log(commit.sha, commit.time);
});

gitChanged.changedFiles('396bf4f31641c9f3b97b5ebd79f7a0afab1e6c2e..HEAD', function(err, files) {
	files.forEach(function(f) {
		console.log(f.change, f.file);
	});
}); 