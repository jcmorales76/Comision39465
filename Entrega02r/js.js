class Aeronave {
    constructor({ marca, serie, tipo, fabricacion }) {
        (this.marca = marca),
            (this.serie = serie),
            (this.tipo = tipo),
            (this.fabricacion = fabricacion);
    }
    habilitacion() {
        if (this.fabricacion <= 20) {
            alert(
                `La aeronave ${this.marca}, con serie ${this.serie} con modelo, ${this.tipo} , fabricado el : ${this.fabricacion} no puede ser certificada en Peru`
            );
        } else {
            alert(
                `La aeronave ${this.marca}, con serie ${this.serie} con modelo, ${this.tipo} , fabricado el : ${this.fabricacion} si puede ser certificada en Peru, por cumplir con el ano requerido`
            );
        }
    }
}
const marca = prompt("Ingresa marca de aeronave: BOEING O AIRBUS").toUpperCase();
const serie = parseInt(prompt("Ingrese serie de aeronave"));
const tipo = prompt("Ingrese Modelo de aeronave: para BOEING: 737-200 o 737-500 / AIRBUS: A319 O A320").toUpperCase();
const fabricacion = parseInt(prompt("Ingrese el Ano de fabricacion"));

const Aeronave1 = new Aeronave({ marca, serie, tipo, fabricacion });

Aeronave1.habilitacion();