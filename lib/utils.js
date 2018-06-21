const fs = require('fs');

function getMTime(filename) {
	let mtime;
	try {
		mtime = fs.statSync(filename).mtime;
	} catch (e) {
		throw new Error(`Cannot find file with given path: ${filename}`);
	}
	return mtime;
}

exports.getMTime = getMTime;

function loadConfigurationFile(filename) {
	if (filename) {
		return JSON.parse(fs.readFileSync(filename, 'utf8'));
	}
	return undefined;
}

exports.loadConfigurationFile = loadConfigurationFile;

function getStringBool(b, d) {
	if (typeof b === 'undefined') return !!d ? 'true' : '';

	return !!b ? 'true' : '';
}

exports.getStringBool = getStringBool;
