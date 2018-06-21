# bearcatjs-logger

BearcatJS-Logger 从 Pomelo-Logger 项目克隆而来, 是基于 [Log4js](https://github.com/nomiddlename/log4js-node) 的封装版本, 增加了一些比较有用的功能.

Pomelo 的用户请使用 Pomelo-Logger 原生版本.

## 安装

```bash
npm install bearcatjs-logger
```

## 特性

### 定制日志前缀

除了 Category 分类之外, 还可以在 Log 方法中增加其他自定义的前缀. 前缀可以是文件名, 服务器 ID, 服务器类型, 主机名等等, 但是本封装已经默认集成了文件名, 进程号, 日志所在代码行号等, 参考后面内容通过配置文件进行开启关闭.

使用自定义的前缀, 只需要在 `getLogger` 方法中传参数即可.

```js
const Logger = require('bearcatjs-logger');
// 更多的配置内容参考: https://log4js-node.github.io/log4js-node/index.html
Logger.configure({
  "appenders": {
    "console": {"type": "console"},
  },
  "categories": {"default": { "appenders": ["console"], "level": "ERROR" }},
  "replaceConsole": true
});
// 这一行中, getLogger 方法传入的第一个参数是日志分类, 其余的都是自定义的前缀.
const logger = Logger.getLogger(category, prefix1, prefix2, ...);
```

日志输出的时候, 将会把这些前缀打印在日志前面.

### 替换默认的 Console 方法

如果项目中原来使用的是 `console.log` 方法, 开始使用 BearcatJS Logger 那么只需要使用 **replaceConsole** 和默认的分类配置选项即可自动集成到 BearcatJS Logger 中来:

```json
{
  "appenders": {
    "console": {"type": "console"},
  },
  "categories": {"default": { "appenders": ["console"], "level": "ERROR" }},
  "replaceConsole": true
}
```

系统 Console 将被集成到 BearcatJS-Logger 之中, 如果想要同时写文件的话, 那么修改上面的 `console` 配置改成文件即可.

### 行号, 文件名, 方法, 进程号支持

在测试环境下, 可能需要打印行号, 文件名, 方法, 进程号等信息, 使用下面的开关进行开启:

```js
process.env.LOGGER_LINE = true;
process.env.LOGGER_FILENAME = true;
process.env.LOGGER_METHOD = true;
process.env.LOGGER_PROCESS = true;
```

或者, 使用配置文件中的 **lineDebug**, **fileDebug**, **methodDebug** 和 **processDebug** 参数控制.

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

### 代码格式

有时你可能不需要在默认的前缀外面增加 `[]` 来标记, 使用 **withoutBraces** 配置来关闭自动添加的 `[]` 标记.

```json
{
  "...": "...",
  "replaceConsole": true,

  // This line
  "withoutBraces": false
}
```

### 输出原生格式的日志

原生日志模式下, 本模块将不会做额外的处理, 不会增加前缀或者添加颜色, 开启原生模式:

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

推荐在生产环境下使用本模式.

### 动态配置文件支持

在日志配置文件 `log4js.json` 中, 增加 **reloadSecs** 参数, 用于在指定时间重新加载日志配置文件.

重新加载的日志级别在 **reloadLevels** 对象中配置, 该对象的 key 是 Categories 中的分类名, value 值是修改的日志级别, 例如: 'DEBUG', 'INFO', 'ERROR' 等.

配置 **rawMessage**, **replaceConsole**, **withoutBraces**, **lineDebug**, **fileDebug**, **methodDebug**, **processDebug** 也将重新加载生效. 例如:

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

上面的配置意思是每隔 30 秒将重新加载配置文件, 重新定义日志等级, 但是并不支持动态的 Appenders.

**注意: 使用自动加载功能需要 `Logger.configure(filepath)` 参数指定的配置文件是文件路径而非 json 对象.**

## 例子

参考文件夹 'examples' 中的代码.

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
