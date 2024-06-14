// Display the current year in the footer
document.querySelector('[year]').textContent = new Date().getUTCFullYear();

let products = JSON.parse(localStorage.getItem('products')) || [];
let editIndex = null;
let spinner = document.querySelector('[spinner]');

// Constructor function for Product
function Product(productName, img_url, category, amount) {
    this.productName = productName;
    this.img_url = img_url;
    this.category = category;
    this.amount = amount;
}

function displayProducts() {
    const productTable = document.getElementById('productTable');
    productTable.innerHTML = '';
    spinner.classList.remove('d-none'); // Show spinner while loading products

    setTimeout(() => {
        products.forEach((product, index) => {
            const productRow = `
                <tr>
                    <td>${product.productName}</td>
                    <td><img src="${product.img_url}" class="img-fluid" alt="${product.productName}" style="max-width: 100px;"></td>
                    <td>${product.category}</td>
                    <td>R${product.amount.toFixed(2)}</td>
                    <td>
                        <button class="btn btn-warning btn-sm" data-bs-toggle="modal" data-bs-target="#editProductModal" onclick="editProduct(${index})">Edit</button>
                        <button class="btn btn-danger btn-sm" onclick="deleteProduct(${index})">Delete</button>
                    </td>
                </tr>
            `;
            productTable.insertAdjacentHTML('beforeend', productRow);
        });
        spinner.classList.add('d-none'); // Hide spinner once the products are displayed
    }, 25); // Add a delay of 25ms to ensure the spinner is visible
}

function validateImageURL(url) {
    return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => resolve(true);
        img.onerror = () => resolve(false);
        img.src = url;
    });
}

async function addProduct(event) {
    event.preventDefault();
    const newProduct = new Product(
        document.getElementById('productName').value,
        document.getElementById('productImage').value,
        document.getElementById('productCategory').value,
        parseFloat(document.getElementById('productPrice').value)
    );

    const isValidImage = await validateImageURL(newProduct.img_url);
    if (!isValidImage) {
        alert('Please provide a valid image URL');
        return;
    }

    products.push(newProduct);
    localStorage.setItem('products', JSON.stringify(products));
    const addProductModal = new bootstrap.Modal(document.getElementById('addProductModal'));
    addProductModal.hide();
    displayProducts();
    document.getElementById('addProductForm').reset();
}

function editProduct(index) {
    editIndex = index;
    const product = products[index];
    document.getElementById('editProductName').value = product.productName;
    document.getElementById('editProductImage').value = product.img_url;
    document.getElementById('editProductCategory').value = product.category;
    document.getElementById('editProductPrice').value = product.amount;
}

async function saveEditProduct(event) {
    event.preventDefault();
    const editedProduct = new Product(
        document.getElementById('editProductName').value,
        document.getElementById('editProductImage').value,
        document.getElementById('editProductCategory').value,
        parseFloat(document.getElementById('editProductPrice').value)
    );

    const isValidImage = await validateImageURL(editedProduct.img_url);
    if (!isValidImage) {
        alert('Please provide a valid image URL');
        return;
    }

    products[editIndex] = editedProduct;
    localStorage.setItem('products', JSON.stringify(products));
    const editProductModal = new bootstrap.Modal(document.getElementById('editProductModal'));
    editProductModal.hide();
    displayProducts();
}

function deleteProduct(index) {
    products.splice(index, 1);
    localStorage.setItem('products', JSON.stringify(products));
    displayProducts();
}

function sortByName(option) {
    switch (option) {
        case 'az':
            products.sort((a, b) => a.productName.localeCompare(b.productName));
            break;
        case 'za':
            products.sort((a, b) => b.productName.localeCompare(a.productName));
            break;
        default:
            // Default to sorting A-Z
            products.sort((a, b) => a.productName.localeCompare(b.productName));
            break;
    }
    displayProducts();
}

document.getElementById('addProductForm').addEventListener('submit', addProduct);
document.getElementById('editProductForm').addEventListener('submit', saveEditProduct);

window.onload = displayProducts;
