# 简单

## 20.有效括号
::: tip
**要求**：给定一个只包括 '('，')'，'{'，'}'，'['，']' 的字符串 s ，判断字符串是否有效闭合。  
**输入**：s = "()[]{}"  
**输出**：true  
**原题链接**：[20.有效括号](https://leetcode.cn/problems/valid-parentheses) 
:::
```js
// n为字符串的长度
// 时间复杂度：O(n)，需要遍历一遍字符串
// 空间复杂度：O(n)，定义栈数组
var isValid = function(s) {
  const len = s.length;
  if (len % 2 !== 0) {
    return false;
  }
  const stack = [];
  const matchMap = {
    ')': '(',
    '}': '{',
    ']': '['
  }
  for(let i = 0; i < len; i++) {
    const char = s.charAt(i);
    const peek = stack[stack.length - 1];
    if (peek && peek === matchMap[char]) {
      stack.pop();
    } else {
      stack.push(char);
    }
  }

  return stack.length === 0;
};
```