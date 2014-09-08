git-changed
===========

Node module that returns a list of changed files between two revisions.

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


```javascript
gitChanged.lastCommit(function(err, commit) {
	console.log(commit.sha, commit.time);
});
```
ouputs
```
f3f6c0f9606393841c8c7f316c63e4a39cd8acf2 1410162674
```
