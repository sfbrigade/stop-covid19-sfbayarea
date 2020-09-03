<template>
  <div class="CityGuidelines">
    <div v-for="(item, i) in info[county].info" :key="i">
      <v-card class="guidelines">
        <header>{{ item.header }}</header>
        <div v-for="(body, j) in item.body" :key="j">
          <h4>{{ body.h4 }}</h4>
        </div>
      </v-card>
    </div>
  </div>
</template>

<script>
import Info from '@/data/info.json'

export default {
  name: 'CityGuidelines',
  props: {
    county: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      info: Info
    }
  }
}
</script>

<style lang="scss" scoped>
.CityGuidelines {
  .guidelines {
    padding: 10px;
    margin-bottom: 20px;
    width: 925px;
    height: 400px;
    background-color: white;
  }
}
</style>
