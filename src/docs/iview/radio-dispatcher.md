### 基础用法
:::demo
```html
<template>
  <RadioDispatcher v-model="single">Radio</RadioDispatcher>
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
  <RadioGroupDispatcher v-model="phone">
    <RadioDispatcher label="apple">
      <Icon type="logo-apple" />
      <span>Apple</span>
    </RadioDispatcher>
    <RadioDispatcher label="android">
      <Icon type="logo-android" />
      <span>Android</span>
    </RadioDispatcher>
    <RadioDispatcher label="windows">
      <Icon type="logo-windows" />
      <span>Windows</span>
    </RadioDispatcher>
  </RadioGroupDispatcher>
</template>

<script>
export default {
  data () {
    return {
      phone: 'apple'
    }
  }
}
</script>
```
:::

### 按钮样式
:::demo
```html
<template>
  <div>
    <RadioGroupDispatcher v-model="button4" type="button" size="large">
      <RadioDispatcher label="北京" />
      <RadioDispatcher label="上海" />
      <RadioDispatcher label="深圳" />
      <RadioDispatcher label="杭州" />
    </RadioGroupDispatcher>
  </div>
  <div style="margin-top: 20px">
    <RadioGroupDispatcher v-model="button5" type="button">
      <RadioDispatcher label="北京" />
      <RadioDispatcher label="上海" />
      <RadioDispatcher label="深圳" />
      <RadioDispatcher label="杭州" />
    </RadioGroupDispatcher>
  </div>
  <div style="margin-top: 20px">
    <RadioGroupDispatcher v-model="button6" type="button" size="small">
      <RadioDispatcher label="北京" />
      <RadioDispatcher label="上海" />
      <RadioDispatcher label="深圳" />
      <RadioDispatcher label="杭州" />
    </RadioGroupDispatcher>
  </div>
</template>

<script>
export default {
  data () {
    return {
      button4: '北京',
      button5: '北京',
      button6: '北京'
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
      <RadioGroupDispatcher v-model="form.os" :rw-dispatcher-state="state">
        <RadioDispatcher label="ios" :rw-dispatcher-state="state">
          <Icon type="logo-apple" />
          <span>Apple</span>
        </RadioDispatcher>
        <RadioDispatcher label="android" :rw-dispatcher-state="state">
          <Icon type="logo-android" />
          <span>Android</span>
        </RadioDispatcher>
        <RadioDispatcher label="windows" :rw-dispatcher-state="state">
          <Icon type="logo-windows" />
          <span>Windows</span>
        </RadioDispatcher>
      </RadioGroupDispatcher>
      <Icon :type="icon" style="font-size: 20px" @click="toggleState" />
    </FormItem>
  </Form>
</template>

<script>
export default {
  data () {
    return {
      form: {
        os: 'ios'
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

由于渲染顺序的原因，RadioGroupDispatcher 和它的子组件(RadioDispatcher)都要设置统一的 state。这显然不利于开发体验，
希望在以后的版本能改进这个问题。
:::

### 自定义渲染函数 — props
:::demo 通过组件的props属性 `${namespace}-render(kebeb-case)` 或 `${namespace}Render(camelCase)` 自定义 read 状态的渲染函数。
```html
<template>
  <RadioGroupDispatcher v-model="value" :rw-dispatcher-render="readStateRender">
    <RadioDispatcher label="金斑蝶" />
    <RadioDispatcher label="爪哇犀牛" />
    <RadioDispatcher label="印度黑羚" />
  </RadioGroupDispatcher>
</template>

<script>
export default {
  data () {
    return {
      value: ''
    }
  },
  methods: {
    readStateRender (h, context) {
      return h('span', {
        style: { color: 'green' }
      }, context.data.attrs.value)
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
  <RadioGroupDispatcher v-model="value">
    <template #rwDispatcherRender="{ data }">
      <span style="color: red">{{ data.attrs.value }}</span>
    </template>
    <RadioDispatcher label="金斑蝶" />
    <RadioDispatcher label="爪哇犀牛" />
    <RadioDispatcher label="印度黑羚" />
  </RadioGroupDispatcher>
</template>

<script>
export default {
  data () {
    return {
      value: ''
    }
  }
}
</script>
```
:::

### Radio Attributes
<iview-attributes />

### Radio Scoped Slots
<iview-scope-slot />
