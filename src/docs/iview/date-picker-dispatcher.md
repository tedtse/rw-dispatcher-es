### 基础用法
:::demo
```html
<template>
  <Row style="width: 100%">
    <Col span="12">
      <DatePickerDispatcher v-model="value1" placeholder="Select date" />
    </Col>
    <Col span="12">
      <DatePickerDispatcher type="daterange" v-model="value2" placement="bottom-end" placeholder="Select date" />
    </Col>
  </Row>
</template>

<script>
export default {
  data () {
    return {
      value1: '',
      value2: ''
    }
  }
}
</script>
```
:::

### 多选
:::demo
```html
<template>
  <DatePickerDispatcher type="date" v-model="value" multiple placeholder="Select date" />
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

### 日期格式
:::demo
```html
<template>
  <Row style="width: 100%">
    <Col span="12">
      <DatePickerDispatcher v-model="value1" format="yyyy年MM月dd日" type="date" placeholder="Select date" />
    </Col>
    <Col span="12">
      <DatePickerDispatcher v-model="value2" format="yyyy/MM/dd" type="daterange" placement="bottom-end" placeholder="Select date" />
    </Col>
  </Row>
</template>

<script>
export default {
  data () {
    return {
        value1: '2016-01-01',
        value2: ['2016-01-01', '2016-02-15']
    }
  }
}
</script>
```
:::

### 年和月
:::demo
```html
<template>
  <Row style="width: 100%">
    <Col span="12">
      <DatePickerDispatcher type="year" v-model="value1" placeholder="Select year" />
    </Col>
    <Col span="12">
      <DatePickerDispatcher type="month" v-model="value2" placeholder="Select month" />
    </Col>
  </Row>
</template>

<script>
export default {
  data () {
    return {
      value1: '',
      value2: ''
    }
  }
}
</script>
```
:::

### 日期时间选择
:::demo
```html
<template>
  <Row style="width: 100%">
    <Col span="12">
      <DatePickerDispatcher type="datetime" v-model="value1" placeholder="Select date and time" />
    </Col>
    <Col span="12">
      <DatePickerDispatcher type="datetime" v-model="value2" format="yyyy-MM-dd HH:mm" placeholder="Select date and time(Excluding seconds)" />
    </Col>
    <Col span="12">
      <DatePickerDispatcher type="datetimerange" v-model="value3" placeholder="Select date and time" />
    </Col>
    <Col span="12">
      <DatePickerDispatcher type="datetimerange" v-model="value4" format="yyyy-MM-dd HH:mm" placeholder="Select date and time(Excluding seconds)" />
    </Col>
  </Row>
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

### 分隔符
:::demo 自定义分隔符，配合属性 multiple 使用。优先级高于局部配置和全局配置。
```html
<template>
  <DatePickerDispatcher
    type="date"
    v-model="value"
    rw-dispatcher-separator="and"
    multiple
    placeholder="Select date"
  />
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

### 连接符
:::demo 自定义连接符，配合属性 type="daterange" 使用。优先级高于局部配置和全局配置。
```html
<template>
  <DatePickerDispatcher
    v-model="date"
    rw-dispatcher-range-separator="to"
    format="yyyy/MM/dd"
    type="daterange"
    placement="bottom-end"
    placeholder="Select date"
  />
</template>

<script>
export default {
  data () {
    return {
      date: []
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
      <DatePickerDispatcher v-model="date1" size="large" placeholder="large size" />
    </Col>
    <Col span="8">
      <DatePickerDispatcher v-model="date2" placeholder="default size" />
    </Col>
    <Col span="8">
      <DatePickerDispatcher v-model="date3" size="small" placeholder="small size" />
    </Col>
  </Row>
</template>

<script>
export default {
  data () {
    return {
      date1: '',
      date2: '',
      date3: ''
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
  <Form :model="form" :label-width="80">
    <FormItem label="活动日期">
      <DatePickerDispatcher
        v-model="form.date"
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
        date: ''
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
  <DatePickerDispatcher
    v-model="date"
    :rw-dispatcher-render="readStateRender"
    placeholder="请输入内容"
  />
</template>

<script>
export default {
  data () {
    return {
      date: ''
    }
  },
  methods: {
    readStateRender (h, context) {
      return h('span', {
        style: { color: 'green' }
      }, this.dateFormat(context.data))
    },
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

### 自定义渲染函数 — slot
:::demo 通过 `#${namespace}Render`（cabelCase） 或 `v-slot:${namespace}Render`（cabelCase） 自定义 read 状态的渲染函数。
```html
<template>
  <DatePickerDispatcher v-model="date" placeholder="请输入内容">
    <template #rwDispatcherRender="{ data }">
      <span style="color: red">{{ dateFormat(data) }}</span>
    </template>
  </DatePickerDispatcher>
</template>

<script>
export default {
  data () {
    return {
      date: ''
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

### DatePicker Attributes
<iview-attributes>
  <template #append>
    <tr>
      <td>${namespace}-separator<br />（默认 rw-dispatcher-separator）</td>
      <td>自定义分隔符。与属性 multiple 配合使用</td>
      <td>String</td>
      <td>|</td>
    </tr>
    <tr>
      <td>${namespace}-range-separator<br />（默认 rw-dispatcher-range-separator）</td>
      <td>自定义连接符。与属性 type="daterange" 配合使用</td>
      <td>String</td>
      <td>-</td>
    </tr>
  </template>
</iview-attributes>

### DatePicker Scoped Slots
<iview-scope-slot />

### 其他属性、Slots、Events
与官方 `DatePicker` 的完全一致，[官方组件](https://www.iviewui.com/components/date-picker#API)。