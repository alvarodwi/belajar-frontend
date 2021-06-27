var navbar = document.getElementById("navbar");
var navlist = document.getElementById("nav-list");
var navword = document.getElementById("nav-word");
var sticky = navbar.offsetTop;


window.onscroll = function () {
 navScroll()
};

function navScroll() {
 if (window.pageYOffset >= sticky) {
  navbar.classList.add("sticky")
 } else {
  navbar.classList.remove("sticky");
 }
}

function mobileMenu() {
 if (window.innerWidth < 800) {
  if (navlist.classList.contains("hidden")) {
   navlist.classList.remove("hidden");
  } else {
   navlist.classList.add("hidden");
  }
 }
}

function windowResizeMobile() {
 console.log("window width ", window.innerWidth)
 if (window.innerWidth < 800) {
  navlist.classList.add("hidden");
 } else {
  navlist.classList.remove("hidden")
 }
}

navword.onclick = function () {
 event.preventDefault()
 mobileMenu()
};

window.onresize = function () {
 windowResizeMobile()
}

//hehe nyerah kalo ini kakak...
//https://perishablepress.com/vanilla-javascript-scroll-anchor/
(function () {
 scrollTo();
});

function scrollTo() {
 const links = document.querySelectorAll('.nav-link');
 links.forEach(each => (each.onclick = scrollAnchors));
}

function scrollAnchors(e, respond = null) {
 const distanceToTop = el => Math.floor(el.getBoundingClientRect().top);
 e.preventDefault();
 var targetID = (respond) ? respond.getAttribute('href') : this.getAttribute('href');
 const targetAnchor = document.querySelector(targetID);
 if (!targetAnchor) return;
 const originalTop = distanceToTop(targetAnchor);
 window.scrollBy({
  top: originalTop,
  left: 0,
  behavior: 'smooth'
 });
 const checkIfDone = setInterval(function () {
  const atBottom = window.innerHeight + window.pageYOffset >= document.body.offsetHeight - 2;
  if (distanceToTop(targetAnchor) === 0 || atBottom) {
   targetAnchor.tabIndex = '-1';
   targetAnchor.focus();
   window.history.pushState('', '', targetID);
   clearInterval(checkIfDone);
  }
 }, 100);
}