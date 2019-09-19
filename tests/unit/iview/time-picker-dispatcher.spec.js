import { createWrapper, useIViewPlugin } from '../utils'

describe('TimePickerDispatcher for iView', () => {
  useIViewPlugin()

  it('wrapper contains .ivu-date-picker', () => {
    const wrapper = createWrapper({
      template: '<TimePickerDispatcher type="time" v-model="value" placeholder="Select time" />',
      data () {
        return {
          value: '02:10:02'
        }
      }
    }, {
      data () {
        return {
          rwDispatcherState: 'write'
        }
      }
    })
    expect(wrapper.contains('.ivu-date-picker')).toBe(true)
  })

  it('text is "02:10:02"', () => {
    const wrapper = createWrapper({
      template: '<TimePickerDispatcher type="time" v-model="value" placeholder="Select time" />',
      data () {
        return {
          value: '02:10:02'
        }
      }
    })
    expect(wrapper.text()).toBe('02:10:02')
  })

  it('text is "02:10:02-04:07:59"', () => {
    const wrapper = createWrapper({
      template: '<TimePickerDispatcher type="timerange" v-model="value" placement="bottom-end" placeholder="Select time" />',
      data () {
        return {
          value: ['02:10:02', '04:07:59']
        }
      }
    })
    expect(wrapper.text()).toBe('02:10:02-04:07:59')
  })

  it('text is "02点10分02秒"', () => {
    const wrapper = createWrapper({
      template: '<TimePickerDispatcher v-model="value" format="HH点mm分ss秒" placeholder="Select time" />',
      data () {
        return {
          value: '02点10分02秒'
        }
      }
    })
    expect(wrapper.text()).toBe('02点10分02秒')
  })

  it('text is "02:10"', () => {
    const wrapper = createWrapper({
      template: '<TimePickerDispatcher v-model="value" format="HH:mm" placeholder="Select time" />',
      data () {
        return {
          value: '02:10'
        }
      }
    })
    expect(wrapper.text()).toBe('02:10')
  })

  it('text is "00’00’02to00’02’02"', () => {
    const wrapper = createWrapper({
      template: `
        <TimePickerDispatcher
          v-model="time"
          rw-dispatcher-range-separator="to"
          format="HH’mm’ss"
          type="timerange"
          placement="bottom-end"
          placeholder="Select time"
        />
      `,
      data () {
        return {
          time: ['00’00’02', '00’02’02']
        }
      }
    })
    expect(wrapper.text()).toBe('00’00’02to00’02’02')
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
          <FormItem label="活动时间">
            <TimePickerDispatcher
              v-model="form.time"
              :rw-dispatcher-state="state"
              style="width: 300px"
            />
            <Icon :type="icon" style="font-size: 20px" @click="toggleState" />
          </FormItem>
        </Form>
      `,
      data () {
        return {
          form: { time: '02:10:02' },
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
    expect(wrapper.contains('.rw-dispatcher-ivu-time-picker')).toBe(true)
  })

  it('the color of style is "green"', () => {
    const wrapper = createWrapper({
      template: `
        <TimePickerDispatcher
          v-model="time"
          :rw-dispatcher-render="readStateRender"
          placeholder="请输入内容"
        />
      `,
      data () {
        return {
          time: '02:10:02'
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
        <TimePickerDispatcher v-model="time" placeholder="请输入内容">
          <template #rwDispatcherRender="{ data }">
            <span style="color: red">{{ data.attrs.value }}</span>
          </template>
        </TimePickerDispatcher>
      `,
      data () {
        return {
          time: '02:10:02'
        }
      }
    })
    const span = wrapper.find('span')
    expect(span.is('span')).toBe(true)
    expect(span.attributes('style')).toBe('color: red;')
  })
})
