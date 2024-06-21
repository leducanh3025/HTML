// products.js
let products = [
    {
        name: 'Rolex Gold',
        price: '$ 50.90',
        image: 'imges/watch1.webp',
        alt: 'Watch 1'
    },
    {
        name: 'Rolex Daytona',
        price: '$ 30.00',
        image: 'imges/watch2.webp',
        alt: 'Watch 2'
    },
    {
        name: 'Rolex Datejust',
        price: '$ 45.74',
        image: 'imges/watch3.webp',
        alt: 'Watch 3'
    },
    {
        name: 'Carnival Rose Gold',
        price: '$ 49.74',
        image: 'imges/watch5.webp',
        alt: 'Watch 4'
    },
    {
        name: 'Omega True White',
        price: '$ 35.00',
        image: 'imges/42420372002001-1-1712495902.webp',
        alt: 'Watch 5'
    },
    {
        name: 'Bonest Gatti',
        price: '$ 60.00',
        image: 'imges/bg5605-a2-1-1712498961.webp',
        alt: 'Watch 6'
    },
    {
        name: 'Tissot Whitte Duck',
        price: '$ 55.50',
        image: 'imges/dong-ho-tissot-t086-408-22-036-00-cl1-1712485844.webp',
        alt: 'Watch 7'
    },
    {
        name: 'Casio Black Panther',
        price: '$ 52.44',
        image: 'imges/mtp-1374l-1avdf_1718337912.webp',
        alt: 'Watch 8'
    },
    {
        name: 'Clock For Men',
        price: '$ 25.50',
        image: 'imges/op990-45adgs-gl-d-1-1655171691816-1712491806.webp',
        alt: 'Watch 9'
    },
    // Thêm sản phẩm mới vào đây
];

document.addEventListener('DOMContentLoaded', function () {
    filterProductsByPrice('default');
});

function generateAllProductHTML(products) {
    return products.map(generateProductHTML).join('');
}

function generateProductHTML(product) {
    return `
        <div class="col-xl-4 col-lg-4 col-md-6 col-sm-6 mt-5">
            <div class="single-items mb-50 text-center">
                <div class="item-img">
                    <div class="favicon">
                        <i class="fa-regular fa-heart fa-2x"></i>
                    </div>
                    <img src="${product.image}" alt="${product.alt}">
                    <div class="img-cap">
                        <p class="addcart" onclick="openPopup()">Add to cart</p>
                    </div>
                </div>
                <div class="item-caption py-4">
                    <h3><a href="product_details.html">${product.name}</a></h3>
                    <span class="price">${product.price}</span>
                </div>
            </div>
        </div>
    `;
}

function generateAllProductHTML(products) {
    return products.map(generateProductHTML).join('');
}

document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function (event) {
        document.querySelectorAll('.nav-link').forEach(otherLink => {
            otherLink.classList.remove('active');
            otherLink.removeAttribute('aria-current');
        });

        this.classList.add('active');
        this.setAttribute('aria-current', 'page');
    });
});

document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function (event) {

        let filterType;
        if (this.textContent.trim() === 'Newest Arrival') {
            filterType = 'newest';
        } else if (this.textContent.trim() === 'Price Low To High') {
            filterType = 'lowToHigh';
        } else if (this.textContent.trim() === 'Price High To Low') {
            filterType = 'HighToLow';
        }

        filterData(filterType);
    });
});

var filteredProducts = [...products];

function filterData(filterType) {
    switch (filterType) {
        case 'newest':
            // Sắp xếp sản phẩm mới nhất
            filteredProducts.sort((a, b) => {
                var numberA = parseInt(a.alt.replace('Watch ', ''));
                var numberB = parseInt(b.alt.replace('Watch ', ''));
                return numberB - numberA; 
            });
            break;
        case 'lowToHigh':
            // Sắp xếp sản phẩm theo 'giá' theo thứ tự tăng dần
            filteredProducts.sort((a, b) => {
                var priceA = parseFloat(a.price.replace('$', ''));
                var priceB = parseFloat(b.price.replace('$', ''));
                return priceA - priceB;
            });
            break;
        case 'HighToLow':
            // Sắp xếp sản phẩm theo 'giá' theo thứ tự giảm dần
            filteredProducts.sort((a, b) => {
                var priceA = parseFloat(a.price.replace('$', ''));
                var priceB = parseFloat(b.price.replace('$', ''));
                return priceB - priceA;
            });
            break;
    }

    document.getElementById('product-list').innerHTML = generateAllProductHTML(filteredProducts);
}

const filterType = localStorage.getItem('filterType');
if (filterType) {
    filterData(filterType);
} else {
    document.getElementById('product-list').innerHTML = generateAllProductHTML(products);
}

document.querySelectorAll('.dropdown-item').forEach(dropdownItem => {
    dropdownItem.addEventListener('click', function (event) {

        document.querySelectorAll('.dropdown-item').forEach(item => {
            item.classList.remove('selected');
        });

        this.classList.add('selected');

        let filterType = this.textContent.trim();

        filterProductsByPrice(filterType);
    });
});

function filterProductsByPrice(filterType) {
    filteredProducts = [...products]; 

    switch (filterType) {
        case 'default':
            break;
        case '$ 10-30':
        case '$ 30-50':
            var prices = filterType.split('-');
            var minPrice = prices[0] ? parseFloat(prices[0].replace('$', '')) : 0;
            var maxPrice = prices[1] ? parseFloat(prices[1]) : Infinity;
            filteredProducts = filteredProducts.filter(product => {
                var productPrice = parseFloat(product.price.replace('$', ''));
                return productPrice >= minPrice && productPrice <= maxPrice;
            });
            break;
        case 'Above $ 50':
            var minPrice = parseFloat(filterType.replace('Above $', ''));
            filteredProducts = filteredProducts.filter(product => {
                var productPrice = parseFloat(product.price.replace('$', ''));
                return productPrice > minPrice;
            });
            break;
    }

    document.getElementById('product-list').innerHTML = generateAllProductHTML(filteredProducts);
}

function openPopup() {
    document.getElementById('cartPopup').style.display = 'block';
}

function closePopup() {
    document.getElementById('cartPopup').style.display = 'none';
}

function confirmAddToCart() {
    closePopup();
    window.location.href = "Cart.html";
}

document.getElementById('product-list').innerHTML = generateAllProductHTML();