import {Anuncio_Auto} from './entidades';
import {traerAjax} from './ajax';
import {modifyCheckBok,modifyfiltroTransaccion } from './filtros';

/**
 * Variables globales
 */
let anuncios:[Anuncio_Auto];
let indiceRow:number;
let arrayData = [
    { name: 'Id', class: 'idThTd', otherName: 'id' },
    { name: 'Título', class: 'tituloThTd', otherName: 'titulo' },
    { name: 'Transacción', class: 'transaccionThTd', otherName: 'transaccion' },
    { name: 'Descripción', class: 'descripcionThTd', otherName: 'descripcion' },
    { name: 'Precio', class: 'precioThTd', otherName: 'precio' },
    { name: 'Numero Puertas', class: 'num_puertasThTd', otherName: 'num_puertas' },
    { name: 'Numero Kms', class: 'num_kmsThTd', otherName: 'num_kms' },
    { name: 'Potencia', class: 'potenciaThTd', otherName: 'potencia' }
];
//"getElementById"
let table = document.getElementById('table');
let boxButtons = document.getElementById('box-buttons');
let contentCheckbox = document.getElementById('contentCheckbox');
let filtroTransaccion = document.getElementById('idFiltrarTransaccion');
let gif = document.getElementById('gif');
//"addEventListener"
//contentCheckbox.addEventListener("click", (event) => modifyCheckBok(event), false);
//filtroTransaccion.addEventListener("click", (event) => modifyfiltroTransaccion(event), false);

traerAjax(arrayData, anuncios);