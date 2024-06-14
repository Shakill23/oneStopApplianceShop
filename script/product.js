// year
document.querySelector('[year]').textContent = new Date().getUTCFullYear();

let container = document.querySelector('[ourStore]');
let searchProduct = document.getElementById('searchProduct'); 
let spinner = document.querySelector('[spinner]');

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
    spinner.classList.add('d-none'); 

    setTimeout(() => { 
        spinner.classList.remove('d-none'); 

        try {
            let displayedProductIds = new Set(); 
            let html = ''; 

            productsArray.forEach(product => {
                if (!displayedProductIds.has(product.id)) {
                    html += `
                        <div class="col-12 col-md-6 col-lg-4 mb-4"> <!-- Adjusted columns for responsive layout -->
                            <div class="card h-100">
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
                        </div>
                    `;
                    displayedProductIds.add(product.id); 
                }
            });

            container.innerHTML = `<div class="row">${html}</div>`; 
        } catch (e) {
            container.textContent = "Please try again later";
            console.error("Error displaying products:", e);
        } finally {
            spinner.classList.add('d-none'); 
        }
    }, 1000); 
}

displayProducts(products);

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

document.getElementById('highSort').addEventListener('click', () => { 
    try {
        products.sort((a, b) => b.amount - a.amount);
        displayProducts(products);
    } catch (e) {
        container.textContent = e.message || 'We are working on this issue';
    }
});

document.getElementById('lowSort').addEventListener('click', () => { 
    try {
        products.sort((a, b) => a.amount - b.amount);
        displayProducts(products);
    } catch (e) {
        container.textContent = e.message || 'We are working on this issue';
    }
});

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

function deleteAllData() {
    spinner.classList.remove('d-none'); 

    setTimeout(() => {
        localStorage.clear(); 
        products = []; 
        checkoutItems = []; 
        displayProducts(products); 
        spinner.classList.add('d-none'); 
    }, 2000);
}

 // active class to nav link
const currentLocation = location.href;
const menuItem = document.querySelectorAll('.nav-link');
const menuLength = menuItem.length;

for (let i = 0; i < menuLength; i++) {
    if (menuItem[i].href === currentLocation) {
        menuItem[i].classList.add('is-active');
    }
}
