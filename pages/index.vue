<template>
  <v-app style="background: #403774">
    <v-container fluid>
      <img class="bgbridge" src="/header-bg.png" />
      <div class="origin">
        <div class="logo">
          <img class="headericond" src="/header-icon.png" />
          <span class="logotitle">Bay Area Pandemic Dashboard</span>
          <span class="logosubtitle">by Bay Area Brigades</span>
        </div>
        <div class="title">
          <h1>
            <div v-html="getTitle" />
          </h1>
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
      </div>
    </v-container>
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
    getTitle() {
      if (this.width < 1024) {
        return 'COVID Awareness for the Bay Area, by the Bay Area.'
      } else {
        return 'COVID Awareness for the <br>Bay Area, by the Bay Area.'
      }
    },
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
.container {
  max-width: 1440px;
  margin: 0 auto;
}
.title h1 {
  color: $white-1;
  line-height: 1.2;
}
@media screen and (min-width: 640px) {
  .origin {
    position: absolute;
    margin-left: 70px;
    margin-top: 20px;
  }
  .logo {
    .headericond {
      position: absolute;
      top: 10px;
      left: 0px;
      width: 60px;
      height: 60px;
    }
    .logotitle {
      position: absolute;
      left: 75px;
      top: 15px;
      font-style: normal;
      font-weight: bold;
      font-size: 24px;
      line-height: 24px;
      letter-spacing: 0.03em;
      color: $white-1;
    }
    .logosubtitle {
      position: absolute;
      left: 75px;
      top: 45px;
      font-style: normal;
      font-weight: 500;
      font-size: 14px;
      line-height: 14px;
      color: $white-1;
    }
  }
  .title {
    margin-top: 150px;
  }
  @media screen and (min-height: 640px) {
    .navigation {
      margin-top: 200px;
      width: 1024px;
    }
  }
  @media screen and (max-height: 640px) {
    .navigation {
      margin-top: 100px;
      width: 1024px;
    }
  }
}
@media screen and (max-width: 640px) {
  .origin {
    position: absolute;
    margin-left: 10px;
  }
  .logo {
    .headericond {
      position: absolute;
      top: 10px;
      left: 0px;
      width: 60px;
      height: 60px;
    }
    .logotitle {
      position: absolute;
      left: 75px;
      top: 15px;
      font-style: normal;
      font-weight: bold;
      font-size: 22px;
      line-height: 22px;
      letter-spacing: 0.03em;
      color: $white-1;
    }
    .logosubtitle {
      position: absolute;
      left: 75px;
      top: 45px;
      font-style: normal;
      font-weight: 500;
      font-size: 14px;
      line-height: 14px;
      color: $white-1;
    }
  }
  .title {
    margin-top: 120px;
    margin-left: 30px;
    margin-right: 30px;
    margin-bottom: 115px;
  }
  .navigation {
    position: absolute;
    top: 400px;
  }
}
@media screen and (max-width: 407px) {
  .logotitle {
    top: 8px !important;
  }
  .logosubtitle {
    top: 57px !important;
  }
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
  color: $purple-1;
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
  color: gray-1;
}
.navigationicon {
  position: absolute;
  width: 14px;
  height: 24px;
  right: 11px;
  margin-top: -8px;
}
.bgbridge {
  position: fixed;
  bottom: 0;
}
</style>
