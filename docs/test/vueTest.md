---
sidebar: auto
---

# Vue应用测试
本篇文章由阅读《Vue.js应用测试》书籍、学习《Vue Test Utils》`Vue`官网知识，以及实际工作经验总结而来，阅读书籍请支持正版。

## 测试介绍
前端应用程序主要编写三种测试类型：**单元测试**、**快照测试**、**端到端测试**。

对于不同类型的测试，我们应该正确对待它们，并能够根据他们各自的优缺点进行比例混合。在一个测试金字塔中，单元测试需要占大部分比例，因为它们在开发应用程序时可以提供快速的反馈。快照测试的覆盖范围比较广，因此我们并不需要太多的快照测试，以`Vue`组件为例，一个`Vue`组件可能只需要一个快照测试用例。端到端测试用例虽然对应用程序非常有用，但由于它可能很慢而且会不稳定，因此端到端测试比例应该是最少的。

代码覆盖率是度量一个应用程序或者库质量的一个重要指标，通常而言`0%`表示未进行任何代码测试，`100%`意味着在测试用例执行时，每一行代码都被执行过了。`100%`覆盖率可能同`0%`覆盖率一样可怕，因为这可能会给你一种错觉：它会让你以为你的程序永远不会出错，然而实际情况很可能是你对场景进行了错误的判断，进而得出错误的结论。例如：当你测试一个`API`接口时，你假定该`API`永远都不会返回错误信息，然而当`API`在正式环境中，它确实返回了错误信息。

对一个完整的应用程序而言，你可能会花费少量的时间就能让测试覆盖率达到`80%`~`90%`，然而剩下的`10%`~`20%`也可能会让你花费数倍的时间来完成，甚至根本达不到。就像你很轻松就能拧干毛巾里面大部分的水，然而拧干剩下的一小部分依然是一件十分困难的事情。

在`Vue`应用中，对于`UI`组件来说，我们并不推荐一味的追求行级覆盖率，因为过度注重覆盖率可能会严重导致我们过分关注组件内部的实现细节，从而导致过多的繁琐测试。取而代之的是，我们希望把组件测试撰写为断言组件的公共接口，并在一个黑盒中去处理它，一个简单的`UI`组件测试用例将断言一些输入(**用户交互**或**Prop输入**等)提供给组件之后，并期望组件得到预期的结果(**渲染结果**或**响应事件**等)。

### 端到端测试
端到端测试是最直观且容易理解的测试类型，在前端应用程序中，端到端测试可以从用户的视角，通过浏览器自动检查应用程序是否正常工作。

一个端到端测试的测试案例如下：
```js
function testCalc (browser) {
  browser.url('http://localhost:8080')
         .click('#button')
         .click('#button-plus')
         .assert.containsText('#result', '2')
         .end();
}
```
我们可以从以上一个小小的案例进行总结：

**优点**：
* 编写测试用例非常节省时间。
* 可以随意根据自己的需求进行调整。

**缺点**：
* 测试用例运行可能不是很快：启动浏览器会花费几秒、不同网站不同速度又会存在不同的耗时。
* 端到端的调试工作会很困难：在上面的例子中，在本地晚上上面一套流程调试尚且是一个很糟糕的过程，如果测试是在持续继承的服务器上失败那么更可以说是一场灾难。
* 端到端可能成为`flaky`测试：`flaky`测试表示即使被测应用程序正常运行，测试仍然频繁失败，其中失败的原因取决于多种因素：代码执行时间过长或API暂时失效。


### 单元测试
单元测试是对应用程序最小的部分运行测试的过程。通常来说，测试的单元是一个函数，但在`Vue`应用程序中，组件也算是一个被测单元。

一个单元测试的测试案例如下:
```js
// math.js
export function add (a, b) {
  return a + b
}

// math.spec.js
import { add } from 'math.js'
describe('math.js', () => {
  it('add func', () => {
    expect(add(1, 2)).toBe(2)
  })
})
```

我们可以对单元测试进行总结：

**有点：**
* 运行速度快：不同于端到端测试，单元测试用例运行速度很快。
* 友好的应用辅助效果：当团队出现新人时，他可以从单元测试中迅速了解项目需求。

