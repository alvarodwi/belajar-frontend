var navbar = document.getElementById("navbar");
var content = document.getElementById("content");
var sticky = navbar.offsetTop;

function navScroll() {
 if (window.pageYOffset >= sticky) {
  navbar.classList.add("sticky")
  content.classList.add("with-sticky-nav")
 } else {
  navbar.classList.remove("sticky");
  content.classList.remove("with-sticky-nav")
 }
}

export default navScroll