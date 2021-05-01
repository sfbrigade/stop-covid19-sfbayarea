<template>
  <data-view :title="title" :title-id="titleId" :date="date" :url="url">
    <template v-slot:button>
      <data-selector v-model="dataKind" class="selectorButton" />
      <TimePickerDropdown
        :time-picker-model="timePickerSelected"
        @timePickerSelected="handleTimePick"
      />
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
import TimePickerDropdown from '@/components/TimePickerDropdown'

export default {
  components: {
    DataView,
    DataSelector,
    DataViewBasicInfoPanel,
    TimePickerDropdown
  },
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
    },
    projectionStart: {
      type: String,
      required: false,
      default: '1/1/3000'
    }
  },
  data() {
    /**
     * ChartDataClone is a clone of chartData and is used by the time picker dropdown
     * to modify the data by the selected time range (i.e. 7, 14, 30, 60, 90 days)
     */
    const chartDataClone = [...this.chartData]
    const timePickerSelected = '30'
    return {
      dataKind: 'confirmedTransition',
      chartDataClone,
      timePickerSelected
    }
  },
  computed: {
    displayCumulativeRatio() {
      if (this.chartDataType === 'cases') {
        const lastDay = this.chartDataClone.slice(-1)[0].cumulative
        const lastDayBefore = this.chartDataClone.slice(-2)[0].cumulative
        return this.formatDayBeforeRatio(lastDay - lastDayBefore)
      } else if (this.chartDataType === 'deaths') {
        const lastDay = this.chartDataClone.slice(-1)[0].deathCumulative
        const lastDayBefore = this.chartDataClone.slice(-2)[0].deathCumulative
        return this.formatDayBeforeRatio(lastDay - lastDayBefore)
      } else {
        return ''
      }
    },
    displayTransitionRatio() {
      if (this.chartDataType === 'cases') {
        const lastDay = this.chartDataClone.slice(-1)[0].confirmedTransition
        const lastDayBefore = this.chartDataClone.slice(-2)[0]
          .confirmedTransition
        return this.formatDayBeforeRatio(lastDay - lastDayBefore)
      } else if (this.chartDataType === 'deaths') {
        const lastDay = this.chartDataClone.slice(-1)[0].deathTransition
        const lastDayBefore = this.chartDataClone.slice(-2)[0].deathTransition
        return this.formatDayBeforeRatio(lastDay - lastDayBefore)
      } else {
        return ''
      }
    },
    displayInfo() {
      let numText = ''
      if (this.dataKind === 'confirmedTransition') {
        if (this.chartDataType === 'cases') {
          numText = this.chartDataClone
            .slice(-1)[0]
            .confirmedTransition.toLocaleString()
        } else if (this.chartDataType === 'deaths') {
          numText = `${this.chartDataClone
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
        numText = this.chartDataClone[
          this.chartDataClone.length - 1
        ].cumulative.toLocaleString()
      } else if (this.chartDataType === 'deaths') {
        numText = this.chartDataClone[
          this.chartDataClone.length - 1
        ].deathCumulative.toLocaleString()
      }
      return {
        lText: numText,
        sText: `${this.chartDataClone.slice(-1)[0].label}: ${
          this.displayCumulativeRatio
        } ${this.unit} up from the day before`,
        unit: this.unit
      }
    },
    displayData() {
      this.updateChartDataByTimePick()
      const colors = this.chartDataClone.map(({ label }) =>
        new Date(label) > new Date(this.projectionStart) ? '#7d70bb' : '#473A8C'
      )
      if (this.dataKind === 'confirmedTransition') {
        return {
          labels: this.chartDataClone.map(d => {
            return d.label
          }),
          datasets: [
            {
              data: this.chartDataClone.map(d => {
                if (this.chartDataType === 'cases') {
                  return d.confirmedTransition
                } else if (this.chartDataType === 'deaths') {
                  return d.deathTransition
                }
              }),
              backgroundColor: colors
            }
          ]
        }
      }
      return {
        labels: this.chartDataClone.map(d => {
          return d.label
        }),
        datasets: [
          {
            data: this.chartDataClone.map(d => {
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
              return data.labels[tooltipItem[0].index]
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
    },
    handleTimePick(timePickerSelected) {
      this.timePickerSelected = timePickerSelected
      this.updateChartDataByTimePick()
    },
    /**
     * This method updates the chartDataClone by limiting the number of data entries by
     * the dropdown selected time range. All the charts rely on the chartDataClone to
     * display data.
     */
    updateChartDataByTimePick() {
      if (this.timePickerSelected === 'all') {
        this.chartDataClone = [...this.chartData]
      } else {
        this.chartDataClone = this.chartData.slice(
          -Number(this.timePickerSelected)
        )
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
