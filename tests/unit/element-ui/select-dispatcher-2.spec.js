import { createWrapper, createLocalVue4Ele } from '../utils'

const options1 = [
  {
    value: '选项1',
    label: '黄金糕'
  },
  {
    value: '选项2',
    label: '双皮奶'
  },
  {
    value: '选项3',
    label: '蚵仔煎'
  },
  {
    value: '选项4',
    label: '龙须面'
  },
  {
    value: '选项5',
    label: '北京烤鸭'
  }
]

describe('SelectDispatcher for ElementUI', () => {
  // 此用例放在 el-select.spec.js 会报错, 单独放就不会。无法解释
  it('wrapper contains .el-select', () => {
    const localVue = createLocalVue4Ele()
    const wrapper = createWrapper({
      template: `
        <el-select-dispatcher v-model="value" clearable placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select-dispatcher>
      `,
      data () {
        return {
          value: '选项2',
          options: options1
        }
      }
    }, {
      data () {
        return { rwDispatcherState: 'write' }
      },
      stubs: {
        transition: false
      },
      localVue
    })
    expect(wrapper.contains('.el-select')).toBe(true)
  })

  it('config of state in component is prior to config of state in local', () => {
    const localVue = createLocalVue4Ele()
    const wrapper = createWrapper({
      template: `
        <el-select-dispatcher
          v-model="value"
          :rw-dispatcher-state="state"
          clearable
          placeholder="请选择"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select-dispatcher>
      `,
      data () {
        return {
          value: '选项2',
          options: options1,
          state: 'read'
        }
      }
    }, {
      data () {
        return { rwDispatcherState: 'write' }
      },
      stubs: {
        transition: false
      },
      localVue
    })
    expect(wrapper.text()).toBe('双皮奶')
  })
})
