### 基础用法
:::demo
```html
<template>
  <el-checkbox-dispatcher v-model="checked">备选项</el-checkbox-dispatcher>
</template>

<script>
export default {
  data () {
    return {
      checked: true
    }
  }
}
</script>
```
:::

### 多选框组
:::demo
```html
<template>
  <el-checkbox-group-dispatcher v-model="checkList">
    <el-checkbox-dispatcher label="复选框 A"><span style="color: red">123</span></el-checkbox-dispatcher>
    <el-checkbox-dispatcher label="复选框 B" />
    <el-checkbox-dispatcher label="复选框 C" />
    <el-checkbox-dispatcher label="禁用" disabled />
    <el-checkbox-dispatcher label="选中且禁用" disabled />
  </el-checkbox-group-dispatcher>
</template>

<script>
export default {
  data () {
    return {
      checkList: ['选中且禁用', '复选框 A']
    }
  }
}
</script>
```
:::

### 按钮样式
:::demo
```html
<template>
  <div>
    <el-checkbox-group-dispatcher v-model="checkboxGroup1">
      <el-checkbox-button-dispatcher v-for="city in cities" :label="city" :key="city">{{ city }}</el-checkbox-button-dispatcher>
    </el-checkbox-group-dispatcher>
  </div>
  <div style="margin-top: 20px">
    <el-checkbox-group-dispatcher v-model="checkboxGroup2" size="medium">
      <el-checkbox-button-dispatcher v-for="city in cities" :label="city" :key="city">{{ city }}</el-checkbox-button-dispatcher>
    </el-checkbox-group-dispatcher>
  </div>
  <div style="margin-top: 20px">
    <el-checkbox-group-dispatcher v-model="checkboxGroup3" size="small">
      <el-checkbox-button-dispatcher v-for="city in cities" :label="city" :disabled="city === '北京'" :key="city">{{ city }}</el-checkbox-button-dispatcher>
    </el-checkbox-group-dispatcher>
  </div>
  <div style="margin-top: 20px">
    <el-checkbox-group-dispatcher v-model="checkboxGroup4" size="mini" disabled>
      <el-checkbox-button-dispatcher v-for="city in cities" :label="city" :key="city">{{ city }}</el-checkbox-button-dispatcher>
    </el-checkbox-group-dispatcher>
  </div>
</template>

<script>
const cityOptions = ['上海', '北京', '广州', '深圳']
export default {
  data () {
    return {
      checkboxGroup1: ['上海'],
      checkboxGroup2: ['上海'],
      checkboxGroup3: ['上海'],
      checkboxGroup4: ['上海'],
      cities: cityOptions
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
  <el-checkbox-group-dispatcher v-model="checkList" rw-dispatcher-separator="and">
    <el-checkbox-dispatcher label="复选框 A"><span style="color: red">123</span></el-checkbox-dispatcher>
    <el-checkbox-dispatcher label="复选框 B" />
    <el-checkbox-dispatcher label="复选框 C" />
    <el-checkbox-dispatcher label="禁用" disabled />
    <el-checkbox-dispatcher label="选中且禁用" disabled />
  </el-checkbox-group-dispatcher>
</template>

<script>
export default {
  data () {
    return {
      checkList: ['选中且禁用', '复选框 A']
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
  <el-form label-width="120px">
    <el-form-item label="checkbox">
      <el-checkbox-dispatcher
        v-model="form.checkbox"
        :rw-dispatcher-state="state.checkbox"
        style="width: 400px"
      >备选项</el-checkbox-dispatcher>
      <el-button
        type="text"
        :icon="icon.checkbox"
        @click="toggleState('checkbox')"
      />
    </el-form-item>
    <el-form-item label="checkbox-group">
      <el-checkbox-group-dispatcher
        v-model="form.checkboxGroup"
        :rw-dispatcher-state="state.checkboxGroup"
        style="width: 400px; display: inline-block"
      >
        <el-checkbox-dispatcher label="复选框 A" :rw-dispatcher-state="state.checkboxGroup">
          <span style="color: red">123</span>
        </el-checkbox-dispatcher>
        <el-checkbox-dispatcher label="复选框 B" :rw-dispatcher-state="state.checkboxGroup" />
        <el-checkbox-dispatcher label="复选框 C" :rw-dispatcher-state="state.checkboxGroup" />
        <el-checkbox-dispatcher label="禁用" :rw-dispatcher-state="state.checkboxGroup" disabled />
      </el-checkbox-group-dispatcher>
      <el-button
        type="text"
        :icon="icon.checkboxGroup"
        @click="toggleState('checkboxGroup')"
      />
    </el-form-item>
    <el-form-item label="checkbox-button">
      <el-checkbox-group-dispatcher
        v-model="form.checkboxButton"
        :rw-dispatcher-state="state.checkboxButton"
        style="width: 400px; display: inline-block"
      >
        <el-checkbox-button-dispatcher
          v-for="city in cities"
          :label="city"
          :key="city"
          :rw-dispatcher-state="state.checkboxButton"
        >
          {{ city }}
        </el-checkbox-button-dispatcher>
      </el-checkbox-group-dispatcher>
      <el-button
        type="text"
        :icon="icon.checkboxButton"
        @click="toggleState('checkboxButton')"
      />
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  data () {
    return {
      form: {
        checkbox: true,
        checkboxGroup: ['复选框 A'],
        checkboxButton: ['上海']
      },
      state: {
        checkbox: 'write',
        checkboxGroup: 'write',
        checkboxButton: 'write'
      },
      icon: {
        checkbox: 'el-icon-view',
        checkboxGroup: 'el-icon-view',
        checkboxButton: 'el-icon-view'
      },
      cities: ['上海', '北京', '广州', '深圳']
    }
  },
  methods: {
    toggleState (key) {
      if (this.state[key] === 'write') {
        this.state[key] = 'read'
        this.icon[key] = 'el-icon-edit'
      } else {
        this.state[key] = 'write'
        this.icon[key] = 'el-icon-view'
      }
    }
  }
}
</script>
```
:::
:::tip 设置 state
// TODO

