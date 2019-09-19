### 选择日
:::demo
```html
<template>
  <div class="block">
    <span class="demonstration">默认</span>
    <el-date-picker-dispatcher
      v-model="value"
      type="date"
      placeholder="选择日期"
    />
  </div>
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

### 其他日期单位
:::demo
```html
<div class="container">
  <div class="block">
    <span class="demonstration">周</span>
    <el-date-picker-dispatcher
      v-model="value1"
      type="week"
      format="yyyy 第 WW 周"
      placeholder="选择周"
    />
  </div>
  <div class="block">
    <span class="demonstration">月</span>
    <el-date-picker-dispatcher
      v-model="value2"
      type="month"
      placeholder="选择月"
    />
  </div>
</div>
<div class="container">
  <div class="block">
    <span class="demonstration">年</span>
    <el-date-picker-dispatcher
      v-model="value3"
      type="year"
      placeholder="选择年"
    />
  </div>
  <div class="block">
    <span class="demonstration">多个日期</span>
    <el-date-picker-dispatcher
      type="dates"
      v-model="value4"
      placeholder="选择一个或多个日期"
    />
  </div>
</div>

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

### 选择日期范围
:::demo
```html
<template>
  <div class="block">
    <span class="demonstration">默认</span>
    <el-date-picker-dispatcher
      v-model="value"
      type="daterange"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
    />
  </div>
</template>

<script>
export default {
  data () {
    return {
      value: []
    }
  }
}
</script>
```
:::

### 选择月份范围
:::demo
```html
<template>
  <div class="block">
    <span class="demonstration">默认</span>
    <el-date-picker-dispatcher
      v-model="value"
      type="monthrange"
      range-separator="至"
      start-placeholder="开始月份"
      end-placeholder="结束月份"
    />
  </div>
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

### 日期和时间点
:::demo
```html
<template>
  <div class="block">
    <span class="demonstration">默认</span>
    <el-date-picker-dispatcher
      v-model="value1"
      type="datetime"
      placeholder="选择日期时间"
    />
  </div>
  <div class="block">
    <span class="demonstration">带快捷选项</span>
    <el-date-picker-dispatcher
      v-model="value2"
      type="datetime"
      placeholder="选择日期时间"
      align="right"
      :picker-options="pickerOptions"
    />
  </div>
  <div class="block">
    <span class="demonstration">设置默认时间</span>
    <el-date-picker-dispatcher
      v-model="value3"
      type="datetime"
      placeholder="选择日期时间"
      default-time="12:00:00"
    />
  </div>
</template>

<script>
export default {
  data () {
    return {
      pickerOptions: {
        shortcuts: [{
          text: '今天',
          onClick (picker) {
            picker.$emit('pick', new Date())
          }
        }, {
          text: '昨天',
          onClick (picker) {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24)
            picker.$emit('pick', date)
          }
        }, {
          text: '一周前',
          onClick (picker) {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', date)
          }
        }]
      },
      value1: '',
      value2: '',
      value3: ''
    }
  }
}
</script>
```
:::

### 连接符
:::demo 自定义连接符，优先级高于局部配置和全局配置，但是低于 ElDatePicker 的 range-separator。
```html
<template>
  <el-date-picker-dispatcher
    v-model="value"
    type="daterange"
    rw-dispatcher-range-separator="to"
  />
</template>

<script>
export default {
  data () {
    return {
      value: []
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
        <el-date-picker-dispatcher
          v-model="value1"
          type="date"
          placeholder="选择日期"
        />
      </el-col>
      <el-col :span="12">
        <el-date-picker-dispatcher
          v-model="value2"
          type="date"
          size="medium"
          placeholder="选择日期"
        />
      </el-col>
    </el-row>
    <el-row :gutter="10" style="margin-top: 20px">
      <el-col :span="12">
        <el-date-picker-dispatcher
          v-model="value3"
          type="date"
          size="small"
          placeholder="选择日期"
        />
      </el-col>
      <el-col :span="12">
        <el-date-picker-dispatcher
          v-model="value4"
          type="date"
          size="mini"
          placeholder="选择日期"
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
    <el-date-picker-dispatcher
      v-model="date"
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
      date: '2019-06-18',
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
    <el-date-picker-dispatcher
      v-model="value"
      type="date"
      placeholder="选择日期"
      :rw-dispatcher-render="datePickerRender"
    />
  </div>
</template>

<script>
export default {
  data () {
    return {
      value: ''
    }
  },
  methods: {
    datePickerRender (h, context) {
      const { value } = context.data.attrs
      const date = new Date(value)
      return h('span', {
        style: { color: 'green' }
      }, date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate())
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
    <el-date-picker-dispatcher
      v-model="value"
      type="date"
      placeholder="选择日期"
    >
      <template #rwDispatcherRender="{ data }">
        <span style="color: red">{{ dateFormat(data) }}</span>
      </template>
    </el-date-picker-dispatcher>
  </div>
</template>

<script>
export default {
  data () {
    return {
      value: ''
    }
  },
  methods: {
    dateFormat (data) {
      const { value } = data.attrs
      const date = new Date(value)
      return date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()
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
      <td>${namespace}-separator<br />（默认 rw-dispatcher-separator）</td>
      <td>
        自定义连接符。与 type="datetimerange|daterange|monthrange" 配合使用。
        连接符共四个地方配置，分别是组件配置 separator|${namespace}-separator、局部配置、全局配置。
        优先级是组件配置 separator > 组件配置 ${namespace}-separator > 局部配置 > 全局配置
      </td>
      <td>String</td>
      <td>|</td>
    </tr>
  </template>
</element-attributes>

### Scoped Slots
<element-scope-slot />
