<template>
  <el-card style="height: 350px;">
    <div slot="header" class="clearfix">
      <span>ID: {{ infoClone.id }}</span>
      <el-button
        v-show="rwDispatcherState === 'read'"
        type="text"
        icon="el-icon-edit"
        @click="switchState2Write"
      />
      <el-button
        v-show="rwDispatcherState === 'write'"
        type="text"
        @click="resetInfo"
      >取消</el-button>
      <el-button
        v-show="rwDispatcherState === 'write'"
        type="text"
        @click="updateInfo"
      >确定</el-button>
    </div>
    <el-form :model="infoClone" label-width="60px" label-position="left">
      <el-form-item label="姓名" prop="name">
        <el-input-dispatcher v-model="infoClone.name" />
      </el-form-item>
      <el-form-item label="性别" prop="sex">
        <el-radio-dispatcher v-model="infoClone.sex" label="0">男</el-radio-dispatcher>
        <el-radio-dispatcher v-model="infoClone.sex" label="1">女</el-radio-dispatcher>
      </el-form-item>
      <el-form-item label="日期" prop="date">
        <el-date-picker-dispatcher v-model="infoClone.date" />
      </el-form-item>
      <el-form-item label="地址" prop="address">
        <el-input-dispatcher type="textarea" v-model="infoClone.address" />
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
import _ from 'lodash'

export default {
  name: 'CardItem',
  props: {
    info: {
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
      rwDispatcherState: 'read',
      infoClone: {}
    }
  },
  created () {
    this.infoClone = _.cloneDeep(this.info)
  },
  methods: {
    switchState2Write () {
      this.rwDispatcherState = 'write'
    },
    updateInfo () {
      this.$emit('update', this.infoClone)
      this.rwDispatcherState = 'read'
    },
    resetInfo () {
      this.infoClone = _.cloneDeep(this.info)
      this.rwDispatcherState = 'read'
    }
  }
}
</script>
