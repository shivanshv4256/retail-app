const api = "/api/products";
let cart = JSON.parse(localStorage.getItem("cart")) || [];

const container = document.getElementById("productList");
const cartCount = document.getElementById("cartCount");

// Load products from backend
async function loadProducts() {
    const res = await fetch(api);
    const products = await res.json();

    container.innerHTML = "";

    products.forEach(p => {
        container.innerHTML += `
        <div class="col-lg-4 col-md-6 mb-4">
            <div class="card">
                <img src="${p.image}" class="card-img-top">
                <div class="card-body">
                    <h5>${p.name}</h5>
                    <p class="price">₹ ${p.price}</p>
                    <button class="add-cart w-100" onclick="addToCart(${p.id},'${p.name}',${p.price})">
                        🛒 Add to Cart
                    </button>
                </div>
            </div>
        </div>
        `;
    });

    // Update cart count when page loads
    cartCount.innerText = cart.length;
}

// The addToCart function goes here
function addToCart(id, name, price) {
    cart.push({ id, name, price });
    localStorage.setItem("cart", JSON.stringify(cart));

    // Update floating cart badge
    cartCount.innerText = cart.length;

    // Optional: simple toast/alert
    alert(`Added ${name} to cart 🛒`);
}

// Call loadProducts when page loads
loadProducts();