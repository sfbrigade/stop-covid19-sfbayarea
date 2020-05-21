export const calculatePercentage = (num1: number, num2: number): string => {
  // increase case
  if (num2 >= num1) {
    const diff = num2 - num1
    const change = ((diff / num1) * 100).toFixed(2)
    return change
  } else {
    // decrease case
    const diff = num1 - num2
    const change = ((diff / num1) * -100).toFixed(2)
    return change
  }
}

export const calculateDeathRate = (
  deaths: number,
  totalCases: number
): string => {
  return ((deaths / totalCases) * 100).toFixed(2)
}

export const calculateCaseRate = (
  cases: number,
  totalCases: number
): string => {
  console.log(cases, totalCases)
  return ((cases / totalCases) * 100).toFixed(2)
}

export const calculateTotalCases = (Data: any): number => {
  const casesSolano = Data['Solano County'].cases
  const casesAlameda = Data['Alameda County'].cases
  const casesSantaClara = Data['Santa Clara County'].cases
  const casesSanFrancisco = Data['San Francisco County'].cases
  const casesContraCostaCounty = Data['Contra Costa County'].cases
  const casesSanMateoCounty = Data['San Mateo County'].cases
  const casesSonoma = Data['Sonoma County'].cases
  const casesNapa = Data['Napa County'].cases
  const casesMarin = Data['Marin County'].cases

  const totalConfirmedCases =
    casesSolano[casesSolano.length - 1].cases +
    casesAlameda[casesAlameda.length - 1].cases +
    casesSantaClara[casesSantaClara.length - 1].cases +
    casesSanFrancisco[casesSanFrancisco.length - 1].cases +
    casesContraCostaCounty[casesContraCostaCounty.length - 1].cases +
    casesSanMateoCounty[casesSanMateoCounty.length - 1].cases +
    casesSonoma[casesSonoma.length - 1].cases +
    casesNapa[casesNapa.length - 1].cases +
    casesMarin[casesMarin.length - 1].cases

  return totalConfirmedCases
}
