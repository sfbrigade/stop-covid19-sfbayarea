type CaseType = {
  ['cumul_cases']: number
  date: string
}

type DeathType = {
  ['cumul_deaths']: number
  date: string
}

type DataType = {
  cases: Array<CaseType>
  deaths: Array<DeathType>
}

type GraphDataType = {
  label: string
  confirmedTransition: number
  cumulative: number
  deathTransition: number
  deathCumulative: number
}

export default (data: DataType) => {
  const graphData: GraphDataType[] = []
  const latestCaseUpdate = new Date(data.cases.slice(-1)[0].date)
  const latestDeathUpdate = new Date(data.deaths.slice(-1)[0].date)
  let currentDate = new Date('2020-01-22')
  let cases = 0
  let deaths = 0

  while (currentDate < latestCaseUpdate || currentDate < latestDeathUpdate) {
    currentDate = new Date(currentDate.setDate(currentDate.getDate() + 1))

    const dateStrings = [
      currentDate.getUTCFullYear(),
      currentDate.getUTCMonth() + 1,
      currentDate.getUTCDate()
    ].map(String)
    const dateForCompare = dateStrings
      .map(str => str.padStart(2, '0'))
      .join('-')
    const label = [...dateStrings.slice(1), dateStrings[0]].join('/')
    const matchDate = (day: CaseType | DeathType) => day.date === dateForCompare
    const previousDayCases = cases
    const previousDayDeaths = deaths

    cases = data.cases.find(matchDate)?.['cumul_cases'] || cases
    deaths = data.deaths.find(matchDate)?.['cumul_deaths'] || deaths

    const confirmedTransition = Math.max(cases - previousDayCases, 0)
    const deathTransition = Math.max(deaths - previousDayDeaths, 0)

    graphData.push({
      label,
      confirmedTransition,
      cumulative: cases,
      deathTransition,
      deathCumulative: deaths
    })
  }

  return graphData
}
