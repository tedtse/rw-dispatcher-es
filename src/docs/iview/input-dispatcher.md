### 基础用法
:::demo
```html
<template>
  <InputDispatcher v-model="value" placeholder="Enter something..." style="width: 300px" />
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

### 复合型输入框
:::demo
```html
<template>
  <InputDispatcher v-model="value">
    <template #prepend>
      <Select v-model="select1" style="width: 80px">
        <Option value="http">http://</Option>
        <Option value="https">https://</Option>
      </Select>
    </template>
    <template #append>
      <Select v-model="select2" style="width: 70px">
        <Option value="com">.com</Option>
        <Option value="org">.org</Option>
        <Option value="io">.io</Option>
      </Select>
    </template>
  </InputDispatcher>
</template>

<script>
export default {
  data () {
    return {
      value: '',
      select1: '',
      select2: ''
    }
  }
}
</script>
```
:::

### 尺寸
:::demo
```html
<template>
  <Row>
    <Col span="8">
      <InputDispatcher v-model="value1" size="large" placeholder="large size" />
    </Col>
    <Col span="8">
      <InputDispatcher v-model="value2" placeholder="default size" />
    </Col>
    <Col span="8">
      <InputDispatcher v-model="value3" size="small" placeholder="small size" />
    </Col>
  </Row>
</template>

<script>
export default {
  data () {
    return {
      value1: '',
      value2: '',
      value3: ''
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
    <FormItem label="活动名称">
      <InputDispatcher
        v-model="form.name"
        :rw-dispatcher-state="state"
        style="width: 300px"
      />
      <Icon :type="icon" style="font-size: 20px" @click="toggleState" />
    </FormItem>
  </Form>
</template>

<script>
export default {
  data () {
    return {
      form: {
        name: '618电器折扣日'
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

### 自定义渲染函数 — props
:::demo 通过组件的props属性 `${namespace}-render(kebeb-case)` 或 `${namespace}Render(camelCase)` 自定义 read 状态的渲染函数。
```html
<template>
  <InputDispatcher
    v-model="input"
    :rw-dispatcher-render="readStateRender"
    placeholder="请输入内容"
  />
</template>

<script>
export default {
  data () {
    return {
      input: ''
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
  <InputDispatcher v-model="input" placeholder="请输入内容">
    <template #rwDispatcherRender="{ data }">
      <span style="color: red">{{ data.attrs.value }}</span>
    </template>
  </InputDispatcher>
</template>

<script>
export default {
  data () {
    return {
      input: ''
    }
  }
}
</script>
```
:::

### Input Attributes
<iview-attributes />

### Input Scoped Slots
<iview-scope-slot />

### 其他属性、Slots、Events
与官方 `Input` 的完全一致，[官方组件](https://www.iviewui.com/components/input#API)。