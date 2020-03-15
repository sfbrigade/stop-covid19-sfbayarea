import dayjs from 'dayjs'

const headers = [
  { text: 'Date', value: 'Date' },
  { text: 'Place of Residence', value: 'PlaceOfResidence' },
  { text: 'Age Group', value: 'AgeGroup' },
  { text: 'Gender', value: 'Gender' },
  { text: 'Discharged', value: 'Discharged', align: 'center' }
]

type DataType = {
  ReleaseDate: Date
  PlaceOfResidence: string | null
  AgeGroup: string | null
  Gender: 'Male' | 'Female'
  Discharged: '◯' | null
  [key: string]: any
}

type TableDataType = {
  Date: string
  PlaceOfResidence: DataType['PlaceOfResidence']
  AgeGroup: DataType['AgeGroup']
  Gender: DataType['Gender'] | ''
  Discharged: DataType['Discharged']
}

type TableDateType = {
  headers: typeof headers
  datasets: TableDataType[]
}

export default (data: DataType[]) => {
  const tableDate: TableDateType = {
    headers,
    datasets: []
  }
  data.forEach(d => {
    const TableRow: TableDataType = {
      Date: dayjs(d['ReleaseDate']).format('MM/DD') ?? 'Unknown',
      PlaceOfResidence: d['PlaceOfResidence'] ?? 'Unknown',
      AgeGroup: d['AgeGroup'] ?? 'Unknown',
      Gender: d['Gender'] ?? '',
      Discharged: d['Discharged']
    }
    tableDate.datasets.push(TableRow)
  })
  tableDate.datasets.sort((a, b) => (a === b ? 0 : a < b ? 1 : -1))
  return tableDate
}
