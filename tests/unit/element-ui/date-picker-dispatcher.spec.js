import { createWrapper, useElePlugin } from '../utils'

describe('DatePickerDispatcher for ElementUI', () => {
  useElePlugin()

  it('wrapper contains .el-date-editor', () => {
    const wrapper = createWrapper({
      template: `
        <el-date-picker-dispatcher
          v-model="value"
          type="date"
          placeholder="选择日期"
        />
      `,
      data () {
        return {
          value: new Date('2019/10/1')
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

  it('text is "2019-10-01"', () => {
    const wrapper = createWrapper({
      template: `
        <el-date-picker-dispatcher
          v-model="value"
          type="date"
          placeholder="选择日期"
        />
      `,
      data () {
        return {
          value: new Date('2019/10/1')
        }
      }
    })
    expect(wrapper.text()).toBe('2019-10-01')
  })

  it('text is "2019 第 40 周"', () => {
    const wrapper = createWrapper({
      template: `
        <el-date-picker-dispatcher
          v-model="value"
          type="week"
          format="yyyy 第 WW 周"
          placeholder="选择周"
        />
      `,
      data () {
        return {
          value: new Date('2019/10/1')
        }
      }
    })
    expect(wrapper.text()).toBe('2019 第 40 周')
  })

  it('text is "2019"', () => {
    const wrapper = createWrapper({
      template: `
        <el-date-picker-dispatcher
          v-model="value"
          type="year"
          placeholder="选择年"
        />
      `,
      data () {
        return {
          value: new Date('2019/10/1')
        }
      }
    })
    expect(wrapper.text()).toBe('2019')
  })

  it('text is "2019-10"', () => {
    const wrapper = createWrapper({
      template: `
        <el-date-picker-dispatcher
          v-model="value"
          type="month"
          placeholder="选择月"
        />
      `,
      data () {
        return {
          value: new Date('2019/10/1')
        }
      }
    })
    expect(wrapper.text()).toBe('2019-10')
  })

  it('text is "2019-10"', () => {
    const wrapper = createWrapper({
      template: `
        <el-date-picker-dispatcher
          v-model="value"
          type="month"
          placeholder="选择月"
        />
      `,
      data () {
        return {
          value: new Date('2019/10/1')
        }
      }
    })
    expect(wrapper.text()).toBe('2019-10')
  })

  it('text is "2019-10-01, 2019-10-07"', () => {
    const wrapper = createWrapper({
      template: `
        <el-date-picker-dispatcher
          type="dates"
          v-model="values"
          placeholder="选择一个或多个日期"
        />
      `,
      data () {
        return {
          values: [
            new Date('2019/10/1'),
            new Date('2019/10/7')
          ]
        }
      }
    })
    expect(wrapper.text()).toBe('2019-10-01, 2019-10-07')
  })

  it('text is "2019-10-01至2019-10-07"', () => {
    const wrapper = createWrapper({
      template: `
        <el-date-picker-dispatcher
          v-model="values"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        />
      `,
      data () {
        return {
          values: [
            new Date('2019/10/1'),
            new Date('2019/10/7')
          ]
        }
      }
    })
    expect(wrapper.text()).toBe('2019-10-01至2019-10-07')
  })

  it('text is "2019-09-01至2020-09-01"', () => {
    const wrapper = createWrapper({
      template: `
        <el-date-picker-dispatcher
          v-model="values"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        />
      `,
      data () {
        return {
          values: [
            new Date('2019/9/1'),
            new Date('2020/9/1')
          ]
        }
      }
    })
    expect(wrapper.text()).toBe('2019-09-01至2020-09-01')
  })

  it('text is "2019-10-01 00:00:00"', () => {
    const wrapper = createWrapper({
      template: `
        <el-date-picker-dispatcher
          v-model="value"
          type="datetime"
          placeholder="选择日期时间"
        />
      `,
      data () {
        return {
          value: new Date('2019/10/1')
        }
      }
    })
    expect(wrapper.text()).toBe('2019-10-01 00:00:00')
  })

  it('config of state in component is prior to config of state in local', () => {
    const wrapper = createWrapper({
      template: `
        <el-date-picker-dispatcher
          v-model="value"
          :rw-dispatcher-state="state"
          style="width: 300px"
        />
      `,
      data () {
        return {
          value: new Date('2019/10/1'),
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
    expect(wrapper.text()).toBe('2019-10-01')
  })

  it('the color of style is "green"', () => {
    const wrapper = createWrapper({
      template: `
        <el-date-picker-dispatcher
          v-model="value"
          type="date"
          placeholder="选择日期"
          :rw-dispatcher-render="datePickerRender"
        />
      `,
      data () {
        return {
          value: new Date('2019/10/1')
        }
      },
      methods: {
        datePickerRender (h, context) {
          const { value } = context.data.attrs
          const date = new Date(value)
          return h('span', {
            style: { color: 'green' }
          }, date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate())
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
        <el-date-picker-dispatcher
          v-model="value"
          type="date"
          placeholder="选择日期"
        >
          <template #rwDispatcherRender="{ data }">
            <span style="color: red">{{ dateFormat(data) }}</span>
          </template>
        </el-date-picker-dispatcher>
      `,
      data () {
        return {
          value: new Date('2019/10/1')
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
