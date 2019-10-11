<template>
  <el-form ref="form" :model="activeForm" label-width="80px" style="padding: 0 20px; max-width: 800px">
    <el-form-item label="活动名称">
      <el-input-dispatcher v-model="activeForm.name" />
    </el-form-item>
    <el-form-item label="活动等级">
      <el-rate-dispatcher v-model="activeForm.level" />
    </el-form-item>
    <el-form-item label="活动区域">
      <el-select-dispatcher v-model="activeForm.region" placeholder="请选择活动区域">
        <el-option label="区域一" value="shanghai" />
        <el-option label="区域二" value="beijing" />
      </el-select-dispatcher>
    </el-form-item>
    <el-form-item label="活动时间">
      <el-col :span="11">
        <el-date-picker-dispatcher type="date" placeholder="选择日期" v-model="activeForm.date1" style="width: 100%;" />
      </el-col>
      <el-col class="line" :span="2">-</el-col>
      <el-col :span="11">
        <el-time-picker-dispatcher placeholder="选择时间" v-model="activeForm.date2" style="width: 100%;" />
      </el-col>
    </el-form-item>
    <el-form-item label="持续时间">
      <el-slider-dispatcher v-model="activeForm.duration" />
    </el-form-item>
    <el-form-item label="即时配送">
      <el-switch-dispatcher v-model="activeForm.delivery" />
    </el-form-item>
  </el-form>
</template>

<script>
/**
 *
 * 读状态下 ElForm 的 model 是 props form
 * 写状态下 ElForm 的 model 是 props form 的深拷贝 formClone，
 * 深度观察 formClone，有修改时通过 $emit('update:form', ...) 通知父组件同步 props form
 * 因为 props form 是其它的组件的数据，直接修改是很危险的行为
 *
 */
import _ from 'lodash'

export default {
  props: {
    rwDispatcherState: {
      type: String,
      default: 'write'
    },
    form: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  provide () {
    return {
      rwDispatcherProvider: this
    }
  },
  computed: {
    activeForm () {
      return this.rwDispatcherState === 'write' ? this.formClone : this.form
    }
  },
  watch: {
    formClone: {
      deep: true,
      handler () {
        this.$emit('update:form', this.formClone)
      }
    }
  },
  data () {
    return {
      formClone: {}
    }
  },
  created () {
    // 深拷贝
    this.formClone = _.cloneDeep(this.form)
  }
}
</script>
