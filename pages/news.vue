<template>
  <div class="News">
    <page-header
      :icon="headerItem.icon"
      :title="headerItem.title"
      :date="headerItem.date"
    />
    <whats-new class="mb-4" :items="newsItems" />
  </div>
</template>
<script>
import PageHeader from '@/components/PageHeader.vue'
import WhatsNew from '@/components/WhatsNew.vue'
import Data from '@/data/data.json'
import News from '@/data/news.json'
export default {
  components: {
    PageHeader,
    WhatsNew
  },
  data() {
    const SanFranciscoLastUpdatedAt = Data['San Francisco County'].cases.slice(
      -1
    )[0].date
    const data = {
      headerItem: {
        icon: 'mdi-chart-timeline-variant',
        title: 'Stop Coronavirus in the Bay Area',
        date: SanFranciscoLastUpdatedAt
      },
      newsItems: News.newsItems
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
