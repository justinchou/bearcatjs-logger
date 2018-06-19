const Logger = require("..");
const Config = require("./log4js.json");
Logger.configure(Config, { serverId: process.pid });

const rpcLog = Logger.getLogger("rpc-log", __filename, process.pid);
const rpcDebug = Logger.getLogger("rpc-debug", __filename, process.pid);
const logger = Logger.getLogger();

process.env.LOGGER_LINE = true;

rpcLog.info("test1");
rpcLog.warn("test2");
rpcLog.error("test3");

rpcDebug.info("test1");
rpcDebug.warn("test2");
rpcDebug.error("test3");

logger.debug("aaa");
