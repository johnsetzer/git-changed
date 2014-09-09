git-changed
===========

Node module that returns a list of changed files between two git revisions and returns the last commit.

##changedFiles(range, cb)
```javascript
gitChanged.changedFiles('396bf4f31641c9f3b97b5ebd79f7a0afab1e6c2e..HEAD', function(err, files) {
	files.forEach(function(f) {
		console.log(f.change, f.file);
	});
});
```
outputs
```
A dir/added.js
M dir/modified.js
D dir/deleted.js
```

##trackedFiles(treeish, cb)
```javascript
gitChanged.trackedFiles('HEAD', function(err, files) {
	files.forEach(function(f) {
		console.log(f);
	});
});
```
outputs
```
dir/added.js
dir/modified.js
dir/not_in_changed_file_range.js
```

##lastCommit(cb)
```javascript
gitChanged.lastCommit(function(err, commit) {
	console.log(commit.sha, commit.time);
});
```
ouputs
```
f3f6c0f9606393841c8c7f316c63e4a39cd8acf2 1410162674
```
