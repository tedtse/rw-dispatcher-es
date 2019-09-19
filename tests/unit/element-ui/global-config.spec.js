import { mount } from '@vue/test-utils'
import merge from 'lodash/merge'
import { useElePlugin } from '../utils'
import globalConfig from './config/global.config'

const Wrapper = {
  name: 'Wrapper',
  template: `
    <div class="test-wrapper">
      <slot />
    </div>
  `,
  provide () {
    return {
      rwDispatcherProvider: this
    }
  },
  data () {
    return {
      rwDispatcherState: 'read'
    }
  }
}

const createWrapper = (dispatcher, wrapperOpts = {}) => {
  return mount(Wrapper, merge({
    slots: {
      default: dispatcher
    }
  }, wrapperOpts))
}

describe('test for global-config', () => {
  useElePlugin(globalConfig)

  it('text is "on"', () => {
    const wrapper = createWrapper({
      template: '<el-switch-dispatcher v-model="toggle" />',
      data () {
        return {
          toggle: true
        }
      }
    })
    expect(wrapper.text()).toBe('on')
  })

  it('text is "off"', () => {
    const wrapper = createWrapper({
      template: '<el-switch-dispatcher v-model="toggle" />',
      data () {
        return {
          toggle: false
        }
      }
    })
    expect(wrapper.text()).toBe('off')
  })

  it('text is "黄金糕&双皮奶"', () => {
    const wrapper = createWrapper({
      template: `
        <el-select-dispatcher
          v-model="value"
          multiple
          collapse-tags
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
          value: ['选项1', '选项2'],
          options: [
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
        }
      }
    })
    expect(wrapper.text()).toBe('黄金糕&双皮奶')
  })

  it('text is "4>8"', () => {
    const wrapper = createWrapper({
      template: `
        <el-slider-dispatcher
          v-model="value"
          range
          show-stops
          :max="10"
        />
      `,
      data () {
        return {
          value: [4, 8]
        }
      }
    })
    expect(wrapper.text()).toBe('4>8')
  })

  it('text is "2019-10-01>2019-10-07"', () => {
    const wrapper = createWrapper({
      template: `
        <el-date-picker-dispatcher
          v-model="value"
          type="daterange"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        />
      `,
      data () {
        return {
          value: [
            new Date(2019, 9, 1),
            new Date(2019, 9, 7)
          ]
        }
      }
    })
    expect(wrapper.text()).toBe('2019-10-01>2019-10-07')
  })

  it('the color of style is "yellow"', () => {
    const wrapper = createWrapper({
      template: '<el-input-dispatcher v-model="input" placeholder="请输入内容" />',
      data () {
        return {
          input: 'global render function'
        }
      }
    })
    const span = wrapper.find('span')
    expect(span.is('span')).toBe(true)
    expect(span.attributes('style')).toBe('color: yellow;')
  })
})
