<template>
  <div class="MainPage">
    <v-row class="DataBlock">
      <v-col cols="12" md="12" class="DataCard">
        <cases-summary
          :title="'Summary for 9 Bay Area Counties'"
          :title-id="'confirmed-cases'"
          :url="'https://coronadatascraper.com'"
        />
      </v-col>
      <v-col cols="12" md="6" class="DataCard">
        <time-bar-chart
          :title="`Confirmed Cases: Bay Area Total`"
          :title-id="'number-of-confirmed-cases'"
          :chart-id="'time-bar-chart-patients'"
          :chart-data="ConsolidatedData.cases"
          :chart-data-type="'cases'"
          :date="CountyData[currentCounty].lastUpdatedAt"
          :url="'https://coronadatascraper.com'"
        />
      </v-col>
      <v-col cols="12" md="6" class="DataCard">
        <time-bar-chart
          :title="`COVID Related Deaths: Bay Area Total`"
          :title-id="'number-of-confirmed-cases'"
          :chart-id="'time-bar-chart-patients'"
          :chart-data="ConsolidatedData.deaths"
          :chart-data-type="'deaths'"
          :date="CountyData[currentCounty].lastUpdatedAt"
          :url="'https://coronadatascraper.com'"
        />
      </v-col>
      <v-col cols="12" md="12" class="DataCard">
        <DataView>
          <div class="county-select-container">
            <div class="county-select">
              <label class="selection">Show Data For:</label>
              <select v-model="currentCounty" class="select-css">
                <option v-for="(countyName, index) in countyNames" :key="index">
                  {{ countyName }}
                </option>
              </select>
            </div>
            <div class="county-stats">
              <div class="border">
                <span class="stat-title">Confirmed Cases</span>
                <div class="stat-number" :county="Data[currentCounty]">
                  {{
                    Data[currentCounty].cases[
                      Data[currentCounty].cases.length - 1
                    ].cases.toLocaleString()
                  }}
                </div>
                <div class="stat-note">
                  <strong>{{
                    `${(
                      (Data[currentCounty].cases[
                        Data[currentCounty].cases.length - 1
                      ].cases /
                        totalCases) *
                      100
                    ).toFixed(2)}% `
                  }}</strong>
                  of Bay Area Total
                </div>
              </div>
              <div>
                <span class="stat-title">Deaths</span>
                <div class="stat-number">
                  {{
                    Data[currentCounty].cases[
                      Data[currentCounty].cases.length - 1
                    ].deaths.toLocaleString()
                  }}
                </div>
                <div class="stat-note">
                  <strong>{{
                    `${(
                      (Data[currentCounty].cases[
                        Data[currentCounty].cases.length - 1
                      ].deaths /
                        totalDeaths) *
                      100
                    ).toFixed(2)}% `
                  }}</strong>
                  of Bay Area Total
                </div>
              </div>
            </div>
          </div>
        </DataView>
      </v-col>
      <v-col
        :county="CountyData[currentCounty]"
        cols="12"
        md="6"
        class="DataCard"
      >
        <time-bar-chart
          :title="`Confirmed Cases: ${CountyData[currentCounty].name}`"
          :title-id="'number-of-confirmed-cases'"
          :chart-id="'time-bar-chart-patients'"
          :chart-data="CountyData[currentCounty].graph"
          :chart-data-type="'cases'"
          :date="CountyData[currentCounty].lastUpdatedAt"
          :url="'https://coronadatascraper.com'"
        />
      </v-col>
      <v-col
        :county="CountyData[currentCounty]"
        cols="12"
        md="6"
        class="DataCard"
      >
        <time-bar-chart
          :title="`COVID Related Deaths: ${CountyData[currentCounty].name}`"
          :title-id="'number-of-deaths'"
          :chart-id="'time-bar-chart-patients'"
          :chart-data="CountyData[currentCounty].graph"
          :chart-data-type="'deaths'"
          :date="CountyData[currentCounty].lastUpdatedAt"
          :url="'https://coronadatascraper.com'"
        />
      </v-col>
      <v-col cols="12" md="12" class="DataCard">
        <DataView>
          <div class="county-compare-select-container">
            <label>Select Counties to Compare:</label>
          </div>
          <div class="county-select-buttons">
            <v-btn
              v-for="countyName in countiesForCompare"
              :key="countyName.name"
              class="county-select-button"
              outlined
              :style="{
                'background-color': contains(selectedCounties, countyName)
                  ? countyName.color
                  : 'white',
                color: contains(selectedCounties, countyName)
                  ? 'white'
                  : 'black'
              }"
              type="button"
              @click="provide(countyName)"
            >
              {{ countyName.name }}
            </v-btn>
          </div>
        </DataView>
      </v-col>
      <v-col
        :county="CountyData[currentCounty]"
        cols="12"
        md="6"
        class="DataCard"
      >
        <time-line-chart-county-comparison
          :title="`Cases per 1,000 People`"
          :title-id="'cases-per-people'"
          :chart-data="CountyData"
          :selected-counties="selectedCounties"
          :chart-data-type="'casesperpeople'"
          :date="CountyData[currentCounty].lastUpdatedAt"
          :url="'https://coronadatascraper.com'"
        />
      </v-col>
      <v-col
        :county="CountyData[currentCounty]"
        cols="12"
        md="6"
        class="DataCard"
      >
        <time-line-chart-county-comparison
          :title="`Percent Increase in 7 Days`"
          :title-id="'percent-increase-in7days'"
          :chart-data="CountyData"
          :selected-counties="selectedCounties"
          :chart-data-type="'percentincrease'"
          :date="CountyData[currentCounty].lastUpdatedAt"
          :unit="'%'"
          :url="'https://coronadatascraper.com'"
        />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import TimeBarChart from '@/components/TimeBarChart.vue'
