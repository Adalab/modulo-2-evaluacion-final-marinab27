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
    let addToCartButton = document.querySelectorAll(".js-add-to-cart");
    addToCartButton.addEventListener("click", handleAddToCart);
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



const handleAddToCart = (event) => {
    event.preventDefault();
    console.log("he hecho click en el botón de comprar");

}




//1) al hacer click: el color del boton cambia y cambia el texto a Eliminar. Opción 1: que haya dos botones y con if else alternarlos. Opción 2: agregarle una clase diferente de css al hacer click.

//2) Hacer que el div vacío que hay en el carro contenga los productos que clickemos. para eso hay que crear un array vacío y meterle los productos que vayan al carro. y pintarlos. 



fetch(url)
.then(response => response.json())
.then(data => {
console.log(data);
products = data;
renderProducts(products);
});
  


