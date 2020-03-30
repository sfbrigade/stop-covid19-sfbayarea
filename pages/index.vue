<template>
  <div class="MainPage">
    <page-header
      :icon="headerItem.icon"
      :title="headerItem.title"
      :date="headerItem.date"
    />
    <whats-new class="mb-4" :items="newsItems" />
    <v-row class="DataBlock">
      <v-col cols="12" md="6" class="DataCard">
        <cases-summary :title="'Cases Summary'" :title-id="'confirmed-cases'" />
      </v-col>
      <v-col cols="12" md="6" class="DataCard">
        <time-bar-chart
          title="Cases in San Francisco County"
          :title-id="'number-of-confirmed-cases'"
          :chart-id="'time-bar-chart-patients'"
          :chart-data="SanFranciscoCasesGraph"
          :date="SanFranciscoLastUpdatedAt"
          :url="''"
        />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import PageHeader from '@/components/PageHeader.vue'
import TimeBarChart from '@/components/TimeBarChart.vue'
import CasesSummary from '@/components/CasesSummary.vue'
import WhatsNew from '@/components/WhatsNew.vue'
import Data from '@/data/data.json'
import formatGraph from '@/utils/formatGraph'
import News from '@/data/news.json'

export default {
  components: {
    PageHeader,
    CasesSummary,
    TimeBarChart,
    WhatsNew
  },
  data() {
    const SanFranciscoCasesGraph = formatGraph(
      Data['San Francisco County'].cases
    )
    const SanFranciscoLastUpdatedAt = Data['San Francisco County'].cases.slice(
      -1
    )[0].date

    const data = {
      Data,
      SanFranciscoCasesGraph,
      SanFranciscoLastUpdatedAt,
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
      title: 'Stop Coronavirus in the Bay Area'
    }
  }
}
</script>

<style lang="scss" scoped>
.MainPage {
  .DataBlock {
    margin: 20px -8px;
    .DataCard {
      @include largerThan($medium) {
        padding: 10px;
      }
      @include lessThan($small) {
        padding: 4px 8px;
      }
    }
  }
}
</style>
