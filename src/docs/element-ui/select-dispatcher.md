### 基础用法
:::demo
```html
<template>
  <el-select-dispatcher v-model="value" clearable placeholder="请选择">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    />
  </el-select-dispatcher>
</template>

<script>
export default {
  data () {
    return {
      value: '',
      options: [
        {
          value: '选项1',
          label: '黄金糕'
        },
        {
          value: '选项2',
          label: '双皮奶'
        },
        {
          value: '选项3',
          label: '蚵仔煎'
        },
        {
          value: '选项4',
          label: '龙须面'
        },
        {
          value: '选项5',
          label: '北京烤鸭'
        }
      ]
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
  <el-select-dispatcher
    v-model="value"
    multiple
    collapse-tags
    placeholder="请选择"
  >
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    />
  </el-select-dispatcher>
</template>

<script>
export default {
  data () {
    return {
      value: [],
      options: [
        {
          value: '选项1',
          label: '黄金糕'
        },
        {
          value: '选项2',
          label: '双皮奶'
        },
        {
          value: '选项3',
          label: '蚵仔煎'
        },
        {
          value: '选项4',
          label: '龙须面'
        },
        {
          value: '选项5',
          label: '北京烤鸭'
        }
      ]
    }
  }
}
</script>
```
:::

### 自定义模板
::: demo
```html
<template>
  <el-select-dispatcher v-model="value" placeholder="请选择">
    <el-option
      v-for="item in cities"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    >
      <span style="float: left">{{ item.label }}</span>
      <span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span>
    </el-option>
  </el-select-dispatcher>
</template>

<script>
export default {
  data () {
    return {
      value: '',
      cities: [
        {
          value: 'Beijing',
          label: '北京'
        },
        {
          value: 'Shanghai',
          label: '上海'
        },
        {
          value: 'Nanjing',
          label: '南京'
        },
        {
          value: 'Chengdu',
          label: '成都'
        },
        {
          value: 'Shenzhen',
          label: '深圳'
        },
        {
          value: 'Guangzhou',
          label: '广州'
        }
      ]
    }
  }
}
</script>
```
:::

### 分组
::: demo
```html
<template>
  <el-select-dispatcher v-model="value" placeholder="请选择">
    <el-option-group
      v-for="group in groupCities"
      :key="group.label"
      :label="group.label"
    >
      <el-option
        v-for="item in group.options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-option-group>
  </el-select-dispatcher>
</template>

<script>
export default {
  data () {
    return {
      value: '',
      groupCities: [
        {
          label: '热门城市',
          options: [
            {
              value: 'Shanghai',
              label: '上海'
            },
            {
              value: 'Beijing',
              label: '北京'
            }
          ]
        },
        {
          label: '城市名',
          options: [
            {
              value: 'Chengdu',
              label: '成都'
            },
            {
              value: 'Shenzhen',
              label: '深圳'
            },
            {
              value: 'Guangzhou',
              label: '广州'
            },
            {
              value: 'Dalian',
              label: '大连'
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

### 创建条目
::: demo
```html
<template>
  <el-select-dispatcher
    v-model="value"
    multiple
    filterable
    allow-create
    default-first-option
    placeholder="请选择文章标签"
  >
    <el-option
      v-for="item in techStacks"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    />
  </el-select-dispatcher>
</template>

