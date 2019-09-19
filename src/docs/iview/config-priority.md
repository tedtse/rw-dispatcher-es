## 配置优先级

read 状态的渲染函数有多套配置，分别是：

- **全局配置**

  插件初始化时配置。比如命名空间 `namespace`（默认 `rwDispatcher`），用法是：
```js
import Vue from 'vue'
import iViewRwDispatcher from 'iview-rw-dispatcher'

Vue.use(iViewRwDispatcher, {
  // 全局配置
})
```

- **局部配置**

  在 provider 组件中的 `${namespace}Config` 参数（默认 `rwDispatcherConfig`），用法是：
```js
export default {
  data () {
    return {
      rwDispatcherConfig: {
        // 局部配置
      }
    }
  }
}
```

- **组件配置**

  单个组件的 props 和 slot。比如：
```html
<DatePickerDispatcher type="daterange" rw-dispatcher-range-separator="-">
  <template #rwDispatcherRender="{ data, children }">
    <!-- slot -->
  </template>
</DatePickerDispatcher>
```

优先级顺序是：

`组件配置` > `局部配置` > `全局配置`，优先级高的配置会覆盖优先级低的配置。

组件配置中 `slot` > `props`。如下：
```html
<template>
  <InputDispatcher :rw-dispatcher-render="inputRender">
    <template #rwDispatcherRender="{ data, children }">
      <!-- slot -->
    </template>
  </InputDispatcher>
</template>

<script>
export default {
  methods: {
    inputRender (h, context) {
      // render
    }
  }
}
</script>
```
read 转态会应用 slot 的渲染函数。