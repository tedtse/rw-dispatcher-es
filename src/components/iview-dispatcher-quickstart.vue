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
  props: {
    hasLocalConfig: {
      type: Boolean,
      default: false
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
  computed: {
    rwDispatcherConfig () {
      if (this.hasLocalConfig) {
        return {
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
        }
      }
      return {}
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
