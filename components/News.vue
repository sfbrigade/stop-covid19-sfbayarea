<template>
  <div class="News">
    <div v-for="(county, i) in counties" :key="i" class="News-county">
      <whats-new class="mb-4" :feed="county" />
    </div>
    <CityGuidelines />
  </div>
</template>
<script>
import WhatsNew from '@/components/WhatsNew.vue'
// import AlamedaNews from '@/data/news/alameda.json'
// import ContraCostaNews from '@/data/news/contra_costa.json'
// import MarinNews from '@/data/news/marin.json'
// import NapaNews from '@/data/news/napa.json'
import SanFranciscoNews from '@/data/news/san_francisco.json'
// import SanMateoNews from '@/data/news/san_mateo.json'
// import SantaClaraNews from '@/data/news/santa_clara.json'
// import SolanoNews from '@/data/news/solano.json'
// import SonomaNews from '@/data/news/sonoma.json'
import CityGuidelines from '@/components/CityGuidelines.vue'

export default {
  components: {
    WhatsNew,
    CityGuidelines
  },
  data() {
    const data = {
      counties: [
        SanFranciscoNews
        // AlamedaNews,
        // ContraCostaNews,
        // MarinNews,
        // NapaNews,
        // SanMateoNews,
        // SantaClaraNews,
        // SolanoNews,
        // SonomaNews
      ]
    }
    return data
  },
  head() {
    return {
      title: this.$t('COVID-19 News')
    }
  }
}
</script>
<style></style>
