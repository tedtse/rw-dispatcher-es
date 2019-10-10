### 单独使用
:::demo
```html
<template>
  <CheckboxDispatcher v-model="single">Checkbox</CheckboxDispatcher>
</template>

<script>
export default {
  data () {
    return {
      single: false
    }
  }
}
</script>
```
:::

### 组合使用
:::demo
```html
<template>
  <div>
    <CheckboxGroupDispatcher v-model="social">
      <CheckboxDispatcher label="twitter">
        <Icon type="logo-twitter"></Icon>
        <span>Twitter</span>
      </CheckboxDispatcher>
      <CheckboxDispatcher label="facebook">
        <Icon type="logo-facebook"></Icon>
        <span>Facebook</span>
      </CheckboxDispatcher>
      <CheckboxDispatcher label="github">
        <Icon type="logo-github"></Icon>
        <span>Github</span>
      </CheckboxDispatcher>
      <CheckboxDispatcher label="snapchat">
        <Icon type="logo-snapchat"></Icon>
        <span>Snapchat</span>
      </CheckboxDispatcher>
    </CheckboxGroupDispatcher>
    <CheckboxGroupDispatcher v-model="fruit" style="margin-top: 20px">
      <CheckboxDispatcher label="香蕉"></CheckboxDispatcher>
      <CheckboxDispatcher label="苹果"></CheckboxDispatcher>
      <CheckboxDispatcher label="西瓜"></CheckboxDispatcher>
    </CheckboxGroupDispatcher>
  </div>
</template>

<script>
export default {
  data () {
    return {
      social: ['facebook', 'github'],
      fruit: ['苹果']
    }
  }
}
</script>
```
:::

### 分隔符
:::demo 自定义分隔符，优先级高于局部配置和全局配置。
```html
<template>
  <CheckboxGroupDispatcher v-model="fruit" rw-dispatcher-separator="and" style="margin-top: 20px">
    <CheckboxDispatcher label="香蕉" />
    <CheckboxDispatcher label="苹果" />
    <CheckboxDispatcher label="西瓜" />
  </CheckboxGroupDispatcher>
</template>

<script>
export default {
  data () {
    return {
      fruit: []
    }
  }
}
</script>
```
:::

### 组件配置 — 状态
:::demo 通过组件的props属性 `${namespace}-state(kebeb-case)` 或 `${namespace}State(camelCase)` 控制 read or write 状态。优先级高于 局部配置的 ${namespace}State
```html
<template>
  <Form :model="form">
    <FormItem label="操作系统">
      <CheckboxGroupDispatcher v-model="form.os" :rw-dispatcher-state="state">
        <CheckboxDispatcher label="ios" :rw-dispatcher-state="state">
          <Icon type="logo-apple" />
          <span>Apple</span>
        </CheckboxDispatcher>
        <CheckboxDispatcher label="android" :rw-dispatcher-state="state">
          <Icon type="logo-android" />
          <span>Android</span>
        </CheckboxDispatcher>
        <CheckboxDispatcher label="windows" :rw-dispatcher-state="state">
          <Icon type="logo-windows" />
          <span>Windows</span>
        </CheckboxDispatcher>
        <CheckboxDispatcher label="linux" :rw-dispatcher-state="state">
          <Icon type="logo-tux" />
          <span>Linux</span>
        </CheckboxDispatcher>
      </CheckboxGroupDispatcher>
      <Icon :type="icon" style="font-size: 20px" @click="toggleState" />
    </FormItem>
  </Form>
</template>

<script>
export default {
  data () {
    return {
      form: {
        os: []
      },
      state: 'write',
      icon: 'ios-eye-outline'
    }
  },
  methods: {
    toggleState () {
      if (this.state === 'write') {
        this.state = 'read'
        this.icon = 'ios-create-outline'
      } else {
        this.state = 'write'
        this.icon = 'ios-eye-outline'
      }
    }
  }
}
</script>
```
:::
:::tip 设置 state
// TODO

由于渲染顺序的原因，CheckboxGroupDispatcher 和它的子组件(CheckboxDispatcher)都要设置统一的 state。这显然不利于开发体验，
希望在以后的版本能改进这个问题。
:::

### 自定义渲染函数 — props
:::demo 通过组件的props属性 `${namespace}-render(kebeb-case)` 或 `${namespace}Render(camelCase)` 自定义 read 状态的渲染函数。
```html
<template>
  <CheckboxGroupDispatcher v-model="value" :rw-dispatcher-render="readStateRender">
    <CheckboxDispatcher label="金斑蝶" />
    <CheckboxDispatcher label="爪哇犀牛" />
    <CheckboxDispatcher label="印度黑羚" />
  </CheckboxGroupDispatcher>
</template>

<script>
export default {
  data () {
    return {
      value: []
    }
  },
  methods: {
    readStateRender (h, context) {
      return h('span', {
        style: { color: 'green' }
      }, context.data.attrs.value.join(' | '))
    }
  }
}
</script>
```
:::

### 自定义渲染函数 — slot
:::demo 通过 `#${namespace}Render`（cabelCase） 或 `v-slot:${namespace}Render`（cabelCase） 自定义 read 状态的渲染函数。
```html
<template>
  <CheckboxGroupDispatcher v-model="value">
    <template #rwDispatcherRender="{ data }">
      <span style="color: red">{{ data.attrs.value.join(' | ') }}</span>
    </template>
    <CheckboxDispatcher label="金斑蝶" />
    <CheckboxDispatcher label="爪哇犀牛" />
    <CheckboxDispatcher label="印度黑羚" />
  </CheckboxGroupDispatcher>
</template>

<script>
export default {
  data () {
    return {
      value: []
    }
  }
}
</script>
```
:::

### Checkbox Attributes
<iview-attributes>
  <template #append>
    <tr>
      <td>${namespace}-separator<br />（默认 rw-dispatcher-separator）</td>
      <td>自定义分隔符。与属性 multiple 配合使用</td>
      <td>String</td>
      <td>|</td>
    </tr>
  </template>
</iview-attributes>

### Checkbox Scoped Slots
<iview-scope-slot />

### 其他属性、Slots、Events
与官方 `Checkbox`、 `CheckboxGroup` 的完全一致，[官方组件](https://www.iviewui.com/components/checkbox#API)。