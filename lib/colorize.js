const styles = {
	//styles
	bold: [ 1, 22 ],
	italic: [ 3, 23 ],
	underline: [ 4, 24 ],
	inverse: [ 7, 27 ],
	//grayscale
	white: [ 37, 39 ],
	grey: [ 90, 39 ],
	black: [ 90, 39 ],
	//colors
	blue: [ 34, 39 ],
	cyan: [ 36, 39 ],
	green: [ 32, 39 ],
	magenta: [ 35, 39 ],
	red: [ 31, 39 ],
	yellow: [ 33, 39 ]
};

const colours = {
	all: 'grey',
	trace: 'blue',
	debug: 'cyan',
	info: 'green',
	warn: 'yellow',
	error: 'red',
	fatal: 'magenta',
	off: 'grey'
};

function colorizeStart(style) {
	return style ? '\x1B[' + styles[style][0] + 'm' : '';
}

function colorizeEnd(style) {
	return style ? '\x1B[' + styles[style][1] + 'm' : '';
}

/**
 * Taken from masylum's fork (https://github.com/masylum/log4js-node)
 */
function colorize(str, type) {
	const style = colours[type];

	return colorizeStart(style) + str + colorizeEnd(style);
}

module.exports = colorize;
