<template>
  <div>
    <div class="mc-search-table">
      <slot name="top"></slot>
      <slot></slot>
    </div>
    <div class="footer">
      <el-pagination style="float:right;"
                     @size-change="handleSizeChange"
                     @current-change="handleCurrentChange"
                     :current-page="myOffset / myLimit + 1"
                     :page-size="myLimit"
                     layout="total, sizes, prev, pager, next, jumper"
                     :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: 'McTable',
  props: {
    offset: {
      type: Number,
      default: 0
    },
    limit: {
      type: Number,
      default: 20
    },
    total: {
      type: Number,
      default: 0
    }
  },
  computed: {
    myOffset: {
      get () {
        return this.offset
      },
      set (val) {
        this.$emit('update:offset', val)
      }
    },
    myLimit: {
      get () {
        return this.limit
      },
      set (val) {
        this.$emit('update:limit', val)
      }
    }
  },
  methods: {
    // page-size改变
    handleSizeChange (val) {
      this.myLimit = val
      this.myOffset = 0
      this.$emit('getTableData')
    },
    // 翻页
    handleCurrentChange (val) {
      this.myOffset = (val - 1) * this.myLimit
      this.$emit('getTableData')
    }
  }
}
</script>

<style scoped>
.mc-search-table{
  font-size: 14px;
  background: #FFFFFF;
  border: 1px solid #EAEBEB;
  box-shadow: 0 2px 8px 0 rgba(171, 171, 171, 0.12);
  border-radius: 4px;
  padding: 20px;
  margin-bottom: 20px;
  overflow: hidden;
}
/deep/.mc-search-table  .cell {
  text-align: center;
  font-size: 13px;
}
/deep/.mc-search-table thead .cell{
  font-weight: 500;
}
/deep/.mc-search-table .el-table th {
  background: #f7f7f7;
  font-size: 13px;
  color: #909399;
  line-height: 20px;
}
</style>
