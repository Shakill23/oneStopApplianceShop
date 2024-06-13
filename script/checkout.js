// year
document.querySelector('[year]').textContent =
    new Date().getUTCFullYear()

let checkoutItems = [];

try {
    checkoutItems = JSON.parse(localStorage.getItem('checkout')) || [];
} catch (error) {
    console.error('Error parsing checkout items:', error);
}

function displayCheckoutItems() {
    const checkoutContainer = document.getElementById('checkoutItems');
    checkoutContainer.innerHTML = '';

    try {
        checkoutItems.forEach((item, index) => {
            const itemElement = document.createElement('div');
            itemElement.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
            itemElement.innerHTML = `
                    <div>
                        <h5>${item.productName}</h5>
                        <p class="mb-0">Category: ${item.category || 'N/A'}</p>
                        <p class="mb-0">Amount: R${item.amount}</p>
                    </div>
                    <button class="btn btn-danger" onclick="removeFromCart(${index})">Remove</button>
                `;
            checkoutContainer.appendChild(itemElement);
        });

        if (checkoutItems.length === 0) {
            checkoutContainer.innerHTML = '<p class="text-center">Your cart is empty.</p>';
        }
    } catch (error) {
        console.error('Error displaying checkout items:', error);
        checkoutContainer.innerHTML = '<p class="text-center text-danger">An error occurred while displaying checkout items.</p>';
    }
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
        alert('Proceeding to payment...');
        
    } catch (error) {
        console.error('Error proceeding to payment:', error);
    }
}

window.onload = displayCheckoutItems;

