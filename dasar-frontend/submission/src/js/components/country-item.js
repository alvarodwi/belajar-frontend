import './map-view.js';

class CountryItem extends HTMLElement {
  constructor() {
    super();
  }

  set country(country) {
    this._country = country;
    this.render();
  }

  render() {
    var languageUsed = ``

    this._country.languages.forEach(lang => {
      languageUsed += `<div class="row">
      <div class="column value">${lang.iso639_2} - ${lang.name}</div>
    </div>`
    });

    this.innerHTML = `
  <style>
  .section {
    padding-top: 3%;
  }

  .country-data .columns,
  .column {
   border-radius: 4px;
   font-size: 1.5rem;
   line-height: 40px;
   margin-left: 0;
   letter-spacing: .1rem;
  }
  
  .title {
   text-transform: uppercase;
   letter-spacing: .1rem;
   font-size: 1.5em;
   font-weight: 600;
   margin: 1%;
  }
  
  .title+div {
   border-top: 1px solid #888;
   padding-top: 2%;
  }
  
  .section-icon {
   width: 20px;
   margin-right: 1%;
   color: #1EAEDB;
  }
  
  .section-icon.flag {
    width: 50px;
   border: 1px solid #888;
  }
  
  .attr {
   font-weight: 600;
   text-transform: uppercase;
   text-decoration: underline;
  }
  
  .value {
   font-weight: 400;
  }
</style>
<div class="country-data">
<div class="section" id="overview">
<span class="title">
  <img class="section-icon flag" src="https://restcountries.eu/data/${this._country.alpha3Code.toLowerCase()}.svg">
  ${this._country.name}
  </span>
  <div class="row">
   <div class="four columns attr">Native Name</div>
  <div class="eight columns value">${this._country.nativeName}</div>
</div>
<div class="row">
   <div class="four columns attr">Alternative Spellings</div>
  <div class="eight columns value">${this._country.altSpellings}</div>
</div>
<div class="row">
  <div class="four columns attr">Capital</div>
  <div class="eight columns value">${this._country.capital}</div>
</div>
<div class="row">
  <div class="four columns attr">Demonym</div>
  <div class="eight columns value">${this._country.demonym}</div>
</div>
<div class="row">
  <div class="four columns attr">Population</div>
  <div class="eight columns value">${this._country.population}</div>
</div>
</div>
<div class="section" id="language">
<span class="title">
<i class="fas fa-language section-icon"></i> Language</span>
<div class="row">
  <div class="four columns attr">Native Language</div>
  <div class="eight columns value">${this._country.languages[0].name}</div>
</div>
<div class="row">
  <div class="column attr">Language Used</div>
</div>
${languageUsed}
</div>
<div class="section" id="codes">
<span class="title">
<i class="fas fa-stream section-icon"></i></i> Codes
</span>
<div class="row">
  <div class="five columns attr">Country Code (ISO 3166-1 alpha-2)</div>
  <div class="seven columns value">${this._country.alpha2Code}</div>
</div>
<div class="row">
  <div class="five columns attr">Country Code (ISO 3166-1 alpha-3)</div>
  <div class="seven columns value">${this._country.alpha3Code}</div>
</div>
<div class="row">
  <div class="five columns attr">Country Code (ISO 3166-1 alpha-1)</div>
  <div class="seven columns value">${this._country.numericCode}</div>
</div>
<div class="row">
  <div class="five columns attr">International Calling Code</div>
  <div class="seven columns value">+${this._country.callingCodes[0]}</div>
</div>
<div class="row">
  <div class="five columns attr">Currency Code (ISO 4217)</div>
  <div class="seven columns value">${this._country.currencies[0].code}</div>
</div>
<div class="row">
  <div class="five columns attr">Top Level Domain</div>
  <div class="seven columns value">${this._country.topLevelDomain[0]}</div>
</div>
</div>
<div class="section" id="geography">
<span class="title">
<i class="fas fa-atlas section-icon"></i> Geography
</span>
<div class="row">
  <div class="four columns attr">Region</div>
  <div class="eight columns value">${this._country.region}</div>
</div>
<div class="row">
  <div class="four columns attr">Subregion</div>
  <div class="eight columns value">${this._country.subregion}</div>
</div>
<div class="row">
  <div class="four columns attr">Lat/Lng</div>
  <div class="eight columns value">${this._country.latlng}</div>
</div>
<div class="row">
  <div class="four columns attr">Area</div>
  <div class="eight columns value">${this._country.area} km²</div>
</div>
<div class="row">
  <div class="four columns attr">Land Borders</div>
  <div class="eight columns value">${this._country.borders}</div>
</div>
</div>
<div class="section">
<span class="title"><i class="fas fa-map-marker-alt section-icon"></i> Location</span>
<div class="row">
  <map-view></map-view>
</div>
</div>
</div>
  `;
    this.initMapView()
  }

  initMapView() {
    const mapElement = this.querySelector('map-view')

    var osmUrl = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      attrib = 'Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
      customMap;

    customMap = L.map('map-view', {
      scrollWheelZoom: false
    }).setView([this._country.latlng[0], this._country.latlng[1]], 7);

    // Initialize the base layer
    L.tileLayer(osmUrl, {
      attribution: attrib,
      maxZoom: 18
    }).addTo(customMap);

    //fetch geojson
    this.fetchGeoJson(mapElement, customMap)
  }

  async fetchGeoJson(element, map) {
    try {
      const response = await fetch(`https://raw.githubusercontent.com/mledoze/countries/master/data/${this._country.alpha3Code.toLowerCase()}.geo.json`)
      const responseJson = await response.json()
      console.log(responseJson)
      element.init(map, responseJson)
    } catch (error) {
      console.log(error)
    }
  }
}

customElements.define("country-item", CountryItem);