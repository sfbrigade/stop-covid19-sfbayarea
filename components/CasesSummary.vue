<template>
  <data-view :title="title" :title-id="titleId" :date="date">
    <div class="summary">
      <div class="total-positive">
        <h1>Confirmed Cases:</h1>
        <div class="total-positive-number">
          {{ confirmedCases.ConfirmedCases }}
        </div>
      </div>
      <div class="deaths">
        <h1>Deaths:</h1>
        <div class="deaths-number">
          {{ confirmedCases.Deaths }}
        </div>
      </div>
      <div class="total-recovered">
        <h1>Recovered:</h1>
        <div class="total-recovered-number">
          <!--{{ confirmedCases.Discharged }}-->
          <font size="5">
            No data available
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
import formatConfirmedCases from '@/utils/formatConfirmedCases'

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
    const confirmedCases = formatConfirmedCases(Data.main_summary)

    const data = {
      Data,
      confirmedCases
    }
    return data
  }
}
</script>
