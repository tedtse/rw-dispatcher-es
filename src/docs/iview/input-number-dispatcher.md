### 基础用法
:::demo
```html
<template>
  <InputNumberDispatcher :max="10" :min="1" v-model="value" />
</template>

<script>
export default {
  data () {
    return {
      value: 1
    }
  }
}
</script>
```
:::

### 小数
:::demo
```html
<template>
  <InputNumberDispatcher :max="10" :min="1" :step="1.2" v-model="value" />
</template>

<script>
export default {
  data () {
    return {
      value: 1
    }
  }
}
</script>
```
:::

### 格式化展示
:::demo
```html
<template>
  <InputNumberDispatcher
    :max="10000"
    v-model="value"
    :formatter="value => `$ ${value}`.replace(/B(?=(d{3})+(?!d))/g, ',')"
    :parser="value => value.replace(/$s?|(,*)/g, '')"
  />
</template>

<script>
export default {
  data () {
    return {
      value: 1000
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
      <InputNumberDispatcher v-model="value3" size="small" />
    </Col>
    <Col span="8">
      <InputNumberDispatcher v-model="value4" />
    </Col>
    <Col span="8">
      <InputNumberDispatcher v-model="value5" size="large" />
    </Col>
  </Row>
</template>

<script>
export default {
  data () {
    return {
      value3: 2,
      value4: 2,
      value5: 2
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
    <FormItem label="限制次数">
      <InputNumberDispatcher
        v-model="form.number"
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
        number: 5
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
  <InputNumberDispatcher
    v-model="number"
    :rw-dispatcher-render="readStateRender"
    placeholder="请输入内容"
  />
</template>

<script>
export default {
  data () {
    return {
      number: 0
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
  <InputNumberDispatcher v-model="number" placeholder="请输入内容">
    <template #rwDispatcherRender="{ data }">
      <span style="color: red">{{ data.attrs.value }}</span>
    </template>
  </InputNumberDispatcher>
</template>

<script>
export default {
  data () {
    return {
      number: 0
    }
  }
}
</script>
```
:::

### InputNumber Attributes
<iview-attributes />

### InputNumber Scoped Slots
<iview-scope-slot />

### 其他属性、Slots、Events
与官方 `InputNumber` 的完全一致，[官方组件](https://www.iviewui.com/components/input-number#API)。