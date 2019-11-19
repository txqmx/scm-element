<template>
    <div>
      <el-button  type="text" @click="deleteItem">
        <slot></slot>
      </el-button>
    </div>
</template>

<script>
export default {
  name: 'McDelbtn',
  props: {
    msg: {
      default: '确是否删除该项数据认'
    }
  },
  methods: {
    deleteItem () {
      this.$confirm(this.msg, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$emit('delete')
      }).catch(e => {})
    }
  }
}
</script>

<style scoped>

</style>
