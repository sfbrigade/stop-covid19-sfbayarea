<template>
  <v-app class="app">
    <div v-if="loading" class="loader">
      <scale-loader color="#403875" />
    </div>
    <div v-else>
      <div class="mainContainer">
        <v-app-bar color="#403875" dark fixed height="64px">
          <nuxt-link to="/">
            <div v-if="isWindowLarge === true">
              <v-img width="auto" height="60px" src="/header-icon-wtext.png" />
            </div>
            <div v-else>
              <v-img width="60px" height="60px" src="/header-icon.png" />
            </div>
          </nuxt-link>

          <template>
            <v-tabs
              v-model="active_tab"
              align-with-title
              fixed-tabs
              background-color="#403875"
              dark
            >
              <v-tab v-for="tab in tabs" :key="tab.id" class="tab">
                {{ tab.name }}
              </v-tab>
            </v-tabs>
          </template>
        </v-app-bar>

        <v-tabs-items v-model="active_tab" class="tabcontent">
          <v-tab-item v-for="tab in tabs" :key="tab.id">
            <Faq v-if="tab.name === 'FAQ'" />
            <Stats v-if="tab.name === 'Stats'" />
            <News v-if="tab.name === 'News'" />
          </v-tab-item>
        </v-tabs-items>
      </div>
    </div>
  </v-app>
</template>

<script>
import Vue from 'vue'
import ScaleLoader from 'vue-spinner/src/ScaleLoader.vue'
import Faq from '@/components/Faq.vue'
import Stats from '@/components/Stats.vue'
import News from '@/components/News.vue'

export default Vue.extend({
  components: {
    ScaleLoader,
    Faq,
    Stats,
    News
  },
  asyncData(context) {
    if (context.params.tab === 'news') {
      return { preselectedtab: 2 }
    } else if (context.params.tab === 'stats') {
      return { preselectedtab: 1 }
    } else {
      // "faq"
      return { preselectedtab: 0 }
    }
  },
  data() {
    return {
      loading: true,
      active_tab: null,
      tabs: [
        { id: 1, name: 'FAQ' },
        { id: 2, name: 'Stats' },
        { id: 3, name: 'News' }
      ]
    }
  },
  computed: {
    isWindowLarge() {
      if (window.matchMedia('(min-width: 1024px)').matches) {
        return true
      } else {
        return false
      }
    }
  },
  mounted() {
    this.loading = false
    this.active_tab = this.preselectedtab
  }
})
</script>
<style lang="scss">
.app {
  max-width: 1440px;
  margin: 0 auto;
  .tab {
    font-size: 24px;
    margin-left: 20px;
  }
  .tabcontent {
    margin-top: 80px;
    margin-right: 1.25rem;
  }
  .v-tab {
    text-transform: none !important;
  }
}
.appContainer {
  position: relative;
  @include largerThan($small) {
    display: grid;
    grid-template-columns: 240px 1fr;
    grid-template-rows: auto;
  }
  @include largerThan($huge) {
    grid-template-columns: 325px 1fr;
    grid-template-rows: auto;
  }
}
@include lessThan($small) {
  .naviContainer {
    position: sticky;
    position: -webkit-sticky;
    top: 0;
    z-index: z-index-of(sp-navigation);
  }
}
@include largerThan($small) {
  .naviContainer {
    grid-column: 1/2;
    position: fixed;
    top: 0;
    overflow-y: auto;
    width: 240px;
    height: 100%;
  }
}
@include largerThan($huge) {
  .naviContainer {
    width: 325px;
  }
}
.open {
  height: 100vh;
  @include largerThan($small) {
    overflow-x: hidden;
    overflow-y: auto;
  }
}
.mainContainer {
  grid-column: 2/3;
  overflow: hidden;
  .mainContainerTitle {
    margin: 1rem 3rem 0.25rem 3rem;
  }
  .container {
    padding-top: 0 !important;
  }
  @include lessThan($small) {
    .container {
      padding-top: 16px !important;
    }
  }
}
.loader {
  height: 200px;
  width: 150px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translateY(-50%) translateX(-50%);
  img {
    display: block;
    margin: 0 auto 20px;
  }
}
</style>
