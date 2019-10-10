# 基础用法
:::demo
```html
<template>
  <el-input-number-dispatcher
    v-model="num"
    :min="1"
    :max="10"
    label="描述文字"
    @change="handleChange"
  />
</template>

<script>
export default {
  data () {
    return {
      num: 1
    }
  },
  methods: {
    handleChange (value) {
      console.log(value)
    }
  }
}
</script>
```
:::

### 步数
:::demo
```html
<template>
  <el-input-number-dispatcher v-model="num" :step="2" step-strictly />
</template>

<script>
export default {
  data () {
    return {
      num: 2
    }
  }
}
</script>
```
:::

### 精度
:::demo
```html
<template>
  <el-input-number-dispatcher
    v-model="num"
    :precision="2"
    :step="0.1"
    :max="10"
  />
</template>

<script>
export default {
  data () {
    return {
      num: 1
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
  <el-row :gutter="10">
    <el-col :span="6">
      <el-input-number-dispatcher v-model="num1" />
    </el-col>
    <el-col :span="6">
      <el-input-number-dispatcher size="medium" v-model="num2" />
    </el-col>
    <el-col :span="6">
      <el-input-number-dispatcher size="small" v-model="num3" />
    </el-col>
    <el-col :span="6">
      <el-input-number-dispatcher size="mini" v-model="num4" />
    </el-col>
  </el-row>
</template>

<script>
export default {
  data () {
    return {
      num1: 1,
      num2: 2,
      num3: 3,
      num4: 4
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
    <el-form-item label="数量">
      <el-input-number-dispatcher
        v-model="form.num"
        :rw-dispatcher-state="state"
        style="width: 200px"
      />
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
        num: 10
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
  <el-input-number-dispatcher
    v-model="num"
    :precision="2"
    :step="0.1"
    :max="10"
    :rw-dispatcher-render="inputNumberRender"
    placeholder="请输入内容"
  />
</template>

<script>
export default {
  data () {
    return {
      num: 2
    }
  },
  methods: {
    inputNumberRender (h, context) {
      const { value, precision } = context.data.attrs
      return h('span', {
        style: { color: 'green' }
      }, value.toFixed(precision))
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
  <el-input-number-dispatcher
    v-model="num"
    :precision="2"
    :step="0.1"
    :max="10"
    placeholder="请输入内容"
  >
    <template #rwDispatcherRender="{ data }">
      <span style="color: red">
        {{ data.attrs.value.toFixed(data.attrs.precision) }}
      </span>
    </template>
  </el-input-number-dispatcher>
</template>

<script>
export default {
  data () {
    return {
      num: 1
    }
  }
}
</script>
```
:::

### Attributes
<element-attributes />

### Scoped Slots
<element-scope-slot />

### 其他属性、Slots、Events
与官方 `ElInputNumber` 的完全一致，[官方组件](https://element.eleme.cn/#/zh-CN/component/input-number#attributes)。