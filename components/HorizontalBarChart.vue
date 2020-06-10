<template>
  <data-view :title="title" :title-id="titleId" :date="date" :url="url">
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
        labels: [
          '0-17',
          '18-30',
          '31-40',
          '41-50',
          '51-60',
          '61-70',
          '71-80',
          '81+'
        ],
        datasets: [
          {
            label: 'Women',
            backgroundColor: '#E23A5A',
            data: [7, 11, 6, 11, 38, 31, 27, 32]
          },
          {
            label: 'Men',
            backgroundColor: '#679BD0',
            data: [2, 9, 8, 18, 28, 33, 47, 37]
          }
        ]
      }
    },
    displayOption() {
      return {
        tooltips: {
          displayColors: true,
          callbacks: {
            label(tooltipItem) {
              const labelText = `${
                tooltipItem.datasetIndex > 0 ? 'M:' : 'F:'
              } ${tooltipItem.value} cases`
              return labelText
            },
            title(tooltipItem) {
              console.log('tooltipItem', tooltipItem)
              const titleText = `Age: ${tooltipItem[0].label}`
              return titleText
            }
          }
        },
        barValueSpacing: 20,
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          display: true
        },
        scales: {
          xAxes: [
            {
              id: 'cases',
              stacked: false,
              gridLines: {
                display: false
              },
              ticks: {
                fontSize: 9,
                maxTicksLimit: 30,
                fontColor: '#808080',
                maxRotation: 0,
                minRotation: 0
                // callback: label => {
                //   return label.split('/')[1]
                // }
              }
            }
          ],
          yAxes: [
            {
              // location: 'bottom',
              stacked: false,
              gridLines: {
                display: true,
                color: '#E5E5E5'
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
