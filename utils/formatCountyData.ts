import formatGraph from './formatGraph'

const COUNTY_POPULATIONS = {
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

const COUNTY_COLORS = {
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

type CaseType = {
  ['cumul_cases']: number
  date: Date
}

type DeathType = {
  ['cumul_deaths']: number
  date: Date
}

type countiesType = {
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
}

type countiesFormattedType = {
  name: string
  population: number
  color: string
  graph: Array<GraphDataType>
  lastUpdatedAt: Date
}

export default (data: Array<countiesType>) => {
  const totals = {
    name: 'Bay Area Average',
    totalPopulation: 0,
    cases: new Array(5000),
    color: '#2d2d2d',
    lastUpdatedAt: '2025-01-01',
    get graph() {
      return this.cases
    },
    get population() {
      return this.totalPopulation
    }
  }
  const counties = { totals }

  for (const countyName in data) {
    const { name, series, update_time: updateTime } = data[countyName]
    const population = COUNTY_POPULATIONS[countyName]
    const color = COUNTY_COLORS[countyName]
    const graph = formatGraph(series)
    const lastUpdatedAt = updateTime.match(/\d+-\d+-\d+/)[0]

    totals.totalPopulation += population
    if (new Date(lastUpdatedAt) < new Date(totals.lastUpdatedAt)) {
      totals.lastUpdatedAt = lastUpdatedAt
    }
    graph.slice(0, totals.cases.length).map((data, index) => {
      const defaultDay = {
        label: data.label,
        cumulative: 0,
        confirmedTransition: 0,
        deathTransition: 0,
        deathCumulative: 0
      }
      const day = totals.cases[index] || (totals.cases[index] = defaultDay)
      for (const key in data) {
        if (key === 'label') continue
        day[key] += data[key]
      }
    })
    totals.cases = totals.cases.slice(0, graph.length)

    counties[countyName] = {
      name,
      population,
      color,
      graph,
      lastUpdatedAt
    }
  }

  return counties
}
