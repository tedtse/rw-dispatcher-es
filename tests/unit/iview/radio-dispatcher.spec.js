import { createWrapper, useIViewPlugin } from '../utils'

describe('RadioDispatcher for iView', () => {
  useIViewPlugin()

  it('wrapper contains .ivu-radio', () => {
    const wrapper = createWrapper({
      template: '<RadioDispatcher v-model="single">Radio</RadioDispatcher>',
      data () {
        return {
          single: true
        }
      }
    }, {
      data () {
        return {
          rwDispatcherState: 'write'
        }
      }
    })
    expect(wrapper.contains('.ivu-radio')).toBe(true)
  })

  it('text is "Radio"', () => {
    const wrapper = createWrapper({
      template: '<RadioDispatcher v-model="single">Radio</RadioDispatcher>',
      data () {
        return {
          single: true
        }
      }
    })
    expect(wrapper.text()).toBe('Radio')
  })

  it('wrapper contains .rw-dispatcher-ivu-radio-group-large', () => {
    const wrapper = createWrapper({
      template: `
        <RadioGroupDispatcher v-model="button4" type="button" size="large">
          <RadioDispatcher label="北京" />
          <RadioDispatcher label="上海" />
          <RadioDispatcher label="深圳" />
          <RadioDispatcher label="杭州" />
        </RadioGroupDispatcher>
      `,
      data () {
        return {
          button4: '北京'
        }
      }
    })
    const div = wrapper.find('.rw-dispatcher-ivu-radio-group')
    expect(div.is('div')).toBe(true)
    expect(div.contains('.rw-dispatcher-ivu-radio-group-large'))
  })

  it('config of state in component is prior to config of state in local', () => {
    const wrapper = createWrapper({
      template: `
        <Form :model="form">
          <FormItem label="操作系统">
            <RadioGroupDispatcher v-model="form.os" :rw-dispatcher-state="state">
              <RadioDispatcher label="ios" :rw-dispatcher-state="state">
                <Icon type="logo-apple" />
                <span>Apple</span>
              </RadioDispatcher>
              <RadioDispatcher label="android" :rw-dispatcher-state="state">
                <Icon type="logo-android" />
                <span>Android</span>
              </RadioDispatcher>
              <RadioDispatcher label="windows" :rw-dispatcher-state="state">
                <Icon type="logo-windows" />
                <span>Windows</span>
              </RadioDispatcher>
            </RadioGroupDispatcher>
            <Icon :type="icon" style="font-size: 20px" @click="toggleState" />
          </FormItem>
        </Form>
      `,
      data () {
        return {
          form: { os: 'ios' },
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
    const span = wrapper.find('span')
    expect(span.is('span')).toBe(true)
    expect(span.text()).toBe('Apple')
  })

  it('the color of style is "green"', () => {
    const wrapper = createWrapper({
      template: `
        <RadioGroupDispatcher v-model="value" :rw-dispatcher-render="readStateRender">
          <RadioDispatcher label="金斑蝶" />
          <RadioDispatcher label="爪哇犀牛" />
          <RadioDispatcher label="印度黑羚" />
        </RadioGroupDispatcher>
      `,
      data () {
        return {
          value: '金斑蝶'
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
        <RadioGroupDispatcher v-model="value">
          <template #rwDispatcherRender="{ data }">
            <span style="color: red">{{ data.attrs.value }}</span>
          </template>
          <RadioDispatcher label="金斑蝶" />
          <RadioDispatcher label="爪哇犀牛" />
          <RadioDispatcher label="印度黑羚" />
        </RadioGroupDispatcher>
      `,
      data () {
        return {
          value: '金斑蝶'
        }
      }
    })
    const span = wrapper.find('span')
    expect(span.is('span')).toBe(true)
    expect(span.attributes('style')).toBe('color: red;')
  })
})
