const log4js = require('log4js');
const fs = require('fs');
const util = require('util');
const replaceProperties = require('./replaceProperties');
const colorize = require('./colorize');
const getStackInfo = require('./getStackInfo');
const { getMTime, loadConfigurationFile, getStringBool } = require('./utils');

const marker = { start: '[ ', end: ' ] ' };

function concatMessage(msg, append) {
	return `${marker.start}${append}${marker.end}${msg}`;
}

const configState = {};

function getLogger(categoryName) {
	const args = arguments;

	let prefix = '';
	for (let i = 1; i < args.length; i++) {
		if (i !== args.length - 1) prefix = prefix + args[i] + ' ] [ ';
		else prefix = prefix + args[i];
	}

	if (typeof categoryName === 'string') {
		// category name is __filename then cut the prefix path
		categoryName = categoryName.replace(process.cwd(), '');
	}

	const logger = log4js.getLogger(categoryName);
	const pLogger = {};
	for (const key in logger) pLogger[key] = logger[key];

	[ 'log', 'debug', 'info', 'warn', 'error', 'trace', 'fatal', 'off' ].forEach((level) => {
		const levelStrLower = level.toString().toLowerCase();
		const levelMethod = levelStrLower.replace(/_([a-z])/g, (g) => g[1].toUpperCase());
		const isLevelMethod = levelMethod[0].toUpperCase() + levelMethod.slice(1);

		pLogger[level] = function(...params) {
			let prefixMessage = '';
			if (process.env.RAW_MESSAGE) {
				logger[level].apply(logger, params);
				return;
			}

			prefixMessage = concatMessage('', prefix);

			if (process.env.LOGGER_LINE || process.env.LOGGER_METHOD || process.env.LOGGER_FILENAME) {
				const stackInfo = getStackInfo();
				if (process.env.LOGGER_FILENAME) prefixMessage = concatMessage(prefixMessage, stackInfo.filepath);
				if (process.env.LOGGER_METHOD) prefixMessage = concatMessage(prefixMessage, stackInfo.method);
				if (process.env.LOGGER_LINE) prefixMessage = concatMessage(prefixMessage, stackInfo.line);
			}

			if (process.env.LOGGER_PROCESS) prefixMessage = concatMessage(prefixMessage, process.pid);

			params.length > 0 ? (params[0] = prefixMessage + params[0]) : params.push(prefixMessage);
			params[0] = colorize(params[0], level);

			logger[level].apply(logger, params);
		};

		pLogger[`is${isLevelMethod}Enabled`] = () => {
			return logger.isLevelEnabled(level);
		};
	});

	pLogger.level = () => {
		return logger.level.levelStr;
	};

	return pLogger;
}

function initReloadConfiguration(filename, reloadSecs) {
	if (configState.timerId) {
		clearInterval(configState.timerId);
		delete configState.timerId;
	}
	configState.filename = filename;
	configState.lastMTime = getMTime(filename);
	configState.timerId = setInterval(reloadConfiguration, reloadSecs * 1000);
}

function reloadConfiguration() {
	const mtime = getMTime(configState.filename);
	if (!mtime) return;

	if (configState.lastMTime && mtime.getTime() > configState.lastMTime.getTime()) {
		configureOnceOff(loadConfigurationFile(configState.filename));
	}
	configState.lastMTime = mtime;
}

function configureOnceOff(config) {
	if (!config) return;
	try {
		configureLevels(config.reloadLevels);
		initConfiguration(config);
	} catch (e) {
		throw new Error(`Problem reading log4js config ${util.inspect(config)}. Error was "${e.message}" (${e.stack})`);
	}
}

function configureLevels(reloadLevels) {
	if (!reloadLevels) return;
	for (const category in reloadLevels) {
		if (!reloadLevels.hasOwnProperty(category)) continue;
		log4js.getLogger(category).level = reloadLevels[category];
	}
}

function initConfiguration(config) {
	process.env.RAW_MESSAGE = getStringBool(config.rawMessage, false);
	process.env.LOGGER_LINE = getStringBool(config.lineDebug, true);
	process.env.LOGGER_FILENAME = getStringBool(config.fileDebug, true);
	process.env.LOGGER_METHOD = getStringBool(config.methodDebug, false);
	process.env.LOGGER_PROCESS = getStringBool(config.processDebug, true);

	if (config.withoutBraces) {
		marker.start = '';
		marker.end = ' ';
	} else {
		marker.start = '[ ';
		marker.end = ' ] ';
	}

	if (config.replaceConsole) {
		process.nextTick(() => {
			const logger = log4js.getLogger();
			console.originalLog = console.log;
			console.log = logger.debug.bind(logger);
		});
	} else {
		if (typeof console.originalLog === 'function') console.log = console.originalLog.bind(console);
	}
}

/**
 * Configure the logger.
 * Configure file just like log4js.json. And support ${scope:arg-name} format property setting.
 * It can replace the placeholder in runtime.
 * scope can be:
 *     env: environment variables, such as: env:PATH
 *     args: command line arguments, such as: args:1
 *     opts: key/value from opts argument of configure function
 *
 * @param  {String|Object} config configure file name or configure object
 * @param  {Object} opts   options
 * @return {Void}
 */
function configure(config, opts) {
	const filename = config;
	config = config || process.env.LOG4JS_CONFIG;
	opts = opts || {};

	if (typeof config === 'string') {
		config = JSON.parse(fs.readFileSync(config, 'utf8'));
		initConfiguration(config);
	}

	if (config) {
		config = replaceProperties(config, opts);
	}

	if (filename && typeof filename === 'string' && config && config.reloadSecs) {
		initReloadConfiguration(filename, config.reloadSecs);
	}

	// config object could not turn on the auto reload configure file in log4js

	log4js.configure(config, opts);
}

module.exports = {
	getLogger: getLogger,
	configure: configure,
	shutdown: log4js.shutdown,
	addLayout: log4js.addLayout
};
