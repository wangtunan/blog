# 文字

## 长文本换行
::: tip 说明
有时候当一个容器里面的文字太多，而我们又不想让他折叠省略，更希望让它按我们的希望进行换行。
:::
下面是长文本换行的关键`html`结构和`css`代码：
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

与上面长本文换行相对，文字截断适用于文字可能会较多，但又不想让其还行折叠省略的情况。

### 单行文本截断
::: tip 特点
单行文本截断有：实现简单，兼容性好的优点
:::
单行文本截断我们可能接触的比较多，使用`text-overflow:ellipsis`来处理文本的溢出，对于单行文本截断，我们只需要下面几行代码就能实现。
```css
/* 关键性代码 */
white-space: nowrap;
text-overflow: ellipsis;
overflow: hidden;
```

### 多行文本截断
::: tip 特点
多行文本截断有：不容易实现，常见的多行文本截断方式浏览器兼容性一般。
:::
与单行文本截断相对，多行文本截断实现起来就不那么容易了，相信你一定见过如下实现多行文本截断的方式。
```css
width: 300px;
/* 关键代码 */
display: -webkit-box;
-webkit-box-orient: vertical;
overflow: hidden;
-webkit-line-clamp: 2;
text-overflow:ellipsis; /*可选的属性*/
```
<multi-line-text/>
:point_up_2: 你可以在上面输入框中输入任意文字，试试效果。

**实现分析**：
* 必须和`display`、`-webkit-box-orient`以及`overflow`配合一起使用。
* `-webkit-line-clamp`不是一个规范的标准属性，它只存在于`webkit`内核的浏览器，对于`Firefox`和`IE`是不支持的。
* 更适用于移动端的解决方案，因为移动端设备浏览器多基于`webkit`

### 自定义实现方式
考虑到在`PC`端多行文本截断一样有很多使用的场景，上面的解决办法就不那么通用了，那么能不能自己实现一种多行文本截断的方式呢？

#### 定位方案
先上实现效果，如下图：
![定位方案](https://user-images.githubusercontent.com/48847606/60395151-c2921f80-9b61-11e9-8e6d-2373662f3b78.gif)

::: tip 说明
定位方案主要是利用`::before`或者`::after`伪元素的`content属性`，它对父元素也有一定的限制
:::
父元素的样式
```css
width: 80%;
position: relative;
height: 36px;
line-height: 18px;
overflow: hidden;
word-break: break-all;
```

伪元素的样式
```css
content: '...';
position: absolute;
right: 0;
bottom: 0;
/* 美化省略号 */
padding: 0 20px 1px 45px;
background: linear-gradient(to right, rgba(255, 255, 255, 0), white 50%, white);
```
::: warning 适用场景
仅仅适用于文字很多的情况，因为如果文字很少的话，省略号依然存在。
:::
## 两端对齐
::: tip
两端对齐可以适用`text-align:justify`属性来实现两端对齐，但这个属性只对多行有效，如果确定只有一行文字，可以使用`text-align-last:justify`来配合使用，此属性兼容性一般。
:::
下面是关键的`css`代码
```css
width: 100px;
/* 关键代码 */
display: inline-block;
text-align:justify;
text-align-last: justify;
```
:point_down:下面是实现效果
<align-justify/>

## 文字特效
::: tip
有时候我们不得不设计一些特殊的文字效果来吸引用户的眼球，例如文字投影，3D文字以及文字外发光等，适当的使用一些文字特效，能有效提升网站的颜值。
:::

### 文字外发光
文字外发光的代码
```css
/* 关键代码text-shadow */
text-shadow: 0 0 2px, 0 0 6px;
font-size: 18px;
color: #fff;
```
:point_down:下面是实现效果
<special-effect :index="1"/>
### 空心文字
::: tip
空心文字效果利用了多边偏移投影来实现，性能消耗较高，而且描边越大，效果越差。
:::
下面时候空心文字的代码
```css
/* 关键代码 */
text-shadow: 1px 1px black,
            -1px -1px black,
            1px -1px black,
            -1px 1px black;
```
:point_down:你可以滑动滑块来改变描边的大小，实时观看空心文字的效果！
<special-effect :index="2"/>

### 文字模糊
::: tip
文字模糊效果可用`text-shadow`或者`filter`来实现
:::
下面是文字模糊的代码
```css
/* filter方式关键代码 */
filter: blur(2px);

/* text-shadow方式关键代码 */
color:transparent;
text-shadow: 0 0 5px rgba(0,0,0,0.6);
```
你可以鼠标移入下面的文字，查看文字模糊效果！:point_down::point_down::point_down:
<special-effect :index="3"/>

### 文字凸起/凹陷

### 文字颜色渐变

## 首字母下沉

## 竖排文字