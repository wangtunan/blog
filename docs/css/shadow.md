# 投影
::: tip
投影的需要使用`box-shadow`，它可以分别对盒模型的上、下、左、右进行投影，根据设置的不同值，可以实现邻边投影、对边投影和单边投影等等效果，它可以用来实现边框效果。
:::
## 基本投影
下面是基本投影的`html`结构：
```html
<div class="shadow-item" ></div>
```
下面是基本投影的`css`代码：
```css
.shadow-item {
  background-color: #58a;
  /* 关键css */
  box-shadow: -5px 0 5px rgba(0,0,0,0.8), 5px 0 5px rgba(0,0,0,0.8);
}
```
<base-shadow/>
:point_up_2: 你可以在上面勾选要显示的投影，来查看实时效果。
## 投影边框

投影边框已在前面小结撰写过，请点击:point_right:[边框](/css/border)去了解更多。

## 不规则投影
::: tip
对于不规则图形的投影，可以使用`filter:drop-shadow`来替代`box-shadow`。
:::
下面是不规则投影的`html`结构：
```html
<div class="shadow-item"></div>
```
正如你在下面看到的那样，对于不规则的图形，`box-shadow`就显得无能为力了。
下面是不规则投影的`css`代码：
```css
.shadow-item {
  position: relative;
  margin: 20px auto 30px;
  width: 300px;
  height: 110px;
  background-color: #58a;
  box-shadow: 0 10px 8px rgba(0,0,0,0.8);
  &::after {
    content: '';
    position: absolute;
    left: 50%;
    bottom: -20px;
    margin-left: -10px;
    width: 0;
    height: 0;
    border: 10px solid #58a;
    border-color: #58a transparent transparent transparent;
  }
}
```
<inregular-shadow/>
:point_up_2: 你可以在上面勾选是否需要`drop-shadow`，来查看实时效果。
::: tip
`drop-shadow`的参数和`box-shadow`一样，上述勾选`drop-shadow`后的`css`代码如下：
```css
filter: drop-shadow(0 10px 8px rgba(0,0,0,0.8))
```
:::

## 投影实践