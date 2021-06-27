import clubs from './clubs.js';

class DataSource {
    static searchClub(keyword) {
        return new Promise(async (resolve, reject) => {
            // const filteredClubs = clubs.filter(club => club.name.toUpperCase().includes(keyword.toUpperCase()));
            // if (filteredClubs.length) {
            //     resolve(filteredClubs);
            // } else {
            //     reject(`${keyword} is not found"`);
            // }
            const searchURL = "https://www.thesportsdb.com/api/v1/json/1/searchteams.php"

            const response = await fetch(`${searchURL}?t=${keyword}`)
            const responseJSON = await response.json()


            if (responseJSON.error) {
                reject(`Error : ${responseJSON.message}`)
            } else {
                resolve(responseJSON.teams)
            }
        });
    }
}

export default DataSource;