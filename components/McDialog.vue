<template>
  <el-dialog v-bind="$attrs" :visible.sync="dialogView1" :append-to-body='true'>
    <slot></slot>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogView1 = false">取 消</el-button>
      <el-button type="primary" @click="submit">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: 'McDialog',
  props: {
    view: {
      type: Boolean,
      default: false
    },
    clearForm: Boolean
  },
  computed: {
    dialogView1: {
      get () {
        if (!this.view) {
          this.close()
        }
        return this.view
      },
      set (val) {
        this.$emit('update:view', val)
      }
    }
  },
  beforeDestroy () {
    this.close()
  },
  methods: {
    close () {
      if (this.clearForm) {
        this.$emit('resetForm')
      }
      this.$emit('close')
    },
    submit () {
      this.$emit('submit')
    }
  }
}
</script>

<style scoped>

</style>
