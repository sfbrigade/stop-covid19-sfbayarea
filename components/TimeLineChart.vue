<template>
  <data-view
    :title="title"
    :title-id="titleId"
    :date="date.split('T')[0]"
    :url="url"
    :chart-info="chartInfo"
  >
    <template v-slot:button>
      <v-btn
        v-for="dataset in datasets"
        :key="dataset.id"
        outlined
        class="data-selector-button"
        :style="{
          'background-color': dataset.active
            ? dataset.backgroundColor
            : 'white',
          color: dataset.active ? 'white' : 'black'
        }"
        small
        type="button"
        @click="toggleActive(dataset)"
      >
        {{ dataset.label }}
      </v-btn>
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
    const datasets = [
      {
        label: 'COVID ICU Patients',
        backgroundColor: '#453D88',
        active: true,
        id: 'icuConfirmed'
      },
      {
        label: 'ICU Beds Available',
        backgroundColor: '#AFACCA',
        active: false,
        id: 'icuAvailable'
      }
    ]
    return { timePickerSelected: '30', datasets }
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
        datasets: this.datasets
          .filter(d => d.active)
          .map(dataset => {
            const displayOptions = {
              type: 'line',
              pointBackgroundColor: 'rgba(0,0,0,0)',
              pointBorderColor: 'rgba(0,0,0,0)',
              lineTension: 0.5,
              borderJoinStyle: 'round',
              data: data.map(d => d[dataset.id])
            }
            return Object.assign({}, dataset, displayOptions)
          })
      }
    },
    displayOption() {
      return {
        tooltips: {
          displayColors: false,
          intersect: false,
          callbacks: {
            label(tooltipItem, data) {
              return data.datasets.map(
                d => `${d.label}: ${d.data[tooltipItem.index]}`
              )
            },
            title(tooltipItem, data) {
              return data.labels[tooltipItem[0].index]
            }
          }
        },
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
    },
    toggleActive(dataset) {
      dataset.active = !dataset.active
    }
  }
}
</script>

<style lang="scss" scoped>
.data-selector-button {
  margin: 0.2rem;
}
</style>
