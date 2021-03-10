---
sidebar: auto
---
# JavaScript设计模式与开发实践

## 基础知识

### 面向对象的JavaScript
::: tip
编程语言按照数据类型大体分为两大类：一类是**静态类型语言**，一类是**动态类型语言**
:::

#### 静态类型语言的优缺点
**优点**：
* 能够在编译时就能发现类型不匹配的错误
* 能够根据数据的不同类型进行针对的优化，提高程序的执行速度

**缺点**:
* 强迫程序员必须使用强契约来编写程序，为每一个变量规定数据类型
* 类型的声明会增加更多的代码，这些细节容易让程序员的精力从思考业务逻辑上分散开

#### 动态类型语言的优缺点
**优点**：
* 编写的代码数量更少，看起来也更简洁，程序员可以把精力更多的放在业务逻辑上面

**缺点**:
* 无法保证变量的类型，从而在程序运行期有可能发生跟类型相关的错误

#### 鸭子类型
::: tip
如果它走起路来像鸭子，叫起来也像鸭子，那么它就是鸭子，鸭子类型指导我们只关注对象的行为，而不关注对象本身
:::
```js
// 鸭子类型
var duck = {
  duckSinging: function(){
    console.log('嘎嘎嘎');
  }
}
var chicken = {
  duckSinging: function(){
    console.log('嘎嘎嘎');
  }
}
// 合唱团
var choir = [];
var joinChoir = function(animal) {
  if(animal && typeof animal.duckSinging === 'function') {
    choir.push(animal);
    console.log('恭喜加入合唱团');
  }
}
joinChoir(duck);    // 恭喜加入合唱团
joinChoir(chicken); // 恭喜加入合唱团
```

#### 多态
::: tip
多态的含义是：同一操作作用于不同的对象，可以产生不同的解释和不同的执行结果
:::
```js
// 多态
var makeSound = function(animal) {
  animal.sound();
}
var Duck = function() {};
Duck.prototype.sound =function(){
  console.log('嘎嘎嘎');
}

var Chicken = function() {};
Chicken.prototype.sound = function() {
  console.log('咯咯咯');
}

makeSound(new Duck());    // 嘎嘎嘎
makeSound(new Chicken()); // 咯咯咯

var Dog = function() {}
Dog.prototype.sound = function() {
  console.log('汪汪汪');
}
makeSound(new Dog());     // 汪汪汪
```
### this，call和apply
::: tip
JavaScript中this始终指向一个对象，而具体指向哪个对象，是根据程序运行时的环境所决定的，不是在被声明时决定的
:::

**this指向的四种情况**
1. 作为对象的方法调用
2. 作为普通函数调用
3. 构造器调用
4. Function.prototype.call 或 Function.prototype.apply调用

**第一种：作为对象方法调用**
```js
// 第一种：作为对象方法调用
var obj = {
  a: 1,
  getA: function() {
    console.log(this.a)
  }
}
obj.getA(); // 输出1
```

**第二种：作为普通函数调用**
```js
// 第二种：作为普通函数调用
window.name = 'global-name';
var obj = {
  name: 'obj',
  getName: function() {
    return this.name;
  }
}
var newGetName = obj.getName;
console.log(newGetName());  // 输出global-name
```

**第三种：作为构造器调用**
::: tip
new进行构造器调用时的步骤:<br>
1. 新创建一个对象
2. 新对象进行原型委托
3. this绑定到这个新对象
4. 如果构造器不返回其他对象，那么默认返回这个新对象
:::
```js
// 第三种：作为构造器调用
function Student() {
  this.name = 'why';
}
var stu = new Student();
console.log(stu.name);      // 输出why

function Teacher() {
  this.name = 'www';
  return {
    name: 'AAA'
  }
}
var teacher = new Teacher();
console.log(teacher.name);  // 输出AAA，而不是wwww
```

**第四中：call和apply调用**
```js
// 第四中：call和apply调用
var obj1 = {
  name: 'why',
  getName: function() {
    return this.name;
  }
}
var obj2 = {
  name: 'AAA'
}
console.log(obj1.getName.call(obj2)); // 输出AAA
```

#### call和apply详解
::: tip 区别
1. apply只接受两个参数，其中第二个参数是一个类数组或者数组
2. call可以接受多个参数，即参数不固定
:::
```js
// call和apply的区别
var func = function(a,b,c) {
  console.log([a,b,c]);
}
// 当使用call和apply时，如果第一个参数传递的是null,则此时this指向全局对象
func.apply(null,[1,2,3]);   // 输出[1,2,3]
func.call(null,1,2,3);      // 输出[1,2,3]
```

##### call和apply的用途
::: tip
1. 改变this指向
2. Function.prototype.bind绑定
3. 借用其他对象的方法
:::

**改变this指向**
```js
// call和apply的用途：改变this指向
var obj1 = {
  name: 'why'
}
var obj2 = {
  name: 'www'
}
window.name = 'global-name'
var getName =function(){
  return this.name;
}
console.log(getName());           // 输出global-name
console.log(getName.call(obj1));  // 输出why
console.log(getName.apply(obj2)); // 输出www
```

**Function.prototype.bind绑定**
```js
// call和apply的用途：Function.prototype.bind绑定
// 基础bind实现
Function.prototype.bind = function(context) {
  var self = this;
  return function() {
    return self.apply(context,arguments);
  }
}
var obj = {
  name: 'why'
}
var func = function() {
  console.log(this.name);
}.bind(obj);
func(); // 输出why


// 完善版bind
Function.prototype.bind = function() {
  var self = this;
  var context = Array.prototype.shift.call(arguments); // 读取第一个参数，即this对象
  var args = Array.prototype.slice.call(arguments);    // 获取参数
  return function () {
    var newArgs = Array.prototype.concat.call(args,Array.prototype.slice.call(arguments));
    return self.apply(context,newArgs);
  }
}
var obj1 = {
  name: 'why'
}
var func = function(a,b,c,d) {
  console.log(this.name);
  console.log([a,b,c,d]);
}.bind(obj1,1,2);
func(3,4);    // 输出why  [1,2,3,4]
```

**借用其他对象的方法**
```js
// call和apply的用途：借用其他对象的方法
var Foo = function(name) {
  this.name = name;
}
var Bar = function() {
  Foo.apply(this,arguments);
}
Bar.prototype.getName = function(){
  return this.name;
}
var bar = new Bar('why');
console.log(bar.getName()); // 输出why
```
### 闭包和高阶函数

#### 闭包
::: tip
1. 全局变量的生存周期是永久的
2. 局部变量在退出函数时，局部变量会被销毁
3. 闭包能够延长局部变量的生存周期
:::
```js
// 变量的生存周期
window.name = 'why';
function foo() {
  var sex = '男';
  console.log(sex);
}
function bar() {
  var age = 10;
  return function() {
    return ++age;
  }
}
var _bar = bar();
console.log(name);    // 输出why
console.log(sex);     // 报错
console.log(_bar());  // 输出11
```

#### 闭包的作用
::: tip
1. 封装变量
2. 延续局部变量的寿命
:::
**封装变量**
```js
// 闭包的作用：封装变量
// 实例：计算乘积
var mult = (function(){
  var cache = {};
  // 小函数提取出来
  var calculate = function() {
    var a = 1;
    for(var i=0,len=arguments.length;i<len;i++) {
      a = a * arguments[i];
    }
    return a;
  }
  // 闭包计算
  return function() {
    var args = Array.prototype.join.call(arguments,',');
    if(cache[args]) {
      return cache[args]
    }
    let result = calculate.apply([],arguments);
    cache[args] = result;
    return result;
  }
})()

console.log(mult(1,2,3,4)); // 输出24
```
**延续局部变量的寿命**
```js
// 闭包的作用：延续局部变量的寿命
// 实例：利用img进行数据上报
var report = (function() {
  var imgs = [];
  return function(src) {
    var img = new Image();
    imgs.push(img);
    img.src = src;
  }
})()
```

#### 闭包和面向对象设计
::: tip
用面向对象思想能实现的功能，用闭包也能实现，反之亦然。
:::
```js
// 闭包和面向对象设计
var extent = function() {
  var value = 0;
  return {
    call: function() {
      value++;
      console.log(value);
    }
  }
}
var foo = extent();
foo.call();     // 输出1
foo.call();     // 输出2
foo.call();     // 输出3

var extent = {
  value: 0,
  call: function() {
    this.value++;
    console.log(this.value);
  }
}
extent.call();  // 输出1
extent.call();  // 输出2
extent.call();  // 输出3
```

#### 面向对象和闭包实现命令模式
**面向对象实现命令模式**
```js
// 面向对象实现命令模式
var TV = {
  open: function(){
    console.log('打开电视');
  },
  close: function(){
    console.log('关闭电视')
  }
}
var TVCommand = function(receiver) {
  this.receiver = receiver
}
TVCommand.prototype.open = function(){
  this.receiver.open();
}
TVCommand.prototype.close = function(){
  this.receiver.close();
}
var setCommand = function(command) {
  return {
    open: function(){
      command.open();
    },
    close: function(){
      command.close();
    }
  }
}
var obj = setCommand(new TVCommand(TV));
obj.open();   // 输出打开电视
obj.close();  // 输出关闭电视
```

**闭包实现命令模式**
```js
// 闭包实现命令模式
var TV = {
  open: function() {
    console.log('打开电视')
  },
  close: function() {
    console.log('关闭电视');
  }
}
var createCommand = function(receiver) {
  var open = function(){
    receiver.open();
  };
  var close = function(){
    receiver.close();
  }
  return {
    open: open,
    close: close
  }
}
var setCommand = function(command) {
  return {
    open: function(){
      command.open();
    },
    close: function() {
      command.close();
    }
  }
}
var obj =  setCommand(createCommand(TV));
obj.open();   // 输出打开电视
obj.close();  // 输出关闭电视
```

#### 闭包在内存泄露上的争议

1. 局部函数应该在函数退出时就销毁，而闭包却延续了局部变量的生存周期<br/>
**解答**：闭包之所以会延长局部变量的生存周期，是因为该局部变量会在以后使用到，而需要使用到的变量，你把它存放在全局或者闭包里，对内存方面的影响是一致的。

2. 使用闭包容易形成循环引用，如果闭包的作用域链中保存着一些DOM节点，这可能会造成内存泄露<br/>
**解答**：在IE浏览器中，垃圾回收机制是基于COM对象的引用计数策略，而基于此的垃圾回收机制无法在两个循环引用的对象之间进行回收，实质是并不是闭包的问题造成的。

#### 高阶函数
::: tip 条件
1. 函数可以作为参数被传递
2. 函数可以作为返回值输出
:::
JavaScript语言中的函数显然满足高阶函数的条件，在实际开发中，无论是将函数作为参数传递还是让函数的执行结果返回另一个函数，这两种情形都有很多的应用场景。

**函数作为参数传递**
```js
// 高阶函数的应用场景：函数作为参数传递
// 应用场景：创建100个div，并将这些div节点设置隐藏
var appendDiv = function(callback) {
  for(var i=0;i<100;i++) {
    var div = document.createElement('div');
    div.innerHTML = i;
    document.body.appendChild(div);
    if(typeof callback === 'function') {
      callback(div);
    }
  }
}
// 回调函数
var hideDiv = function(div) {
  div.style.display = 'none';
}

appendDiv(hideDiv);
```

**函数作为返回值输出**
```js
// 高阶函数的应用场景：函数作为返回值输出
// 应用场景：注册isType方法
var isType = function(type) {
  return function(obj) {
    return Object.prototype.toString.call(obj) === '[object '+ type+']';
  }
}
var isNumber = isType('Number');
var isString = isType('String');
var isArray = isType('Array');
console.log(isNumber(12));      // 输出true
console.log(isString('abc'));   // 输出true
console.log(isArray([1,2,3]));  // 输出true
```

