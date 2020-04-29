<!-- Global site tag (gtag.js) - Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-6WY0F4H3C7"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-6WY0F4H3C7');
</script>

<template>
  <div id="app">
    <v-app id="inspire">
      <v-parallax width="auto" height="auto" src="/header-bg.png">
        <v-container fluid>
          <img src="/header-icon-wtext.png" />
          <div class="title">
            <h1>COVID Awareness for the Bay Area, by the Bay Area.</h1>
          </div>
          <v-row dense class="navigation">
            <v-col v-for="(item, i) in cardItems" :key="i" cols="12" md="4">
              <v-card
                class="mx-auto"
                width="320px"
                height="120"
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
                  <NavigateNextIcon />
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
import NavigateNextIcon from '@/static/navigate_next-24px.svg'

export default Vue.extend({
  components: {
    NavigateNextIcon
  },
  data() {
    return {}
  },
  computed: {
    cardItems() {
      return [
        {
          title: 'What do I need to know?',
          subtitle: 'See Frequently Asked Questions',
          to: 'main',
          params: { tab: 'faq' }
        },
        {
          title: 'What are the numbers like?',
          subtitle: 'See Bay Area COVID Statistics',
          to: 'main',
          params: { tab: 'stats' }
        },
        {
          title: 'How are people doing?',
          subtitle: 'See Stories of the Bay',
          to: 'main',
          params: { tab: 'news' }
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
.sficon {
  width: 60px;
  height: auto;
  max-width: 60px;
  max-height: 60px;
}
.sitenamebyc4sf {
  margin-left: 15px;
  width: 200px;
}
.sitename {
  font-size: 28px;
}
.byc4sf {
  font-size: 14px;
}
.header {
  display: flex;
}
.header img {
  flex: 0 0 auto;
}
.title {
  margin-top: 50px;
  line-height: 2;
}
.title h1 {
  height: auto;
  line-height: 1.2;
}
.cardtitle {
  font-weight: bold;
  font-size: 20px;
  word-wrap: normal;
  color: #403875;
}
.carddescription {
  margin-top: 10px;
  font-size: 14px;
}
.navigation {
  margin-top: 50px;
}
</style>
