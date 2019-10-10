### 基础用法
:::demo
```html
<template>
  <el-radio-dispatcher v-model="radio" label="1">备选项1</el-radio-dispatcher>
  <el-radio-dispatcher v-model="radio" label="2">备选项2</el-radio-dispatcher>
</template>

<script>
export default {
  data () {
    return {
      radio: '1'
    }
  }
}
</script>
```
:::

### 单选框组
:::demo 
```html
<template>
  <el-radio-group-dispatcher v-model="radio">
    <el-radio-dispatcher :label="3">备选项1</el-radio-dispatcher>
    <el-radio-dispatcher :label="6">备选项2</el-radio-dispatcher>
    <el-radio-dispatcher :label="9">备选项3</el-radio-dispatcher>
  </el-radio-group-dispatcher>
</template>

<script>
export default {
  data () {
    return {
      radio: 3
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
    <el-radio-group-dispatcher v-model="radio1">
      <el-radio-button-dispatcher label="上海" />
      <el-radio-button-dispatcher label="北京" />
      <el-radio-button-dispatcher label="广州" />
      <el-radio-button-dispatcher label="深圳" />
    </el-radio-group-dispatcher>
  </div>
  <div style="margin-top: 20px">
    <el-radio-group-dispatcher v-model="radio2" size="medium">
      <el-radio-button-dispatcher label="上海" />
      <el-radio-button-dispatcher label="北京" />
      <el-radio-button-dispatcher label="广州" />
      <el-radio-button-dispatcher label="深圳" />
    </el-radio-group-dispatcher>
  </div>
  <div style="margin-top: 20px">
    <el-radio-group-dispatcher v-model="radio3" size="small">
      <el-radio-button-dispatcher label="上海" />
      <el-radio-button-dispatcher label="北京" disabled />
      <el-radio-button-dispatcher label="广州" />
      <el-radio-button-dispatcher label="深圳" />
    </el-radio-group-dispatcher>
  </div>
  <div style="margin-top: 20px">
    <el-radio-group-dispatcher v-model="radio4" disabled size="mini">
      <el-radio-button-dispatcher label="上海" />
      <el-radio-button-dispatcher label="北京" />
      <el-radio-button-dispatcher label="广州" />
      <el-radio-button-dispatcher label="深圳" />
    </el-radio-group-dispatcher>
  </div>
</template>

<script>
export default {
  data () {
    return {
      radio1: '上海',
      radio2: '上海',
      radio3: '上海',
      radio4: '上海'
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
    <el-form-item label="radio">
      <el-radio-dispatcher
        v-model="form.radio"
        :rw-dispatcher-state="state.radio"
        :label="1"
        style="width: 170px"
      >
        备选项1
      </el-radio-dispatcher>
      <el-radio-dispatcher
        v-model="form.radio"
        :rw-dispatcher-state="state.radio"
        :label="2"
        style="width: 170px"
      >
        备选项2
      </el-radio-dispatcher>
      <el-button
        type="text"
        :icon="icon.radio"
        @click="toggleState('radio')"
      />
    </el-form-item>
    <el-form-item label="radioGroup">
      <el-radio-group-dispatcher
        v-model="form.radioGroup"
        :rw-dispatcher-state="state.radioGroup"
        style="width: 400px"
      >
        <el-radio-dispatcher :label="3" :rw-dispatcher-state="state.radioGroup">备选项1</el-radio-dispatcher>
        <el-radio-dispatcher :label="6" :rw-dispatcher-state="state.radioGroup">备选项2</el-radio-dispatcher>
        <el-radio-dispatcher :label="9" :rw-dispatcher-state="state.radioGroup">备选项3</el-radio-dispatcher>
      </el-radio-group-dispatcher>
      <el-button
        type="text"
        :icon="icon.radioGroup"
        @click="toggleState('radioGroup')"
      />
    </el-form-item>
    <el-form-item label="radioButton">
      <el-radio-group-dispatcher
        v-model="form.radioButton"
        :rw-dispatcher-state="state.radioButton"
        style="width: 400px"
      >
        <el-radio-button-dispatcher label="上海" :rw-dispatcher-state="state.radioButton" />
        <el-radio-button-dispatcher label="北京" :rw-dispatcher-state="state.radioButton" />
        <el-radio-button-dispatcher label="广州" :rw-dispatcher-state="state.radioButton" />
        <el-radio-button-dispatcher label="深圳" :rw-dispatcher-state="state.radioButton" />
      </el-radio-group-dispatcher>
      <el-button
        type="text"
        :icon="icon.radioButton"
        @click="toggleState('radioButton')"
      />
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  data () {
    return {
      form: {
        radio: 1,
        radioGroup: 9,
        radioButton: '北京'
      },
      state: {
        radio: 'write',
        radioGroup: 'write',
        radioButton: 'write'
      },
      icon: {
        radio: 'el-icon-view',
        radioGroup: 'el-icon-view',
        radioButton: 'el-icon-view'
      }
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
  <div>
    <el-radio-dispatcher
      v-model="radio1"
      label="1"
      :rw-dispatcher-render="radioRender"
    >
      备选项1
    </el-radio-dispatcher>
    <el-radio-dispatcher
      v-model="radio1"
      label="2"
      :rw-dispatcher-render="radioRender"
    >
      备选项2
    </el-radio-dispatcher>
    <div style="margin: 15px 0;" />
    <el-radio-group-dispatcher v-model="radio2" :rw-dispatcher-render="radioGroupRender">
      <el-radio-dispatcher :label="3">备选项1</el-radio-dispatcher>
      <el-radio-dispatcher :label="6">备选项2</el-radio-dispatcher>
      <el-radio-dispatcher :label="9">备选项3</el-radio-dispatcher>
    </el-radio-group-dispatcher>
  </div>
</template>

<script>
export default {
  data () {
    return {
      radio1: '1',
      radio2: 3
    }
  },
  methods: {
    radioRender (h, context) {
      const { value, label } = context.data.attrs
      if (value === label) {
        return h('div', {
          style: { color: 'green' }
        }, context.children)
      } else {
        return null
      }
    },
    radioGroupRender (h, context) {
      const { data, children } = context
      const { value } = data.attrs
      const vnode = children.find(item => {
        if (!item.data) {
          return false
        } else {
          return value === item.data.attrs.label
        }
      })
      if (!vnode) {
        return ''
      }
      return h('div', {
        style: { color: 'green' }
      }, vnode.children)
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
  <div>
    <el-radio-dispatcher v-model="radio1" label="1">
      备选项1
      <template #rwDispatcherRender="{ data, children }">
        <span style="color: red">{{ getRadioLabel(data, children) }}</span>
      </template>
    </el-radio-dispatcher>
    <el-radio-dispatcher v-model="radio1" label="2">
      备选项2
      <template #rwDispatcherRender="{ data, children }">
        <span style="color: blue">{{ getRadioLabel(data, children) }}</span>
      </template>
    </el-radio-dispatcher>
    <div style="margin: 15px 0;" />
    <el-radio-group-dispatcher v-model="radio2">
      <el-radio-dispatcher :label="3">备选项1</el-radio-dispatcher>
      <el-radio-dispatcher :label="6">备选项2</el-radio-dispatcher>
      <el-radio-dispatcher :label="9">备选项3</el-radio-dispatcher>
      <template #rwDispatcherRender="{ data, children }">
        <span style="color: red">{{ getRadioGroupLabel(data, children) }}</span>
      </template>
    </el-radio-group-dispatcher>
  </div>
</template>

<script>
export default {
  data () {
    return {
      radio1: '1',
      radio2: 3
    }
  },
  methods: {
    getRadioLabel (data, children) {
      if (data.attrs.value === data.attrs.label) {
        return children[0].text.trim()
      } else {
        return ''
      }
    },
    getRadioGroupLabel (data, children) {
      const vnode = children.find(item => {
        return item.data && item.data.attrs.label === data.attrs.value
      })
      if (vnode) {
        return vnode.children[0].text.trim()
      }
      return ''
    }
  }
}
</script>
```
:::

### Radio Attributes
<element-attributes />

### Radio Scoped Slots
<element-scope-slot />

### RadioButton Attributes
<element-attributes />

### RadioButton Scoped Slots
<element-scope-slot />

### RadioGroup Attributes
<element-attributes />

### RadioGroup Scoped Slots
<element-scope-slot />

### 其他属性、Slots、Events
与官方 `ElRadio`、`ElRadioButton`、`ElRadioGroup` 的完全一致，[官方组件](https://element.eleme.cn/#/zh-CN/component/radio#radio-attributes)。