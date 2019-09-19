import { createWrapper, useElePlugin } from '../utils'

describe('TimePickerDispatcher for ElementUI', () => {
  useElePlugin()

  it('wrapper contains .el-date-editor', () => {
    const wrapper = createWrapper({
      template: `
        <el-time-picker-dispatcher
          arrow-control
          v-model="value"
          :picker-options="pickerOptions"
          placeholder="任意时间点"
        />
      `,
      data () {
        return {
          value: new Date(2016, 9, 10, 18, 40),
          pickerOptions: {
            selectableRange: '18:30:00 - 20:30:00'
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
    expect(wrapper.contains('.el-date-editor')).toBe(true)
  })

  it('text is "18:40:00"', () => {
    const wrapper = createWrapper({
      template: `
        <el-time-picker-dispatcher
          arrow-control
          v-model="value"
          :picker-options="pickerOptions"
          placeholder="任意时间点"
        />
      `,
      data () {
        return {
          value: new Date(2016, 9, 10, 18, 40),
          pickerOptions: {
            selectableRange: '18:30:00 - 20:30:00'
          }
        }
      }
    })
    expect(wrapper.text()).toBe('18:40:00')
  })

  it('config of state in component is prior to config of state in local', () => {
    const wrapper = createWrapper({
      template: `
        <el-time-picker-dispatcher
          v-model="time"
          :rw-dispatcher-state="state"
          style="width: 300px"
        />
      `,
      data () {
        return {
          time: new Date(2019, 6, 18, 0, 0, 0),
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
    expect(wrapper.text()).toBe('00:00:00')
  })

  it('the color of style is "green"', () => {
    const wrapper = createWrapper({
      template: `
        <el-time-picker-dispatcher
          arrow-control
          v-model="value"
          placeholder="任意时间点"
          :rw-dispatcher-render="timePickerRender"
        />
      `,
      data () {
        return {
          value: new Date(2016, 9, 10, 18, 40)
        }
      },
      methods: {
        timePickerRender (h, context) {
          const { value } = context.data.attrs
          return h('span', {
            style: { color: 'green' }
          }, value.getHours() + '时' + value.getMinutes() + '分' + value.getSeconds() + '秒')
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
        <el-time-picker-dispatcher
          arrow-control
          v-model="value"
          placeholder="任意时间点"
        >
          <template #rwDispatcherRender="{ data }">
            <span style="color: red">{{ timePickerFormat(data) }}</span>
          </template>
        </el-time-picker-dispatcher>
      `,
      data () {
        return {
          value: new Date(2016, 9, 10, 18, 40)
        }
      },
      methods: {
        timePickerFormat (data) {
          const { value } = data.attrs
          return value.getHours() + '时' + value.getMinutes() + '分' + value.getSeconds() + '秒'
        }
      }
    })
    const span = wrapper.find('span')
    expect(span.is('span')).toBe(true)
    expect(span.attributes('style')).toBe('color: red;')
  })
})
