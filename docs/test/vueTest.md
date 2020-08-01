---
sidebar: auto
---

# Vue应用测试

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
对于使用`vscode`编辑器，可以通过安装`jest`插件，它可以在我们不运行`npm run test:unit`命令的时候就提示测试用例是否通过。

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
在`Wrapper`包裹器，主要有三类选择器：
* CSS选择器。
* Vue组件
* 对象。

#### CSS选择器
当一个组件被挂载后，我们可以使用有效的`CSS`选择器去获取我们想要搜索的标签，有效的`CSS`选择器有下面这些：
* 标签选择器(`div`、`p`)。
* 类选择器(`.foo`、`.bar`)。
* 特性选择器(`[class^='icon']`)。
* ID选择器(`#foo`)。
* 伪选择器(`div:first-of-type`)。

甚至可以像`Jquery`一样，联合一起来使用：
* 直接从属结合(`div > p > span`)。
* 一般从属结合(`div .foo`)
* 近邻兄弟选择器(`div + .foo`)
* 一般兄弟选择器(`div ~ .foo`)

#### Vue组件
假设我们有如下的Vue组件：
```js
export default {
  name: 'ChildComponent'
  // TDD
}
```
那么我们可以使用`wrapper.find()`方法去搜索这个组件：
```js
import { shallowMount } from '@vue/test-utils'
import ParentComponent from './parent-component.vue'
import ChildComponent from './child-component.vue'
describe('child-component.vue', () => {
  it('find component', () => {
    const wrapper = shallowMount(ParentComponent)
    expect(wrapper.find(ChildComponent).exists()).toBe(true)
  })
})
```

#### 对象
借用上一个例子，我们也可以使用对象去匹配选择：
```js
import { shallowMount } from '@vue/test-utils'
import ParentComponent from './parent-component.vue'
import ChildComponent from './child-component.vue'
describe('child-component.vue', () => {
  it('find component', () => {
    const wrapper = shallowMount(ParentComponent)
    // name匹配
    expect(wrapper.find({ name: ChildComponent }).exists()).toBe(true)
    // ref匹配
    expect(wrapper.find({ ref: 'RefChild' }).exists()).toBe(true)
  })
})
```
### 匹配是否存在、为空、可见、Vue实例
如果要判断搜索出来的结果是否存在、为空、可见或者为一个Vue实例，可以分别使用下面的方法：
* `wrapper.exists()`：在`DOM`上是否存在。
* `wrapper.isEmpty()`：是否有子元素。
* `wrapper.isVisible()`：是否被隐藏(`display: none`或`visibility: hidden`)时返回`false`。
* `wrapper.isVueInstance()`：判断是否为Vue实例。

```js
import { shallowMount } from '@vue/test-utils'
import HelloWorld from '@/components/HelloWorld.vue'

describe('HelloWorld.vue', () => {
  it('匹配是否存在、为空、可见、Vue实例', () => {
    const wrapper = shallowMount(HelloWorld)
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.isEmpty()).toBe(false)
    expect(wrapper.isVisible()).toBe(true)
    expect(wrapper.isVueInstance()).toBe(true)
  })
})
```
### 断言为DOM节点或有效的匹配选择器
在组件挂载后，我们可以使用`wrapper.is()`方法进行断言其为一个DOM节点或者一个有效的VM匹配选择器。
```js
import { shallowMount } from '@vue/test-utils'
import HelloWorld from '@/components/HelloWorld.vue'
describe('HelloWorld.vue', () => {
  it('断言', () => {
    const wrapper = shallowMount(HelloWorld)
    // 断言wrapper是一个div标签
    expect(wrapper.is('div')).toBe(true)
    // 断言wrapper是HelloWorld组件
    expect(wrapper.is(HelloWorld)).toBe(true)
  })
})
```


## 改变组件状态
### set方法改变组件状态
在组件挂载后，可以使用如下几种`set`方法来改变组件中的数据。
* `setChecked`：设置`checkbox`或者`radio`类元素的`checked`的值并更新`v-model`。
* `setSelected`：设置一个`option`元素并更新`v-model`。
* `setValue`：设置一个文本控件或`select`元素的值并更新`v-model`。
* `setProps`：设置包裹器的`vm`实例中`prop`并强制更新。
* `setData`：设置包裹器中`vm`实例中的`data`并更新。

