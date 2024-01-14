const arr = [];

const loadProducts = (url) => {
   fetch(url)
      .then((res) => res.json())
      .then((data) => {
         arr.push(data);
         showProducts(data);
      });
};

loadProducts('https://fakestoreapi.com/products');

// show all product in UI
const showProducts = (products) => {
   
   setInnerText('total_products', products.length);

   document.getElementById("all-products").innerHTML = "";

   const allProducts = products.slice(0, 10).map((pd) => pd);
   for (const product of allProducts) {
      const image = product.images;
      const div = document.createElement('div');
      div.classList.add('product');
      div.innerHTML = `<div class="single-product">
      <div>
    <img class="product-image" src=${product.image}></img>
      </div>
      <h3>${product.title}</h3>
      <p>Category: ${product.category}</p>
      <h2 id="each-product-price">Price: $ ${product.price}</h2>

      <button onclick="showProductDetails(${product.id})" id="details-btn"    data-bs-toggle="modal"
      data-bs-target="#exampleModal" class="btn btn-outline-secondary mb-2 rounded-1 mt-1">Details</button>
      
      <button onclick="addToCart(${product.id},${product.price})" id="addToCart-btn" class="buy-now btn btn-success border-0 w-100 rounded-0 bg-main py-2">Add to cart</button>
      `;
      document.getElementById('all-products').appendChild(div);
   }
};

let count = 0;

const addToCart = (id, price) => {
   count = count + 1;
   updatePrice(price);

   updateTaxAndCharge();
   document.getElementById('total-Products').innerText = count;
   document.getElementById('price').innerText = price;
};

const showProductDetails = (product_id) => {
   fetch(`https://fakestoreapi.com/products/${product_id}`)
      .then((res) => res.json())
      .then((data) => showProductDetailsInModal(data));
};

const showProductDetailsInModal = (product_details) => {
   //Error or Bugs may be😕
   /* setInnerHtml('exampleModalLabel', product_details.title);
   setInnerText('productId', product_details.id);
   setInnerHtml('modal_body', product_details.description);
   setInnerHtml('rating', product_details.rating.rate); */

   document.getElementById('exampleModalLabel').innerText = product_details.title;
   document.getElementById('productId').innerText = product_details.id;
   document.getElementById('modal_body').innerText = product_details.description;
   document.getElementById('rating').innerText = product_details.rating.rate;
};

const getInputValue = (id) => { 
   return parseFloat(document.getElementById(id).innerText);
};

// main price update function
const updatePrice = (value) => {
   const convertedOldPrice = getInputValue('total');
   const convertPrice = value;
   const total = convertedOldPrice + convertPrice;
   document.getElementById('total').innerText = total.toFixed(2);
};

// set innerText function
const setInnerText = (id, value) => {
   document.getElementById(id).innerText = Math.round(value);
};

// update delivery charge and total Tax
const updateTaxAndCharge = () => {
   const priceConverted = getInputValue('total');
   if (priceConverted > 200) {
      setInnerText('delivery-charge', 30);
      setInnerText('total-tax', priceConverted * 0.2);
   }
   if (priceConverted > 400) {
      setInnerText('delivery-charge', 50);
      setInnerText('total-tax', priceConverted * 0.3);
   }
   if (priceConverted > 500) {
      setInnerText('delivery-charge', 60);
      setInnerText('total-tax', priceConverted * 0.4);
   }
};

//grandTotal update function
const updateTotal = () => {
   const grandTotal =
      getInputValue('price') +
      getInputValue('delivery-charge') +
      getInputValue('total-tax');
   document.getElementById('total').innerText = grandTotal;
};

// search by category
document.getElementById("search-btn").addEventListener("click", function () {
   const inputField = document.getElementById("input-value").value;
   const searchedProduct = arr[0].find((p) =>
     p.category.startsWith(`${inputField}`)
   );
   showProducts(searchedProduct);
 });


//buy now button
document.getElementById('buy-now').addEventListener('click', () => {
   if(document.getElementById('total-Products').innerText == '0'){
      alert('Select item first');
   } else{
      document.getElementById('total-Products').innerText = 0;
      document.getElementById('price').innerText = 0;
      document.getElementById('delivery-charge').innerText = 20;
      document.getElementById('total-tax').innerText = 0;
      document.getElementById('total').innerText = 0;
      const check = confirm('Place order?');
      if(check){
         alert('Your order is in processing');
      } else{
         alert('Your order has been cancelled')
      }
   }
})