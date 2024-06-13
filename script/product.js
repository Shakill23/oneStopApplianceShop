// year
document.querySelector('[year]').textContent = new Date().getUTCFullYear();

let container = document.querySelector('[ourStore]');
let searchProduct = document.querySelector('[searchProduct]');
let highSort = document.querySelector('[highSort]');
let lowSort = document.querySelector('[lowSort]');
let spinner = document.querySelector('[spinner]');

// Initialize products and checkoutItems from local storage or default to empty arrays
let products = JSON.parse(localStorage.getItem('products')) || [];
let checkoutItems = JSON.parse(localStorage.getItem('checkout')) || [];

function saveProductsToLocalStorage(productsArray) {
    localStorage.setItem('products', JSON.stringify(productsArray));
}

function saveCheckoutItemsToLocalStorage(checkoutItemsArray) {
    localStorage.setItem('checkout', JSON.stringify(checkoutItemsArray));
}

function displayProducts(productsArray) {
    container.innerHTML = "";
    try {
        productsArray.forEach(product => {
            container.innerHTML += `
                <div class="card">
                    <img src="${product.img_url}" class="card-img-top" alt="${product.productName}" loading='lazy'>
                    <div class="card-body">
                        <h5 class="card-title">${product.productName}</h5>
                        <p class="card-text">${product.category}</p>
                        <p class="card-text">
                            <span class="text-success fw-bold">Amount</span>
                            R${product.amount}
                        </p>
                        <button type='button' class="btn btn-success" onclick='addToCart(${JSON.stringify(product)})'>Add to cart</button>
                    </div>
                </div>
            `;
        });
    } catch (e) {
        container.textContent = "Please try again later";
        console.error("Error displaying products:", e);
    }
}
displayProducts(products);

// Keyup search functionality
searchProduct.addEventListener('keyup', () => {
    try {
        if (searchProduct.value.length < 1) {
            displayProducts(products);
            return;
        }
        let searchValue = searchProduct.value.toLowerCase();
        let filteredProducts = products.filter(product => 
            product.productName.toLowerCase().includes(searchValue) || 
            product.category.toLowerCase().includes(searchValue)
        );
        displayProducts(filteredProducts);
        if (!filteredProducts.length) throw new Error(`"${searchProduct.value}" product was not found`);
    } catch (e) {
        container.textContent = e.message || 'Please try again later';
    }
});

// Sorting by amount
let isToggle = false;

highSort.addEventListener('click', () => {
    try {
        if (!products) throw new Error('Please try again later');
        products.sort((a, b) => b.amount - a.amount);
        displayProducts(products);
        isToggle = true;
    } catch (e) {
        container.textContent = e.message || 'We are working on this issue';
    }
});

lowSort.addEventListener('click', () => {
    try {
        if (!products) throw new Error('Please try again later');
        products.sort((a, b) => a.amount - b.amount);
        displayProducts(products);
        isToggle = false;
    } catch (e) {
        container.textContent = e.message || 'We are working on this issue';
    }
});

// Add to cart with quantity check
function addToCart(product) {
    try {
        const existingProductIndex = checkoutItems.findIndex(item => item.id === product.id);
        if (existingProductIndex !== -1) {
            checkoutItems[existingProductIndex].quantity++;
        } else {
            product.quantity = 1;
            checkoutItems.push(product);
        }
        saveCheckoutItemsToLocalStorage(checkoutItems);
    } catch (e) {
        console.error("Unable to add to cart:", e);
        alert("Unable to add to cart");
    }
}

// Function to delete all data (for testing or cleanup)
function deleteAllData() {
    spinner.classList.remove('d-none');
    setTimeout(() => {
        localStorage.clear(); // Clear all local storage
        products = []; // Clear products array
        checkoutItems = []; // Clear checkout items array
        displayProducts(products); // Update displayed products (should be empty)
        spinner.classList.add('d-none'); // Hide spinner
    }, 2000);
}