<script>
export default {
  data () {
    return {
      value: [],
      techStacks: [
        {
          value: 'HTML',
          label: 'HTML'
        },
        {
          value: 'CSS',
          label: 'CSS'
        },
        {
          value: 'JavaScript',
          label: 'JavaScript'
        }
      ]
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
  <el-select-dispatcher
    v-model="value"
    rw-dispatcher-separator="and"
    multiple
    collapse-tags
    placeholder="请选择"
  >
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    />
  </el-select-dispatcher>
</template>

<script>
export default {
  data () {
    return {
      value: [],
      options: [
        {
          value: '选项1',
          label: '黄金糕'
        },
        {
          value: '选项2',
          label: '双皮奶'
        },
        {
          value: '选项3',
          label: '蚵仔煎'
        },
        {
          value: '选项4',
          label: '龙须面'
        },
        {
          value: '选项5',
          label: '北京烤鸭'
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
  <div>
    <el-row :gutter="10">
      <el-col :span="12">
        <el-select-dispatcher v-model="value1" clearable placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select-dispatcher>
      </el-col>
      <el-col :span="12">
        <el-select-dispatcher v-model="value2" size="medium" clearable placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select-dispatcher>
      </el-col>
    </el-row>
    <el-row :gutter="10" style="margin-top: 20px">
      <el-col :span="12">
        <el-select-dispatcher v-model="value3" size="small" clearable placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select-dispatcher>
      </el-col>
      <el-col :span="12">
        <el-select-dispatcher v-model="value4" size="mini" clearable placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select-dispatcher>
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
      value4: '',
      options: [
        {
          value: '选项1',
          label: '黄金糕'
        },
        {
          value: '选项2',
          label: '双皮奶'
        },
        {
          value: '选项3',
          label: '蚵仔煎'
        },
        {
          value: '选项4',
          label: '龙须面'
        },
        {
          value: '选项5',
          label: '北京烤鸭'
        }
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
  <el-form>
    <el-form-item label="活动区域">
      <el-select-dispatcher
        v-model="form.region"
        :rw-dispatcher-state="state"
        style="width: 300px"
        placeholder="请选择活动区域"
      >
        <el-option label="区域一" value="shanghai" />
        <el-option label="区域二" value="beijing" />
      </el-select-dispatcher>
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
        region: 'shanghai'
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
  <el-select-dispatcher
    v-model="value"
    :rw-dispatcher-render="readStateRender"
    clearable
    multiple
    placeholder="请选择"
  >
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    />
  </el-select-dispatcher>
</template>

<script>
export default {
  data () {
    return {
      value: '',
      options: [
        {
          value: '选项1',
          label: '黄金糕'
        },
        {
          value: '选项2',
          label: '双皮奶'
        },
        {
          value: '选项3',
          label: '蚵仔煎'
        },
        {
          value: '选项4',
          label: '龙须面'
        },
        {
          value: '选项5',
          label: '北京烤鸭'
        }
      ]
    }
  },
  methods: {
    readStateRender (h, context) {
      const { data, children } = context
      const value = data.attrs.value
      const vnodes = children.map(item => {
        if (!item.componentOptions) {
          return null
        } else if (value.includes(item.componentOptions.propsData.value)) {
          return h('span', {
            style: { color: 'green' }
          }, item.componentOptions.propsData.label + ' ')
        } else {
          return null
        }
      })
      .filter(item => item)
      return h('div', vnodes)
    }
  }
}
</script>
```
:::

### 自定义渲染函数 — slot
:::demo 通过 `#${namespace}Render`（cabelCase） 或 `v-slot:${namespace}Render`（cabelCase） 自定义 read 状态的渲染函数
```html
<template>
  <el-select-dispatcher v-model="value" clearable placeholder="请选择">
    <template #rwDispatcherRender="{ data, children }">
      <span style="color: red">{{ getLabel(data, children) }}</span>
    </template>
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    />
  </el-select-dispatcher>
</template>

<script>
export default {
  data () {
    return {
      value: '',
      options: [
        {
          value: '选项1',
          label: '黄金糕'
        },
        {
          value: '选项2',
          label: '双皮奶'
        },
        {
          value: '选项3',
          label: '蚵仔煎'
        },
        {
          value: '选项4',
          label: '龙须面'
        },
        {
          value: '选项5',
          label: '北京烤鸭'
        }
      ]
    }
  },
  methods: {
    getLabel (data, children) {
      const value = data.attrs.value
      const vnode = children.find(item => {
        if (!item.componentOptions) {
          return false
        }
        return item.componentOptions.propsData.value === value
      })
      if (vnode) {
        return vnode.componentOptions.propsData.label
      }
      return ''
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
      <td>自定义分隔符</td>
      <td>String</td>
      <td>|</td>
    </tr>
  </template>
</element-attributes>

### Scoped Slots
<element-scope-slot />
