## 快速上手

### 安装
npm 安装
```shell
npm i element-ui-rw-dispatcher
```
yarn 安装
```shell
yarn add element-ui-rw-dispatcher
```

### 引入
开发者可以选择完整引入和按需引入。下面介绍完整引入

在 main.js 中写入以下内容：

```javascript
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import ElementUIRWDispatcher from 'element-ui-rw-dispatcher'
import 'element-ui-rw-dispatcher/styles/index.scss'
import App from './App.vue'

Vue.use(ElementUI)
Vue.use(ElementUIRWDispatcher)

new Vue({
  el: '#app',
  render: h => h(App)
})
```

### 使用
使用分发器比较使用表单只多了三步：
- 添加 `provide` 属性，其中 `rwDispatcherProvider` 的值指向自身
- data属性中添加 `rwDispatcherState` 做状态管理（`read` or `write`）
- 原来表单元素的标签加一个 `-dispatcher` 后缀，其配置保持不变
```html
<template>
  <el-form ref="form" :model="form" label-width="80px" size="small">
    <el-form-item label="活动名称">
      <el-input-dispatcher v-model="form.name" />
    </el-form-item>
    <el-form-item label="活动区域">
      <el-select-dispatcher v-model="form.region" placeholder="请选择活动区域">
        <el-option label="区域一" value="shanghai" />
        <el-option label="区域二" value="beijing" />
      </el-select-dispatcher>
    </el-form-item>
    <div style="text-align: right">
      <el-button
        v-show="rwDispatcherState === 'write'"
        type="primary"
        size="small"
        @click="toggleState"
      >编辑</el-button>
      <el-button
        v-show="rwDispatcherState === 'read'"
        type="primary"
        size="small"
        @click="toggleState"
      >详情</el-button>
    </div>
  </el-form>
</template>
<script>
export default {
  provide () {
    return {
      rwDispatcherProvider: this
    }
  },
  data () {
    return {
      rwDispatcherState: 'write',
      form: {
        name: '618电器折扣日',
        region: 'shanghai'
      }
    }
  },
  methods: {
    toggleState () {
      if (this.rwDispatcherState === 'write') {
        this.rwDispatcherState = 'read'
      } else {
        this.rwDispatcherState = 'write'
      }
    }
  }
}
</script>
```

<element-dispatcher-quickstart />
