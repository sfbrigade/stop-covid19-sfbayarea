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
import News from '@/data/news.json'
export default {
  components: {
    PageHeader,
    WhatsNew
  },
  data() {
    const data = {
      headerItem: {
        icon: 'mdi-chart-timeline-variant',
        title: 'City and County of San Francisco'
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
