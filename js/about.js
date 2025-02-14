// let card = document.querySelector(".card-info");
// let allCard = document.querySelector(".big");

// for (let i = 0; i < 4; i++) {
//    let clonedCard = card.cloneNode(true); 
//    allCard.appendChild(clonedCard);
// }
function showLinks() {
  const links = document.querySelector(".linkshide");
  links.style.display = "flex";
}
function hideLinks() {
  const links = document.querySelector(".linkshide");
  links.style.display = "none";
}

document.getElementById("cart").addEventListener("click", function () {
  window.location.href = "cart.html";
});