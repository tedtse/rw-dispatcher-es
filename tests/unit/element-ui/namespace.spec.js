import { mount } from '@vue/test-utils'
import merge from 'lodash/merge'
import { useElePlugin } from '../utils'

const myNsWrapper = {
  name: 'MyNSWrapper',
  template: `
    <div class="test-wrapper">
      <slot />
    </div>
  `,
  provide () {
    return {
      myNsProvider: this
    }
  },
  data () {
    return {
      myNsState: 'read'
    }
  }
}

const createWrapper = (dispatcher, wrapperOpts = {}) => {
  return mount(myNsWrapper, merge({
    slots: {
      default: dispatcher
    }
  }, wrapperOpts))
}

describe('test for namespace', () => {
  useElePlugin({
    namespace: 'my-ns'
  })

  it('wrapper contains .my-ns-el-input', () => {
    const wrapper = createWrapper({
      template: '<el-input-dispatcher v-model="input" />',
      data () {
        return {
          input: 'input dispatcher'
        }
      }
    })
    const input = wrapper.find('.my-ns-el-input')
    expect(input.exists()).toBe(true)
    expect(typeof input.attributes('my-ns-uuid')).toBe('string')
  })

  it('role is "my-ns-hidden-component"', () => {
    const wrapper = createWrapper({
      template: '<el-checkbox-dispatcher v-model="checked">备选项</el-checkbox-dispatcher>',
      data () {
        return {
          checked: false
        }
      }
    })
    const hiddenComponent = wrapper.find('[role="my-ns-hidden-component"]')
    expect(hiddenComponent.exists()).toBe(true)
  })

  it('attribute of separator is "my-ns-separator"', () => {
    const wrapper = createWrapper({
      template: `
        <el-select-dispatcher
          v-model="value"
          my-ns-separator="and"
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
    expect(wrapper.text()).toBe('黄金糕and双皮奶')
  })

  it('attribute of rangeSeparator is "my-ns-range-separato"', () => {
    const wrapper = createWrapper({
      template: `
        <el-slider-dispatcher
          v-model="value"
          my-ns-range-separator="to"
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
    expect(wrapper.text()).toBe('4to8')
  })

  it('attribute of render is "my-ns-render"', () => {
    const wrapper = createWrapper({
      template: '<el-switch-dispatcher v-model="toggle" :my-ns-render="switchRender" />',
      data () {
        return {
          toggle: true
        }
      },
      methods: {
        switchRender (h, context) {
          const { value } = context.data.attrs
          return h('span', {
            style: { color: 'green' }
          }, value ? '开' : '关')
        }
      }
    })
    const span = wrapper.find('span')
    expect(span.is('span'))
    expect(span.attributes('style')).toBe('color: green;')
    expect(span.text()).toBe('开')
  })

  it('name of slot is "myNsRender"', () => {
    const wrapper = createWrapper({
      template: `
        <el-switch-dispatcher v-model="toggle">
          <template #myNsRender="{ data }">
            <span style="color: red">
              {{ data.attrs.value ? '开' : '关' }}
            </span>
          </template>
        </el-switch-dispatcher>
      `,
      data () {
        return {
          toggle: false
        }
      }
    })
    const span = wrapper.find('span')
    expect(span.is('span'))
    expect(span.attributes('style')).toBe('color: red;')
    expect(span.text()).toBe('关')
  })
})
