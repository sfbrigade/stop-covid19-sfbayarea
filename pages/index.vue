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
            <v-col cols="12" md="4">
              <v-card
                class="mx-auto"
                max-width="250px"
                height="120"
                outlined
                nuxt-link
                :to="{ name: 'main', params: { tab: 'faq' } }"
              >
                <v-list-item three-line>
                  <v-list-item-content>
                    <v-list-item-title class="cardtitle">
                      What do I need to <br />know?
                    </v-list-item-title>
                    <v-list-item-subtitle class="carddescription">
                      See Frequently Asked Questions
                    </v-list-item-subtitle>
                  </v-list-item-content>
                  <NavigateNextIcon />
                </v-list-item>
              </v-card>
            </v-col>
            <v-col cols="12" md="4">
              <v-card
                class="mx-auto"
                max-width="250px"
                height="120"
                outlined
                nuxt-link
                :to="{ name: 'main', params: { tab: 'stats' } }"
              >
                <v-list-item three-line>
                  <v-list-item-content>
                    <v-list-item-title class="cardtitle">
                      What are the <br />numbers like?
                    </v-list-item-title>
                    <v-list-item-subtitle class="carddescription">
                      See Bay Area COVID Statistics
                    </v-list-item-subtitle>
                  </v-list-item-content>
                  <NavigateNextIcon />
                </v-list-item>
              </v-card>
            </v-col>
            <v-col cols="12" md="4">
              <v-card
                class="mx-auto"
                max-width="250px"
                height="120"
                outlined
                nuxt-link
                :to="{ name: 'main', params: { tab: 'news' } }"
              >
                <v-list-item three-line>
                  <v-list-item-content>
                    <v-list-item-title class="cardtitle">
                      How are people <br />doing?
                    </v-list-item-title>
                    <v-list-item-subtitle class="carddescription">
                      See Stories of the Bay
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
  font-weight: 500;
  font-size: 24px;
  word-wrap: normal;
  color: #403875;
}
.carddescription {
  margin-top: 10px;
  font-size: 12px;
}
.navigation {
  margin-top: 50px;
}
</style>
