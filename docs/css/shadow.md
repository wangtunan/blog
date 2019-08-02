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
::: tip
以下示例来源于掘金文章：:point_right:原文链接[单标签！纯CSS实现动态晴阴雨雪](https://juejin.im/post/5d2716ab5188257b775d35ba)
:::
完成后最终效果如下：
![投影实践](@images/css/5.gif)

由于以上效果都是单标签实现的，不同的天气效果，用不同的类来实现，他们基本的`html`结构如下：
```html
<div class="weather-box">
  <div class="weather sunny"></div>
  <div class="weather cloudy"></div>
  <div class="weather rainy"></div>
  <div class="weather snowy"></div>
</div>
```
在基本的`html`结构下，我们添加一些必要的`css`代码，先把四个天气的容器写出来：
```css
.weather-box {
  margin: 50px auto;
  width: 800px;
}
.weather {
  position: relative;
  display: inline-block;
  margin-right: 10px;
  width: 180px;
  height: 240px;
  background-color: #23b7E5;
  border-radius: 8px;
}
```
添加以上代码后，效果如下：
![投影实践](@images/css/6.png)

### 晴天的实现
晴天实现起来相对来说简单一些，我们只需要按一下步骤实现即可：
* `::before`伪元素来实现圆
* `::after`伪元素来实现六角星
* 添加`animation`动画

#### 画圆
我们先来给`.sunny`类添加一些`css`代码：
```css
.sunny::before {
  content: '';
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: #F6D963;
  box-shadow: 0 0 20px #ff0;
}
```
添加以上代码后，效果如下：
![画太阳](@images/css/7.png)

#### 画六角星

我们知道六角星可以由两个等边三角形拼接而成，像下面这样：
![六角星](@images/css/8.png)

如果我们把六角星的中心点当做原点的话，那么六角星的每个点的坐标可以由几何知识计算而来：
![六角星](@images/css/9.png)

换算成百分比后，它的结果如下：
![六角星](@images/css/10.png)

::: tip
因为要用到`clip-path`属性，它是以左上角为圆点的，我们需要把圆点移动到左上角，那么六角星各个点的坐标要相应发生变化，计算公式如下：
* 新`x`轴坐标 = 旧`x`轴坐标 + `50%`
* 新`y`轴坐标 = `-1` * (旧`y`轴坐标 - `50%`)
:::
根据以上公示，新的坐标如下：
![六角星](@images/css/11.png)

有了六个点的坐标后，我们来写点`css`代码：
```css
.sunny::after {
    content: '';
    position: absolute;
    left: 50%;
    top: 50%;
    width: 90px;
    height: 90px;
    margin-left: -45px;
    margin-top: -45px;
    /* 不要用下面的代码居中，会和animation中的transform冲突 */
    /* transform: translate(-50%, -50%); */
    background: #FFEB3B;
    clip-path: polygon(
      50% 0%,
      65.43% 25%,
      93.3% 25%,
      78.87% 50%,
      93.3% 75%,
      64.43% 75%,
      50% 100%,
      35.57% 75%,
      6.7% 75%,
      21.13% 50%,
      6.7% 25%,
      35.57% 25%
    );
  }
```
写完以上代码后，我们将会得到一个六角星，如下：
![六角星](@images/css/12.png)

最后把六角星和圆结合起来之前，我们需要设置一些`z-index`，来让圆在上面，六角星在下面：
```css
.sunny::before {
  z-index: 2;
  /* 其它代码略 */
}
.sunny::after {
  z-index: 1;
  /* 其它代码略 */
}
```
结合以后，效果如下：
![六角星](@images/css/13.png)

#### 添加动画
我们来给六角星添加一个动画，写一个`animation`：
```css
@keyframes mySunnyScale {
  0% {
    transform: scale(1)
  } 50% {
    transform: scale(1.1)
  } 100% {
    transform: scale(1)
  }
}
```
再给六角星添加`animation`属性：
```css
.sunny::after {
  /* 其它代码略 */
  animation: mySunnyScale 2s linear infinite;
}
```

最终实现效果如下：
![六角星](@images/css/14.gif)
### 阴天的实现
::: tip
我们观察可以发现，阴天、雨天、雪天都有一个乌云，那么如何用单标签实现这个乌云呢，答案是`box-shadow`属性，它的属性介绍如下：<br/>
`box-shadow`: h-shadow v-shadow blur spread color inset
* `h-shadow`：代表水平方向的阴影，正值代表右侧投影，负值代表左侧投影，0代表水平方向无投影
* `v-shadow`：代表垂直方向的阴影，正值代表下侧投影，负值代表上侧投影，0代表垂直方向无投影
* `blur`：代表模糊距离
* `spread`：代表投影的尺寸
* `color`：代表投影的颜色
* `inset`：有此值代表内投影，默认是外投影
:::

先来实现一个`基元素`，后续的`box-shadow`都是在它的基础上，通过偏移和大小来实现`影分身`的效果的，添加`css`代码：
```css
.cloudy::before,
.rainy::before,
.snowy::before {
  content: '';
  position: absolute;
  left: 25%;
  top: 50%;
  width: 36px;
  height: 36px;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  background-color: #fff;
}
```
添加上面的代码后，你会得到如下的效果：
![六角星](@images/css/15.png)

现在我们通过`box-shadow`来实现第一个`影分身`，添加如下代码：
```css
.cloudy::before,
.rainy::before,
.snowy::before {
  /* 其它代码略 */
  box-shadow: 22px -15px 0 6px #fff;
}
```
第一个`影分身`的效果如下：
![六角星](@images/css/17.png)
<br/>
相同的原理，我们通过调整偏移，多添加几个`影分身`：
```css
.cloudy::before,
.rainy::before,
.snowy::before {
  /* 其它代码略 */
  box-shadow: 22px -15px 0 6px #fff,
              57px -6px 0 2px #fff, 
              87px 4px 0 -4px #fff,
              33px 6px 0 6px #fff,
              61px 6px 0 2px #fff,
              29px -23px 0 6px #ccc,
              64px -14px 0 2px #ccc,
              94px -4px 0 -4px #ccc;
}
```
添加以上`影分身`代码后，你将得到如下效果：
![六角星](@images/css/16.png)


### 雨天的实现
::: tip
雨天的乌云效果直接服用阴天的乌云，我们只需要按云朵`影分身`的逻辑加雨滴即可。
:::
为雨天添加雨滴的`css`代码：
```css
.rainy::before {
  /* 为了方便观看雨滴的影分身效果，先把乌云去掉 */
  display: none;
}
.rainy::after {
  content: '';
  position: absolute;
  left: 30%;
  top: 55%;
  width: 4px;
  height: 14px;
  border-radius: 2px;
  background-color: #fff;
}
```
雨滴的第一个`影分身`效果如下：
![六角星](@images/css/18.png)

相同的道理，我们多添加几个`box-shadow`，它的`css`代码如下：
![六角星](@images/css/19.png)

处理完`影分身`后，我们来添加`animation`来实现下雨的动画效果：
```css
/* 偏移10deg，让雨滴有一个随风吹落的效果 */
@keyframes rainyDrop {
  0% {
    transform: translate(0,0) rotate(10deg);
  } 100% {
    transform: translate(-4px,24px) rotate(10deg);
    box-shadow: 0 25px 0 #fff,
                0 50px 0 rgba(255,255,255,0),
                20px -15px 0 #fff,
                20px 10px 0 #fff,
                20px 35px 0 rgba(255,255,255,0),
                40px 0 0 #fff,
                40px 25px 0 #fff,
                40px 50px 0 rgba(255,255,255,0),
                60px -15px 0 #fff,
                60px 10px 0 #fff,
                60px 35px 0 rgba(255,255,255,0);
  }
}

.rainy::after {
  animation: rainyDrop 2s linear infinite;
}
```

雨天最终的实现效果如下：
![六角星](@images/css/20.gif)

### 雪天的实现
::: tip
雪天的乌云效果直接服用阴天的乌云，我们只需要按云朵`影分身`的逻辑加雪花即可。
:::
与雨滴的逻辑类似，我们雪天的动画`css`代码如下：
```css
@keyframes snowDrop {
  0% {
    transform: translateY(0);
  } 100% {
    transform: translateY(24px);
    box-shadow: 0 25px 0 #fff,
                0 50px 0 rgba(255,255,255,0),
                20px -15px 0 #fff,
                20px 10px 0 #fff,
                20px 35px 0 rgba(255,255,255,0),
                40px 0 0 #fff,
                40px 25px 0 #fff,
                40px 50px 0 rgba(255,255,255,0),
                60px -15px 0 #fff,
                60px 10px 0 #fff,
                60px 35px 0 rgba(255,255,255,0);
  }
}
```
雪天的`css`代码：
```css
.snowy::after {
  content: '';
  position: absolute;
  left: 30%;
  top: 55%;
  width: 8px;
  height: 8px;
  background-color: #fff;
  border-radius:50%;
  box-shadow: 0 25px 0 #fff,
              0 50px 0 #fff,
              20px -15px 0 #fff,
              20px 10px 0 #fff,
              20px 35px 0 #fff,
              40px 0 0 #fff,
              40px 25px 0 #fff,
              40px 50px 0 #fff,
              60px -15px 0 #fff,
              60px 10px 0 #fff,
              60px 35px 0 #fff;
  animation: snowDrop 2s linear infinite;
}
```
雪天最终实现效果:tada::tada::tada: :
![投影实践](@images/css/5.gif)