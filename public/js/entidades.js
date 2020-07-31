//Clases
export class Anuncio {
    constructor(object) {
        this.id = object.id ? object.id : null;
        this.titulo = object.titulo;
        this.transaccion = object.transaccion;
        this.descripcion = object.descripcion;
        this.precio = object.precio;
    }
}
export class Anuncio_Auto extends Anuncio {
    constructor(object) {
        super(object);
        this.num_puertas = object.num_puertas;
        this.num_kms = object.num_kms;
        this.potencia = object.potencia;
    }
    ;
}
export var Etransaccion;
(function (Etransaccion) {
    Etransaccion["Alquiler"] = "Alquiler";
    Etransaccion["Venta"] = "Venta";
    Etransaccion["Permuta"] = "Permuta";
})(Etransaccion || (Etransaccion = {}));
