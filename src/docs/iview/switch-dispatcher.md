### 基本用法
:::demo
```html
<template>
  <SwitchDispatcher v-model="value" />
</template>

<script>
export default {
  data () {
    return {
      value: false
    }  
  }
}
</script>
```
:::

### 文字和图标
:::demo
```html
<template>
  <SwitchDispatcher v-model="value1">
    <template #open>开</template>
    <template #close>关</template>
  </SwitchDispatcher>
  <SwitchDispatcher v-model="value2">
    <template #open>
      <Icon type="md-checkmark" />
    </template>
    <template #close>
      <Icon type="md-close" />
    </template>
  </SwitchDispatcher>
  <br><br>
  <SwitchDispatcher v-model="value3" size="large">
    <template #open>开启</template>
    <template #close>关闭</template>
  </SwitchDispatcher>
  <SwitchDispatcher v-model="value4" size="large">
    <template #open>ON</template>
    <template #close>OFF</template>
  </SwitchDispatcher>
</template>

<script>
export default {
  data () {
    return {
      value1: false,
      value2: false,
      value3: false,
      value4: false,
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
  <Row style="width: 100%">
    <Col span="8">
      <SwitchDispatcher v-model="toggle1" size="large" />
    </Col>
    <Col span="8">
      <SwitchDispatcher v-model="toggle2" />
    </Col>
    <Col span="8">
      <SwitchDispatcher v-model="toggle3" size="small" />
    </Col>
  </Row>
</template>

<script>
export default {
  data () {
    return {
      toggle1: true,
      toggle2: true,
      toggle3: true
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
    <FormItem label="是否配送">
      <SwitchDispatcher v-model="form.deliver" :rw-dispatcher-state="state" />
      <Icon :type="icon" style="font-size: 20px" @click="toggleState" />
    </FormItem>
  </Form>
</template>

<script>
export default {
  data () {
    return {
      form: {
        deliver: false
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
  <SwitchDispatcher
    v-model="toggle"
    :rw-dispatcher-render="readStateRender"
    placeholder="请输入内容"
  />
</template>

<script>
export default {
  data () {
    return {
      toggle: true
    }
  },
  methods: {
    readStateRender (h, context) {
      return h('span', {
        style: { color: 'green' }
      }, context.data.attrs.value ? 'Yes' : 'No')
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
  <SwitchDispatcher v-model="toggle" placeholder="请输入内容">
    <template #rwDispatcherRender="{ data }">
      <span style="color: red">{{ data.attrs.value ? 'Yes' : 'No' }}</span>
    </template>
  </SwitchDispatcher>
</template>

<script>
export default {
  data () {
    return {
      toggle: true
    }
  }
}
</script>
```
:::

### Switch Attributes
<iview-attributes>
  <template #append>
    <!-- <tr>
      <td>${namespace}-trueValue<br />（默认 rw-dispatcher-trueValue</td>
      <td>"read" 状态下 Switch 为真时的文字提示</td>
      <td>String</td>
      <td>是</td>
    </tr>
    <tr>
      <td>${namespace}-falseValue<br />（默认 rw-dispatcher-falseValue）</td>
      <td>"read" 状态下 Switch 为假时的文字提示</td>
      <td>String</td>
      <td>否</td>
    </tr> -->
  </template>
</iview-attributes>

### Switch Scoped Slots
<iview-scope-slot />

### 其他属性、Slots、Events
与官方 `Switch` 的完全一致，[官方组件](https://www.iviewui.com/components/switch#API)。