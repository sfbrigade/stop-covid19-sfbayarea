<template>
  <v-app class="app">
    <div v-if="loading" class="loader">
      <scale-loader color="#403875" />
    </div>
    <div v-else>
      <div class="mainContainer">
        <TopNavigation :active-tab="active_tab" @tabClicked="navigateToTab" />
        <TitleBar />
        <v-tabs-items v-model="active_tab" class="tabcontent">
          <v-tab-item v-for="tab in tabs" :key="tab.id">
            <Faq v-if="tab.name === 'FAQ'" />
            <Stats v-if="tab.name === 'Stats'" />
            <News v-if="tab.name === 'Updates'" />
          </v-tab-item>
        </v-tabs-items>
      </div>
      <Footer />
    </div>
  </v-app>
</template>

<script>
import Vue from 'vue'
import ScaleLoader from 'vue-spinner/src/ScaleLoader.vue'
import TopNavigation from '@/components/TopNavigation'
import Faq from '@/components/Faq.vue'
import Stats from '@/components/Stats.vue'
import News from '@/components/News.vue'
import Footer from '@/components/Footer.vue'
import TitleBar from '@/components/TitleBar.vue'

export default Vue.extend({
  components: {
    ScaleLoader,
    TopNavigation,
    TitleBar,
    Faq,
    Stats,
    News,
    Footer
  },
  asyncData(context) {
    if (context.params.tab === 'updates') {
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
        {
          id: 1,
          name: 'FAQ',
          header: 'Frequently Asked Questions',
          subheader: 'Questions and Answers about COVID-19 in the Bay Area'
        },
        {
          id: 2,
          name: 'Stats',
          header: 'Bay Area Statistics',
          subheader: 'Numbers and figures about COVID-19 in the Bay Area'
        },
        {
          id: 3,
          name: 'Updates',
          header: 'Latest Updates',
          subheader: 'Local news and links to updates about COVID-19'
        }
      ]
    }
  },
  mounted() {
    this.loading = false
    this.active_tab = this.preselectedtab
  },
  methods: {
    navigateToTab(event) {
      this.active_tab = event
    }
  }
})
</script>
<style lang="scss">
.app {
  max-width: 1440px;
  margin: 0 auto;
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
  margin-bottom: 80px;
  @include lessThan($small) {
    margin-bottom: 55px;
  }
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
.tab {
  @media screen and (max-width: 640px) {
    max-width: 125px;
  }
  font-style: normal;
  font-weight: bold;
  font-size: 20px;
  line-height: 19px;

  /* identical to box height */
  text-align: center;
  color: $white-1;

  /* Inside Auto Layout */
  flex: none;
  order: 1;
  align-self: center;
  margin: 10px 0px;
}
.tabcontent {
  // margin-top: 380px;
  margin-right: 1.25rem;
  @include lessThan($small) {
    margin-right: 0;
  }
}
.v-tab {
  text-transform: none !important;
}

.iconcontainer {
  margin: 10px;
  width: 20px;
  height: 20px;
}
</style>
