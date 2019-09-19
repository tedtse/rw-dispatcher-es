import { createWrapper, useIViewPlugin } from '../utils'

describe('CheckboxDispatcher for iView', () => {
  useIViewPlugin()

  it('wrapper contains .ivu-checkbox', () => {
    const wrapper = createWrapper({
      template: '<CheckboxDispatcher v-model="single">Checkbox</CheckboxDispatcher>',
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
    expect(wrapper.contains('.ivu-checkbox')).toBe(true)
  })

  it('text is "Checkbox"', () => {
    const wrapper = createWrapper({
      template: '<CheckboxDispatcher v-model="single">Checkbox</CheckboxDispatcher>',
      data () {
        return {
          single: true
        }
      }
    })
    expect(wrapper.text()).toBe('Checkbox')
  })

  it('text is "Facebook| Github"', () => {
    const wrapper = createWrapper({
      template:  `
        <CheckboxGroupDispatcher v-model="social">
          <CheckboxDispatcher label="twitter">
            <Icon type="logo-twitter"></Icon>
            <span>Twitter</span>
          </CheckboxDispatcher>
          <CheckboxDispatcher label="facebook">
            <Icon type="logo-facebook"></Icon>
            <span>Facebook</span>
          </CheckboxDispatcher>
          <CheckboxDispatcher label="github">
            <Icon type="logo-github"></Icon>
            <span>Github</span>
          </CheckboxDispatcher>
          <CheckboxDispatcher label="snapchat">
            <Icon type="logo-snapchat"></Icon>
            <span>Snapchat</span>
          </CheckboxDispatcher>
        </CheckboxGroupDispatcher>
      `,
      data () {
        return {
          social: ['facebook', 'github']
        }
      }
    })
    expect(wrapper.text()).toBe('Facebook| Github')
  })

  it('text is "苹果and西瓜"', () => {
    const wrapper = createWrapper({
      template: `
        <CheckboxGroupDispatcher v-model="fruit" rw-dispatcher-separator="and" style="margin-top: 20px">
          <CheckboxDispatcher label="香蕉" />
          <CheckboxDispatcher label="苹果" />
          <CheckboxDispatcher label="西瓜" />
        </CheckboxGroupDispatcher>
      `,
      data () {
        return {
          fruit: ['苹果', '西瓜']
        }
      }
    })
    expect(wrapper.text()).toBe('苹果and西瓜')
  })

  it('config of state in component is prior to config of state in local', () => {
    const wrapper = createWrapper({
      template: `
        <Form :model="form">
          <FormItem label="操作系统">
            <CheckboxGroupDispatcher v-model="form.os" :rw-dispatcher-state="state">
              <CheckboxDispatcher label="ios" :rw-dispatcher-state="state">
                <Icon type="logo-apple" />
                <span>Apple</span>
              </CheckboxDispatcher>
              <CheckboxDispatcher label="android" :rw-dispatcher-state="state">
                <Icon type="logo-android" />
                <span>Android</span>
              </CheckboxDispatcher>
              <CheckboxDispatcher label="windows" :rw-dispatcher-state="state">
                <Icon type="logo-windows" />
                <span>Windows</span>
              </CheckboxDispatcher>
              <CheckboxDispatcher label="linux" :rw-dispatcher-state="state">
                <Icon type="logo-tux" />
                <span>Linux</span>
              </CheckboxDispatcher>
            </CheckboxGroupDispatcher>
            <Icon :type="icon" style="font-size: 20px" @click="toggleState" />
          </FormItem>
        </Form>
      `,
      data () {
        return {
          form: { os: ['ios', 'linux'] },
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
    expect(wrapper.text().includes('Apple| Linux')).toBe(true)
  })

  it('the color of style is "green"', () => {
    const wrapper = createWrapper({
      template: `
        <CheckboxGroupDispatcher v-model="value" :rw-dispatcher-render="readStateRender">
          <CheckboxDispatcher label="金斑蝶" />
          <CheckboxDispatcher label="爪哇犀牛" />
          <CheckboxDispatcher label="印度黑羚" />
        </CheckboxGroupDispatcher>
      `,
      data () {
        return {
          value: ['金斑蝶', '爪哇犀牛']
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
        <CheckboxGroupDispatcher v-model="value">
          <template #rwDispatcherRender="{ data }">
            <span style="color: red">{{ data.attrs.value.join(' | ') }}</span>
          </template>
          <CheckboxDispatcher label="金斑蝶" />
          <CheckboxDispatcher label="爪哇犀牛" />
          <CheckboxDispatcher label="印度黑羚" />
        </CheckboxGroupDispatcher>
      `,
      data () {
        return {
          value: ['金斑蝶', '爪哇犀牛']
        }
      }
    })
    const span = wrapper.find('span')
    expect(span.is('span')).toBe(true)
    expect(span.attributes('style')).toBe('color: red;')
  })
})
