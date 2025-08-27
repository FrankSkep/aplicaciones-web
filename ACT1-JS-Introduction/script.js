const x = 30;
let ciudad = "Madrid";

function sum(parametro1, parametro2) {
    return parametro1 + parametro2;
}

let resultadoSuma = sum(10, x);
console.log(`Resultado: ${resultadoSuma}`);

const funcionSuma = sum;
resultadoSuma = funcionSuma(20, 40);
console.log(`Resultado de la función asignada: ${resultadoSuma}`);

function operacion(funcion, parametro1, parametro2) {
    console.log(`Resultado de la operación: ${funcion(parametro1, parametro2)}`);
}

operacion(sum, 10, 5);

let funcionFlechaPrimitiva = function () {
    console.log("Soy una función flecha primitiva");
}
funcionFlechaPrimitiva();

const ArrowFunction = () => console.log("Soy una función flecha");
ArrowFunction();

// ForEach inmutable
const nombres = ["Juan", "Pedro", "Maria"];

console.log("Nombres inmutables: ")
nombres.forEach(nombre => {
    console.log(`Nombre: ${nombre}`);
});

nombres.sort();
console.log(`Nombres ordenados: ${nombres}`);

// map no modifica el arreglo original, regresa un nuevo arreglo con las modificaciones hechas
const nombresMayusculaMap = nombres.map(nombre => nombre.toLocaleUpperCase());
console.log(nombresMayusculaMap);


// Reduce devuelve un solo valor que es el resultado de aplicar una funcion a cada elemento de un arreglo
// Acumulador es el valor que va guardando en cada iteración
// numero es el valor actual que esta procesando
const numeros = [5, 4, 7, 1, 10];

const total = numeros.reduce((acumulador, numero) => acumulador + numero, 0);
console.log(`Total: ${total}`);


class Vehiculo {
    constructor(marca, modelo, anio) {
        this.marca = marca;
        this.modelo = modelo;
        this.anio = anio;
    }

    mostrarInfo() {
        return `${this.marca} ${this.modelo} ${this.anio}`;
    }

    acelerar() {
        console.log("Acelerando el vehiculo con marca: " + this.marca);
    }
}

let vehiculo = new Vehiculo("Ford", "Mustang GLX", 1983);

console.log(vehiculo.mostrarInfo());
vehiculo.acelerar();

class Motocicleta extends Vehiculo {
    constructor(marca, modelo, anio, tipo) {
        super(marca, modelo, anio);
        this.tipo = tipo;
    }

    mostrarInfo() {
        return `${super.mostrarInfo()} - Tipo: ${this.tipo}`;
    }

    acelerar() {
        console.log("Acelerando la motocicleta con marca: " + this.marca);
    }
}

let moto = new Motocicleta("Yamaha", "MT-07", 2020, "Deportiva");
console.log(moto.mostrarInfo());