import { createWrapper, useElePlugin } from '../utils'

describe('SliderDispatcher for ElementUI', () => {
  useElePlugin()

  it('wrapper contains .el-slider', () => {
    const wrapper = createWrapper({
      template: '<el-slider-dispatcher v-model="value" />',
      data () {
        return {
          value: 50
        }
      }
    }, {
      data () {
        return {
          rwDispatcherState: 'write'
        }
      }
    })
    expect(wrapper.contains('.el-slider')).toBe(true)
  })

  it('text is "50"', () => {
    const wrapper = createWrapper({
      template: '<el-slider-dispatcher v-model="value" />',
      data () {
        return {
          value: 50
        }
      }
    })
    expect(wrapper.text()).toBe('50')
  })

  it('range is "4to8"', () => {
    const wrapper = createWrapper({
      template: `
        <el-slider-dispatcher
          v-model="value"
          rw-dispatcher-range-separator="to"
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

  it('config of state in component is prior to config of state in local', () => {
    const wrapper = createWrapper({
      template: `
        <el-slider-dispatcher
          v-model="range"
          range
          :rw-dispatcher-state="state"
        />
      `,
      data () {
        return {
          range: [0, 10],
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
    expect(wrapper.text()).toBe('0-10')
  })

  it('the color of style is "green"', () => {
    const wrapper = createWrapper({
      template: '<el-slider-dispatcher v-model="value" :rw-dispatcher-render="sliderRender" />',
      data () {
        return {
          value: 0
        }
      },
      methods: {
        sliderRender (h, context) {
          const { value } = context.data.attrs
          return h('span', {
            style: { color: 'green' }
          }, value)
        }
      }
    })
    const span = wrapper.find('span')
    expect(span.is('span')).toBe(true)
    expect(span.text()).toBe('0')
    expect(span.attributes('style')).toBe('color: green;')
  })

  it('the color of style is "red"', () => {
    const wrapper = createWrapper({
      template: `
        <el-slider-dispatcher v-model="value">
          <template #rwDispatcherRender="{ data }">
            <span style="color: red">
              {{ data.attrs.value }}
            </span>
          </template>
        </el-slider-dispatcher>
      `,
      data () {
        return {
          value: 50
        }
      }
    })
    const span = wrapper.find('span')
    expect(span.is('span')).toBe(true)
    expect(span.text()).toBe('50')
    expect(span.attributes('style')).toBe('color: red;')
  })
})
