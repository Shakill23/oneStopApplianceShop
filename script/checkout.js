document.querySelector('[year]').textContent = new Date().getUTCFullYear();

let checkoutItems = [];
let spinner = document.querySelector('[spinner]');

try {
    checkoutItems = JSON.parse(localStorage.getItem('checkout')) || [];
} catch (error) {
    console.error('Error parsing checkout items:', error);
}

// Function to update the total amount
function updateTotal() {
    const totalAmount = checkoutItems.reduce((total, item) => total + item.amount * item.quantity, 0);
    document.getElementById('totalAmount').textContent = `Total: R${totalAmount.toFixed(2)}`;
}

function displayCheckoutItems() {
    const checkoutContainer = document.getElementById('checkoutItems');
    checkoutContainer.innerHTML = '';
    spinner.classList.remove('d-none'); // Show spinner while loading checkout items

    setTimeout(() => {
        try {
            checkoutItems.forEach((item, index) => {
                const amount = item.amount * item.quantity;

                const itemElement = `
                    <tr>
                        <td>${item.productName}</td>
                        <td>${item.category || 'N/A'}</td>
                        <td>R${item.amount.toFixed(2)}</td>
                        <td>
                            <button class="btn btn-sm btn-primary" onclick="updateQuantity(${index}, -1)">-</button>
                            <span>${item.quantity}</span>
                            <button class="btn btn-sm btn-primary" onclick="updateQuantity(${index}, 1)">+</button>
                        </td>
                        <td>R${amount.toFixed(2)}</td>
                        <td>
                            <button class="btn btn-danger" onclick="removeFromCart(${index})">Remove</button>
                        </td>
                    </tr>
                `;
                checkoutContainer.insertAdjacentHTML('beforeend', itemElement);
            });

            if (checkoutItems.length === 0) {
                checkoutContainer.innerHTML = '<tr><td colspan="6" class="text-center">Your cart is empty.</td></tr>';
            }

            updateTotal();

        } catch (error) {
            console.error('Error displaying checkout items:', error);
            checkoutContainer.innerHTML = '<tr><td colspan="6" class="text-center text-danger">An error occurred while displaying checkout items.</td></tr>';
        }
        spinner.classList.add('d-none'); // Hide spinner once the items are displayed
    }, 25); // Add a delay of 500ms to ensure the spinner is visible
}

function removeFromCart(index) {
    try {
        checkoutItems.splice(index, 1);
        localStorage.setItem('checkout', JSON.stringify(checkoutItems));
        displayCheckoutItems();
    } catch (error) {
        console.error('Error removing item from cart:', error);
    }
}

function clearCart() {
    try {
        checkoutItems = [];
        localStorage.setItem('checkout', JSON.stringify(checkoutItems));
        displayCheckoutItems();
    } catch (error) {
        console.error('Error clearing cart:', error);
    }
}

function proceedToPayment() {
    try {
        alert('Thank you for purchasing');
    } catch (error) {
        console.error('Error proceeding to payment:', error);
    }
}

function updateQuantity(index, change) {
    try {
        checkoutItems[index].quantity += change;
        if (checkoutItems[index].quantity <= 0) {
            checkoutItems.splice(index, 1);
        }
        localStorage.setItem('checkout', JSON.stringify(checkoutItems));
        displayCheckoutItems();
    } catch (error) {
        console.error('Error updating quantity:', error);
    }
}

window.onload = displayCheckoutItems;
