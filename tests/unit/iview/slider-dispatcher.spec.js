import { createWrapper, useIViewPlugin } from '../utils'

describe('SliderDispatcher for iView', () => {
  useIViewPlugin()

  it('wrapper contains .ivu-slider', () => {
    const wrapper = createWrapper({
      template: '<SliderDispatcher v-model="value" />',
      data () {
        return {
          value: 25
        }
      }
    }, {
      data () {
        return {
          rwDispatcherState: 'write'
        }
      }
    })
    expect(wrapper.contains('.ivu-slider')).toBe(true)
  })

  it('text is "25"', () => {
    const wrapper = createWrapper({
      template: '<SliderDispatcher v-model="value" />',
      data () {
        return {
          value: 25
        }
      }
    })
    expect(wrapper.text()).toBe('25')
  })

  it('text is "20-50"', () => {
    const wrapper = createWrapper({
      template: '<SliderDispatcher v-model="value" range />',
      data () {
        return {
          value: [20, 50]
        }
      }
    })
    expect(wrapper.text()).toBe('20-50')
  })

  it('text is "Progress: 25%"', () => {
    const wrapper = createWrapper({
      template: '<SliderDispatcher v-model="value" :tip-format="format" />',
      data () {
        return {
          value: 25
        }
      },
      methods: {
        format (val) {
          return 'Progress: ' + val + '%'
        }
      }
    })
    expect(wrapper.text()).toBe('Progress: 25%')
  })

  it('text is "20to50"', () => {
    const wrapper = createWrapper({
      template: `
        <SliderDispatcher
          v-model="value"
          rw-dispatcher-range-separator="to"
          range
          style="padding: 0 20px"
        />
      `,
      data () {
        return {
          value: [20, 50]
        }
      }
    })
    expect(wrapper.text()).toBe('20to50')
  })

  it('config of state in component is prior to config of state in local', () => {
    const wrapper = createWrapper({
      template: `
        <div style="padding: 0 20px">
          <SliderDispatcher v-model="progress" :rw-dispatcher-state="state" />
          <Icon :type="icon" style="font-size: 20px" @click="toggleState" />
        </div>
      `,
      data () {
        return {
          progress: 25,
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
    expect(wrapper.text()).toBe('25')
  })

  it('the color of style is "green"', () => {
    const wrapper = createWrapper({
      template: `
        <SliderDispatcher
          v-model="progress"
          :rw-dispatcher-render="readStateRender"
          placeholder="请输入内容"
          style="padding: 0 20px"
        />
      `,
      data () {
        return {
          progress: 40
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
        <SliderDispatcher
          v-model="progress"
          placeholder="请输入内容"
          style="padding: 0 20px"
        >
          <template #rwDispatcherRender="{ data }">
            <span style="color: red">{{ data.attrs.value }}</span>
          </template>
        </SliderDispatcher>
      `,
      data () {
        return {
          progress: 67
        }
      }
    })
    const span = wrapper.find('span')
    expect(span.is('span')).toBe(true)
    expect(span.attributes('style')).toBe('color: red;')
  })
})
