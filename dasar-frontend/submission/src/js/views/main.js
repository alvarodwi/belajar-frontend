//font awesome
import {
 library,
 dom
} from '@fortawesome/fontawesome-svg-core';
import {
 fas
} from '@fortawesome/free-solid-svg-icons';
//utils
import navScroll from '../utils/stickynav.js';
import anchorScroll from '../utils/anchorscroll.js';
//components
import '../components/country-item.js'
import '../components/credits-section.js'
import '../components/floating-action-btn.js'
import '../components/loading-view.js';
//data
import DataSource from '../data/data-source.js'

const main = () => {
 //applying font awesome
 library.add(fas);
 dom.watch();

 //applying nav-bar fixed impl
 window.onscroll = () => {
  navScroll()
 }
 //applying anchorscroll upon hashtag link
 anchorScroll()

 //ui logic
 const fab = document.querySelector('floating-action-btn')

 //render loading state
 const loadingState = document.querySelector('loading-view')
 const countryItem = document.querySelector('country-item')
 const navTitle = document.querySelector("#nav-title")

 //ui state false -> loading, true -> loaded
 const toggleUiState = (flag) => {
  if (flag) {
   loadingState.classList.add("hidden")
   countryItem.classList.remove("hidden")
  } else {
   loadingState.classList.remove("hidden")
   countryItem.classList.add("hidden")
  }
 }

 const fetchCountryData = async () => {
  toggleUiState(false)
  try {
   const randomCountryCode = await DataSource.fetchRandomCountriesCode();
   console.log(randomCountryCode)
   const result = await DataSource.getCountryData(randomCountryCode);
   renderResult(result)
  } catch (message) {
   fallbackResult(message)
  }
 }

 const renderResult = result => {
  console.log(result)
  navTitle.innerHTML = result.name
  countryItem.country = result
  toggleUiState(true)
 };

 const fallbackResult = message => {
  console.log(message)
 };

 //first time load, fetch country data
 fetchCountryData()

 fab.onclick = () => fetchCountryData()
}

export default main