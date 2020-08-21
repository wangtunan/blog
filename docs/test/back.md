
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
