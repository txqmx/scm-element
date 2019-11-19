<template>
  <el-form ref="form" class="mc-form_container" :model="formData" v-bind="$attrs" :rules="computedRules">
    <template v-for="(formItem,field) of formDesc">
      <el-form-item :label="formItem.label" :key="field" :prop="field">
        <slot v-if="formItem.slot" :name="field"></slot>
        <component
          v-else
          :is="formItem.type"
          v-bind="formItem.attrs"
          v-on="formItem.on"
          :options="formItem._options"
          v-model="formData[field]"
        />
      </el-form-item>
    </template>
  </el-form>
</template>

<script>
export default {
  name: 'McForm',
  provide () {
    return {
      parent: 'form',
      inputWidth: this.inputWidth,
      labelWidth: ''
    }
  },
  created () {
    this.$parent.$parent.$on('resetForm', this.resetForm)
  },
  props: {
    inputWidth: {
      type: String,
      default: '200px'
    },
    formData: {
      type: Object,
      required: true
    },
    formDesc: {
      type: Object,
      required: true
    },
    // 校检规则
    rules: {
      type: Object,
      default () { return {} }
    },
    required: Boolean,
    // 提交函数
    requestFn: Function
  },
  computed: {
    // 校检规则
    computedRules () {
      return Object.keys(this.formDesc).reduce((rules, field) => {
        let formRules = rules[field]
        let formItem = this.formDesc[field]
        let formItemRules = this.formDesc[field].rules

        // 转为数组
        if (formRules && !Array.isArray(formRules)) {
          formRules = [formRules]
        }
        if (formItemRules && !Array.isArray(formItemRules)) {
          formItemRules = [formItemRules]
        }

        if (formRules || formItemRules) {
          rules[field] = [...(formItemRules || []), ...(formRules || [])]
        } else if (this.required) {
          rules[field] = [{
            required: true,
            message: formItem.type.includes('input') ? `请输入${formItem.label}` : `请选择${formItem.label}`
          }]
        }
        return rules
      }, this.rules || {})
    }
  },
  watch: {
    // 处理options参数
    formDesc: {
      handler (desc) {
        if (desc) {
          Object.keys(desc).forEach(field => {
            // 设置 options
            this.changeOptions(desc[field].options, field)
            // 检查联动
            this.checkLinkage()
          })
        }
      },
      immediate: true
    },
    formData: {
      handler (formData) {
        if (formData) {
          // 联动属性检测
          this.checkLinkage()
        }
      },
      deep: true
    }
  },
  methods: {
    submit () {
      return new Promise((resolve, reject) => {
        if (this.computedRules) {
          // 当传递了验证规则
          this.$refs['form'].validate((valid, invalidFields) => {
            if (valid) {
              resolve()
            }
          })
        } else {
          resolve()
        }
      })
    },
    // 对象数组, Promise对象和函数
    changeOptions (options, field) {
      if (options) {
        if (options instanceof Array) {
          // 当options为数组时: 直接获取
          this.setOptions(options, field)
        } else if (options instanceof Function) {
          // 当options为函数: 执行函数并递归
          this.changeOptions(options(this.formData), field)
        } else if (options instanceof Promise) {
          // 当options为Promise时: 等待Promise结束, 并获取值
          options.then(options => {
            this.changeOptions(options, field)
          })
        }
      } else {
        if (this.formDesc[field]._options) {
          // 如果new options为null / undefined, 且 old Options 存在, 则设置
          this.setOptions([], field)
        }
      }
    },
    // 设置options
    setOptions (options, field) {
      this.formDesc[field] = Object.assign({}, this.formDesc[field], {
        _options: options
      })
    },
    // 检测联动
    checkLinkage () {
      const formDesc = this.formDesc
      Object.keys(formDesc).forEach(field => {
        const formItem = formDesc[field]
        // 重新获取 options
        if (formItem.isReloadOptions && typeof formItem.options === 'function') {
          this.changeOptions(formItem.options, field, true)
        }
      })
    },
    // 重置表单
    resetForm () {
      this.$refs.form.resetFields()

      // 调用内部方法进行值的重置
      this.$refs.form.fields.forEach(field => {
        this.formData[field.prop] = field.initialValue
      })
    }
  }
}
</script>

<style scoped>

</style>
