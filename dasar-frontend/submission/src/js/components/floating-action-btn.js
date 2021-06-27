class FloatingActionButton extends HTMLElement {
 constructor() {
  super();
 }

 connectedCallback() {
  this.render();
 }

 render() {
  this.innerHTML = `
  <style>
  .fab {
   width: 70px;
   height: 70px;
   background-color: #5941A9;
   border-radius: 50%;
   transition: all 0.1s ease-in-out;
   font-size: 1.8em;
   color: white;
   text-align: center;
   line-height: 70px;
  
   position: fixed;
   z-index: 9999;
   right: 30px;
   bottom: 30px;
  }
  
  .fab:hover {
   box-shadow: 0 6px 14px 0 #888;
   transform: scale(1.05);
  }
</style>
  <div class="fab">
   <i class="fas fa-random"></i>
  </div>
  `;
 }
}

customElements.define("floating-action-btn", FloatingActionButton);