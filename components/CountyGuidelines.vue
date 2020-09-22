<template>
  <div v-if="info[county] != null" class="CountyGuidelines">
    <div v-for="(item, i) in info[county].info" :key="i">
      <v-card class="guidelines">
        <p class="Header">
          {{ item.header }}
        </p>
        <p v-if="item.date != null" class="time-updated">
          Last updated {{ item.date }}
        </p>
        <div v-for="(body, j) in item.body" :key="`body-${j}`">
          <p class="content-header">
            {{ body.h4 }}
          </p>
          <div v-for="(content, k) in body.content" :key="`content-${k}`">
            <div v-for="(p, l) in content.p2" :key="`p-${l}`" class="p2">
              <p>{{ p.p }}</p>
            </div>
            <div
              v-for="(bullet, m) in content.bullets"
              :key="`bullet-${m}`"
              class="bullets"
            >
              <ul>
                <li>{{ bullet.bullet }}</li>
              </ul>
            </div>
            <div class="link-container">
              <a href="" class="links">{{ content.link }}</a>
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
  name: 'CountyGuidelines',
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
.CountyGuidelines {
  .guidelines {
    padding: 10px;
    margin-bottom: 20px;
    width: 100%;
    background-color: white;
    padding-left: 30px;
    padding-top: 24px;
    box-shadow: 0px 5px 20px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
  }
}

.Header {
  font-size: 24px;
  font-weight: bold;
  line-height: 24px;
  letter-spacing: 0.03em;
}

.time-updated {
  font-size: 14px;
  color: #6f6f6f;
}

.content-header {
  font-weight: bold;
  font-size: 20px;
  line-height: 23px;
}

.link-container {
  margin-bottom: 15px;
}

.links {
  font-style: italic;
  font-weight: bold;
  font-size: 14px;
  line-height: 140%;
}

ul li {
  padding: 9px;
}
</style>