**实现AOP**
::: tip
AOP(面向切面编程)的主要作用是把一些跟核心业务逻辑模块无关的功能抽离出来，这些跟业务逻辑无关的功能通常包括日志统计，安全控制，异常处理等。把这些功能抽离出来后，再通过动态织入的方式掺入业务逻辑模块中
:::
```js
// 高阶函数的应用场景：实现AOP
// 应用场景：装饰者模式
Function.prototype.before = function(beforeFn) {
  var _self = this;
  return function() {
    beforeFn.apply(this,arguments);
    return _self.apply(this,arguments);
  }
}
Function.prototype.after = function(afterFn) {
  var _self = this;
  return function() {
    var ret = _self.apply(this,arguments);
    afterFn.apply(this,arguments);
    return ret;
  }
}
var func = function() {
  console.log(2);
}
func = func.before(function(){
  console.log(1);
}).after(function(){
  console.log(3);
})
func();
```

#### 高阶函数的其他用法
**柯里化**：又称部分求值，一个柯里化参数首先会接受一些参数，接受这些参数之后，该函数并不会立即求值，而是继续返回另外一个函数，刚才传入的参数在函数形成的闭包中被保存起来，待到合适的时机一起求值。<br>

**其他用法：柯里化**
```js
// 高阶函数其他用法：柯里化
// 不完整的柯里化
var cost = (function(){
  var costs = [];
  return function() {
    // 开始计算
    if(arguments.length==0) {
      var total = 0;
      for(var i=0;i<costs.length;i++) {
        total += costs[i];
      }
      return total;
    } else {
      Array.prototype.push.apply(costs,arguments);
    }
  }
})()
cost(100);           // 未真正计算
cost(200);           // 未真正计算
cost(20);            // 未真正计算
cost(10);            // 未真正计算
console.log(cost()); // 真正计算，输出330

// 通用的柯里化
var currying = function(fn) {
  var args = [];
  return function() {
    if(arguments.length==0) {
      return fn.apply(this,args);
    } else {
      Array.prototype.push.apply(args,arguments);
      return arguments.callee;
    }
  }
}

var cost = (function(){
  var money = 0;
  return function() {
    for(var i = 0,len = arguments.length;i<len;i++) {
      money +=arguments[i];
    }
    return money;
  }
})()
var cost = currying(cost);
cost(100);
cost(200);
cost(20);
cost(10);
console.log(cost()); // 输出330
```

**其他用法：函数节流**<br>
将原本一秒执行10次的事件，节流成一秒执行2次或者3次
::: tip 函数节流的场景
1. window.onresize事件
2. mouseover事件
3. scroll事件
4. 其他
:::
```js
// 高阶函数其他用法：函数节流
// 应用场景：window.onresize事件
var throttle = function(fn,interval) {
  var timer = null;
  var firstTime = true;
  var _self = fn;
  return function() {
    var that = this;
    var args = arguments;
    
    // 判断是否第一次执行
    if(firstTime) {
      _self.apply(that,args);
      return firstTime = false
    }
    // 判断定时器是否执行完毕
    if(timer) {
      return false;
    }
    timer = setTimeout(function() {
      clearTimeout(timer);
      timer = null;
      _self.apply(that,args);
    },interval || 500)
  }
}
window.onresize = throttle(function(){
  console.log('window onsize');
}, 500)
```

**其他用法：分时函数**<br>
```js
// 高阶函数其他用法：分时函数
// 应用场景：分批次创建1000个DOM节点

// 分时函数
// 参数arr：要填充的数据
// 参数fn：要分时的函数
// 参数count：每一次分时的数量
// 参数interval：分时的间隔
var timeChunk = function(arr,fn,count,interval) {
  var timer = null;
  var data = null;
  var start = function() {
    for(var i = 0 ; i < Math.min(count || 1 , arr.length) ; i++) {
      data = arr.shift();
      fn(data);
    }
  }
  return function() {
    timer = setInterval(function(){
      if(arr.length == 0) {
        clearInterval(timer);
        timer = null;
        return;
      }
      start();
    }, interval || 200)
  }
}

var arr = [];
for(var i = 0 ; i < 1000 ; i++) {
  arr.push(i);
}

var renderDOMList = timeChunk(arr, function(data) {
  var div = document.createElement('div');
  div.innerHTML = data;
  document.body.appendChild(div);
},8,200);
renderDOMList();
```

## 设计模式
第二部分设计模式并没有全部覆盖GoF所提出的23种设计模式，而是选择了在JavaScript开发中更常见的14种设计模式


### 单例设计模式
::: tip 定义
单例模式：保证一个类仅有一个实例，并提供一个访问它的全局访问点。
:::
#### 单例设计模式的案例
1. 线程池
2. 全局缓存
3. 浏览器中的window对象
4. 网页登录浮窗
5. 等等

#### 单例设计模式的实现：面向对象
```js
// 单例设计模式的实现：面向对象
var Singleton = function(name) {
  this.name = name;
  this.instance = null;
}
Singleton.prototype.getName = function(){
  return this.name;
}
Singleton.getInstance = function(name) {
  if(!this.instance) {
    this.instance = new Singleton(name);
  }
  return this.instance;
}

var instance1 = Singleton.getInstance('why');
var instance2 = Singleton.getInstance('www');
console.log(instance1===instance2); // 输出true

var obj1 = new Singleton('why');
var obj2 = new Singleton('www');
console.log(obj1.getName());        // 输出why
console.log(obj2.getName());        // 输出www
```

#### 单例设计模式的实现：闭包
```js
// 单例设计模式的实现：闭包
var Singleton = function(name) {
  this.name = name;
}
Singleton.prototype.getName = function() {
  return this.name;
}
Singleton.getInstance = (function() {
  var instance = null;
  return function(name) {
    if(!instance) {
      instance = new Singleton(name)
    }
    return instance;
  }
})()

var instance1 = Singleton.getInstance('why');
var instance2 = Singleton.getInstance('www');
console.log(instance1 === instance2); // 输出true
```
#### 透明的单例设计模式
无论以上面向对象的单例实现还是闭包的单例实现，都通过`Singleton.getInstance`来获取`Singleton`类的唯一对象，这增加了这个类的不透明性，使用者必须知道`Singleton`是一个单例类，然后通过`Singleton.getInstance`方法才能获取单例对象，要解决这一问题，可以使用透明的单例设计模式
```js
// 透明的单例模式
var CreateDiv = (function(){
  var instance = null;
  var CreateDiv = function(html) {
    if(instance) {
      return instance;
    }
    this.html = html;
    this.init();
    instance = this;
    return instance;
  }
  CreateDiv.prototype.init = function() {
    var div = document.createElement('div');
    div.innerHTML = this.html;
    document.body.appendChild(div);
  }
  return CreateDiv;
})()

var instance1 = new CreateDiv('why');
var instance2 = new CreateDiv('www');
console.log(instance1===instance2); // 输出true
```

#### 用代理实现单例模式
虽然上述透明的单例设计模式解决了不用通过`Singleton.getInstance`来获取单例类的唯一对象，但是在透明的单例设计模式中，构造函数`CreateDiv`违反了单一职责，它不仅要负责创建对象，而且还要负责保证单例，假如某一天需求变化了，不再需要创建单例的`div`，则需要改写`CreateDiv`函数，解决这种问题，可以使用代理来实现单例模式
```js
// 用代理实现单例模式
var CreateDiv = function(html) {
  this.html = html;
  this.init();
}
CreateDiv.prototype.init = function() {
  var div = document.createElement('div');
  div.innerHTML = this.html;
  document.body.appendChild(div);
}
var ProxyCreateDiv = (function(){
  var instance = null;
  return function(html) {
    // 惰性单例
    if(!instance) {
      instance = new CreateDiv(html);
    }
    return instance;
  }
})()
var divInstance1 = new ProxyCreateDiv('why');
var divInstance2 = new ProxyCreateDiv('www');
console.log(divInstance1===divInstance2); // 输出true
```

### 策略模式
::: tip 定义
策略模式：定义一系列算法，把他们一个一个封装起来，并且使他们可以相互替换。
:::

#### 策略模式的优点
1. 策略模式利用组合、委托和多态等技术的思想，可以有效的避免多重条件分支语句
2. 策略模式提供了对开放-封闭原则的完美支持，将算法封装在独立的策略类中，使它们易于切换、易于理解、易于扩展。
3. 策略模式中的算法也可以复用在系统的其他地方
4. 策略模式利用组合和委托来让`Context`拥有执行算法的能力，这也是继承的一种更轻便的替代方案。

#### 策略模式案例：计算奖金
案例描述：某公司的年终奖是根据员工的工资基数和年底绩效来发放的。例如，绩效为S的人年终奖有4倍工资，绩效为A的人年终奖有3倍工资，绩效为B的人年终奖有2倍工资，财务部要求我们提供一段代码，来方便他们计算员工的年终奖。
##### 计算奖金：最初版本
```js
// 计算奖金：最初版本
var calculateBouns = function(level,salary) {
  if(level=='S') {
    return salary * 4;
  }
  if(level=='A') {
    return salary * 3;
  }
  if(level=='B') {
    return salary * 2;
  }
}
console.log(calculateBouns('S',4000));  // 输出16000
console.log(calculateBouns('A',3000));  // 输出9000
console.log(calculateBouns('B',2000));  // 输出4000
```

##### 计算奖金：面向对象完善版本
```js
// 计算奖金：面向对象完善版本
var PerformanceS = function(){};
PerformanceS.prototype.calculate = function(salary) {
  return salary * 4;
}

var PerformanceA = function(){};
PerformanceA.prototype.calculate = function(salary) {
  return salary * 3;
}

var PerformanceB = function(){};
PerformanceB.prototype.calculate = function(salary) {
  return salary * 2;
}

var Bouns = function() {
  this.salary = null;
  this.strategy = null;
}
Bouns.prototype.setSalary = function(salary) {
  this.salary = salary;
}
Bouns.prototype.setStrategy = function(strategy) {
  this.strategy = strategy;
}
Bouns.prototype.getBouns = function() {
  return this.strategy.calculate(this.salary);
}
var bouns = new Bouns();
bouns.setSalary(4000);
bouns.setStrategy(new PerformanceS());
console.log(bouns.getBouns());  // 输出16000

bouns.setSalary(3000);
bouns.setStrategy(new PerformanceA());
console.log(bouns.getBouns());  // 输出9000

bouns.setSalary(2000);
bouns.setStrategy(new PerformanceB());
console.log(bouns.getBouns());  // 输出4000
```

##### 计算奖金：JavaScript的完善版本
```js
// 计算奖金：JavaScript的完善版本
var strategy = {
  'S': function(salary) {
    return salary * 4;
  },
  'A': function(salary) {
    return salary * 3;
  },
  'B': function(salary) {
    return salary * 2;
  }
}
var calcluateBouns = function(level,salary) {
  return strategy[level](salary);
}
console.log(calcluateBouns('S',4000));  // 输出16000
console.log(calcluateBouns('A',3000));  // 输出9000
console.log(calcluateBouns('B',2000));  // 输出4000
```

