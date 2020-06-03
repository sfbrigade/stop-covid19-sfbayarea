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
  totalDeaths: number
  totalCases: number
  cases: Array<GraphDataType>
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
  let totalDeaths = 0
  let totalCases = 0
  const allCases: Array<any> = []

  for (const countyName in data) {
    const countyData = data[countyName]
    totalPopulation += countyData.population
    countyData.cases.forEach((timePoint, index) => {
      const { cases, deaths } = timePoint

      totalCases += cases
      totalDeaths += deaths
      if (allCases[index]) {
        allCases[index].cases += cases
        allCases[index].deaths += deaths
      } else {
        allCases[index] = { ...timePoint }
      }
    })
  }

  const consolidatedData: ConsolidatedDataType = {
    totalPopulation,
    totalDeaths,
    totalCases,
    cases: formatGraph(allCases),
    lastUpdatedAt: '3/19'
  }
  return consolidatedData
}

export default consolidateAllData
