# 中等

## 150.逆波兰表达式求值
<leetcode-link title="150.逆波兰表达式求值" link="https://leetcode.cn/problems/evaluate-reverse-polish-notation" />

::: tip
**说明**：[逆波兰表达式](https://baike.baidu.com/item/%E9%80%86%E6%B3%A2%E5%85%B0%E5%BC%8F)   
:::

```js
// n为tokens字符串的长度
// 时间复杂度：O(n)，需要完整遍历一遍tokens字符串
// 空间复杂度：O(n)，栈存储的开销
var isNumber = function (token) {
  return !['+', '-', '*', '/'].includes(token);
}
var calculateMap = {
  '+': (num1, num2) => num1 + num2,
  '-': (num1, num2) => num1 - num2,
  '*': (num1, num2) => num1 * num2,
  '/': (num1, num2) => num1 / num2 > 0 ? Math.floor(num1 / num2) : Math.ceil(num1 / num2)
}
var evalRPN = function (tokens) {
  const stack = [];
  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];
    if (isNumber(token)) {
      stack.push(parseInt(token, 10));
    } else {
      const num2 = stack.pop();
      const num1 = stack.pop();
      const num = calculateMap[token](num1, num2);
      stack.push(num);
    }
  }
  return stack.pop();
};
```

## 155.最小栈
<leetcode-link title="155.最小栈" link="https://leetcode.cn/problems/min-stack" />


```js
// n为元素的数量
// 时间复杂度：O(1)，入栈、出栈时间复杂度为常数阶
// 空间复杂度：O(n + n)，常规栈空间大小 + 辅助栈空间大小
var MinStack = function() {
  this.stack = []
  this.minStack = [Infinity]
};
MinStack.prototype.push = function(val) {
  this.stack.push(val)
  this.minStack.push(Math.min(val, this.getMin()))
};
MinStack.prototype.pop = function() {
  this.stack.pop()
  this.minStack.pop()
};
MinStack.prototype.top = function() {
  return this.stack[this.stack.length - 1]
};
MinStack.prototype.getMin = function() {
  return this.minStack[this.minStack.length - 1]
};
```

## 394.字符串解码
<leetcode-link title="394.字符串解码" link="https://leetcode.cn/problems/decode-string" />

```js
// n为字符串的长度
// 时间复杂度：O(n)，需要遍历字符串
// 空间复杂度：O(n)，两个栈数组的开销
var decodeString = function(s) {
  const numStack = [];
  const strStack = [];
  let res = '';
  let num = 0;
  for(const char of s) {
    if (!isNaN(char)) {
      num = num * 10 + Number(char, 10);
    } else if (char === '[') {
      numStack.push(num);
      strStack.push(res);
      num = 0;
      res = '';
    } else if (char === ']') {
      res = strStack.pop() + res.repeat(numStack.pop());
    } else {
      res += char;
    }
  }
  return res;
};
```

## 739.每日温度
<leetcode-link title="739.每日温度" link="https://leetcode.cn/problems/daily-temperatures" />

方法一：暴力对比
::: warning
能运行测试用例，但提交会判定超时
:::
```js
// n是温度数组的长度
// 时间复杂度：O(n²)，需要两次遍历对比
// 空间复杂度：O(n)，返回结果数组的存储开销
var dailyTemperatures = function(temperatures) {
  const len = temperatures.length;
  const result = new Array(len).fill(0);
  for(let i = 0; i < len; i++) {
    const current = temperatures[i];
    for(let j = i + 1; j < len; j++) {
      if (temperatures[j] > current) {
        result[i] = j - i
        break;
      }
    }
  }
  return result
};
```

方法二：单调栈
```js
// n是温度数组的长度
// 时间复杂度：O(n)，需要遍历一遍温度列表
// 空间复杂度：O(n)，需要维护下标栈存储开销
var dailyTemperatures = function(temperatures) {
  const len = temperatures.length；
  const result = new Array(len).fill(0)；
  const stack = [];

  for(let index = 0; index < len; index++) {
    while(stack.length && temperatures[index] > temperatures[stack[stack.length - 1]]) {
      const peekIndex = stack.pop();
      result[peekIndex] = index - peekIndex;
    }
    stack.push(index);
  }
  return result;
}
```