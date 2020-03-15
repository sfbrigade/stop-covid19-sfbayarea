<template>
  <div class="MainPage">
    <page-header
      :icon="headerItem.icon"
      :title="headerItem.title"
      :date="headerItem.date"
    />
    <whats-new class="mb-4" :items="newsItems" />
    <static-info
      class="mb-4"
      :url="''"
      :text="'Feel free to contact if you or your familiy have any concern about your simptom'"
      :btn-text="'CONTACT'"
    />
    <v-row class="DataBlock">
      <v-col cols="12" md="6" class="DataCard">
        <cases-summary
          :title="'Cases Summary'"
          :title-id="'details-of-confirmed-cases'"
          :date="Data.inspections_summary.date"
        />
      </v-col>
      <v-col cols="12" md="6" class="DataCard">
        <time-bar-chart
          title="Confirmed Cases"
          :title-id="'number-of-confirmed-cases'"
          :chart-id="'time-bar-chart-patients'"
          :chart-data="patientsGraph"
          :date="Data.patients.date"
          :unit="''"
          :url="
            ''
          "
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
          :url="
            ''
          "
        />
      </v-col>
      <v-col cols="12" md="6" class="DataCard">
        <time-stacked-bar-chart
          title="Tested"
          :title-id="'number-of-tested'"
          :chart-id="'time-stacked-bar-chart-inspections'"
          :chart-data="inspectionsGraph"
          :date="Data.inspections_summary.date"
          :items="inspectionsItems"
          :labels="inspectionsLabels"
          :unit="''"
        />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import PageHeader from '@/components/PageHeader.vue'
import TimeBarChart from '@/components/TimeBarChart.vue'
import TimeStackedBarChart from '@/components/TimeStackedBarChart.vue'
import CasesSummary from '@/components/CasesSummary.vue'
import WhatsNew from '@/components/WhatsNew.vue'
import StaticInfo from '@/components/StaticInfo.vue'
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
    TimeStackedBarChart,
    WhatsNew,
    StaticInfo,
    DataTable,
  },
  data() {
    const patientsGraph = formatGraph(Data.patients_summary.data)
    const patientsTable = formatTable(Data.patients.data)
    const dischargesGraph = formatGraph(Data.discharges_summary.data)

    const inspectionsGraph = [
      Data.inspections_summary.data['In the Bay Area'],
      Data.inspections_summary.data['OutsideBayArea']
    ]
    const inspectionsItems = [
      'In the Bay Area',
      'OutsideBayArea （Cruise etc）'
    ]
    const inspectionsLabels = Data.inspections_summary.labels

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
      inspectionsGraph,
      inspectionsItems,
      inspectionsLabels,
      confirmedCases,
      sumInfoOfPatients,
      headerItem: {
        icon: 'mdi-chart-timeline-variant',
        title: 'Stop Coronavirus in the Bay Area ',
        date: Data.lastUpdate
      },
      newsItems: News.newsItems,
    }
    return data
  },
  head() {
    return {
      title: 'Stop Coronavirus in the Bay Area '
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
