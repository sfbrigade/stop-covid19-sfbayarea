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

type ConsolidatedDataType = {
  totalPopulation: number
  cases: Array<GraphDataType>
  deaths: Array<GraphDataType>
  lastUpdatedAt: string
}

// const mergeObjects = (objectA, objectB) => {
//     const result = {};

//     return result;
// }

const consolidateAllData = (
  data: Array<CountyDataType>
): ConsolidatedDataType => {
  let totalPopulation = 0
  const dailyCases: Array<any> = []
  const dailyDeaths: Array<any> = []

  for (const countyName in data) {
    const countyData = data[countyName]
    totalPopulation += countyData.population
    countyData.cases.forEach((timePoint, index) => {
      const { cases, deaths } = timePoint

      if (dailyCases[index]) {
        dailyCases[index].cases += cases
      } else {
        dailyCases[index] = { ...timePoint }
      }
      if (dailyDeaths[index]) {
        dailyDeaths[index].deaths += deaths
      } else {
        dailyDeaths[index] = { ...timePoint }
      }
    })
  }

  const consolidatedData: ConsolidatedDataType = {
    totalPopulation,
    cases: formatGraph(dailyCases),
    deaths: formatGraph(dailyDeaths),
    lastUpdatedAt: '3/19'
  }
  return consolidatedData
}

export default consolidateAllData
