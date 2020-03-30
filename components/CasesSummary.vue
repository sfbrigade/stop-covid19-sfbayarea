<template>
  <data-view :title="title" :title-id="titleId" :date="lastUpdatedAt">
    <div class="summary">
      <div class="total-positive">
        <h1>Confirmed Cases:</h1>
        <div class="total-positive-number">
          {{
            isNaN(calcTotalCasesSummary.cases) != true
              ? calcTotalCasesSummary.cases
              : 'No data available'
          }}
        </div>
      </div>
      <div class="deaths">
        <h1>Deaths:</h1>
        <div class="deaths-number">
          {{
            isNaN(calcTotalCasesSummary.deaths) != true
              ? calcTotalCasesSummary.deaths
              : 'No data available'
          }}
        </div>
      </div>
      <div class="total-recovered">
        <h1>Recovered:</h1>
        <div class="total-recovered-number">
          <font size="5">
            {{
              isNaN(calcTotalCasesSummary.recovered) != true
                ? calcTotalCasesSummary.recovered
                : 'No data available'
            }}
          </font>
        </div>
      </div>
    </div>
  </data-view>
</template>

<style lang="scss" scoped>
.summary {
  text-align: center;
  .total-positive {
    .total-positive-number {
      margin-top: 20px;
      font-size: 36px;
      color: #aaa;
    }
  }
  .deaths {
    margin-top: 40px;
    .deaths-number {
      margin-top: 20px;
      font-size: 36px;
      color: #3d5170;
    }
  }
  .total-recovered {
    margin-top: 40px;
    .total-recovered-number {
      margin-top: 20px;
      font-size: 36px;
      color: #8aca2b;
    }
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

      return {
        cases: totalConfirmedCases,
        deaths: totalDeaths,
        recovered: totalRecovered
      }
    }
  }
}
</script>
