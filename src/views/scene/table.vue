<template>
  <div class="elem-table">
    <div class="link">
      <el-button type="text" size="large" icon="el-icon-link">
        <a href="https://github.com/tedtse/rw-dispatcher-es/blob/master/src/views/scene/table.vue" target="_blank">源码</a>
      </el-button>
    </div>
    <p>双击单元格进入编辑状态</p>
    <el-table :data="tableData">
      <el-table-column prop="date" label="日期" width="220">
        <template slot-scope="scope">
          <el-popover
            placement="bottom-end"
            trigger="manual"
            :value="cellStates[scope.$index].date === 'write'"
          >
            <el-button type="primary" size="mini" @click="toggleState(scope.$index, 'date')">确定</el-button>
            <el-button size="mini" @click="toggleState(scope.$index, 'date')">取消</el-button>
            <div slot="reference">
              <el-date-picker-dispatcher
                v-model="scope.row.date"
                :rw-dispatcher-state="cellStates[scope.$index].date"
                @dblclick="toggleState(scope.$index, 'date')"
              />
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="姓名" width="180">
        <template slot-scope="scope">
          <el-popover
            placement="bottom-end"
            trigger="manual"
            :value="cellStates[scope.$index].name === 'write'"
          >
            <el-button type="primary" size="mini" @click="toggleState(scope.$index, 'name')">确定</el-button>
            <el-button size="mini" @click="toggleState(scope.$index, 'name')">取消</el-button>
            <div slot="reference">
              <el-input-dispatcher
                v-model="scope.row.name"
                :rw-dispatcher-state="cellStates[scope.$index].name"
                @dblclick="toggleState(scope.$index, 'name')"
              />
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="地址">
        <template slot-scope="scope">
          <el-popover
            placement="bottom-end"
            trigger="manual"
            :value="cellStates[scope.$index].address === 'write'"
          >
            <el-button type="primary" size="mini" @click="toggleState(scope.$index, 'address')">确定</el-button>
            <el-button size="mini" @click="toggleState(scope.$index, 'address')">取消</el-button>
            <div slot="reference">
              <el-input-dispatcher
                v-model="scope.row.address"
                :rw-dispatcher-state="cellStates[scope.$index].address"
                @dblclick="toggleState(scope.$index, 'address')"
              />
            </div>
          </el-popover>
        </template>
      </el-table-column>
    </el-table>
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
      rwDispatcherState: 'read',
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }],
      cellStates: []
    }
  },
  created () {
    this.cellStates = this.tableData.map(item => {
      const states = {}
      for (let key of Object.keys(item)) {
        states[key] = this.rwDispatcherState
      }
      return states
    })
  },
  methods: {
    toggleState (index, key) {
      const state = this.cellStates[index][key]
      if (state === 'read') {
        this.cellStates[index][key] = 'write'
      } else {
        this.cellStates[index][key] = 'read'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .elem-table {
    width: 1140px;
    margin: 0 auto 60px auto;
    font-size: 14px;
    p {
      text-align: center;
      margin: 20px 0;
      color: red;
    }
    .cell {
      .el-popover__reference {
        > * {
          width: 100%;
        }
      }
    }
  }
</style>
