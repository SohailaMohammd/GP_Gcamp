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

document.getElementById("cart2").addEventListener("click", function () {
  window.location.href = "cart.html";
});