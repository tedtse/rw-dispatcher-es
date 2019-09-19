## 全局配置
全局配置在插件初始化时配置。

### 使用
```javascript
import Vue from 'vue'
import ElementUiRwDispatcher from 'element-ui-rw-dispatcher'
import 'element-ui-rw-dispatcher/styles/index.scss'

Vue.use(ElementUiRwDispatcher, {
  namespace: 'rw-dispatcher',
  activeText: '是',
  inactiveText: '否',
  separator: '|',
  rangeSeparator: '-',
  readStateRender: {
    // ...
  }
})
```

### 配置参数
<table>
  <thead>
    <tr>
      <th>参数</th>
      <th>说明</th>
      <th>类型</th>
      <th>默认值</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>namespace</td>
      <td>
        命名空间，read 状态渲染函数、状态管理、局部配置等参数的前缀。
        <el-tooltip placement="top">
          <div slot="content">
            状态管理参数是 rwDispatcherState（camelCase）；<br />
            ElInputDispatcher read 状态渲染生成的 class 是 rw-dispatcher-el-input（kebab-case）。
          </div>
          <i class="el-icon-question" />
        </el-tooltip>
        <br />
        使用过程中如果有参数冲突时可以改这个值。
      </td>
      <td>String</td>
      <td>rw-dispatcher</td>
    </tr>
    <tr>
      <td>activeText</td>
      <td>值为真时的文字描述</td>
      <td>String</td>
      <td>是</td>
    </tr>
    <tr>
      <td>inactiveText</td>
      <td>值为假时的文字描述</td>
      <td>String</td>
      <td>否</td>
    </tr>
    <tr>
      <td>separator</td>
      <td>
        分隔符，组件有多个值且是并列关系，read 状态渲染时用该符号间隔。<br />
        如组件的值为 ['Tom', 'Jerry']，显示 'Tom|Jerry'。
      </td>
      <td>String</td>
      <td>|</td>
    </tr>
    <tr>
      <td>rangeSeparator</td>
      <td>
        连接符，组件有多个值且是区间关系，read 状态渲染时用该符号连接。<br />
        如组件的值为 ['2019/06/15', '2019/08/15']，显示 '2019/06/15-2019/08/15'。
      </td>
      <td>String</td>
      <td>-</td>
    </tr>
    <tr>
      <td>readStateRender</td>
      <td>read 状态自定义渲染函数。具体配置如下</td>
      <td>Object</td>
      <td>{}</td>
    </tr>
  </tbody>
</table>

### 自定义渲染函数
所有自定义函数的参数均为 (h, context) [Vue 函数式组件](https://cn.vuejs.org/v2/guide/render-function.html#%E5%87%BD%E6%95%B0%E5%BC%8F%E7%BB%84%E4%BB%B6)。具体配置如下：

| 可配置项 | 说明 | 类型 |
| ---- | -------- | ---- |
| elInput | ElInputDispatcher 自定义渲染函数 | Function |
| elInputNumber | InputNumberDispatcher 自定义渲染函数 | Function |
| elAutocomplete | ElAutocompleteDispatcher 自定义渲染函数 | Function |
| elSelect | ElSelectDispatcher 自定义渲染函数 | Function |
| elCheckbox | ElCheckboxDispatcher 自定义渲染函数 | Function |
| elCheckboxButton | ElCheckboxButtonDispatcher 自定义渲染函数 | Function |
| elCheckboxGroup | ElCheckboxGroupDispatcher 自定义渲染函数 | Function |
| elRadio | ElRadioDispatcher 自定义渲染函数 | Function |
| elRadioButton | ElRadioButtonDispatcher 自定义渲染函数 | Function |
| elRadioGroup | ElRadioGroupDispatcher 自定义渲染函数 | Function |
| elSwitch | ElSwitchDispatcher 自定义渲染函数 | Function |
| elDatePicker | ElDatePickerDispatcher 自定义渲染函数 | Function |
| elTimePicker | ElTimePickerDispatcher 自定义渲染函数 | Function |
| elTimeSelect | ElTimeSelectDispatcher 自定义渲染函数 | Function |
| elRate | ElRateDispatcher 自定义渲染函数 | Function |
| elSlider | ElSliderDispatcher 自定义渲染函数 | Function |
