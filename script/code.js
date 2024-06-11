// year
document.querySelector('[year]').textContent =
    new Date().getUTCFullYear()

// Creating products and storing it in the local storage
let wrapper = document.querySelector('[recentProducts]')
let products =
    JSON.parse(localStorage.getItem('products'))
        ? JSON.parse(localStorage.getItem('products'))
        : localStorage.setItem('products',
            JSON.stringify(
                [
                    {
                        id: 1,
                        productName: "Dell-Latitude",
                        category: "Laptop",
                        description: "Dell Latitude E5450 i3 5th GEN 1 for business. RAM 8GB, HDD 1TB",
                        amount: 20000.89,
                        img_url: "https://i.postimg.cc/65tcMqdc/Dell-Latitude-E5450-i3-5th-GEN-1-for-business-10000.jpg"
                    },
                    {
                        id: 2,
                        productName: "Todo App",
                        category: "Application",
                        description: "Allow you to create, edit, delete, task including sorting tasks by ascending",
                        amount: 30000.89,
                        img_url: "https://codjoelmayer.github.io/allImages/images/todoapp.png"
                    },
                    {
                        id: 3,
                        productName: "Python Programming",
                        category: "Book",
                        description: "Python Programming for Beginners",
                        amount: 990.99,
                        img_url: "https://i.postimg.cc/rFcbKX5p/Python-Programming-for-Beginners-cover.jpg"
                    },
                    {
                        id: 4,
                        productName: "C++",
                        category: "Book",
                        description: "Mastering C++ Programming",
                        amount: 1000,
                        img_url: "https://i.postimg.cc/Ss9zrpfT/Mastering-C-Programming.jpg"
                    },
                    {
                        id: 5,
                        productName: "HP Elite",
                        category: "Laptop",
                        description: "HP Elite Book Intel Core i5 1135G7 SSD 256GB  RAM 8GB",
                        amount: 15000,
                        img_url: "https://i.postimg.cc/7Y83v1PB/HPElite-Book-Intel-Core-i5-1135-G7-256-GBSSD-8-GB.png"
                    }
                ]
            )
        )

function recentProducts() {
    try {
        let arrSize = products.length
        let latestProducts = products.reverse().slice(0, arrSize >> 1)
        latestProducts.forEach(product => {
            wrapper.innerHTML += `
        <div class="card">
            <img src="${product.img_url}" class="card-img-top" alt="${product.productName}" loading='lazy'>
            <div class="card-body">
                <h5 class="card-title">${product.productName}</h5>
                <p class="card-text">${product.description}</p>
            </div>
        </div>
    `
        })
    } catch (e) {
        wrapper.textContent = "Please contact our administrator"
        setTimeout(() => {
            location.reload()
        },
            2000
        )
    }
}
recentProducts()
// Counter
window.onload = () => {
    document.querySelector('[counter]').textContent = JSON.parse(localStorage.getItem('checkout'))
        ? JSON.parse(localStorage.getItem('checkout')).length
        : 0
}