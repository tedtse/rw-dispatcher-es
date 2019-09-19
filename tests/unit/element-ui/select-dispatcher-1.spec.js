import { createWrapper, useElePlugin } from '../utils'

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
  useElePlugin()

  it('text is "双皮奶"', () => {
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
    })
    expect(wrapper.text()).toBe('双皮奶')
  })

  it('text of multiple selection is "双皮奶|龙须面"', () => {
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
          value: ['选项2', '选项4'],
          options: options1
        }
      }
    })
    expect(wrapper.text()).toBe('双皮奶|龙须面')
  })

  it('text of selection by group options is "广州"', () => {
    const wrapper = createWrapper({
      template: `
        <el-select-dispatcher v-model="value" placeholder="请选择">
          <el-option-group
            v-for="group in groupCities"
            :key="group.label"
            :label="group.label"
          >
            <el-option
              v-for="item in group.options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-option-group>
        </el-select-dispatcher>
      `,
      data () {
        return {
          value: 'Guangzhou',
          groupCities: [
            {
              label: '热门城市',
              options: [
                {
                  value: 'Shanghai',
                  label: '上海'
                },
                {
                  value: 'Beijing',
                  label: '北京'
                }
              ]
            },
            {
              label: '城市名',
              options: [
                {
                  value: 'Chengdu',
                  label: '成都'
                },
                {
                  value: 'Shenzhen',
                  label: '深圳'
                },
                {
                  value: 'Guangzhou',
                  label: '广州'
                },
                {
                  value: 'Dalian',
                  label: '大连'
                }
              ]
            }
          ]
        }
      }
    })
    expect(wrapper.text()).toBe('广州')
  })

  it('text of selection with separator is "双皮奶and蚵仔煎"', () => {
    const wrapper = createWrapper({
      template: `
        <el-select-dispatcher
          v-model="value"
          rw-dispatcher-separator="and"
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
          value: ['选项2', '选项3'],
          options: options1
        }
      }
    })
    expect(wrapper.text()).toBe('双皮奶and蚵仔煎')
  })

  it('the color of style is "green"', () => {
    const wrapper = createWrapper({
      template: `
        <el-select-dispatcher
          v-model="value"
          :rw-dispatcher-render="readStateRender"
          clearable
          multiple
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
          options: options1
        }
      },
      methods: {
        readStateRender (h, context) {
          const { data, children } = context
          const value = data.attrs.value
          const vnodes = children.map(item => {
            if (!item.componentOptions) {
              return null
            } else if (value.includes(item.componentOptions.propsData.value)) {
              return h('span', {
                style: { color: 'green' }
              }, item.componentOptions.propsData.label + ' ')
            } else {
              return null
            }
          })
          .filter(item => item)
          return h('div', vnodes)
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
        <el-select-dispatcher v-model="value" clearable placeholder="请选择">
          <template #rwDispatcherRender="{ data, children }">
            <span style="color: red">{{ getLabel(data, children) }}</span>
          </template>
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
          value: '',
          options: options1
        }
      },
      methods: {
        getLabel (data, children) {
          const value = data.attrs.value
          const vnode = children.find(item => {
            if (!item.componentOptions) {
              return false
            }
            return item.componentOptions.propsData.value === value
          })
          if (vnode) {
            return vnode.componentOptions.propsData.label
          }
          return ''
        }
      }
    })
    const span = wrapper.find('span')
    expect(span.is('span')).toBe(true)
    expect(span.attributes('style')).toBe('color: red;')
  })
})
