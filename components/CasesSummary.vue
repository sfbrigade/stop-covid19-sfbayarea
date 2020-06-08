<template>
  <data-view
    :title="title"
    :title-id="titleId"
    :date="lastUpdatedAt"
    :centered="true"
  >
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
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  & > div {
    border-right: 2px solid lightgray;
    &:last-child {
      border-right: none;
    }
  }
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
    chartData: {
      type: Object,
      default: () => {}
    },
    date: {
      type: String,
      default: ''
    },
    info: {
      type: Object,
      required: false,
      default: () => {}
    },
    url: {
      type: String,
      required: false,
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
    lastUpdatedAt() {
      // Set the last updated date based on San Francisco data
      const casesSanFrancisco = Data['San Francisco County'].cases
      return casesSanFrancisco[casesSanFrancisco.length - 1].date
    },
    calcTotalCasesSummary() {
      const casesSolano = Data['Solano County'].cases
      const casesAlameda = Data['Alameda County'].cases
      const casesSantaClara = Data['Santa Clara County'].cases
      const casesSanFrancisco = Data['San Francisco County'].cases
      const casesContraCostaCounty = Data['Contra Costa County'].cases
      const casesSanMateoCounty = Data['San Mateo County'].cases
      const casesSonoma = Data['Sonoma County'].cases
      const casesNapa = Data['Napa County'].cases
      const casesMarin = Data['Marin County'].cases

      const totalConfirmedCases =
        casesSolano[casesSolano.length - 1].cases +
        casesAlameda[casesAlameda.length - 1].cases +
        casesSantaClara[casesSantaClara.length - 1].cases +
        casesSanFrancisco[casesSanFrancisco.length - 1].cases +
        casesContraCostaCounty[casesContraCostaCounty.length - 1].cases +
        casesSanMateoCounty[casesSanMateoCounty.length - 1].cases +
        casesSonoma[casesSonoma.length - 1].cases +
        casesNapa[casesNapa.length - 1].cases +
        casesMarin[casesMarin.length - 1].cases

      const prevTotalConfirmedCases =
        casesSolano[casesSolano.length - 2].cases +
        casesAlameda[casesAlameda.length - 2].cases +
        casesSantaClara[casesSantaClara.length - 2].cases +
        casesSanFrancisco[casesSanFrancisco.length - 2].cases +
        casesContraCostaCounty[casesContraCostaCounty.length - 2].cases +
        casesSanMateoCounty[casesSanMateoCounty.length - 2].cases +
        casesSonoma[casesSonoma.length - 2].cases +
        casesNapa[casesNapa.length - 2].cases +
        casesMarin[casesMarin.length - 2].cases

      const totalDeaths =
        casesSolano[casesSolano.length - 1].deaths +
        casesAlameda[casesAlameda.length - 1].deaths +
        casesSantaClara[casesSantaClara.length - 1].deaths +
        casesSanFrancisco[casesSanFrancisco.length - 1].deaths +
        casesContraCostaCounty[casesContraCostaCounty.length - 1].deaths +
        casesSanMateoCounty[casesSanMateoCounty.length - 1].deaths +
        casesSonoma[casesSonoma.length - 1].deaths +
        casesNapa[casesNapa.length - 1].deaths +
        casesMarin[casesMarin.length - 1].deaths

      const totalRecovered =
        casesSolano[casesSolano.length - 1].recovered +
        casesAlameda[casesAlameda.length - 1].recovered +
        casesSantaClara[casesSantaClara.length - 1].recovered +
        casesSanFrancisco[casesSanFrancisco.length - 1].recovered +
        casesContraCostaCounty[casesContraCostaCounty.length - 1].recovered +
        casesSanMateoCounty[casesSanMateoCounty.length - 1].recovered +
        casesSonoma[casesSonoma.length - 1].recovered +
        casesNapa[casesNapa.length - 1].recovered +
        casesMarin[casesMarin.length - 1].recovered

      const totalPopulation =
        Data['Solano County'].population +
        Data['Alameda County'].population +
        Data['Santa Clara County'].population +
        Data['San Francisco County'].population +
        Data['Contra Costa County'].population +
        Data['San Mateo County'].population +
        Data['Sonoma County'].population +
        Data['Napa County'].population +
        Data['Marin County'].population

      return {
        cases: totalConfirmedCases,
        deaths: totalDeaths,
        recovered: totalRecovered,
        population: totalPopulation,
        percentChange: calculatePercentage(
          prevTotalConfirmedCases,
          totalConfirmedCases
        )
      }
    }
  }
}
</script>
