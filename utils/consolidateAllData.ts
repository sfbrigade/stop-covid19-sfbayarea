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
}

// const mergeObjects = (objectA, objectB) => {
//     const result = {};

//     return result;
// }

const consolidateAllData = (
  data: Array<CountyDataType>
): ConsolidatedDataType => {
  let totalPopulation = 0
  const dailyData: Array<any> = []

  for (const countyName in data) {
    const countyData = data[countyName]
    let casesPreviousDay = 0
    let deathsPreviousDay = 0
    totalPopulation += countyData.population
    countyData.cases.forEach((timePoint, index) => {
      const { cases, deaths } = timePoint

      if (dailyData[index]) {
        // sometimes cases do not exist in data or number is less than pevious day wrongly
        if (cases == null || cases < casesPreviousDay) {
          dailyData[index].cases += casesPreviousDay
        } else {
          dailyData[index].cases += cases
          casesPreviousDay = cases
        }

        // sometimes deaths do not exist in data or number is less than pevious day wrongly
        if (deaths == null || deaths < deathsPreviousDay) {
          dailyData[index].deaths += deathsPreviousDay
        } else {
          dailyData[index].deaths += deaths
          deathsPreviousDay = deaths
        }
      } else {
        dailyData[index] = { ...timePoint }
      }
    })
  }

  const consolidatedData: ConsolidatedDataType = {
    totalPopulation,
    cases: formatGraph(dailyData)
  }

  return consolidatedData
}

export default consolidateAllData
