## 全局配置
全局配置在插件初始化时配置。

### 使用
```javascript
import Vue from 'vue'
import iViewRwDispatcher from 'iview-rw-dispatcher'
import 'iview-rw-dispatcher/styles/index.less'

Vue.use(iViewRwDispatcher, {
  namespace: 'rw-dispatcher',
  trueValue: '是',
  falseValue: '否',
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
            InputDispatcher read 状态渲染生成的 class 是 rw-dispatcher-input（kebab-case）。
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
      <td>trueValue</td>
      <td>值为真时的文字描述</td>
      <td>String</td>
      <td>是</td>
    </tr>
    <tr>
      <td>falseValue</td>
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
| input | InputDispatcher 自定义渲染函数 | Function |
| inputNumber | InputNumberDispatcher 自定义渲染函数 | Function |
| autocomplete | AutocompleteDispatcher 自定义渲染函数 | Function |
| select | SelectDispatcher 自定义渲染函数 | Function |
| checkbox | CheckboxDispatcher 自定义渲染函数 | Function |
| checkboxGroup | CheckboxGroupDispatcher 自定义渲染函数 | Function |
| radio | RadioDispatcher 自定义渲染函数 | Function |
| radioGroup | RadioGroupDispatcher 自定义渲染函数 | Function |
| switch | SwitchDispatcher 自定义渲染函数 | Function |
| datePicker | DatePickerDispatcher 自定义渲染函数 | Function |
| timePicker | TimePickerDispatcher 自定义渲染函数 | Function |
| rate | RateDispatcher 自定义渲染函数 | Function |
| slider | SliderDispatcher 自定义渲染函数 | Function |
