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
          <strong>{{ `${calcTotalCasesSummary.percentChange}%` }}</strong>
          {{
            parseInt(calcTotalCasesSummary.percentChange) >= 0
              ? `daily increase`
              : `daily decrease`
          }}
        </div>
      </div>
      <div class="case-frequency">
        <span class="stat-title">Confirmed Cases per 10,000</span>
        <div class="stat-number">
          {{
            (
              calcTotalCasesSummary.cases /
              (calcTotalCasesSummary.population / 10000)
            ).toFixed(2)
          }}
        </div>
        <div class="stat-note">
          in past 14 days
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
            {{
              `${(
                (calcTotalCasesSummary.deaths / calcTotalCasesSummary.cases) *
                100
              ).toFixed(2)}%`
            }}
          </strong>
          death rate
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
import { calculatePercentage } from '@/utils/calculations'

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
        percentChange: calculatePercentage(
          this.data.cases[this.data.cases.length - 2].cumulative,
          this.data.cases[this.data.cases.length - 1].cumulative
        )
      }
    }
  }
}
</script>
