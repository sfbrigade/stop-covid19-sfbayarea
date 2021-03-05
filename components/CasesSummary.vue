<template>
  <data-view :title="title" :title-id="titleId" :date="date" :centered="true">
    <div class="summary">
      <div class="total-positive">
        <span class="stat-title">Confirmed Cases</span>
        <div class="stat-number">
          {{
            isNaN(calcTotalCasesSummary.cases) != true
              ? calcTotalCasesSummary.cases.toLocaleString()
              : 'No data available'
          }}
        </div>
        <div class="stat-note">
          <strong>{{ calcTotalCasesSummary.newCases }}</strong>
          new daily cases
        </div>
      </div>
      <div class="case-frequency">
        <span class="stat-title">Confirmed Cases per 100,000</span>
        <div class="stat-number">
          {{
            (
              calcCases7DayLaggingAverage /
              (calcTotalCasesSummary.population / 100000)
            ).toFixed(2)
          }}
        </div>
        <div class="stat-note">
          7 day rolling avg with 7 day lag
        </div>
      </div>
      <div class="deaths">
        <span class="stat-title">Total Deaths</span>
        <div class="stat-number">
          {{
            isNaN(calcTotalCasesSummary.deaths) != true
              ? calcTotalCasesSummary.deaths.toLocaleString()
              : 'No data available'
          }}
        </div>
        <div class="stat-note">
          <strong>
            {{ calcTotalCasesSummary.newDeaths }}
          </strong>
          new daily deaths
        </div>
      </div>
    </div>
  </data-view>
</template>

<style lang="scss" scoped>
.summary {
  text-align: center;
  @media screen and (min-width: 640px) {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    & > div {
      border-right: 2px solid lightgray;
      &:last-child {
        border-right: none;
      }
    }
  }
  .stat-title {
    font-size: 16px;
    color: black;
    font-weight: bold;
    line-height: 22px;
  }
  .stat-number {
    @media screen and (min-width: 640px) {
      padding: 30px;
    }
    @media screen and (max-width: 640px) {
      padding: 15px;
    }
    color: black;
    font-weight: bold;
    line-height: 39px;
    text-align: center;
  }
  .stat-note {
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 19px;
    color: #333333;
  }
  @media screen and (max-width: 640px) {
    .case-frequency {
      padding: 50px;
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
}
</style>

<script>
import DataView from '@/components/DataView.vue'
import Data from '@/data/data.json'

export default {
  components: { DataView },
  props: {
    title: {
      type: String,
      default: ''
    },
    titleId: {
      type: String,
      default: ''
    },
    data: {
      type: Object,
      default: () => {}
    },
    date: {
      type: String,
      default: ''
    }
  },

  data() {
    const data = {
      Data
    }
    return data
  },
  computed: {
    calcTotalCasesSummary() {
      return {
        cases: this.data.cases[this.data.cases.length - 1].cumulative,
        deaths: this.data.cases[this.data.cases.length - 1].deathCumulative,
        population: this.data.totalPopulation,
        newCases:
          this.data.cases[this.data.cases.length - 1].cumulative -
          this.data.cases[this.data.cases.length - 2].cumulative,
        newDeaths:
          this.data.cases[this.data.cases.length - 1].deathCumulative -
          this.data.cases[this.data.cases.length - 2].deathCumulative
      }
    },
    calcCases7DayLaggingAverage() {
      const lagging7DayCases = this.data.cases.slice(-14, -7)
      const averageDailyCases =
        lagging7DayCases.reduce((pre, curr) => {
          return pre + curr.confirmedTransition
        }, 0) / lagging7DayCases.length
      return averageDailyCases
    }
  }
}
</script>
