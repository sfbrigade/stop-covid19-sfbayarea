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
      :plugins="[drawTiers]"
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
    },
    overlays: {
      type: Object,
      required: false,
      default: () => Object()
    }
  },
  data() {
    const caseData = {}
    const percentData = {}
    if (!('Bay Area Average' in this.chartData)) {
      this.chartData['Bay Area Average'] = this.getBayAreaTotals()
    }
    for (const county in this.chartData) {
      const confirmedDailyIn14daysQueue = []
      caseData[county] = this.chartData[county].graph.map(d => {
        // calculate new cases per 100,000 residents (14 day average)
        confirmedDailyIn14daysQueue.push(d.confirmedTransition)
        if (confirmedDailyIn14daysQueue.length > 14) {
          confirmedDailyIn14daysQueue.shift()
        }
        const laggingQueue = confirmedDailyIn14daysQueue.slice(0, 7)
        const dailyCasesLaggingAverage =
          laggingQueue.reduce((pre, curr) => {
            return pre + curr
          }, 0) / laggingQueue.length
        return (
          dailyCasesLaggingAverage /
          (this.chartData[county].population / 100000)
        )
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
    drawTiers() {
      return {
        beforeDraw: chart => {
          if (!this.displayData.displayTiers) return
          const [YELLOW, ORANGE, RED, PURPLE] = [
            '#fcfaae',
            '#fdddae',
            '#fc7e7e',
            '#ccaefd'
          ]
          const TIER_BREAKPOINTS = [
            [YELLOW, 0],
            [ORANGE, 1],
            [RED, 4],
            [PURPLE, 7]
          ]

          const maxTick = chart.scales['y-axis-0'].ticksAsNumbers[0]

          const gradientConfig = TIER_BREAKPOINTS.map(([color, breakpoint]) => [
            color,
            breakpoint / maxTick
          ]).filter(([, breakpoint]) => breakpoint <= 1)
          const ctx = chart.chart.ctx
          const chartArea = chart.chartArea

          const gradient = gradientConfig
            ? ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top)
            : '#fff'
          if (gradientConfig)
            gradientConfig.forEach(([color, breakpoint], index) => {
              const [, nextBreakpoint] = gradientConfig[index + 1] || [null, 1]
              gradient.addColorStop(breakpoint, color)
              gradient.addColorStop(nextBreakpoint, color)
            })

          ctx.save()
          ctx.fillStyle = gradient
          ctx.fillRect(
            chartArea.left,
            chartArea.top,
            chartArea.right - chartArea.left,
            chartArea.bottom - chartArea.top
          )
          ctx.restore()
        }
      }
    },
    displayData() {
      const bayAreaAverage = { color: '#2d2d2d', name: 'Bay Area Average' }
      const countiesToDisplay = [
        ...this.selectedCounties,
        ...(this.overlays.average.selected ? [bayAreaAverage] : [])
      ]
      const displayTiers = this.overlays.tiers?.selected
      if (countiesToDisplay.length) {
        const dataSets = []
        const data =
          this.chartDataType === 'casesperpeople'
            ? this.caseData
            : this.percentData
        const labels = this.chartData[countiesToDisplay[0].name].graph.map(
          d => {
            return d.label
          }
        )
        const sliceToTimePick = arr =>
          arr.slice(-Number(this.timePickerSelected) || 0)

        for (const county of countiesToDisplay) {
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
          datasets: dataSets,
          displayTiers
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
    },
    getBayAreaTotals() {
      const dateSort = (a, b) => {
        const dateRegex = /(\d+)\/(\d+)\/(\d+)/
        const [, monthA, dayA, yearA] = a.label.match(dateRegex)
        const [, monthB, dayB, yearB] = b.label.match(dateRegex)
        return +yearA > +yearB
          ? 1
          : +yearB > +yearA
          ? -1
          : +monthA > +monthB
          ? 1
          : +monthB > +monthA
          ? -1
          : +dayA > +dayB
          ? 1
          : -1
      }
      const chartDataArray = Object.values(this.chartData).filter(
        county => county.name !== 'San Mateo'
      )
      const bayAreaTotal = {
        name: 'Bay Area Average',
        population: 0,
        graph: []
      }
      chartDataArray.forEach(county => {
        bayAreaTotal.population += county.population
        county.graph.forEach(data => {
          const dataDefaults = {
            label: data.label,
            confirmedTransition: 0,
            cumulative: 0,
            deathTransition: 0,
            deathCumulative: 0
          }
          const graph = bayAreaTotal.graph
          const currentTotals =
            graph.find(totals => totals.label === data.label) ||
            (graph[graph.length] = dataDefaults)
          for (const key in data) {
            if (key !== 'label') currentTotals[key] += data[key]
          }
        })
      })
      bayAreaTotal.graph.sort(dateSort)
      let lastValidIndex = bayAreaTotal.graph.length - 1
      const hasLastValidIndexLabel = ({ graph }) =>
        graph.find(
          data => data.label === bayAreaTotal.graph[lastValidIndex].label
        )
      while (!chartDataArray.every(hasLastValidIndexLabel)) lastValidIndex--
      bayAreaTotal.graph.splice(lastValidIndex + 1)
      return bayAreaTotal
    }
  }
}
</script>

<style lang="scss" scoped>
.dropdown-container {
  margin-top: 10px;
}
</style>