#### 策略模式案例：表单验证
::: tip 表单标签
1. 用户名(验证是否为空)
2. 密码(验证长度不能小于6位)
3. 手机号(验证是否是手机号格式)
:::
```js
// 策略模式案例：表单验证
var strategies = {
  isEmpty: function(value,errMsg) {
    if(value==='') {
      return errMsg
    }
  },
  minLength: function(value,length,errMsg) {
    if(value.length<length) {
      return errMsg
    }
  },
  isMobile: function(value,errMsg) {
    if(!(/^1[34578]\d{9}$/.test(value))) {
      return errMsg
    }
  }
}
var Validator = function() {
  this.cache = [];
}
Validator.prototype.add = function(dom,rule,msg) {
  var ary = rule.split(':');
  this.cache.push(function(){
    var strategy = ary.shift();
    ary.unshift(dom.value);
    ary.push(msg);
    return strategies[strategy].apply(dom,ary);
  });
}
Validator.prototype.run = function() {
  for (let index = 0; index < this.cache.length; index++) {
    var msg = this.cache[index]();
    if(msg) {
      return msg;
    }
  }
}

var validateFunc = function() {
  var validator = new Validator();
  validator.add(registerForm.username,'isEmpty','用户名不能为空');
  validator.add(registerForm.password,'minLength:6','密码长度不能小于6位');
  validator.add(registerForm.phone,'isMobile','手机号格式不正确');
  var errMsg = validator.run();
  return errMsg;
}

var submitBtn = document.getElementById('submitBtn');
var registerForm = document.getElementById('registerForm');
submitBtn.onclick = function() {
  var errMsg = validateFunc();
  if(errMsg) {
    console.log(errMsg);
    return false;
  } else {
    console.log('表单验证成功')
  }
}
```

### 代理模式
::: tip 定义
代理模式是为一个对象提供一个代用品或占位符，以便控制对它的访问。
:::
代理模式的**关键**所在就是：当客户不方便直接访问一个对象或者不满足需要的时候，提供一个替身对象来控制对这个对象的访问，客户实际上访问的是替身对象，替身对象作出一些请求后再把请求转接给本体对象
#### 简单的代理：小明追女神
::: tip 场景
小明打算向女神表白，又怕直接被拒绝而尴尬，决定找女神的同学帮忙转接鲜花给女神
:::
```js
var Flower = function() {};

var xiaoming = {
  sendFlower: function(target) {
    var flower = new Flower();
    target.receive(flower);
  }
}
var classmate = {
  receive: function(flower) {
    girl.receive(flower);
  }
}
var girl = {
  receive: function(flower) {
    console.log('女神收到了花');
  }
}
xiaoming.sendFlower(classmate); // 输出女神收到了花
```

#### 保护代理
::: tip
在代理模式中，替身对象能做到过滤一些对本体不合理的请求时，这种代理就叫保护代理
:::
```js
// 保护代理
function Flower() {};
function Person(name,age,salary) {
  this.age = age;
  this.name = name;
  this.salary = salary;
}
Person.prototype.sendFlower = function(target,person){
  var flower = new Flower();
  target.receive(flower,person);
}
var person1 = new Person('www',20,4000);
var person2 = new Person('AAA',25,8000);
var person3 = new Person('BBB',45,16000);

var proxyObj = {
  receive: function(flower,person) {
    if(person.age>=40) {
      console.log(person.name+',你年龄太大了');
      return false;
    }
    if(person.salary<5000) {
      console.log(person.name+',你工资太低了');
      return false;
    }
    originObj.receive(flower);
    console.log(person.name+',恭喜你,女神收下了你的花');
  }
}
var originObj = {
  receive: function(flower) {
  }
}
person1.sendFlower(proxyObj,person1); // 输出www,你工资太低了
person2.sendFlower(proxyObj,person2); // 输出AAA,恭喜你,女神收下了你的花
person3.sendFlower(proxyObj,person3); // 输出BBB,你年龄太大了
```

#### 虚拟代理
::: tip
将一些代价昂贵的操作放置在代理对象中，待到机会合适时再进行，这种代理就叫虚拟代理
:::
```js
// 虚拟代理
function Flower() {};
var xiaoming = {
  sendFlower: function(target) {
    target.receiveFlower();
  }
}
var classmate = {
  receiveFlower: function() {
    girl.listenMood(function() {
      var flower = new Flower();
      console.log('同学帮你买了花,并送了出去');
      girl.receiveFlower(flower);
    })
  }
}
var girl = {
  mood: 0,
  receiveFlower: function(flower) {
    console.log('女神收下了你的花');
  },
  listenMood: function(fn) {
    setTimeout(function(){
      fn();
    },1500)
  }
}
// 首先输出：同学帮你买了花,并送了出去、
// 最后输出：女神收下了你的花
xiaoming.sendFlower(classmate);
```

#### 代理模式实现图片懒加载
**不用代理实现**
```js
// 不用代理实现图片懒加载
var myImage = (function(){
  var imgNode = document.createElement('img');
  document.body.appendChild(imgNode);
  var img = new Image();
  img.onload = function() {
    imgNode.src = img.src;
  }
  return {
    setSrc: function(src) {
      imgNode.src = 'file:///C:/Users/admin/Desktop/mask/img/7.jpg'
      img.src = src;
    }
  }
})()
myImage.setSrc('https://img1.sycdn.imooc.com/5c09123400014ba418720632.jpg')
```
**用代理实现图片懒加载**
```js
// 用代理实现图片懒加载
var myImage = (function(){
  var image = document.createElement('img');
  document.body.appendChild(image);
  return {
    setSrc: function(src) {
      image.src = src;
    }
  }
})();

var proxyImage = (function(){
  var img = new Image();
  img.onload = function() {
    myImage.setSrc(this.src);
  }
  return {
    setSrc: function(src) {
      myImage.setSrc('file:///C:/Users/admin/Desktop/mask/img/7.jpg');
      img.src = src;
    }
  }
})()
proxyImage.setSrc('https://img1.sycdn.imooc.com/5c09123400014ba418720632.jpg');
```
#### 缓存代理
::: tip
缓存代理可以为一些开销大的运算结果提供暂时的存储，在下次运算时，如果传递进来的参数跟之前一样，则可以直接返回前面存储的运算结果。
:::
```js
// 缓存代理：计算乘积
var mult = function() {
  console.log('开始计算乘积');
  var sum = 1;
  for(var i=0;i<arguments.length;i++) {
    sum = sum * arguments[i];
  }
  return sum;
}
var proxyMult = (function(){
  var cache = {};
  return function() {
    var args = Array.prototype.join.call(arguments,',');
    if(cache.hasOwnProperty(args)) {
      return cache[args];
    }
    return cache[args] = mult.apply(this,arguments)
  }
})()
console.log(proxyMult(1,2,3,4)); // 输出：开始计算乘积 24
console.log(proxyMult(1,2,3,4)); // 输出24
```

#### 举一反三代理工厂
```js
// 代理工厂(累加和乘积)
var mult = function() {
  console.log('开始计算乘积')
  var sum = 1;
  for (let index = 0; index < arguments.length; index++) {
    sum = sum * arguments[index]
  }
  return sum;
}
var plus = function() {
  console.log('开始计算累加')
  var sum = 0;
  for (let index = 0; index < arguments.length; index++) {
    sum = sum + arguments[index]
  }
  return sum;
}
var createProxyFactory = function(fn) {
  var cache = {};
  return function() {
    var args = Array.prototype.join.call(arguments,',');
    if(cache.hasOwnProperty(args)) {
      return cache[args]
    }
    return cache[args] = fn.apply(this,arguments);
  }
}
var proxyMult = createProxyFactory(mult);
var proxyPlus = createProxyFactory(plus);

console.log(proxyMult(1,2,3,4)); // 输出：开始计算乘积 24
console.log(proxyMult(1,2,3,4)); // 输出： 24
console.log(proxyPlus(3,4,5,6)); // 输出：开始计算累加 18
console.log(proxyPlus(3,4,5,6)); // 输出 18
```
### 迭代器模式
::: tip
迭代器模式是指提供一种顺序访问一个聚合对象中的各个元素，而又不需要暴露该对象的内部表示。迭代器分为两种，一种是内部迭代器，另外一种是外部迭代器
:::
#### 内部迭代器
::: tip
内部迭代器在调用的时候非常方便，外界不用关心迭代器内部到底是如何实现的，跟迭代器的交互也只有一次初始调用，而这也正好是内部迭代器的缺点。
:::
**Jquery中的迭代器**
```js
// Jquery中的迭代器
$.each([1,2,3],function(index,value) {
  console.log(index);
  console.log(value);
})
```

**实现自己的each迭代器**
```js
// 实现自己的each迭代器
var each = function(array,callback) {
  for(var i=0;i<array.length;i++) {
    callback.call(null,i,array[i]);
  }
}
each([1,2,3],function(index,value){
  console.log(index);// 依次输出0 1 2
  console.log(value);// 依次输出1 2 3
})
```

#### 外部迭代器
::: tip
外部迭代器必须显示的请求迭代下一个元素
:::
```js
// 自定义外部迭代器实现比较两个数组的值是否完全相等
var Iterator = function(obj) {
  var current = 0;
  var next = function() {
    current++;
  }
  var isDone = function() {
    return current >=obj.length;
  }
  var getCurrentItem = function() {
    return obj[current];
  }
  return {
    next: next,
    isDone: isDone,
    getCurrentItem:getCurrentItem,
    length: obj.length
  }
}
var compare = function(iterator1,iterator2) {
  if(iterator1.length!=iterator2.length) {
    console.log('两个数组不相等');
    return false;
  }
  while(!iterator1.isDone() && !iterator2.isDone()) {
    if(iterator1.getCurrentItem()!=iterator2.getCurrentItem()) {
      throw new Error('两个数组不相等')
    }
    iterator1.next();
    iterator2.next();
  }
  console.log('两个数组相等')
}
var iterator1 = Iterator([1,2,3]);
var iterator2 = Iterator([1,2,4]);
compare(iterator1,iterator2); // 报错，两个数组不相等
```

### 发布-订阅模式
::: tip 定义
发布-订阅模式又叫观察者模式，他定义对象间的一种一对多的依赖关系，当一个对象的状态发生改变时，所有依赖于它的对象都将得到通知。
:::

**优点**：发布-订阅模式一为时间上的解耦，二为对象之间的解耦。它的应用非常广泛，既可以用在异步编程中，也可以帮助我们完成更加松耦合的代码编写。发布-订阅模式还可以用来帮助实现一些其他的设计模式，例如中介者模式。<br/>
**缺点**：创建订阅者本身要消耗一定的时间和内存，而当你订阅一个消息后，也许此消息最后都没有发生，但订阅者依然存在于内存中，造成了一种浪费。发布-订阅模式虽然弱化了对象之间的联系，但过度使用的话，对象和对象之间的必要联系也将深埋在背后，会导致程序难以追踪维护和理解。

#### DOM事件中的发布-订阅
只要我们曾经在DOM节点上绑定了事件函数，那我们就曾经使用过发布-订阅模式。
```js
// DOM事件中的发布-订阅模式
document.body.addEventListener('click',function(){
  console.log(1);
})
document.body.addEventListener('click',function() {
  console.log(2);
})
document.body.addEventListener('click',function() {
  console.log(3);
})
document.body.addEventListener('click',function(){
  console.log(4);
})
document.body.click(); // 输出1 2 3 4
```

#### 自定义发布-订阅
背景：小明最近看中一套房子，到销售中心才告知已经卖完了，好在销售楼中心准备出后期工程，但不知道什么时候出，只要小明留下自己的联系方式，楼盘开启后销售中心会通知小明相关信息。而对于其他像小明那样的客户，只要同样留下联系方式都可以收到相关信息。
```js
// 自定义发布-订阅事件
var sales = {
  clientList: {},
  listen: function(key,fn) {
    if(!this.clientList[key]) {
      this.clientList[key] = [];
    }
    this.clientList[key].push(fn)
  },
  trigger: function() {
    var type = Array.prototype.shift.call(arguments);
    var fns = this.clientList[type];
    if(!fns || fns.length<1) {
      return false;
    }

    for (let index = 0; index < fns.length; index++) {
      fns[index].apply(this,arguments)
    }
  }
}

// 订阅
sales.listen('88',function(price){
  console.log('88平米的房子价格是：'+price);
})
sales.listen('100',function(price){
  console.log('100平米的房子价格是：'+price);
})

// 发布
sales.trigger('88',200000);  // 88平米的房子价格是：200000
sales.trigger('100',300000); // 100平米的房子价格是：300000
```

