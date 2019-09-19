import { mount } from '@vue/test-utils'
import merge from 'lodash/merge'
import { useIViewPlugin } from '../utils'
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

describe('test for global-conifg', () => {
  useIViewPlugin(globalConfig)

  it('text is "on"', () => {
    const wrapper = createWrapper({
      template: '<SwitchDispatcher v-model="toggle" />',
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
      template: '<SwitchDispatcher v-model="toggle" />',
      data () {
        return {
          toggle: false
        }
      }
    })
    expect(wrapper.text()).toBe('off')
  })

  it('text is "纽约&悉尼"', () => {
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
    expect(wrapper.text()).toBe('纽约&悉尼')
  })

  it('text is "4>8"', () => {
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
    expect(wrapper.text()).toBe('4>8')
  })

  it('text is "2019-10-01>2019-10-07"', () => {
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
    expect(wrapper.text()).toBe('2019-10-01>2019-10-07')
  })

  it('the color of style is "yellow"', () => {
    const wrapper = createWrapper({
      template: '<InputDispatcher v-model="value" placeholder="Enter something..." style="width: 300px" />',
      data () {
        return {
          value: 'global render function'
        }
      }
    })
    const span = wrapper.find('span')
    expect(span.is('span')).toBe(true)
    expect(span.attributes('style')).toBe('color: yellow;')
  })
})