```js
import { shallowMount } from '@vue/test-utils'
import HelloWorld from '@/components/HelloWorld.vue'
describe('HelloWorld.vue', () => {
  it('改变组件状态', () => {
    const wrapper = shallowMount(HelloWorld)
    const radioInput = wrapper.find('input[type="radio"]')
    const options = wrapper.find('select').findAll('option')
    const textInput = wrapper.find('input[type="text"]')
    radioInput.setChecked()
    options.at(1).setSelected()
    textInput.setValue('foo')

    wrapper.setProps({
      msg: 'bar msg'
    })
    expect(wrapper.text()).toContain('bar msg')

    wrapper.setData({
      foo: 'foo value'
    })
    expect(wrapper.vm.foo).toBe('foo value')
  })
})
```
## 模拟用户交互
### trigger触发事件
假设我们有`counter.vue`组件，其代码如下：
```vue
<template>
  <div class="counter">
    {{count}}
    <button @click="handleClick">点击</button>
  </div>
</template>
<script>
export default {
  data () {
    return {
      count: 0
    }
  },
  methods: {
    handleClick ($event) {
      if ($event.step) {
        this.count += $event.step
      } else {
        this.count++
      }
    }
  }
}
</script>
```
那么我们可以撰写如下的测试代码，来测试按钮的点击事件：
```js
import { shallowMount } from '@vue/test-utils'
import Counter from '@/components/counter.vue'

describe('counter.vue', () => {
  it('trigger click', async () => {
    const wrapper = shallowMount(Counter)
    expect(wrapper.text()).toContain('0')
    const button = wrapper.find('button')
    button.trigger('click')
    // trigger并不会马上触发视图更新，因此需要使用nextTick()
    await wrapper.vm.$nextTick()
    expect(wrapper.text()).toContain('1')

    // 触发事件的同时，我们还可以传递参数
    button.trigger('click', { step: 10 })
    await wrapper.vm.$nextTick()
    expect(wrapper.text()).toContain(11)
  })
})
```
正如我们上面提到的那样，`trigger`并不会马上触发视图更新，而是需要等待下一轮的`tick`，以下这些方法全部都需要这样处理：
* `setChecked`
* `setSelected`
* `setValue`
* `setProps`
* `setData`
* `trigger`
### 键盘事件
假设我们把`counter.vue`的代码改成如下的方式：
```vue
<template>
  <div class="counter">
    <input type="text" v-model="count" @keydown.prevent="handleKeydown"/>
  </div>
</template>
<script>
export default {
  data () {
    return {
      count: 0
    }
  },
  methods: {
    handleKeydown (e) {
      if (e.keyCode === 38) {
        this.count++
      } else if (e.keyCode === 40) {
        this.count--
      }
    }
  }
}
</script>
```
那我们可以撰写如下测试键盘事件的测试用例：
```js
import { shallowMount } from '@vue/test-utils'
import Counter from '@/components/counter.vue'

describe('counter.vue', () => {
  it('keydown.up event', async () => {
    const wrapper = shallowMount(Counter)
    const input = wrapper.find('input')
    input.trigger('keydown.up')
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.count).toBe(1)
  })
  it('keydown.down event', async () => {
    const wrapper = shallowMount(Counter)
    const input = wrapper.find('input')
    input.trigger('keydown.down')
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.count).toBe(-1)
  })
})
```
### emit派发事件
每个被挂载的包裹器都会通过其背后的`Vue`实例来记录所有被触发的事件，我们可以使用`wrapper.emitted()`来回去这些事件的记录。

假设组件手动触发下面这些事件
```js
wrapper.vm.$emit('foo')
wrapper.vm.$emit('foo', 123)
/*
`wrapper.emitted()` 返回以下对象：
{
  foo: [[], [123]]
}
*/
```
那么我们可以根据上面的代码做一些测试用例：
```js
// 断言事件已经被触发过
expect(wrapper.emitted().foo).toBeTruthy()
// 断言事件的数量
exprect(wrapper.emitted().foo.length).toBe(2)
// 断言事件的参数
expect(wrapper.emitted().foo[1]).toEqual([123])
```

#### 从子组件派发事件
假设我们下面这样的组件：
```vue
<template>
  <div>
    <child-component @custom="onCustom" />
    <p v-if="emitted">Emitted!</p>
  </div>
</template>

<script>
  import ChildComponent from './ChildComponent'

  export default {
    name: 'ParentComponent',
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
那么我们可以依据此来撰写测试用例：
```js
import { shallowMount } from '@vue/test-utils'
import ParentComponent from '@/components/ParentComponent'
import ChildComponent from '@/components/ChildComponent'

describe('ParentComponent', () => {
  it("displays 'Emitted!' when custom event is emitted", () => {
    const wrapper = shallowMount(ParentComponent)
    wrapper.find(ChildComponent).vm.$emit('custom')
    expect(wrapper.html()).toContain('Emitted!')
  })
})
```
### 使用nextTick
正如我们前面已经介绍过和使用过的，当使用某些`set`方法或者`trigger`触发事件是，我们需要等待组件下一轮`tick`。通常来说简单的做法是使用`async/await`，像下面这样:
```js
describe('nextTick', () => {
  it('async/await', async () => {
    // 省略挂载
    wrapper.trigger('click')
    await wrapper.vm.$nextTick()
    expect(wrapper.text()).toContain('next tick')
  })
})
```
除了`async/await`，我们还有另外一种选择：`done`回调：
```js
describe('nextTick', () => {
  it('done callback', (done) => {
    // 省略挂载
    wrapper.trigger('click')
    wrapper.vm.$nextTick().then(() => {
      expect(wrapper.text()).toContain('next tick')
      done()
    })
  })
})
```


## 使用第三方插件
### 安装Vue-Router
在我们测试的过程中，如果想要测试跟路由相关的功能，我们选择安装`Vue-Router`。这里需要注意的是，应该避免直接在`Vue`原型上安装`Vue-Router`，而是应该把它安装在一个`localVue`中。
```js
import { shallowMount, createLocalVue } from '@vue/test-utils'
import VueRouter from 'vue-router'
import MyComponent from '@/components/my-component.vue'

