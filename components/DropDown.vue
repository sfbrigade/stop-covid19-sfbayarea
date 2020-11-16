<template>
  <div class="dropdown-container">
    <select
      v-model="selectedOption"
      class="select-options"
      @change="handleSelect($event)"
    >
      <option v-for="(option, index) in dropdownOptions" :key="index">
        {{ option }}
      </option>
    </select>
    <v-icon class="dropdown-icon">
      fa fa-chevron-down
    </v-icon>
  </div>
</template>
<script>
export default {
  props: {
    dropdownOptions: {
      type: Array,
      required: true
    },
    dropdownModel: {
      type: String,
      default: '',
      required: false
    }
  },
  data() {
    const selectedOption = this.dropdownModel
    return {
      selectedOption
    }
  },
  methods: {
    handleSelect(event) {
      const dropdownModel = event.target.value
      this.$emit('selectedOption', dropdownModel)
    }
  }
}
</script>
<style lang="scss" scoped>
.dropdown-container {
  border: 1px solid $gray-5;
  border-radius: 5px;
  background: $white-1;
  display: inline-block;

  select {
    padding: 0.435em 0.5em 0.435em 1em;
  }

  select:hover {
    cursor: pointer;
  }

  .dropdown-icon {
    font-size: 12px;
    margin-right: 1em;
  }

  select:focus {
    outline: none;
  }
}
</style>
