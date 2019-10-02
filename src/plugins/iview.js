import Vue from 'vue'

import {
  Button,
  Form,
  FormItem,
  Input,
  AutoComplete,
  InputNumber,
  Select,
  Option,
  OptionGroup,
  RadioGroup,
  Radio,
  CheckboxGroup,
  Checkbox,
  DatePicker,
  TimePicker,
  Switch,
  Rate,
  Slider,
  Row,
  Col,
  Icon
  // Transfer
} from 'iview'

Vue.component('Button', Button)
Vue.component('Form', Form)
Vue.component('FormItem', FormItem)
Vue.component('Input', Input)
Vue.component('AutoComplete', AutoComplete)
Vue.component('InputNumber', InputNumber)
Vue.component('Select', Select)
Vue.component('iSelect', Select)
Vue.component('Option', Option)
Vue.component('iOption', Option)
Vue.component('OptionGroup', OptionGroup)
Vue.component('RadioGroup', RadioGroup)
Vue.component('Radio', Radio)
Vue.component('CheckboxGroup', CheckboxGroup)
Vue.component('Checkbox', Checkbox)
Vue.component('DatePicker', DatePicker)
Vue.component('TimePicker', TimePicker)
Vue.component('iSwitch', Switch)
Vue.component('Rate', Rate)
Vue.component('Slider', Slider)
Vue.component('Row', Row)
Vue.component('Col', Col)
Vue.component('Icon', Icon)

const opts = {}

Vue.prototype.$IVIEW = {
  size: opts.size || '',
  transfer: 'transfer' in opts ? opts.transfer : '',
  select: {
    arrow: opts.select ? opts.select.arrow ? opts.select.arrow : '' : '',
    customArrow: opts.select ? opts.select.customArrow ? opts.select.customArrow : '' : '',
    arrowSize: opts.select ? opts.select.arrowSize ? opts.select.arrowSize : '' : ''
  },
  datePicker: {
    icon: opts.datePicker ? opts.datePicker.icon ? opts.datePicker.icon : '' : '',
    customIcon: opts.datePicker ? opts.datePicker.customIcon ? opts.datePicker.customIcon : '' : '',
    iconSize: opts.datePicker ? opts.datePicker.iconSize ? opts.datePicker.iconSize : '' : ''
  },
  timePicker: {
    icon: opts.timePicker ? opts.timePicker.icon ? opts.timePicker.icon : '' : '',
    customIcon: opts.timePicker ? opts.timePicker.customIcon ? opts.timePicker.customIcon : '' : '',
    iconSize: opts.timePicker ? opts.timePicker.iconSize ? opts.timePicker.iconSize : '' : ''
  }
}
