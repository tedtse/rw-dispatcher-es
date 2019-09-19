import { createWrapper, useElePlugin } from '../utils'

describe('CheckboxDispatcher for ElementUI', () => {
  useElePlugin()

  it('text is "checkbox dispatcher"', () => {
    const wrapper = createWrapper({
      template: '<el-checkbox-dispatcher v-model="checked">checkbox dispatcher</el-checkbox-dispatcher>',
      data () {
        return {
          checked: true
        }
      }
    })
    expect(wrapper.text()).toBe('checkbox dispatcher')
  })

  it('text of checked is "123|选中且禁用"', () => {
    const wrapper = createWrapper({
      template: `
        <el-checkbox-group-dispatcher v-model="checkList">
          <el-checkbox-dispatcher label="复选框 A"><span style="color: red">123</span></el-checkbox-dispatcher>
          <el-checkbox-dispatcher label="复选框 B" />
          <el-checkbox-dispatcher label="复选框 C" />
          <el-checkbox-dispatcher label="禁用" disabled />
          <el-checkbox-dispatcher label="选中且禁用" disabled />
        </el-checkbox-group-dispatcher>
      `,
      data () {
        return {
          checkList: ['选中且禁用', '复选框 A']
        }
      }
    })
    expect(wrapper.text()).toBe('123|选中且禁用')
  })

  it('wrapper contains .rw-dispatcher-el-checkbox-group--mini', () => {
    const wrapper = createWrapper({
      template: `
        <el-checkbox-group-dispatcher v-model="checkboxGroup" size="mini" disabled>
          <el-checkbox-button-dispatcher v-for="city in cities" :label="city" :key="city">{{ city }}</el-checkbox-button-dispatcher>
        </el-checkbox-group-dispatcher>
      `,
      data () {
        return {
          checkboxGroup: ['上海'],
          cities: ['上海', '北京', '广州', '深圳']
        }
      }
    })
    expect(wrapper.contains('.rw-dispatcher-el-checkbox-group--mini'))
  })

  it('text of checked is "123and选中且禁用"', () => {
    const wrapper = createWrapper({
      template: `
        <el-checkbox-group-dispatcher v-model="checkList" rw-dispatcher-separator="and">
          <el-checkbox-dispatcher label="复选框 A"><span style="color: red">123</span></el-checkbox-dispatcher>
          <el-checkbox-dispatcher label="复选框 B" />
          <el-checkbox-dispatcher label="复选框 C" />
          <el-checkbox-dispatcher label="禁用" disabled />
          <el-checkbox-dispatcher label="选中且禁用" disabled />
        </el-checkbox-group-dispatcher>
      `,
      data () {
        return {
          checkList: ['选中且禁用', '复选框 A']
        }
      }
    })
    expect(wrapper.text()).toBe('123and选中且禁用')
  })

  it('config of state in component is prior to config of state in local', () => {
    const wrapper = createWrapper({
      template: `
        <el-checkbox-group-dispatcher v-model="checkList" :rw-dispatcher-state="state">
          <el-checkbox-dispatcher label="复选框 A" :rw-dispatcher-state="state">
            <span style="color: red">123</span>
          </el-checkbox-dispatcher>
          <el-checkbox-dispatcher label="复选框 B" :rw-dispatcher-state="state" />
          <el-checkbox-dispatcher label="复选框 C" :rw-dispatcher-state="state" />
          <el-checkbox-dispatcher label="禁用" :rw-dispatcher-state="state" disabled />
          <el-checkbox-dispatcher label="选中且禁用" :rw-dispatcher-state="state" disabled />
        </el-checkbox-group-dispatcher>
      `,
      data () {
        return {
          checkList: ['选中且禁用', '复选框 A'],
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
    expect(wrapper.text()).toBe('123|选中且禁用')
  })

  it('the color of style is "green"', () => {
    const wrapper = createWrapper({
      template: `
        <el-checkbox-dispatcher v-model="checked" :rw-dispatcher-render="checkboxRender">
          备选项
        </el-checkbox-dispatcher>
      `,
      data () {
        return {
          checked: true
        }
      },
      methods: {
        checkboxRender (h, context) {
          const { value } = context.data.attrs
          if (value) {
            return h('span', {
              style: { color: 'green' }
            }, context.children)
          } else {
            return null
          }
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
        <el-checkbox-dispatcher v-model="checked">
          备选项
          <template #rwDispatcherRender="{ data, children }">
            <span style="color: red">{{ getCheckboxLabel(data, children) }}</span>
          </template>
        </el-checkbox-dispatcher>
      `,
      data () {
        return {
          checked: true
        }
      },
      methods: {
        getCheckboxLabel (data, children) {
          if (data.attrs.value) {
            return children[0].text.trim()
          } else {
            return ''
          }
        }
      }
    })
    const span = wrapper.find('span')
    expect(span.is('span')).toBe(true)
    expect(span.attributes('style')).toBe('color: red;')
  })
})
