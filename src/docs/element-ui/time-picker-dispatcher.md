### 任意时间点
:::demo
```html
<template>
  <el-time-picker-dispatcher
    arrow-control
    v-model="value"
    :picker-options="pickerOptions"
    placeholder="任意时间点"
  />
</template>

<script>
export default {
  data () {
    return {
      value: new Date(2016, 9, 10, 18, 40),
      pickerOptions: {
        selectableRange: '18:30:00 - 20:30:00'
      }
    }
  }
}
</script>
```
:::

### 固定时间范围
:::demo
```html
<template>
  <el-time-select-dispatcher
    placeholder="起始时间"
    v-model="startTime"
    :picker-options="pickerOptions"
  />
</template>

<script>
export default {
  data () {
    return {
      startTime: '',
      pickerOptions: {
        start: '08:30',
        step: '00:15',
        end: '18:30'
      }
    }
  }
}
</script>
```
:::

### 连接符
:::demo 自定义连接符，优先级高于局部配置和全局配置，但是低于 ElTimePicker 的 range-separator。
```html
<template>
  <el-time-picker-dispatcher
    is-range
    v-model="value"
    rw-dispatcher-range-separator="to"
    start-placeholder="开始时间"
    end-placeholder="结束时间"
    placeholder="选择时间范围"
  />
</template>

<script>
export default {
  data () {
    return {
      value: [new Date(2016, 9, 10, 8, 40), new Date(2016, 9, 10, 9, 40)]
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
  <div style="width: 100%">
    <el-row :gutter="10">
      <el-col :span="12">
        <el-time-picker-dispatcher
          v-model="value1"
          placeholder="任意时间点"
        />
      </el-col>
      <el-col :span="12">
        <el-time-picker-dispatcher
          v-model="value2"
          size="medium"
          placeholder="任意时间点"
        />
      </el-col>
    </el-row>
    <el-row :gutter="10" style="margin-top: 20px">
      <el-col :span="12">
        <el-time-picker-dispatcher
          v-model="value3"
          size="small"
          placeholder="任意时间点"
        />
      </el-col>
      <el-col :span="12">
        <el-time-picker-dispatcher
          v-model="value4"
          size="mini"
          placeholder="任意时间点"
        />
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data () {
    return {
      value1: '',
      value2: '',
      value3: '',
      value4: ''
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
    <el-time-picker-dispatcher
      v-model="time"
      :rw-dispatcher-state="state"
      style="width: 300px"
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
      time: new Date(2019, 6, 18, 0, 0, 0),
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
:::demo
```html
<template>
  <el-time-picker-dispatcher
    arrow-control
    v-model="value"
    placeholder="任意时间点"
    :rw-dispatcher-render="timePickerRender"
  />
  <el-time-select-dispatcher
    v-model="startTime"
    placeholder="起始时间"
    :rw-dispatcher-render="timeSelectRender"
  />
</template>

<script>
export default {
  data () {
    return {
      value: new Date(2016, 9, 10, 18, 40),
      startTime: ''
    }
  },
  methods: {
    timePickerRender (h, context) {
      const { value } = context.data.attrs
      return h('span', {
        style: { color: 'green' }
      }, value.getHours() + '时' + value.getMinutes() + '分' + value.getSeconds() + '秒')
    },
    timeSelectRender (h, context) {
      const { value } = context.data.attrs
      const matches = value.split(':')
      return h('span', {
        style: { color: 'green' }
      }, matches.length >= 2 ? (matches[0] + '分' + matches[1] + '秒'): '')
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
  <el-time-picker-dispatcher
    arrow-control
    v-model="value"
    placeholder="任意时间点"
  >
    <template #rwDispatcherRender="{ data }">
      <span style="color: red">{{ timePickerFormat(data) }}</span>
    </template>
  </el-time-picker-dispatcher>
  <el-time-select-dispatcher v-model="startTime" placeholder="起始时间">
    <template #rwDispatcherRender="{ data }">
      <span style="color: red">{{ timeSelectFormat(data) }}</span>
    </template>
  </el-time-select-dispatcher>
</template>

<script>
export default {
  data () {
    return {
      value: new Date(2016, 9, 10, 18, 40),
      startTime: ''
    }
  },
  methods: {
    timePickerFormat (data) {
      const { value } = data.attrs
      return value.getHours() + '时' + value.getMinutes() + '分' + value.getSeconds() + '秒'
    },
    timeSelectFormat (data) {
      const { value } = data.attrs
      const matches = value.split(':')
      return matches.length >= 2 ? (matches[0] + '分' + matches[1] + '秒'): ''
    }
  }
}
</script>
```
:::

### TimePicker Attributes
<element-attributes>
  <template #append>
    <tr>
      <td>${namespace}-separator<br />（默认 rw-dispatcher-separator）</td>
      <td>
        自定义连接符。与 is-range 配合使用。
        连接符共四个地方配置，分别是组件配置 separator|${namespace}-separator、局部配置、全局配置。
        优先级是组件配置 separator > 组件配置 ${namespace}-separator > 局部配置 > 全局配置
      </td>
      <td>String</td>
      <td>|</td>
    </tr>
  </template>
</element-attributes>

### TimePicker Scoped Slots
<element-scope-slot />

### TimeSelect Attributes
<element-attributes />

### TimeSelect Scoped Slots
<element-scope-slot />

### 其他属性、Slots、Events
与官方 `ElTimePicker` 的完全一致，[官方组件](https://element.eleme.cn/#/zh-CN/component/time-picker#attributes)。