**缺点：**
* 重构代码困难：如果要将一个已经具备单元测试的复杂功能拆分，需要在更改代码的同时更改对应的单元测试。
* 无法整体测试：由于单元测试只能针对程序的各个单元分开进行测试，各个单元测试通过并不意味着当他们组合起来就一定没有问题。


### 快照测试
快照测试会给运行中的应用程序拍一张"照片"，并将其与之前保存的图片进行比较，如果二者不相同则测试失败。

在之后，我们会使用`Jest`自动化测试框架来对`Vue`组件进行快照测试。


## 安装
### 官方自动化测试仓库
如果你仅仅只是为了学习`vue-test-utils`，那么可以尝试官方提供的一份极简的测试仓库。
```sh
git clone https://github.com/vuejs/vue-test-utils-getting-started
cd vue-test-utils-getting-started
npm install
```
在你成功安装后，你的项目目录结构如下所示：
```sh
|-- vue-test-utils-getting-started
|   |-- .babelrc      # babel配置
|   |-- .gitignore    # git忽略项配置
|   |-- counter.js    # 组件
|   |-- test.js       # 测试文件
|   |-- package.json
|   |-- README.md
```
**注意**：需要注意的是，此种方式可能并不直接支持我们使用`.vue`文件的形式，如果需要支持`.vue`文件，需要我们进行一些额外的配置。
### 使用官方脚手架安装
如果你是`Vue-Cli`的热爱者，那么通过`Vue-Cli4.0+`可以快速创建一个包含`test`测试相关的项目配置。
```sh
# 创建项目
$ vue create vue-jest

# 选择自定义配置
  default (babel, eslint)  
> Manually select features 

# 选择安装feature，也可以根据自己的喜好去安装
 (*) Babel
 ( ) TypeScript
 ( ) Progressive Web App (PWA) Support        
 ( ) Router
 ( ) Vuex
 ( ) CSS Pre-processors
 (*) Linter / Formatter
>(*) Unit Testing
 ( ) E2E Testing

 # 选择测试框架，我们选择jest
   Mocha + Chai
> Jest
```
安装完毕后，会在根目录下存在一个`tests`的目录，其中里面包含一个简单的测试用例`example.spec.js`：
::: tip
可以使用`npm run test:unit`来运行测试用例。
:::
```js
import { shallowMount } from '@vue/test-utils'
import HelloWorld from '@/components/HelloWorld.vue'

describe('HelloWorld.vue', () => {
  it('renders props.msg when passed', () => {
    const msg = 'new message'
    const wrapper = shallowMount(HelloWorld, {
      propsData: { msg }
    })
    expect(wrapper.text()).toMatch(msg)
  })
})
```
### 现有Vue项目中添加Jest测试
如果你是在现有Vue项目需要添加`Jest`自动化测试框架，可以在项目目录中运行如下命令：
```sh
# 请确保你的Vue-Cli安装了最新版本
$ vue add unit-jest
```
此条命令执行以后，会自动帮助我们安装`@vue/cli-plugin-unit-jest`，同时会帮助我们进行`jest`测试相关的配置，同样的它也会帮我们在根目录下新建`tests`文件夹，且同样包含测试用例`example.spec.js`：
::: tip
可以使用`npm run test:unit`来运行测试用例。
:::
```js
import { shallowMount } from '@vue/test-utils'
import HelloWorld from '@/components/HelloWorld.vue'

describe('HelloWorld.vue', () => {
  it('renders props.msg when passed', () => {
    const msg = 'new message'
    const wrapper = shallowMount(HelloWorld, {
      propsData: { msg }
    })
    expect(wrapper.text()).toMatch(msg)
  })
})
```
以下测试案例均依据以上第二或第三种方式进行的测试环境配置。
### VsCode编辑器插件
对于使用`VsCode`编辑器，可以通过安装`jest`插件，它可以在我们不运行`npm run test:unit`命令的时候就提示测试用例是否通过。
![jest插件](../images/test/vue-test1.png)
### 测试覆盖率和测试报告
在根目录下的`jest.config.js`中，我们进行如下配置：
```js
module.exports = {
  preset: '@vue/cli-plugin-unit-jest/presets/typescript-and-babel',
  snapshotSerializers: ['jest-serializer-vue'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1'
  },
  testMatch: [
    '**/tests/unit/**/*.spec.(js|jsx|ts|tsx)|**/__tests__/*.(js|jsx|ts|tsx)'
  ],
  collectCoverage: true,
  coverageDirectory: '<rootDir>/tests/unit/coverage',
  collectCoverageFrom: [
    'src/components/**/*.vue',
    'src/utils/**/*.ts',
    'src/store/modules/*.ts',
    '!src/utils/axios.ts',
    '!src/utils/notify.ts'
  ]
}
```

