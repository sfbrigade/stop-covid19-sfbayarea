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
  const today = new Date()
  const lastMonth = new Date()
  lastMonth.setMonth(today.getMonth() - 1)
  let subTotal = 0
  let previousDayCases = 0
  let deathSubTotal = 0
  let deathPreviousDayCases = 0
  data
    .filter(d => new Date(d.date) > lastMonth)
    .forEach((d, idx, array) => {
      const date = new Date(d.date)
      const cases = d.cases
      const deaths = d.deaths
      if (!isNaN(cases)) {
        if (cases === 0) {
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
        previousDayCases = cases
        deathPreviousDayCases = deaths
        graphData.push({
          label: `${date.getUTCMonth() + 1}/${date.getUTCDate()}`,
          confirmedTransition: subTotal,
          cumulative: cases,
          deathTransition: deathSubTotal,
          deathCumulative: deaths
        })
      }
    })
  return graphData
}
