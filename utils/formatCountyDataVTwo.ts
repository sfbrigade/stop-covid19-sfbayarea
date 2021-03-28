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
// 2018 CONSENSUS
const RACE_ETH_POP_PERCENTAGE: any = {
  ALAMEDA: {
    TOTAL: 1643700,
    RACE: {
      WHITE: 0.415,
      AFRICAN_AMER: 0.108,
      NATIVE_AMER: 0.007,
      ASIAN: 0.296,
      PACIFIC_ISLANDER: 0.008,
      OTHER: 0.103,
      MULTIPLE_RACE: 0.063,
      LATINX_OR_HISPANIC: 0.225
    }
  },
  CONTRA_COSTA: {
    TOTAL: 1133247,
    RACE: {
      WHITE: 0.572,
      AFRICAN_AMER: 0.086,
      NATIVE_AMER: 0.005,
      ASIAN: 0.163,
      PACIFIC_ISLANDER: 0.005,
      OTHER: 0.1,
      MULTIPLE_RACE: 0.069,
      LATINX_OR_HISPANIC: 0.254
    }
  },
  MARIN: {
    TOTAL: 260295,
    RACE: {
      WHITE: 0.781,
      AFRICAN_AMER: 0.022,
      NATIVE_AMER: 0.003,
      ASIAN: 0.058,
      PACIFIC_ISLANDER: 0.002,
      OTHER: 0.086,
      MULTIPLE_RACE: 0.049,
      LATINX_OR_HISPANIC: 0.159
    }
  },
  NAPA: {
    TOTAL: 118544,
    RACE: {
      WHITE: 0.716,
      AFRICAN_AMER: 0.02,
      NATIVE_AMER: 0.009,
      ASIAN: 0.087,
      PACIFIC_ISLANDER: 0.002,
      OTHER: 0.125,
      MULTIPLE_RACE: 0.041,
      LATINX_OR_HISPANIC: 0.339
    }
  },
  SAN_FRANCISCO: {
    TOTAL: 870044,
    RACE: {
      WHITE: 0.467,
      AFRICAN_AMER: 0.052,
      NATIVE_AMER: 0.003,
      ASIAN: 0.342,
      PACIFIC_ISLANDER: 0.003,
      OTHER: 0.077,
      MULTIPLE_RACE: 0.054,
      LATINX_OR_HISPANIC: 0.152
    }
  },
  SAN_MATEO: {
    TOTAL: 411873,
    RACE: {
      WHITE: 0.585,
      AFRICAN_AMER: 0.026,
      NATIVE_AMER: 0.005,
      ASIAN: 0.197,
      PACIFIC_ISLANDER: 0.016,
      OTHER: 0.116,
      MULTIPLE_RACE: 0.054,
      LATINX_OR_HISPANIC: 0.247
    }
  },
  SANTA_CLARA: {
    TOTAL: 1922200,
    RACE: {
      WHITE: 0.45,
      AFRICAN_AMER: 0.025,
      NATIVE_AMER: 0.005,
      ASIAN: 0.359,
      PACIFIC_ISLANDER: 0.004,
      OTHER: 0.107,
      MULTIPLE_RACE: 0.05,
      LATINX_OR_HISPANIC: 0.258
    }
  },
  SOLANO: {
    TOTAL: 438530,
    RACE: {
      WHITE: 0.527,
      AFRICAN_AMER: 0.141,
      NATIVE_AMER: 0.005,
      ASIAN: 0.155,
      PACIFIC_ISLANDER: 0.009,
      OTHER: 0.091,
      MULTIPLE_RACE: 0.072,
      LATINX_OR_HISPANIC: 0.261
    }
  },
  SONOMA: {
    TOTAL: 501317,
    RACE: {
      WHITE: 0.749,
      AFRICAN_AMER: 0.016,
      NATIVE_AMER: 0.01,
      ASIAN: 0.04,
      PACIFIC_ISLANDER: 0.003,
      OTHER: 0.127,
      MULTIPLE_RACE: 0.056,
      LATINX_OR_HISPANIC: 0.265
    }
  }
}

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

  sortAgeData(ageGroups);

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
  raceEths: RaceEthData,
  county: string
) => {
  const updatedRaceEthGroup: RaceEthGroup = buildRaceEthUpdatedDataInit(
    defaultRaceEthGroup,
    raceEths
  )
  const { datasets, labels } = updatedRaceEthGroup
  updatedRaceEthGroup.datasets.data = updateRaceEthNormalizedChartData(
    datasets.data,
    labels,
    county
  )

  sortNormalizedChartData(updatedRaceEthGroup)

  updatedRaceEthGroup.customChartOptions!.plugins = {
    datalabels: {
      color: '#000000',
      anchor: 'end',
      align: 'right',
      font: {
        size: 14
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


const sortAgeData = (ageGroups: Array<AgeData>) => {
  ageGroups.sort((a: any, b: any) => {
    let ageNumA = parseInt(a.group.match(/[0-9]*/)[0]) || 0
    let ageNumB = parseInt(b.group.match(/[0-9]*/)[0]) || 0

    if (a.group.includes("Under Investigation") || a.group.includes("Unknown"))
      ageNumA = 1000

    if (b.group.includes("Under Investigation") || b.group.includes("Unknown"))
      ageNumB = 1000

    return ageNumA - ageNumB
  })
}

const formatRaceEthLabels = (raceEthGroups: Array<string>) => {
  return raceEthGroups.map((group) => {
    return group
      .replace('_or_', '/')
      .replace('_', ' ')
      .replace(/Amer$/g, 'American')
  })
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
      const countyName = county.name.replace(/ /g, '_').replace('_County', '')
      updatedData.raceEthGroup = buildRaceEthChartData(
        defaultFormattedData.raceEthGroup!,
        race_eth
      )
      updatedData.raceEthNormGroup = buildRaceEthNormalizedChartData(
        defaultFormattedData.raceEthNormGroup!,
        race_eth,
        countyName
      )
    }
  }
  return updatedData
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

/**
 * ETHNICITY POPULATION = COUNTY POPULATION * ETHNICITY%
 * cases per 1000
 * ETHNICITY CASES / (ETHNICITY POPULATION/1000)
 */
const updateRaceEthNormalizedChartData = (
  data: number[],
  labels: string[],
  county: string
): number[] => {
  const { TOTAL, RACE } = RACE_ETH_POP_PERCENTAGE[county.toUpperCase()]
  const finalArr: number[] = []
  data.forEach((cases: number, i: number) => {
    const ethnicity = labels[i]
    const formattedEthnicityMap = {
      WHITE: [],
      AFRICAN_AMER: ['African American', 'Black'],
      NATIVE_AMER: ['Native American', 'American Indian', 'Alaska Native', 'AI_AN', 'AI AN'],
      ASIAN: [],
      PACIFIC_ISLANDER: ['Pacific Islander'],
      OTHER: [],
      MULTIPLE_RACE: ['Multirace'],
      LATINX_OR_HISPANIC: ['Hispanic/Latino', 'Hispanic']
    }

    const ethFound = Object.entries(formattedEthnicityMap).filter(
      (entry: [string, number | string[]]) => {
        if (entry[0] === ethnicity.toUpperCase())
          return true
        const values = entry[1] as string[]  
        for(const value of values)
          if (ethnicity.toUpperCase().includes(value.toUpperCase()))
            return true;
         return false     
      }
    )

    let formattedEth = ethnicity.toUpperCase()

    if (ethFound.length > 0)
      formattedEth = ethFound[0][0]

    const ethPopulation = TOTAL * RACE[formattedEth.replace(/ /g,'_')]
    const ethPopPerThousand = cases / (ethPopulation / 1000)
    finalArr.push(+ethPopPerThousand.toFixed(2))
  })
  return finalArr
}

const sortNormalizedChartData = (updatedRaceEthGroup: RaceEthGroup) => {
  const backgroundColor: Array<string> = []
  const normalizedRaceEths: any = {}
  updatedRaceEthGroup.datasets.data.forEach((cases: number, i: number) => {
    const label = updatedRaceEthGroup.labels[i]
    if (label !== 'Unknown' && label !== 'Total RE' && cases >= 0) {
      normalizedRaceEths[updatedRaceEthGroup.labels[i]] = cases
      backgroundColor.push(PURPLE_MAIN)
    }
  })
  const sortedNormalizedRaceEths = sortLabelsAndValuesByValue(normalizedRaceEths)
  const raceEthLabels = sortedNormalizedRaceEths.map((race) => race[0])
  const raceEthValues = sortedNormalizedRaceEths.map((race: any) => race[1])
  updatedRaceEthGroup.datasets.data = raceEthValues
  updatedRaceEthGroup.labels = raceEthLabels
  updatedRaceEthGroup.datasets.backgroundColor = backgroundColor
}

export default (data: CountiesData): FormattedCountyData => {
  const finalData: FormattedCountiesData = {}

  for (const countyId in data) {
    const defaultFormattedData: any = getDefaultFormattedData()
    finalData[countyId] = defaultFormattedData
    finalData[countyId].name = data[countyId].name
    finalData[countyId].lastUpdatedAt = parseDateForYrMoDay(
      new Date().toISOString()
    )

    const updatedData = getUpdatedCountyData(data[countyId], finalData[countyId])

    finalData[countyId] = Object.assign(finalData[countyId], updatedData)
  }

  return finalData
}