#### 取消订阅的事件
发布-订阅模式中，既然可以订阅事件，那么一定可以取消订阅，假设小明突然不想买房子了，为避免销售中心发短信打搅自己，他决定取消订阅。
```js
// 取消订阅事件
var sales = {
  clientList: {},
  listen: function(key,fn) {
    if(!this.clientList[key]) {
      this.clientList[key] = [];
    }
    this.clientList[key].push(fn);
  },
  trigger: function() {
    var type = Array.prototype.shift.call(arguments);
    var fns = this.clientList[type]
    if(!fns || fns.length<1) {
      return false;
    }
    for (let index = 0; index < fns.length; index++) {
      fns[index].apply(this,arguments);
    }
  },
  remove: function(type) {
    var fns = this.clientList[type];
    if(!fns || fns.length<1) {
      return false;
    }
    // 全部取消订阅
    fns.length = 0;
  }
}

// 订阅
sales.listen('88',function(price){
  console.log('88平米的房子价格是：'+price);
})
sales.listen('100',function(price){
  console.log('100平米的房子价格是：'+price);
})

// 取消订阅
sales.remove('88');

// 发布
sales.trigger('88',200000);  // 不输出
sales.trigger('100',300000); // 100平米的房子价格是：300000
```

#### 一个真实的例子：网站登录
背景：一个商场网站，有头部header，有导航nav，有购物车cart，有消息列表message等等模块度依赖于登录成功后的用户信息。而用户不知道什么时候会登陆。需要将以上各个模块与登录模块做一个发布-订阅
```js
// 一个真实的发布-订阅例子：网站登录
var login = {
  clientList: {},
  listen: function(key,fn) {
    if(!this.clientList[key]) {
      this.clientList[key] = [];
    }
    this.clientList[key].push(fn);
  },
  trigger: function() {
    var type = Array.prototype.shift.call(arguments);
    var fns = this.clientList[type];
    if(!fns || fns.length<1) {
      return false;
    }
    for (let index = 0; index < fns.length; index++) {
      fns[index].apply(this,arguments);
    }
  }
}

// 头部
var header = (function(){
  login.listen('loginSuccess',function(data) {
    header.setAvatar(data.avatar);
  })
  return {
    setAvatar: function(avatar) {
      console.log('设置header头像：'+avatar);
    }
  }
})()

// 导航
var nav = (function(){
  login.listen('loginSuccess',function(data) {
    nav.setAvatar(data.avatar);
  })
  return {
    setAvatar: function(avatar) {
      console.log('设置nav头像：'+avatar);
    }
  }
})()

// 购物车
var cart = (function(){
  login.listen('loginSuccess',function(data) {
    cart.getOrders(data);
  })
  return {
    getOrders: function(data) {
      console.log('获取'+data.name+'的购物车订单列表');
    }
  }
})()

setTimeout(function() {
  // 依次输出
  // 设置header头像：https://www.baidu.com/1.jpg
  // 设置nav头像：https://www.baidu.com/1.jpg
  // 获取AAA的购物车订单列表
  login.trigger('loginSuccess',{name:'AAA',avatar: 'https://www.baidu.com/1.jpg'});
}, 1500)
```
### 命令模式
::: tip 定义
命令模式是最简单和优雅的模式之一，命令模式中的命令指的是一个执行某些特定事件的指令。
:::

#### 应用场景
有时候需要向某些对象发送请求，但是并不知道请求的接受者是谁，也不知道被请求的操作是什么。此时希望有一种松耦合的方式来设计程序，使得请求发送者和接受者能够消除彼此之间的耦合关系。

#### 命令模式案例：面向对象版
故事背景：有一个用户界面程序，该用户界面上至少有数十个Button按钮，因为项目比较复杂，所以我们觉得让某个程序员负责Button按钮的绘制，另外一个程序员负责编写点击按钮的具体行为，这些行为都将封装在对象里。
```html
<button type="button" id="button1">刷新界面</button>
<button type="button" id="button2">添加子菜单</button>
<button type="button" id="button3">删除子菜单</button>
```
```js
// 面向对象版本
var button1 = document.getElementById('button1');
var button2 = document.getElementById('button2');
var button3 = document.getElementById('button3');
// 设置命令
var setCommand = function(button,command) {
  button.onclick = function() {
    command.execute();
  }
}
// 具体行为
var MenuBar = {
  refresh: function() {
    console.log('刷新界面');
  }
}
var SubMenu = {
  add: function(){
    console.log('添加子菜单');
  },
  remove: function() {
    console.log('删除子菜单');
  }
}
// 封装具体行为到对象中
var RefreshBarCommand = function(receiver) {
  this.receiver = receiver;
}
RefreshBarCommand.prototype.execute = function() {
  this.receiver.refresh();
}
var AddSubMenuCommand = function(receiver) {
  this.receiver = receiver;
}
AddSubMenuCommand.prototype.execute = function() {
  this.receiver.add();
}
var RemoveSubMenuCommand = function(receiver) {
  this.receiver = receiver;
}
RemoveSubMenuCommand.prototype.execute = function() {
  this.receiver.remove();
}
// 传入命令接受者
var refreshBarCommand = new RefreshBarCommand(MenuBar);
var addSubMenuCommand = new AddSubMenuCommand(SubMenu);
var removeSubMenuCommand = new RemoveSubMenuCommand(SubMenu);
setCommand(button1,refreshBarCommand);    // 点击按钮输出：刷新界面
setCommand(button2,addSubMenuCommand);    // 点击按钮输出：添加子菜单
setCommand(button3,removeSubMenuCommand); // 点击按钮输出：删除子菜单
```
#### 命令模式案例：闭包版本
```html
<button type="button" id="button1">刷新界面</button>
<button type="button" id="button2">添加子菜单</button>
<button type="button" id="button3">删除子菜单</button>
```
```js
// 闭包版本
var button1 = document.getElementById('button1');
var button2 = document.getElementById('button2');
var button3 = document.getElementById('button3');

// 设置命令
var setCommand = function(button,func) {
  button.onclick = function() {
    func();
  }
}

// 定义具体行为
var MenuBar = {
  refresh: function() {
    console.log('刷新界面');
  }
}
var SubMenu = {
  add: function() {
    console.log('添加子菜单');
  },
  remove: function() {
    console.log('删除子菜单');
  }
}
// 封装具体行为到对象
var RefreshBarCommand = function(receiver) {
  return function() {
    receiver.refresh();
  }
}
var AddSubMenuCommand = function(receiver) {
  return function() {
    receiver.add();
  }
}
var RemoveSubMenuCommand = function(receiver) {
  return function() {
    receiver.remove();
  }
}
// 传入命令接受者
var refreshBarCommand = RefreshBarCommand(MenuBar);
var addSubMenuCommand = AddSubMenuCommand(SubMenu);
var removeSubMenuCommand = RemoveSubMenuCommand(SubMenu);
setCommand(button1,refreshBarCommand);    // 点击按钮输出：刷新界面
setCommand(button2,addSubMenuCommand);    // 点击按钮输出：添加子菜单
setCommand(button3,removeSubMenuCommand); // 点击按钮输出：删除子菜单
```

#### 更为简单的回调函数版本
```html
<button type="button" id="button1">刷新界面</button>
<button type="button" id="button2">添加子菜单</button>
<button type="button" id="button3">删除子菜单</button>
```
```js
// 更为简单的回调函数版本
// 绑定事件
var bindClick = function(button,func) {
  button.onclick = func;
}

// 定义具体行为
var MenuBar = {
  refresh: function() {
    console.log('刷新界面');
  }
}
var SubMenu = {
  add: function(){
    console.log('添加子菜单');
  },
  remove: function() {
    console.log('删除子菜单');
  }
}

// 回调函数
bindClick(button1,MenuBar.refresh); // 点击按钮输出：刷新界面
bindClick(button2,SubMenu.add);     // 点击按钮输出：添加子菜单
bindClick(button3,SubMenu.remove);  // 点击按钮输出：删除子菜单
```

#### 宏命令
::: tip 定义
宏命令是一组命令的集合，通过执行宏命令的方式，可以一次执行多个命令。
:::
```js
// 宏命令
// 基础命令
var CloseDoorCommand = {
  execute: function() {
    console.log('关门')
  }
}
var OpenTVCommand = {
  execute: function() {
    console.log('打开电视')
  }
}
var OpenQQComand = {
  execute: function() {
    console.log('登QQ')
  }
}

// 宏命令
var MacroCommand = function() {
  return {
    commandList: [],
    add: function(command) {
      this.commandList.push(command)
    },
    execute: function() {
      for (let index = 0; index < this.commandList.length; index++) {
        this.commandList[index].execute();
      }
    }
  }
}

// 添加命令到宏命令
var macroCommand = MacroCommand();
macroCommand.add(CloseDoorCommand);
macroCommand.add(OpenTVCommand);
macroCommand.add(OpenQQComand);

// 执行宏命令
macroCommand.execute(); // 依次输出：关门 打开电视 登QQ
```
### 组合模式
::: tip 
组合模式将对象组合成树形结构，以表示"部分-整体"的层次结构。
:::

#### 传递顺序
对宏命令为例，请求从树最顶端的对象往下传递，如果当前处理请求的对象是叶对象，叶对象自身会对请求做出相应的处理。如果当前处理请求的是组合对象，则遍历该组合对象下的子节点，将请求继续传递给这些子节点。

#### 更强大的宏命令
万能遥控器:<br/>
1. 打开空调
2. 打开电视和音响
3. 关门、打开电脑、登录QQ
```html
<button type="button" id="SuperButton">万能遥控器</button>
```
```js
// 更强大的宏命令
var MacroCommand = function() {
  return {
    commandList: [],
    add: function(command) {
      this.commandList.push(command)
    },
    execute: function() {
      for (let index = 0; index < this.commandList.length; index++) {
        this.commandList[index].execute();
      }
    }
  }
}
// 打开空调
var openAcCommand = {
  execute: function() {
    console.log('打开空调');
  }
}
// 打开电视和音响
var openTVCommand = {
  execute: function() {
    console.log('打开电视');
  }
}
var openSoundCommand = {
  execute: function() {
    console.log('打开音响')
  }
}
var macroCommand1 = MacroCommand();
macroCommand1.add(openTVCommand);
macroCommand1.add(openSoundCommand);

// 关门、开电脑、登QQ
var closeCommand = {
  execute: function() {
    console.log('关门')
  }
}
var openPcCommand = {
  execute: function() {
    console.log('打开电脑')
  }
}
var openQQCommand = {
  execute: function() {
    console.log('登录QQ')
  }
}
var macroCommand2 = MacroCommand();
macroCommand2.add(closeCommand);
macroCommand2.add(openPcCommand);
macroCommand2.add(openQQCommand);

// 宏命令
var macroCommand = MacroCommand();
macroCommand.add(openAcCommand);
macroCommand.add(macroCommand1);
macroCommand.add(macroCommand2);

// 触发宏命令
var setCommand = (function(command){
  document.getElementById('SuperButton').onclick = function() {
    // 依次输出：打开空调 打开电视 打开音响 关门 打开电脑 登录QQ
    command.execute();
  }
})(macroCommand)
```
#### 组合模式案例：扫描文件
```js
// 组合模式案例：文件扫描
// 文件夹类
var Folder = function(name) {
  this.name = name;
  this.files = [];
}
Folder.prototype.add = function(file) {
  this.files.push(file);
}
Folder.prototype.scan = function() {
  console.log('开始扫描文件夹:'+this.name);
  for (let index = 0; index < this.files.length; index++) {
    this.files[index].scan();
  }
}
// 文件类
var File = function(name) {
  this.name = name;
}
File.prototype.add = function() {
  throw new Error('文件下面不能添加文件');
}
File.prototype.scan = function() {
  console.log('开始扫描文件：'+this.name)
}

var folder = new Folder('学习资料');
var folder1 = new Folder('JavaScript');
var folder2 = new Folder('jQuery');
var folder3 = new Folder('重构与实现');
var folder4 = new Folder('NodeJs');

var file1 = new File('JavaScript设计模式');
var file2 = new File('精通jQuery');
var file3 = new File('JavaScript语言精粹');
var file4 = new File('深入浅出的Node.js');

folder1.add(file1);
folder2.add(file2);
folder4.add(file4);

folder.add(folder1);
folder.add(folder2);
folder.add(file3);
folder.add(folder3);
folder.add(folder4);

// 执行扫描
// 开始扫描文件夹:学习资料
// 开始扫描文件夹:JavaScript
// 开始扫描文件：JavaScript设计模式
// 开始扫描文件夹:jQuery
// 开始扫描文件：精通jQuery
// 开始扫描文件：JavaScript语言精粹
// 开始扫描文件夹:重构与实现
// 开始扫描文件夹:NodeJs
// 开始扫描文件：深入浅出的Node.js
folder.scan();
```
### 模板方法模式
::: tip 定义
模板方法是一种只需使用继承就可以实现的非常简单的模式。模板方法由两部分组成，一部分是抽象的父类，另一部分是具体的子类。
:::
通常而言，在抽象父类中封装了子类的算法框架，包括实现一些公共方法以及封装子类中所有方法的执行顺序。子类通过继承抽象的父类，也继承了整个算法结构。

