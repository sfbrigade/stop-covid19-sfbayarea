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
      'Last 30 days',
      'Last 60 days',
      'Last 90 days',
      'All'
    ]

    const timePickerMap = {
      [timePickerOptions[0]]: '30',
      [timePickerOptions[1]]: '60',
      [timePickerOptions[2]]: '90',
      [timePickerOptions[3]]: 'all'
    }

    const defaultTimeSelected = timePickerOptions[0]
    return {
      timePickerOptions,
      timePickerMap,
      defaultTimeSelected
    }
  },
  mounted() {
    this.$emit('timePicked', this.timePickerMap[this.defaultTimeSelected])
  },
  methods: {
    handleSelect(event) {
      this.$emit('timePicked', this.timePickerMap[event])
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
