import { createWrapper, useIViewPlugin } from '../utils'

describe('AutoCompleteDispatcher for iView', () => {
  useIViewPlugin()

  it('wrapper contains .ivu-auto-complete', () => {
    const wrapper = createWrapper({
      template: '<AutoCompleteDispatcher v-model="value" placeholder="Enter something..." style="width: 300px" />',
      data () {
        return {
          value: 'auto-complete dispatcher'
        }
      }
    }, {
      data () {
        return {
          rwDispatcherState: 'write'
        }
      }
    })
    expect(wrapper.contains('.ivu-auto-complete')).toBe(true)
  })

  it('text is "auto-complete dispatcher"', () => {
    const wrapper = createWrapper({
      template: '<AutoCompleteDispatcher v-model="value" placeholder="Enter something..." style="width: 300px" />',
      data () {
        return {
          value: 'auto-complete dispatcher'
        }
      }
    })
    expect(wrapper.text()).toBe('auto-complete dispatcher')
  })

  it('config of state in component is prior to config of state in local', () => {
    const wrapper = createWrapper({
      template: '<AutoCompleteDispatcher v-model="value" :rw-dispatcher-state="state" />',
      data () {
        return {
          value: 'config of state in component',
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

  it('wrapper contains .rw-dispatcher-ivu-auto-complete-large', () => {
    const wrapper = createWrapper({
      template: '<AutoCompleteDispatcher v-model="value1" size="large" placeholder="large size" />',
      data () {
        return {
          value1: ''
        }
      }
    })
    expect(wrapper.contains('.rw-dispatcher-ivu-auto-complete-large')).toBe(true)
  })

  it('the color of style is "green"', () => {
    const wrapper = createWrapper({
      template: '<AutoCompleteDispatcher v-model="value" :rw-dispatcher-render="readStateRender" placeholder="请输入内容" />',
      data () {
        return {
          value: 'custom render function'
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
        <AutoCompleteDispatcher v-model="value" placeholder="请输入内容">
          <template #rwDispatcherRender="{ data }">
            <span style="color: red">{{ data.attrs.value }}</span>
          </template>
        </AutoCompleteDispatcher>
      `,
      data () {
        return {
          value: 'custom render function'
        }
      }
    })
    const span = wrapper.find('span')
    expect(span.is('span')).toBe(true)
    expect(span.attributes('style')).toBe('color: red;')
  })
})
