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
    let graphIndex = 0
    totalPopulation += countyData.population
    countyData.cases.forEach(timePoint => {
      const { date, cases, deaths } = timePoint

      // starting date in January in data varies in each county. we only care from Feb 1st which all counties have data.
      const currentDate = new Date(date)
      const startingDate = new Date('2020-02-01')
      if (currentDate < startingDate) {
        return
      }

      graphIndex++

      if (dailyData[graphIndex]) {
        // sometimes cases do not exist in data or number is less than pevious day wrongly
        if (cases == null || cases < casesPreviousDay) {
          dailyData[graphIndex].cases += casesPreviousDay
        } else {
          dailyData[graphIndex].cases += cases
          casesPreviousDay = cases
        }

        // sometimes deaths do not exist in data or number is less than pevious day wrongly
        if (deaths == null || deaths < deathsPreviousDay) {
          dailyData[graphIndex].deaths += deathsPreviousDay
        } else {
          dailyData[graphIndex].deaths += deaths
          deathsPreviousDay = deaths
        }
      } else {
        dailyData[graphIndex] = { ...timePoint }
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
