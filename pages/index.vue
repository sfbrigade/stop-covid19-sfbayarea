<template>
  <div id="app">
    <v-app id="inspire">
      <v-parallax width="auto" height="auto" src="/header-bg.png">
        <v-container fluid>
          <img class="headericon" src="/header-icon-wtext.png" />
          <div class="title">
            <h1>COVID Awareness for the Bay Area, by the Bay Area.</h1>
          </div>
          <v-row dense class="navigation">
            <v-col v-for="(item, i) in cardItems" :key="i" cols="12" md="4">
              <v-card
                class="mx-auto"
                width="276px"
                height="74px"
                outlined
                nuxt-link
                :to="{ name: item.to, params: item.params }"
              >
                <v-list-item three-line>
                  <v-list-item-content>
                    <v-list-item-title class="cardtitle">
                      {{ item.title }}
                    </v-list-item-title>
                    <v-list-item-subtitle class="carddescription">
                      {{ item.subtitle }}
                    </v-list-item-subtitle>
                  </v-list-item-content>
                  <img class="navigationicon" src="/right-arrow.png" />
                </v-list-item>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-parallax>
    </v-app>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  data() {
    return {}
  },
  computed: {
    cardItems() {
      return [
        {
          title: 'Frequently Asked Questions',
          subtitle: 'What do I need to know?',
          to: 'main',
          params: { tab: 'faq' }
        },
        {
          title: 'Bay Area COVID Statistics',
          subtitle: 'What are the numbers like?',
          to: 'main',
          params: { tab: 'stats' }
        },
        {
          title: 'Latest Updates',
          subtitle: 'What are the recent updates?',
          to: 'main',
          params: { tab: 'updates' }
        }
      ]
    }
  }
})
</script>
<style lang="scss">
.app {
  display: flex;
  max-width: 1440px;
  margin: 0 auto;
}
.headericon {
  margin-top: 10px;
}
.title {
  margin-top: 50px;
  margin-left: 20px;
}
.title h1 {
  line-height: 1.2;
}
.navigation {
  margin-top: 115px;
}
.cardtitle {
  position: absolute;
  height: 19px;
  left: 20px;
  right: 35px;
  top: 16px;
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 19px;
  color: #473a8c;
}
.carddescription {
  position: absolute;
  height: 17px;
  left: 20px;
  right: 35px;
  top: 40px;
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 140%;
  color: #6f6f6f;
}
.navigationicon {
  position: absolute;
  width: 14px;
  height: 24px;
  right: 11px;
  margin-top: -8px;
}
</style>
