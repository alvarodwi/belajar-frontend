class CreditsSection extends HTMLElement {
 constructor() {
  super();
 }

 connectedCallback() {
  this.render();
 }

 render() {
  this.innerHTML = `
  <style>
  .section {
   margin-top: 5%;
   padding: 2%;
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
</style>
<div class="section">
<span class="title"><i class="fas fa-thumbs-up section-icon"></i> Credits</span>
<div class="row">
  <ul>
    <li>Countries data API from <a href="https://restcountries.eu">RESTCountries</a></li>
    <li>Additional countries data (like gson) from <a href="https://git.io/countries">@mledoze/countries</a>
      via github raw data</li>
    <li>Code style from <a href="https://github.com/dicodingacademy/">@dicodingacademy</a> 😀</li>
  </ul>
</div>
</div>
  `;
 }
}

customElements.define("credits-section", CreditsSection);