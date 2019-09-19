import { createWrapper, useIViewPlugin } from '../utils'

describe('InputDispatcher for iView', () => {
  useIViewPlugin()

  it('wrapper contains .ivu-input-wrapper', () => {
    const wrapper = createWrapper({
      template: '<InputDispatcher v-model="value" placeholder="Enter something..." style="width: 300px" />',
      data () {
        return {
          value: 'input dispatcher'
        }
      }
    }, {
      data () {
        return {
          rwDispatcherState: 'write'
        }
      }
    })
    expect(wrapper.contains('.ivu-input-wrapper')).toBe(true)
  })

  it('text is "input dispatcher"', () => {
    const wrapper = createWrapper({
      template: '<InputDispatcher v-model="value" placeholder="Enter something..." style="width: 300px" />',
      data () {
        return {
          value: 'input dispatcher'
        }
      }
    })
    expect(wrapper.text()).toBe('input dispatcher')
  })

  it('config of state in component is prior to config of state in local', () => {
    const wrapper = createWrapper({
      template: '<InputDispatcher v-model="input" :rw-dispatcher-state="state" />',
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

  it('wrapper contains .rw-dispatcher-ivu-input-large', () => {
    const wrapper = createWrapper({
      template: '<InputDispatcher v-model="value1" size="large" placeholder="large size" />',
      data () {
        return {
          value1: ''
        }
      }
    })
    expect(wrapper.contains('.rw-dispatcher-ivu-input-large')).toBe(true)
  })

  it('the color of style is "green"', () => {
    const wrapper = createWrapper({
      template: '<InputDispatcher v-model="input" :rw-dispatcher-render="readStateRender" placeholder="请输入内容" />',
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
        <InputDispatcher v-model="input" placeholder="请输入内容">
          <template #rwDispatcherRender="{ data }">
            <span style="color: red">{{ data.attrs.value }}</span>
          </template>
        </InputDispatcher>
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