对以上配置的解释如下：
* `snapshotSerializers`: `Vue`组件进行`Jest`快照序列化的工具配置。
* `moduleNameMapper`：模块别名配置。
* `testMatch`：测试文件查找规则，可以是统一放在`src/tests`目录下，也可以就近放在`__tests/__`目录下。
* `collectCoverage`：是否进行测试覆盖率收集。
* `coverageDirectory`：测试报告存放位置。
* `collectCoverageFrom`：测试哪些文件和不测试哪些文件，你可以根据你的团队或者个人偏好进行设置。

在完善以上配置后，你可以在终端运行`npm run test:unit`命令，随后你将得到类似下面这样的测试报告：

![测试覆盖率](../images/test/vue-test2.png)


在以上测试报告中，我们明显可以看到有一些没有覆盖到的代码，这时我们可以在`src/tests/units/coverage/lcov-report`目录下找到我们对应的测试文件，随后点开。这里以`base/scroll/index.vue`为例，它有如下两个文件：
* `index.html`: 此处是对`scroll/index.vue`组件测试的一个总结报告，如下：
![测试覆盖率](../images/test/vue-test3.png)

* `index.vue.html`：此处是对`scroll/index.vue`组件测试的一个详细描述，其中对于没有覆盖到的代码进行不同颜色的标识，如下：
![测试覆盖率](../images/test/vue-test4.png)


## 测试组件渲染输出
### 组件挂载
对于不包含子组件的组件来说，使用`shallowMount`和`mount`对组件的效果是一样的。二者的区别在于，`shallowMount`只渲染组件本身，但会保留子组件在组件中的存根。

区别这两种方法的目的在于，当我们只想对某个孤立的组件进行测试的时候，一方面可以避免其子组件的影响，另一方面对于包含许多子组件的组件来说，完全渲染子组件会导致组件的渲染树过大，这可能会影响到我们的测试速度。

在组件挂载后，我们可以通过`wrapper.vm`访问到组件的实例，通过`wrapper.vm`进而可以访问到组件所有的`props`、`data`、`methods`等等。

**注意：** 在我们使用`mount`或者`shallowMount`的时候，我们可以期望组件响应几乎所有的`Vue`生命周期函数，但除非手动调用`wrapper.destory()`函数，否则组件的`beforeDestroy()`和`destroyed()`不会被触发。
```js
import { shallowMount, mount } from '@vue/test-utils'
import HelloWorld from '@/components/HelloWorld.vue'

describe('HelloWorld.vue', () => {
  it('test shallowMount', () => {
    const wrapper = shallowMount(HelloWorld)
    // 判断组件是否挂载
    expect(wrapper.exists()).toBe(true)
    
    // 访问vm实例
    console.log(wrapper.vm)
  })
  it('test mount', () => {
    const wrapper = mount(HelloWorld)
    // 判断组件是否挂载
    expect(wrapper.exists()).toBe(true)
  })
})
```
### 渲染文本测试
在组件挂载后，返回的包裹器有一个`wrapper.text()`方法，他返回组件渲染后的文本内容。

假设有如下组件：
```vue
<template>
 <div>{{msg}}</div>
</template>
<script>
export default {
  data () {
    return {
      msg: 'Hello, Vue and Jest...'
    }
  }
}
</script>
```
那么我们就可以撰写如下测试用例：
```js
import { shallowMount } from '@vue/test-utils'
import HelloWorld from '@/components/HelloWorld.vue'

describe('HelloWorld.vue', () => {
  it('test text', () => {
    const msg = 'Hello, Vue and Jest...'
    const wrapper = shallowMount(HelloWorld)
    // 更推荐具有扩展性的toContain匹配器而不是toBe
    expect(wrapper.text()).toBe(msg)       // 严格相等
    expect(wrapper.text()).toContain(msg)  // 是否包含
  })
})
```
### 渲染HTML结构测试
在组件挂载后，返回的包裹器有一个`wrapper.html()`方法，他返回组件渲染后的DOM结构。

