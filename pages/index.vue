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
        <cases-summary
          :title="'Cases Summary'"
          :title-id="'details-of-confirmed-cases'"
          :date="Data.main_summary.date"
        />
      </v-col>
      <v-col cols="12" md="6" class="DataCard">
        <time-bar-chart
          title="Confirmed Cases"
          :title-id="'number-of-confirmed-cases'"
          :chart-id="'time-bar-chart-patients'"
          :chart-data="patientsGraph"
          :date="Data.main_summary.date"
          :unit="''"
          :url="''"
        />
      </v-col>
      <v-col cols="12" md="6" class="DataCard">
        <data-table
          :title="'Recent Confimed Cases'"
          :title-id="'attributes-of-confirmed-cases'"
          :chart-data="patientsTable"
          :chart-option="{}"
          :date="Data.patients.date"
          :info="sumInfoOfPatients"
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
import DataTable from '@/components/DataTable.vue'
import formatGraph from '@/utils/formatGraph'
import formatTable from '@/utils/formatTable'
import formatConfirmedCases from '@/utils/formatConfirmedCases'
import News from '@/data/news.json'

export default {
  components: {
    PageHeader,
    CasesSummary,
    TimeBarChart,
    WhatsNew,
    DataTable
  },
  data() {
    const patientsGraph = formatGraph(Data.patients_summary.data)
    const patientsTable = formatTable(Data.patients.data)
    const dischargesGraph = formatGraph(Data.discharges_summary.data)

    const confirmedCases = formatConfirmedCases(Data.main_summary)

    const sumInfoOfPatients = {
      lText: patientsGraph[
        patientsGraph.length - 1
      ].cumulative.toLocaleString(),
      sText: 'Total as of ' + patientsGraph[patientsGraph.length - 1].label,
      unit: ''
    }

    const data = {
      Data,
      patientsTable,
      patientsGraph,
      dischargesGraph,
      confirmedCases,
      sumInfoOfPatients,
      headerItem: {
        icon: 'mdi-chart-timeline-variant',
        title: 'Stop Coronavirus in San Francisco',
        date: Data.lastUpdate
      },
      newsItems: News.newsItems
    }
    return data
  },
  head() {
    return {
      title: 'Stop Coronavirus in San Francisco'
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
