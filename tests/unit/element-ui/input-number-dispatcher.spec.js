import { createWrapper, useElePlugin } from '../utils'

describe('InputNumberDispatcher for ElementUI', () => {
  useElePlugin()

  it('text is "10"', () => {
    const wrapper = createWrapper({
      template: '<el-input-number-dispatcher v-model="num" />',
      data () {
        return {
          num: 10
        }
      }
    })
    expect(wrapper.text()).toBe('10')
  })

  it('wrapper contains .el-input-number', () => {
    const wrapper = createWrapper({
      template: '<el-input-number-dispatcher v-model="num" />',
      data () {
        return {
          num: 10
        }
      }
    }, {
      data () {
        return {
          rwDispatcherState: 'write'
        }
      }
    })
    expect(wrapper.contains('.el-input-number')).toBe(true)
  })

  it('precision is 2', () => {
    const wrapper = createWrapper({
      template: '<el-input-number-dispatcher v-model="num" :precision="2" />',
      data () {
        return {
          num: 2
        }
      }
    })
    expect(wrapper.text()).toBe('2.00')
  })

  it('config of state in component is prior to config of state in local', () => {
    const wrapper = createWrapper({
      template: '<el-input-number-dispatcher v-model="num" :rw-dispatcher-state="state" />',
      data () {
        return {
          num: 10,
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
    expect(wrapper.text()).toBe('10')
  })

  it('the color of style is "green"', () => {
    const wrapper = createWrapper({
      template: '<el-input-number-dispatcher v-model="num" :rw-dispatcher-render="readStateRender" />',
      data () {
        return {
          num: 10
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
        <el-input-number-dispatcher v-model="num">
          <template #rwDispatcherRender="{ data }">
            <span style="color: red">{{ data.attrs.value }}</span>
          </template>
        </el-input-number-dispatcher>
      `,
      data () {
        return {
          num: 10
        }
      }
    })
    const span = wrapper.find('span')
    expect(span.is('span')).toBe(true)
    expect(span.attributes('style')).toBe('color: red;')
  })
})