对`HelloWorld.vue`组件做如下改动：
```vue
<template>
  <div>
    <span class="item">item</span>
    {{msg}}
  </div>
</template>
<script>

export default {
  data () {
    return {
      msg: 'Hello, Vue and Jest...'
    }
  }
}
</script>
```
那么我们就可以撰写如下测试用例：
```js
import { shallowMount } from '@vue/test-utils'
import HelloWorld from '@/components/HelloWorld.vue'

describe('HelloWorld.vue', () => {
  it('test html', () => {
    const wrapper = shallowMount(HelloWorld)
    expect(wrapper.html()).toContain('<span class="item">item</span>')
  })
})
```
### DOM属性测试和Class测试
在组件挂载后，返回的包裹器有一个`wrapper.attributes()`方法，他返回组件渲染后的DOM属性对象，`attributes()`方法如果提供了属性名参数，则直接返回此属性的值，否则返回全部属性的对象，`wrapper.classes()`方法类似。

依然以以上`HelloWorld.vue`组件为例，如果我们要测试`span`标签是否有`.item`样式，是否有`id`，可以进行如下测试：
```js
import { shallowMount } from '@vue/test-utils'
import HelloWorld from '@/components/HelloWorld.vue'

describe('HelloWorld.vue', () => {
  it('test attribute and class', () => {
    const wrapper = shallowMount(HelloWorld)
    // 查找第一个span标签
    const dom = wrapper.find('span')
    expect(dom.classes()).toContain('item')
    expect(dom.attributes().id).toBeFalsy()
  })
})
```
### Props测试
在组件挂载后，返回的包裹器有一个`wrapper.props()`方法，他返回组件实例的所有`props`，`props()`方法如果提供了参数，则直接返回此参数的值，否则返回全部。

我们对`HelloWorld.vue`组件做进一步的调整：
```vue
<template>
  <div>
    <span class="item">item</span>
    {{msg}}
    <span>{{name}}</span>
    <span>{{age}}</span>
  </div>
</template>
<script>

export default {
  props: ['name', 'age'],
  data () {
    return {
      msg: 'Hello, Vue and Jest...'
    }
  }
}
</script>
```

随后我们撰写如下测试用例：
```js
import { shallowMount } from '@vue/test-utils'
import HelloWorld from '@/components/HelloWorld.vue'

describe('HelloWorld.vue', () => {
  it('test props', () => {
    const wrapper = shallowMount(HelloWorld, {
      propsData: {
        name: 'AAA',
        age: 23
      }
    })
    expect(wrapper.props('name')).toBe('AAA')
    expect(wrapper.props().age).toBe(23)
  })
})

```
### Style测试
返回的包裹器中包含一个`element`属性，它是对当前`DOM`节点的应用，可以使用`element.style`访问该`DOM`节点的**内联样式**。

假设我们对`HelloWorld.vue`做如下调整：
```vue
<template>
  <div class="hello">
    <h1 style="width: 100px;height: 50px;">{{ msg }}</h1>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  }
}
</script>
```

基于以上组件，我们可以撰写如下测试用例:
```js
import { shallowMount } from '@vue/test-utils'
import HelloWorld from '@/components/HelloWorld.vue'

describe('HelloWorld.vue', () => {
  it('test style', () => {
    const wrapper = shallowMount(HelloWorld)
    const style = wrapper.find('h1').element.style
    expect(style.width).toBe('100px')
    expect(style.height).toBe('50px')
  })
})

```



## 测试组件方法
测试一个组件的自有方法的方式很简单，但实际上一个方法通常是具有依赖的。依赖是指：在被测代码单元控制之外的任何代码，依赖有很多种存在形式，例如：浏览器方法、被导入的模块和被注入的`Vue`示例属性。显而易见，要测试这些具有依赖的方法，无疑会引入一个更复杂的环境，因此我们要很小心的去处理。
### 私有和公共方法
对于一个组件而言，绝大部分可能是私有方法，私有方法指的是只会在组件内部使用的方法，与私有方法相对来说有一个公共方法，公共方法会被外部调用。

