<template>
  <el-form ref="form" :model="$attrs.form" label-width="80px" style="padding: 0 20px; max-width: 800px">
    <el-form-item label="活动名称">
      <el-input-dispatcher v-model="$attrs.form.name" />
    </el-form-item>
    <el-form-item label="活动等级">
      <el-rate-dispatcher v-model="$attrs.form.level" />
    </el-form-item>
    <el-form-item label="活动区域">
      <el-select-dispatcher v-model="$attrs.form.region" placeholder="请选择活动区域">
        <el-option label="区域一" value="shanghai" />
        <el-option label="区域二" value="beijing" />
      </el-select-dispatcher>
    </el-form-item>
    <el-form-item label="活动时间">
      <el-col :span="11">
        <el-date-picker-dispatcher type="date" placeholder="选择日期" v-model="$attrs.form.date1" style="width: 100%;" />
      </el-col>
      <el-col class="line" :span="2">-</el-col>
      <el-col :span="11">
        <el-time-picker-dispatcher placeholder="选择时间" v-model="$attrs.form.date2" style="width: 100%;" />
      </el-col>
    </el-form-item>
    <el-form-item label="持续时间">
      <el-slider-dispatcher v-model="$attrs.form.duration" />
    </el-form-item>
    <el-form-item label="即时配送">
      <el-switch-dispatcher v-model="$attrs.form.delivery" />
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  props: {
    rwDispatcherState: {
      type: String,
      default: 'write'
    }
  },
  provide () {
    return {
      rwDispatcherProvider: this
    }
  }
}
</script>
