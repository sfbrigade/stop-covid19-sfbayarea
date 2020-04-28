<template>
  <div class="MainPage">
    <v-row class="DataBlock">
      <v-col cols="12" md="6" class="DataCard">
        <cases-summary
          :title="'Cases Summary'"
          :title-id="'confirmed-cases'"
          :url="'https://coronadatascraper.com'"
        />
      </v-col>
      <v-col
        v-for="(county, index) in CountyData"
        :key="index"
        :county="county"
        cols="12"
        md="6"
        class="DataCard"
      >
        <time-bar-chart
          :title="`${county.name}`"
          :title-id="'number-of-confirmed-cases'"
          :chart-id="'time-bar-chart-patients'"
          :chart-data="county.graph"
          :date="county.lastUpdatedAt"
          :url="'https://coronadatascraper.com'"
        />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import TimeBarChart from '@/components/TimeBarChart.vue'
import CasesSummary from '@/components/CasesSummary.vue'
import Data from '@/data/data.json'
import formatCountyData from '@/utils/formatCountyData'

export default {
  components: {
    CasesSummary,
    TimeBarChart
  },
  data() {
    const CountyData = formatCountyData(Data)

    // Sort County Data in descending order of cases
    CountyData.sort((countyA, countyB) => {
      let r = 0
      if (
        countyA.graph.slice(-1)[0].cumulative >
        countyB.graph.slice(-1)[0].cumulative
      ) {
        r = -1
      } else if (
        countyA.graph.slice(-1)[0].cumulative <
        countyB.graph.slice(-1)[0].cumulative
      ) {
        r = 1
      }
      return r
    })

    const data = {
      Data,
      CountyData
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
