import { createWrapper, useIViewPlugin } from '../utils'

describe('InputNumberDispatcher for iView', () => {
  useIViewPlugin()

  it('wrapper contains .ivu-input-number', () => {
    const wrapper = createWrapper({
      template: '<InputNumberDispatcher v-model="value" style="width: 300px" />',
      data () {
        return {
          value: 2
        }
      }
    }, {
      data () {
        return {
          rwDispatcherState: 'write'
        }
      }
    })
    expect(wrapper.contains('.ivu-input-number')).toBe(true)
  })

  it('text is "2"', () => {
    const wrapper = createWrapper({
      template: '<InputNumberDispatcher v-model="value" style="width: 300px" />',
      data () {
        return {
          value: 2
        }
      }
    })
    expect(wrapper.text()).toBe('2')
  })

  it('config of state in component is prior to config of state in local', () => {
    const wrapper = createWrapper({
      template: '<InputNumberDispatcher v-model="value" :rw-dispatcher-state="state" />',
      data () {
        return {
          value: 2,
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
    expect(wrapper.text()).toBe('2')
  })

  it('wrapper contains .rw-dispatcher-ivu-input-number-large', () => {
    const wrapper = createWrapper({
      template: '<InputNumberDispatcher v-model="value" size="large" />',
      data () {
        return {
          value: 2
        }
      }
    })
    expect(wrapper.contains('.rw-dispatcher-ivu-input-number-large')).toBe(true)
  })

  it('the color of style is "green"', () => {
    const wrapper = createWrapper({
      template: '<InputNumberDispatcher v-model="value" :rw-dispatcher-render="readStateRender" />',
      data () {
        return {
          value: 2
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
        <InputNumberDispatcher v-model="value" placeholder="请输入内容">
          <template #rwDispatcherRender="{ data }">
            <span style="color: red">{{ data.attrs.value }}</span>
          </template>
        </InputNumberDispatcher>
      `,
      data () {
        return {
          value: 2
        }
      }
    })
    const span = wrapper.find('span')
    expect(span.is('span')).toBe(true)
    expect(span.attributes('style')).toBe('color: red;')
  })
})
