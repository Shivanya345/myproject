document.addEventListener("DOMContentLoaded", () => {
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    const addToCartButtons = document.querySelectorAll(".add-to-cart");
    const cartList = document.getElementById("cart-items");
    const totalPriceElement = document.getElementById("total-price");

    // Save the cart to localStorage
    function saveCart() {
        localStorage.setItem("cart", JSON.stringify(cartItems));
    }

    // Update the cart on the page
    function updateCart() {
        if (cartList) {
            cartList.innerHTML = "";
            let total = 0;
            cartItems.forEach((item, index) => {
                total += item.price * item.quantity;
                const listItem = document.createElement("li");
                listItem.innerHTML = `
                    ${item.name} - ₹${item.price} x ${item.quantity}
                    <button class="decrease-quantity" data-index="${index}">-</button>
                    <button class="increase-quantity" data-index="${index}">+</button>
                    <button class="remove-item" data-index="${index}">Remove</button>
                `;
                cartList.appendChild(listItem);
            });
            totalPriceElement.textContent = `Total: ₹${total}`;

            document.querySelectorAll(".increase-quantity").forEach(button => {
                button.addEventListener("click", (e) => {
                    const index = parseInt(e.target.getAttribute("data-index"));
                    cartItems[index].quantity += 1;
                    saveCart();
                    updateCart();
                });
            });

            document.querySelectorAll(".decrease-quantity").forEach(button => {
                button.addEventListener("click", (e) => {
                    const index = parseInt(e.target.getAttribute("data-index"));
                    if (cartItems[index].quantity > 1) {
                        cartItems[index].quantity -= 1;
                    } else {
                        cartItems.splice(index, 1); // Remove item if quantity is 1 and decrease is clicked
                    }
                    saveCart();
                    updateCart();
                });
            });

            document.querySelectorAll(".remove-item").forEach(button => {
                button.addEventListener("click", (e) => {
                    const index = parseInt(e.target.getAttribute("data-index"));
                    cartItems.splice(index, 1);
                    saveCart();
                    updateCart();
                });
            });
        }
    }

    // Proceed to checkout
    document.getElementById("checkout-btn")?.addEventListener("click", () => {
        if (cartItems.length === 0) {
            alert("Your cart is empty. Please add products to the cart.");
            return;
        }
        window.location.href = "checkout.html";
    });

    // Checkout form validation
    document.getElementById("checkout-form")?.addEventListener("submit", (e) => {
        e.preventDefault();
        const name = document.getElementById("name").value;
        const address = document.getElementById("address").value;
        const email = document.getElementById("email").value;

        if (name && address && email) {
            alert("Order Confirmed! Thank you for your purchase.");
            localStorage.removeItem("cart"); // Clear the cart
            window.location.href = "index.html"; // Redirect to home
        } else {
            alert("Please fill in all fields.");
        }
    });

    // Add to cart functionality
    if (addToCartButtons) {
        addToCartButtons.forEach(button => {
            button.addEventListener("click", () => {
                const productElement = button.closest(".product");
                const productName = productElement.getAttribute("data-name");
                const productPrice = parseFloat(productElement.getAttribute("data-price"));

                const existingItem = cartItems.find(item => item.name === productName);
                if (existingItem) {
                    existingItem.quantity += 1;
                } else {
                    cartItems.push({ name: productName, price: productPrice, quantity: 1 });
                }

                saveCart();
                alert(`${productName} has been added to your cart.`);
            });
        });
    }

    updateCart();
});
