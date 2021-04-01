import formatGraph from './formatGraph'

type CaseType = {
  ['cumul_cases']: number
  date: string
}

type DeathType = {
  ['cumul_deaths']: number
  date: string
}

type CountyDataType = {
  name: string
  ['update_time']: string
  series: {
    cases: Array<CaseType>
    deaths: Array<DeathType>
  }
}

type GraphDataType = {
  label: string
  confirmedTransition: number
  cumulative: number
  deathTransition: number
  deathCumulative: number
}

type CountiesFormattedType = {
  name: string
  population: number
  color: string
  graph: Array<GraphDataType>
  lastUpdatedAt: string
}

interface TotalsFormattedType extends CountiesFormattedType {
  totalPopulation: number
  cases: Array<GraphDataType>
}

interface CountyInterface<Type> {
  solano: Type
  alameda: Type
  ['santa_clara']: Type
  ['san_francisco']: Type
  ['contra_costa']: Type
  ['san_mateo']: Type
  sonoma: Type
  napa: Type
  marin: Type
}

type CountyCollection = Partial<CountyInterface<CountiesFormattedType>> & {
  totals: TotalsFormattedType
}

const COUNTY_POPULATIONS: CountyInterface<number> = {
  alameda: 1671329,
  contra_costa: 1153526,
  marin: 258826,
  napa: 137744,
  san_francisco: 881549,
  san_mateo: 766573,
  santa_clara: 1927852,
  solano: 447643,
  sonoma: 494336
}

const COUNTY_COLORS: CountyInterface<string> = {
  solano: '#999900',
  alameda: '#009900',
  santa_clara: '#ff0000',
  san_francisco: '#7f00ff',
  contra_costa: '#ff8800',
  san_mateo: '#0080ff',
  sonoma: '#ff00ff',
  napa: '#808080',
  marin: '#0000ff'
}

function getInitialTotals(): TotalsFormattedType {
  return {
    name: 'Bay Area Average',
    population: 0,
    graph: new Array(5000),
    color: '#2d2d2d',
    lastUpdatedAt: '2025-01-01',
    get cases(): Array<GraphDataType> {
      return this.graph
    },
    get totalPopulation(): number {
      return this.population
    }
  }
}

function accumulateCaseData(
  totals: TotalsFormattedType,
  data: GraphDataType,
  index: number
): void {
  const defaults: GraphDataType = {
    label: data.label,
    cumulative: 0,
    confirmedTransition: 0,
    deathTransition: 0,
    deathCumulative: 0
  }
  const totalData = totals.graph[index] || (totals.graph[index] = defaults)
  let key: keyof GraphDataType
  for (key in data) {
    if (key === 'label') continue
    totalData[key] += data[key]
  }
}

function updateTotals(
  totals: TotalsFormattedType,
  county: CountiesFormattedType
): void {
  const graphAccumulator = accumulateCaseData.bind(null, totals)
  county.graph.slice(0, totals.graph.length).map(graphAccumulator)
  totals.graph = totals.graph.slice(0, county.graph.length)

  totals.population += county.population

  if (new Date(county.lastUpdatedAt) < new Date(totals.lastUpdatedAt)) {
    totals.lastUpdatedAt = county.lastUpdatedAt
  }
}

export default (data: CountyInterface<CountyDataType>): CountyCollection => {
  const counties: CountyCollection = { totals: getInitialTotals() }
  let countyName: keyof CountyInterface<null>

  for (countyName in data) {
    const { name, series, update_time: updateTime } = data[countyName]
    const population: number = COUNTY_POPULATIONS[countyName]
    const color: string = COUNTY_COLORS[countyName]
    const graph = formatGraph(series)
    const lastUpdatedAt = updateTime.match(/\d+-\d+-\d+/)?.[0] || ''

    counties[countyName] = {
      name,
      population,
      color,
      graph,
      lastUpdatedAt
    }

    updateTotals(counties.totals, counties[countyName]!)
  }

  return counties
}
