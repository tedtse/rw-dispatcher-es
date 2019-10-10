<template>
  <div class="elm-container">
    <div class="link">
      <el-button type="text" size="large" icon="el-icon-link">
        <a href="https://github.com/tedtse/rw-dispatcher-es/blob/master/src/views/scene/form.vue" target="_blank">源码</a>
      </el-button>
    </div>
    <div class="elm-body">
      <el-form ref="form" :model="form" label-width="80px">
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
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  provide () {
    return {
      rwDispatcherProvider: this
    }
  },
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
  computed: {
    rwDispatcherState () {
      return this.$route.meta.state
    }
  },
  methods: {
    formatTooltip (val) {
      return val + '天'
    }
  }
}
</script>

<style lang="scss" scoped>
  .elm-container {
    width: 1140px;
    margin: 0 auto 60px auto;
    .elm-body {
      text-align: left;
      border-radius: 5px;
      box-sizing: border-box;
      box-shadow: 0 0 8px 5px #00000010;
      padding: 40px 20px;
      width: 768px;
      margin: 20px auto;
      .el-rate, .el-rate__icon {
        height: 40px !important;
        line-height: 40px !important;
      }
    }
  }
</style>
