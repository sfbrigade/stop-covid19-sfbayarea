type CaseType = {
  ['cumul_cases']: number
  date: Date
}

type DeathType = {
  ['cumul_deaths']: number
  date: Date
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

    const dateString = `${currentDate.getUTCFullYear()}-${(
      currentDate.getUTCMonth() + 1
    )
      .toString()
      .padStart(2, '0')}-${currentDate
      .getUTCDate()
      .toString()
      .padStart(2, '0')}`
    const matchDateString = ({ date }) => date === dateString
    const previousDayCases = cases
    const previousDayDeaths = deaths

    cases = data.cases.find(matchDateString)?.['cumul_cases'] || cases
    deaths = data.deaths.find(matchDateString)?.['cumul_deaths'] || deaths

    graphData.push({
      label: `${currentDate.getUTCMonth() +
        1}/${currentDate.getUTCDate()}/${currentDate.getUTCFullYear()}`,
      confirmedTransition: cases - previousDayCases,
      cumulative: cases,
      deathTransition: deaths - previousDayDeaths,
      deathCumulative: deaths
    })
  }

  return graphData
}
