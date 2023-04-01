divAeronaves.remove()

const formulario = document.getElementById("formulario")
const inputNombre = document.getElementById("nombre")
const inputAoellido = document.getElementById("apellido")
const titulo = document.getElementById("titulo")
//REcuperamos datos de DivAeronaves
const divAeronaves = document.getElementById("divAeronaves")
const botoncito = document.getElementById("botoncito")


botoncito.remove()


//Boton Ingresar
formulario.onsubmit = (e) => {
    e.preventDefault()
    //crear objeto
    const infoUsuario = {
        nombre: inputNombre.value,
        apellido: inputAoellido.value
    }

    //GuardapellidocalStorage
    localStorage.setItem('infoUsuario', JSON.stringify(infoUsuario))
    formulario.remove()
    titulo.innerText = `Bienvenido ${infoUsuario.nombre} ${infoUsuario.apellido}`
}


//Revisar si existe en Storage

const infoUsuario = localStorage.getItem("infoUsuario")
const infoUsuarioJS = JSON.parse(infoUsuario)

if (infoUsuario) {
    formulario.remove()
    titulo.innerText = `Bienvenido nuevamente ${infoUsuarioJS.nombre} ${infoUsuarioJS.apellido}`
}

//Creacion de registros

// Clase Aeronave

class Aeronave {
    constructor(id, marca, serie, tipo, fabricacion) {
        (this.id = id),
            (this.marca = marca),
            (this.serie = serie),
            (this.tipo = tipo),
            (this.fabricacion = fabricacion);
    }
}

//registro de aeronaves

const aeronaves = [
    new Aeronave(1, 'BOEING', 'AC12313', 'B727', 1960),
    new Aeronave(2, 'BOEING', 'AC12312', 'B737', 1965),
    new Aeronave(3, 'BOEING', 'AC12583', 'B727', 1964),
    new Aeronave(4, 'BOEING', 'AC12789', 'B737', 1961),
    new Aeronave(5, 'BOEING', 'AC15975', 'B727', 1970),
    new Aeronave(6, 'AIRBUS', 'A115975', 'A319', 2000),
    new Aeronave(7, 'AIRBUS', 'A115989', 'A320', 2001),
    new Aeronave(8, 'AIRBUS', 'A1QW975', 'A319', 2002),
    new Aeronave(9, 'AIRBUS', 'A523698', 'A380', 2010),
    new Aeronave(10, 'AIRBUS', 'A515975', 'A380', 2012),
    new Aeronave(11, 'BOEING', 'A357951', 'B757', 1988),
    new Aeronave(10, 'AIRBUS', 'A258741', 'A318', 2012),
]


//Recorrrer todos las aeronaves

aeronaves.forEach(aero => {
    divAeronaves.innerHTML +=
        `<div class="container text-center">
        <div class="row">
        <div class="col">
        <div class="card shadow relleno">
        <div class="card-body">
            <h5 class="card-title">Marca: ${aero.marca}</h5>
            <p class="card-text">Numero de Serie: ${aero.serie}</p>
            <p class="card-text">Modelo de Aeronave: ${aero.tipo}</p>
            <p class="card-text">Año de fabricacion: ${aero.fabricacion}</p>
            <button id=${aero.id} type="button" class="btn btn-secondary">Agregar</button>
        </div>
        </div>
        </div>
    </div>`
})


//Guardar producto en el arreglo carritos
const carritos = []

//funcion guardar en botones de cada producto
const botonesAgregar = document.querySelectorAll('.btn-secondary')
botonesAgregar.forEach(boton => {
    boton.onclick = () => {
        const aeronave = aeronaves.find(p => p.id === parseInt(boton.id))
        //console.log(aeronave);
        const proCarrito = {
            id: aeronave.id,
            marca: aeronave.marca,
            serie: aeronave.serie,
            tipo: aeronave.tipo,
            fabricacion: aeronave.fabricacion,
            cantidad: 1,
        }

        //ver si existe el producto en el carrito para solo modificar la cantidad
        const proEnCarrito = carritos.find(prod => prod.id === proCarrito.id)
        if (!proEnCarrito) {
            carritos.push(proCarrito)
        } else {
            proEnCarrito.cantidad++
            console.log(carritos);
        }

        //

    }
})


//boton finalizar compra

const botonFinalizar = document.querySelector('#finalizar')
const thead = document.querySelector('thead')
const tbody = document.querySelector('tbody')
botonFinalizar.onclick = () => {
    divAeronaves.remove()
    botonFinalizar.remove()
    thead.innerHTML = `<tr class="colores">
<th scope="col">ID</th>
<th scope="col">MARCA</th>
<th scope="col">SERIE</th>
<th scope="col">TIPO</th>
<th scope="col">CANTIDAD</th>
</tr>`

    carritos.forEach(prod=> {
        tbody.innerHTML +=`
    <tr class="colorestr">
        <td>${prod.id}</td>
        <td>${prod.marca}</td>
        <td>${prod.serie}</td>
        <td>${prod.tipo}</td>
        <td>${prod.cantidad}</td>
    </tr>`
})
}