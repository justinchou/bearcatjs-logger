const path = require('path');

function getStackInfo() {
	// https://github.com/v8/v8/wiki/Stack%20Trace%20API
	let stackInfo = {};
	let reg1 = /at\s+(.*)\s+\((.*):(\d*):(\d*)\)/i;
	let reg2 = /at\s+()(.*):(\d*):(\d*)/i;

	let list = new Error().stack.split('\n').slice(3);
	let s = list[0];
	let sp = reg1.exec(s) || reg2.exec(s);
	if (sp && sp.length === 5) {
		stackInfo.method = sp[1];
		stackInfo.path = sp[2];
		stackInfo.filepath = sp[2].replace(process.cwd() + '/', '');
		stackInfo.line = sp[3];
		stackInfo.file = path.basename(stackInfo.path);
	}
	return stackInfo;
}

module.exports = getStackInfo;
