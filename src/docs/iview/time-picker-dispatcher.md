### 基础用法
:::demo
```html
<template>
  <Row>
    <Col span="12">
      <TimePickerDispatcher type="time" v-model="value1" placeholder="Select time" />
    </Col>
    <Col span="12">
      <TimePickerDispatcher type="timerange" v-model="value2" placement="bottom-end" placeholder="Select time" />
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

### 时间格式
:::demo
```html
<template>
  <Row>
    <Col span="12">
      <TimePickerDispatcher v-model="value1" format="HH点mm分ss秒" placeholder="Select time" />
    </Col>
    <Col span="12">
      <TimePickerDispatcher v-model="value2" format="HH’mm’ss" type="timerange" placement="bottom-end" placeholder="Select time" />
    </Col>
  </Row>
</template>

<script>
export default {
  data () {
    return {
      value1: '09:41:00',
      value2: ['09:41:00', '12:00:00']
    }
  }
}
</script>
```
:::

### 选择时分
:::demo
```html
<template>
  <Row>
    <Col span="12">
      <TimePickerDispatcher v-model="value1" format="HH:mm" placeholder="Select time" />
    </Col>
    <Col span="12">
      <TimePickerDispatcher v-model="value2" format="HH:mm" type="timerange" placement="bottom-end" placeholder="Select time" />
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

### 连接符
:::demo 自定义连接符，配合属性 type="daterange" 使用。优先级高于局部配置和全局配置。
```html
<template>
  <TimePickerDispatcher
    v-model="time"
    rw-dispatcher-range-separator="to"
    format="HH’mm’ss"
    type="timerange"
    placement="bottom-end"
    placeholder="Select time"
  />
</template>

<script>
export default {
  data () {
    return {
      time: []
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
      <TimePickerDispatcher v-model="time1" size="large" placeholder="large size" />
    </Col>
    <Col span="8">
      <TimePickerDispatcher v-model="time2" placeholder="default size" />
    </Col>
    <Col span="8">
      <TimePickerDispatcher v-model="time3" size="small" placeholder="small size" />
    </Col>
  </Row>
</template>

<script>
export default {
  data () {
    return {
      time1: '',
      time2: '',
      time3: ''
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
    <FormItem label="活动时间">
      <TimePickerDispatcher
        v-model="form.time"
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
        time: ''
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
  <TimePickerDispatcher
    v-model="time"
    :rw-dispatcher-render="readStateRender"
    placeholder="请输入内容"
  />
</template>

<script>
export default {
  data () {
    return {
      time: ''
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
  <TimePickerDispatcher v-model="time" placeholder="请输入内容">
    <template #rwDispatcherRender="{ data }">
      <span style="color: red">{{ data.attrs.value }}</span>
    </template>
  </TimePickerDispatcher>
</template>

<script>
export default {
  data () {
    return {
      time: ''
    }
  }
}
</script>
```
:::

### TimePicker Attributes
<iview-attributes>
  <template #append>
    <tr>
      <td>${namespace}-range-separator<br />（默认 rw-dispatcher-range-separator）</td>
      <td>自定义连接符。与属性 type="timerange" 配合使用</td>
      <td>String</td>
      <td>-</td>
    </tr>
  </template>
</iview-attributes>

### TimePicker Scoped Slots
<iview-scope-slot />