测试规则：
* 私有方法：私有方法一般只会在组件内部进行调用，它是组件内实现细节的，通常而言可以不用为其撰写测试用例，但也不是绝对的。
* 公共方法：公共方法会被外部组件进行调用，因此需要为公共方法撰写测试用例。

假设我们有如下`loading.vue`组件：
```vue
<template>
  <div v-show="showLoading" class="loading-box">
    {{loadingText}}
  </div>
</template>

<script>
export default {
  data () {
    return {
      loadingText: '',
      showLoading: false
    }
  },
  methods: {
    show () {
      this.showLoading = true
      this.getLoadingText()
    },
    hide () {
      this.showLoading = false
      this.getLoadingText()
    },
    getLoadingText () {
      this.loadingText = this.showLoading ?  `loading show text` : ''
    }
  }
}
</script>
```

组件方法分析:
* 私有方法：`getLoadingText()`，我们不需要为其撰写测试用例。
* 公共方法：`show()`、`hide()`，我们需要为其撰写测试用例。

那么根据以上规则，我们可以撰写一下测试用例：
```js
import { shallowMount } from '@vue/test-utils'
import Loading from '@/components/loading.vue'

describe('loading.vue', () => {
  let wrapper
  beforeEach(() => {
    wrapper = shallowMount(Loading)
  })
  it('show func', async () => {
    expect(wrapper.vm.loadingText).toBe('')
    expect(wrapper.vm.showLoading).toBe(false)
    expect(wrapper.isVisible()).toBe(false)

    wrapper.vm.show()
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.showLoading).toBe(true)
    expect(wrapper.isVisible()).toBe(true)
  })

  it('hide func', async () => {
    wrapper.setData({
      showLoading: true
    })
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.showLoading).toBe(true)
    expect(wrapper.isVisible()).toBe(true)

    wrapper.vm.hide()
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.showLoading).toBe(false)
    expect(wrapper.isVisible()).toBe(false)
  })
})
```

测试代码分析：
* `beforeEach()`：它是`Jest`的钩子函数，会在执行每一个测试用例之前调用，在这个钩子函数中我们重新挂载组件，避免多个测试用例互相影响。
* `async/await`：因为我们调用了公共方法，它修改了组件的数据，进而会触发`DOM`更新，因此我们需要调用组件的`$nextTick()`方法，以确保我们获取到了正确`DOM`的状态。
* `isVisible()`：判断一个`DOM`元素是否可见，在`loading`组件中，因为我们使用了`v-show`指令，所以使用`isVisible()`更加语义化一些，我们可以也可以使用`exists()`和`v-if`指令来代替。
* `setData()`：手动修改组件中`data`的值，用法与`Vue.set()`类似。不过需要注意的时，`setData()`方法是异步的，需要配合`$nextTick()`一起使用。
### 测试定时器函数
#### 使用假定时器函数
在`JavaScript`中定时器函数有`setTimeout`和`setInterval`，如果我们不对定时器函数做处理的话，当一个组件有一个延时`1000ms`的`setTimeout`时，则意味着我们测试程序必须等待`1000ms`，如果系统中存在很多个`setTimeout`函数，那么对于以速度、高效率的单元测试来说无疑是一场灾难。

在不减慢测试速度的情况下测试定时器函数，看起来唯一的办法就是让异步的定时器替换为同步的定时器函数，如下：
```js
setTimeout = () => { console.log('replace setTimeout') }
```

我们可以使用`Jest`库提供的`jest.useFakeTimers()`，当这个方法被调用时`Jest`提供的假定时器会替换全局定时器函数来工作，然后我们可以使用`jest.runTimersToTime()`来推进时间。

假设我们有如下组件：
```vue
<template>
  <div class="hello">
    {{timeText}}<br/>
    {{percent}}
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      percent: 0,
      timeText: ''
    }
  },
  methods: {
    start () {
      this.percent = 0
      this.timer = setInterval(() => {
        this.percent++
        if (this.percent >= 100) {
          this.finish()
        }
      }, 100)
    },
    finish () {
      this.percent = 100
      clearInterval(this.timer)
    }
  },
  mounted () {
    setTimeout(() => {
      this.timeText = 'setTimeout text'
    }, 1000)
  }
}
</script>
```

