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
}

// const mergeObjects = (objectA, objectB = {}) => {

// }

const consolidateAllData = (
  data: Array<CountyDataType>
): ConsolidatedDataType => {
  const consolidatedData: ConsolidatedDataType = {
    totalPopulation: 0,
    totalDeaths: 0,
    totalCases: 0,
    cases: []
  }
  for (const countyName in data) {
    const countyData = data[countyName]
    consolidatedData.totalPopulation += countyData.population
    countyData.cases.forEach((timePoint, index) => {
      const { cases, deaths } = timePoint

      consolidatedData.totalCases += cases
      consolidatedData.totalDeaths += deaths
      if (consolidatedData.cases[index]) {
        consolidatedData.cases[index].cases += cases
        consolidatedData.cases[index].deaths += deaths
      } else {
        consolidatedData.cases[index] = timePoint
      }
    })
  }
  consolidatedData.cases = formatGraph(consolidatedData.cases)
  return consolidatedData
}

export default consolidateAllData
