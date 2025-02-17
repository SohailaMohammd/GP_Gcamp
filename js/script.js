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

async function fetchData() {
    try {
        const response = await fetch('https://orientonline.info/api/products');
        const result = await response.json();
        const products = result.products;
        console.log(products.length);
        console.log(products);

        let offersContainer = document.querySelector('.carts.offers');
        let recommendedContainer = document.querySelector('.carts.recommended');
        let exploreContainer = document.querySelector('.carts.explore');

        if (!offersContainer || !recommendedContainer || !exploreContainer) {
            console.error("Error: One or more parent elements not found");
            return;
        }

        offersContainer.innerHTML = '';
        recommendedContainer.innerHTML = '';
        exploreContainer.innerHTML = '';

        function createProductCard(product) {
            let mainElement = document.createElement("div");
            mainElement.className = "cart-item";
            mainElement.dataset.id = product.id;
            let imageElement = document.createElement("img");
            imageElement.src = `https://orientonline.info/${product.img}`;
            imageElement.alt = product.name;
            imageElement.className = "product-img";

            let headingElement = document.createElement("h3");
            headingElement.textContent = product.name;



            let priceContainer = document.createElement("div");
            priceContainer.className = "price";

            let price = document.createElement("p");
            price.textContent = `$${product.price}`;

            let oldPrice = document.createElement("del");
            oldPrice.textContent = `$${parseFloat(product.price) + 50}`;

            let starsContainer = document.createElement("div");
            starsContainer.className = "stars";




            let button = document.createElement("button");
            button.textContent = "Add To Cart";


            priceContainer.appendChild(price);
            priceContainer.appendChild(oldPrice);

            mainElement.appendChild(imageElement);
            mainElement.appendChild(headingElement);

            mainElement.appendChild(priceContainer);

            mainElement.appendChild(button);

            mainElement.addEventListener("click", () => {
                window.location.href = `product-details.html?id=${product.id}`;
            });


            return mainElement;



        }

        products.slice(0, 4).forEach(product => offersContainer.appendChild(createProductCard(product)));
        products.slice(4, 12).forEach(product => recommendedContainer.appendChild(createProductCard(product)));
        products.slice(0, 8).forEach(product => exploreContainer.appendChild(createProductCard(product)));

    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

fetchData();
document.getElementById("menuIcon").addEventListener("click", function () {
    document.querySelector(".menu").classList.toggle("show");
    document.querySelector(".icon").classList.toggle("show");
});

