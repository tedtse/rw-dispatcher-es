import { mount } from '@vue/test-utils'
import merge from 'lodash/merge'
import { useIViewPlugin } from '../utils'
import localConfig from './config/local.config'

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
      rwDispatcherState: 'read',
      rwDispatcherConfig: localConfig
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

describe('test for local-config', () => {
  useIViewPlugin()

  it('text is "开"', () => {
    const wrapper = createWrapper({
      template: '<SwitchDispatcher v-model="toggle" />',
      data () {
        return {
          toggle: true
        }
      }
    })
    expect(wrapper.text()).toBe('开')
  })

  it('text is "关"', () => {
    const wrapper = createWrapper({
      template: '<SwitchDispatcher v-model="toggle" />',
      data () {
        return {
          toggle: false
        }
      }
    })
    expect(wrapper.text()).toBe('关')
  })

  it('text is "纽约和悉尼"', () => {
    const wrapper = createWrapper({
      template: `
        <SelectDispatcher v-model="value">
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
    expect(wrapper.text()).toBe('纽约和悉尼')
  })

  it('text is "4至8"', () => {
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
    expect(wrapper.text()).toBe('4至8')
  })

  it('text is "2019-10-01至2019-10-07"', () => {
    const wrapper = createWrapper({
      template: `
        <DatePickerDispatcher
          type="daterange"
          v-model="value"
          placeholder="Select date"
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
    expect(wrapper.text()).toBe('2019-10-01至2019-10-07')
  })

  it('the color of style is "cyan"', () => {
    const wrapper = createWrapper({
      template: '<InputDispatcher v-model="value" placeholder="Enter something..." style="width: 300px" />',
      data () {
        return {
          value: 'local render function'
        }
      }
    })
    const span = wrapper.find('span')
    expect(span.is('span')).toBe(true)
    expect(span.attributes('style')).toBe('color: cyan;')
  })
})
