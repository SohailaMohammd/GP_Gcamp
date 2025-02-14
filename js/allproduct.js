document.addEventListener('DOMContentLoaded', async function () {
    async function fetchData() {
        try {
            const response = await fetch('https://orientonline.info/api/products');
            const result = await response.json();
            const products = result.products;

            console.log("Total Products:", products.length);
            console.log(products);

            let container = document.querySelector('.carts');
            if (!container) {
                console.error("Error: Parent element '.carts' not found");
                return;
            }

            container.innerHTML = '';

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
                let oldPrice = document.createElement("del");
                oldPrice.textContent = `$${parseFloat(product.price) + 50}`;

                let price = document.createElement("p");
                price.textContent = `$${product.price}`;

                let button = document.createElement("button");
                button.textContent = "Add To Cart";

                priceContainer.appendChild(price);

                mainElement.appendChild(imageElement);
                mainElement.appendChild(headingElement);
                mainElement.appendChild(priceContainer);
                priceContainer.appendChild(oldPrice);

                mainElement.appendChild(button);

             
                mainElement.addEventListener("click", () => {
                    window.location.href = `product-details.html?id=${product.id}`;
                });

                return mainElement;
            }

            products.forEach(product => container.appendChild(createProductCard(product)));

        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    fetchData();
});
document.getElementById("menuIcon").addEventListener("click", function() {
    document.querySelector(".menu").classList.toggle("show");
    document.querySelector(".icon").classList.toggle("show");
});


document.getElementById("cart").addEventListener("click", function () {
    window.location.href = "cart.html";
});

