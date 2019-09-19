import { createWrapper, useIViewPlugin } from '../utils'

const cityList = [
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

describe('SelectDispatcher for iView', () => {
  useIViewPlugin()

  // it('wrapper contains .ivu-select', () => {
  //   const wrapper = createWrapper({
  //     template: `
  //       <SelectDispatcher v-model="model" style="width: 200px">
  //         <Option v-for="item in cityList" :value="item.value" :key="item.value">
  //           {{ item.label }}
  //         </Option>
  //       </SelectDispatcher>
  //     `,
  //     data () {
  //       return {
  //         cityList,
  //         model: 'London'
  //       }
  //     }
  //   }, {
  //     data () {
  //       return {
  //         rwDispatcherState: 'write'
  //       }
  //     }
  //   })
  //   expect(wrapper.contains('.ivu-select')).toBe(true)
  // })

  it('text is "伦敦"', () => {
    const wrapper = createWrapper({
      template: `
        <SelectDispatcher v-model="model" style="width: 200px">
          <Option v-for="item in cityList" :value="item.value" :key="item.value">
            {{ item.label }}
          </Option>
        </SelectDispatcher>
      `,
      data () {
        return {
          cityList,
          model: 'London'
        }
      }
    })
    expect(wrapper.text()).toBe('伦敦')
  })

  it('text is "纽约|巴黎"', () => {
    const wrapper = createWrapper({
      template: `
        <SelectDispatcher v-model="model" multiple style="width: 260px">
          <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </SelectDispatcher>
      `,
      data () {
        return {
          cityList,
          model: ['New York', 'Paris']
        }
      }
    })
    expect(wrapper.text()).toBe('纽约|巴黎')
  })

  it('text is "渥太华"', () => {
    const wrapper = createWrapper({
      template: `
        <SelectDispatcher v-model="model" style="width: 200px">
          <OptionGroup label="Hot Cities">
            <Option v-for="item in cityList1" :value="item.value" :key="item.value">
              {{ item.label }}
            </Option>
          </OptionGroup>
          <OptionGroup label="Other Cities">
            <Option v-for="item in cityList2" :value="item.value" :key="item.value">
              {{ item.label }}
            </Option>
          </OptionGroup>
        </SelectDispatcher>
      `,
      data () {
        return {
          cityList1: [
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
            }
          ],
          cityList2: [
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
          ],
          model: 'Ottawa'
        }
      }
    })
    expect(wrapper.text()).toBe('渥太华')
  })

  it('wrapper contains .rw-dispatcher-ivu-select-large', () => {
    const wrapper = createWrapper({
      template: `
        <SelectDispatcher v-model="model4" size="large" style="width:100px">
          <Option v-for="item in cityList" :value="item.value" :key="item.value">
            {{ item.label }}
          </Option>
        </SelectDispatcher>
      `,
      data () {
        return {
          cityList,
          model4: 'Sydney'
        }
      }
    })
    expect(wrapper.contains('.rw-dispatcher-ivu-select-large')).toBe(true)
  })

  it('text is "纽约and巴黎"', () => {
    const wrapper = createWrapper({
      template: `
        <SelectDispatcher
          v-model="model"
          rw-dispatcher-separator="and"
          multiple
          style="width: 260px"
        >
          <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </SelectDispatcher>
      `,
      data () {
        return {
          cityList,
          model: ['New York', 'Paris']
        }
      }
    })
    expect(wrapper.text()).toBe('纽约and巴黎')
  })

  it('config of state in component is prior to config of state in local', () => {
    const wrapper = createWrapper({
      template: `
        <Form :model="form" :label-width="80">
          <FormItem label="城市">
            <SelectDispatcher
              v-model="form.select"
              :rw-dispatcher-state="state"
              style="width: 300px"
            >
              <Option value="New York">New York</Option>
              <Option value="London">London</Option>
              <Option value="Sydney">Sydney</Option>
            </SelectDispatcher>
            <Icon :type="icon" style="font-size: 20px" @click="toggleState" />
          </FormItem>
        </Form>
      `,
      data () {
        return {
          form: {
            select: 'New York'
          },
          state: 'read',
          icon: 'ios-eye-outline'
        }
      },
      methods: {
        toggleState () {
          if (this.state === 'write') {
            this.state = 'read'
            this.icon = 'ios-create-outline'
          } else {
            this.state = 'write'
            this.icon = 'ios-eye-outline'
          }
        }
      }
    }, {
      data () {
        return {
          rwDispatcherState: 'write'
        }
      }
    })
    const div = wrapper.find('.rw-dispatcher-ivu-select')
    expect(div.is('div')).toBe(true)
    expect(div.text()).toBe('New York')
  })

  it('the color of style is "green"', () => {
    const wrapper = createWrapper({
      template: `
        <SelectDispatcher
          v-model="value"
          :rw-dispatcher-render="readStateRender"
          style="width: 300px"
        >
          <Option value="New York">New York</Option>
          <Option value="London">London</Option>
          <Option value="Sydney">Sydney</Option>
        </SelectDispatcher>
      `,
      data () {
        return {
          value: ''
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
        <SelectDispatcher v-model="value" style="width: 300px">
          <template #rwDispatcherRender="{ data }">
            <span style="color: red">{{ data.attrs.value }}</span>
          </template>
          <Option value="New York">New York</Option>
          <Option value="London">London</Option>
          <Option value="Sydney">Sydney</Option>
        </SelectDispatcher>
      `,
      data () {
        return {
          value: ''
        }
      }
    })
    const span = wrapper.find('span')
    expect(span.is('span')).toBe(true)
    expect(span.attributes('style')).toBe('color: red;')
  })
})
