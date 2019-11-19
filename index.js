import McInput from './components/McInput'
import McSelect from './components/McSelect'
import McSearch from './components/McSearch'
import McTable from './components/McTable'
import McDelbtn from './components/McDelbtn'
import McDatePicker from './components/McDatePicker'
import McDialog from './components/McDialog'
import McForm from './components/McForm'

const components = [
  McInput,
  McSelect,
  McSearch,
  McTable,
  McDelbtn,
  McDatePicker,
  McDialog,
  McForm
]

const install = (Vue) => {
  components.forEach(component => {
    Vue.component(component.name, component)
  })
}

export default {
  install
}
