type HospitalizationDataType = {
  name: string
  /* eslint-disable camelcase */
  icu_covid_confirmed_patients: number
  icu_available_beds: number
  date: Date
}

type CountyHospitalizationDataType = {
  name: string
  update_time: string
  source_url: string
  series: Array<HospitalizationDataType>
}

type GraphDataType = {
  label: string
  icuConfirmed: number
  icuAvailable: number
}

type CountyHospitalizationDataFormatedType = {
  name: string
  sourceUrl: string
  lastUpdatedAt: String
  graph: Array<GraphDataType>
}

type CountyMapType = {
  [key: string]: boolean
}

const formatHospitalizationDataGraph = (data: HospitalizationDataType[]) => {
  const graphData: GraphDataType[] = []
  const today = new Date()
  const lastMonth = new Date()
  lastMonth.setMonth(today.getMonth() - 3)
  data
    .filter(d => new Date(d.date) > lastMonth)
    .forEach(d => {
      const date = new Date(d.date)

      graphData.push({
        label: `${date.getUTCMonth() + 1}/${date.getUTCDate()}`,
        icuConfirmed: d.icu_covid_confirmed_patients,
        icuAvailable: d.icu_available_beds
      })
    })

  return graphData
}

const mapFilterCounties = (countyFilter: Array<string>) => {
  const map: CountyMapType = {}
  for (const county of countyFilter) {
    map[county] = true
  }
  return map
}

export default (
  data: CountyHospitalizationDataType,
  countyFilter?: Array<string>
) => {
  const counties: Array<CountyHospitalizationDataFormatedType> = []
  let includedCounties: CountyMapType = {}
  if (countyFilter) {
    includedCounties = mapFilterCounties(countyFilter)
  }

  for (const countyName in data.series) {
    if (countyFilter && !includedCounties[countyName]) continue
    const series = data.series[countyName]
    const county: CountyHospitalizationDataFormatedType = {
      name: countyName,
      sourceUrl: data.source_url,
      lastUpdatedAt: data.update_time,
      graph: formatHospitalizationDataGraph(series)
    }
    counties[countyName] = county
  }
  return counties
}
