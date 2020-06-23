<template>
  <data-view :title="title" :title-id="titleId" :date="date" :url="url">
    <template v-slot:button>
      <data-selector v-model="dataKind" class="selectorButton" />
    </template>
    <bar
      :chart-id="chartId"
      :chart-data="displayData"
      :options="displayOption"
      :height="240"
    />
    <template v-slot:infoPanel>
      <data-view-basic-info-panel
        :l-text="displayInfo.lText.toLocaleString()"
        :s-text="displayInfo.sText.toLocaleString()"
        :unit="displayInfo.unit"
      />
    </template>
  </data-view>
</template>

<script>
import DataView from '@/components/DataView.vue'
import DataSelector from '@/components/DataSelector.vue'
import DataViewBasicInfoPanel from '@/components/DataViewBasicInfoPanel.vue'

export default {
  components: { DataView, DataSelector, DataViewBasicInfoPanel },
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
      default: 'time-bar-chart'
    },
    chartData: {
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
    return {
      dataKind: 'confirmedTransition'
    }
  },
  computed: {
    displayCumulativeRatio() {
      if (this.chartDataType === 'cases') {
        const lastDay = this.chartData.slice(-1)[0].cumulative
        const lastDayBefore = this.chartData.slice(-2)[0].cumulative
        return this.formatDayBeforeRatio(lastDay - lastDayBefore)
      } else if (this.chartDataType === 'deaths') {
        const lastDay = this.chartData.slice(-1)[0].deathCumulative
        const lastDayBefore = this.chartData.slice(-2)[0].deathCumulative
        return this.formatDayBeforeRatio(lastDay - lastDayBefore)
      } else {
        return ''
      }
    },
    displayTransitionRatio() {
      if (this.chartDataType === 'cases') {
        const lastDay = this.chartData.slice(-1)[0].confirmedTransition
        const lastDayBefore = this.chartData.slice(-2)[0].confirmedTransition
        return this.formatDayBeforeRatio(lastDay - lastDayBefore)
      } else if (this.chartDataType === 'deaths') {
        const lastDay = this.chartData.slice(-1)[0].deathTransition
        const lastDayBefore = this.chartData.slice(-2)[0].deathTransition
        return this.formatDayBeforeRatio(lastDay - lastDayBefore)
      } else {
        return ''
      }
    },
    displayInfo() {
      let numText = ''
      if (this.dataKind === 'confirmedTransition') {
        if (this.chartDataType === 'cases') {
          numText = this.chartData
            .slice(-1)[0]
            .confirmedTransition.toLocaleString()
        } else if (this.chartDataType === 'deaths') {
          numText = `${this.chartData
            .slice(-1)[0]
            .deathTransition.toLocaleString()}`
        }
        return {
          lText: numText,
          sText: `${this.displayTransitionRatio} ${this.unit} from the day before`,
          unit: this.unit
        }
      }
      if (this.chartDataType === 'cases') {
        numText = this.chartData[
          this.chartData.length - 1
        ].cumulative.toLocaleString()
      } else if (this.chartDataType === 'deaths') {
        numText = this.chartData[
          this.chartData.length - 1
        ].deathCumulative.toLocaleString()
      }
      return {
        lText: numText,
        sText: `${this.chartData.slice(-1)[0].label}: ${
          this.displayCumulativeRatio
        } ${this.unit} up from the day before`,
        unit: this.unit
      }
    },
    displayData() {
      if (this.dataKind === 'confirmedTransition') {
        return {
          labels: this.chartData.map(d => {
            return d.label
          }),
          datasets: [
            {
              data: this.chartData.map(d => {
                if (this.chartDataType === 'cases') {
                  return d.confirmedTransition
                } else if (this.chartDataType === 'deaths') {
                  return d.deathTransition
                }
              }),
              backgroundColor: '#473A8C'
            }
          ]
        }
      }
      return {
        labels: this.chartData.map(d => {
          return d.label
        }),
        datasets: [
          {
            data: this.chartData.map(d => {
              if (this.chartDataType === 'cases') {
                return d.cumulative
              } else if (this.chartDataType === 'deaths') {
                return d.deathCumulative
              } else {
                return null
              }
            }),
            backgroundColor: '#473A8C',
            borderWidth: 0
          }
        ]
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
                parseInt(tooltipItem.value).toLocaleString() + unit
              return labelText
            },
            title(tooltipItem, data) {
              return data.labels[tooltipItem[0].index].replace(
                /(\w+)\/(\w+)/,
                '$1 $2 '
              )
            }
          }
        },
        barValueSpacing: 20,
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          display: false
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
    formatDayBeforeRatio(dayBeforeRatio) {
      const dayBeforeRatioLocaleString = dayBeforeRatio.toLocaleString()
      switch (Math.sign(dayBeforeRatio)) {
        case 1:
          return `+${dayBeforeRatioLocaleString}`
        case -1:
          return `${dayBeforeRatioLocaleString}`
        default:
          return `${dayBeforeRatioLocaleString}`
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