#### 模板方法：经典案例
泡咖啡的步骤：
1. 把水煮沸
2. 用沸水泡咖啡
3. 把咖啡倒进杯子
4. 加糖和牛奶
```js
// 泡咖啡
var Coffee = function(){};
Coffee.prototype.boilWater = function() {
  console.log('把水煮沸');
}
Coffee.prototype.brewCoffee = function() {
  console.log('冲泡咖啡');
}
Coffee.prototype.purInCup = function() {
  console.log('把咖啡倒进杯子里');
}
Coffee.prototype.addSugarAndMilk = function() {
  console.log('加牛奶和糖')
}
Coffee.prototype.init = function() {
  this.boilWater();
  this.brewCoffee();
  this.purInCup();
  this.addSugarAndMilk();
}

var coffee = new Coffee();
// 依次输出： 把水煮沸 冲泡咖啡 把咖啡倒进杯子里 加牛奶和糖
coffee.init();
```

泡茶的步骤:
1. 把水煮沸
2. 用沸水浸泡茶叶
3. 把茶水倒进杯子
4. 加柠檬
```js
// 泡茶
var Tea = function() {};
Tea.prototype.boilWater = function() {
  console.log('把水煮沸');
}
Tea.prototype.brewTea = function() {
  console.log('用沸水浸泡茶叶');
}
Tea.prototype.purInCup = function() {
  console.log('把茶水倒进杯子')
}
Tea.prototype.addLemon = function() {
  console.log('加柠檬');
}
Tea.prototype.init = function() {
  this.boilWater();
  this.brewTea();
  this.purInCup();
  this.addLemon();
}
var tea = new Tea();
// 依次输出： 把水煮沸 用沸水浸泡茶叶 把茶水倒进杯子 加柠檬
tea.init();
```
#### 泡茶经典案例重构
经过对比分析，泡咖啡和泡茶虽然具体实现的方法是不一样的，但是步骤大致是类似的：
1. 把水煮沸
2. 用沸水
3. 倒进杯子
4. 加调料

泡咖啡和泡茶主要的不同点
1. 原料不同，一个是咖啡，一个是茶，统称为饮料
2. 泡的方式不同，一个是冲泡，一个是浸泡，统称为泡
3. 加入的调料不同，一个是牛奶和糖，另一个是柠檬。

```js
// 抽象父类提取
var Beverage = function(){}
Beverage.prototype.boilWater = function() {
  console.log('把水煮沸');
}
// 抽象方法，由子类去具体实现
Beverage.prototype.brew = function() {};
// 抽象方法，由子类去具体实现
Beverage.prototype.pourInCur = function(){};
// 抽象方法，由子类去具体实现
Beverage.prototype.addCondiments = function(){};
Beverage.prototype.init = function() {
  this.boilWater();
  this.brew();
  this.pourInCur();
  this.addCondiments();
}
```
```js
// 创建子类以及实例化子类
var Coffee = function() {};
Coffee.prototype = new Beverage();
Coffee.prototype.brew = function() {
  console.log('用沸水冲泡咖啡');
}
Coffee.prototype.pourInCur = function() {
  console.log('把咖啡到进杯子里');
}
Coffee.prototype.addCondiments = function() {
  console.log('加糖和牛奶');
}
var Tea = function() {} ;
Tea.prototype = new Beverage();
Tea.prototype.brew = function() {
  console.log('用沸水浸泡茶');
}
Tea.prototype.pourInCur = function() {
  console.log('把茶到进杯子里');
}
Tea.prototype.addCondiments = function() {
  console.log('加柠檬');
}
// 实例化子类
var coffee = new Coffee();
// 依次输出：用沸水冲泡咖啡 把咖啡到进杯子里 加糖和牛奶
coffee.init();
var tea = new Tea();
// 依次输出：用沸水浸泡茶 把茶到进杯子里  加柠檬
tea.init();
```
#### 泡茶经典案例解析
在泡咖啡和茶的经典案例中，到底谁才是真正的模板方法呢？答案是`Beverage.prototype.init`,
这是因为该方法中封装了子类的算法框架，它作为一个算法的模板，指导子类以何种顺序去执行哪些方法。

#### 好莱坞原则重写经典案例
```js
// 重构父类
var Beverage = function(params) {
  var boilWater = function() {
    console.log('把水煮沸');
  }
  var brew = params.brew || function() {
    throw new Error('子类必须重写brew方法');
  }
  var pourInCup = params.pourInCup || function() {
    throw new Error('子类必须重写pourInCup方法');
  }
  var addCondiments = params.addCondiments || function() {
    throw new Error('子类必须重写addCondiments方法');
  }
  var F = function() {};
  F.prototype.init = function() {
    boilWater();
    brew();
    pourInCup();
    addCondiments();
  }
  return F;
}
// 创建子类
var Coffee = Beverage({
  brew: function() {
    console.log('冲泡咖啡');
  },
  pourInCup: function() {
    console.log('把咖啡倒进杯子里');
  },
  addCondiments: function() {
    console.log('加牛奶和糖');
  }
})
var Tea = Beverage({
  brew: function() {
    console.log('用沸水浸泡茶叶');
  },
  pourInCup: function() {
    console.log('把茶水倒进杯子');
  },
  addCondiments: function() {
    console.log('加柠檬');
  }
})
// 实例化子类
var coffee = new Coffee();
// 依次输出： 把水煮沸 冲泡咖啡 把咖啡倒进杯子里 加牛奶和糖
coffee.init();
var tea = new Tea();
// 依次输出： 把水煮沸 用沸水浸泡茶叶 把茶水倒进杯子 加柠檬
tea.init();
```

### 享元模式
::: tip
亨元模式是一种用于性能优化的模式，其核心是运用共享技术来有效支持大量细粒度的对象。亨元模式要求将对象的属性划分为内部状态和外部状态。
:::

#### 亨元模式雏形
**背景**：某内衣厂生产有50种男士内衣和50种女士内衣，正常情况下，需要50个男模特和50个女模特来完成对内衣的试穿拍照，在不使用亨元模式的情况下，在程序里也许会这样写
```js
// 亨元模式雏形
var Model = function(sex,underwear) {
  this.sex = sex;
  this.underwear = underwear;
}
Model.prototype.takePhoto = function() {
  console.log('sex='+this.sex+',underwear='+this.underwear);
}
for (let index = 0; index < 50; index++) {
  var model = new Model('male','underwear'+index);
  model.takePhoto();
}
for (let index = 0; index < 50; index++) {
  var model = new Model('female','underwear'+index);
  model.takePhoto();
}
```
**思考**：
1. 在上列中，要得到一张照片，每次需要传入sex和underwear参数，一共有50种男士内衣和50种女士内衣，一共需要100个对象，将来如果生产1000种内衣，则需要的对象会更多。
2. 利用亨元模式后，虽然有100种内衣，但只需要男、女两个模特即可，即只需要两个对象

#### 亨元模式初运用
```js
var Model = function (sex) {
  this.sex = sex;
}
Model.prototype.takePhoto = function () {
  console.log('sex=' + this.sex + ',underwear=' + this.underwear);
}
var male = new Model('male');
var female = new Model('female');

for (let index = 0; index < 50; index++) {
  male.underwear = index+1;
  male.takePhoto();
}
for (let index = 0; index < 50; index++) {
  female.underwear = index+1;
  female.takePhoto();
}
```
**亨元模式初运用思考**：
1. 我们通过new来创建男女两个model对象，在其他情况下，也许并不是一开始就需要共享所有的对象。
2. 给model手动添加了underwear属性，在更加复杂的系统中，这并不是一个最好的方法，因为外部状态可能是相对比较复杂的，他们与共享对象的联系会变得更加困难。

#### 真实案例：文件上传
**背景**：在微云文件上传模块的开发中，曾爆发过对象爆炸的问题。微云文件上传分为浏览器插件上传，flash上传和表单上传等。用户对于不用的上传模式，都能一个一个上传，或者批量上传。在最初版时，同时上传2000个文件，在IE浏览器中直接进入假死状态。
```js
// 真实案例：文件上传
// 文件上传对象
var Upload = function (uploadType, fileName, fileSize) {
  this.uploadType = uploadType;
  this.fileName = fileName;
  this.fileSize = fileSize;
  this.dom = null;
}
Upload.prototype.init = function (id) {
  var _self = this;
  this.id = id;
  this.dom = document.createElement('div');
  this.dom.innerHTML = '<span>文件名称：' + this.fileName + ',文件大小：' 
  + this.fileSize + 'kb</span>' + '<button type="button" class="delFile">删除</button>';
  this.dom.querySelector('.delFile').onclick = function () {
    _self.deleteFile();
  }
  document.body.appendChild(this.dom);
}
Upload.prototype.deleteFile = function () {
  if (this.fileSize < 3000) {
    console.log('成功删除' + this.fileName + '文件');
    return this.dom.parentNode.removeChild(this.dom);
  }
  if (confirm('是否确定删除此文件?')) {
    return this.dom.parentNode.removeChild(this.dom);
  }
}

// 上传方法
var id = 0;
window.startUpload = function (uploadType, fileList) {
  for (let index = 0; index < fileList.length; index++) {
    var file = fileList[index];
    var upload = new Upload(uploadType, file.name, file.size);
    upload.init(id++);
  }
}

// 用户上传
startUpload('plugin', [
  { name: '1.txt', size: 1000 },
  { name: '2.txt', size: 3000 },
  { name: '3.txt', size: 5000 }
])
startUpload('flash', [
  { name: '4.txt', size: 1000 },
  { name: '5.txt', size: 3000 },
  { name: '6.txt', size: 5000 }
])
```
#### 真实案例：文件上传结果

![真实案例：文件上传结果](../images/books/fileUploadResult.png)

