# 边框

## 半透明边框
::: tip
默认情况下，我们设置的背景模浸染到`border`边框下面，如果这不是我们希望的话，可以通过`background-clip:padding-box`属性来更改它的默认行为
:::
下面是半透明边框的代码：
```css
background-color: #58a;
border: 10px solid rgba(255,102,0,0.3);
background-clip: padding-box
```
:point_down:你可以点击下面的复选框，来查看`padding-box`属性值的实时效果：
<opacity-border/>

## 多重边框
::: tip
`box-shadow`除了可以用来添加投影以外，还可以用来设计边框，多重边框可以使用`box-shadow`和`outline`来实现。
:::
下面是多重边框的代码：
```css
background-color: #58a;
box-shadow: 0 0 0 10px #fb3;
outline: 1px dashed #333;
outline-offset: -10px;
```
下面是多重边框的实时效果：
<multiple-border/>

## 边框内圆角
我们知道，使用`box-shadow`设计出来的边框，它会仅仅贴合在`border-radius`的圆角边，像下面这样：
```css
background-color: #58a;
border-radius: 15px;
box-shadow: 0 0 0 5px #fb3;
```
<border-radius :index="1"/>

而使用`outline`设计出来的边框，它不会贴合在`border-radius`创建出来的圆角边，像下面这样：
```css
background-color: #58a;
border-radius: 15px;
outline: 5px solid #fb3;
```
<border-radius :index="2"/>

那么要结合这种个CSS属性，就能实现边框内圆角的效果，像下面这样：
```css
outline: 8px solid #fb3;
box-shadow: 0 0 0 6px #fb3;
```
<border-radius :index="3"/>
:point_up_2: 你可以勾选复选框，查看实时效果，:point_up_2:你也可以更改`box-shadow`的发散宽度来查看:mag_right:一个隐藏的小问题。

::: tip
如果要利用上述方案实现边框内圆角的效果，那么你`outline`的宽度和`box-shaodw`的发散宽度一定要是合理设计过的，不然它会有一点没有遮盖到。
:::
## 动态边框

## 移动端1px边框