<template>
  <data-view :title="title" :date="date" :url="url">
    <bar
      v-if="displayData != null"
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
    chartData: {
      type: Array,
      required: false,
      default: () => []
    },
    selectedCounties: {
      type: Array,
      required: false,
      default: () => []
    },
    chartDataType: {
      type: String,
      required: true,
      default: 'cases'
    },
    date: {
      type: String,
      required: true,
      default: ''
    },
    unit: {
      type: String,
      required: false,
      default: ''
    },
    url: {
      type: String,
      required: false,
      default: ''
    }
  },
  data() {
    return {}
  },
  computed: {
    displayData() {
      if (this.chartDataType === 'casesperpeople') {
        if (this.selectedCounties.length) {
          const dataSets = []
          for (const county of this.selectedCounties) {
            dataSets.push({
              type: 'line',
              fill: false,
              borderWidth: 1,
              pointBackgroundColor: 'rgba(0,0,0,0)',
              pointBorderColor: 'rgba(0,0,0,0)',
              borderColor: county.color,
              lineTension: 0,
              label: county.name,
              data: this.chartData[county.name].graph.map(d => {
                return (
                  d.confirmedTransition /
                  (this.chartData[county.name].population / 1000)
                )
              }),
              backgroundColor: '#473A8C'
            })
          }

          return {
            labels: this.chartData[this.selectedCounties[0].name].graph.map(
              d => {
                return d.label
              }
            ),
            datasets: dataSets
          }
        } else {
          return {
            datasets: []
          }
        }
      } else {
        // TBD for past 7 days
        return {
          datasets: []
        }
      }
    },
    displayOption() {
      const unit = this.unit
      return {
        tooltips: {
          displayColors: false,
          callbacks: {
            label(tooltipItem) {
              const labelText =
                (Math.round(tooltipItem.value * 100) / 100).toLocaleString() +
                unit
              return labelText
            },
            title(tooltipItem, data) {
              return data.labels[tooltipItem[0].index]
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
              id: 'day',
              stacked: false,
              gridLines: {
                display: false
              },
              ticks: {
                fontSize: 12,
                maxTicksLimit: 20,
                fontColor: '#808080',
                maxRotation: 0,
                minRotation: 0,
                callback: label => {
                  return label.split('/')[1]
                }
              }
            },
            {
              id: 'month',
              stacked: false,
              gridLines: {
                drawOnChartArea: false,
                drawTicks: true,
                drawBorder: false,
                tickMarkLength: 10
              },
              ticks: {
                fontSize: 12,
                fontColor: '#808080',
                padding: 3,
                fontStyle: 'bold',
                gridLines: {
                  display: true
                },
                callback: label => {
                  const month = label.split(' ')[0]
                  return month
                }
              },
              type: 'time',
              time: {
                unit: 'month'
              }
            }
          ],
          yAxes: [
            {
              location: 'bottom',
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

<style lang="scss" scoped>
.selectorButton {
  margin-top: 24px;
}
</style>