#### 真实案例：亨元模式重构文件上传
::: tip 如何划分内部状态和外部状态
1. 内部状态存储于对象内部
2. 内部状态可以被一些对象共享
3. 内部状态独立于具体的场景，通常不会改变
4. 外部状态取决于具体的场景，并根据场景的变化而变化，外部状态通常是不能被共享的。
:::
::: tip 文件上传内部状态划分
内部状态：uploadType<br/>
外部状态：fileName,fileSize(文件名和文件大小不能被共享，它随不同的文件不同而不同)
:::
```js
// 真实案例：亨元模式重构文件上传
// 文件上传对象
var Upload = function (uploadType) {
  this.uploadType = uploadType;
}
// 工厂模式：解决一开始就共享所有对象的问题
var UploadFactory = (function(){
  var createFactoryList = {};
  return {
    create: function(uploadType) {
      if(createFactoryList[uploadType]) {
        return createFactoryList[uploadType]
      }
      return createFactoryList[uploadType] = new Upload(uploadType);
    }
  }
})();
// 管理器：封装外部状态，使程序在运行时给upload对象设置外部状态
var uploadManage = (function(){
  var uploadDataBase = {};
  return {
    add: function(id,type,name,size) {
      var uploadObj = UploadFactory.create(type);
      var dom = document.createElement('div');
      dom.innerHTML = '<span>文件名称：' + name + ',文件大小：' + 
      size + 'kb</span>' + '<button type="button" class="delFile">删除</button>';
      dom.querySelector('.delFile').onclick = function () {
        uploadObj.deleteFile(id);
      }
      document.body.appendChild(dom);
      uploadDataBase[id] = {
        fileName: name,
        fileSize: size,
        dom: dom
      }
      return uploadObj;
    },
    setExternalState: function(id,uploadObj) {
      var uploadData = uploadDataBase[id];
      for (var i in uploadData) {
        uploadObj[i] = uploadData[i];
      }
    }
  }
})();
Upload.prototype.deleteFile = function () {
  uploadManage.setExternalState(id,this);
  if (this.fileSize < 3000) {
    return this.dom.parentNode.removeChild(this.dom);
  }
  if (confirm('是否确定删除此文件?')) {
    return this.dom.parentNode.removeChild(this.dom);
  }
}

// 上传方法
var id = 0;
window.startUpload = function (uploadType, fileList) {
  for (let index = 0; index < fileList.length; index++) {
    var file = fileList[index];
    var upload = uploadManage.add(++id,uploadType,file.name,file.size);
  }
}

// 用户上传
startUpload('plugin', [
  { name: '1.txt', size: 1000 },
  { name: '2.txt', size: 3000 },
  { name: '3.txt', size: 5000 }
])
startUpload('flash', [
  { name: '4.txt', size: 1000 },
  { name: '5.txt', size: 3000 },
  { name: '6.txt', size: 5000 }
])
```
#### 真实案例：亨元模式重构文件上传

![亨元模式重构文件上传结果](../images/books/fileUploadResult.png)

### 职责链模式
::: tip 定义
职责链模式：使多个对象都有机会处理请求，从而避免请求的发送者和接受者之间的耦合关系，将这些对象连成一条链传递该请求，直到有一个对象处理它为止。
:::
**优点**：
1. 解耦发送者和N个接受者之间的关系
2. 可以手动设置起始节点，并不是必须从第一个开始
3. 可以与其他设计模式在一起实现更加复杂的功能，例如职责链模式+命令模式

**缺点**：
1. 请求不能保证一定能在接受者中被处理
2. 请求链过长的情况下，可能某些节点并没有起到实质性的作用，造成性能损耗。

#### 现实中的职责链模式
1. 高峰坐公交时，从后门上车的乘客需要把卡一个一个传递，最后一个人打卡或者投币。
2. 考试写小纸条，往后一个一个传递，直到有一个人把正确答案给你为止。

#### 实际开发中的职责链模式: if-else版
**背景**：某公司电商网站，准备做一个活动，用户分别交纳500元定金，可得100元优惠券；交纳200元定金，可得50元优惠券；不交纳定金，正常购买，不享受优惠券，切在库存不充足时，不一定保证能买到商品。<br/>
**字段描述**:
1. orderType: 1代表500元定金用户；2代表200元定金用户；3代表普通用户
2. pay：是否已支付定金
3. stock：库存，支付了定金的用户不受库存限制

```js
// if else版
var  order = function(orderType,pay,stock) {
  if(orderType==1) {
    if(pay) {
      console.log('500元定金预购，享受100元优惠券');
    } else {
      // 未支付定金，降级到普通订单
      if(stock>0) {
        console.log('普通订单，无优惠券');
      } else {
        console.log('库存不足');
      }
    }
  } else if(orderType==2) {
    if(pay) {
      console.log('200元定金预购，享受50元优惠券');
    } else {
      // 未支付定金，降级到普通订单
      if(stock>0) {
        console.log('普通订单，无优惠券');
      } else {
        console.log('库存不足');
      }
    }
  } else if(orderType==3) {
    if(stock>0) {
      console.log('普通订单，无优惠券');
    } else {
      console.log('库存不足');
    }
  }
}

// 订单测试
order(1, true, 500);  // 输出：500元定金预购，享受100元优惠券
order(1, false,500);  // 输出：普通订单，无优惠券
order(2, true, 500);  // 输出：200元定金预购，享受50元优惠券
order(3, true, 500);  // 输出：普通订单，无优惠券
```

#### 实际开发中的职责链模式: 职责链重构版
```js
// 职责链重构版
var order500 = function(orderType,pay,stock) {
  if(orderType==1 && pay) {
    console.log('500元定金预购，享受100元优惠券');
  } else {
    order200(orderType,pay,stock);
  }
}
var order200 = function(orderType,pay,stock) {
  if(orderType==2 && pay) {
    console.log('200元定金预购，享受50元优惠券');
  } else {
    orderNormal(orderType,pay,stock);
  }
}
var orderNormal = function(orderType,pay,stock) {
  if(stock>0) {
    console.log('普通订单，无优惠券');
  } else {
    console.log('库存不足');
  }
}

// 订单测试
order500(1, true, 500);  // 输出：500元定金预购，享受100元优惠券
order500(1, false,500);  // 输出：普通订单，无优惠券
order500(2, true, 500);  // 输出：200元定金预购，享受50元优惠券
order500(3, true, 500);  // 输出：普通订单，无优惠券
```
**存在的问题**:
1. 传递请求的代码被严格耦合在了一起，违反开放-封闭原则
2. 当要新增300元订单时，必须把原来的职责链拆解，移动后才能运行起来

#### 实际开发中的职责链模式: 职责链重构完善版
::: tip 约定
我们约定，在某个节点处理不了请求时，返回一个字段，把请求往后传递
:::
```js
// 职责链重构完善版
var order500 = function(orderType,pay,stock) {
  if(orderType==1 && pay) {
    console.log('500元定金预购，享受100元优惠券');
  } else {
    return 'next';
  }
}
var order200 = function(orderType,pay,stock) {
  if(orderType==2 && pay) {
    console.log('200元定金预购，享受50元优惠券');
  } else {
    return 'next';
  }
}
var orderNormal = function(orderType,pay,stock) {
  if(stock>0) {
    console.log('普通订单，无优惠券');
  } else {
    console.log('库存不足');
  }
}

// 新增职责链类
var Chain = function(fn) {
  this.fn = fn;
  this.receiver = null;
}
Chain.prototype.setReceiver = function(receiver) {
  this.receiver = receiver;
}
Chain.prototype.passRequest = function() {
  var returnMsg = this.fn.apply(this,arguments);
  if(returnMsg=='next') {
    return this.receiver && this.receiver.passRequest.apply(this.receiver,arguments);
  }
  return returnMsg;
}

var chainOrder500 = new Chain(order500);
var chainOrder200 = new Chain(order200);
var chainOrderNormal = new Chain(orderNormal);
chainOrder500.setReceiver(chainOrder200);
chainOrder200.setReceiver(chainOrderNormal);

// 订单测试
chainOrder500.passRequest(1, true, 500);  // 输出：500元定金预购，享受100元优惠券
chainOrder500.passRequest(1, false,500);  // 输出：普通订单，无优惠券
chainOrder500.passRequest(2, true, 500);  // 输出：200元定金预购，享受50元优惠券
chainOrder500.passRequest(3, true, 500);  // 输出：普通订单，无优惠券
```

#### 实际开发中的职责链模式: AOP实现
```js
// AOP实现职责链模式
Function.prototype.after = function(fn) {
  var self = this;
  return function() {
    var returnMsg = self.apply(this,arguments);
    if(returnMsg=='next') {
      return fn.apply(this,arguments);
    }
    return returnMsg;
  }
}
var order500 = function(orderType,pay,stock) {
  if(orderType==1 && pay) {
    console.log('500元定金预购，享受100元优惠券');
  } else {
    return 'next';
  }
}
var order200 = function(orderType,pay,stock) {
  if(orderType==2 && pay) {
    console.log('200元定金预购，享受50元优惠券');
  } else {
    return 'next';
  }
}
var orderNormal = function(orderType,pay,stock) {
  if(stock>0) {
    console.log('普通订单，无优惠券');
  } else {
    console.log('库存不足');
  }
}
var order = order500.after(order200).after(orderNormal);

// 订单测试
order(1, true, 500);  // 输出：500元定金预购，享受100元优惠券
order(1, false,500);  // 输出：普通订单，无优惠券
order(2, true, 500);  // 输出：200元定金预购，享受50元优惠券
order(3, true, 500);  // 输出：普通订单，无优惠券
```

### 中介者模式
::: tip
中介者模式：中介者模式的作用就是解除对象与对象之间的紧耦合关系。增加一个中介者对象后，所有的相关对象都通过中介者对象来通信，而不是互相引用，所以当一个对象发生改变时，只需要通知中介者即可。
:::

#### 中介者模式的缺点
1. 中介者模式本身就要新增一个中介者对象
2. 将对象与对象之间交互的复杂性，转移到对象与中介者之间的复杂性，使得中介者对象经常是巨大的
3. 中介者本身就是一个难以维护的对象。

#### 现实中的案例
1. 机场指挥塔
机场指挥塔扮演者中介者，而不同的飞机扮演对象，他们通过与指挥塔进行通信，从而得知消息，什么时候可以起飞，什么时候可以降落。
2. 博彩公司
在世界杯期间，博彩公司通过扮演中介者，把成千上万的用户投注情况进行汇总，根据比赛的输赢，进行计算相关的赔率。

