/**
 * 1)Utilizar una clase “Anuncio” que contenga los atributos:
● id
● titulo
● transaccion
● descripcion
● precio
2)Utilizar una clase “Anuncio_Auto” que herede de “Anuncio” con el resto de los atributos
necesarios
 */

export class Anuncio {
    id: string;
    titulo: string;
    transaccion: string;
    descripcion: string;
    precio: string;

    constructor(id: string, titulo: string, transaccion: string, descripcion: string, precio: string) {
        this.id = id;
        this.titulo = titulo;
        this.transaccion = transaccion;
        this.descripcion = descripcion;
        this.precio = precio;
    }
}

export class Anuncio_Auto extends Anuncio {
    numeroPuertas: string;
    numeroKms: string;
    potencia: string;

    constructor(id: string, titulo: string, transaccion: string, descripcion: string, precio: string, numeroPuertas: string, numeroKms: string, potencia: string) {
        super(id, titulo, transaccion, descripcion, precio);
        this.numeroPuertas = numeroPuertas;
        this.numeroKms = numeroKms;
        this.potencia = potencia;
    }
}