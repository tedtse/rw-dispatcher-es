import { createWrapper, useElePlugin } from '../utils'

describe('SwitchDispatcher for ElementUI', () => {
  useElePlugin()

  it('wrapper contains .el-switch', () => {
    const wrapper = createWrapper({
      template: '<el-switch-dispatcher v-model="toggle" />',
      data () {
        return {
          toggle: true
        }
      }
    }, {
      data () {
        return {
          rwDispatcherState: 'write'
        }
      }
    })
    expect(wrapper.contains('.el-switch')).toBe(true)
  })

  it('text is "是"', () => {
    const wrapper = createWrapper({
      template: '<el-switch-dispatcher v-model="toggle" />',
      data () {
        return {
          toggle: true
        }
      }
    })
    expect(wrapper.text()).toBe('是')
  })

  it('the color of style is "rgb(19, 206, 102)"', () => {
    const wrapper = createWrapper({
      template: `
        <el-switch-dispatcher
          v-model="value"
          active-color="rgb(19, 206, 102)"
          inactive-color="#ff4949"
          active-text="按月付费"
          inactive-text="按年付费"
        />
      `,
      data () {
        return {
          value: true
        }
      }
    })
    const span = wrapper.find('span')
    expect(span.is('span')).toBe(true)
    expect(span.attributes('style')).toBe('color: rgb(19, 206, 102);')
  })

  it('text is "100"', () => {
    const wrapper = createWrapper({
      template: `
        <el-switch-dispatcher
          v-model="value"
          active-color="#13ce66"
          inactive-color="#ff4949"
          active-value="100"
          inactive-value="0"
        />
      `,
      data () {
        return {
          value: '100'
        }
      }
    })
    expect(wrapper.text()).toBe('100')
  })

  it('config of state in component is prior to config of state in local', () => {
    const wrapper = createWrapper({
      template: `
        <el-switch-dispatcher
          v-model="delivery"
          :rw-dispatcher-state="state"
        />
      `,
      data () {
        return {
          delivery: true,
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
    expect(wrapper.text()).toBe('是')
  })

  it('the color of style is "green"', () => {
    const wrapper = createWrapper({
      template: '<el-switch-dispatcher v-model="toggle" :rw-dispatcher-render="switchRender" />',
      data () {
        return {
          toggle: true
        }
      },
      methods: {
        switchRender (h, context) {
          const { value } = context.data.attrs
          return h('span', {
            style: { color: 'green' }
          }, value ? '开' : '关')
        }
      }
    })
    const span = wrapper.find('span')
    expect(span.is('span')).toBe(true)
    expect(span.text()).toBe('开')
    expect(span.attributes('style')).toBe('color: green;')
  })

  it('the color of style is "red"', () => {
    const wrapper = createWrapper({
      template: `
        <el-switch-dispatcher v-model="toggle">
          <template #rwDispatcherRender="{ data }">
            <span style="color: red">
              {{ data.attrs.value ? '开' : '关' }}
            </span>
          </template>
        </el-switch-dispatcher>
      `,
      data () {
        return {
          toggle: true
        }
      }
    })
    const span = wrapper.find('span')
    expect(span.is('span')).toBe(true)
    expect(span.text()).toBe('开')
    expect(span.attributes('style')).toBe('color: red;')
  })
})
