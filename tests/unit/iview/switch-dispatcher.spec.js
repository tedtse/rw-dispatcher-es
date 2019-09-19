import { createWrapper, useIViewPlugin } from '../utils'

describe('SwitchDispatcher for iView', () => {
  useIViewPlugin()

  it('wrapper contains .ivu-switch', () => {
    const wrapper = createWrapper({
      template: '<SwitchDispatcher v-model="toggle" />',
      data () {
        return {
          toggle: false
        }
      }
    }, {
      data () {
        return {
          rwDispatcherState: 'write'
        }
      }
    })
    expect(wrapper.contains('.ivu-switch')).toBe(true)
  })

  it('text is "否"', () => {
    const wrapper = createWrapper({
      template: '<SwitchDispatcher v-model="toggle" />',
      data () {
        return {
          toggle: false
        }
      }
    })
    expect(wrapper.text()).toBe('否')
  })

  it('text is "是"', () => {
    const wrapper = createWrapper({
      template: `
        <SwitchDispatcher v-model="toggle">
          <template #open>
            <Icon type="md-checkmark" />
          </template>
          <template #close>
            <Icon type="md-close" />
          </template>
        </SwitchDispatcher>
      `,
      data () {
        return {
          toggle: true
        }
      }
    })
    const icon = wrapper.find('.ivu-icon')
    expect(icon.is('i')).toBe(true)
    expect(icon.contains('.ivu-icon-md-checkmark')).toBe(true)
  })

  it('wrapper contains .rw-dispatcher-ivu-time-picker-large', () => {
    const wrapper = createWrapper({
      template: '<TimePickerDispatcher v-model="value" size="large" placeholder="large size" />',
      data () {
        return {
          value: '02:10:02'
        }
      }
    })
    expect(wrapper.contains('.rw-dispatcher-ivu-time-picker-large')).toBe(true)
  })

  it('config of state in component is prior to config of state in local', () => {
    const wrapper = createWrapper({
      template: `
        <Form :model="form">
          <FormItem label="是否配送">
            <SwitchDispatcher v-model="form.deliver" :rw-dispatcher-state="state" />
            <Icon :type="icon" style="font-size: 20px" @click="toggleState" />
          </FormItem>
        </Form>
      `,
      data () {
        return {
          form: { deliver: true },
          state: 'read',
          icon: 'ios-eye-outline'
        }
      },
      methods: {
        toggleState () {
          if (this.state === 'write') {
            this.state = 'read'
            this.icon = 'ios-create-outline'
          } else {
            this.state = 'write'
            this.icon = 'ios-eye-outline'
          }
        }
      }
    }, {
      data () {
        return {
          rwDispatcherState: 'write'
        }
      }
    })
    expect(wrapper.contains('.rw-dispatcher-ivu-switch')).toBe(true)
  })

  it('the color of style is "green"', () => {
    const wrapper = createWrapper({
      template: `
        <SwitchDispatcher
          v-model="toggle"
          :rw-dispatcher-render="readStateRender"
          placeholder="请输入内容"
        />
      `,
      data () {
        return {
          toggle: true
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
        <SwitchDispatcher v-model="toggle" placeholder="请输入内容">
          <template #rwDispatcherRender="{ data }">
            <span style="color: red">{{ data.attrs.value ? 'Yes' : 'No' }}</span>
          </template>
        </SwitchDispatcher>
      `,
      data () {
        return {
          toggle: true
        }
      }
    })
    const span = wrapper.find('span')
    expect(span.is('span')).toBe(true)
    expect(span.attributes('style')).toBe('color: red;')
  })
})
