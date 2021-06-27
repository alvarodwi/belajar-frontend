class DataSource {
 static getCountryData(id) {
  return new Promise(async (resolve, reject) => {
   const url = `https://restcountries.eu/rest/v2/alpha/${id}`

   const response = await fetch(url)
   const responseJSON = await response.json()

   if (responseJSON.error) {
    reject(`Error : ${responseJSON.message}`)
   } else {
    resolve(responseJSON)
   }
  });
 };

 //inefficient, but for now anything do =(
 static fetchRandomCountriesCode() {
  return new Promise(async (resolve, reject) => {
   const url = `https://restcountries.eu/rest/v2/all?fields=alpha3Code`

   const response = await fetch(url)
   const responseJSON = await response.json()

   if (responseJSON.error) {
    reject(`Error : ${responseJSON.message}`)
   } else {
    resolve(responseJSON[Math.floor((Math.random() * 250))].alpha3Code)
   }
  });
 };
}

export default DataSource;