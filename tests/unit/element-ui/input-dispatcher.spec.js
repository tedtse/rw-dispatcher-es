import { createWrapper, useElePlugin } from '../utils'

describe('InputDispatcher for ElementUI', () => {
  useElePlugin()

  it('text is "input dispatcher"', () => {
    const wrapper = createWrapper({
      template: '<el-input-dispatcher v-model="input" />',
      data () {
        return {
          input: 'input dispatcher'
        }
      }
    })
    expect(wrapper.text()).toBe('input dispatcher')
  })

  it('wrapper contains .el-input', () => {
    const wrapper = createWrapper({
      template: '<el-input-dispatcher v-model="input" />',
      data () {
        return {
          input: 'config of state in local'
        }
      }
    }, {
      data () {
        return {
          rwDispatcherState: 'write'
        }
      }
    })
    expect(wrapper.contains('.el-input')).toBe(true)
  })

  it('config of state in component is prior to config of state in local', () => {
    const wrapper = createWrapper({
      template: '<el-input-dispatcher v-model="input" :rw-dispatcher-state="state" />',
      data () {
        return {
          input: 'config of state in component',
          state: 'read'
        }
      }
    }, {
      data () {
        return {
          rwDispatcherState: 'write'
        }
      }
    })
    expect(wrapper.text()).toBe('config of state in component')
  })

  it('the color of style is "green"', () => {
    const wrapper = createWrapper({
      template: '<el-input-dispatcher v-model="input" :rw-dispatcher-render="readStateRender" placeholder="请输入内容" />',
      data () {
        return {
          input: 'custom render function'
        }
      },
      methods: {
        readStateRender (h, context) {
          return h('span', {
            style: { color: 'green' }
          }, context.data.attrs.value)
        }
      }
    })
    const span = wrapper.find('span')
    expect(span.is('span')).toBe(true)
    expect(span.attributes('style')).toBe('color: green;')
  })

  it('the color of style is "red"', () => {
    const wrapper = createWrapper({
      template: `
        <el-input-dispatcher v-model="input" placeholder="请输入内容">
          <template #rwDispatcherRender="{ data }">
            <span style="color: red">{{ data.attrs.value }}</span>
          </template>
        </el-input-dispatcher>
      `,
      data () {
        return {
          input: 'custom render function'
        }
      }
    })
    const span = wrapper.find('span')
    expect(span.is('span')).toBe(true)
    expect(span.attributes('style')).toBe('color: red;')
  })
})
