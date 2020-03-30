type DataType = {
  cases: number
  deaths: number
  date: Date
}

type GraphDataType = {
  label: string
  transition: number
  cumulative: number
}

export default (data: DataType[]) => {
  const graphData: GraphDataType[] = []
  const today = new Date()
  let subTotal = 0
  let previousDayCases = 0
  data
    .filter(d => new Date(d.date) < today)
    .forEach(d => {
      const date = new Date(d.date)
      const cases = d.cases
      if (!isNaN(cases)) {
        if (cases === 0) {
          return
        }
        subTotal = cases - previousDayCases
        if (subTotal < 0) {
          subTotal = 0
        } // data error check
        previousDayCases = cases
        graphData.push({
          label: `${date.getMonth() + 1}/${date.getDate()}`,
          transition: subTotal,
          cumulative: cases
        })
      }
    })
  return graphData
}
