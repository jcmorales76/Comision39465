// Calcular costo de compra
function calcular(precioProducto, cantidadProducto, descuentoProducto, fleteEnvio) {

    const descuento = (precioProducto * descuentoProducto) / 100
    const precioDescuento = precioProducto - descuento
    return (precioDescuento * cantidadProducto) + fleteEnvio
}
//Costo de Envio
const envioL = 400
const envioI = 800

//Ingreso de datos
const producto = parseFloat(prompt("Ingrese el precio del producto: "));
const cantidad = parseInt(prompt("Ingrese la cantidad de unidades del producto: "));
const descuento = parseInt(prompt("Ingresa % de descuento:"))
const flete = parseInt(prompt("1. Local - 2. Internacional"))

//Condicionales
if (flete === 1) {
    const precioFinal = calcular(producto, cantidad, descuento, envioL)
    alert("El precio total de tu compra local es S/ " + precioFinal)
    alert("Su pedido llegara en 2 días!")
} else if (flete === 2) {
    const precioFinal = calcular(producto, cantidad, descuento, envioI)
    alert("El precio total de tu compra Internacional es S/ " + precioFinal)
    alert("Su pedido internacional llegara aproximadamente en 7 días!")
} else {
    alert("Ingrese un dato correcto")
}