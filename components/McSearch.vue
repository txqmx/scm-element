<template>
  <div class="mc-search-form">
    <slot></slot>
    <div class="mc-button-content" style="float: right; line-height: 40px">
      <el-button size="mini" type="primary" @click="clickSearch">查询</el-button>
      <slot name="button"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'McSearch',
  props: {
    inputWidth: {
      type: String,
      default: ''
    },
    labelWidth: {
      type: String,
      default: ''
    },
    inputSize: {
      type: String,
      default: 'mini'
    },
    searchData: {
      default: {}
    }
  },
  data () {
    return {
      requiredData: {}
    }
  },
  created () {
    this.$on('required', (item) => {
      if (item.prop) {
        this.requiredData[item.prop] = item.msg
      }
    })
  },
  provide () {
    return {
      parent: 'search',
      inputWidth: this.inputWidth,
      inputSize: this.inputSize,
      labelWidth: this.labelWidth
    }
  },
  methods: {
    // 查询按钮
    clickSearch () {
      for (let i in this.searchData) {
        if (this.requiredData[i] && !this.searchData[i]) {
          this.$message.error(this.requiredData[i])
          return
        }
      }
      this.$emit('search')
    }
  }
}
</script>

<style scoped>
.mc-search-form {
  font-size: 14px;
  background: #FFFFFF;
  border: 1px solid #EAEBEB;
  box-shadow: 0 2px 8px 0 rgba(171, 171, 171, 0.12);
  border-radius: 4px;
  padding: 20px;
  margin-bottom: 20px;
  overflow: hidden;
}
/deep/.mc-button-content .el-button{
  font-size: 13px;
  font-weight: 400;
  margin: 0 5px;
}
</style>
