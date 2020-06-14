<template>
  <div class="News">
    <page-header
      :icon="headerItem.icon"
      :title="headerItem.title"
      :date="headerItem.date"
    />
    <div v-for="(county, i) in counties" :key="i" class="News-county">
      <whats-new class="mb-4" :feed="county" />
    </div>
  </div>
</template>
<script>
import PageHeader from '@/components/PageHeader.vue'
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
export default {
  components: {
    PageHeader,
    WhatsNew
  },
  data() {
    const data = {
      headerItem: {
        icon: 'mdi-chart-timeline-variant',
        title: 'County Public Health Updates'
      },
      counties: [
        SanFranciscoNews,
        AlamedaNews,
        ContraCostaNews,
        MarinNews,
        NapaNews,
        SanMateoNews,
        SantaClaraNews,
        SolanoNews,
        SonomaNews
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
