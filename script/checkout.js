// year
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
    spinner.classList.remove('d-none');

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
                            <button class="btn btn-danger" onclick="removeFromCart(${index})"><i class="bi bi-trash3"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
  <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"/>
</svg></i></button>
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
        spinner.classList.add('d-none'); 
    }); 
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

 // active class to nav link
const currentLocation = location.href;
const menuItem = document.querySelectorAll('.nav-link');
const menuLength = menuItem.length;

for (let i = 0; i < menuLength; i++) {
    if (menuItem[i].href === currentLocation) {
        menuItem[i].classList.add('is-active');
    }
}
