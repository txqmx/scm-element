<template>
  <div class="mc-input_container" :style=" {marginBottom: marginBottom}" :class="{'is-required': required}">
    <label v-if="label" :style="{width: labelWidth1 }" class="mc-input_label">{{label}}</label>
    <el-input
      :style="{width: inputWidth1 }"
      v-model="inputVal"
      :clearable="clearable"
      :size="size"
      :placeholder="placeholder"
      v-on:input ="onInput"
      v-bind="$attrs">
    </el-input>
  </div>
</template>

<script>
export default {
  name: 'McInput',
  inheritAttrs: false,
  inject: ['inputWidth', 'labelWidth', 'parent'],
  props: {
    label: {
      type: String,
      default: ''
    },
    width: {
      type: String,
      default: ''
    },
    size: {
      type: String,
      default: 'mini'
    },
    clearable: {
      type: Boolean,
      default: true
    },
    value: {
      default: ''
    },
    prop: {
      default: ''
    },
    dataType: {
      type: String,
      default: 'string' // int float string
    },
    placeholder: {
      default: '请输入内容'
    },
    required: Boolean
  },
  created () {
    if (this.required) {
      this.$parent.$emit('required',
        { msg: `请输入${this.label}`, prop: this.prop }
      )
    }
  },
  computed: {
    inputVal: {
      get () {
        return this.value
      },
      set (val) {
        this.$emit('input', val)
      }
    },
    inputWidth1 () {
      return this.width || this.inputWidth || '200px'
    },
    labelWidth1 () {
      return this.labelWidth || ''
    },
    marginBottom () {
      return this.parent === 'form' ? '0' : '10px'
    }
  },
  methods: {
    onInput (val) {
      if (this.dataType === 'int') {
        val = val.replace(/[^\d]/g, '')
      }
      if (this.dataType === 'float') {
        val = val.replace(/[^\d.]/g, '').replace(/\.{2,}/g, '.').replace(/^\./g, '').replace('.', '$#$').replace(/\./g, '').replace('$#$', '.').replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3')
      }
      this.inputVal = val
    }
  }
}
</script>

<style scoped>

</style>
