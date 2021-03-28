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
}

type CountyDataFormattedType = {
  name: string
  population: number
  color: string
  graph: Array<GraphDataType>
  lastUpdatedAt: Date
}

export default (data: Array<CountyDataType>) => {
  const counties = {}

  for (const countyName in data) {
    let { name } = data[countyName]
    const updateTime = data[countyName].update_time
    const series = data[countyName].series
    const population = COUNTY_POPULATIONS[countyName]
    const color = COUNTY_COLORS[countyName]
    name = name + (name.endsWith('County') ? '' : ' County')
    const county: CountyDataFormattedType = {
      name,
      population,
      color,
      graph: formatGraph(series),
      lastUpdatedAt: updateTime.match(/\d+-\d+-\d+/)[0]
    }
    counties[name] = county
  }
  return counties
}
