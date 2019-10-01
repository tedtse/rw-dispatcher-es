### 基础用法
:::demo
```html
<template>
  <div class="block">
    <span class="demonstration">默认不区分颜色</span>
    <el-rate-dispatcher v-model="value1" />
  </div>
  <div class="block">
    <span class="demonstration">区分颜色</span>
    <el-rate-dispatcher v-model="value2" :colors="colors" />
  </div>
</template>

<script>
export default {
  data () {
    return {
      value1: null,
      value2: null,
      colors: ['#99A9BF', '#F7BA2A', '#FF9900']  // 等同于 { 2: '#99A9BF', 4: { value: '#F7BA2A', excluded: true }, 5: '#FF9900' }
    }
  }
}
</script>
```
:::

### 辅助文字
:::demo
```html
<template>
  <el-rate-dispatcher v-model="value" show-text />
</template>

<script>
export default {
  data () {
    return {
      value: null
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
  <div>
    <el-rate-dispatcher v-model="rate" :rw-dispatcher-state="state" />
    <el-button
      type="text"
      :icon="icon"
      @click="toggleState"
    />
  </div>
</template>

<script>
export default {
  data () {
    return {
      rate: 3,
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
  <el-rate-dispatcher v-model="value" :rw-dispatcher-render="rateRender" />
</template>

<script>
export default {
  data () {
    return {
      value: null
    }
  },
  methods: {
    rateRender (h, context) {
      const { value } = context.data.attrs
      return h('span', {
        style: { color: 'green' }
      }, value + '颗星')
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
  <el-rate-dispatcher v-model="value">
    <template #rwDispatcherRender="{ data }">
      <span style="color: red">
        {{ data.attrs.value }}颗星
      </span>
    </template>
  </el-rate-dispatcher>
</template>

<script>
export default {
  data () {
    return {
      value: null
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
