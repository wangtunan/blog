---
sidebar: auto
---

# Vue 应用测试

本篇文章由阅读《Vue.js 应用测试》书籍、学习《Vue Test Utils》官网知识以及实际工作经验总结而来，阅读书籍请支持正版。

## 测试介绍

前端应用程序主要编写三种测试类型：**单元测试**、**快照测试**、**端到端测试**。本篇文章着重介绍`Vue`组件的**单元测试**和**快照测试**，对于**端到端测试**请自行搜索相关内容。

对于不同类型的测试，我们应该正确对待它们，并能够根据它们各自的优缺点进行比例混合。在一个测试金字塔中，单元测试需要占大部分比例，因为它们在开发应用程序时可以提供快速的反馈。快照测试的覆盖范围比较广，因此我们并不需要太多的快照测试。以`Vue`组件为例，一个`Vue`组件可能只需要一个到三个的快照测试用例。端到端测试用例虽然对应用程序非常有用，但由于它可能很慢而且会不稳定，因此端到端测试比例应该是最少的。

代码覆盖率是度量一个应用程序或者库质量的一个重要指标，通常而言`0%`表示未进行任何代码测试，`100%`意味着在测试用例执行时，每一行代码都被执行过了。`100%`覆盖率可能同`0%`覆盖率一样可怕，因为这可能会给你一种错觉：它会让你以为你的程序永远不会出错，然而实际情况很可能是你对场景进行了错误的判断，进而得出了错误的结论。例如：当你测试一个`API`接口时，你假定该`API`接口永远都不会返回错误信息，然而当`API`接口在正式环境中，它确实返回了错误信息。

对一个完整的应用程序而言，你可能会花费少量的时间就能让测试覆盖率达到`80%`~`90%`，然而剩下的`10%`~`20%`也可能会让你花费数倍的时间来完成，甚至根本达不到。就像你很轻松就能拧干毛巾里面大部分的水，然而拧干剩下的一小部分依然是一件十分困难的事情。

在`Vue`应用中，对于`UI`组件来说，我们并不推荐一味的追求行级覆盖率，因为过度注重覆盖率可能会严重导致我们过分关注组件内部的实现细节，从而导致过多的繁琐测试。取而代之的是，我们希望把组件测试撰写为断言组件的公共接口，并在一个黑盒中去处理它，一个简单的`UI`组件测试用例将断言一些输入(**用户交互**或**Prop 输入**等)提供给组件之后，并期望组件得到预期的结果(**渲染结果**或**响应事件**等)。

### 端到端测试

端到端测试是最直观且容易理解的测试类型，在前端应用程序中，端到端测试可以从用户的视角，通过浏览器自动检查应用程序是否正常工作。

一个端到端测试的测试案例如下：

```js
function testCalc(browser) {
  browser
    .url("http://localhost:8080")
    .click("#button")
    .click("#button-plus")
    .click("#button")
    .assert.containsText("#result", "2")
    .end()
}
```

我们可以从以上一个小小的案例进行总结：

**优点**：

- 编写测试用例非常节省时间。
- 可以随意根据自己的需求进行调整。

**缺点**：

- 测试用例运行可能不是很快：启动浏览器会花费几秒、不同网站不同速度又会存在不同的耗时。
- 端到端的调试工作会很困难：在上面的例子中，在本地环境上面进行调试尚且是一个很糟糕的过程，如果测试是在持续集成的服务器上失败那么更可以说是一场灾难。
- 端到端可能成为`flaky`测试：`flaky`测试表示即使被测应用程序正常运行，测试仍然频繁失败，其中失败的原因取决于多种因素：代码执行时间过长或 API 暂时失效。

### 单元测试

单元测试是对应用程序最小的部分运行测试的过程。通常来说，测试的单元是一个函数，但在`Vue`应用程序中，组件也算是一个被测单元。

一个单元测试的测试案例如下:

```js
// math.js
export function add(a, b) {
  return a + b
}

// math.spec.js
import { add } from "math.js"
describe("math.js", () => {
  it("add func", () => {
    expect(add(1, 2)).toBe(3)
  })
})
```

我们可以对单元测试进行总结：

**优点：**

- 运行速度快：不同于端到端测试，单元测试用例运行速度很快。
- 友好的应用辅助效果：当团队出现新人时，他可以从单元测试中迅速了解项目需求。

**缺点：**

- 重构代码困难：如果要将一个已经具备单元测试的复杂功能拆分，需要在更改代码的同时更改对应的单元测试。
- 无法整体测试：由于单元测试只能针对程序的各个单元分开进行测试，各个单元测试通过并不意味着当他们组合起来就一定没有问题。

### 快照测试

快照测试会给运行中的应用程序拍一张"照片"，并将其与之前保存的"照片"进行比较，如果二者不相同则测试失败。
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
|   |-- .gitignore    # git配置
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
import { shallowMount } from "@vue/test-utils"
import HelloWorld from "@/components/HelloWorld.vue"

describe("HelloWorld.vue", () => {
  it("renders props.msg when passed", () => {
    const msg = "new message"
    const wrapper = shallowMount(HelloWorld, {
      propsData: { msg }
    })
    expect(wrapper.text()).toMatch(msg)
  })
})
```

### 现有 Vue 项目中添加 Jest 测试

如果你是在现有 Vue 项目需要添加`Jest`自动化测试框架，可以在该项目中运行如下命令：

```sh
# 请确保你的Vue-Cli安装了最新版本
$ vue add unit-jest
```

此条命令执行以后，会自动帮助我们安装`@vue/cli-plugin-unit-jest`，同时会帮助我们进行`jest`测试相关的配置，并且它也会帮我们在根目录下新建`tests`文件夹，包含测试用例`example.spec.js`：
::: tip
可以使用`npm run test:unit`来运行测试用例。
:::

```js
import { shallowMount } from "@vue/test-utils"
import HelloWorld from "@/components/HelloWorld.vue"

