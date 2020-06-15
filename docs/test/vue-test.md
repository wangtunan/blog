---
sidebar: auto
---

# Vue-Test-Utils自动化测试

## 测试的目的
对于UI组件来说，并不推荐一味的追求行级覆盖率，因为过度注重覆盖率可能会严重导致我们过分关注组件内部的实现细节，从而导致过多的繁琐测试。取而代之的是，我们希望把组件测试撰写为断言组件的公共接口，并在一个黑盒中去处理它，一个简单的UI组件测试用例将断言一些输入(**用户交互**或**Prop输入**)提供给组件之后，期望组件的预期结果(**渲染结果**或**响应事件**)。

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
如果你是`Vue-Cli`的重度热爱者，那么通过`Vue-Cli4.0+`可以快速创建一个包含`test`测试相关的项目配置。
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
对于使用`vscode`编辑器，可以通过安装`jest`插件，它可以在我们不运行`npm run test:unit`命名的时候就提示测试用例是否通过。

![jest插件](../images/test/vue-test1.png)


## 挂载组件以及挂载选项
### mount和shallowMount
对于不包含子组件的组件来说，使用`shallowMount`和`mount`，对组件的效果是一样的。二者的区别在于，`shallowMount`只渲染组件本身，但会保留子组件的组件中的存根。

区别这两种方法的目的在于，当我们只想对某个孤立的组件进行测试的时候，一方面可以避免其子组件的影响，另一方面对于包含许多子组件的组件来说，完全渲染子组件会导致组件的渲染树非常庞大，这可能会让影响到我们的测试速度。

```js
import { shallowMount, mount } from '@vue/test-utils'
import HelloWorld from '@/components/HelloWorld.vue'

describe('HelloWorld.vue', () => {
  it('test shallowMount', () => {
    const wrapper = shallowMount(HelloWorld)
    // 判断组件是否挂载
    expect(wrapper.exists()).toBe(true)
  })
  it('test mount', () => {
    const wrapper = mount(HelloWorld)
    // 判断组件是否挂载
    expect(wrapper.exists()).toBe(true)
  })
})
```
### 必须手动销毁的挂载组件
在我们使用`mount`或者`shallowMount`的时候，我们可以期望组件响应几乎所有的`Vue`生命周期函数，但除非手动调用`wrapper.destory()`函数，否则组件的`beforeDestroy()`和`destroyed()`不会被触发。

最后有一个值得注意的挂载选项：`attachToDocument`，其默认值为`false`。如果我们在挂载时提供了`true`值，则组件会被挂载到DOM上，那么我们应该在测试的最后手动调用`wrapper.destory()`函数，让元素从文档中移除并销毁已经被挂载的组件实例。
```js
import { mount } from '@vue/test-utils'
import HelloWorld from '@/components/HelloWorld.vue'

describe('HelloWorld.vue', () => {
  it('test attachToDocument', () => {
    const wrapper = mount(HelloWorld, {
      attachToDocument: true
    })
    expect(wrapper.exists()).toBe(true)
    wrapper.destroy()
  })
})
```
### 挂载后的实例
组件在挂载后，我们可以通过`wrapper.vm`来访问到挂载后的`Vue`实例，同时可以通过此实例访问到组件的属性和方法。

