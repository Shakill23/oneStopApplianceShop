// year
document.querySelector('[year]').textContent =
    new Date().getUTCFullYear()

    let container = document.querySelector('[ourStore]')
    let searchProduct = document.querySelector('[searchProduct]')
    let highSort = document.querySelector('[highSort]')
    let lowSort = document.querySelector('[lowSort]')
    let spinner = document.querySelector('[spinner]')

    let products = JSON.parse(
        localStorage.getItem('products')
    )
    // items/products 
    let checkoutItems = JSON.parse(localStorage.getItem('checkout'))
        ? JSON.parse(localStorage.getItem('checkout'))
        : []
    
    function displayProducts(args) {
        container.innerHTML = ""
        try {
            args.forEach(product => {
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
                `
            })
    
        } catch (e) {
            container.textContent = "Please try again later"
        }
    }
    displayProducts(products)
    
    // keyup
searchProduct.addEventListener('keyup', () => {
    try {
        if (searchProduct.value.length < 1) {
            displayProducts(products);
            return;
        }
        let searchValue = searchProduct.value.toLowerCase();
        let filteredProduct = products.filter(product => 
            product.productName.toLowerCase().includes(searchValue) || 
            product.category.toLowerCase().includes(searchValue)
        );
        displayProducts(filteredProduct);
        if (!filteredProduct.length) throw new Error(`"${searchProduct.value}" product was not found`);
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

// // add to cart counter
function addToCart(product) {
        checkoutItems.push(product);
        localStorage.setItem('checkout', JSON.stringify(checkoutItems));
        
        updateCounter(checkoutItems.length);
}

// function updateCounter(value) {
//     localStorage.setItem('cartCounter', value); 
//     document.querySelector('[counter]').textContent = value || 0; 
// }



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

    window.onload = () => {
        document.querySelector('[counter]').textContent = checkoutItems.length || 0
    }