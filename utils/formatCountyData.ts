import formatGraph from './formatGraph'

type CaseType = {
  cases: number
  deaths: number
  recovered: number
  active: number
  date: Date
}

type CountyDataType = {
  name: string
  population: number
  cases: Array<CaseType>
}

type GraphDataType = {
  label: string
  confirmedTransition: number
  cumulative: number
}

type CountyDataFormattedType = {
  name: string
  graph: Array<GraphDataType>
  lastUpdatedAt: Date
}

type CountyMapType = {
  [key: string]: boolean
}

const mapFilterCounties = (countyFilter: Array<string>) => {
  const map: CountyMapType = {}
  for (const county of countyFilter) {
    map[county] = true
  }
  return map
}

export default (data: Array<CountyDataType>, countyFilter?: Array<string>) => {
  const counties: Array<CountyDataFormattedType> = []
  let includedCounties: CountyMapType = {}
  if (countyFilter) {
    includedCounties = mapFilterCounties(countyFilter)
  }

  for (const countyName in data) {
    if (countyFilter && !includedCounties[countyName]) continue
    const { name, cases } = data[countyName]
    const county: CountyDataFormattedType = {
      name,
      graph: formatGraph(cases),
      lastUpdatedAt: cases.slice(-1)[0].date
    }
    counties[countyName] = county
  }
  return counties
}
