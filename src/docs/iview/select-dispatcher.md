### 基础用法
:::demo
```html
<template>
  <SelectDispatcher v-model="model" style="width: 200px">
    <Option v-for="item in cityList" :value="item.value" :key="item.value">
      {{ item.label }}
    </Option>
  </SelectDispatcher>
</template>

<script>
export default {
  data () {
    return {
      cityList: [
        {
          value: 'New York',
          label: '纽约'
        },
        {
          value: 'London',
          label: '伦敦'
        },
        {
          value: 'Sydney',
          label: '悉尼'
        },
        {
          value: 'Ottawa',
          label: '渥太华'
        },
        {
          value: 'Paris',
          label: '巴黎'
        },
        {
          value: 'Canberra',
          label: '堪培拉'
        }
      ],
      model: ''
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
  <SelectDispatcher v-model="model" multiple style="width: 260px">
    <Option v-for="item in cityList" :value="item.value" :key="item.value">
      {{ item.label }}
    </Option>
  </SelectDispatcher>
</template>

<script>
export default {
  data () {
    return {
      cityList: [
        {
          value: 'New York',
          label: '纽约'
        },
        {
          value: 'London',
          label: '伦敦'
        },
        {
          value: 'Sydney',
          label: '悉尼'
        },
        {
          value: 'Ottawa',
          label: '渥太华'
        },
        {
          value: 'Paris',
          label: '巴黎'
        },
        {
          value: 'Canberra',
          label: '堪培拉'
        }
      ],
      model: []
    }
  }
}
</script>
```
:::

### 分组
:::demo
```html
<template>
  <SelectDispatcher v-model="model" style="width: 200px">
    <OptionGroup label="Hot Cities">
      <Option v-for="item in cityList1" :value="item.value" :key="item.value">
        {{ item.label }}
      </Option>
    </OptionGroup>
    <OptionGroup label="Other Cities">
      <Option v-for="item in cityList2" :value="item.value" :key="item.value">
        {{ item.label }}
      </Option>
    </OptionGroup>
  </SelectDispatcher>
</template>

<script>
export default {
  data () {
    return {
      cityList1: [
        {
          value: 'New York',
          label: '纽约'
        },
        {
          value: 'London',
          label: '伦敦'
        },
        {
          value: 'Sydney',
          label: '悉尼'
        }
      ],
      cityList2: [
        {
          value: 'Ottawa',
          label: '渥太华'
        },
        {
          value: 'Paris',
          label: '巴黎'
        },
        {
          value: 'Canberra',
          label: '堪培拉'
        }
      ],
      model: ''
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
      <SelectDispatcher v-model="model2" size="small" style="width:100px">
        <Option v-for="item in cityList" :value="item.value" :key="item.value">
          {{ item.label }}
        </Option>
      </SelectDispatcher>
    </Col>
    <Col span="8">
      <SelectDispatcher v-model="model3" style="width:100px">
        <Option v-for="item in cityList" :value="item.value" :key="item.value">
          {{ item.label }}
        </Option>
      </SelectDispatcher>
    </Col>
    <Col span="8">
      <SelectDispatcher v-model="model4" size="large" style="width:100px">
        <Option v-for="item in cityList" :value="item.value" :key="item.value">
          {{ item.label }}
        </Option>
      </SelectDispatcher>
    </Col>
  </Row>
</template>

<script>
export default {
  data () {
    return {
      cityList: [
        {
          value: 'New York',
          label: 'New York'
        },
        {
          value: 'London',
          label: 'London'
        },
        {
          value: 'Sydney',
          label: 'Sydney'
        },
        {
          value: 'Ottawa',
          label: 'Ottawa'
        },
        {
          value: 'Paris',
          label: 'Paris'
        },
        {
          value: 'Canberra',
          label: 'Canberra'
        }
      ],
      model2: '',
      model3: '',
      model4: ''
    }
  }
}
</script>
```
:::

### 自定义模板
:::demo
```html
<template>
  <SelectDispatcher v-model="model" style="width: 200px">
    <Option value="New York" label="New York">
      <span>New York</span>
      <span style="float: right; color: #ccc">America</span>
    </Option>
    <Option value="London" label="London">
      <span>London</span>
      <span style="float: right; color: #ccc">U.K.</span>
    </Option>
    <Option value="Sydney" label="Sydney">
      <span>Sydney</span>
      <span style="float: right; color: #ccc">Australian</span>
    </Option>
  </SelectDispatcher>
</template>

<script>
export default {
  data () {
    return {
      model: ''
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
  <SelectDispatcher
    v-model="model"
    rw-dispatcher-separator="and"
    multiple
    style="width: 260px"
  >
    <Option v-for="item in cityList" :value="item.value" :key="item.value">
      {{ item.label }}
    </Option>
  </SelectDispatcher>
</template>

<script>
export default {
  data () {
    return {
      cityList: [
        {
          value: 'New York',
          label: '纽约'
        },
        {
          value: 'London',
          label: '伦敦'
        },
        {
          value: 'Sydney',
          label: '悉尼'
        },
        {
          value: 'Ottawa',
          label: '渥太华'
        },
        {
          value: 'Paris',
          label: '巴黎'
        },
        {
          value: 'Canberra',
          label: '堪培拉'
        }
      ],
      model: []
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
    <FormItem label="城市">
      <SelectDispatcher
        v-model="form.select"
        :rw-dispatcher-state="state"
        style="width: 300px"
      >
        <Option value="New York">New York</Option>
        <Option value="London">London</Option>
        <Option value="Sydney">Sydney</Option>
      </SelectDispatcher>
      <Icon :type="icon" style="font-size: 20px" @click="toggleState" />
    </FormItem>
  </Form>
</template>

<script>
export default {
  data () {
    return {
      form: {
        select: ''
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
  <SelectDispatcher
    v-model="value"
    :rw-dispatcher-render="readStateRender"
    style="width: 300px"
  >
    <Option value="New York">New York</Option>
    <Option value="London">London</Option>
    <Option value="Sydney">Sydney</Option>
  </SelectDispatcher>
</template>

<script>
export default {
  data () {
    return {
      value: ''
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
  <SelectDispatcher v-model="value" style="width: 300px">
    <template #rwDispatcherRender="{ data }">
      <span style="color: red">{{ data.attrs.value }}</span>
    </template>
    <Option value="New York">New York</Option>
    <Option value="London">London</Option>
    <Option value="Sydney">Sydney</Option>
  </SelectDispatcher>
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

### Select Attributes
<iview-attributes>
  <template #append>
    <tr>
      <td>${namespace}-separator<br />（默认 rw-dispatcher-separator）</td>
      <td>自定义分隔符</td>
      <td>String</td>
      <td>|</td>
    </tr>
  </template>
</iview-attributes>

### Select Scoped Slots
<iview-scope-slot />

### 其他属性、Slots、Events
与官方 `Select` 的完全一致，[官方组件](https://www.iviewui.com/components/select#API)。