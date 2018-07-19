// In The Project, require("bearcatjs-logger");
const Logger = require('../index');

// Using File Path, Support Auto Reload Config File
const Path = require('path');
Logger.configure(Path.join(__dirname, './logger.json'), {
	serverId: process.pid
});

const rpcLog = Logger.getLogger('rpc-log');
const rpcDebug = Logger.getLogger('rpc-debug', 'debug prefix', 'prefix again');
const logstash = Logger.getLogger('logstash');
const logger = Logger.getLogger();

// This Overwrite `lineDebug = true` In Config.
// process.env.LOGGER_LINE = true;

setInterval(() => {
	rpcLog.debug('RPC Log - debug');
	rpcLog.info('RPC Log - info');
	rpcLog.warn('RPC Log - warn');
	rpcLog.error('RPC Log - error');
	console.log('rpcLog Level Is ', rpcLog.level());

	rpcDebug.debug('RPC Debug Log - debug');
	rpcDebug.info('RPC Debug Log - info');
	rpcDebug.warn('RPC Debug Log - warn');
	rpcDebug.error('RPC Debug Log - error');
	console.log('rpcDebug Level Is ', rpcDebug.level());

	logstash.debug('Logstash Log - debug');
	logstash.info('Logstash Log - info');
	logstash.warn('Logstash Log - warn');
	logstash.error('Logstash Log - error');
	console.log('logstash Level Is ', logstash.level());

	logger.debug('Default Log With No Category. Not Suggested');
	console.log('Original Console Log. Not Suggested');
	console.log('logger Level Is ', logger.level());

	logger.debug();
}, 2e3);
