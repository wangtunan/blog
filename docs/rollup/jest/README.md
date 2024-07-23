# 支持Jest自动化测试
如果需要支持`Jest`自动化测试，需要我们安装额外的`npm`包：
```bash
# 安装jest
$ npm install jest -D
```
因为要测试的文件是包含`ts`代码，因此我们需要再安装其它的包：
```bash
$ npm install babel-jest ts-jest -D
```
安装完毕后，在根目录下新建`jest.config.js`文件，并填写配置：
```js
module.exports = {
  preset: 'ts-jest',
  testMatch: [
    "**/tests/**/*.(spec|test).(js|jsx|ts|tsx)"
  ],
  collectCoverage: true,
  coverageDirectory: '<rootDir>/tests/coverage',
  collectCoverageFrom: [
    'src/**/*.(js|jsx|ts|tsx)'
  ]
}
```
配置说明：
* `preset`：要测试的代码，包含`ts`的内容，使用`ts-jest`来处理。
* `testMatch`：测试哪些文件，以上配置表明我们要测试`tests`目录下所有`.(spce|test).(js|jsx|ts|tsx)`。
* `collectCoverage`：生成测试报告。
* `coverageDirectory`: 测试报告存放位置。
* `collectCoverageFrom`：测试报告收集范围。

配置文件撰写完毕后，我们在根目录下新建一个`tests`目录，并添加一个测试文件`index.test.js`。
```js
// 如果需要使用import，需要自己额外的配置
const { add } = require('../src/index')

describe('index.ts', () => {
  it('test add func', () => {
    expect(add(1, 2)).toBe(3)
  })
})
```
最后，需要在`package.json`文件中添加一条测试命令：
```json
"scripts": {
  "dev": "rollup -w -c rollup.dev.config.js",
  "build": "rollup -c rollup.prod.config.js",
  "test": "jest"
}
```
运行`npm run jest`命令，它会在控制台输出一些测试覆盖率的信息。
```
PASS tests/index.test.js
  index.ts
    √ test add func (2 ms)

----------|---------|----------|---------|---------|-------------------
File      | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s
----------|---------|----------|---------|---------|-------------------
All files |   83.33 |      100 |      50 |      75 | 
 index.ts |   83.33 |      100 |      50 |      75 | 6
----------|---------|----------|---------|---------|-------------------
Test Suites: 1 passed, 1 total
Tests:       1 passed, 1 total
Snapshots:   0 total
Time:        2.345 s
Ran all test suites.
```
