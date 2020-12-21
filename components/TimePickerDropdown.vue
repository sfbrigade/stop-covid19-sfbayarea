<template>
  <div class="timepickerdropdown-container">
    <DropDown
      :dropdown-options="timePickerOptions"
      :dropdown-model="defaultTimeSelected"
      @selectedOption="handleSelect"
    />
  </div>
</template>
<script>
import DropDown from '@/components/DropDown'
export default {
  components: { DropDown },
  props: {
    timePickerModel: {
      type: String,
      default: '',
      required: false
    }
  },
  data() {
    const timePickerOptions = [
      'Last 7 days',
      'Last 14 days',
      'Last 30 days',
      'Last 60 days',
      'Last 90 days',
      'All'
    ]

    const timePickerMap = {
      [timePickerOptions[0]]: '7',
      [timePickerOptions[1]]: '14',
      [timePickerOptions[2]]: '30',
      [timePickerOptions[3]]: '60',
      [timePickerOptions[4]]: '90',
      [timePickerOptions[5]]: 'all'
    }

    const defaultTimeSelected = !this.timePickerModel
      ? timePickerOptions[1]
      : this.getTimePickerSelectedFromModel(
          this.timePickerModel,
          timePickerOptions
        )

    return {
      timePickerOptions,
      timePickerMap,
      defaultTimeSelected
    }
  },
  methods: {
    handleSelect(event) {
      this.$emit('timePickerSelected', this.timePickerMap[event])
    },
    /**
     * Method that uses the model to return the corresponding option in options.
     * It returns the last value if no match was found.
     */
    getTimePickerSelectedFromModel(model, options) {
      const picked = model.toLowerCase()
      const all = options[options.length - 1]
      if (picked === 'all') return all
      for (const option of options) {
        if (option.includes(picked)) return option
      }
      return all
    }
  }
}
</script>
<style lang="scss" scoped>
.timepickerdropdown-container {
  display: inline-block;

  .dropdown-container {
    font-size: 12px;
    color: $gray-1;
  }
}
</style>
