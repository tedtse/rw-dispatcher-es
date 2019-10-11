<template>
  <div class="scene-container">
    <div class="link">
      <el-button type="text" size="large" icon="el-icon-link">
        <a href="https://github.com/tedtse/rw-dispatcher-es/blob/master/src/views/scene/form.vue" target="_blank">源码</a>
      </el-button>
    </div>
    <!-- props 用 kebeb-case(中横线) -->
    <sub-form :form.sync="form" rw-dispatcher-state="write" />
    <el-dialog title="预览" :visible.sync="priewVisible" fullscreen>
      <div class="modal-wrapper">
        <sub-form :form.sync="form" rw-dispatcher-state="read" />
      </div>
    </el-dialog>
    <div class="operate">
      <el-button
        type="text"
        icon="el-icon-view"
        @click="preview"
      >预览</el-button>
      <el-button
        type="primary"
        @click="submit"
      >提交</el-button>
    </div>
  </div>
</template>

<script>
import SubForm from './sub-form'

export default {
  components: {
    SubForm
  },
  data () {
    return {
      priewVisible: false,
      form: {
        name: '618电器折扣日',
        level: 5,
        region: 'shanghai',
        date1: '2019-06-18',
        date2: new Date(2019, 6, 18, 0, 0, 0),
        delivery: false
      }
    }
  },
  methods: {
    preview () {
      this.priewVisible = true
    },
    submit () {
    }
  }
}
</script>

<style lang="scss" scoped>
  .modal-wrapper {
    border: 1px solid #ddd;
    border-radius: 5px;
    padding: 20px 0;
    max-width: 800px;
  }
  .operate {
    text-align: right;
    padding-right: 20px;
  }
</style>
