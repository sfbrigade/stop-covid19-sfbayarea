<template>
  <div class="News">
    <div class="county-select">
      <v-card color="#7D70BB" class="county-selector-card">
        <label class="selection">Select a County:</label>
        <DropDown
          :dropdown-model="currentCounty"
          :dropdown-options="countyNames"
          @selectedOption="handleSelect"
        />
      </v-card>
    </div>

    <whats-new class="mb-4" :feed="counties[currentCounty]" />
    <CountyGuidelines :county="currentCounty" />
  </div>
</template>
<script>
import DropDown from '@/components/DropDown'
import WhatsNew from '@/components/WhatsNew.vue'
import AlamedaNews from '@/data/news/alameda.json'
import ContraCostaNews from '@/data/news/contra_costa.json'
import MarinNews from '@/data/news/marin.json'
import NapaNews from '@/data/news/napa.json'
import SanFranciscoNews from '@/data/news/san_francisco.json'
import SanMateoNews from '@/data/news/san_mateo.json'
import SantaClaraNews from '@/data/news/santa_clara.json'
import SolanoNews from '@/data/news/solano.json'
import SonomaNews from '@/data/news/sonoma.json'
import CountyGuidelines from '@/components/CountyGuidelines.vue'
import Data from '@/data/data.json'

export default {
  components: {
    DropDown,
    WhatsNew,
    CountyGuidelines
  },
  data() {
    const currentCounty = 'San Francisco County'
    const countyNames = Object.keys(Data)
    const data = {
      Data,
      counties: {
        'San Francisco County': SanFranciscoNews,
        'Alameda County': AlamedaNews,
        'Contra Costa County': ContraCostaNews,
        'Marin County': MarinNews,
        'Napa County': NapaNews,
        'San Mateo County': SanMateoNews,
        'Santa Clara County': SantaClaraNews,
        'Solano County': SolanoNews,
        'Sonoma County': SonomaNews
      },
      currentCounty,
      countyNames
    }
    return data
  },
  methods: {
    handleSelect(event) {
      this.currentCounty = event
    }
  },
  head() {
    return {
      title: this.$t('COVID-19 News')
    }
  }
}
</script>
<style></style>
