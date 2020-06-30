import { agregarRowTableTh, agregarRowTableTd } from './generarTabla';
import { Anuncio_Auto } from './entidades';

let gif = document.getElementById('gif');

/**
 * Ajax Traer
 */
export const traerAjax = async (arrayData: any, anuncios: any) => {
    let xhr = new XMLHttpRequest();
    gif.style.visibility = 'visible';

    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
            gif.style.visibility = 'hidden';
            if (xhr.status === 200) {
                let auxAnuncios = JSON.parse(xhr.responseText).data;
                auxAnuncios.forEach(element => {
                    console.dir(element);
                    //anuncios.push(new Anuncio_Auto(element.id, element.titulo,element.transaccion,element.descripcion,element.precio,element.numeroPuertas,element.numeroKms,element.potencia))
                });
                //agregarRowTableTh(arrayData);
                //agregarRowTableTd(anuncios, null);
            } else {
                console.log(xhr.status + " " + xhr.statusText);
            }
        }
    };
    xhr.open('GET', 'http://localhost:3000/traer', true);
    xhr.send();
}

/***
 * Ajax Alta
 */
export const altaAjax = async (item: any) => {
    let xhr = new XMLHttpRequest();
    gif.style.visibility = 'visible';

    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
            gif.style.visibility = 'hidden';
            if (xhr.status === 200) {
                console.log(JSON.parse(xhr.responseText))
            } else {
                console.log(xhr.status + " " + xhr.statusText);
            }
        }
    };
    xhr.open('POST', 'http://localhost:3000/alta');
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(JSON.stringify(item));
}

/***
 * Ajax modificar
 */
export const modificarAjax = async (item: any) => {
    let xhr = new XMLHttpRequest();
    gif.style.visibility = 'visible';

    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
            gif.style.visibility = 'hidden';
            if (xhr.status === 200) {
                console.log(JSON.parse(xhr.responseText))
            } else {
                console.log(xhr.status + " " + xhr.statusText);
            }
        }
    };
    xhr.open('POST', 'http://localhost:3000/modificar');
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(JSON.stringify(item));
    console.dir(JSON.stringify(item))
}

/***
 * Ajax baja
 */
export const bajaAjax = async (id: any) => {
    let xhr = new XMLHttpRequest();

    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {

            if (xhr.status === 200) {
                console.log(JSON.parse(xhr.responseText))
            } else {
                console.log(xhr.status + " " + xhr.statusText);
            }
        }
    };
    xhr.open('POST', 'http://localhost:3000/baja');
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send(`id=${id}`);
}