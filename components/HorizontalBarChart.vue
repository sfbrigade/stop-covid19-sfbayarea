<template>
  <data-view
    :title="title"
    :title-id="titleId"
    :date="date"
    :url="url"
    class="chart-header"
  >
    <horizontal-bar
      :chart-id="chartId"
      :chart-data="displayData"
      :options="displayOption"
      :height="240"
    />
  </data-view>
</template>
<script>
import DataView from '@/components/DataView.vue'
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
        datasets: this.chartData.datasets
      }
    },
    displayOption() {
      return {
        tooltips: {
          displayColors: true,
          showAllTooltips: true
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
        }
      }
    }
  }
}
</script>
