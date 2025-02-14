document.addEventListener("DOMContentLoaded", async function () {

    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get("id");

    if (!productId) {
        console.error("Error: No product ID found in URL");
        return;
    }

    try {
        const response = await fetch('https://orientonline.info/api/products');
        const result = await response.json();
        const products = result.products;

        const product = products.find(p => p.id == productId);

        if (!product) {
            console.error("Error: Product not found");
            return;
        }


        document.getElementById("productImage").src = `https://orientonline.info/${product.img}`;
        document.getElementById("productTitle").textContent = product.name;
        document.getElementById("productDescription").textContent = product.description;
        document.getElementById("productPrice").textContent = `Price: $${product.price}`;
        document.getElementById("oldPrice").textContent = `$${(parseFloat(product.price) + 50).toFixed(2)}`;


        document.getElementById("addToCart").addEventListener("click", function () {
            let selectedSize = document.getElementById("size").value;
            alert(`Added ${product.name} (Size: ${selectedSize}) to cart!`);
        });
        document.getElementById("menuIcon").addEventListener("click", function () {
            document.querySelector(".menu").classList.toggle("show");
            document.querySelector(".icon").classList.toggle("show");
        });

    } catch (error) {
        console.error("Error fetching product details:", error);
    }
});


async function fetchData() {
    try {
        const response = await fetch('https://orientonline.info/api/products');
        const result = await response.json();
        const products = result.products;
        console.log(products.length);
        console.log(products);

        let offersContainer = document.querySelector('.carts.offers');


        if (!offersContainer) {
            console.error("Error: One or more parent elements not found");
            return;
        }

        offersContainer.innerHTML = '';


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

        products.slice(0, 8).forEach(product => offersContainer.appendChild(createProductCard(product)));

    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

fetchData();
document.getElementById("menuIcon").addEventListener("click", function () {
    document.querySelector(".menu").classList.toggle("show");
    document.querySelector(".icon").classList.toggle("show");

});


/**-------------------review---------------------------- */
let postButton = document.getElementById("post-review-btn");
let textArea = document.getElementById("review-text");
let reviewsContainer = document.querySelector(".reviews");

postButton.addEventListener("click", function () {
    let reviewText = textArea.value.trim();

    if (reviewText === "" || reviewText === "Write your review...") {
        alert("Please write a review before posting.");
        return;
    }


    let newReview = document.createElement("div");
    newReview.classList.add("firstreview");
    newReview.innerHTML = `
            <div class="photo">
                <img src="./images/person-removebg-preview.png" alt="">
            </div>
            <div class="preview">
                <div class="group">
                    <h4 class="name">User</h4>
                  
                </div>
                <div class="para">${reviewText}</div>
                <div class="cont">
                    <p class="like">Like</p>
                    <p class="replay">Replay</p>
                    <p class="hour">Just now</p>
                </div>
            </div>
        `;


    reviewsContainer.insertBefore(newReview, document.querySelector(".your_review"));


    textArea.value = "";
});

document.getElementById("addToCart").addEventListener("click", function () {

    window.location.href = "cart.html";
});

document.getElementById("cart").addEventListener("click", function () {
    window.location.href = "cart.html";
});



document.getElementById("addToCart").addEventListener("click", function () {
    let selectedSize = document.getElementById("size").value; // جلب المقاس المختار
    let urlParams = new URLSearchParams(window.location.search);
    let productId = urlParams.get("id");

    fetch('https://orientonline.info/api/products')
        .then(response => response.json())
        .then(result => {
            let products = result.products;
            let product = products.find(p => p.id == productId);

            if (!product) {
                alert("Product not found");
                return;
            }

            // إنشاء كائن المنتج
            let cartProduct = {
                id: product.id,
                name: product.name,
                price: product.price,
                image: `https://orientonline.info/${product.img}`,
                size: selectedSize
            };

            // جلب المنتجات المخزنة مسبقًا
            let cart = JSON.parse(localStorage.getItem("cart")) || [];

            // التحقق إذا كان المنتج مضافًا بالفعل
            let existingProduct = cart.find(p => p.id == cartProduct.id && p.size == selectedSize);
            if (existingProduct) {
                alert("This product is already in your cart.");
                return;
            }

            // إضافة المنتج إلى السلة
            cart.push(cartProduct);
            localStorage.setItem("cart", JSON.stringify(cart));

            alert(`Added ${product.name} (Size: ${selectedSize}) to cart!`);
            window.location.href = "cart.html"; // الانتقال إلى صفحة السلة
        })
        .catch(error => console.error("Error fetching product details:", error));
});


