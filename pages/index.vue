<template>
  <v-app style="background: #423578">
    <v-container fluid class="HomePage-Container">
      <div class="Background-Wrapper">
        <div class="logo">
          <img class="headericond" src="/header-icon.png" />
          <div class="logo-title-container">
            <span class="logotitle">Bay Area Pandemic Dashboard</span>
            <span class="logosubtitle">by Bay Area Brigades</span>
          </div>
        </div>
        <div class="origin">
          <div class="title">
            <h1>
              COVID Awareness for the Bay Area, by the Bay Area.
            </h1>
          </div>
          <div dense class="navigation">
            <v-card
              v-for="(item, i) in cardItems"
              :key="i"
              class="mx-auto"
              width="276px"
              height="74px"
              outlined
              nuxt-link
              :to="{ name: item.to, params: item.params }"
            >
              <v-list-item>
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
          </div>
        </div>
      </div>
      <Footer />
    </v-container>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue'
import Footer from '@/components/Footer.vue'

export default Vue.extend({
  components: {
    Footer
  },
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
#app {
  max-width: 1440px;
  margin: 0 auto;
}
.v-application--wrap {
  justify-content: space-between;
}
.HomePage-Container {
  margin: 0 auto;
  padding: 0 !important;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .Background-Wrapper {
    background: url('/gg_1400.png') center no-repeat;
    height: calc(100% - 200px);
  }

  .logo {
    margin: 40px;
    display: flex;
    .headericond {
      width: 60px;
      height: 60px;
    }
    .logo-title-container {
      display: flex;
      flex-direction: column;
      padding: 4px 15px;
      .logotitle {
        font-style: normal;
        font-weight: bold;
        font-size: 24px;
        line-height: 24px;
        letter-spacing: 0.03em;
        color: $white-1;
        margin-bottom: 5px;
      }
      .logosubtitle {
        font-style: normal;
        font-weight: 500;
        font-size: 14px;
        line-height: 14px;
        color: $white-1;
      }
    }
  }

  .origin {
    display: flex;
    flex-direction: column;
    height: auto;
    .title {
      margin: 40px;
      h1 {
        color: $white-1;
        line-height: 1.2;
        overflow-wrap: break-word;
        max-width: 470px;
      }
    }

    .navigation {
      display: flex;
      justify-content: space-between;
      margin: 60px 40px;
      max-width: 900px;
      .v-card--link {
        margin-right: 0 !important;
        margin-left: 0 !important;
      }
      .v-list-item {
        height: 100%;
        .v-list-item__content {
          height: 100%;
          padding: 10px 0;
          flex-direction: column;
          align-items: unset;
          align-self: unset;
          flex-wrap: unset;
          flex: none;
          min-width: 220px;
          margin-right: 10px;
        }
      }
    }
    .cardtitle {
      height: 19px;
      width: 100%;
      font-style: normal;
      font-weight: bold;
      font-size: 16px;
      line-height: 19px;
      color: $purple-1;
      display: flex;
      align-items: center;
    }
    .carddescription {
      height: 17px;
      font-style: normal;
      font-weight: 500;
      font-size: 12px;
      line-height: 140%;
      color: $gray-1;
      display: flex;
      align-items: center;
    }
    .navigationicon {
      width: 14px;
      height: 24px;
    }
  }
}
@media screen and (max-width: 930px) {
  .Background-Wrapper {
    background: url('/gg_915.png') center no-repeat !important;
  }
  .origin {
    .title {
      margin-top: 0 !important;
      margin-bottom: 0 !important;
      h1 {
        @include font-size(32);
      }
    }

    .navigation {
      flex-direction: column;
      margin-top: 40px !important;
      margin-bottom: 40px !important;
      .v-card--link {
        margin-top: 5px;
        margin-bottom: 5px;
      }
    }
  }
}

@media screen and (max-width: 600px) {
  .Background-Wrapper {
    background: url('/gg_612.png') left bottom no-repeat !important;
  }

  .origin {
    .title {
      h1 {
        @include font-size(26);
        max-width: 325px !important;
      }
    }
    .navigation {
      align-items: center;
    }
  }
}

@media screen and (max-width: 445px) {
  .HomePage-Container {
    .Background-Wrapper {
      background: url('/gg_479.png') left bottom no-repeat !important;
    }
    .logo {
      margin: 20px 20px 40px 20px;
      .headericond {
        width: 40px;
        height: 40px;
      }
      .logo-title-container {
        padding: 0 10px;
        .logotitle {
          @include font-size(16);
          margin-bottom: 0;
        }
        .logosubtitle {
          @include font-size(10);
        }
      }
    }

    .origin {
      .title {
        margin: 20px;
        h1 {
          @include font-size(24);
          max-width: 300px !important;
        }
      }
    }
  }
}
</style>
