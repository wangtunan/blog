# 背景

## 背景定位
::: tip
有时候，我们需要把一张图片定位到容器指定的位置，而不仅仅是中间，我们可以使用`background-position`来实现。
:::
下面是背景定位的`html`结构：
```html
<div class="bg"></div>
```
下面是背景定位的`css`代码：
```css
.bg {
  height: 150px;
  background: #58a url('/icon.png') no-repeat;
  background-size: 50px 50px;
  /* 默认值 */
  background-position: left top;
}
```
<background-position/>
:point_up_2: 你可以在上面选择你要定位的位置，来查看实时效果。
::: tip
`background-position`属性中的值，也可以带一个像素值或者百分比，例如：`background-position: left 10px top 10px`，它表示距离左边`10px`，距离上边`10px`
:::
## 背景大小
撰写中。。。