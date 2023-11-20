# 中等

## 155.最小栈
::: tip
**要求**：设计一个支持push，pop，top操作，并能在常数时间内检索到最小元素的栈。  
**输入**：stack = [-2, 0, -3, 1], getMin()  
**输出**：-3   
**原题链接**：[155.最小栈](https://leetcode.cn/problems/min-stack) 
:::
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
::: tip
**要求**：给定一个经过编码的字符串，返回它解码后的字符串。  
**输入**：s = "3[a2[c]]"    
**输出**："accaccacc"    
**原题链接**：[394.字符串解码](https://leetcode.cn/problems/decode-string) 
:::
```js
// n为字符串的长度
// 时间复杂度：O(n)，需要遍历字符串
// 空间复杂度：O(n)，两个栈数组的开销
var decodeString = function(s) {
  const numStack = [];
  const strStacck = [];
  let res = '';
  let num = 0;
  for(const char of s) {
    if (!isNaN(char)) {
      num = num * 10 + Number(char, 10);
    } else if (char === '[') {
      numStack.push(num);
      strStacck.push(res);
      num = 0;
      res = '';
    } else if (char === ']') {
      res = strStacck.pop() + res.repeat(numStack.pop());
    } else {
      res += char;
    }
  }
  return res;
};
```