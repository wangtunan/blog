# 文字

## 长文本换行
::: tip 说明
有时候当一个容器里面的文字太多，而我们又不想让他折叠省略，更希望让它按我们的希望进行换行。
:::
下面的长文本换行的关键`html`结构和`css`代码：
```html
<div class="long-text">{{longText}}</div>
```

```css
margin: 20px 0;
width: 100%;
border: 1px solid #58a;
/* 关键性代码 */
word-wrap:break-word;
word-break: break-all;
```
<long-text/>
:point_up_2: 你可以在上面输入框中输入任意文字，试试效果。
## 文字截断

## 两端对齐

## 文字特效

## 首字母下沉

## 竖排文字