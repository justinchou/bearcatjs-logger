# bearcatjs-logger

Bearcatjs-logger Is Forked From Pomelo-logger, Is A [log4js](https://github.com/nomiddlename/log4js-node) Wrapper For [pomelo](https://github.com/NetEase/pomelo) Which Provides Some Useful Features.

If You Use Pomelo, Please Use Pomelo-logger, It's Original.

## Installation

```bash
npm install bearcatjs-logger
```

## Features

### Log Prefix

Besides Category, You Can Output Prefix As You Like In Your Log, Prefix Can Be filename, serverId, serverType, host and etc. To Use This Feature, You Just Pass Prefix Params To getLogger Function.

```js
const Logger = require('bearcatjs-logger');
Logger.configure({
  "appenders": {
    "console": {"type": "console"},
  },
  "categories": {"default": { "appenders": ["console"], "level": "ERROR" }},
  "replaceConsole": true
})
const logger = Logger.getLogger(category, prefix1, prefix2, ...);
```

Log Output Msg Will Output With Prefix Ahead

### Get Line Number In Debug

When In Debug Environment, You May Want To Get The Line Number Of The Log To Use This Feature, Add This Code.

```js
process.env.LOGGER_LINE = true;
```

In Pomelo, You Just Configure The Log4js File And Set **lineDebug** For true.

```json
{
  "...": "...",
  "replaceConsole": true,

  "lineDebug": true
}
```

### Log Raw Messages

In Raw Message Mode, Your Log Message Will Be Simply Your Messages, No Prefix And Color Format Strings To Use This Feature, Add This Code.

```js
process.env.RAW_MESSAGE = true;
```

In Pomelo, You Just Configure The Log4js File And Set **rawMessage** For true.

```json
{
  "...": "...",
  "replaceConsole": true,

  "rawMessage": true
}
```

### Dynamic Configure Logger Level

In Pomelo Logger Configuration File log4js.json, You Can Add reloadSecs Option. The reloadSecs Means Reload Logger Configuration File Every Given Time. For Example:

```json
{"reloadSecs": 30}
```

The Above Configuration Means Reload The Configuration File Every 30 Seconds. You Can Dynamic Change The Logger Level, But It Does Not Support Dynamiclly Changing Configuration Of Appenders.

## Example

> log4js.json

```json
{
  "appenders": {
    "console": {
      "type": "console"
    },
    "rpc-log": {
      "type": "file",
      "filename": "./logs/rpc-log-${opts:serverId}.log",
      "maxLogSize": 1048576,
      "layout": {
        "type": "basic"
      },
      "backups": 5,
      "category": "rpc-log"
    },
    "rpc-debug": {
      "type": "file",
      "filename": "./logs/rpc-debug-${opts:serverId}.log",
      "maxLogSize": 1048576,
      "layout": {
        "type": "basic"
      },
      "backups": 5,
      "category": "rpc-debug"
    }
  },
  "categories": {
    "default": { "appenders": ["console"], "level": "DEBUG" },
    "rpc-log": { "appenders": ["rpc-log"], "level": "ERROR" },
    "rpc-debug": { "appenders": ["rpc-debug"], "level": "DEBUG" },
  },
  "replaceConsole": true,

  "lineDebug": false
}
```

> log.js

```js
const Logger = require("..");
const Config = require("./log4js.json");
Logger.configure(Config, { serverId: process.pid });

const rpcLog = Logger.getLogger("rpc-log", __filename, process.pid);
const rpcDebug = Logger.getLogger("rpc-debug", __filename, process.pid);

process.env.LOGGER_LINE = true;

rpcLog.info("test1");
rpcLog.warn("test2");
rpcLog.error("test3");

rpcDebug.info("test1");
rpcDebug.warn("test2");
rpcDebug.error("test3");

```

## License

(The MIT License)

Copyright (c) 2012-2013 NetEase, Inc. and other contributors

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
