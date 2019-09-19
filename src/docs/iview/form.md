### 基本用法
:::demo
```html
<template>
  <Form :model="form" :label-width="80">
    <FormItem label="Input">
      <InputDispatcher v-model="form.input" placeholder="Enter something..." />
    </FormItem>
    <FormItem label="Select">
      <SelectDispatcher v-model="form.select">
        <Option value="New York">New York</Option>
        <Option value="London">London</Option>
        <Option value="Sydney">Sydney</Option>
      </SelectDispatcher>
    </FormItem>
    <FormItem label="DatePicker">
      <Row>
        <Col span="11">
          <DatePickerDispatcher type="date" placeholder="Select date" v-model="form.date" />
        </Col>
        <Col span="2" style="text-align: center">-</Col>
        <Col span="11">
          <TimePickerDispatcher type="time" placeholder="Select time" v-model="form.time" />
        </Col>
      </Row>
    </FormItem>
    <FormItem label="Radio">
      <RadioGroupDispatcher v-model="form.radio">
        <RadioDispatcher label="male">Male</RadioDispatcher>
        <RadioDispatcher label="female">Female</RadioDispatcher>
      </RadioGroupDispatcher>
    </FormItem>
    <FormItem label="Checkbox">
      <CheckboxGroupDispatcher v-model="form.checkbox">
        <CheckboxDispatcher label="Eat" />
        <CheckboxDispatcher label="Sleep" />
        <CheckboxDispatcher label="Run" />
        <CheckboxDispatcher label="Movie" />
      </CheckboxGroupDispatcher>
    </FormItem>
    <FormItem label="Switch">
      <SwitchDispatcher v-model="form.switch" size="large">
        <template #open>On</template>
        <template #close>Off</template>
      </SwitchDispatcher>
    </FormItem>
    <FormItem label="Slider">
      <SliderDispatcher v-model="form.slider" range />
    </FormItem>
    <FormItem label="Text">
      <InputDispatcher v-model="form.textarea" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="Enter something..." />
    </FormItem>
    <FormItem>
      <Button type="primary">Submit</Button>
      <Button style="margin-left: 8px">Cancel</Button>
    </FormItem>
  </Form>
</template>

<script>
export default {
  data () {
    return {
      form: {
        input: '',
        select: '',
        radio: 'male',
        checkbox: [],
        switch: true,
        date: '',
        time: '',
        slider: [20, 50],
        textarea: ''
      }
    }
  }
}
</script>
```
