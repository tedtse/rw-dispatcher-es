### 基本用法
:::demo
```html
<template>
  <el-form ref="form" :model="form" class="form-demo" label-width="80px">
    <el-form-item label="活动名称">
      <el-input-dispatcher v-model="form.name" />
    </el-form-item>
    <el-form-item label="活动等级">
      <el-rate-dispatcher v-model="form.level" />
    </el-form-item>
    <el-form-item label="活动区域">
      <el-select-dispatcher v-model="form.region" placeholder="请选择活动区域">
        <el-option label="区域一" value="shanghai" />
        <el-option label="区域二" value="beijing" />
      </el-select-dispatcher>
    </el-form-item>
    <el-form-item label="活动时间">
      <el-col :span="11">
        <el-date-picker-dispatcher type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;" />
      </el-col>
      <el-col class="line" :span="2">-</el-col>
      <el-col :span="11">
        <el-time-picker-dispatcher placeholder="选择时间" v-model="form.date2" style="width: 100%;" />
      </el-col>
    </el-form-item>
    <el-form-item label="持续时间">
      <el-slider-dispatcher v-model="form.duration" :format-tooltip="formatTooltip" />
    </el-form-item>
    <el-form-item label="即时配送">
      <el-switch-dispatcher v-model="form.delivery" />
    </el-form-item>
    <el-form-item label="活动性质">
      <el-checkbox-group-dispatcher v-model="form.type">
        <el-checkbox-dispatcher label="美食/餐厅线上活动" name="type" />
        <el-checkbox-dispatcher label="地推活动" name="type" />
        <el-checkbox-dispatcher label="线下主题活动" name="type" />
        <el-checkbox-dispatcher label="单纯品牌曝光" name="type" />
      </el-checkbox-group-dispatcher>
    </el-form-item>
    <el-form-item label="特殊资源">
      <el-radio-group-dispatcher v-model="form.resource">
        <el-radio-dispatcher label="线上品牌商赞助" />
        <el-radio-dispatcher label="线下场地免费" />
      </el-radio-group-dispatcher>
    </el-form-item>
    <el-form-item label="活动形式">
      <el-input-dispatcher type="textarea" v-model="form.desc" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">立即创建</el-button>
      <el-button>取消</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
export default {
  data () {
    return {
      form: {
        name: '618电器折扣日',
        level: 5,
        duration: 7,
        region: 'shanghai',
        date1: '2019-06-18',
        date2: new Date(2019, 6, 18, 0, 0, 0),
        delivery: false,
        type: ['单纯品牌曝光'],
        resource: '线下场地免费',
        desc: '凡在实体店购买指定商品，立刻过得赠品一份'
      }
    }
  },
  methods: {
    formatTooltip (val) {
      return val + '天'
    },
    onSubmit () {
      console.log('submit!')
    }
  }
}
</script>
```
:::

*附加样式*
```css
.form-demo {
  .el-rate, .el-rate__icon {
    height: 40px;
    line-height: 40px;
  }
}
``` 

### 表单内组件尺寸控制
:::demo
```html
<el-form ref="form" :model="sizeForm" label-width="80px" size="mini">
  <el-form-item label="活动名称">
    <el-input-dispatcher v-model="sizeForm.name" />
  </el-form-item>
  <el-form-item label="活动区域">
    <el-select-dispatcher v-model="sizeForm.region" size="large" placeholder="请选择活动区域">
      <el-option label="区域一" value="shanghai" />
      <el-option label="区域二" value="beijing" />
    </el-select-dispatcher>
  </el-form-item>
  <el-form-item label="活动时间">
    <el-col :span="11">
      <el-date-picker-dispatcher type="date" placeholder="选择日期" v-model="sizeForm.date1" style="width: 100%;" />
    </el-col>
    <el-col class="line" :span="2">-</el-col>
    <el-col :span="11">
      <el-time-picker-dispatcher placeholder="选择时间" v-model="sizeForm.date2" style="width: 100%;" />
    </el-col>
  </el-form-item>
  <el-form-item label="活动性质">
    <el-checkbox-group-dispatcher v-model="sizeForm.type">
      <el-checkbox-button-dispatcher label="美食/餐厅线上活动" name="type" />
      <el-checkbox-button-dispatcher label="地推活动" name="type" />
      <el-checkbox-button-dispatcher label="线下主题活动" name="type" />
    </el-checkbox-group-dispatcher>
  </el-form-item>
  <el-form-item label="特殊资源">
    <el-radio-group-dispatcher v-model="sizeForm.resource" size="medium">
      <el-radio-dispatcher border label="线上品牌商赞助" />
      <el-radio-dispatcher border label="线下场地免费" />
    </el-radio-group-dispatcher>
  </el-form-item>
  <el-form-item size="large">
    <el-button type="primary" @click="onSubmit">立即创建</el-button>
    <el-button>取消</el-button>
  </el-form-item>
</el-form>

<script>
export default {
  data () {
    return {
      sizeForm: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      }
    }
  },
  methods: {
    onSubmit () {
      console.log('submit!')
    }
  }
}
</script>
```
:::
