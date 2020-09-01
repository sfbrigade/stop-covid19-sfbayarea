<template>
  <div class="CityGuidelines">
    <v-card class="guidelines">
      <h2>test</h2>
      <p>This is a test for the new guidelines page card</p>
      {{ info }}
    </v-card>
  </div>
</template>

<script>
import Info from '@/data/info.json'

export default {
  name: 'CityGuidelines',
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
