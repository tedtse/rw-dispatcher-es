### 基础用法
:::demo
```html
<template>
  <div style="padding: 0 20px">
    <SliderDispatcher v-model="value1" />
    <SliderDispatcher v-model="value2" range />
  </div>
</template>

<script>
  export default {
    data () {
      return {
        value1: 25,
        value2: [20, 50]
      }
    }
  }
</script>
```
:::

### 自定义提示
:::demo
```html
<template>
  <div style="padding: 0 20px">
    <SliderDispatcher v-model="value1" :tip-format="format" />
    <SliderDispatcher v-model="value2" :tip-format="format" range />
  </div>
</template>

<script>
export default {
  data () {
    return {
      value1: 25,
      value2: [20, 50]
    }
  },
  methods: {
    format (val) {
      return 'Progress: ' + val + '%'
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
  <SliderDispatcher
    v-model="values"
    rw-dispatcher-range-separator="to"
    range
    style="padding: 0 20px"
  />
</template>

<script>
export default {
  data () {
    return {
      values: [20, 50]
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
  <div style="padding: 0 20px">
    <SliderDispatcher v-model="progress" :rw-dispatcher-state="state" />
    <Icon :type="icon" style="font-size: 20px" @click="toggleState" />
  </div>
</template>

<script>
export default {
  data () {
    return {
      progress: 25,
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
  <SliderDispatcher
    v-model="progress"
    :rw-dispatcher-render="readStateRender"
    placeholder="请输入内容"
    style="padding: 0 20px"
  />
</template>

<script>
export default {
  data () {
    return {
      progress: 40
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
:::demo 通过 `#${namespace}Render`（cabelCase）或 `v-slot:${namespace}Render`（cabelCase）自定义 read 状态的渲染函数。
```html
<template>
  <SliderDispatcher
    v-model="progress"
    placeholder="请输入内容"
    style="padding: 0 20px"
  >
    <template #rwDispatcherRender="{ data }">
      <span style="color: red">{{ data.attrs.value }}</span>
    </template>
  </SliderDispatcher>
</template>

<script>
export default {
  data () {
    return {
      progress: 67
    }
  }
}
</script>
```
:::

### Slider Attributes
<iview-attributes>
  <template #append>
    <tr>
      <td>${namespace}-range-separator<br />（默认 rw-dispatcher-range-separator）</td>
      <td>自定义连接符</td>
      <td>String</td>
      <td>-</td>
    </tr>
  </template>
</iview-attributes>

### Slider Scoped Slots
<iview-scope-slot />
