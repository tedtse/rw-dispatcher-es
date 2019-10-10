<template>
  <div class="scene-container">
    <div class="link">
      <el-button type="text" size="large" icon="el-icon-link">
        <a href="https://github.com/tedtse/rw-dispatcher-es/blob/master/src/views/scene/cards.vue" target="_blank">源码</a>
      </el-button>
    </div>
    <div class="list clearfix">
      <div v-for="(info, index) in infos" :key="index">
        <card-item :info="info" @update="newVal => { updateInfo(index, newVal) }" />
      </div>
    </div>
  </div>
</template>

<script>
import CardItem from './card-item'

export default {
  name: 'Cards',
  components: {
    CardItem
  },
  data () {
    return {
      infos: [{
        id: '0230203203022',
        date: '2016-05-02',
        name: '王小虎',
        sex: '0',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        id: '7663020323232022',
        date: '2016-05-02',
        name: '王小虎',
        sex: '0',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        id: '2146620323232022',
        date: '2016-05-02',
        name: '王小虎',
        sex: '0',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        id: '87620323232022',
        date: '2016-05-02',
        name: '王小虎',
        sex: '0',
        address: '上海市普陀区金沙江路 1518 弄'
      }]
    }
  },
  methods: {
    updateInfo (index, newVal) {
      this.infos[index] = newVal
    }
  }
}
</script>