#### 中介者模式案例：泡泡堂(原始版)
::: tip
1. 分为红蓝两队
2. 只有某队全部死亡，才算失败
:::
```js
// 中介者模式案例：泡泡堂(原始版)
var Player = function(name,teamColor) {
  this.partners = [];         // 队友列表
  this.emeies = [];           // 敌人列表
  this.name = name;           // 名字
  this.teamColor = teamColor; // 队伍颜色
  this.state = 'live';        // 生存状态
}
Player.prototype.win = function() {
  console.log(this.name+'胜利了');
}
Player.prototype.lose = function() {
  console.log(this.name+'失败了');
}
Player.prototype.die = function() {
  var allDie = true;
  this.state = 'dead';
  // 遍历队友是否全部阵亡
  for (let index = 0,len = this.partners.length; index < len; index++) {
    if(this.partners[index].state!='dead') {
      allDie = false;
      break;
    }
  }
  // 如果全部阵亡，遍历通知队友失败，通知敌人胜利
  if(allDie) {
    this.lose();
    for (let index = 0,len = this.partners.length; index < len; index++) {
      this.partners[index].lose();
    }
    for (let index = 0,len = this.emeies.length; index < len; index++) {
      this.emeies[index].win();
    }
  }
}

// 工厂方法创建玩家
var players = [];
var playerFactory = function(name,teamColor) {
  var newPlayer = new Player(name,teamColor);
  for (let index = 0,len = players.length; index < len; index++) {
    if(players[index].teamColor==teamColor) {
      players[index].partners.push(newPlayer);
      newPlayer.partners.push(players[index]);
    } else {
      players[index].emeies.push(newPlayer);
      newPlayer.emeies.push(players[index]);
    }
  }
  players.push(newPlayer);
  return newPlayer;
}

// 红队
var player1 = playerFactory('张三','red'),
    player2 = playerFactory('张四','red'),
    player3 = playerFactory('张五','red'),
    player4 = playerFactory('张六','red');
// 蓝队
var player5 = playerFactory('辰大','blue'),
    player6 = playerFactory('辰二','blue'),
    player7 = playerFactory('辰三','blue'),
    player8 = playerFactory('辰四','blue');

// 淘汰玩家
// 依次输出：辰四失败了 辰大失败了 辰二失败了 辰三失败了 张三胜利了  张四胜利了
// 张五胜利了  张六胜利了
player5.die();
player6.die();
player7.die();
player8.die();
```
**思考**：<br>
1. 虽然我们可以随意创建任意对个玩家，但玩家和其他玩家紧紧耦合在了一起
2. 某一个玩家的状态改变，必须通知其他对象，当其它对象很多时，会非常不合适。
3. 不利于扩展，今后如果要添加新的功能，如：玩家掉线，解除队伍，添加到别的队伍会非常不方便。

#### 中介者模式案例：泡泡堂(引入中介者)
```js
// 中介者模式案例：泡泡堂(引入中介者)
var playerDirector = (function(){
  var players = {};
  var operations = {
    addPlayer: function(player) {
      var teamColor = player.teamColor;
      if(!players[teamColor]) {
        players[teamColor] = [];
      }
      players[teamColor].push(player)
    },
    removePlayer: function(player) {
      var teamColor = player.teamColor;
      var teamPlayers = players[teamColor] || [];
      for (let index = 0,len=teamPlayers.length; index < len; index++) {
        if(teamPlayers[index]==player) {
          teamPlayers.splice(index,1);
          break;
        }
      }
    },
    changeTeam: function(player,newTeamColor) {
      operations.removePlayer(player);
      player.teamColor = newTeamColor;
      operations.addPlayer(player);
    },
    playerDead: function(player) {
      var teamColor = player.teamColor;
      var teamPlayers = players[teamColor];
      var allDead = true;
      player.state = 'dead';
      for (let index = 0,len=teamPlayers.length; index < len; index++) {
        if(teamPlayers[index].state!='dead') {
          allDead = false;
          break;
        }
      }
      if(allDead) {
        for (let index = 0,len=teamPlayers.length; index < len; index++) {
          teamPlayers[index].lose();
        }
        for (var color in players) {
          if(color!=teamColor) {
            for (let index = 0,len=players[color].length; index < len; index++) {
              players[color][index].win();
            }
          }
        }
      }
    }
  };
  var ReceiveMessage = function() {
    var message = Array.prototype.shift.call(arguments);
    operations[message].apply(this,arguments);
  }
  return {
    ReceiveMessage: ReceiveMessage
  }
})()
var Player = function(name,teamColor) {
  this.name = name;
  this.teamColor = teamColor;
  this.state = 'live';
}
Player.prototype.win = function() {
  console.log(this.name+'胜利了');
}
Player.prototype.lose = function() {
  console.log(this.name+'失败了');
}
Player.prototype.remove = function() {
  console.log(this.name+'掉线了');
  playerDirector.ReceiveMessage('removePlayer',this);
}
Player.prototype.die = function() {
  console.log(this.name+'死亡');
  playerDirector.ReceiveMessage('playerDead',this);
}
Player.prototype.changeTeam = function(color) {
  console.log(this.name+'换队');
  playerDirector.ReceiveMessage('changeTeam',this,color);
}

// 工厂模式创建玩家
var playerFactory = function(name,teamColor) {
  var newPlayer = new Player(name,teamColor);
  playerDirector.ReceiveMessage('addPlayer',newPlayer);
  return newPlayer;
}
// 红队
var player1 = playerFactory('张三','red'),
    player2 = playerFactory('张四','red'),
    player3 = playerFactory('张五','red'),
    player4 = playerFactory('张六','red');
// 蓝队
var player5 = playerFactory('辰大','blue'),
    player6 = playerFactory('辰二','blue'),
    player7 = playerFactory('辰三','blue'),
    player8 = playerFactory('辰四','blue');

// 掉线
// 依次输出：张三掉线了 张四掉线了
player1.remove();
player2.remove();

// 更换队伍
// 依次输出：张五换队 张五死亡
player3.changeTeam('blue');

// 阵亡
// 依次输出：辰大死亡 辰二死亡  辰三死亡 辰四死亡
// 辰大失败了 辰二失败了  辰三失败了 辰四失败了 张五失败了
// 张六胜利了
player3.die();
player5.die();
player6.die();
player7.die();
player8.die();
```
### 装饰者模式
::: tip 定义
装饰者模式可以动态的给某个对象添加一些额外的职责，而不会影响从这个类中派生的其他对象。
:::

#### 继承的问题
在传统的面向对象语言中，给对象添加功能常常使用继承的方式，但继承的方式并不灵活，还会带来许多问题
1. 超类和子类之间存在强耦合关系，当改变超类时，子类也会随之改变。
2. 超类的内部细节对子类是可见的，继承常常被认为破坏了封装性。
3. 在完成一些功能复用的同时，有可能创建出大量的子类，使子类的数量呈爆炸式增长。

#### 模拟面向对象语言的装饰者模式
```js
// 飞机大战案例: 面向对象版
var Plane = function() {};
var Missile = function(plane) {
  this.plane = plane;
};
var Atom = function(plane) {
  this.plane = plane;
}

Plane.prototype.fire = function() {
  console.log('发射普通子弹');
};
Missile.prototype.fire = function() {
  this.plane.fire();
  console.log('发射导弹');
}
Atom.prototype.fire = function() {
  this.plane.fire();
  console.log('发射原子弹');
}

// 调用
var plane = new Plane();
plane = new Missile(plane);
plane = new Atom(plane);
plane.fire(); // 依次输出：发射普通子弹 发射导弹 发射原子弹
```

#### JavaScript中的装饰者
```js
// JavaScript版
var plane = {
  fire: function() {
    console.log('发射普通子弹');
  }
}
var missile = function() {
  console.log('发射导弹');
}
var atom = function() {
  console.log('发射原子弹');
}

var fire1 = plane.fire;
plane.fire = function() {
  fire1();
  missile();
}
var fire2 = plane.fire;
plane.fire = function() {
  fire2();
  atom();
}

plane.fire();// 依次输出：发射普通子弹 发射导弹 发射原子弹
```
**解析**：这种给对象添加职责的方式，并没有真正的改动对象自身，而是将对象放入另外一个对象之中，这些对象以一条链的方式进行引用，形成一个聚合对象。


#### AOP
用AOP装饰函数的技巧在实际开发中非常有用，无论是业务代码的编写，还是在框架层面，我们都可以把行为依照职责分成粒度更细的函数，随后通过装饰把他们合并在一起，这有助于我们编写一个松耦合和高复用性的系统。
##### AOP的两个装饰函数
```js
// before函数
Function.prototype.before = function(beforeFn) {
  var _self = this;
  return function() {
    beforeFn.apply(this,arguments);
    return _self.apply(this,arguments);
  }
}

// after函数
Function.prototype.after = function(afterFn) {
  var _self = this;
  return function() {
    var ret = _self.apply(this,arguments);
    afterFn.apply(this,arguments);
    return ret;
  }
}
```
##### AOP应用实例一：数据上报
分离业务代码和数据统计代码，无论在什么语言中，都是AOP的经典应用之一。
```html
<button id="btnLogin">点击打开登录浮层</button>
```
```js
// 数据上报
Function.prototype.before = function (beforeFn) {
  var _self = this;
  return function () {
    beforeFn.apply(this, arguments);
    return _self.apply(this, arguments);
  }
}
Function.prototype.after = function (afterFn) {
  var _self = this;
  return function () {
    var ret = _self.apply(this, arguments);
    afterFn.apply(this, arguments);
    return ret;
  }
}
var showLogin = function() {
  console.log('打开登录浮层');
}

// 依次输出：按钮点击之前上报  打开登录浮层  按钮点击之后上报
document.getElementById('btnLogin').onclick = showLogin.before(function(){
  console.log('按钮点击之前上报');
}).after(function() {
  console.log('按钮点击之后上报');
});
```

##### AOP应用实例一：插件式表单
```html
用户名：<input type="text" id="username">
密码：<input type="password" id="password">
<button id="loginBtn">登录</button>
```
```js
// 插件式表单
Function.prototype.before = function (beforeFn) {
  var _self = this;
  return function () {
    if(beforeFn.apply(this,arguments)===false) {
      // 未验证通过，不再执行原函数
      return ;
    }
    return _self.apply(this, arguments);
  }
}
var username = document.getElementById('username');
var password = document.getElementById('password');
var loginBtn = document.getElementById('loginBtn');
// 验证函数
var validate = function() {
  if(username.value === '') {
    console.log('用户名不能为空');
    return false;
  }
  if(password.value === '') {
    console.log('密码不能为空');
    return false;
  }
}
// 登录ajax
var formSubmit = function() {
  var params = {
    username: username,
    password: password
  }
  console.log('登录ajax...');
}
// 登录按钮点击
formSubmit = formSubmit.before(validate);
loginBtn.onclick = function() {
  formSubmit();
};
```

### 状态模式
::: tip
状态模式的关键是区分事物内部的状态，事物内部状态的改变往往会带来事物的行为改变。
:::

#### 初识状态模式
我们想象这样一个场景：有一个电灯，电灯上面只有一个开关。当电灯开着的时候，我们按一下开关，电灯会切换到关闭状态;再按一次开关，电灯又将被打开。同一个开关按钮，在不同的状态下，表现出来的行为是不一样的。
```js
// 电灯类
var Light = function() {
  this.state = 'off';
  this.button = null;
}
// 初始化方法
Light.prototype.init = function() {
  var button = document.createElement('button');
  var _self = this;
  button.innerHTML = '开关';
  this.button = document.body.appendChild(button);
  this.button.onclick = function() {
    _self.buttonPresssed();
  }
}
// 开关点击
Light.prototype.buttonPresssed = function() {
  if (this.state == 'off') {
    this.state = 'on';
    console.log('开灯');
  } else if(this.state == 'on') {
    this.state = 'off';
    console.log('关灯');
  }
}

var light = new Light();
light.init();
```
**分析**：现在看来，我们已经编写了一个强壮的状态机，这个状态机的逻辑既简单又缜密，看起来这段代码设计得无懈可击。但令人遗憾的是，这个世界上的电灯并非只有一种。许多酒店里有另外一种电灯，这种电灯也只有一种开关，但它的表现是：当第一次按下时，出现弱光;第二次按下时，出现强光；第三次按下时才是关闭电灯。
```js
// 改写开关点击事件
Light.prototype.buttonPresssed = function() {
  if (this.state == 'off') {
    this.state = 'weakLight';
    console.log('弱光');
  } else if(this.state == 'weakLight') {
    this.state = 'strongLight';
    console.log('强光');
  }else if(this.state == 'strongLight') {
    this.state = 'off';
    console.log('关灯');
  }
}
```
**再次分析**：以上代码存在如下的缺点
1. 开关点击事件中的代码，违反了开放-封闭原则，每次新增或者修改`light`的状态，都要改动开关点击事件中的代码
2. 所有跟状态有关的行为，都被封装在`buttonPresssed`方法里，后续如果再扩展一种灯光的话，将十分难以维护。
3. 状态的切换不明显，仅仅表现在对`state`变量的赋值。
4. `buttonPresssed`方法里，对于状态的判断，仅仅是`if-else`的堆砌，不利于后续的维护和扩展

