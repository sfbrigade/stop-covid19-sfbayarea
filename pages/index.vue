<template>
  <v-app id="app">
    <v-parallax width="auto" height="auto" src="/header-bg.png">
      <v-container fluid>
        <div v-if="this.width > 1024">
          <div class="desktop">
            <img class="headericon" src="/header-icon-wtext.png" />
            <div class="title">
              <h1>
                COVID Awareness for the<br />
                Bay Area, by the Bay Area.
              </h1>
            </div>
          </div>
        </div>
        <div v-else>
          <div class="mobile">
            <img class="headericon" src="/header-icon-wtext.png" />
            <div class="title">
              <h1>
                COVID Awareness <br />for the Bay Area, by <br />the Bay Area.
              </h1>
            </div>
          </div>
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
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  data() {
    return {
      width: 1024,
      height: 768
    }
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
  },
  mounted() {
    this.width = window.innerWidth
    this.height = window.innerHeight
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
  margin-bottom: 50px;
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
.desktop {
  margin-left: 70px;
  margin-top: 20px;
  .title {
    margin-top: 80px;
    margin-bottom: 400px;
  }
}
.mobile {
  .title {
    margin-top: 50px;
    margin-bottom: 115px;
  }
}
</style>
