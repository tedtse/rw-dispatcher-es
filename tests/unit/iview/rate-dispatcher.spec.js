import { createWrapper, useIViewPlugin } from '../utils'

describe('RateDispatcher for iView', () => {
  useIViewPlugin()

  it('wrapper contains .ivu-rate', () => {
    const wrapper = createWrapper({
      template: '<RateDispatcher show-text v-model="value" />',
      data () {
        return {
          value: 3
        }
      }
    }, {
      data () {
        return {
          rwDispatcherState: 'write'
        }
      }
    })
    expect(wrapper.contains('.ivu-rate')).toBe(true)
  })

  it('length is 3', () => {
    const wrapper = createWrapper({
      template: '<RateDispatcher show-text v-model="value" />',
      data () {
        return {
          value: 3
        }
      }
    })
    const start = wrapper.findAll('.ivu-rate-star-full')
    expect(start.length).toBe(3)
  })

  it('the color of style is "green"', () => {
    const wrapper = createWrapper({
      template: `
        <RateDispatcher
          v-model="rate"
          :rw-dispatcher-render="readStateRender"
          placeholder="请输入内容"
        />
      `,
      data () {
        return {
          rate: 3
        }
      },
      methods: {
        readStateRender (h, context) {
          return h('span', {
            style: { color: 'green' }
          }, context.data.attrs.value)
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
        <RateDispatcher v-model="rate" placeholder="请输入内容">
          <template #rwDispatcherRender="{ data }">
            <span style="color: red">{{ data.attrs.value }}颗星</span>
          </template>
        </RateDispatcher>
      `,
      data () {
        return {
          rate: 3
        }
      }
    })
    const span = wrapper.find('span')
    expect(span.is('span')).toBe(true)
    expect(span.attributes('style')).toBe('color: red;')
  })
})
