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

    const defaultTimeSelected = timePickerOptions[1]
    return {
      timePickerOptions,
      timePickerMap,
      defaultTimeSelected
    }
  },
  methods: {
    handleSelect(event) {
      this.$emit('timePickerSelected', this.timePickerMap[event])
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
