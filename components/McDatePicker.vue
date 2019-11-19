<template>
  <div class="mc-input_container" :style=" {marginBottom: marginBottom}" :class="{'is-required': required}">
    <label v-if="label" :style="{width: labelWidth1 }" class="mc-input_label">{{label}}</label>
    <el-date-picker
      :style="{width: inputWidth1 }"
      v-model="inputVal"
      :clearable="clearable"
      :size="size"
      placeholder="请选择时间"
      v-on:input ="onInput"
      v-bind="$attrs">
    </el-date-picker>
  </div>
</template>

<script>
export default {
  name: 'McDatePicker',
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
    required: Boolean
  },
  created () {
    if (this.required) {
      this.$parent.$emit('required',
        { msg: `请选择${this.label}`, prop: this.prop }
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
      this.inputVal = val
    }
  }
}
</script>

<style scoped>

</style>