describe("HelloWorld.vue", () => {
  it("renders props.msg when passed", () => {
    const msg = "new message"
    const wrapper = shallowMount(HelloWorld, {
      propsData: { msg }
    })
    expect(wrapper.text()).toMatch(msg)
  })
})
```

以下测试案例均依据以上第二或第三种方式进行测试环境配置。

### VsCode 编辑器插件

对于使用`VsCode`编辑器，可以通过安装`Jest`插件，它可以在我们不运行`npm run test:unit`命令的时候就提示测试用例是否通过。
![jest插件](../images/test/vue-test1.png)

### 测试覆盖率和测试报告

在根目录下的`jest.config.js`中，我们进行如下配置：

```js
module.exports = {
  preset: "@vue/cli-plugin-unit-jest/presets/typescript-and-babel",
  snapshotSerializers: ["jest-serializer-vue"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1"
  },
  testMatch: [
    "**/tests/unit/**/*.spec.(js|jsx|ts|tsx)|**/__tests__/*.(js|jsx|ts|tsx)"
  ],
  collectCoverage: true,
  coverageDirectory: "<rootDir>/tests/unit/coverage",
  collectCoverageFrom: [
    "src/components/**/*.vue",
    "src/utils/**/*.ts",
    "src/store/modules/*.ts",
    "!src/utils/axios.ts",
    "!src/utils/notify.ts"
  ]
}
```

对以上配置的解释如下：

- `snapshotSerializers`: `Vue`组件进行`Jest`快照序列化的工具配置。
- `moduleNameMapper`：模块别名配置。
- `testMatch`：测试文件查找规则，可以是统一放在`src/tests`目录下，也可以就近放在`__tests__`目录下。
- `collectCoverage`：是否进行测试覆盖率收集。
- `coverageDirectory`：测试报告存放位置。
- `collectCoverageFrom`：测试哪些文件和不测试哪些文件，你可以根据你的团队或者个人偏好进行设置。

在完善以上配置后，你可以在终端运行`npm run test:unit`命令，随后你将得到类似下面这样的测试报告：

![测试覆盖率](../images/test/vue-test2.png)

在以上测试报告中，我们明显可以看到有一些没有覆盖到的代码，这时我们可以在`src/tests/units/coverage/lcov-report`目录下找到我们对应的测试文件，随后点开。这里以`base/scroll/index.vue`为例，它有如下两个文件：

- `index.html`: 此处是对`scroll/index.vue`组件测试的一个总结报告，如下：
  ![测试覆盖率](../images/test/vue-test3.png)

- `index.vue.html`：此处是对`scroll/index.vue`组件测试的一个详细描述，其中对于没有覆盖到的代码进行不同颜色的标识，如下：
  ![测试覆盖率](../images/test/vue-test4.png)

## 测试组件渲染输出

### 组件挂载

对于不包含子组件的组件来说，使用`shallowMount`和`mount`对组件的效果是一样的。二者的区别在于，`shallowMount`只渲染组件本身，但会保留子组件在组件中的存根。

区别这两种方法的目的在于，当我们只想对某个孤立的组件进行测试的时候，一方面可以避免其子组件的影响，另一方面对于包含许多子组件的组件来说，完全渲染子组件会导致组件的渲染树过大，这可能会影响到我们的测试速度。

在组件挂载后，我们可以通过`wrapper.vm`访问到组件的实例，通过`wrapper.vm`进而可以访问到组件所有的`props`、`data`和`methods`等等。

**注意：** 在我们使用`mount`或者`shallowMount`的时候，我们可以期望组件响应几乎所有的`Vue`生命周期函数，但除非手动调用`wrapper.destory()`函数，否则组件的`beforeDestroy()`和`destroyed()`不会被触发。

```js
import { shallowMount, mount } from "@vue/test-utils"
import HelloWorld from "@/components/HelloWorld.vue"

