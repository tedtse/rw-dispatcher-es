### 基础用法
:::demo
```html
<template>
  <div class="block">
    <span class="demonstration">默认</span>
    <el-slider-dispatcher v-model="value1" />
  </div>
  <div class="block">
    <span class="demonstration">自定义初始值</span>
    <el-slider-dispatcher v-model="value2" />
  </div>
  <div class="block">
    <span class="demonstration">隐藏 Tooltip</span>
    <el-slider-dispatcher v-model="value3" :show-tooltip="false" />
  </div>
  <div class="block">
    <span class="demonstration">格式化 Tooltip</span>
    <el-slider-dispatcher v-model="value4" :format-tooltip="formatTooltip" />
  </div>
</template>

<script>
export default {
  data () {
    return {
      value1: 0,
      value2: 50,
      value3: 36,
      value4: 48
    }
  },
  methods: {
    formatTooltip(val) {
      return val / 100
    }
  }
}
</script>
```
:::

### 范围选择
:::demo
```html
<template>
  <div class="block">
    <el-slider-dispatcher
      v-model="value1"
      range
      show-stops
      :max="10"
    />
  </div>
  <div class="block">
    <el-slider-dispatcher
      v-model="value2"
      range
      :marks="marks"
    />
  </div>
</template>

<script>
export default {
  data () {
    return {
      value1: [4, 8],
      value2: [30, 60],
      marks: {
        0: '0°C',
        8: '8°C',
        37: '37°C',
        50: {
          style: {
            color: '#1989FA'
          },
          label: this.$createElement('strong', '50%')
        }
      }
    }
  }
}
</script>
```
:::

### 连接符
:::demo 自定义连接符，优先级高于局部配置和全局配置。
```html
<template>
  <div class="block">
    <el-slider-dispatcher
      v-model="value"
      rw-dispatcher-range-separator="to"
      range
      show-stops
      :max="10"
    />
  </div>
</template>

<script>
export default {
  data () {
    return {
      value: [4, 8]
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
  <div class="block">
    <el-slider-dispatcher
      v-model="range"
      range
      :rw-dispatcher-state="state"
    />
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
      range: [0, 10],
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
  <div class="block">
    <el-slider-dispatcher v-model="value" :rw-dispatcher-render="sliderRender" />
  </div>
</template>

<script>
export default {
  data () {
    return {
      value: 0
    }
  },
  methods: {
    sliderRender (h, context) {
      const { value } = context.data.attrs
      return h('span', {
        style: { color: 'green' }
      }, value)
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
  <div class="block">
    <el-slider-dispatcher v-model="value">
      <template #rwDispatcherRender="{ data }">
        <span style="color: red">
          {{ data.attrs.value }}
        </span>
      </template>
    </el-slider-dispatcher>
  </div>
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
<element-attributes>
  <template #append>
    <tr>
      <td>${namespace}-range-separator<br />（默认 rw-dispatcher-range-separator</td>
      <td>自定义连接符</td>
      <td>String</td>
      <td>-</td>
    </tr>
  </template>
</element-attributes>

### Scoped Slots
<element-scope-slot />

### 其他属性、Slots、Events
与官方 `ElSlider` 的完全一致，[官方组件](https://element.eleme.cn/#/zh-CN/component/slider#attributes)。