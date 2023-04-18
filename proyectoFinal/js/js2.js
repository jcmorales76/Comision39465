const divProducts = document.getElementById('productos')
const botonFinalizar = document.querySelector('#finalizar')
const thead = document.querySelector('thead')
const tbody = document.querySelector('tbody')
let cart = []

const fetchProducts = async () => {
    const productsApi = await fetch(`https://fakestoreapi.com/products`)
    const productsJSON = await productsApi.json()
    return productsJSON
}

const fetchOneProduct = async (id) => {
    const productApi = await fetch(`https://fakestoreapi.com/products/${id}`)
    const productJSON = await productApi.json()
    return productJSON
}

const renderProducts = async () => {
    const products = await fetchProducts()
    products.forEach((prod) => {
        const { id, title, price, category, image } = prod
        divProducts.innerHTML += `
        <div class="card tamano">
            <img src="${image}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${title}</h5>
                <p class="card-text">${price} ${category}</p>
                <button id:${id} onclick="addProduct(${id})">Agregar</button>
                <button id:${id} onclick="removeProduct(${id})">Quitar</button>
            </div>
        </div>
        `
    })
}

const addProduct = async (id) => {
    const product = await fetchOneProduct(id)
    const searchProductCart = cart.find(prod => prod.id === product.id)
    if (!searchProductCart) {
        cart.push({
            id: product.id,
            title: product.title,
            quantity: 1,
            price: product.price,
            category: product.category
        })
    } else {
        searchProductCart.quantity++
    }
    messageAddProduct()
}

const removeProduct = (id) => {
    const searchProductCart = cart.find(prod => prod.id === id)
    if (!searchProductCart) {
        messageNoProduct()
    } else {
        if (searchProductCart.quantity === 1) {
            cart = cart.filter((prod)=> prod.id !== id)
        } else {
            searchProductCart.quantity--
        }
        messageRemoveProduct()
    }

    console.log(cart);
}

const finalizarCompra = () => {
    divProducts.remove()
    botonFinalizar.remove()
    thead.innerHTML = `<tr class="colores">
        <th scope="col">ID</th>
        <th scope="col">TITLE</th>
        <th scope="col">PRICE</th>
        <th scope="col">CATEGORY</th>
        <th scope="col">CANTIDAD</th>
    </tr>`

    cart.forEach(prod => {
        tbody.innerHTML += `
        <tr class="colorestr">
            <td>${prod.id}</td>
            <td>${prod.title}</td>
            <td>${prod.price}</td>
            <td>${prod.category}</td>
            <td>${prod.quantity}</td>
        </tr>`
    })
}

renderProducts()

botonFinalizar.onclick = finalizarCompra

const messageAddProduct = ()=>{
    swal.fire({
        icon: 'success',
        text:'Product Added',
        timer:1000
    })
}

const messageRemoveProduct = ()=>{
    swal.fire({
        icon: 'warning',
        text:'Product Remove',
        timer:1000
    })
}

const messageNoProduct = ()=>{
    swal.fire({
        icon: 'error',
        text:'Product no found',
        timer:1000
    })
}