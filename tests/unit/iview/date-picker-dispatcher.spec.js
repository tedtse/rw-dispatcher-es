import { createWrapper, useIViewPlugin } from '../utils'

describe('DatePickerDispatcher for iView', () => {
  useIViewPlugin()

  it('wrapper contains .ivu-date-picker', () => {
    const wrapper = createWrapper({
      template: '<DatePickerDispatcher v-model="value" placeholder="Select date" />',
      data () {
        return {
          value: new Date(2019, 9, 1)
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

  it('text is "2019-10-01"', () => {
    const wrapper = createWrapper({
      template: '<DatePickerDispatcher v-model="value" placeholder="Select date" />',
      data () {
        return {
          value: new Date(2019, 9, 1)
        }
      }
    })
    expect(wrapper.text()).toBe('2019-10-01')
  })

  it('text is "2019-10-01-2019-10-07"', () => {
    const wrapper = createWrapper({
      template: '<DatePickerDispatcher type="daterange" v-model="value" placeholder="Select date" />',
      data () {
        return {
          value: [new Date(2019, 9, 1), new Date(2019, 9, 7)]
        }
      }
    })
    expect(wrapper.text()).toBe('2019-10-01-2019-10-07')
  })

  it('text is "2019-10-01|2019-10-07"', () => {
    const wrapper = createWrapper({
      template: '<DatePickerDispatcher type="date" v-model="value" multiple placeholder="Select date" />',
      data () {
        return {
          value: [new Date(2019, 9, 1), new Date(2019, 9, 7)]
        }
      }
    })
    expect(wrapper.text()).toBe('2019-10-01|2019-10-07')
  })

  it('text is "2019年10月01日"', () => {
    const wrapper = createWrapper({
      template: '<DatePickerDispatcher v-model="value" format="yyyy年MM月dd日" type="date" placeholder="Select date" />',
      data () {
        return {
          value: new Date(2019, 9, 1)
        }
      }
    })
    expect(wrapper.text()).toBe('2019年10月01日')
  })

  it('text is "2019/10/01-2019/10/07"', () => {
    const wrapper = createWrapper({
      template: '<DatePickerDispatcher v-model="value" format="yyyy-MM-dd HH:mm" type="datetimerange" placement="bottom-end" placeholder="Select date" />',
      data () {
        return {
          value: [new Date(2019, 9, 1), new Date(2019, 9, 7, 12, 30)]
        }
      }
    })
    expect(wrapper.text()).toBe('2019-10-01 00:00-2019-10-07 12:30')
  })

  it('text is "2020"', () => {
    const wrapper = createWrapper({
      template: '<DatePickerDispatcher type="year" v-model="value" placeholder="Select year" />',
      data () {
        return {
          value: new Date(2020, 0, 1)
        }
      }
    })
    expect(wrapper.text()).toBe('2020')
  })

  it('text is "2019-05"', () => {
    const wrapper = createWrapper({
      template: '<DatePickerDispatcher type="month" v-model="value" placeholder="Select month" />',
      data () {
        return {
          value: new Date(2019, 4, 1)
        }
      }
    })
    expect(wrapper.text()).toBe('2019-05')
  })

  it('text is "2019-10-01and2019-10-07"', () => {
    const wrapper = createWrapper({
      template: `
        <DatePickerDispatcher
          type="date"
          v-model="value"
          rw-dispatcher-separator="and"
          multiple
          placeholder="Select date"
        />
      `,
      data () {
        return {
          value: [new Date(2019, 9, 1), new Date(2019, 9, 7)]
        }
      }
    })
    expect(wrapper.text()).toBe('2019-10-01and2019-10-07')
  })

  it('text is "2019/10/01to2019/10/07"', () => {
    const wrapper = createWrapper({
      template: `
        <DatePickerDispatcher
          v-model="date"
          rw-dispatcher-range-separator="to"
          format="yyyy/MM/dd"
          type="daterange"
          placement="bottom-end"
          placeholder="Select date"
        />
      `,
      data () {
        return {
          date: [new Date(2019, 9, 1), new Date(2019, 9, 7)]
        }
      }
    })
    expect(wrapper.text()).toBe('2019/10/01to2019/10/07')
  })

  it('wrapper contains .rw-dispatcher-ivu-date-picker-large', () => {
    const wrapper = createWrapper({
      template: '<DatePickerDispatcher v-model="value" size="large" placeholder="large size" />',
      data () {
        return {
          value: new Date(2019, 9, 1)
        }
      }
    })
    expect(wrapper.contains('.rw-dispatcher-ivu-date-picker-large')).toBe(true)
  })

  it('config of state in component is prior to config of state in local', () => {
    const wrapper = createWrapper({
      template: `
        <Form :model="form" :label-width="80">
          <FormItem label="活动日期">
            <DatePickerDispatcher
              v-model="form.date"
              :rw-dispatcher-state="state"
              style="width: 300px"
            />
            <Icon :type="icon" style="font-size: 20px" @click="toggleState" />
          </FormItem>
        </Form>
      `,
      data () {
        return {
          form: { date: new Date(2019, 9, 1) },
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
    expect(wrapper.text().includes('2019-10-01')).toBe(true)
  })

  it('the color of style is "green"', () => {
    const wrapper = createWrapper({
      template: `
        <DatePickerDispatcher
          v-model="date"
          :rw-dispatcher-render="readStateRender"
          placeholder="请输入内容"
        />
      `,
      data () {
        return {
          date: new Date(2019, 9, 1)
        }
      },
      methods: {
        readStateRender (h, context) {
          return h('span', {
            style: { color: 'green' }
          }, this.dateFormat(context.data))
        },
        dateFormat (data) {
          const { value } = data.attrs
          const date = new Date(value)
          return date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()
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
        <DatePickerDispatcher v-model="date" placeholder="请输入内容">
          <template #rwDispatcherRender="{ data }">
            <span style="color: red">{{ dateFormat(data) }}</span>
          </template>
        </DatePickerDispatcher>
      `,
      data () {
        return {
          date: new Date(2019, 9, 1)
        }
      },
      methods: {
        dateFormat (data) {
          const { value } = data.attrs
          const date = new Date(value)
          return date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()
        }
      }
    })
    const span = wrapper.find('span')
    expect(span.is('span')).toBe(true)
    expect(span.attributes('style')).toBe('color: red;')
  })
})
