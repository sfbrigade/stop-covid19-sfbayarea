<template>
  <div class="News">
    <page-header
      :icon="headerItem.icon"
      :title="headerItem.title"
      :date="headerItem.date"
    />
    <div v-for="(county, i) in counties" :key="i" class="News-county">
      <whats-new
        class="mb-4"
        :county="county.county"
        :items="county.newsItems"
      />
    </div>
  </div>
</template>
<script>
import PageHeader from '@/components/PageHeader.vue'
import WhatsNew from '@/components/WhatsNew.vue'
import AlamedaNews from '@/data/news/alameda.simple.json'
import ContraCostaNews from '@/data/news/contra_costa.simple.json'
import MarinNews from '@/data/news/marin.simple.json'
import NapaNews from '@/data/news/napa.simple.json'
import SanFranciscoNews from '@/data/news/san_francisco.simple.json'
import SanMateoNews from '@/data/news/san_mateo.simple.json'
import SantaClaraNews from '@/data/news/santa_clara.simple.json'
import SolanoNews from '@/data/news/solano.simple.json'
import SonomaNews from '@/data/news/sonoma.simple.json'
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
        {
          county: 'City and County of San Francisco',
          newsItems: SanFranciscoNews.newsItems
        },
        {
          county: 'Alameda County',
          newsItems: AlamedaNews.newsItems
        },
        {
          county: 'Contra Costa County',
          newsItems: ContraCostaNews.newsItems
        },
        {
          county: 'Marin County',
          newsItems: MarinNews.newsItems
        },
        {
          county: 'Napa County',
          newsItems: NapaNews.newsItems
        },
        {
          county: 'San Mateo County',
          newsItems: SanMateoNews.newsItems
        },
        {
          county: 'Santa Clara County',
          newsItems: SantaClaraNews.newsItems
        },
        {
          county: 'Solano County',
          newsItems: SolanoNews.newsItems
        },
        {
          county: 'Sonoma County',
          newsItems: SonomaNews.newsItems
        }
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
