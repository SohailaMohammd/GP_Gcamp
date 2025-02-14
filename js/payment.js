document.addEventListener("DOMContentLoaded", function () {
    let btn = document.getElementById("orderr");

    if (btn) {
        console.log(" Button found:", btn.id);

        btn.addEventListener("click", function (event) {
            event.preventDefault();
            console.log("Redirecting to Home.html...");
            window.location.href = "Home.html";
        });
    } else {
        console.error(" Error: Button not found!");
    }
});




document.getElementById("cart").addEventListener("click", function () {
    window.location.href = "cart.html";
});

function showLinks() {
    const links = document.querySelector(".linkshide");
    links.style.display = "flex";
}
function hideLinks() {
    const links = document.querySelector(".linkshide");
    links.style.display = "none";
}