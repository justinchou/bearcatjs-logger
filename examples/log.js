const Logger = require("..");
const Config = require("./log4js.json");
Logger.configure(Config, { serverId: process.pid });

const rpcLog = Logger.getLogger("rpc-log", __filename, process.pid);
const rpcDebug = Logger.getLogger("rpc-debug", __filename, process.pid);
const adminLog = Logger.getLogger("admin", process.pid, __filename);
const logger = Logger.getLogger();

// This Is Same As `lineDebug = true` In Config.
process.env.LOGGER_LINE = true;

rpcLog.debug("RPC Log - debug");
rpcLog.info("RPC Log - info");
rpcLog.warn("RPC Log - warn");
rpcLog.error("RPC Log - error");

rpcDebug.debug("RPC Debug Log - debug");
rpcDebug.info("RPC Debug Log - info");
rpcDebug.warn("RPC Debug Log - warn");
rpcDebug.error("RPC Debug Log - error");

adminLog.debug("Admin Log - debug");
adminLog.info("Admin Log - info");
adminLog.warn("Admin Log - warn");
adminLog.error("Admin Log - error");

logger.debug("Default Log With No Category. Not Suggested");