在我们搭建的项目中，假设我们的`HelloWorld.vue`的代码如下：
```vue
<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
  </div>
</template>
<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data () {
    return {
      vmA: 'A',
      vmB: 'B'
    }
  }
}
</script>
```
那么我们依据以上代码，撰写如下测试用例：
```js
import { mount } from '@vue/test-utils'
import HelloWorld from '@/components/HelloWorld.vue'

describe('HelloWorld.vue', () => {
  it('test vm property', () => {
    const wrapper = mount(HelloWorld)
    expect(wrapper.vm.vmA).toBe('A')
    expect(wrapper.vm.vmB).toBe('B')
  })
})
```
### 挂载PropsData
对于需要传递`props`属性的组件，我们可以在挂载的时候，使用`PropsData`进行注入，随后可以`wrapper.props`进行访问。
```js
import { mount } from '@vue/test-utils'
import HelloWorld from '@/components/HelloWorld.vue'

describe('HelloWorld.vue', () => {
  it('test propsData', () => {
    const msg = 'hello,world'
    const wrapper = mount(HelloWorld, {
      propsData: {
        msg: msg
      }
    })
    expect(wrapper.props('msg')).toBe(msg)
    expect(wrapper.props().msg).toBe(msg)
  })
})
```
### 挂载后Html和Text
和`props`相似，我们可以在挂载后访问到挂载后的`html`标签和`text`文本。
```js
import { mount } from '@vue/test-utils'
import HelloWorld from '@/components/HelloWorld.vue'

describe('HelloWorld.vue', () => {
  it('test html and text', () => {
    const msg = 'hello,world'
    const wrapper = mount(HelloWorld, {
      propsData: {
        msg: msg
      }
    })
    expect(wrapper.html()).toContain('<h1>hello,world</h1>')
    expect(wrapper.text()).toContain(msg)
  })
})
```
### 挂载后的属性和样式
假设我们把`HelloWorld.vue`的模板改成如下形式：
```vue
<template>
  <div id="HelloID" class="hello-class">
    <h1>{{ msg }}</h1>
  </div>
</template>
```
那么我们可以依据此撰写如下测试用例：
```js
import { mount } from '@vue/test-utils'
import HelloWorld from '@/components/HelloWorld.vue'

describe('HelloWorld.vue', () => {
  it('test attr and class', () => {
    const wrapper = mount(HelloWorld)
    expect(wrapper.attributes('id')).toBe('HelloID')
    expect(wrapper.attributes().id).toBe('HelloID')
    expect(wrapper.classes('hello-class')).toBe(true)
    expect(wrapper.classes()).toContain('hello-class')
  })
})
```
### 挂载Mocks
当我们想要在全局伪造一些额外属性的时候，例如：`$route`，可以在挂载的时候提供`mocks`属性。
```js
import { mount } from '@vue/test-utils'
import HelloWorld from '@/components/HelloWorld.vue'

describe('HelloWorld.vue', () => {
  it('test mocks $route', () => {
    const $route = { path: '/mock/path' }
    const wrapper = mount(HelloWorld, {
      mocks: {
        $route
      }
    })
    expect(wrapper.vm.$route.path).toBe($route.path)
  })
})

```
### 挂载Slots
在一个组件在挂载时，需要提供`slot`插槽内容，可以使用组件提供的`slot`对象，它的键代表插槽的名称，它的值可以是一个组件、一个组件数组、一个字符串模板或文本。
假设我们把`HelloWorld.vue`的模板改成如下所示：
```vue
<template>
  <div>
    <h1>{{ msg }}</h1>
    <slot />
    <slot name="foo" />
  </div>
</template>
```
那么我们测试`slot`的测试用例可以写成下面这样：
```js
import { shallowMount } from '@vue/test-utils'
import HelloWorld from '@/components/HelloWorld.vue'

describe('HelloWorld.vue', () => {
  it('test slots', () => {
    const testComponentA = {
      name: 'TestA',
      template: `<div>testComponentA</div>`
    }
    const testComponentB = {
      name: 'TestB',
      template: `<p>testComponentB</p>`
    }
    const wrapper = shallowMount(HelloWorld, {
      slots: {
        default: [testComponentA],
        foo: testComponentB
      }
    })
    expect(wrapper.text()).toContain('testComponentA')
    expect(wrapper.findComponent(testComponentB).exists()).toBe(true)
  })
})
```
### 挂载其它选项
当我们在挂载一个组件的时候需要额外的给这个组件提供一些额外的配置，可以通过`options`去扩展。

假设我们有如下所示的组件：
```js
const MyComponent = {
  template: `<div>{{foo()}} {{bar()}} {{baz()}}</div>`,
  methods: {
    foo () {
      return 'foo'
    },
    bar () {
      return 'bar'
    }
  }
}
```

当我们在测试的时候，我们扩展有如下的`options`配置，并根据配置可以撰写扩展后的测试用例。
```js
const options = {
  methods: {
    baz () {
      return 'baz'
    }
  }
}

const wrapper = shallowMount(MyComponent, options)
expect(wrapper.text()).toBe('foo bar baz')
```


## 匹配和搜索
### 匹配选择器
### 匹配是否存在、为空、可见、Vue实例
### 断言为DOM节点或
### 匹配标签或组件
### 搜索标签和组件


## 改变组件状态和注入Prop
### set方法改变组件状态
### 注入Prop


## 模拟用户交互
### trigger触发事件
#### 点击事件
### 键盘、鼠标事件
### 其它DOM事件
### emit派发事件
### 使用nextTick


## 使用第三方插件
### 安装Vue-Router
### 存根
### 安装及模拟Vuex


## 测试覆盖率