const localVue = createLocalVue()
localVue.use(VueRouter)
const router = new VueRouter()

shallowMount(MyComponent, {
  localVue,
  router
})
```
**注意**：当我们在`localVue`上安装`Vue-Router`以后，我们就不能再像前面我们提到的，在一个组件挂载的过程中提供`mocks`选项来覆写`$route`和`$router`了。

在上面我们提到，可以在`localVue`上安装`Vue-Router`，那么在其安装完毕后，与路由相关的两个组件就被注册了：`router-link`和`router-view`，我们可以在任何地方使用它们。

如果没有安装`Vue-Router`，可以使用存根的方式进行组件占位：
```js
import { shallowMount } from '@vue/test-utils'
import MyComponent from '@/components/my-component.vue'

const wrapper = shallowMount(MyComponent, {
  stubs: ['router-link', 'router-view']
})
```
### 安装及模拟Vuex
同`Vue-Router`一样，我们同样应该避免在`Vue`上直接安装`Vuex`，而是应该创建一个`localVue`:
```js
import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'Vuex'
import MyComponent from '@/components/my-component.vue'

const localVue = createLocalVue()
localVue.use(Vuex)
const store = new Vuex.Store({
  state: {},
  mutations: {},
  actions: {}
})

shallowMount(MyComponent, {
  localVue,
  store
})
```

现在假设我们有下面这样一个简洁的`store`：
```js
export default new Vuex.Store({
  state: {
    input: '',
    click: ''
  },
  mutations: {
    actionInput(state, value) {
      state.input = value
    },
    actionClick(state, value) {
      state.click = value
    }
  },
  actions: {
    actionInput ({ commit }, value) {
      commit('actionInput', value)
    },
    actionClick ({ commit }, value) {
      commit('actionClick', value)
    }
  }
```

在假设我们的`HelloWorld.vue`组件的代码如下：
```vue
<template>
  <div>
    <input type="text" @input="handleActionInput" />
    <button @click="actionClick()">Click</button>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'HelloWorld',
  methods: {
    ...mapActions(['actionClick']),
    handleActionInput (event) {
      const inputValue = event.target.value
      if (inputValue === 'input') {
        this.$store.dispatch('actionInput', inputValue)
      }
    }
  }
}
</script>
```

那么我们可以根据以上信息，撰写以下测试用例：
```js
import { shallowMount, createLocalVue } from '@vue/test-utils'
import HelloWorld from '@/components/HelloWorld.vue'
import Vuex from 'vuex'
const localVue = createLocalVue()
localVue.use(Vuex)
describe('HelloWorld.vue', () => {
  let actions
  let store
  let wrapper
  beforeEach(() => {
    actions = {
      actionClick: jest.fn(),
      actionInput: jest.fn()
    }
    store = new Vuex.Store({
      state: {},
      actions
    })
    wrapper = shallowMount(HelloWorld, {
      store,
      localVue
    })
  })

  it('dispatch actionInput when input value is "input"', () => {
    const input = wrapper.find('input')
    input.element.value = 'input'
    input.trigger('input')
    expect(actions.actionInput).toHaveBeenCalled()
  })
  it('not dispatch actionInput when input value is not "input"', () => {
    const input = wrapper.find('input')
    input.element.value = 'no-input'
    input.trigger('input')
    expect(actions.actionInput).not.toHaveBeenCalled()
  })
  it('dispatch actionClick when click btn', () => {
    wrapper.find('button').trigger('click')
    expect(actions.actionClick).toHaveBeenCalled() 
  })
})
```

#### 伪造Getter
假设我们有如下组件和`Getters`：
```vue
<template>
  <div>
    <p v-if="inputValue">{{inputValue}}</p>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'HelloWorld',
  computed: {
    ...mapGetters(['inputValue'])
  }
}
</script>
```
Getters代码：
```js
export const inputValue = state => state.inputValue
```
同测试`Actions`一样，我们并不关心`Getters`是什么，对于一个组件来说，我们只希望能够正确渲染我们期望的`Getters`值。

根据以上代码和规则，我们可以撰写如下的测试用例：
```js
import { shallowMount, createLocalVue } from '@vue/test-utils'
import HelloWorld from '@/components/HelloWorld.vue'
import Vuex from 'vuex'
const localVue = createLocalVue()
localVue.use(Vuex)
describe('HelloWorld.vue', () => {
  let store
  let getters
  let wrapper
  beforeEach(() => {
    getters = {
      inputValue: () => 'input value'
    }
    store = new Vuex.Store({
      getters
    })
    wrapper = shallowMount(HelloWorld, {
      store,
      localVue
    })
  })

  it('render getters.inputValue', () => {
    const p = wrapper.find('p')
    expect(p.text()).toBe(getters.inputValue())
  })
})

```