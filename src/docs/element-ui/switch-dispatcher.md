### 基础用法
:::demo
```html
<template>
  <el-switch-dispatcher v-model="toggle" />
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

### 文字描述
:::demo
```html
<template>
  <el-switch-dispatcher
    v-model="value1"
    active-text="按月付费"
    inactive-text="按年付费"
  />
  <el-switch-dispatcher
    style="display: block"
    v-model="value2"
    active-color="#13ce66"
    inactive-color="#ff4949"
    active-text="按月付费"
    inactive-text="按年付费"
  />
</template>

<script>
export default {
  data () {
    return {
      value1: true,
      value2: true
    }
  }
}
</script>
```
:::

### 扩展的 value 类型
:::demo
```html
<el-tooltip :content="'Switch value: ' + value" placement="top">
  <el-switch-dispatcher
    v-model="value"
    active-color="#13ce66"
    inactive-color="#ff4949"
    active-value="100"
    inactive-value="0"
  />
</el-tooltip>

<script>
export default {
  data () {
    return {
      value: '100'
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
  <el-form>
    <el-form-item label="即时配送">
      <el-switch-dispatcher
        v-model="form.delivery"
        :rw-dispatcher-state="state"
        style="width: 300px; margin: 0"
      />
      <el-button
        type="text"
        :icon="icon"
        @click="toggleState"
      />
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  data () {
    return {
      form: {
        delivery: true
      },
      state: 'write',
      icon: 'el-icon-view'
    }
  },
  methods: {
    toggleState () {
      if (this.state === 'write') {
        this.state = 'read'
        this.icon = 'el-icon-edit'
      } else {
        this.state = 'write'
        this.icon = 'el-icon-view'
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
  <el-switch-dispatcher v-model="toggle" :rw-dispatcher-render="switchRender" />
</template>

<script>
export default {
  data () {
    return {
      toggle: true
    }
  },
  methods: {
    switchRender (h, context) {
      const { value } = context.data.attrs
      return h('span', {
        style: { color: 'green' }
      }, value ? '开' : '关')
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
  <el-switch-dispatcher v-model="toggle">
    <template #rwDispatcherRender="{ data }">
      <span style="color: red">
        {{ data.attrs.value ? '开' : '关' }}
      </span>
    </template>
  </el-switch-dispatcher>
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

### Attributes
<element-attributes />

### Scoped Slots
<element-scope-slot />
