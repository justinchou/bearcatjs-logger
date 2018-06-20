// In The Project, require("bearcatjs-logger");
const Logger = require('../index');

// Using File Path, Support Auto Reload Config File
const Path = require('path');
Logger.configure(Path.join(__dirname, './log4js.json'), {
	serverId: process.pid
});

const rpcLog = Logger.getLogger('rpc-log');
const rpcDebug = Logger.getLogger('rpc-debug');
const adminLog = Logger.getLogger('admin-log');
const logger = Logger.getLogger();

// This Overwrite `lineDebug = true` In Config.
// process.env.LOGGER_LINE = true;

setInterval(() => {
	rpcLog.debug('RPC Log - debug');
	rpcLog.info('RPC Log - info');
	rpcLog.warn('RPC Log - warn');
	rpcLog.error('RPC Log - error');

	rpcDebug.debug('RPC Debug Log - debug');
	rpcDebug.info('RPC Debug Log - info');
	rpcDebug.warn('RPC Debug Log - warn');
	rpcDebug.error('RPC Debug Log - error');

	adminLog.debug('Admin Log - debug');
	adminLog.info('Admin Log - info');
	adminLog.warn('Admin Log - warn');
	adminLog.error('Admin Log - error');

	logger.debug('Default Log With No Category. Not Suggested');
	console.log('Original Console Log. Not Suggested');

	logger.debug();
}, 2e3);
