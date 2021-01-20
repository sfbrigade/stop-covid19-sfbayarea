<template>
  <data-view
    :title="title"
    :title-id="titleId"
    :date="date.split('T')[0]"
    :url="url"
  >
    <template v-slot:button>
      <TimePickerDropdown
        class="dropdown-container"
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
import DataViewBasicInfoPanel from '@/components/DataViewBasicInfoPanel.vue'
import TimePickerDropdown from '@/components/TimePickerDropdown'

export default {
  components: { DataView, DataViewBasicInfoPanel, TimePickerDropdown },
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
      default: 'time-line-chart'
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
    return { timePickerSelected: '30' }
  },
  computed: {
    displayInfo() {
      return {
        lText: ``,
        sText: ``,
        unit: this.unit
      }
    },
    displayData() {
      const data = this.chartData.slice(-Number(this.timePickerSelected) || 0)
      return {
        labels: data.map(d => {
          return d.label
        }),
        datasets: [
          {
            type: 'line',
            pointBackgroundColor: 'rgba(0,0,0,0)',
            pointBorderColor: 'rgba(0,0,0,0)',
            lineTension: 0.5,
            borderJoinStyle: 'round',
            label: 'COVID ICU patients',
            data: data.map(d => {
              return d.icuConfirmed
            }),
            backgroundColor: '#453D88'
          },
          {
            type: 'line',
            pointBackgroundColor: 'rgba(0,0,0,0)',
            pointBorderColor: 'rgba(0,0,0,0)',
            lineTension: 0.5,
            borderJoinStyle: 'round',
            label: 'ICU Beds Available',
            data: data.map(d => {
              return d.icuAvailable
            }),
            backgroundColor: '#AFACCA'
          }
        ]
      }
    },
    displayOption() {
      return {
        tooltips: {
          displayColors: false,
          intersect: false,
          callbacks: {
            label(tooltipItem, data) {
              const icuConfirmed = data.datasets[0].data[tooltipItem.index]
              const icuBedAvailable = data.datasets[1].data[tooltipItem.index]
              return [
                'COVID ICU Patients: ' + icuConfirmed,
                'ICU Bed Available: ' + icuBedAvailable
              ]
            },
            title(tooltipItem, data) {
              return data.labels[tooltipItem[0].index]
            }
          }
        },
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
              stacked: true,
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
.selectorButton {
  margin-top: 24px;
}
</style>