由于渲染顺序的原因，el-checkbox-group-dispatcher 和它的子组件(el-checkbox、el-checkbox-button)都要设置统一的 state。这显然不利于开发体验，
希望在以后的版本能改进这个问题。
:::

### 自定义渲染函数 — props
:::demo 通过组件的props属性 `${namespace}-render(kebeb-case)` 或 `${namespace}Render(camelCase)` 自定义 read 状态的渲染函数。ElCheckboxDispatcher、ElCheckboxButtonDispatcher 的用法一致。
```html
<template>
  <el-checkbox-dispatcher v-model="checked" :rw-dispatcher-render="checkboxRender">
    备选项
  </el-checkbox-dispatcher>
  <div style="margin: 15px 0;" />
  <el-checkbox-group-dispatcher v-model="checkList" :rw-dispatcher-render="checkboxGroupRender">
    <el-checkbox-dispatcher label="复选框 A">
      <span style="color: red">123</span>
    </el-checkbox-dispatcher>
    <el-checkbox-dispatcher label="复选框 B" />
    <el-checkbox-dispatcher label="复选框 C" />
    <el-checkbox-dispatcher label="禁用" disabled />
    <el-checkbox-dispatcher label="选中且禁用" disabled />
  </el-checkbox-group-dispatcher>
</template>

<script>
export default {
  data () {
    return {
      checked: true,
      checkList: ['选中且禁用', '复选框 A']
    }
  },
  methods: {
    checkboxRender (h, context) {
      const { value } = context.data.attrs
      if (value) {
        return h('span', {
          style: { color: 'green' }
        }, context.children)
      } else {
        return null
      }
    },
    checkboxGroupRender (h, context) {
      const { data, children } = context
      const { value } = data.attrs
      const vnodes = children.map(item => {
        if (!item.data) {
          return null
        } else if (value.includes(item.data.attrs.label)) {
          return item.children || item.data.attrs.label
        } else {
          return null
        }
      })
        .filter(item => item)
      return h('div', {
        style: { color: 'green' }
      }, vnodes)
    }
  }
}
</script>
```
:::

### 自定义渲染函数 — slot
:::demo 通过 `#${namespace}Render`（cabelCase） 或 `v-slot:${namespace}Render`（cabelCase） 自定义 read 状态的渲染函数。ElCheckboxDispatcher、ElCheckboxButtonDispatcher 的用法一致。
```html
<template>
  <el-checkbox-dispatcher v-model="checked">
    备选项
    <template #rwDispatcherRender="{ data, children }">
      <span style="color: red">{{ getCheckboxLabel(data, children) }}</span>
    </template>
  </el-checkbox-dispatcher>
  <div style="margin: 15px 0;" />
  <el-checkbox-group-dispatcher v-model="checkList">
    <template #rwDispatcherRender="{ data }">
      <span style="color: red">{{ getCheckboxGroupLabels(data) }}</span>
    </template>
    <el-checkbox-dispatcher label="复选框 A">
      <span style="color: red">123</span>
    </el-checkbox-dispatcher>
    <el-checkbox-dispatcher label="复选框 B" />
    <el-checkbox-dispatcher label="复选框 C" />
    <el-checkbox-dispatcher label="禁用" disabled />
    <el-checkbox-dispatcher label="选中且禁用" disabled />
  </el-checkbox-group-dispatcher>
</template>

<script>
export default {
  data () {
    return {
      checked: true,
      checkList: ['选中且禁用', '复选框 A']
    }
  },
  methods: {
    getCheckboxLabel (data, children) {
      if (data.attrs.value) {
        return children[0].text.trim()
      } else {
        return ''
      }
    },
    getCheckboxGroupLabels (data) {
      return data.attrs.value.join(' | ')
    }
  }
}
</script>
```
:::

### Checkbox Attributes
<element-attributes />

### Checkbox Scoped Slots
<element-scope-slot />

### CheckboxButton Attributes
<element-attributes />

### CheckboxButton Scoped Slots
<element-scope-slot />

### CheckboxGroup Attributes
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

### CheckboxGroup Scoped Slots
<element-scope-slot />