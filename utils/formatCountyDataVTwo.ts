/* eslint-disable prettier/prettier */
/* eslint-disable camelcase */
export enum ChartTypes {
  AGE = 'CHART-AGE',
  GENDER = 'CHART-GENDER',
  RACE_ETH = 'CHART-RACE-ETH',
  RACE_ETH_NORM = 'CHART-RACE-ETH-NORM'
}

const PURPLE_MAIN = '#473A8C'
const GRAY_SECONDARY = '#C8C8C8'
const RACE_ETH_NORMALIZE_NUMBER = 10000
const TO_FIX_POSITION = 3

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
  race_eth: RaceEthData
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
  raceEthGroup?: RaceEthGroup
  raceEthNormGroup?: RaceEthGroup
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

type RaceEthData = {
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

type RaceEthDataset = {
  backgroundColor: string | Array<string>
  data: Array<number>
}

type RaceEthGroup = {
  chartType: string
  datasets: RaceEthDataset
  displayLegend: boolean
  labels: Array<string>
  total?: number
  customChartOptions?: CustomChartOptions
}

const buildAgeChartData = (
  defaultAgeGroup: AgeGroup,
  ageGroups: Array<AgeData>
) => {
  const updatedAgeGroup: AgeGroup = { ...defaultAgeGroup }

  updatedAgeGroup.chartType = ChartTypes.AGE
  updatedAgeGroup.displayLegend = false
  updatedAgeGroup.labels = formatAgeDataLabels(ageGroups)
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
  const genderEntries = Object.entries(genders)

  // Sort by gender count in descending order
  genderEntries.sort((a: [string, number], b: [string, number]) => {
    return b[1] - a[1]
  })

  updatedGenderGroup.labels = getGenderEntryType(
    'label',
    genderEntries
  ) as string[]
  updatedGenderGroup.datasets = {
    backgroundColor: PURPLE_MAIN,
    data: getGenderEntryType('count', genderEntries) as number[]
  }

  console.log('updatedGenderGroup.datasets', updatedGenderGroup.datasets)
  updatedGenderGroup.customChartOptions!.plugins = {
    datalabels: {
      color: '#FFFFFF',
      anchor: 'end',
      align: 'left',
      font: {
        size: 36
      },
      formatter(value: any, context: any) {
        const totalCount = getSumOfArray(context.dataset.data)
        const percentValue = getPercentageData(value, totalCount)

        return percentValue < 5 ? percentValue : `${percentValue}%`
      }
    }
  }

  return updatedGenderGroup
}

const buildRaceEthUpdatedDataInit = (
  defaultRaceEthGroup: RaceEthGroup,
  raceEths: RaceEthData
) => {
  const updatedRaceEthGroup: RaceEthGroup = { ...defaultRaceEthGroup }
  const sortedraceEths = sortLabelsAndValuesByValue(raceEths)
  const labels = sortedraceEths.map((race) => race[0])
  const raceEthLabels = formatRaceEthLabels(labels)
  const raceEthValues = sortedraceEths.map((race: any) => race[1])
  updatedRaceEthGroup.labels = raceEthLabels
  updatedRaceEthGroup.total = getSumOfArray(raceEthValues)
  updatedRaceEthGroup.datasets = {
    backgroundColor: getCustomChartBarColor(
      PURPLE_MAIN,
      GRAY_SECONDARY,
      raceEthLabels,
      'Unknown'
    ),
    data: raceEthValues
  }
  return updatedRaceEthGroup
}

const buildRaceEthChartData = (
  defaultRaceEthGroup: RaceEthGroup,
  raceEths: RaceEthData
) => {
  const updatedRaceEthGroup: RaceEthGroup = buildRaceEthUpdatedDataInit(
    defaultRaceEthGroup,
    raceEths
  )
  updatedRaceEthGroup.customChartOptions!.plugins = {
    datalabels: {
      color: '#000000',
      anchor: 'end',
      align: 'right',
      font: {
        size: 14
      },
      formatter(value: any, context: any) {
        const totalCount = getSumOfArray(context.dataset.data)
        const percentValue = getPercentageData(value, totalCount)

        return percentValue < 1 ? percentValue : `${percentValue}%`
      }
    }
  }

  return updatedRaceEthGroup
}

const buildRaceEthNormalizedChartData = (
  defaultRaceEthGroup: RaceEthGroup,
  raceEths: RaceEthData
) => {
  const updatedRaceEthGroup: RaceEthGroup = buildRaceEthUpdatedDataInit(
    defaultRaceEthGroup,
    raceEths
  )
  updatedRaceEthGroup.customChartOptions!.plugins = {
    datalabels: {
      color: '#000000',
      anchor: 'end',
      align: 'right',
      font: {
        size: 14
      },
      formatter(value: any) {
        return normalizeDataBy(
          RACE_ETH_NORMALIZE_NUMBER,
          value,
          TO_FIX_POSITION
        )
      }
    }
  }

  return updatedRaceEthGroup
}

const formatAgeDataLabels = (ageGroups: Array<AgeData>) => {
  return ageGroups.map((group: AgeData) => {
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

const formatRaceEthLabels = (raceEthGroups: Array<string>) => {
  return raceEthGroups.map((group) => {
    return group
      .replace('_or_', '/')
      .replace('_', ' ')
      .replace('Amer', 'American')
  })
}

export const getCountyShortName = (countyName: string): string => {
  console.log('countyName', countyName)
  return countyName
    .replace(' County', '')
    .replace(' ', '_')
    .toLocaleLowerCase()
}

const getCustomChartBarColor = (
  normalColor: string,
  customColor: string,
  dataset: Array<string>,
  filter: string
): Array<string> => {
  const finalColors: Array<string> = []
  dataset.forEach((item) => {
    let color = normalColor
    if (item === filter) color = customColor
    finalColors.push(color)
  })
  return finalColors
}

const getDefaultFormattedData = () => {
  return {
    ageGroup: {
      chartType: ChartTypes.AGE,
      datasets: {},
      displayLegend: false,
      labels: [],
      customChartOptions: {
        plugins: {}
      }
    },
    genderGroup: {
      chartType: ChartTypes.GENDER,
      datasets: {},
      displayLegend: false,
      labels: [],
      customChartOptions: {
        plugins: {}
      }
    },
    raceEthGroup: {
      chartType: ChartTypes.RACE_ETH,
      datasets: [],
      displayLegend: false,
      labels: [],
      customChartOptions: {
        plugins: {}
      }
    },
    raceEthNormGroup: {
      chartType: ChartTypes.RACE_ETH_NORM,
      datasets: [],
      displayLegend: false,
      labels: [],
      customChartOptions: {
        plugins: {}
      }
    }
  }
}

const getGenderEntryType = (type: string, entries: [string, number][]) => {
  return entries.map((entry: [string, number]) => {
    const [label, count] = entry
    return type === 'label' ? label : count
  })
}

const getPercentageData = (target: number, total: number) => {
  return Math.round((target / total) * 100)
}

const getSumOfArray = (dataset: Array<number>): number => {
  return dataset.reduce((acc: number, curr: number) => acc + curr)
}

const getUpdatedCountyData = (
  county: CountyData,
  defaultFormattedData: FormattedCountyData
) => {
  const updatedData: any = {}
  if (county) {
    const {
      case_totals: { age_group, gender, race_eth },
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
    if (race_eth) {
      updatedData.raceEthGroup = buildRaceEthChartData(
        defaultFormattedData.raceEthGroup!,
        race_eth
      )
      updatedData.raceEthNormGroup = buildRaceEthNormalizedChartData(
        defaultFormattedData.raceEthNormGroup!,
        race_eth
      )
    }
  }
  return updatedData
}

const normalizeDataBy = (
  populationNumber: number,
  value: number,
  toFixedNum?: number
): number => {
  const normNum = value / populationNumber
  return toFixedNum ? parseFloat(normNum.toFixed(toFixedNum)) : normNum
}

const parseDateForYrMoDay = (date: string): string => {
  return date.split('T')[0]
}

const sortLabelsAndValuesByValue = (data: any) => {
  const sortByValue = (a: any, b: any) => {
    if (a[1] < b[1]) return 1
    if (a[1] > b[1]) return -1
    return 0
  }
  return Object.entries(data).sort(sortByValue)
}

export default (
  data: CountiesData,
  allCounties: Array<string>
): FormattedCountyData => {
  const finalData: FormattedCountiesData = {}

  for (const countyName of allCounties) {
    const defaultFormattedData: any = getDefaultFormattedData()
    finalData[countyName] = defaultFormattedData
    finalData[countyName].name = countyName
    finalData[countyName].lastUpdatedAt = parseDateForYrMoDay(
      new Date().toISOString()
    )

    const countyNameIndex = getCountyShortName(countyName)
    const county = data[countyNameIndex]

    const updatedData = getUpdatedCountyData(county, finalData[countyName])

    finalData[countyName] = Object.assign(finalData[countyName], updatedData)
  }

  return finalData
}
