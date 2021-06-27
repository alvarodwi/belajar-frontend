import L from 'leaflet';
import "leaflet_css";

class MapView extends HTMLElement {
 constructor() {
  super();
 }

 /**
  * @param {L.map} map
  * @param {string} data
  */
 init(map, data) {
  this.addGeoJsonLayer(map, data, true)
 }

 addGeoJsonLayer(map, geoJson, fitMapToFeature) {
  var geoLayer;

  if (!map || !geoJson) {
   return null;
  }


  geoLayer = L.geoJson().addTo(map);
  geoLayer.addData(geoJson);

  if (fitMapToFeature) {
   // This timeout is an attempt to avoid an issue where the map control becomes
   // unresponsive.
   window.setTimeout(function () {
    console.log("executing map.fitBounds", geoLayer)
    map.fitBounds(geoLayer.getBounds());
   }, 100);
  }


  return geoLayer;
 };

 connectedCallback() {
  this.render()
 }

 render() {
  this.innerHTML = `
  <style>#map-view {
   height: 400px;
  }</style>
        <div id="map-view">
        </div>`;
 }
}

customElements.define("map-view", MapView);