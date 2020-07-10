/* eslint-disable prettier/prettier */
/* eslint-disable camelcase */
type AgeGraphDatasetType = {
  backgroundColor: string
  data: Array<number>
}

type AgeGroupGraphType = {
  datasets: Array<AgeGraphDatasetType>
  displayLegend: boolean
  labels: Array<string>
}

type AgeGroup = {
  group: string
  raw_count: number
}

type CaseTotals = {
  age_group: Array<AgeGroup>
  gender: Gender
  race_eth: RaceEthnicity
}

type CountiesDataType = {
  [county: string]: CountyDataType
}

type CountiesFormattedType = {
  [county: string]: CountyFormattedType
}

type CountyDataType = {
  case_totals: CaseTotals
  name: string
  source_url: string
  update_time: string
}

type CountyFormattedType = {
  ageGroup?: AgeGroupGraphType
  genderGroup?: GenderGroupGraphType
  lastUpdatedAt?: string
  name?: string
  sourceUrl?: string
}

type Gender = {
  [type: string]: number
}

type GenderGraphDatasetType = {
  backgroundColor: string
  data: Array<number>
}

type GenderGroupGraphType = {
  datasets: Array<GenderGraphDatasetType>
  displayLegend: boolean
  labels: Array<string>
  totalCount: number
}

type RaceEthnicity = {
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

const buildAgeGroupGraphData = (ageGroups: Array<AgeGroup>) => {
  const formatAgeGroupLabels = () => {
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

  return {
    displayLegend: false,
    labels: formatAgeGroupLabels(),
    datasets: [
      {
        backgroundColor: '#473A8C',
        data: ageGroups.map((group) => group.raw_count)
      }
    ]
  }
}

const getGenderTotalCount = (genders: Gender): number => {
  let total = 0
  const genderTypes = Object.keys(genders)
  for (const gender of genderTypes) {
    const count = genders[gender]
    if (count > 0) total += count
  }
  return total
}

const buildGenderGroupGraphData = (genders: Gender) => {
  const genderLabels: string[] = []
  for (const gender in genders) {
    if (genders[gender] >= 0) genderLabels.push(gender)
  }
  const genderTotalCount = getGenderTotalCount(genders)
  const getGenderPercentageData = () => {
    return genderLabels.map((gender) => {
      return Math.round((genders[gender] / genderTotalCount) * 100)
    })
  }

  return {
    displayLegend: false,
    totalCount: genderTotalCount,
    labels: genderLabels,
    datasets: [
      {
        backgroundColor: '#473A8C',
        data: getGenderPercentageData()
      }
    ]
  }
}

export default (
  data: CountiesDataType,
  allCounties: Array<string>
): CountyFormattedType => {
  const finalData: CountiesFormattedType = {}

  for (const countyName of allCounties) {
    const countyNameIndex = countyName
      .replace(' County', '')
      .replace(' ', '_')
      .toLocaleLowerCase()

    const county = data[countyNameIndex]

    finalData[countyName] = {
      lastUpdatedAt: new Date().toISOString().split('T')[0],
      name: countyName,
      ageGroup: {
        datasets: [],
        displayLegend: false,
        labels: []
      },
      genderGroup: {
        datasets: [],
        displayLegend: false,
        labels: [],
        totalCount: 0
      }
    }
    if (county) {
      const { case_totals, update_time, source_url } = county

      finalData[countyName].lastUpdatedAt = update_time?.split('T')[0]
      finalData[countyName].sourceUrl = source_url
      finalData[countyName].ageGroup = buildAgeGroupGraphData(
        case_totals.age_group
      )
      finalData[countyName].genderGroup = buildGenderGroupGraphData(
        case_totals.gender
      )
    }
  }

  return finalData
}
