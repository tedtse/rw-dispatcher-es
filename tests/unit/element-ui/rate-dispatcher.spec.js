import { createWrapper, useElePlugin } from '../utils'

describe('RateDispatcher for ElementUI', () => {
  useElePlugin()

  it('attibute of aria-valuenow is "3"', () => {
    const wrapper = createWrapper({
      template: '<el-rate-dispatcher v-model="value" show-text />',
      data () {
        return {
          value: 3
        }
      }
    })
    const rate = wrapper.find('.el-rate')
    expect(rate.is('div'))
    expect(rate.attributes('aria-valuenow')).toBe('3')
  })

  it('config of state in component is prior to config of state in local', () => {
    const wrapper = createWrapper({
      template: `<el-rate-dispatcher v-model="rate" :rw-dispatcher-state="state" />`,
      data () {
        return {
          rate: 3,
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
    const item = wrapper.find('.el-rate__item')
    expect(item.is('span'))
    expect(item.attributes('style')).toBe('cursor: auto;')
  })

  it('the color of style is "green"', () => {
    const wrapper = createWrapper({
      template: '<el-rate-dispatcher v-model="value" :rw-dispatcher-render="rateRender" />',
      data () {
        return {
          value: 3
        }
      },
      methods: {
        rateRender (h, context) {
          const { value } = context.data.attrs
          return h('span', {
            style: { color: 'green' }
          }, value + '颗星')
        }
      }
    })
    const span = wrapper.find('span')
    expect(span.is('span')).toBe(true)
    expect(span.text()).toBe('3颗星')
    expect(span.attributes('style')).toBe('color: green;')
  })

  it('the color of style is "red"', () => {
    const wrapper = createWrapper({
      template: `
        <el-rate-dispatcher v-model="value">
          <template #rwDispatcherRender="{ data }">
            <span style="color: red">
              {{ data.attrs.value }}颗星
            </span>
          </template>
        </el-rate-dispatcher>
      `,
      data () {
        return {
          value: 3
        }
      }
    })
    const span = wrapper.find('span')
    expect(span.is('span')).toBe(true)
    expect(span.text()).toBe('3颗星')
    expect(span.attributes('style')).toBe('color: red;')
  })
})
