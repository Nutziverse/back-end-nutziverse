const calculate_totalNutrition = (data) => {
  let totKarbohidrat = 0, totProtein = 0, totLemak = 0
  
  if(data) {
    totKarbohidrat = data.makanan.reduce((prev, curr) => prev + (curr.makananID.karbohidrat * curr.porsi), 0)
    totProtein = data.makanan.reduce((prev, curr) => prev + (curr.makananID.protein * curr.porsi), 0)
    totLemak = data.makanan.reduce((prev, curr) => prev + (curr.makananID.lemak * curr.porsi), 0)
  }
  
  const nutrition = {
    totKarbohidrat: Number(totKarbohidrat.toFixed(2)),
    totProtein: Number(totProtein.toFixed(2)),
    totLemak: Number(totLemak.toFixed(2))
  }
  
  return nutrition
}

const findIndexByDate = (data, date) => {
  const trackingIndex = data.findIndex(el => el.tanggal.toISOString().includes(date))

  return trackingIndex
}

module.exports = {
  calculate_totalNutrition,
  findIndexByDate
}