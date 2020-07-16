/* eslint-disable prettier/prettier */
/* eslint-disable camelcase */
export enum ChartTypes {
  AGE = 'CHART-AGE',
  GENDER = 'CHART-GENDER'
}

const PURPLE_MAIN = '#473A8C'

type AgeDataset = {
  backgroundColor: string
  data: Array<number>
}

type AgeGroup = {
  chartType: string
  datasets: AgeDataset
  displayLegend: boolean
  labels: Array<string>
  customChartOptions?: CustomChartOptions
}

type AgeData = {
  group: string
  raw_count: number
}

type CallBacks = {
  label: Function
  title: Function
}

type CaseTotals = {
  age_group: Array<AgeData>
  gender: GenderData
  race_eth: RaceEthnicityData
}

type CountiesData = {
  [county: string]: CountyData
}

type CountyData = {
  case_totals: CaseTotals
  name: string
  source_url: string
  update_time: string
}

type CustomChartOptions = {
  plugins: Object
  callbacks: CallBacks
}

type FormattedCountiesData = {
  [county: string]: FormattedCountyData
}

type FormattedCountyData = {
  ageGroup?: AgeGroup
  genderGroup?: GenderGroup
  lastUpdatedAt?: string
  name?: string
  sourceUrl?: string
}

type GenderData = {
  [type: string]: number
}

type GenderDataset = {
  backgroundColor: string
  data: Array<number>
}

type GenderGroup = {
  chartType: string
  datasets: GenderDataset
  displayLegend: boolean
  labels: Array<string>
  totalCount: number
  customChartOptions?: CustomChartOptions
}

type RaceEthnicityData = {
  African_Amer: number
  Asian: number
  Latinx_or_Hispanic: number
  Multiple_Race: number
  Native_Amer: number
  Other: number
  Pacific_Islander: number
  Unknown: number
  White: number
}

const buildAgeChartData = (
  defaultAgeGroup: AgeGroup,
  ageGroups: Array<AgeData>
) => {
  const formatAgeDataLabels = () => {
    return ageGroups.map((group) => {
      let name = group.group.replace('_to_', '-')
      if (name.match(/_and_under/)) {
        name = `0-${name.replace('_and_under', '')}`
      }
      if (name.match(/_and_older/)) {
        name = `${name.replace('_and_older', '')}+`
      }
      return name
    })
  }

  const updatedAgeGroup: AgeGroup = { ...defaultAgeGroup }

  updatedAgeGroup.chartType = ChartTypes.AGE
  updatedAgeGroup.displayLegend = false
  updatedAgeGroup.labels = formatAgeDataLabels()
  updatedAgeGroup.datasets = {
    backgroundColor: PURPLE_MAIN,
    data: ageGroups.map((group) => group.raw_count)
  }

  return updatedAgeGroup
}

const buildGenderChartData = (
  defaultGenderGroup: GenderGroup,
  genders: GenderData
) => {
  const updatedGenderGroup: GenderGroup = { ...defaultGenderGroup }
  const genderLabels: string[] = []
  for (const gender in genders) {
    if (genders[gender] >= 0) genderLabels.push(gender)
  }
  const genderTotalCount = getGenderTotalCount(genders)

  const getGenderCountData = () => {
    return genderLabels.map((gender) => {
      return genders[gender]
    })
  }

  updatedGenderGroup.chartType = ChartTypes.GENDER
  updatedGenderGroup.displayLegend = false
  updatedGenderGroup.totalCount = genderTotalCount
  updatedGenderGroup.labels = genderLabels
  updatedGenderGroup.datasets = {
      backgroundColor: PURPLE_MAIN,
      data: getGenderCountData()
  }
  updatedGenderGroup.customChartOptions!.plugins = {
    datalabels: {
      color: '#FFFFFF',
      anchor: 'end',
      align: 'left',
      font: {
        size: 36
      },
      formatter(value: any, context: any) {
        const totalCount = context.dataset.data.reduce(
          (acc: number, curr: number) => acc + curr
        )
        const percentValue = getPercentageData(value, totalCount)

        return percentValue < 5 ? percentValue : `${percentValue}%`
      }
    }
  }

  return updatedGenderGroup
}

const clone = (value: any) => {
  return JSON.parse(JSON.stringify(value))
}

export const getCountyShortName = (countyName: string): string => {
  return countyName
    .replace(' County', '')
    .replace(' ', '_')
    .toLocaleLowerCase()
}

const getDefaultFormattedData = () => {
  return {
    ageGroup: {
      chartType: ChartTypes.AGE,
      datasets: {},
      displayLegend: false,
      labels: [],
      customChartOptions: {
        plugins: {},
        callbacks: {
          label(tooltipItem: any) {
            if (!tooltipItem) return
            return 'cases'
          },
          title(tooltipItem: any) {
            return tooltipItem[0].value
          }
        }
      }
    },
    genderGroup: {
      chartType: ChartTypes.GENDER,
      datasets: {},
      displayLegend: false,
      labels: [],
      totalCount: 0,
      customChartOptions: {
        plugins: {},
        callbacks: {
          label(tooltipItem: any) {
            if (!tooltipItem) return
            return 'cases'
          },
          title(tooltipItem: any) {
            return tooltipItem[0].value
          }
        }
      }
    }
  }
}

const getGenderTotalCount = (genders: GenderData): number => {
  let total = 0
  const genderTypes = Object.keys(genders)
  for (const gender of genderTypes) {
    const count = genders[gender]
    if (count >= 0) total += count
  }
  return total
}

const getPercentageData = (target: number, total: number) => {
  return Math.round((target / total) * 100)
}

// USE DEFAULTCALLBACKS FOR ADDING NEW HORIZONTAL CHARTS DATA
// const defaultCallbacks = {
//   label(tooltipItem: any) {
//     return tooltipItem
//   },
//   title(tooltipItem: any) {
//     return tooltipItem
//   }
// }

const getUpdatedCountyData = (
  county: CountyData,
  defaultFormattedData: FormattedCountyData
) => {
  const updatedData: any = {}
  if (county) {
    const {
      case_totals: { age_group, gender },
      update_time,
      source_url
    } = county

    if (update_time) {
      updatedData.lastUpdatedAt = parseDateForYrMoDay(update_time)
    }
    if (source_url) {
      updatedData.sourceUrl = source_url
    }
    if (age_group) {
      updatedData.ageGroup = buildAgeChartData(
        defaultFormattedData.ageGroup!,
        age_group
      )
    }
    if (gender) {
      updatedData.genderGroup = buildGenderChartData(
        defaultFormattedData.genderGroup!,
        gender
      )
    }
  }
  return updatedData
}

const parseDateForYrMoDay = (date: string): string => {
  return date.split('T')[0]
}

export default (
  data: CountiesData,
  allCounties: Array<string>
): FormattedCountyData => {
  const finalData: FormattedCountiesData = {}

  for (const countyName of allCounties) {
    const defaultFormattedData = clone(getDefaultFormattedData())
    finalData[countyName] = defaultFormattedData
    finalData[countyName].name = countyName
    finalData[countyName].lastUpdatedAt = parseDateForYrMoDay(
      new Date().toISOString()
    )

    const countyNameIndex = getCountyShortName(countyName)
    const county = data[countyNameIndex]

    const updatedData = getUpdatedCountyData(county, finalData[countyName])

    finalData[countyName] = Object.assign(
      {},
      finalData[countyName],
      updatedData
    )
  }

  return finalData
}
