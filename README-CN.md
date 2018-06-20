# bearcatjs-logger

BearcatJS-Logger Is Forked From Pomelo-Logger, Is A [Log4js](https://github.com/nomiddlename/log4js-node) Wrapper For [Pomelo](https://github.com/NetEase/pomelo) Which Provides Some Useful Features.

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
// More Config You Can Find Here: https://log4js-node.github.io/log4js-node/index.html
Logger.configure({
  "appenders": {
    "console": {"type": "console"},
  },
  "categories": {"default": { "appenders": ["console"], "level": "ERROR" }},
  "replaceConsole": true
})
const logger = Logger.getLogger(category, prefix1, prefix2, ...);
```

Log Output Msg Will Output With Prefix Ahead.

### Replace Console

If You Used To Use `console.log` In The Old Code, What You Need To Is Just Config **replaceConsole** Option And Default Category Like This:

```json
{
  "appenders": {
    "console": {"type": "console"},
  },
  "categories": {"default": { "appenders": ["console"], "level": "ERROR" }},
  "replaceConsole": true
}
```

Then The Old Console Is Injected With BearcatJS-Logger, If You Want It Redirected Into File, Just Redefine The 'console' Config Block In Appenders.

### Get Line Number, FileName And/Or Method Name In Debug

When In Debug Environment, You May Want To Get The Line Number, Filename, Method And/Or Process Number Name Of The Log To Use This Feature, Add This Code.

```js
process.env.LOGGER_LINE = true;
process.env.LOGGER_FILENAME = true;
process.env.LOGGER_METHOD = true;
```

Or, You Just Configure The Log4js File And Set **lineDebug**, **fileDebug**, **methodDebug** And/Or **processDebug** For true.

```json
{
  "...": "...",
  "replaceConsole": true,

  // These lines
  "lineDebug": true,
  "fileDebug": true,
  "methodDebug": false,
  "processDebug": true
}
```

### Config Style

Sometimes, You Want `[]` Around Your Default Artributes, Sometimes Don't. So, With **withoutBraces** You Can Easilly Control This Feature.

```json
{
  "...": "...",
  "replaceConsole": true,

  // This line
  "withoutBraces": false
}

### Log Raw Messages

In Raw Message Mode, Your Log Message Will Be Simply Your Messages, No Prefix And Color Format Strings To Use This Feature, Add This Code.

```js
process.env.RAW_MESSAGE = true;
```

Or, You Just Configure The Log4js File And Set **rawMessage** For true.

```json
{
  "...": "...",
  "replaceConsole": true,

  // This line
  "rawMessage": true
}
```

### Dynamic Configure Logger Level

In Logger Configuration File log4js.json, You Can Add **reloadSecs** Option. The reloadSecs Means Reload Logger Configuration File Every Given Time.

The Reload Levels Are Configured In The reloadLevels Option, The Key Is The Category Name Matches One Of Items In Categories Block, And The Value Is Level Such As 'DEBUG', 'INFO', 'ERROR' Or Fourth...

The **rawMessage**, **replaceConsole**, **withoutBraces**, **lineDebug**, **fileDebug**, **methodDebug**, **processDebug** Are Also Reconfigured When Reload.

For Example:

```json
{
  "...": "...",
  "replaceConsole": true,

  // These lines
  "reloadSecs": 30,
  "reloadLevels": {
    "categoryName": "DEBUG"
  }
}
```

The Above Configuration Means Reload The Configuration File Every 30 Seconds. You Can Dynamic Change The Logger Level, But It Does Not Support Dynamiclly Changing Configuration Of Appenders.

**Note: You Need `Logger.configure(filepath)` With Filename And It's Absolute Path As First Param, To Use This Feature.**

## Example

See Code In Directory 'examples'.

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
