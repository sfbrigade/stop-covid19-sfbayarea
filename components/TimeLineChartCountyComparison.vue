<template>
  <data-view
    :title="title"
    :sub-title="subTitle"
    :date="date"
    :url="url"
    :chart-info="chartInfo"
  >
    <template v-slot:button>
      <TimePickerDropdown
        class="dropdown-container"
        :time-picker-model="timePickerSelected"
        @timePickerSelected="handleTimePick"
      />
    </template>
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
import TimePickerDropdown from '@/components/TimePickerDropdown'

export default {
  components: { DataView, TimePickerDropdown },
  props: {
    title: {
      type: String,
      required: false,
      default: ''
    },
    subTitle: {
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
    const caseData = {}
    const percentData = {}
    for (const county in this.chartData) {
      const confirmedDailyIn14daysQueue = []
      caseData[county] = this.chartData[county].graph.map(d => {
        // calculate new cases per 100,000 residents (14 day average)
        confirmedDailyIn14daysQueue.push(d.confirmedTransition)
        if (confirmedDailyIn14daysQueue.length > 14) {
          confirmedDailyIn14daysQueue.shift()
        }
        const averageDailyCases =
          confirmedDailyIn14daysQueue.reduce((pre, curr) => {
            return pre + curr
          }, 0) / confirmedDailyIn14daysQueue.length
        return averageDailyCases / (this.chartData[county].population / 100000)
      })

      const confirmedCumulativeIn7daysQueue = []
      percentData[county] = this.chartData[county].graph.map(d => {
        confirmedCumulativeIn7daysQueue.push(d.cumulative)
        if (confirmedCumulativeIn7daysQueue.length > 7) {
          const confirmedCumulative7daysBefore = confirmedCumulativeIn7daysQueue.shift()
          return (
            ((d.cumulative - confirmedCumulative7daysBefore) /
              confirmedCumulative7daysBefore) *
            100
          )
        } else {
          return null
        }
      })
    }
    return {
      timePickerSelected: '30',
      caseData,
      percentData
    }
  },
  computed: {
    displayData() {
      if (this.selectedCounties.length) {
        const dataSets = []
        const data =
          this.chartDataType === 'casesperpeople'
            ? this.caseData
            : this.percentData
        const labels = this.chartData[this.selectedCounties[0].name].graph.map(
          d => {
            return d.label
          }
        )
        const sliceToTimePick = arr =>
          arr.slice(-Number(this.timePickerSelected) || 0)

        for (const county of this.selectedCounties) {
          dataSets.push({
            type: 'line',
            fill: false,
            borderWidth: 3,
            pointBackgroundColor: 'rgba(0,0,0,0)',
            pointBorderColor: 'rgba(0,0,0,0)',
            borderColor: county.color,
            lineTension: 0.5,
            borderJoinStyle: 'round',
            label: county.name,
            data: sliceToTimePick(data[county.name])
          })
        }

        return {
          labels: sliceToTimePick(labels),
          datasets: dataSets
        }
      } else {
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
  },
  methods: {
    handleTimePick(timePickerSelected) {
      this.timePickerSelected = timePickerSelected
    }
  }
}
</script>

<style lang="scss" scoped>
.dropdown-container {
  margin-top: 10px;
}
</style>
