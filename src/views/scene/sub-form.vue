<template>
  <div class="scene-body">
    <el-form ref="form" :model="activeForm" label-width="80px">
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
      <el-form-item label="活动形式">
        <el-input-dispatcher type="textarea" v-model="form.desc" />
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
/**
 *
 * 读状态下 ElForm 的 model 是 props form
 * 写状态下 ElForm 的 model 是 props form 的深拷贝 formClone，
 * 深度观察 formClone，有修改时先用 diff 算出差异，再通过 $emit 通知父组件同步 props form
 * 因为 props form 是其它的组件的数据，直接修改是很危险的行为
 *
 */
import _ from 'lodash'
import { diff } from 'deep-diff'

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
  data () {
    return {
      formClone: {}
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
        // diff
        const differences = diff(this.form, this.formClone)
        if (differences && differences.length) {
          this.$emit('change', differences)
        }
      }
    }
  },
  created () {
    // 深拷贝
    this.formClone = _.cloneDeep(this.form)
  }
}
</script>
