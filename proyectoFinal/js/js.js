const divProducts = document.getElementById('productos')
//const finishButton = document.getElementById('finalizar')

//funcion que ejecute el fetch all products

const fetchProducts = async () => {
    const productsApi = await fetch(`https://fakestoreapi.com/products`)
    const productsJSON = await productsApi.json()
    //console.log(productsJSON);
    return productsJSON
}

//fetch only Products

const fetchOneProduct = async (id) => {
    const productApi = await fetch(`https://fakestoreapi.com/products/${id}`)
    const productJSON = await productApi.json()
    //console.log(productJSON);
    return productJSON
}

//fetchProducts()
//Funcion para reindex products

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

renderProducts()

let cart = []

const addProduct = async (id) => {
    const product = await fetchOneProduct(id)
    const searchProductCart = cart.find(prod => prod.id === product.id)
    if (!searchProductCart) {
        cart.push({
            id: product.id,
            name: product.title,
            quantity: 1,
            price: product.price
        })
    } else {
        searchProductCart.quantity++
    }
    messageAddProduct()
    console.log(cart);

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

//Finalizar compra

//boton finalizar compra

const botonFinalizar = document.querySelector('#finalizar')
const thead = document.querySelector('thead')
const tbody = document.querySelector('tbody')
botonFinalizar.onclick = () => {
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

}
//mensajes con SweetAlert
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
