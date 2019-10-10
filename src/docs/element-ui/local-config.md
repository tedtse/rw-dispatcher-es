## 局部配置
如果组件的实际配置与全局配置不同，需要用局部配置覆盖全局配置，配置名默认`rwDispatcherConfig`。局部配置与全局配置的唯一区别，是局部配置**没有**命名空间(namespace)选项，而全局配置有。[实例](https://github.com/tedtse/element-ui-rw-dispatcher-example/tree/master/configuaration)

### 使用
```html
<template>
  <el-form ref="form" :model="form" label-width="80px" size="small">
    <el-form-item label="活动名称">
      <el-input-dispatcher v-model="form.name" />
    </el-form-item>
    <el-form-item label="活动区域">
      <el-select-dispatcher v-model="form.region" placeholder="请选择活动区域">
        <el-option label="区域一" value="shanghai"></el-option>
        <el-option label="区域二" value="beijing"></el-option>
      </el-select-dispatcher>
    </el-form-item>
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
      rwDispatcherConfig: {
        readStateRender: {
          elInput (h, context) {
            return h('span', {
              style: { color: 'red' }
            }, context.data.attrs.value)
          },
          elSelect (h, context) {
            const { data, children } = context
            const vnode = children.find(item => {
              return item.componentOptions.propsData.value === data.attrs.value
            })
            if (!vnode) {
              return null
            }
            return h('span', {
              style: { color: 'green' }
            }, vnode.componentOptions.propsData.label)
          }
        }
      },
      form: {
        name: '618电器折扣日',
        region: 'shanghai'
      }
    }
  }
}
</script>
```

<element-dispatcher-quickstart hasLocalConfig />
