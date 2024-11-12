document.addEventListener("DOMContentLoaded", () => {
    const cartItems = [];
    const cartList = document.getElementById("cart-items");
    const totalPriceElement = document.getElementById("total-price");
    const addToCartButtons = document.querySelectorAll(".add-to-cart");
    const viewDetailsButtons = document.querySelectorAll(".view-details");
    const modal = document.getElementById("product-modal");
    const closeModal = document.querySelector(".close");
    const modalProductName = document.getElementById("modal-product-name");
    const modalProductDescription = document.getElementById("modal-product-description");
    const modalProductPrice = document.getElementById("modal-product-price");

    // Add to cart functionality
    addToCartButtons.forEach(button => {
        button.addEventListener("click", () => {
            const productElement = button.parentElement;
            const productName = productElement.getAttribute("data-name");
            const productPrice = parseFloat(productElement.getAttribute("data-price"));

            const existingItem = cartItems.find(item => item.name === productName);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cartItems.push({ name: productName, price: productPrice, quantity: 1 });
            }

            updateCart();
        });
    });

    function updateCart() {
        if (cartList) {
            cartList.innerHTML = "";
            let totalPrice = 0;

            cartItems.forEach((item, index) => {
                totalPrice += item.price * item.quantity;
                const listItem = document.createElement("li");
                listItem.innerHTML = `
                    ${item.name} - ₹${item.price} x ${item.quantity}
                    <button class="remove-item" data-index="${index}">Remove</button>
                `;
                cartList.appendChild(listItem);
            });

            if (totalPriceElement) {
                totalPriceElement.textContent = `Total: ₹${totalPrice}`;
            }

            document.querySelectorAll(".remove-item").forEach(button => {
                button.addEventListener("click", (e) => {
                    const itemIndex = parseInt(e.target.getAttribute("data-index"));
                    cartItems.splice(itemIndex, 1);
                    updateCart();
                });
            });
        }
    }

    // View product details in modal
    viewDetailsButtons.forEach(button => {
        button.addEventListener("click", () => {
            const productElement = button.parentElement;
            const productName = productElement.getAttribute("data-name");
            const productDescription = productElement.getAttribute("data-description");
            const productPrice = productElement.getAttribute("data-price");

            if (modal) {
                modalProductName.textContent = productName;
                modalProductDescription.textContent = productDescription;
                modalProductPrice.textContent = `Price: ₹${productPrice}`;
                modal.classList.remove("hidden");
            }
        });
    });

    if (closeModal) {
        closeModal.addEventListener("click", () => {
            modal.classList.add("hidden");
        });
    }

    if (document.getElementById("checkout")) {
        document.getElementById("checkout").addEventListener("click", () => {
            alert("Thank you for your purchase!");
            cartItems.length = 0;
            updateCart();
        });
    }
});
