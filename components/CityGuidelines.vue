<template>
  <div class="CityGuidelines">
    <div v-for="(item, i) in info[county].info" :key="i">
      <v-card class="guidelines">
        <h2>{{ item.header }}</h2>
        <div v-for="(body, j) in item.body" :key="j">
          <h4>{{ body.h4 }}</h4>
          <div v-for="(content, k) in body.content" :key="k">
            <div v-for="(p, l) in content.p2" :key="l" class="p2">
              <p>{{ p.p }}</p>
            </div>
            <div
              v-for="(bullet, m) in content.bullets"
              :key="m"
              class="bullets"
            >
              <ul>
                <li>{{ bullet.bullet }}</li>
              </ul>
            </div>
            <div class="link-container">
              <a href="">{{ content.link }}</a>
            </div>
          </div>
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
