const divProducts = document.getElementById("productos");
const botonFinalizar = document.querySelector("#finalizar");
const thead = document.querySelector("thead");
const tbody = document.querySelector("tbody");
const sumaTotal = document.querySelector("#suma");

let cart = [];

const fetchProducts = async () => {
  const productsApi = await fetch(`https://fakestoreapi.com/products`);
  const productsJSON = await productsApi.json();
  return productsJSON;
};

const fetchOneProduct = async (id) => {
  const productApi = await fetch(`https://fakestoreapi.com/products/${id}`);
  const productJSON = await productApi.json();
  return productJSON;
};

const renderProducts = async () => {
  const products = await fetchProducts();
  products.forEach((prod) => {
    const { id, title, price, category, image } = prod;
    divProducts.innerHTML += `
        <div class="card tamano">
            <img src="${image}" class="card-img-top p-2" alt="...">
            <div class="card-body p-2">
                <h5 class="card-title">${title}</h5>
                <p class="card-text">${price} ${category}</p>
                <button id:${id} onclick="addProduct(${id})">Agregar</button>
                <button id:${id} onclick="removeProduct(${id})">Quitar</button>
            </div>
        </div>
        `;
  });
};

const addProduct = async (id) => {
  const product = await fetchOneProduct(id);
  const searchProductCart = cart.find((prod) => prod.id === product.id);
  if (!searchProductCart) {
    cart.push({
      id: product.id,
      title: product.title,
      quantity: 1,
      price: product.price,
      category: product.category,
    });
  } else {
    searchProductCart.quantity++;
  }
  messageAddProduct();
};

const removeProduct = (id) => {
  const searchProductCart = cart.find((prod) => prod.id === id);
  if (!searchProductCart) {
    messageNoProduct();
  } else {
    if (searchProductCart.quantity === 1) {
      cart = cart.filter((prod) => prod.id !== id);
    } else {
      searchProductCart.quantity--;
    }
    messageRemoveProduct();
  }

  //console.log(cart);
};

let totalCompra = 0;
const finalizarCompra = () => {
  divProducts.remove();
  botonFinalizar.remove();
  thead.innerHTML = `<tr class="colores">
        <th scope="col">ID</th>
        <th scope="col">TITLE</th>
        <th scope="col">PRICE</th>
        <th scope="col">CATEGORY</th>
        <th scope="col">CANTIDAD</th>
    </tr>`;

  cart.forEach((prod) => {
    totalCompra += prod.quantity * prod.price;
    tbody.innerHTML += `
        <tr class="colorestr">
            <td>${prod.id}</td>
            <td>${prod.title}</td>
            <td>${prod.price}</td>
            <td>${prod.category}</td>
            <td>${prod.quantity * prod.price}</td>   
        </tr>`;
    messageTotalProduct();
  });

  if (totalCompra === 0) {
    sumaTotal.innerHTML = `<== NO SE ENCONTRARON PRODUCTOS SELECCIONADOS ==> `;
  } else {
    sumaTotal.innerHTML = `Total de compra es S/ ${totalCompra}`;
  }
};

renderProducts();

botonFinalizar.onclick = finalizarCompra;

const messageAddProduct = () => {
  swal.fire({
    icon: "success",
    text: "Product Added",
    timer: 800,
  });
};

const messageRemoveProduct = () => {
  swal.fire({
    icon: "warning",
    text: "Product Remove",
    timer: 800,
  });
};

const messageNoProduct = () => {
  swal.fire({
    icon: "error",
    text: "Product no found",
    timer: 800,
  });
};

const messageTotalProduct = () => {
  Swal.fire({
    icon: "info",
    html: `<h3>LA suma total del Carrito de compras</h3>
                ${totalCompra}`,
    timer: 1500,
  });
};
