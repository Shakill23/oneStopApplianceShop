// year
document.querySelector('[year]').textContent = new Date().getUTCFullYear();

let wrapper = document.querySelector('[recentProducts]');
let spinner = document.querySelector('[spinner]');
let products = JSON.parse(localStorage.getItem('products')) ? JSON.parse(localStorage.getItem('products')) : localStorage.setItem('products', JSON.stringify([
    {
        id: 1,
        productName: "Smart Light",
        category: "Miscellaneous Appliance",
        description: "BNETA IoT Smart WiFi LED Bulb Plus",
        amount: 179.00,
        img_url: "https://shakill23.github.io/allImages/images/smartLight1.webp"
    },
    {
        id: 2,
        productName: "Air Fryer",
        category: "Kitchen Appliance",
        description: "Airfryer 3000 Series XL 13-in-1 cooking functions",
        amount: 2199.89,
        img_url: "https://shakill23.github.io/allImages/images/airFryer1.webp"
    },
    {
        id: 3,
        productName: "Speaker",
        category: "Entertainment Appliance",
        description: "JBL Flip 6 Portable Waterproof Bluetooth Speaker",
        amount: 2399,
        img_url: "https://shakill23.github.io/allImages/images/speaker1.webp"
    },
    {
        id: 4,
        productName: "Coffee Maker",
        category: "Kitchen Appliance",
        description: "Famiworths Single Serve Coffee Maker for K Cup & Ground Coffee, With Bold Brew, 6 to 14 oz",
        amount: 747.89,
        img_url: "https://shakill23.github.io/allImages/images/coffeeMaker1.jpg"
    },
    {
        id: 5,
        productName: "Smart TV",
        category: "Entertainment Appliance",
        description: "Samsung 55\" CU7010 4K Smart UHD TV with Smooth Motion Xcelerator",
        amount: 8399,
        img_url: "https://shakill23.github.io/allImages/images/tv1.webp"
    },
    {
        id: 6,
        productName: "Electric Grill",
        category: "Kitchen Appliance",
        description: "Black & Decker 2000W Family Health Grill, Black/Silver | CG2000-B5",
        amount: 1679,
        img_url: "https://shakill23.github.io/allImages/images/grill1.webp"
    },
    {
        id: 7,
        productName: "Milex Bread Master",
        category: "Kitchen Appliance",
        description: "Bake Fresh Homemade Bread Effortlessly with the Milex Bread Master!",
        amount: 2299.95,
        img_url: "https://shakill23.github.io/allImages/images/breadMaker1.webp"
    },
    {
        id: 8,
        productName: "SNOMASTER 15KG AUTOMATIC ICE MAKER",
        category: "Miscellaneous Appliance",
        description: "Space Saving Option That Fits Anywhere. Measuring 414 mm tall and 360 mm wide and weighing 15 kg",
        amount: 3239.99,
        img_url: "https://shakill23.github.io/allImages/images/iceMaker1.webp"
    }
]));

function recentProducts() {
    spinner.classList.remove('d-none');
    setTimeout(() => {
        try {
            let arrSize = products.length;
            let latestProducts = products.reverse().slice(0, arrSize >> 1);
            latestProducts.forEach(product => {
                wrapper.innerHTML += `
                    <div class="card">
                        <img src="${product.img_url}" class="card-img-top" alt="${product.productName}" loading='lazy'>
                        <div class="card-body">
                            <h5 class="card-title">${product.productName}</h5>
                            <p class="card-text">${product.description}</p>
                        </div>
                    </div>
                `;
            });
        } catch (e) {
            wrapper.textContent = "Please contact our administrator";
            setTimeout(() => {
                location.reload();
            }, 2000);
        } finally {
            spinner.classList.add('d-none'); 
        }
    }, 25); 
}

recentProducts();


 
