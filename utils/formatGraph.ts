type DataType = {
  Date: Date
  SubTotal: number
}

type GraphDataType = {
  label: string
  transition: number
  cumulative: number
}

export default (data: DataType[]) => {
  const graphData: GraphDataType[] = []
  const today = new Date()
  let patSum = 0
  data
    .filter(d => new Date(d['Date']) < today)
    .forEach(d => {
      const date = new Date(d['Date'])
      const subTotal = d['SubTotal']
      if (!isNaN(subTotal)) {
        patSum += subTotal
        graphData.push({
          label: `${date.getMonth() + 1}/${date.getDate()}`,
          transition: subTotal,
          cumulative: patSum
        })
      }
    })
  return graphData
}
