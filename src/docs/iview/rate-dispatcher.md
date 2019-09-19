### 显示提示
:::demo
```html
<template>
  <Row>
    <Col span="12">
      <RateDispatcher show-text v-model="valueText" />
    </Col>
    <Col span="12">
      <RateDispatcher show-text allow-half v-model="valueCustomText">
        <span style="color: #f5a623">{{ valueCustomText }}</span>
      </RateDispatcher>
    </Col>
  </Row>
</template>

<script>
export default {
  data () {
    return {
      valueText: 3,
      valueCustomText: 3.8
    }
  }
}
</script>
```
:::

### 自定义字符或图标
:::demo
```html
<template>
  <RateDispatcher v-model="value3" character="A" />
  <RateDispatcher v-model="value4" character="好" />
  <RateDispatcher v-model="value5" icon="ios-heart" />
</template>

<script>
export default {
  data () {
    return {
      value3: 3,
      value4: 3,
      value5: 3
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
    <FormItem label="评分">
      <RateDispatcher v-model="form.rate" :rw-dispatcher-state="state" />
      <Icon :type="icon" style="font-size: 20px" @click="toggleState" />
    </FormItem>
  </Form>
</template>

<script>
export default {
  data () {
    return {
      form: {
        rate: 3
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
  <RateDispatcher
    v-model="rate"
    :rw-dispatcher-render="readStateRender"
    placeholder="请输入内容"
  />
</template>

<script>
export default {
  data () {
    return {
      rate: 2
    }
  },
  methods: {
    readStateRender (h, context) {
      return h('span', {
        style: { color: 'green' }
      }, context.data.attrs.value + '颗星')
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
  <RateDispatcher v-model="rate" placeholder="请输入内容">
    <template #rwDispatcherRender="{ data }">
      <span style="color: red">{{ data.attrs.value }}颗星</span>
    </template>
  </RateDispatcher>
</template>

<script>
export default {
  data () {
    return {
      rate: 2
    }
  }
}
</script>
```
:::

### Rate Attributes
<iview-attributes />

### Rate Scoped Slots
<iview-scope-slot />
