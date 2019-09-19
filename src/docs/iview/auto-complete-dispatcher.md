### 基础用法
:::demo
```html
<template>
  <AutoCompleteDispatcher
    v-model="value"
    :data="data"
    placeholder="input here"
    style="width: 200px"
    @on-search="handleSearch"
  />
</template>

<script>
export default {
  data () {
    return {
      value: '',
      data: []
    }
  },
  methods: {
    handleSearch (value) {
      this.data = !value ? [] : [
        value,
        value + value,
        value + value + value
      ]
    }
  }
}
</script>
```
:::

### 自定义选项
:::demo
```html
<template>
  <AutoCompleteDispatcher
    v-model="value"
    placeholder="input here"
    style="width: 200px"
    @on-search="handleSearch"
  >
    <Option v-for="item in data" :value="item" :key="item">{{ item }}</Option>
  </AutoCompleteDispatcher>
</template>

<script>
export default {
  data () {
    return {
      value: '',
      data: []
    }
  },
  methods: {
    handleSearch (value) {
      this.data = !value || value.indexOf('@') >= 0 ? [] : [
        value + '@qq.com',
        value + '@sina.com',
        value + '@163.com'
      ]
    }
  }
}
</script>
```
:::

### 查询模式
:::demo
```html
<template>
  <AutoCompleteDispatcher
    v-model="value"
    icon="ios-search"
    placeholder="input here"
    style="width: 300px"
  >
    <div class="demo-auto-complete-item" v-for="item in data">
      <div class="demo-auto-complete-group">
        <span>{{ item.title }}</span>
        <a href="https://www.google.com/search?q=iView" target="_blank">更多</a>
      </div>
      <Option v-for="option in item.children" :value="option.title" :key="option.title">
        <span class="demo-auto-complete-title">{{ option.title }}</span>
        <span class="demo-auto-complete-count">{{ option.count }} 人关注</span>
      </Option>
    </div>
    <a href="https://www.google.com/search?q=iView" target="_blank" class="demo-auto-complete-more">查看所有结果</a>
  </AutoCompleteDispatcher>
</template>

<script>
export default {
  data () {
    return {
      value: '',
      data: [
        {
          title: '话题',
          children: [
            {
              title: 'iView',
              count: 10000
            },
            {
              title: 'iView UI',
              count: 10600
            }
          ]
        },
        {
          title: '问题',
          children: [
            {
              title: 'iView UI 有多好',
              count: 60100
            },
            {
              title: 'iView 是啥',
              count: 30010
            }
          ]
        },
        {
          title: '文章',
          children: [
            {
              title: 'iView 是一个设计语言',
              count: 100000
            }
          ]
        }
      ]
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
      <AutoCompleteDispatcher
        v-model="value1"
        :data="data1"
        size="large"
        placeholder="large size"
        @on-search="handleSearch1"
      />
    </Col>
    <Col span="8">
      <AutoCompleteDispatcher
        v-model="value2"
        :data="data2"
        placeholder="default size"
        @on-search="handleSearch2"
      />
    </Col>
    <Col span="8">
      <AutoCompleteDispatcher
        v-model="value3"
        :data="data3"
        size="small"
        placeholder="small size"
        @on-search="handleSearch3"
      />
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
      data1: [],
      data2: [],
      data3: []
    }
  },
  methods: {
    handleSearch1 (value) {
      this.data1 = !value || value.indexOf('@') >= 0 ? [] : [
        value + '@qq.com',
        value + '@sina.com',
        value + '@163.com'
      ]
    },
    handleSearch2 (value) {
      this.data2 = !value || value.indexOf('@') >= 0 ? [] : [
        value + '@qq.com',
        value + '@sina.com',
        value + '@163.com'
      ]
    },
    handleSearch3 (value) {
      this.data3 = !value || value.indexOf('@') >= 0 ? [] : [
        value + '@qq.com',
        value + '@sina.com',
        value + '@163.com'
      ]
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
  <Form>
    <FormItem label="活动网站">
      <AutoCompleteDispatcher
        v-model="form.website"
        :rw-dispatcher-state="state"
        clearable
        style="width: 300px"
        @on-search="handleSearch"
      >
        <Option v-for="item in data" :value="item" :key="item">{{ item }}</Option>
      </AutoCompleteDispatcher>
      <Icon :type="icon" style="font-size: 20px" @click="toggleState" />
    </FormItem>
  </Form>
</template>

<script>
export default {
  data () {
    return {
      form: {
        website: ''
      },
      data: [],
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
    },
    handleSearch (value) {
      this.data = !value || value.indexOf('@') >= 0 ? [] : [
        value + '@qq.com',
        value + '@sina.com',
        value + '@163.com'
      ]
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
  <AutoCompleteDispatcher
    v-model="input"
    :data="data"
    :rw-dispatcher-render="readStateRender"
    placeholder="请输入内容"
    style="width: 300px"
    @on-search="handleSearch"
  />
</template>

<script>
export default {
  data () {
    return {
      input: '',
      data: []
    }
  },
  methods: {
    readStateRender (h, context) {
      return h('span', {
        style: { color: 'green' }
      }, context.data.attrs.value)
    },
    handleSearch (value) {
      this.data = !value ? [] : [
        value,
        value + value,
        value + value + value
      ]
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
  <AutoCompleteDispatcher
    v-model="input"
    :data="data"
    placeholder="请输入内容"
    style="width: 300px"
    @on-search="handleSearch"
  >
    <template #rwDispatcherRender="{ data }">
      <span style="color: red">{{ data.attrs.value }}</span>
    </template>
  </AutoCompleteDispatcher>
</template>

<script>
export default {
  data () {
    return {
      input: '',
      data: []
    }
  },
  methods: {
    handleSearch (value) {
      this.data = !value ? [] : [
        value,
        value + value,
        value + value + value
      ]
    }
  }
}
</script>
```
:::

### AutoComplete Attributes
<iview-attributes />

### AutoComplete Scoped Slots
<iview-scope-slot />