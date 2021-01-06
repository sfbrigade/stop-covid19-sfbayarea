type DataType = {
  cases: number
  deaths: number
  date: Date
}

type GraphDataType = {
  label: string
  confirmedTransition: number
  cumulative: number
  deathTransition: number
  deathCumulative: number
}

export default (data: DataType[]) => {
  const graphData: GraphDataType[] = []
  const lastMonth = new Date('2020-01-23')
  let subTotal = 0
  let previousDayCases = 0
  let deathSubTotal = 0
  let deathPreviousDayCases = 0
  let cases = 0
  let deaths = 0
  data
    .filter(d => new Date(d.date) > lastMonth)
    .forEach((d, idx, array) => {
      const date = new Date(d.date)
      cases = d.cases || cases
      deaths = d.deaths || deaths
      if (!isNaN(cases)) {
        if (cases === 0) {
          return
        }

        // first date in the chart needs to be calculated in the beginning
        if (previousDayCases === 0) {
          previousDayCases = array[idx].cases
          deathPreviousDayCases = array[idx].deaths
          return
        }
        subTotal = cases - previousDayCases
        deathSubTotal = deaths - deathPreviousDayCases

        // if the latest date data is 0, it handles as the date is not ready
        if (subTotal === 0 && idx === array.length - 1) {
          return
        }

        // sometimes error data exists, handle as 0
        if (subTotal < 0) {
          subTotal = 0
        }
        if (deathSubTotal < 0) {
          deathSubTotal = 0
        }

        previousDayCases = cases
        deathPreviousDayCases = deaths
        graphData.push({
          label: `${date.getUTCMonth() +
            1}/${date.getUTCDate()}/${date.getUTCFullYear()}`,
          confirmedTransition: subTotal,
          cumulative: cases,
          deathTransition: deathSubTotal,
          deathCumulative: deaths
        })
      }
    })
  return graphData
}
