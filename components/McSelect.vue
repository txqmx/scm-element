<template>
  <div class="mc-input_container" :style=" {marginBottom: marginBottom}" :class="{'is-required': required}">
    <label v-if="label" :style="{width: labelWidth1 }" class="mc-input_label">{{label}}</label>
      <el-select
        :style="{width: inputWidth1}"
        v-model="inputVal"
        :clearable="clearable"
        filterable
        v-bind="$attrs"
        :multiple="multiple"
        v-on="$listeners"
        :size="size"
        placeholder="请选择">
        <el-option v-if="multiple && options.length" label="全部" value="all"></el-option>
        <el-option
          v-for="item in options"
          :key="item.id"
          :label="item.name"
          :value="item.id">
        </el-option>
      </el-select>
  </div>
</template>

<script>
export default {
  name: 'McSelect',
  inheritAttrs: false,
  inject: ['inputWidth', 'labelWidth', 'parent'],
  props: {
    label: {
      type: String,
      default: ''
    },
    size: {
      type: String,
      default: 'mini'
    },
    width: {
      type: String,
      default: ''
    },
    clearable: {
      default: true
    },
    value: {
      default: ''
    },
    prop: {
      default: ''
    },
    options: {
      type: Array,
      default () {
        return []
      }
    },
    required: Boolean,
    multiple: Boolean // 多选

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
  }
}
</script>

<style scoped>

</style>
