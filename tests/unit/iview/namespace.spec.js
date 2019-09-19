import { mount } from '@vue/test-utils'
import merge from 'lodash/merge'
import { useIViewPlugin } from '../utils'

const myNSWrapper = {
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
  return mount(myNSWrapper, merge({
    slots: {
      default: dispatcher
    }
  }, wrapperOpts))
}

describe('test for namespace', () => {
  useIViewPlugin({
    namespace: 'my-ns'
  })

  it('wrapper contains .my-ns-el-input', () => {
    const wrapper = createWrapper({
      template: '<InputDispatcher v-model="value" placeholder="Enter something..." />',
      data () {
        return {
          value: 'input dispatcher'
        }
      }
    })
    const input = wrapper.find('.my-ns-ivu-input')
    expect(input.exists()).toBe(true)
    expect(typeof input.attributes('my-ns-uuid')).toBe('string')
  })

  it('role is "my-ns-hidden-component"', () => {
    const wrapper = createWrapper({
      template: '<CheckboxDispatcher v-model="checked">Checkbox</CheckboxDispatcher>',
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
        <SelectDispatcher v-model="value" my-ns-separator="and">
          <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </SelectDispatcher>
      `,
      data () {
        return {
          value: ['New York', 'Sydney'],
          cityList: [
            {
              value: 'New York',
              label: '纽约'
            },
            {
              value: 'London',
              label: '伦敦'
            },
            {
              value: 'Sydney',
              label: '悉尼'
            },
            {
              value: 'Ottawa',
              label: '渥太华'
            },
            {
              value: 'Paris',
              label: '巴黎'
            },
            {
              value: 'Canberra',
              label: '堪培拉'
            }
          ]
        }
      }
    })
    expect(wrapper.text()).toBe('纽约and悉尼')
  })

  it('attribute of rangeSeparator is "my-ns-range-separato"', () => {
    const wrapper = createWrapper({
      template: `
        <SliderDispatcher
          v-model="value"
          my-ns-range-separator="to"
          range
          style="padding: 0 20px"
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
      template: `
        <SwitchDispatcher
          v-model="toggle"
          :my-ns-render="readStateRender"
          placeholder="请输入内容"
        />
      `,
      data () {
        return {
          toggle: true
        }
      },
      methods: {
        readStateRender (h, context) {
          return h('span', {
            style: { color: 'green' }
          }, context.data.attrs.value ? 'Yes' : 'No')
        }
      }
    })
    const span = wrapper.find('span')
    expect(span.is('span'))
    expect(span.attributes('style')).toBe('color: green;')
    expect(span.text()).toBe('Yes')
  })

  it('name of slot is "myNsRender"', () => {
    const wrapper = createWrapper({
      template: `
        <SwitchDispatcher v-model="toggle" placeholder="请输入内容">
          <template #myNsRender="{ data }">
            <span style="color: red">{{ data.attrs.value ? 'Yes' : 'No' }}</span>
          </template>
        </SwitchDispatcher>
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
    expect(span.text()).toBe('No')
  })
})
