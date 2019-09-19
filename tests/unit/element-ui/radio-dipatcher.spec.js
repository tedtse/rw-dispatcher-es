import { createWrapper, useElePlugin } from '../utils'

describe('RadioDispatcher for ElementUI', () => {
  useElePlugin()

  it('text is "备选项1"', () => {
    const wrapper = createWrapper({
      template: `
        <div>
          <el-radio-dispatcher v-model="radio" label="1">备选项1</el-radio-dispatcher>
          <el-radio-dispatcher v-model="radio" label="2">备选项2</el-radio-dispatcher>
        </div>
      `,
      data () {
        return {
          radio: '1'
        }
      }
    })
    const radio = wrapper.find('.rw-dispatcher-el-radio:not([role="rw-dispatcher-hidden-component"])')
    expect(radio.text()).toBe('备选项1')
  })

  it('text of checked is "备选项1"', () => {
    const wrapper = createWrapper({
      template: `
        <el-radio-group-dispatcher v-model="radio">
          <el-radio-dispatcher :label="3">备选项1</el-radio-dispatcher>
          <el-radio-dispatcher :label="6">备选项2</el-radio-dispatcher>
          <el-radio-dispatcher :label="9">备选项3</el-radio-dispatcher>
        </el-radio-group-dispatcher>
      `,
      data () {
        return {
          radio: 3
        }
      }
    })
    expect(wrapper.text()).toBe('备选项1')
  })

  it('wrapper contains .rw-dispatcher-el-checkbox-group--mini', () => {
    const wrapper = createWrapper({
      template: `
        <el-radio-group-dispatcher v-model="value" disabled size="mini">
          <el-radio-button-dispatcher label="上海" />
          <el-radio-button-dispatcher label="北京" />
          <el-radio-button-dispatcher label="广州" />
          <el-radio-button-dispatcher label="深圳" />
        </el-radio-group-dispatcher>
      `,
      data () {
        return {
          value: '上海'
        }
      }
    })
    expect(wrapper.contains('.rw-dispatcher-el-radio-group--mini'))
  })

  it('config of state in component is prior to config of state in local', () => {
    const wrapper = createWrapper({
      template: `
        <el-radio-group-dispatcher
          v-model="value"
          :rw-dispatcher-state="state"
          style="width: 400px"
        >
          <el-radio-dispatcher :label="3" :rw-dispatcher-state="state">备选项1</el-radio-dispatcher>
          <el-radio-dispatcher :label="6" :rw-dispatcher-state="state">备选项2</el-radio-dispatcher>
          <el-radio-dispatcher :label="9" :rw-dispatcher-state="state">备选项3</el-radio-dispatcher>
        </el-radio-group-dispatcher>
      `,
      data () {
        return {
          value: 9,
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
    expect(wrapper.text()).toBe('备选项3')
  })

  it('the color of style is "green"', () => {
    const wrapper = createWrapper({
      template: `
        <el-radio-group-dispatcher v-model="value" :rw-dispatcher-render="radioGroupRender">
          <el-radio-dispatcher :label="3">备选项1</el-radio-dispatcher>
          <el-radio-dispatcher :label="6">备选项2</el-radio-dispatcher>
          <el-radio-dispatcher :label="9">备选项3</el-radio-dispatcher>
        </el-radio-group-dispatcher>
      `,
      data () {
        return {
          value: 3
        }
      },
      methods: {
        radioGroupRender (h, context) {
          const { data, children } = context
          const { value } = data.attrs
          const vnode = children.find(item => {
            if (!item.data) {
              return false
            } else {
              return value === item.data.attrs.label
            }
          })
          if (!vnode) {
            return ''
          }
          return h('span', {
            style: { color: 'green' }
          }, vnode.children)
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
        <el-radio-group-dispatcher v-model="value">
          <el-radio-dispatcher :label="3">备选项1</el-radio-dispatcher>
          <el-radio-dispatcher :label="6">备选项2</el-radio-dispatcher>
          <el-radio-dispatcher :label="9">备选项3</el-radio-dispatcher>
          <template #rwDispatcherRender="{ data, children }">
            <span style="color: red">{{ getRadioGroupLabel(data, children) }}</span>
          </template>
        </el-radio-group-dispatcher>
      `,
      data () {
        return {
          value: 3
        }
      },
      methods: {
        getRadioGroupLabel (data, children) {
          const vnode = children.find(item => {
            return item.data && item.data.attrs.label === data.attrs.value
          })
          if (vnode) {
            return vnode.children[0].text.trim()
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