import TimeLineChartCountyComparison from '@/components/TimeLineChartCountyComparison.vue'
import CasesSummary from '@/components/CasesSummary.vue'
import Data from '@/data/data.json'
import formatCountyData from '@/utils/formatCountyData'
import consolidateAllData from '@/utils/consolidateAllData'
import DataView from '@/components/DataView.vue'
import { calculateTotalCases, calculateTotalDeaths } from '@/utils/calculations'
import countyColor from '@/static/data/countyColor.json'

export default {
  components: {
    CasesSummary,
    TimeBarChart,
    TimeLineChartCountyComparison,
    DataView
  },
  data() {
    const currentCounty = 'San Francisco County'
    const CountyData = formatCountyData(Data)
    const ConsolidatedData = consolidateAllData(Data)
    const countyNames = Object.keys(Data)

    const totalCases = calculateTotalCases(Data)
    const totalDeaths = calculateTotalDeaths(Data)

    const countiesForCompare = []
    for (const countyName of countyNames) {
      countiesForCompare.push({
        name: countyName,
        color: countyColor[countyName]
      })
    }
    const selectedCounties = []

    const data = {
      Data,
      CountyData,
      ConsolidatedData,
      currentCounty,
      countyNames,
      totalCases,
      totalDeaths,
      countiesForCompare,
      selectedCounties
    }
    return data
  },
  methods: {
    provide(item) {
      if (!this.selectedCounties.includes(item)) {
        this.selectedCounties.push(item)
      } else {
        this.selectedCounties.splice(this.selectedCounties.indexOf(item), 1)
      }
    },
    contains(arr, item) {
      return arr.includes(item)
    }
  },
  head() {
    return {
      title: 'Bay Area Pandemic Dashboard'
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
    .county-select-container {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      align-items: center;
      label {
        font-style: normal;
        font-weight: bold;
        font-size: 24px;
        color: black;
        line-height: 33px;
        margin-right: 10px;
      }
      .county-stats {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        text-align: center;
        .stat-title {
          font-size: 16px;
          color: black;
          font-weight: bold;
          line-height: 22px;
        }
        .stat-number {
          padding: 10px;
          margin: 20px 0px;
          color: black;
          font-weight: bold;
        }
        .stat-note {
          font-style: normal;
          font-weight: 500;
          font-size: 12px;
          line-height: 15px;
          color: $gray-1;
        }
        .border {
          border-right: 2px solid lightgray;
        }
      }
      .county-select {
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
    .county-compare-select-container {
      display: grid;
      align-items: center;
      label {
        text-align: center;
        font-style: normal;
        font-weight: bold;
        font-size: 24px;
        color: black;
        line-height: 33px;
      }
    }
    .county-select-buttons {
      padding: 20px;
    }
    .county-select-button {
      margin: 10px 10px;
    }
    @include lessThan($small) {
      .county-select-container {
        display: initial;
        grid-template-columns: initial;
        .county-stats {
          display: initial;
          grid-template-columns: initial;
          .stat-title {
            margin-top: 50px;
          }
          .stat-number {
            padding: 10px;
            margin: 20px 0px;
            font-size: 36px;
          }
          .stat-note {
          }
          .border {
            border-right: initial;
            margin-bottom: 30px;
          }
        }
        .county-select {
          display: grid;
        }
        .selection {
          text-align: center;
        }
      }
    }
  }

  .select-css {
    display: block;
    font-size: 16px;
    font-weight: 700;
    color: #444;
    line-height: 1.3;
    padding: 0.6em 1.4em 0.5em 0.8em;
    width: 40%;
    max-width: 60%;
    box-sizing: border-box;
    margin: 0;
    border: 1px solid #aaa;
    box-shadow: 0 1px 0 1px rgba(0, 0, 0, 0.04);
    border-radius: 0.5em;
    -moz-appearance: none;
    -webkit-appearance: none;
    appearance: none;
    background-color: #fff;
    background-image: url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23007CB2%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E'),
      linear-gradient(to bottom, #ffffff 0%, #e5e5e5 100%);
    background-repeat: no-repeat, repeat;
    background-position: right 0.7em top 50%, 0 0;
    background-size: 0.65em auto, 100%;
    &:-ms-expand {
      display: none;
    }
    &:hover {
      border-color: #888;
    }
    &:focus {
      border-color: #aaa;
      box-shadow: 0 0 1px 3px rgba(59, 153, 252, 0.7);
      box-shadow: 0 0 0 3px -moz-mac-focusring;
      color: #222;
      outline: none;
    }
    option {
      font-weight: normal;
    }
  }
  @include lessThan($small) {
    .select-css {
      width: initial;
      max-width: initial;
      margin-top: 20px;
      margin-bottom: 40px;
      align-items: center;
    }
  }
}
@media screen and (min-width: 640px) {
  .stat-number {
    font-size: 36px;
  }
}
@media screen and (max-width: 640px) {
  .stat-number {
    font-size: 30px;
  }
  h4 {
    font-size: 15px;
  }
  label {
    font-size: 30px;
  }
}
</style>
