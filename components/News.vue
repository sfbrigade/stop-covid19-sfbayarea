<template>
  <div class="News">
    <div class="county-select">
      <v-card color="#7D70BB" class="county-selector-card">
        <label class="selection">Select a County:</label>
        <select v-model="currentCounty" class="county-choice">
          <option v-for="(countyName, index) in countyNames" :key="index">
            {{ countyName }}
          </option>
        </select>
      </v-card>
    </div>

    <div v-for="(county, i) in counties" :key="i" class="News-county">
      <whats-new class="mb-4" :feed="county" />
    </div>
    <CityGuidelines :county="currentCounty" />
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
import Data from '@/data/data.json'

export default {
  components: {
    WhatsNew,
    CityGuidelines
  },
  data() {
    const currentCounty = 'San Francisco County'
    const countyNames = Object.keys(Data)
    const data = {
      Data,
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
      ],
      currentCounty,
      countyNames
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
