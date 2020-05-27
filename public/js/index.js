let anuncios;
let indiceRow;
let table = document.getElementById('table');
let boxButtons = document.getElementById('box-buttons');
let plantilla = document.getElementsByTagName('template')[0].content;
let fragmento = document.createDocumentFragment();
let gif = document.getElementById('gif');


/**
 * Ajax Traer
 */
const traerAjax = async () => {
    let xhr = new XMLHttpRequest();
    gif.style.visibility = 'visible';

    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
            gif.style.visibility = 'hidden';
            if (xhr.status === 200) {
                anuncios = JSON.parse(xhr.responseText).data;
                anuncios.forEach(element => {
                    agregarRowTable(element);
                });

                table.appendChild(fragmento)
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
const altaAjax = async (item) => {
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
const modificarAjax = async (item) => {
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
const bajaAjax = async (id) => {
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


/**
 * agrega un renglon de la tabla
 * @param {renglon} element 
 */
const agregarRowTable = (element) => {
    let tr, td, copia;

    tr = plantilla.querySelector('tr');
    tr.setAttribute('onclick', "setIndex(this)");
    td = plantilla.querySelectorAll("td");
    td[0].textContent = element.id;
    td[1].textContent = element.titulo;
    td[2].textContent = element.transaccion;
    td[3].textContent = element.descripcion;
    td[4].textContent = '$' + element.precio;
    td[5].textContent = element.num_puertas;
    td[6].textContent = element.num_kms;
    td[7].textContent = element.potencia;
    copia = document.importNode(plantilla, true);
    fragmento.appendChild(copia);
};

traerAjax();

/**
 * Setea el indice "indiceRow" y 
 * da visibilidad a los botones editar, eliminar y cancelar
 * @param {evento que proviene del onclick(this)} e 
 */
setIndex = (e) => {
    boxButtons.style.visibility = 'visible';
    indiceRow = e.rowIndex;
};

/**
 * Guardar en Base de datos
 * @param {*} event 
 */
const guardar = async (event) => {

    event.preventDefault();

    let titulo, transaccion, auxTransaccion, descripcion,
        precio, num_puertas, num_kms, potencia,
        id;

    titulo = document.getElementById("titulo").value;
    auxTransaccion = document.getElementById("transaccion");
    transaccion = auxTransaccion.options[auxTransaccion.selectedIndex].value;
    descripcion = document.getElementById("descripcion").value;
    precio = document.getElementById("precio").value;
    num_puertas = parseInt(document.getElementById("puertas").value);
    num_kms = parseInt(document.getElementById("kms").value);
    potencia = parseInt(document.getElementById("potencia").value);

    if (indiceRow) {
        id = (anuncios[indiceRow - 1].id).toString();
        await modificarAjax({ id, titulo, transaccion, descripcion, precio, num_puertas, num_kms, potencia })
    } else {
        id = (anuncios.length + 1).toString();
        await altaAjax({ id, titulo, transaccion, descripcion, precio, num_puertas, num_kms, potencia })
    };
}

const borrar = async () => {
    boxButtons.style.visibility = 'hidden';
    await bajaAjax(anuncios[indiceRow - 1].id);
};

const cancelar = () => {
    boxButtons.style.visibility = 'hidden';
    indiceRow='';
    document.getElementById('form').reset();
};

const editar = () => {
    let auxIndice = indiceRow - 1;
    document.getElementById("titulo").value = anuncios[auxIndice].titulo;
    document.getElementById("transaccion").value = anuncios[auxIndice].transaccion;
    document.getElementById("descripcion").value = anuncios[auxIndice].descripcion;
    document.getElementById("precio").value = anuncios[auxIndice].precio;
    document.getElementById("puertas").value = anuncios[auxIndice].num_puertas;
    document.getElementById("kms").value = anuncios[auxIndice].num_kms;
    document.getElementById("potencia").value = anuncios[auxIndice].potencia;
    window.scroll(0, 0);
};