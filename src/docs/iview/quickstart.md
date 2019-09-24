## 快速上手

### 安装
npm 安装
```shell
npm i iview-rw-dispatcher
```
yarn 安装
```shell
yarn add iview-rw-dispatcher
```

### 引入
开发者可以选择完整引入和按需引入。下面介绍完整引入

在 main.js 中写入以下内容：

```javascript
import Vue from 'vue'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import iViewRwDispatcher from 'iview-rw-dispatcher'
import 'iview-rw-dispatcher/styles/index.less'
import App from './App.vue'

Vue.use(iView)
Vue.use(iViewRwDispatcher)

new Vue({
  el: '#app',
  render: h => h(App)
})
```

### 使用
使用分发器比较使用表单只多了三步：
- 添加 `provide` 属性，其中 `rwDispatcherProvider` 的值指向自身
- data属性中添加 `rwDispatcherState` 做状态管理（`read` or `write`）
- 原来表单元素的标签加一个 `Dispatcher` 后缀，其配置保持不变
```html
<template>
  <Form ref="form" :model="form" :label-width="80" size="small">
    <FormItem label="活动名称">
      <InputDispatcher v-model="form.name" />
    </FormItem>
    <FormItem label="活动区域">
      <SelectDispatcher v-model="form.region" placeholder="请选择活动区域">
        <Option label="区域一" value="shanghai" />
        <Option label="区域二" value="beijing" />
      </SelectDispatcher>
    </FormItem>
    <div style="text-align: right">
      <Button
        v-show="rwDispatcherState === 'write'"
        type="primary"
        size="small"
        @click="toggleState"
      >编辑</Button>
      <Button
        v-show="rwDispatcherState === 'read'"
        type="primary"
        size="small"
        @click="toggleState"
      >详情</Button>
    </div>
  </Form>
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

<iview-dispatcher-quickstart />
