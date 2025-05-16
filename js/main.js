"use strict"
console.log ("Holi Yanelis estoy comprobando que está conectado el js")
const url= "https://fakestoreapi.com/products";


const productContainer = document.querySelector(".js-product-container");
let products = [];
const searchButton = document.querySelector(".js-search-button");

function renderProducts(products) {
    for (let product of products) {
        const card = document.createElement("div");
        card.classList.add("card");
        card.innerHTML = `
            <img src="${product.image}" alt="${product.title}">
            <p>${product.title}</p>
            <p>Price: $${product.price}</p>
            <button class="js-add-to-cart" data-id="${product.id}">Comprar</button>
        `;
        productContainer.appendChild(card);
    }

}


const handleClick = (event) => {
    event.preventDefault();
    console.log("he hecho click")
    let valueSearch = document.querySelector(".js-search-input").value;
    console.log(valueSearch);
    const filteredProducts = products.filter(product => product.title.toLowerCase().includes(valueSearch.toLowerCase()));
    productContainer.innerHTML = ""; 
    console.log(filteredProducts);

    renderProducts(filteredProducts);

}
searchButton.addEventListener("click", handleClick);





fetch(url)
.then(response => response.json())
.then(data => {
console.log(data);
products = data;
renderProducts(products);
});
  


