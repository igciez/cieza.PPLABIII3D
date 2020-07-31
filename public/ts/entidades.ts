//Clases
export class Anuncio {
    public id: number | null;
    public titulo: string;
    public transaccion: string;
    public descripcion: string;
    public precio: string;

    constructor(object: Anuncio) {
        this.id = object.id ? object.id : null;
        this.titulo = object.titulo;
        this.transaccion = object.transaccion;
        this.descripcion = object.descripcion;
        this.precio = object.precio;
    }
}

export class Anuncio_Auto extends Anuncio {
    public num_puertas: string;
    public num_kms: string;
    public potencia: string;

    constructor(object: Anuncio_Auto) {
        super(object);
        this.num_puertas = object.num_puertas;
        this.num_kms = object.num_kms;
        this.potencia = object.potencia;
    };
}

export enum Etransaccion {
    Alquiler = "Alquiler",
    Venta = "Venta",
    Permuta = "Permuta",
}