那么我们可以撰写如下测试用例：
```js
import { shallowMount } from '@vue/test-utils'
import HelloWorld from '@/components/HelloWorld.vue'

describe('HelloWorld.vue', () => {
  let wrapper
  beforeEach(() => {
    jest.useFakeTimers()
    wrapper = shallowMount(HelloWorld)
  })
  it('test setTimeout async timer', () => {
    expect(wrapper.vm.timeText).toBe('')
    jest.runTimersToTime(1000)
    expect(wrapper.vm.timeText).toBe('setTimeout text')
  })
  it('test setInterval async timer', () => {
    expect(wrapper.vm.percent).toBe(0)
    wrapper.vm.start()
    jest.runTimersToTime(100)
    expect(wrapper.vm.percent).toBe(1)
    jest.runTimersToTime(900)
    expect(wrapper.vm.percent).toBe(10)
    jest.runTimersToTime(2000)
    expect(wrapper.vm.percent).toBe(30)
  })
})
```

测试代码分析：
* `beforeEach`：因为我们在两个测试用例中都要使用`Jest`提供的假定时器函数，因此我们可以在`beforeEach`钩子函数中来使用。同样的道理，我们在`beforeEach`钩子函数中重新挂载组件，避免多个测试用例互相影响。
* `jest.runTimersToTime()`：意味着推进时间，在第二个用例中：当第一次推进时间`100ms`时，`percent`值为1；当第二次推进时间`900ms`时，此时算上第一次推进`100ms`，一共`1000ms`，因此`percent`值为10。
#### 使用spy测试
当我们运行以上测试用例会发现测试用例已经全部测试通过了，但此时我们不能被暂时的胜利冲昏头脑，我们还需要测试`clearInterval()`是否成功执行，以确保我们没有写一个无限运行的定时器。

在发现以上问题后，我们需要解决以下几个问题：
* 如何测试`clearInterval()`函数被执行了。
* 如何测试`clearInterval()`携带的参数。

要解决以上第一个问题，我们需要使用`Jest`提供的`jest.spyOn()`函数，然后对`window.clearInterval()`进行间谍伪造，如下：
```js
jest.spyOn(window, 'clearInterval')
```

要解决第二个问题，我们可以使用`Jest`提供的`mockReturnValue`函数来模拟任何我们想要的返回值，如下：
```js
setInterval.mockReturnValue(996)
```

在解决完以上两个问题后，我们新增一个测试用例，如下：
```js
it('clearInterval success when percent >= 100', () => {
  jest.spyOn(window, 'clearInterval')
  setInterval.mockReturnValue(996)
  wrapper.vm.start()
  wrapper.vm.finish()
  expect(wrapper.vm.percent).toBe(100)
  expect(window.clearInterval).toHaveBeenCalledWith(996)
})
```

测试代码分析：当我们的测试代码使用了我们不能控制的`API`时，我们可以使用`spy`来伪装，随后判断我们伪装的`API`是否被调用。
### 模拟代码
在`Vue`开发中，为`Vue`实例添加一些属性或者方法是一种常见的方式，例如：
```js
import { Message } from 'element-ui'
Vue.prototype.$message = Message

this.$message.success('保存成功')
```

那么我们如何为这些实例属性添加单元测试呢？答案是`mocks`，它可以为`Vue`实例提供额外的属性。假如我们有如下`message.vue`组件：
```vue
<template>
  <div>
    <button id="success" @click="handleSuccessClick">成功</button>
    <button id="warning" @click="handleWarningClick">警告</button>
    <button id="error" @click="handleErrorClick">错误</button>
    <button id="info" @click="handleInfoClick">消息</button>
  </div>
</template>

<script>
export default {
  methods: {
    handleSuccessClick () {
      this.$message.success('成功')
    },
    handleWarningClick () {
      this.$message.warning('警告')
    },
    handleErrorClick () {
      this.$message.error('错误')
    },
    handleInfoClick () {
      this.$message.info('消息')
    }
  }
}
</script>
```

