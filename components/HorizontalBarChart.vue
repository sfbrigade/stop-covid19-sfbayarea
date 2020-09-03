<template>
  <data-view
    :title="title"
    :title-id="titleId"
    :date="date"
    :url="url"
    :chart-info="chartInfo"
    class="chart-header"
  >
    <horizontal-bar
      :chart-id="chartId"
      :chart-data="displayData"
      :options="displayOption"
      :height="240"
      :plugins="[getPlugins()]"
    />
    <div v-if="hasNoData()" class="no-data">
      No Data Avail
    </div>
  </data-view>
</template>
<script>
import ChartDataLabels from 'chartjs-plugin-datalabels'
import DataView from '@/components/DataView.vue'
import { ChartTypes } from '@/utils/formatCountyDataVTwo'
export default {
  components: { DataView },
  props: {
    title: {
      type: String,
      required: false,
      default: ''
    },
    titleId: {
      type: String,
      required: false,
      default: ''
    },
    chartId: {
      type: String,
      required: false,
      default: 'horizontal-bar-chart'
    },
    chartData: {
      type: Object,
      required: false,
      default: () => {}
    },
    chartInfo: {
      type: Array,
      required: false,
      default: () => []
    },
    date: {
      type: String,
      required: true,
      default: ''
    },
    url: {
      type: String,
      required: false,
      default: ''
    }
  },
  computed: {
    displayData() {
      return {
        labels: this.chartData.labels,
        datasets: [
          {
            data: this.chartData.datasets.data,
            backgroundColor: this.chartData.datasets.backgroundColor
          }
        ]
      }
    },
    displayOption() {
      return {
        tooltips: {
          displayColors: false,
          showAllTooltips: true,
          titleAlign: 'center',
          bodyAlign: 'center',
          callbacks: {
            label(tooltipItem) {
              if (!tooltipItem) return
              return 'cases'
            },
            title(tooltipItem) {
              if (!tooltipItem) return
              return tooltipItem[0].value
            }
          }
        },
        barValueSpacing: 20,
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          display: this.chartData.displayLegend
        },
        scales: {
          xAxes: [
            {
              id: 'cases',
              stacked: false,
              gridLines: {
                display: true,
                drawOnChartArea: false
              },
              ticks: {
                fontSize: 9,
                maxTicksLimit: 30,
                fontColor: '#808080',
                maxRotation: 0,
                minRotation: 0
              }
            }
          ],
          yAxes: [
            {
              stacked: false,
              gridLines: {
                display: true,
                color: '#E5E5E5',
                drawOnChartArea: false
              },
              ticks: {
                suggestedMin: 0,
                maxTicksLimit: 8,
                fontColor: '#808080'
              }
            }
          ]
        },
        plugins: this.chartData.customChartOptions.plugins
      }
    }
  },
  methods: {
    hasNoData() {
      return !Object.keys(this.chartData.datasets).length
    },
    getPlugins() {
      // ADD CHECK FOR CHARTS THAT WANT TO ENABLE ALWAYS SHOW TOOLTIPS
      if (this.chartData.chartType === ChartTypes.GENDER) return ChartDataLabels
      if (this.chartData.chartType === ChartTypes.RACE_ETH)
        return ChartDataLabels
      if (this.chartData.chartType === ChartTypes.RACE_ETH_NORM)
        return ChartDataLabels
      return ''
    }
  }
}
</script>

<style lang="scss" scoped>
.chart-header {
  position: relative;
  .no-data {
    position: absolute;
    top: 50%;
    left: 45%;
  }
}
</style>
