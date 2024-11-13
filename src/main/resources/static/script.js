// Initialize an empty cart or load the existing cart from localStorage
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Function to update cart UI and display the cart item count
function updateCartUI() {
    const cartCount = document.getElementById('cart-count');
    if (cartCount) {
        cartCount.innerText = cart.length;  // Update the cart item count
    }
}

// Add event listener for "Add to Cart" buttons
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', function() {
        const product = this.parentElement;  // Get the product div
        const productName = product.getAttribute('data-name');  // Get the product name
        const productPrice = parseInt(product.getAttribute('data-price'));  // Get the product price

        // Add product to the cart array
        cart.push({ name: productName, price: productPrice });

        // Store the updated cart in localStorage
        localStorage.setItem('cart', JSON.stringify(cart));

        // Show an alert to the user that the product was added
        alert(`${productName} has been added to your cart.`);

        // Update the cart UI
        updateCartUI();
    });
});

// Handle the "View Cart" functionality (from cart.html or index.html)
document.getElementById('view-cart')?.addEventListener('click', function() {
    // Redirect to the cart page
    window.location.href = 'cart.html';
});

// Handle cart page and display items in the cart
if (window.location.pathname.includes('cart.html')) {
    const cartSection = document.getElementById('cart-items');
    const checkoutButton = document.getElementById('checkout-btn');

    // If cart is empty, display a message
    if (cart.length === 0) {
        cartSection.innerHTML = '<p>Your cart is empty.</p>';
        checkoutButton.disabled = true;
    } else {
        // Otherwise, display cart items
        cartSection.innerHTML = '';  // Clear the cart display

        let total = 0;

        cart.forEach(item => {
            const productDiv = document.createElement('div');
            productDiv.classList.add('cart-item');
            productDiv.innerHTML = `
                <p>${item.name} - ₹${item.price}</p>
                <button class="remove-from-cart">Remove</button>
            `;
            cartSection.appendChild(productDiv);

            total += item.price;

            // Add event listener to remove item from the cart
            productDiv.querySelector('.remove-from-cart').addEventListener('click', function() {
                // Remove item from cart
                cart = cart.filter(cartItem => cartItem.name !== item.name);
                // Update localStorage with the new cart
                localStorage.setItem('cart', JSON.stringify(cart));

                updateCartUI();  // Update cart UI
                productDiv.remove();  // Remove product from UI
                total -= item.price;  // Recalculate total
                updateTotal(total);
            });
        });

        // Show the total amount
        updateTotal(total);
    }

    // Handle Checkout button click
    checkoutButton.addEventListener('click', function() {
        alert('Proceeding to checkout...');
        // Here, you can implement a more advanced checkout flow, e.g., payment gateway integration
    });
}

// Function to update the total price in the cart
function updateTotal(total) {
    const totalElement = document.getElementById('total-price');
    totalElement.innerText = `Total: ₹${total}`;
}

// Call the updateCartUI function on page load to initialize the cart icon count
updateCartUI();
