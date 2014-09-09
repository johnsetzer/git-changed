var gitChanged = require('./index.js');


gitChanged.lastCommit(function(err, commit) {
	console.log('********** LAST COMMIT *********');
	console.log(commit.sha, commit.time);
});

gitChanged.changedFiles('396bf4f31641c9f3b97b5ebd79f7a0afab1e6c2e..HEAD', function(err, files) {
	console.log('********** CHANGED FILES *********');
	files.forEach(function(f) {
		console.log(f.change, f.file);
	});
});

gitChanged.trackedFiles('HEAD', function(err, files) {
	console.log('********** TRACKED FILES *********');
	files.forEach(function(f) {
		console.log(f);
	});
}); 