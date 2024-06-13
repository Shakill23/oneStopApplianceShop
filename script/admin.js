// year
document.querySelector('[year]').textContent =
    new Date().getUTCFullYear()

let products = JSON.parse(localStorage.getItem('products')) || [];
let editIndex = null;

function displayProducts() {
    const productTable = document.getElementById('productTable');
    productTable.innerHTML = '';

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
    const newProduct = {
        productName: document.getElementById('productName').value,
        img_url: document.getElementById('productImage').value,
        category: document.getElementById('productCategory').value,
        amount: parseFloat(document.getElementById('productPrice').value)
    };

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
    const editedProduct = {
        productName: document.getElementById('editProductName').value,
        img_url: document.getElementById('editProductImage').value,
        category: document.getElementById('editProductCategory').value,
        amount: parseFloat(document.getElementById('editProductPrice').value)
    };

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

function sortProducts() {
    products.sort((a, b) => a.productName.localeCompare(b.productName));
    displayProducts();
}

document.getElementById('addProductForm').addEventListener('submit', addProduct);
document.getElementById('editProductForm').addEventListener('submit', saveEditProduct);

window.onload = displayProducts;
