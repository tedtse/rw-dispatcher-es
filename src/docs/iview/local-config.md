## 局部配置
如果组件的实际配置与全局配置不同，需要用局部配置覆盖全局配置，配置名默认`rwDispatcherConfig`。局部配置与全局配置的唯一区别，是局部配置**没有**命名空间(namespace)选项，而全局配置有。

### 使用
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
  </Form>
</template>

<script>
export default {
  provide() {
    return {
      rwDispatcherProvider: this
    }
  },
  data() {
    return {
      rwDispatcherState: 'write',
      rwDispatcherConfig: {
        readStateRender: {
          input (h, context) {
            return h('span', {
              style: { color: 'red' }
            }, context.data.attrs.value)
          },
          select (h, context) {
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

<iview-dispatcher-quickstart hasLocalConfig />