describe("HelloWorld.vue", () => {
  it("test shallowMount", () => {
    const wrapper = shallowMount(HelloWorld)
    // 判断组件是否挂载
    expect(wrapper.exists()).toBe(true)

    // 访问vm实例
    console.log(wrapper.vm)
  })
  it("test mount", () => {
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
  <div>{{ msg }}</div>
</template>
<script>
export default {
  data() {
    return {
      msg: "Hello, Vue and Jest..."
    }
  }
}
</script>
```

那么我们就可以撰写如下测试用例：

```js
import { shallowMount } from "@vue/test-utils"
import HelloWorld from "@/components/HelloWorld.vue"

describe("HelloWorld.vue", () => {
  it("test text", () => {
    const msg = "Hello, Vue and Jest..."
    const wrapper = shallowMount(HelloWorld)
    // 更推荐具有扩展性的toContain匹配器而不是toBe
    expect(wrapper.text()).toBe(msg) // 严格相等
    expect(wrapper.text()).toContain(msg) // 是否包含
  })
})
```

### 渲染 HTML 结构测试

在组件挂载后，返回的包裹器有一个`wrapper.html()`方法，他返回组件渲染后的 DOM 结构。

对`HelloWorld.vue`组件做如下改动：

```vue
<template>
  <div>
    <span class="item">item</span>
    {{ msg }}
  </div>
</template>
<script>
export default {
  data() {
    return {
      msg: "Hello, Vue and Jest..."
    }
  }
}
</script>
```

那么我们就可以撰写如下测试用例：

```js
import { shallowMount } from "@vue/test-utils"
import HelloWorld from "@/components/HelloWorld.vue"

describe("HelloWorld.vue", () => {
  it("test html", () => {
    const wrapper = shallowMount(HelloWorld)
    expect(wrapper.html()).toContain('<span class="item">item</span>')
  })
})
```

### DOM 属性测试和 Class 测试

在组件挂载后，返回的包裹器有一个`wrapper.attributes()`方法，他返回组件渲染后的 DOM 属性对象，`attributes()`方法如果提供了属性名参数，则直接返回此属性的值，否则返回全部属性的对象，`wrapper.classes()`方法类似。

依然以以上`HelloWorld.vue`组件为例，如果我们要测试`span`标签是否有`.item`样式，是否有`id`，可以进行如下测试：

```js
import { shallowMount } from "@vue/test-utils"
import HelloWorld from "@/components/HelloWorld.vue"

describe("HelloWorld.vue", () => {
  it("test attribute and class", () => {
    const wrapper = shallowMount(HelloWorld)
    // 查找第一个span标签
    const dom = wrapper.find("span")
    expect(dom.classes()).toContain("item")
    expect(dom.attributes().id).toBeFalsy()
  })
})
```

### Props 测试

在组件挂载后，返回的包裹器有一个`wrapper.props()`方法，他返回组件实例的所有`props`，`props()`方法如果提供了参数，则直接返回此参数的值，否则返回全部。

我们对`HelloWorld.vue`组件做进一步的调整：

```vue
<template>
  <div>
    <span class="item">item</span>
    {{ msg }}
    <span>{{ name }}</span>
    <span>{{ age }}</span>
  </div>
</template>
<script>
export default {
  props: ["name", "age"],
  data() {
    return {
      msg: "Hello, Vue and Jest..."
    }
  }
}
</script>
```

随后我们撰写如下测试用例：

```js
import { shallowMount } from "@vue/test-utils"
import HelloWorld from "@/components/HelloWorld.vue"

describe("HelloWorld.vue", () => {
  it("test props", () => {
    const wrapper = shallowMount(HelloWorld, {
      propsData: {
        name: "AAA",
        age: 23
      }
    })
    expect(wrapper.props("name")).toBe("AAA")
    expect(wrapper.props().age).toBe(23)
  })
})
```

### Style 测试

返回的包裹器中包含一个`element`属性，它是对当前`DOM`节点的引用，可以使用`element.style`访问该`DOM`节点的**内联样式**。

假设我们对`HelloWorld.vue`做如下调整：

```vue
<template>
  <div class="hello">
    <h1 style="width: 100px;height: 50px">{{ msg }}</h1>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  props: {
    msg: String
  }
}
</script>
```

基于以上组件，我们可以撰写如下测试用例:

```js
import { shallowMount } from "@vue/test-utils"
import HelloWorld from "@/components/HelloWorld.vue"

describe("HelloWorld.vue", () => {
  it("test style", () => {
    const wrapper = shallowMount(HelloWorld)
    const style = wrapper.find("h1").element.style
    expect(style.width).toBe("100px")
    expect(style.height).toBe("50px")
  })
})
```

## 测试组件方法

测试一个组件的自有方法的方式很简单，但实际上一个方法通常是具有依赖的。依赖是指：在被测代码单元控制之外的任何代码，依赖有很多种存在形式，例如：浏览器方法、被导入的模块和被注入的`Vue`实例属性。显而易见，要测试这些具有依赖的方法，无疑会引入一个更复杂的环境，因此我们要很小心的去处理。

### 私有方法和公共方法

对于一个组件而言，绝大部分可能是私有方法，私有方法指的是只会在组件内部使用的方法，与私有方法相对来说有一个公共方法，公共方法会被外部调用。

测试规则：

- 私有方法：私有方法一般只会在组件内部进行调用，它是组件内实现细节的，通常而言可以不用为其撰写测试用例，但也不是绝对的。
- 公共方法：公共方法会被外部组件进行调用，因此需要为公共方法撰写测试用例。

假设我们有如下`loading.vue`组件：

```vue
<template>
  <div v-show="showLoading" class="loading-box">
    {{ loadingText }}
  </div>
</template>

<script>
export default {
  data() {
    return {
      loadingText: "",
      showLoading: false
    }
  },
  methods: {
    show() {
      this.showLoading = true
      this.getLoadingText()
    },
    hide() {
      this.showLoading = false
      this.getLoadingText()
    },
    getLoadingText() {
      this.loadingText = this.showLoading ? `loading show text` : ""
    }
  }
}
</script>
```

组件方法分析:

- 私有方法：`getLoadingText()`，我们不需要为其撰写测试用例。
- 公共方法：`show()`、`hide()`，我们需要为其撰写测试用例。

那么根据以上规则，我们可以撰写一下测试用例：

```js
import { shallowMount } from "@vue/test-utils"
import Loading from "@/components/loading.vue"

describe("loading.vue", () => {
  let wrapper
  beforeEach(() => {
    wrapper = shallowMount(Loading)
  })
  it("show func", async () => {
    expect(wrapper.vm.loadingText).toBe("")
    expect(wrapper.vm.showLoading).toBe(false)
    expect(wrapper.isVisible()).toBe(false)

    wrapper.vm.show()
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.showLoading).toBe(true)
    expect(wrapper.isVisible()).toBe(true)
  })

  it("hide func", async () => {
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

- `beforeEach()`：它是`Jest`的钩子函数，会在执行每一个测试用例之前调用，在这个钩子函数中我们重新挂载组件，避免多个测试用例互相影响。
- `async/await`：因为我们调用了公共方法，它修改了组件的数据，进而会触发`DOM`更新，因此我们需要调用组件的`$nextTick()`方法，以确保我们获取到了正确`DOM`的状态。
- `isVisible()`：判断一个`DOM`元素是否可见，在`loading`组件中，因为我们使用了`v-show`指令，所以使用`isVisible()`更加语义化一些，我们也可以使用`exists()`和`v-if`指令来代替。
- `setData()`：手动修改组件中`data`的值，用法与`Vue.set()`类似。不过需要注意的时，`setData()`方法是异步的，需要配合`$nextTick()`一起使用。

### 测试定时器函数

#### 使用假定时器函数

在`JavaScript`中定时器函数有`setTimeout`和`setInterval`，如果我们不对定时器函数做处理的话，当一个组件有一个延时`1000ms`的`setTimeout`时，则意味着我们测试程序必须等待`1000ms`，如果系统中存在很多个`setTimeout`函数，那么对于以速度、高效率的单元测试来说无疑是一场灾难。

在不减慢测试速度的情况下测试定时器函数，看起来唯一的办法就是让异步的定时器替换为同步的定时器函数，如下：

```js
setTimeout = () => {
  console.log("replace setTimeout")
}
```

我们可以使用`Jest`库提供的`jest.useFakeTimers()`，当这个方法被调用时`Jest`提供的假定时器会替换全局定时器函数来工作，然后我们可以使用`jest.runTimersToTime()`来推进时间。

假设我们有如下组件：

```vue
<template>
  <div class="hello">
    {{ timeText }}<br />
    {{ percent }}
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  data() {
    return {
      percent: 0,
      timeText: ""
    }
  },
  methods: {
    start() {
      this.percent = 0
      this.timer = setInterval(() => {
        this.percent++
        if (this.percent >= 100) {
          this.finish()
        }
      }, 100)
    },
    finish() {
      this.percent = 100
      clearInterval(this.timer)
    }
  },
  mounted() {
    setTimeout(() => {
      this.timeText = "setTimeout text"
    }, 1000)
  }
}
</script>
```

那么我们可以撰写如下测试用例：

```js
import { shallowMount } from "@vue/test-utils"
import HelloWorld from "@/components/HelloWorld.vue"

describe("HelloWorld.vue", () => {
  let wrapper
  beforeEach(() => {
    jest.useFakeTimers()
    wrapper = shallowMount(HelloWorld)
  })
  it("test setTimeout async timer", () => {
    expect(wrapper.vm.timeText).toBe("")
    jest.runTimersToTime(1000)
    expect(wrapper.vm.timeText).toBe("setTimeout text")
  })
  it("test setInterval async timer", () => {
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

- `beforeEach`：因为我们在两个测试用例中都要使用`Jest`提供的假定时器函数，因此我们可以在`beforeEach`钩子函数中来使用。同样的道理，我们在`beforeEach`钩子函数中重新挂载组件，避免多个测试用例互相影响。
- `jest.runTimersToTime()`：意味着推进时间，在第二个用例中：当第一次推进时间`100ms`时，`percent`值为 1；当第二次推进时间`900ms`时，此时算上第一次推进`100ms`，一共`1000ms`，因此`percent`值为 10。

#### 使用 spy 测试

当我们运行以上测试用例会发现测试用例已经全部测试通过了，但此时我们不能被暂时的胜利冲昏头脑，我们还需要测试`clearInterval()`是否成功执行，以确保我们没有写一个无限运行的定时器。

在发现以上问题后，我们需要解决以下几个问题：

- 如何测试`clearInterval()`函数被执行了。
- 如何测试`clearInterval()`携带的参数。

要解决以上第一个问题，我们需要使用`Jest`提供的`jest.spyOn()`函数，然后对`window.clearInterval()`进行间谍伪造，如下：

```js
jest.spyOn(window, "clearInterval")
```

要解决第二个问题，我们可以使用`Jest`提供的`mockReturnValue`函数来模拟任何我们想要的返回值，如下：

```js
setInterval.mockReturnValue(996)
```

在解决完以上两个问题后，我们新增一个测试用例，如下：

```js
it("clearInterval success when percent >= 100", () => {
  jest.spyOn(window, "clearInterval")
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
import { Message } from "element-ui"
Vue.prototype.$message = Message

this.$message.success("保存成功")
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
    handleSuccessClick() {
      this.$message.success("成功")
    },
    handleWarningClick() {
      this.$message.warning("警告")
    },
    handleErrorClick() {
      this.$message.error("错误")
    },
    handleInfoClick() {
      this.$message.info("消息")
    }
  }
}
</script>
```

由于我们就是要`mock`来自第三方的插件，因此我们在测试用例中并不需要安装`element-ui`，所以我们可撰写如下测试用例：

```js
import { shallowMount } from "@vue/test-utils"
import Message from "@/components/message.vue"

describe("message.vue", () => {
  it("add mocks", () => {
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
    const successBtn = wrapper.find("#success")
    const warningBtn = wrapper.find("#warning")
    const errorBtn = wrapper.find("#error")
    const infoBtn = wrapper.find("#info")

    successBtn.trigger("click")
    expect(message.success).toHaveBeenCalledTimes(1)

    warningBtn.trigger("click")
    expect(message.warning).toHaveBeenCalledTimes(1)

    errorBtn.trigger("click")
    expect(message.error).toHaveBeenCalledTimes(1)

    infoBtn.trigger("click")
    expect(message.info).toHaveBeenCalledTimes(1)
  })
})
```

### 模拟模块依赖

在一个组件中，我们无法将其单独的隔离开进行测试，因为组件往往有一些被导入的模块，而这些模块就成为了这个模块的依赖。在大多数情况下，在单元测试中有模块依赖是一件好事，但也有一些模块存在副作用。例如：发送`HTTP`请求，我们不可能在单元测试用例中为组件真正的发送`HTTP`请求，这是不合理的，因此我们需要有一种模拟模块依赖的手段来解决这种问题。

假如我们有以下`HelloWorld.vue`组件

```vue
<template>
  <ul>
    <li v-for="(item, index) in lessonList" :key="index" class="lesson-item">
      {{ item.title }}
    </li>
  </ul>
</template>

<script>
import { getLessonList } from "@/api/api.js"
export default {
  data() {
    return {
      lessonList: []
    }
  },
  methods: {
    getLessonData() {
      getLessonList().then((res) => {
        const { status, data } = res
        if (status === 200) {
          this.lessonList = data.data
        }
      })
    }
  },
  mounted() {
    this.getLessonData()
  }
}
</script>
```

新建`src/api/api.js`文件，并添加如下代码：

```js
import axios from "axios"

export function getLessonList() {
  return axios.get("http://www.dell-lee.com/react/api/list.json")
}
```

问题分析：

- 第一步：我们要解决`getLessonList`方法返回假数据问题。
- 第二步：我们要解决`HelloWorld.vue`组件正确渲染我们的假数据问题。

对于第一个问题，我们需要新建`src/api/__mocks__/api.js`文件夹，注意：

- `__mocks__`是固定写法，它能被`Jest`进行识别。
- `__mocks__/api.js`，其中`__mocks__`目录下的文件名要和我们模拟的模块文件名相同。

```js
export const getLessonList = jest.fn(() => {
  const lessonResult = {
    success: true,
    data: [
      { id: 1, title: "深入理解ES6" },
      { id: 2, title: "JavaScript高级程序设计" },
      { id: 3, title: "CSS揭秘" },
      { id: 4, title: "深入浅出Vue.js" }
    ]
  }
  return Promise.resolve(lessonResult)
})
```

第二个问题，我们可以使用`getLessonList.mockResolvedValueOnce()`方法来传入我们模拟的数据。再解决完以上几个问题后，我们可以撰写如下测试用例：

```js
import { shallowMount } from "@vue/test-utils"
import HelloWorld from "@/components/HelloWorld.vue"
import { getLessonList } from "../../src/api/api.js"
jest.mock("../../src/api/api.js")
describe("HelloWorld.vue", () => {
  const lessonResult = {
    success: true,
    data: [
      { id: 1, title: "深入理解ES6" },
      { id: 2, title: "JavaScript高级程序设计" },
      { id: 3, title: "CSS揭秘" },
      { id: 4, title: "深入浅出Vue.js" }
    ]
  }

  it("mock http modules", async () => {
    expect.assertions(1)
    const result = await getLessonList()
    expect(result).toEqual(lessonResult)
  })
  it("render mock http module result", async () => {
    const mockAxiosResult = {
      status: 200,
      data: lessonResult
    }
    getLessonList.mockResolvedValueOnce(mockAxiosResult)
    const wrapper = shallowMount(HelloWorld)
    await wrapper.vm.$nextTick()
    const lessonItems = wrapper.findAll(".lesson-item")
    const lessonList = lessonResult.data
    for (let i = 0 i < lessonItems.length i++) {
      const item = lessonItems.at(i)
      expect(item.text()).toBe(lessonList[i].title)
    }
  })
})
```

## 挂载选项和改变组件状态

在我们以上的测试用例中，我们已经尝试过在组件挂载的时候提供`propsData`或者`mocks`，我们还可以挂载以下常见的几种其它选项，如下：

- `data`：在挂载阶段提供的`data`中的属性，会被合并、覆盖到当前组件的`data`中。
- `slots`：如果被挂载的组件有插槽内容，那么可以在挂载阶段手动提供`slots`。
- `stubs`：如果被挂载的组件存在子组件，那么可以在挂载阶段手动提供子组件的存根，例如：`stubs: ['my-child', 'transition', 'router-view', 'router-link']`等。
- `localVue`：提供一个本地的`Vue`实例，防止污染全局的`Vue`，这在使用第三方插件：`Vue-Router`、`Vuex`和`element-ui`等非常适用。

### 挂载 Data

假如我们有如下组件：

```vue
<template>
  <div></div>
</template>

<script>
export default {
  data() {
    return {
      bar: "bar",
      foo: "foo"
    }
  }
}
</script>
```

现在我们在测试用例中通过挂载`data`，来测试组件：

```js
import { shallowMount } from "@vue/test-utils"
import HelloWorld from "@/components/HelloWorld.vue"
describe("HelloWorld.vue", () => {
  it("mount data", () => {
    const wrapper = shallowMount(HelloWorld, {
      data() {
        return {
          foo: "foo override",
          baz: "baz"
        }
      }
    })
    expect(wrapper.vm.bar).toBe("bar")
    expect(wrapper.vm.foo).toBe("foo override")
    expect(wrapper.vm.baz).toBe("baz")
  })
})
```

### 挂载 Slots

假如我们有如下组件：

```vue
<template>
  <div>
    <div class="header-slot">
      <slot name="header" />
    </div>
    <div class="default-slot">
      <slot />
    </div>
    <div class="footer-slot">
      <slot name="footer" />
    </div>
  </div>
</template>

<script>
export default {}
</script>
```

那么我们挂载对应的插槽，撰写如下测试用例：

```js
import { mount } from "@vue/test-utils"
import HelloWorld from "@/components/HelloWorld.vue"
describe("HelloWorld.vue", () => {
  it("mount data", () => {
    const headerSlot = {
      template: `<div>header slot</div>`
    }
    const defaultSlot = {
      template: `<div>default slot</div>`
    }
    const footerSlot = {
      template: `<div>footer slot</div>`
    }
    const wrapper = mount(HelloWorld, {
      slots: {
        default: defaultSlot,
        header: headerSlot,
        footer: footerSlot
      }
    })
    expect(wrapper.find(".header-slot").html()).toContain(headerSlot.template)
    expect(wrapper.find(".default-slot").html()).toContain(
      defaultSlot.template
    )
    expect(wrapper.find(".footer-slot").html()).toContain(footerSlot.template)
  })
})
```

### 挂载 Stubs

就像我们上面已经提到的那样，`stubs`可以用来存根子组件，包括：普通子组件、`transition`、`router-link`和`router-view`，它提供了我们用来覆盖全局或者局部注册组件的能力。

如果一个组件使用了`router-link`或者`router-view`，但我们又不想要在测试用例中安装`Vue-Router`，那么可以像下面这样进行存根：

```js
const wrapper = shallowMount(HelloWorld, {
  stubs: ["router-link", "router-view"]
})
```

### 挂载第三方应用

有时候我们在开发`Vue`应用的时候，会经常用到第三方插件，例如：`Vue-Router`、`Vuex`以及`element-ui`等等。那么，如何在一个测试用例中优雅的安装这些第三方应用呢？

可以使用`createLocalVue()`方法创建一个本地的`Vue`实例，用来替换全局的`Vue`，随后在挂载组件的时候传递这个本地`Vue`，如下：

```js
import { shallowMount, createLocalVue } from "@vue/test-utils"
import HelloWorld from "@/components/HelloWorld.vue"
import Vuex from "vuex"
import Router from "vue-router"
import ElementUI from "element-ui"
const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(Router)
localVue.use(ElementUI)

describe("HelloWorld.vue", () => {
  it("use localVue", () => {
    const wrapper = shallowMount(HelloWorld, {
      localVue
    })
  })
})
```

### 改变组件状态

在组件挂载后，可以使用如下几种`set`方法来改变组件中的数据。

- `setChecked`：设置`checkbox`或者`radio`元素的`checked`的值并更新`v-model`。
- `setSelected`：设置一个`option`元素并更新`v-model`。
- `setValue`：设置一个文本控件或`select`元素的值并更新`v-model`。
- `setProps`：设置包裹器的`vm`实例中`props`并更新。
- `setData`：设置包裹器中`vm`实例中的`data`并更新。

**注意**：由于`Vue`组件更新`DOM`是异步的，因此如果我们要测试组件更改数据后的`DOM`，我们应该使用`$nextTick()`。

假设我们有如下组件：

```vue
<template>
  <div>
    <input v-model="radio" type="radio" :value="true" />
    <select v-model="select">
      <option :value="1">选项一</option>
      <option :value="2">选项而</option>
    </select>
    <input v-model="txt" type="text" />
  </div>
</template>

<script>
export default {
  props: {
    msg: String
  },
  data() {
    return {
      foo: "",
      radio: false,
      select: "",
      txt: ""
    }
  }
}
</script>
```

随后，我们可以在组件挂载之后撰写如下测试用例来测试组件：

```js
import { shallowMount } from "@vue/test-utils"
import HelloWorld from "@/components/HelloWorld.vue"

describe("HelloWorld.vue", () => {
  it("change component data", () => {
    const wrapper = shallowMount(HelloWorld)
    const radioInput = wrapper.find('input[type="radio"]')
    const options = wrapper.find("select").findAll("option")
    const textInput = wrapper.find('input[type="text"]')
    radioInput.setChecked()
    options.at(1).setSelected()
    textInput.setValue("txt value")
    expect(wrapper.vm.radio).toBe(true)
    expect(wrapper.vm.select).toBe(2)
    expect(wrapper.vm.txt).toBe("txt value")

    wrapper.setProps({
      msg: "msg value"
    })
    expect(wrapper.vm.msg).toBe("msg value")

    wrapper.setData({
      foo: "foo value"
    })
    expect(wrapper.vm.foo).toBe("foo value")
  })
})
```

## 测试事件

在`Vue`应用程序中，我们主要会遇到两种类型的事件：**原生 DOM 事件**和**自定义 Vue 事件**

### 原生 DOM 事件

通常而言原生`DOM`事件主要作为单元测试的输入，常见的原生`DOM`事件有：单击一个元素触发`click`事件、光标悬浮在元素上会触发`mouseenter`事件、在键盘按下任意键会触发`keyup/keydown`事件以及提交一个表单会触发`submit`事件等等。

在`Vue-Test-Utils`中，每个包装器都有一个`trigger`方法，用于在包装元素上分发一个合成事件。所谓**合成事件**指的是在`JavaScript`中创建的事件，它的处理方式与浏览器分发事件的处理方式相同，区别在于原生事件通过`EventLoop`异步调用事件处理程序，而合成事件则是同步调用事件处理程序。

`trigger`方法可用于模拟几乎任何原生`DOM`事件，例如`click`、`keydown`或`mouseenter`等。假设我们有这样一个需求，点击元素一下实现数字自增：

```vue
<template>
  <div>
    {{ count }}
    <button @click="count++">自增</button>
  </div>
</template>

<script>
export default {
  props: {
    msg: String
  },
  data() {
    return {
      count: 0
    }
  }
}
</script>
```

那么我们可以在以上组件的基础上撰写测试`click`原生事件的单元测试：

```js
import { shallowMount } from "@vue/test-utils"
import HelloWorld from "@/components/HelloWorld.vue"
describe("HelloWorld.vue", () => {
  it("测试原生click事件", async () => {
    const wrapper = shallowMount(HelloWorld)
    const btn = wrapper.find("button")
    expect(wrapper.vm.count).toBe(0)
    btn.trigger("click")
    expect(wrapper.vm.count).toBe(1)
    await wrapper.vm.$nextTick()
    expect(wrapper.text()).toContain(1)
  })
})
```

### 传递事件参数

在触发事件的同时，我们也可以选择传递事件参数，`trigger()`方法接受第二个可选的`options`参数，其中的属性会在分发事件时设置到`$event`对象上：

```js
// 传递事件参数
btn.trigger('click', { count: 10 })

// 获取事件参数
handleIncrementClick ($event) {
  console.log($event.count)
}
```

**注意**：我们不能在`options`选项中设置事件目标`target`的值，如果我们`trigger`的是一个表单元素，想要在`trigger`之前修改其表单的值。一方面，我们可以使用前面介绍过的几个`set`方法，另一方面，我们可以修改`element`元素上的值以达到我们的目的：

```js
// setValue改变元素的值
input.setValue(100)
btn.trigger("click")

// element元素改变元素的值
input.element.value = 100
btn.trigger("click")
```

### 自定义事件

在一个`Vue`应用程序中，自定义事件比原生`DOM`事件更加强大，因为自定义事件可以和父组件通信。`Vue`中自定义事件系统有两个部分：监听自定义事件的父组件和发射事件的组件本身，这意味着同样是一个自定义事件，当它处于不同的角色时它的定位是不一样的：

- 对于发射事件的组件本身来说，发射事件是组件的输出。
- 对于监听自定义事件的父组件来说，发射的事件是组件的输入。

在`Vue-Test-Utils`中，一个组件它发射的事件可以通过`wrapper.emitted()`获取，它的返回值是一个对象，其中事件名作为对象的键名，对应的参数作为键的值，例如：

```js
wrapper.vm.$emit("change", 100)
wrapper.vm.$emit("update:visible", false)

const emitted = wrapper.emitted()
console.log(emitted)
/*
{
  'change': [[100]],
  'update:visible': [[false]]  
}
*/
```

我们先来看第一场情况，组件自身向外触发事件：

```js
import { shallowMount } from "@vue/test-utils"
import HelloWorld from "@/components/HelloWorld.vue"
describe("HelloWorld.vue", () => {
  it("emit触发事件", () => {
    const wrapper = shallowMount(HelloWorld)
    wrapper.vm.$emit("change", 100)
    wrapper.vm.$emit("update:visible", false)

    const emitted = wrapper.emitted()

    expect(emitted["change"]).toBeTruthy()
    expect(emitted["change"][0]).toEqual([100])

    expect(emitted["update:visible"]).toBeTruthy()
    expect(emitted["update:visible"][0]).toEqual([false])
  })
})
```

接下来我们来看第二种子组件派发事件，父组件监听事件的情况，假设我们有如下父组件：

```vue
<template>
  <div>
    <child-component @custom="onCustom" />
    <p v-if="emitted">Emitted!</p>
  </div>
</template>

<script>
import ChildComponent from "./ChildComponent"

export default {
  name: "ParentComponent",
  components: { ChildComponent },
  data() {
    return {
      emitted: false
    }
  },
  methods: {
    onCustom() {
      this.emitted = true
    }
  }
}
</script>
```

那么我们可以撰写如下测试用例：

```js
import { mount } from "@vue/test-utils"
import ParentComponent from "@/components/ParentComponent"
import ChildComponent from "@/components/ChildComponent"

describe("ParentComponent", () => {
  it("displays 'Emitted!' when custom event is emitted", () => {
    const wrapper = mount(ParentComponent)
    wrapper.find(ChildComponent).vm.$emit("custom")
    expect(wrapper.html()).toContain("Emitted!")
  })
})
```

测试用例说明：`find()`方法不仅可以传递我们熟知的标准选择器：元素标签，类名等还可以传递一个组件，传递组件返回的是一个组件的包装器。

## 测试 Vuex

在一个`Vue应用程序中`经常会使用到`Vuex`，我们有下面这几种方式来测试`Vuex`：

- 单独测试`store`中的每一个部分：我们可以把`store`中的`mutations`、`actions`和`getters`单独划分，分别进行测试。
- 组合测试`store`：我们不拆分`store`，而是把它当做一个整体，我们测试`store`实例，进而希望它能按期望输出。

单独测试`store`中的每一部分的好处是：单元测试可以小而且聚焦，当一个单元测试用例失败时，我们能够十分确切的知道错在哪里。缺点是：我们经常需要模拟`Vuex`的某些功能，而越多的模拟意味着越偏离实际，有时候很可能模拟错误而引入`bug`<br/>
组合测试`store`的好处是：这种方法更加健壮，因为我们不需要在重新编写、模拟`Vuex`的功能。

### 测试 Mutations

对于一个`mutation`而言，它只是一个函数，因此`mutation`的单元测试非常简单。我们只需要传递参数，然后期望`state`能正确输出。假设一个`mutation`代码如下：

```js
// mutations.js
setToken (state, token) {
  state.token = token
}
```

我们可以基于以上代码撰写如下单元测试：

```js
import mutations from "./mutations.js"
describe("mutations", () => {
  it("test setToken mutations", () => {
    const token = "123456"
    const state = {
      token: ""
    }
    mutations.setToken(state, token)
    expect(state.token).toBe(token)
  })
})
```

### 测试 Getters

同`mutations`一样，`getters`也是一个普通的函数，它始终返回一个值。因此这使得测试`getters`变得简单化，我们只需要断言`getter`函数的返回值即可。假设我们有如下`getters`代码：

```js
// getters.js
export const passList = (state) => {
  return state.students.filter((stu) => stu.score >= 60)
}
```

我们可以基于以上代码撰写如下单元测试：

```js
import getters from "./getters.js"
describe("getters", () => {
  it("test passList getters", () => {
    const students = [
      { name: "AAA", score: 59 },
      { name: "BBB", score: 70 },
      { name: "CCC", score: 10 }
    ]
    const state = {
      students: students
    }
    const result = getters.passList(state)
    expect(result).toEqual(students[1])
  })
})
```

### 测试 Actions

不同于`mutations`，我们单独模拟`actions`要稍微复杂一点，假设我们有如下`actions`代码：

```js
// actions.js
export const login = ({ commit }, { userInfo, token }) {
  commit('setUserInfo', userInfo)
  commit('setToken', token)
}
```

我们可以基于以上代码撰写如下单元测试：

```js
import actions from "./actions.js"
describe("actions", () => {
  const loginResult = {
    userInfo: { name: "AAA", age: 23 },
    token: "123456"
  }
  it("test login action", () => {
    expect.assertions(1)
    const context = {
      commit: jest.fn()
    }
    actions.login(context, loginResult)
    expect(context.commit).toHaveBeenCalledWith("setToken", loginResult.token)
  })
})
```

### 测试 Vuex Store 实例

组合测试`store`一个需要注意的点是，我们需要使用`localVue`而不是全局`Vue`上挂载我们的`Vuex`，假设我们有如下代码：

```js
test("increment updates state.count by 1", () => {
  Vue.use(Vuex)
  const store = new Vuex.store({ storeConfig })
  expect(store.state.count).toBe(0)

  store.commit("increment")
  expect(store.state.count).toBe(1)
})
```

当我们运行以上代码进行单独测试时，而确实能按照我们的期望进行输出，但存在一个致命问题：如果我们有多个测试用例，因为`store`对象是引用类型，我们在第一个测试用例修改的值，会影响其他测试用例。

一个可行的办法时，我们每次使用`store`时，都使用`cloneDeep(store)`后的副本，这样确实能解决对象引用的问题，但`Vue-Test-Utils`提供了一种更友好的方式来处理这类问题：`localVue`。

`localVue`我们在之前已经提到过，我们可以按照之前介绍的方式来改造以上测试用例：

```js
import { createLocalVue } from "@vue/test-utils"

const localVue = createLocalVue()
localVue.use(Vuex)

test("increment updates state.count by 1", () => {
  const store = new Vuex.store({ storeConfig })
  expect(store.state.count).toBe(0)

  store.commit("increment")
  expect(store.state.count).toBe(1)
})
```

要测试一个完整的`store`，我们假设有如下代码：

```js
import * as types from "./mutation-types.js"
import {
  setToken,
  getToken,
  removeToken,
  setUserInfo,
  getUserInfo,
  removeUserInfo
} from "@/utils/cache.js"
const state = {
  token: getToken(),
  userInfo: getUserInfo()
}
const mutations = {
  [types.SET_TOKEN](state, token) {
    state.token = token
  },
  [types.SET_USER_INFO](state, userInfo) {
    state.userInfo = userInfo
  }
}
const actions = {
  login({ commit }, { token, userInfo }) {
    commit(`${types.SET_TOKEN}`, setToken(token))
    commit(`${types.SET_USER_INFO}`, setUserInfo(userInfo))
  },
  logout({ commit }) {
    commit(`${types.SET_TOKEN}`, removeToken())
    commit(`${types.SET_USER_INFO}`, removeUserInfo())
  }
}
```

我们同时定义`getters.js`代码如下：

```js
export const token = (state) => state.token

export const userInfo = (state) => state.userInfo
```

因此我们可以撰写以下测试整体`store`的代码：

```js
import store from "./store/index.js"
import * as types from "./store/mutation-types.js"
import * as getters from "./store/getters.js"

describe("test store", () => {
  beforeEach(() => {
    localStorage.clear()
  })
  it("test login action", () => {
    const loginResult = {
      userInfo: { name: "AAA", age: 23 },
      token: "123456"
    }
    expect(getters.token).toBe("")
    expect(getters.userInfo).toEqual({})

    store.dispatch("login", loginResult)
    expect(getters.token).toBe(loginResult.token)
    expect(getters.userInfo).toEqual(loginResult.userInfo)
  })
  it("test logout action", () => {
    store.dispatch("logout")
    expect(getters.token).toBe("")
    expect(getters.userInfo).toEqual({})
  })
})
```

## 测试 Vue-Router

当`Vue-Router`被安装到`Vue`以后，它会添加两个实例属性：`$route`和`$router`，这两个属性一旦被添加则不允许再重写。

- `$route`：包含了当前匹配路由的信息，其中包含路由参数中的任何动态字段。
- `$router`：是当前路由实例，它包含了可以控制当前路由的所有方法，例如：`push`、`replace`和`back`等。

### 测试$route

当我们的组件使用了`$route`实例属性，则该属性将成为组件的依赖，我们在之前已经介绍过，处理依赖的一种可行的方式就是模拟，假设我们有如下组件：

```vue
<template>
  <div>
    <p v-if="$route.query && $route.query.id">get detail</p>
    <p v-else>need passed id</p>
  </div>
</template>
```

我们可以看到以上组件使用到了`$route`实例属性，因此我们为上面的组件撰写如下测试代码：

```js
import { shallowMount } from "@vue/test-utils"
import HelloWorld from "@/components/HelloWorld.vue"

describe("HelloWorld.vue", () => {
  let $route
  beforeEach(() => {
    $route = {
      query: {}
    }
  })
  it("no passed $route.query.id", () => {
    const wrapper = shallowMount(HelloWorld, {
      mocks: {
        $route
      }
    })
    expect(wrapper.text()).toContain("need passed id")
  })
  it("passed $route.query.id", () => {
    $route.query.id = 123
    const wrapper = shallowMount(HelloWorld, {
      mocks: {
        $route
      }
    })
    expect(wrapper.text()).toContain("get detail")
  })
})
```

### 测试$router

在以上测试`$route`组件的基础上，我们进一步修改代码：

```vue
<template>
  <div>
    <p v-if="$route.query.id">get detail</p>
    <p v-else>need passed id</p>
  </div>
</template>
<script>
export default {
  mounted() {
    if (!this.$route.query.id) {
      this.$router.replace("/home")
    }
  }
}
</script>
```

那么我们测试`$router`的代码可以像下面这样写：

```js
import { shallowMount } from "@vue/test-utils"
import HelloWorld from "@/components/HelloWorld.vue"

describe("HelloWorld.vue", () => {
  let $route
  let $router
  beforeEach(() => {
    $route = {
      query: {}
    }
    $router = {
      replace: jest.fn()
    }
  })
  it("replace home when no id", () => {
    const wrapper = shallowMount(HelloWorld, {
      mocks: {
        $route,
        $router
      }
    })
    expect($router.replace).toHaveBeenCalled()
  })
})
```

### 测试 RouterLink

依旧以上面组件代码为例，我们添加`router-link`，当没有传递`id`参数时，我们让用户手动点击返回：

```vue
<template>
  <div>
    <p v-if="$route.query.id">get detail</p>
    <p v-else>
      need passed id
      <router-link to="/home">返回</router-link>
    </p>
  </div>
</template>
```

我们都知道，在安装了`Vue-Router`后，我们就可以使用`router-link`和`router-view`等内置组件，但是如果我们不做其他处理的话，我们并不能把`router-link`当做一个组件，进而根据`wrapper.findComponent()`方法去找到它。

在`Vue-Test-Utils`中，我们可以使用`studs`存根`router-link`，然后使用`RouterLinkStub`控制`router-link`渲染：

```js
import { shallowMount, RouterLinkStub } from "@vue/test-utils"
import HelloWorld from "@/components/HelloWorld.vue"
const wrapper = shallowMount(HelloWorld, {
  stubs: {
    RouterLink: RouterLinkStub
  }
})
```

那么我们的测试代码如下：

```js
import { shallowMount, RouterLinkStub } from "@vue/test-utils"
import HelloWorld from "@/components/HelloWorld.vue"

describe("HelloWorld.vue", () => {
  it("render router-link", () => {
    const $route = {
      query: {}
    }
    const wrapper = shallowMount(HelloWorld, {
      stubs: {
        RouterLink: RouterLinkStub
      },
      mocks: {
        $route
      }
    })
    expect(wrapper.findComponent(RouterLinkStub).props().to).toBe("/home")
  })
})
```

**注意**：如果我们要找元素标签推荐使用`wrapper.find()`方法，如果要找组件推荐使用`wrapper.findComponent()`。

## 测试 Mixins 和 Filters

### 测试 mixin

测试`mixin`的过程很简单：在组件中或全局注册`mixin`、挂载组件、最后检查`mixin`是否产生了预期的行为。

假设我们有如下`titleMixin`代码：

```js
/// mixin.js
export const titleMixin = {
  mounted() {
    const title = this.title
    if (title) {
      document.title = title
    }
  }
}
```

然后我们在组件使用该`mixin`：

```vue
<template>
  <div>Hello,Vue.js</div>
</template>
<script>
import { titleMixin } from "@/mixin/index.js"
export default {
  mixins: [titleMixin],
  data() {
    return {
      title: "测试title mixin"
    }
  }
}
</script>
```

最后，我们撰写测试`titleMixin`的测试用例：

```js
import { shallowMount } from "@vue/test-utils"
import HelloWorld from "@/components/HelloWorld.vue"
describe("HelloWorld.vue", () => {
  it("test mixin", () => {
    const wrapper = shallowMount(HelloWorld)
    expect(document.title).toBe("测试title mixin")
  })
})
```

### 测试 filters

测试`filters`的方式同`mixins`十分相似，假设我们有如下反转字符串`filter`代码：

```js
export const reverseStr = (str) => {
  if (!str) {
    return
  }
  if (typeof str !== "string") {
    return str
  }
  return str.split("").reverse().join("")
}
```

接下来，我们在组件中使用该`filter`：

```vue
<template>
  <div>
    <span>{{ msg | reverseStr }}</span>
    <span>{{ age | reverseStr }}</span>
  </div>
</template>
<script>
import { reverseStr } from "@/filters/index.js"
export default {
  filters: {
    reverseStr
  },
  data() {
    return {
      age: 23,
      msg: "ABC"
    }
  }
}
</script>
```

最后，我们为以上组件编写测试用例：

```js
import { shallowMount } from "@vue/test-utils"
import HelloWorld from "@/components/HelloWorld.vue"
describe("HelloWorld.vue", () => {
  it("test filters", () => {
    const wrapper = shallowMount(HelloWorld)
    expect(wrapper.text()).toContain("CBA")
    expect(wrapper.text()).toContain("23")
  })
})
```

## 快照测试

一个对快照测试简单的解释就是获取代码的快照，并将其与以前保存的快照进行比较，如果新的快照与前一个快照不匹配，测试会失败。快照测试对于测试一个组件来说，相对比较有用，因为如果添加了快照测试，它能防止我们错误的修改了组件。

在`Jest`自动化测试框架中，我们可使用以下代码为组件进行快照：

```js
import { shallowMount } from "@vue/test-utils"
import HelloWorld from "@/components/HelloWorld.vue"

it("match snapshot", () => {
  const wrapper = shallowMount(HelloWorld)
  expect(wrapper.element).toMatchSnapshot()
})
```

以上快照测试的流程如下：

1. 运行快照测试。
2. 生成输出。
3. 之前是否有快照存在。
4. 不存在，创建快照，测试通过
5. 存在则继续与之前的快照进行比对，是否相同。
6. 相同，测试通过。
7. 不相同，测试失败。

一个快照测试的示例如下：

```js
exports[`HelloWorld.vue match snapshot 1`] = `
<div>
  <span
    class="item"
  >
    item
  </span>
  Hello, Vue and Jest...
</div>
`
```

### 静态组件快照

**静态组件**：指的是总是渲染相同输出的组件，它不接受任何`prop`，也没有任何`state`，组件内也没有任何逻辑，并且总是会渲染相同的`HTML`元素。为静态组件编写单元测试完全没有必要，但对于一个组件来说，为其编写一个快照测试则十分有必要。

假设我们有如下的静态组件：

```vue
<template>
  <transition>
    <svg class="spinner" width="44px" height="44px" viewBox="0 0 44 44">
      <circle class="path" fill="none" stroke-width="4" stroke-linecap="round" cx="22" cy="22" r="20">
    </svg>
  </transition>
</template>
```

我们编写如下静态快照测试用例：

```js
import { shallowMount } from "@vue/test-utils"
import Spinner from "@/components/spinner.vue"

describe("spinner.vue", () => {
  it("match snapshot", () => {
    const wrapper = shallowMount(Spinner)
    expect(wrapper.element).toMatchSnapshot()
  })
})
```

### 动态组件快照

**动态组件**：指的是那些包含逻辑和状态的组件，比如点击按钮会传递`props`的值或更改组件数据。为动态组件编写测试用例时，应该尝试捕获最重要的几条分支逻辑。因为对于一个大的组件而言，它会受`props`，自身`data`或者其他数据影响组件的渲染结果，而我们又不可能为每一种分支逻辑都撰写一个快照测试。

假设我们有如下组件代码：

```vue
<template>
  <div>
    <div v-if="age < 10">child person</div>
    <div v-else-if="age >= 10 && age < 30">youth person</div>
    <div>{{ msg }}</div>
  </div>
</template>
<script>
export default {
  props: {
    msg: {
      type: String,
      default: "default msg"
    }
  },
  data() {
    return {
      age: 11
    }
  }
}
</script>
```

我们依据以上代码撰写下面 2 个快照测试用例：

```js
import { shallowMount } from "@vue/test-utils"
import HelloWorld from "@/components/HelloWorld.vue"

describe("HelloWorld.vue", () => {
  let wrapper
  beforeEach(() => {
    wrapper = shallowMount(HelloWorld)
  })
  it("match msg snapshot", () => {
    expect(wrapper.element).toMatchSnapshot()
  })
  it("match age snapshot", async () => {
    wrapper.setData({
      age: 6
    })
    await wrapper.vm.$nextTick()
    expect(wrapper.element).toMatchSnapshot()
  })
})
```

运行`npm run test:unit`后，我们将得到如下快照：

```js
exports[`HelloWorld.vue match age snapshot 1`] = `
<div>
  <div>
     child person 
  </div>
   
  <div>
    default msg
  </div>
</div>
`

exports[`HelloWorld.vue match msg snapshot 1`] = `
<div>
  <div>
    youth person
  </div>
   
  <div>
    default msg
  </div>
</div>
`
```

### 更新快照

我们已经在上面分别介绍了静态组件和动态组件撰写快照测试的方法，我们也了解了快照测试对于一个组件的意义：当一个快照测试用例失败时，它提示我们组件相较于上一次做了修改。如果是计划外的，测试会捕获异常并将它输出提示我们。如果是计划内的，那么我们就需要更新快照。

更新快照主要有 2 种情况：

- 全部更新：我们可以使用`npm run test:unit -- -u`命令批量更新我们的快照，但这种方式是十分危险的，因为很可能其中某一个组件是计划外的更新，此时如果执行批量更新快照则会生成一个错误的快照文件。
- 交互式更新：我们可以使用`npm run test:unit -- --watch`命令进行`Jest`交互式更新，`i`键浏览所有失败的快照文件，`u`键使用最新值来更新之前保存的快照。其它按键请参照`Jest`官网上面的内容。
