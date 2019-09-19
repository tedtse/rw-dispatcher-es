<template>
  <el-form ref="form" :model="form" label-width="80px" size="small">
    <el-form-item label="活动名称">
      <el-input-dispatcher v-model="form.name"></el-input-dispatcher>
    </el-form-item>
    <el-form-item label="活动区域">
      <el-select-dispatcher v-model="form.region" placeholder="请选择活动区域">
        <el-option label="区域一" value="shanghai"></el-option>
        <el-option label="区域二" value="beijing"></el-option>
      </el-select-dispatcher>
    </el-form-item>
    <div style="text-align: right">
      <el-button v-show="rwDispatcherState === 'write'" type="primary" size="small" @click="toggleState">编辑</el-button>
      <el-button v-show="rwDispatcherState === 'read'" type="primary" size="small" @click="toggleState">详情</el-button>
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