由于我们就是要`mock`来自第三方的插件，因此我们在测试用例中并不需要安装`element-ui`，所以我们可撰写如下测试用例：
```js
import { shallowMount } from '@vue/test-utils'
import Message from '@/components/message.vue'

describe('message.vue', () => {
  it('add mocks', () => {
    const message = {
      success: jest.fn(),
      warning: jest.fn(),
      error: jest.fn(),
      info: jest.fn()
    }
    const wrapper = shallowMount(Message, {
      mocks: {
        $message: message
      }
    })
    const successBtn = wrapper.find('#success')
    const warningBtn = wrapper.find('#warning')
    const errorBtn = wrapper.find('#error')
    const infoBtn = wrapper.find('#info')

    successBtn.trigger('click')
    expect(message.success).toHaveBeenCalledTimes(1)

    warningBtn.trigger('click')
    expect(message.warning).toHaveBeenCalledTimes(1)

    errorBtn.trigger('click')
    expect(message.error).toHaveBeenCalledTimes(1)

    infoBtn.trigger('click')
    expect(message.info).toHaveBeenCalledTimes(1)
  })
})
```
### 模拟模块依赖
在一个组件中，我们无法将其单独的隔离开进行测试，因为组件往往有一些被导入的模块，而这些模块就成为了这个模块的依赖。在大多数情况下，在单元测试中有模块依赖是一件好事，但也有一些模块存在副作用。例如：发送`HTTP`请求，我们不可能在单元测试用例中为组件真正的发送`HTTP`请求，这是不合理的，因此我们需要有一种模拟模块依赖的手段来解决这种问题。

 加入我们有以下`HelloWorld.vue`组件
```vue
<template>
  <ul>
    <li
      v-for="(item, index) in lessonList"
      :key="index"
      class="lesson-item"
    >{{item.title}}</li>
  </ul>
</template>

<script>
import { getLessonList } from '@/api/api.js'
export default {
  data () {
    return {
      lessonList: []
    }
  },
  methods: {
    getLessonData () {
      getLessonList().then(res => {
        const { status, data } = res
        if (status === 200) {
          this.lessonList = data.data
        }
      })
    }
  },
  mounted () {
    this.getLessonData()
  }
}
</script>
```

新建`src/api/api.js`文件，并添加如下代码：
```js
import axios from 'axios'

export function getLessonList () {
  return axios.get('http://www.dell-lee.com/react/api/list.json')
}
```

问题分析：
* 第一步：我们要解决`getLessonList`方法返回假数据问题。
* 第二步：我们要解决`HelloWorld.vue`组件正确渲染我们的假数据问题。

对于第一个问题，我们需要在新建`src/api/__mocks__/api.js`文件夹，注意：
* `__mocks__`是固定写法，它能被`Jest`进行识别。
* `__mocks__/api.js`，其中`__mocks__`目录下的文件名要和我们模拟的模块文件名相同。

```js
export const getLessonList = jest.fn(() => {
  const lessonResult = {
    success: true,
    data: [
      { id: 1, title: '深入理解ES6' },
      { id: 2, title: 'JavaScript高级程序设计' },
      { id: 3, title: 'CSS揭秘' },
      { id: 4, title: '深入浅出Vue.js' }
    ]
  }
  return Promise.resolve(lessonResult)
})

```

## 挂载选项和Mock
### 挂载slot
### mock数据
### 挂载其它选项



## 添加第三方应用
### 添加Vuex
### 添加Vue-Router
### 添加Element-UI




## 测试事件
### 原生DOM事件
### 自定义事件



## 测试Vuex
### 测试Mutations
### 测试Getters
### 测试Actions
### 测试Vuex Store实例
### 测试组件中的Vuex



## 工厂函数组件测试
### 了解工厂函数
### 创建store工厂函数
### 覆盖工厂函数中的默认选项
### 创建包装器工厂函数



## 测试Vue-Router
### 测试$route
### 测试$router
### 测试RouterLink
### Vue-Router和Vuex配合使用


## 测试Mixins和Filters
### 局部mixin
### 全局mixin
### 过滤器测试


## 快照测试
### 普通组件快照
### 静态组件快照
### 动态组件快照


## 测试用例调试
### VsCode编辑器调试
### Chrome浏览器调试


## 业务组件测试示例
### Pagination组件测试
