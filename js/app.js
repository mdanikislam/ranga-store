const loadProducts = () => {
  const url = `https://fakestoreapi.com/products`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => showProducts(data));
};
loadProducts();


// show all product in ui 
const showProducts = (products) => {
  const allProducts = products.map((pd) => pd);
  for (const product of allProducts) {
    // resolved images
    const image = product.image;
    const title = product.title.slice(0, 15) + '...';
    const div = document.createElement("div");
    div.classList.add("product");
    div.innerHTML = `<div class="single-product">
      <div style="background-color:#fff;border-radius: 10px 10px 0px 0px;padding: 10px 0px;">
        <img class="product-image" src=${image}></img>
      </div>
      <h3>${title}</h3>
      <p style="text-transform: capitalize;">Category: ${product.category}</p>
      <h4>Rating: ${product.rating.rate}/${product.rating.count}</h4>
      <h2>Price: $ ${product.price}</h2>
      <button onclick="addToCart(${product.id},${product.price})" id="addToCart-btn" class="buy-now btn btn-success">Add to cart</button>
      
      <button onclick="productShow(${product.id})" type="button" class="btn btn-danger" data-toggle="modal" data-target="#myModal">
        Details
      </button>
      `;
    document.getElementById("all-products").appendChild(div);
  }
};
let count = 0;
const addToCart = (id, price) => {
  count = count + 1;
  updatePrice("price", price);

  updateTaxAndCharge();
  // update total value
  updateTotal();
  document.getElementById("total-Products").innerText = count;
};

const getInputValue = (id) => {
  const element = document.getElementById(id).innerText;
  // get float value
  const converted = parseFloat(element);
  return converted;
};

// main price update 
const updatePrice = (id, value) => {
  const convertedOldPrice = getInputValue(id);
  const convertPrice = parseFloat(value);
  const total = convertedOldPrice + convertPrice;
  // fixd 2 value after .
  document.getElementById(id).innerText = total.toFixed(2);
};

const setInnerText = (id, value) => {
  // fixd 2 value after .
  document.getElementById(id).innerText = value.toFixed(2);
};

// update delivery charge and total Tax
const updateTaxAndCharge = () => {
  const priceConverted = getInputValue("price");
  if (priceConverted > 200) {
    setInnerText("delivery-charge", 30);
    setInnerText("total-tax", priceConverted * 0.2);
  }
  if (priceConverted > 400) {
    setInnerText("delivery-charge", 50);
    setInnerText("total-tax", priceConverted * 0.3);
  }
  if (priceConverted > 500) {
    setInnerText("delivery-charge", 60);
    setInnerText("total-tax", priceConverted * 0.4);
  }
};

//grandTotal update function
const updateTotal = () => {
  const grandTotal = getInputValue("price") + getInputValue("delivery-charge") + getInputValue("total-tax");
  document.getElementById("total").innerText = grandTotal.toFixed(2);
};

// single product show
const productShow = (id) => {
  const url = `https://fakestoreapi.com/products/${id}`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => productShowDetails(data));
}
// single product show details
const productShowDetails = (product) => {
  const { title, description, category, image, rating, price } = product;
  getElementByIdName('product_title').innerText = title;
  getElementByIdName('product_description').innerText = description;
  getElementByIdName('product_image').src = image;
  getElementByIdName('product_category').innerText = category;
  getElementByIdName('product_price').innerText = price;
  getElementByIdName('product_rating_rate').innerText = rating.rate;
  getElementByIdName('product_rating_count').innerText = rating.count;
};
// get element by id
const getElementByIdName = id => {
  return document.getElementById(id);
}