#### 状态模式改写电灯程序
::: tip
状态模式的核心是区分对象的状态，将电灯程序中三种状态分别设计成单独的一个类，与此种状态有关的行为被封装在这个类的内部。
:::
```js
// 关闭
var OffLightState = function(light) {
  this.light = light;
}
OffLightState.prototype.buttonPressed = function() {
  console.log('弱光');
  this.light.setState(this.light.weakLightState);
}
// 弱光
var WeakLightState = function(light) {
  this.light = light;
}
WeakLightState.prototype.buttonPressed = function() {
  console.log('强光');
  this.light.setState(this.light.strongLightState);
}
// 强光
var StrongLightState = function(light) {
  this.light = light;
}
StrongLightState.prototype.buttonPressed = function() {
  console.log('关闭');
  this.light.setState(this.light.offLightState);
}

// 电灯类
var Light = function() {
  this.offLightState = new OffLightState(this);
  this.weakLightState = new WeakLightState(this);
  this.strongLightState = new StrongLightState(this);
  this.button = null;
}
Light.prototype.init = function() {
  var button = document.createElement('button');
  var _self = this;
  this.button = document.body.appendChild(button);
  this.button.innerHTML = '开关';
  this.currState = this.offLightState;
  this.button.onclick = function() {
    _self.currState.buttonPressed();
  }
}
Light.prototype.setState = function(state) {
  this.currState = state;
}

// 初始化测试
var light = new Light();
light.init();
```

#### 状态模式的优缺点
现在我们已经大概掌握了状态模式，现在是时候来总结一下状态模式的优缺点了。<br/>
**优点**：
1. 状态模式定义了状态和行为之间的关系，并将他们封装在一个类里。通过增加新的状态类，很容易增加新的状态和转换。
2. 避免了`Context`无限膨胀，状态切换的逻辑被分布在状态类中，也去掉了`Context`中原本过多的条件分支
3. 用对象代替字符串来记录当前状态，使得状态的切换更加一目了然。
4. `Context`中的请求动作和状态类中封装的行为可以非常容易的独立变化而不影响。

**缺点**：
1. 状态模式会根据系统中多少种状态来定义多少个类，这将是一项枯燥和无味的过程
2. 状态模式会将逻辑分散在各个状态类中，虽然可以避免条件分支语句判断，但也造成了逻辑分散，我们无法在一个地方就看出整个状态机的逻辑。
### 适配器模式
:::tip
适配器模式的作用是解决两个软件实体间的接口不兼容的问题，使用适配器模式之后，原本由于接口不兼容而不能工作的两个软件实体可以一起工作。
:::

####  适配器运用:地图渲染
```js
// 谷歌地图
var googleMap = {
  show: function() {
    console.log('开始渲染谷歌地图');
  }
}
// 百度地图
var baiduMap = {
  // 地图渲染接口不兼容
  display: function() {
    console.log('开始渲染百度地图');
  }
}
// 百度地图适配器
var baiduMapAdapter = {
  show: function() {
    return baiduMap.display();
  }
}
// 地图渲染
var renderMap = function(map) {
  if(map.show instanceof Function) {
    map.show();
  }
}
// 测试地图渲染
renderMap(googleMap);       // 开始渲染谷歌地图
renderMap(baiduMapAdapter); // 开始渲染百度地图
```

## 设计原则和编程技巧
前辈们总结的这些设计原则通常指**单一职责原则**、**里氏转换原则**、**依赖倒置原则**、**接口隔离原则**、**合成复用原则**和**最少知识原则**。
### 单一职责原则
::: tip
单一职责原则(SRP)体现为：一个对象(方法)只做一件事情，它被广泛运用在代理模式、迭代器模式、单例模式和装饰者模式中。
:::
单一职责原则被定义为"引起变化的原因"，如果我们有两个动机去改写一个方法，那么这个方法就具有两个职责。每一个职责的变化都是一个轴线，如果一个人承担了过多的职责，那么在需求变迁的过程中，需要改写这个方法的可能性就越大。

#### 何时应该分离职责
`SRP`原则是所有原则中最简单也是最难正确运用的原则之一，要明确的是，并不是所有的职责都应该一一分离。
1. 一方面，如果随着需求的变化，有两个职责总是同时变化，那就不比分离他们。比如Ajax请求时，创建xhr对象和发送xhr请求几乎总是在一起，那么创建xhr对象的职责和发送xhr请求的职责就没有必要分开。
2. 另一方面，职责的变化轴线仅当他们确定会发生变化时才具有意义，即使两个职责已经被耦合在一起，但他们还没有发生改变的征兆，那么也许没有必要主动分离他们，在代码需要重构的时候再进行分离也不迟。

#### SRP原则的优缺点
**优点**：降低了单个类或者对象的复杂度，按照职责把对象分解成更小的粒度，这有助于代码的复用，也有利于进行单元测试。当一个职责需要变更的时候，不会影响到其他的职责。<br>
**缺点**：最明显的是会增加编写代码的复杂度，当我们按照职责把对象分解成更小的粒度之后，实际上也增大了这些对象之间相互联系的难度。

### 最少知识原则
::: tip
最少知识原则(LKP)说的是一个软件实体应当尽可能少的于其他实体发生相互作用，它常用在中介者模式和外观模式中。
:::

#### 指导思想
最少知识原则要求我们在设计程序时，应当尽量减少对象之间的交互。<br>
如果两个对象之间不必彼此通信，那么这两个对象就不要发生直接的相互联系，常见的做法是引入一个第三者对象，来承担这些对象之间的通信作用。如果一些对象需要向另一些对象发送请求，可以通过第三者对象来转发这些请求。

### 开放-封闭原则
::: tip
开放-封闭原则(OCP)是最重要的一条原则，它的定义是：软件实体(类，模块，函数)等应该是可以扩展的，但是不可修改。
:::

#### 指导思想
当需要改变一个程序的功能或者给这个程序增加新功能的时候，可以使用增加代码的方式，但是不允许改动程序的源代码。

#### 设计模式中的开放-封闭原则
1. 发布-订阅模式
2. 模板方法模式
3. 策略模式
4. 代理模式
5. 职责连模式

### 代码重构
::: tip
模式和重构之间有着一种与生俱来的关系，从某种角度来看，设计模式的目的就是为许多重构行为提供目标。
:::

#### 提炼函数
如果在函数中有一段代码可以被独立出来，那我们最好把这些代码放进另一个独立的函数中，这是一种很常见的优化工作，这样做的好处主要有以下几点：
1. 避免出现超大的函数
2. 独立出来的函数有助于代码复用
3. 独立出来的函数更容易被覆写。
4. 独立出来的函数如果拥有一个良好的命名，它本身就起到了注释的作用。

```js
// 提炼函数
var getUserInfo = function() {
  ajax('http://xxx.com/userInfo', function(data) {
    console.log('userId:' + data.userId);
    console.log('userName:'+ data.userName);
    console.log('nickName:'+data.nickName);
  });
};

// 改写成
var getUserInfo = function() {
  ajax('http://xxx.com/userInfo', function(data) {
    printDetails(data);
  });
};
var printDetails = function(data) {
  console.log('userId:' + data.userId);
  console.log('userName:'+ data.userName);
  console.log('nickName:'+data.nickName);
}
```

#### 合并重复的条件片段
如果一个函数体内有一些条件分支语句，而这些条件分支语句内部散步了一些重复的代码，那么就有必要进行合并去重工作。
```js
var paging = function(currPage) {
  if(currPage<0) {
    currPage = 0;
    jump(currPage);
  } else if(currPage >= totalPage) {
    currPage = totalPage;
    jump(currPage);
  } else {
    jump(currPage);
  }
}

// 改写成
var paging = function(currPage) {
  if(currPage<0) {
    currPage = 0;
  } else if(currPage >= totalPage) {
    currPage = totalPage;
  }
  jump(currPage);
}
```

#### 把条件分支语句提炼成函数
在程序设计中，复杂的条件分支语句是导致程序难以阅读和理解的重要原因，而且容易导致一个庞大的函数。
```js
// 根据季节打折
var getPrice = function(price) {
  var date = new Date();
  if(data.getMonth() >=6 && data.getMonth() <= 9) {
    return price * 0.8;
  }
  return price;
}

// 改写成
var isSummer = function() {
  var date = new Date();
  return data.getMonth() >=6 && data.getMonth() <= 9
}
var getPrice = function(price) {
  if(isSummer()) {
    return price * 0.8;
  }
  return price;
}
```

#### 合理利用循环
在函数体内，如果有些代码实际上负责的是一些重复性的工作，那么合理利用循环不仅可以完成同样的功能，还可以是代码量更少。
```js
var createXHR = function() {
  var xhr;
  try{
    xhr = new ActiveXObject('MSXML2.XMLHttp.6.0');
  }catch(e) {
    try{
      xhr = new ActiveXObject('MSXML2.XMLHttp.3.0');
    }catch(e) {
      xhr = new ActiveXObject('MSXML2.XMLHttp');
    }
  }
  return xhr;
}

// 改写成
var createXHR = function() {
  var versions = ['MSXML2.XMLHttp.6.0','MSXML2.XMLHttp.3.0','MSXML2.XMLHttp'];
  for(var i = 0,version;version = version[i++];) {
    try{
      return new ActiveXObject(version); 
    }catch(e) {

    }
  }
}
```

#### 提前让函数退出代替嵌套条件分支
```js
var del = function(obj) {
  var ret;
  if(!obj.isReadOnly) {
    if(obj.isFolder) {
      ret = deleteFolder(obj);
    } else if(obj.isFile) {
      ret = deleteFile(obj);
    }
  }
}

// 改写成
var del = function(obj) {
  if(obj.isReadOnly) {
    return;
  }
  if(obj.isFolder) {
    return deleteFolder(obj);
  }
  if(obj.isFile) {
    return deleteFile(obj);
  }
}
```

#### 传递对象参数代替过长的参数列表
有时候一个函数有可能接受多个参数，而参数的数量越多，函数就越难理解和使用。
```js
var setUserInfo = function(id,name,address,sex,mobile,qq) {
  console.log('id='+id);
  console.log('name='+name);
  console.log('address='+address);
  console.log('sex='+sex);
  console.log('mobile='+mobile);
  console.log('qq='+qq);
}
setUserInfo(1314,'sven','shenzhen','male','13886867272','33223311');

// 改写成
var setUserInfo = function(userInfo) {
  console.log('id='+userInfo.id);
  console.log('name='+userInfo.name);
  console.log('address='+userInfo.address);
  console.log('sex='+userInfo.sex);
  console.log('mobile='+userInfo.mobile);
  console.log('qq='+userInfo.qq);
}
setUserInfo({
  id:1314,
  name:'sven',
  address:'shenzhen',
  sex:'male',
  mobile:'13886867272',
  qq:'33223311'
});
```

#### 合理使用链式调用
```js
var User = {
  id: null,
  name: null,
  setId: function(id) {
    this.id = id;
    return this;
  },
  setName: function(name) {
    this.name = name;
    return this;
  }
}
console.log(User.setId(1314).setName('sven'));
```

**代码分析**：链式调用的方式并不会造成太多阅读上的困难，也确实能省下一些字符和中间变量，但节省下来的字符数量同样是微不足道的。<br>
链式调用带来的坏处就是在调试的时候非常不方便，如果有一条链有错误出现，必须得先把这条链拆开才能加上一些调试log或者断点，这样才能定位错误出现的地方。