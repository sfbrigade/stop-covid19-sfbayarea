type DataType = {
  attr: 'Total Tested Cases'
  value: number
  children: [
    {
      attr: 'ConfirmedCases'
      value: number
      children: [
        {
          attr: 'InHospital'
          value: number
          children: [
            {
              attr: 'MildCases'
              value: number
            },
            {
              attr: 'IntensiveCases'
              value: number
            }
          ]
        },
        {
          attr: 'Discharged'
          value: number
        },
        {
          attr: 'Deaths'
          value: number
        }
      ]
    }
  ]
}

type ConfirmedCasesType = {
  TotalTestedCases: number
  ConfirmedCases: number
  InHospital: number
  SoftSymptomCases: number
  IntensiveCases: number
  Deaths: number
  Discharged: number
}

export default (data: DataType) => {
  const formattedData: ConfirmedCasesType = {
    TotalTestedCases: data.value,
    ConfirmedCases: data.children[0].value,
    InHospital: data.children[0].children[0].value,
    SoftSymptomCases: data.children[0].children[0].children[0].value,
    IntensiveCases: data.children[0].children[0].children[1].value,
    Deaths: data.children[0].children[2].value,
    Discharged: data.children[0].children[1].value
  }
  return formattedData
}
