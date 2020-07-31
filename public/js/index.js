import { Anuncio_Auto, Etransaccion } from './entidades.js'
/**
 * Variables globales
 */
let anuncios;
let indiceRow;
let filtroCheckPref = [];
//"getElementById"
let table = document.getElementById('table');
let boxButtons = document.getElementById('box-buttons');
let contentCheckbox = document.getElementById('contentCheckbox');
let filtroTransaccion = document.getElementById('idFiltrarTransaccion');
//"addEventListener"
contentCheckbox.addEventListener("click", (event) => modifyCheckBok(event), false);
filtroTransaccion.addEventListener("click", (event) => modifyfiltroTransaccion(event), false);
//"Others" 
let gif = document.getElementById('gif');
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
                let auxAnuncios = JSON.parse(xhr.responseText).data;
                anuncios = auxAnuncios.map(item => new Anuncio_Auto(item));
                taerLocal();
                agregarRowTableTh(arrayData);
                agregarRowTableTd(anuncios);
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
// const altaAjax = async (item) => {
//     let xhr = new XMLHttpRequest();
//     gif.style.visibility = 'visible';

//     xhr.onreadystatechange = () => {
//         if (xhr.readyState === 4) {
//             gif.style.visibility = 'hidden';
//             if (xhr.status === 200) {
//                 console.log(JSON.parse(xhr.responseText))
//             } else {
//                 console.log(xhr.status + " " + xhr.statusText);
//             }
//         }
//     };
//     xhr.open('POST', 'http://localhost:3000/alta');
//     xhr.setRequestHeader("Content-Type", "application/json");
//     xhr.send(JSON.stringify(item));
// }

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
// const bajaAjax = async (id) => {
//     let xhr = new XMLHttpRequest();

//     xhr.onreadystatechange = () => {
//         if (xhr.readyState === 4) {

//             if (xhr.status === 200) {
//                 console.log(JSON.parse(xhr.responseText))
//             } else {
//                 console.log(xhr.status + " " + xhr.statusText);
//             }
//         }
//     };
//     xhr.open('POST', 'http://localhost:3000/baja');
//     xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
//     xhr.send(`id=${id}`);
// }

///------!!!JQUERY!!!!!-------
// ---> Selector --> $("#btnBaja").click(function(){}
//$("#checkboxDiv").find(".custom-control").length
/**
 * Jquery Baja
 */
function bajaAjax(id) {

    $.ajax({
        url: "http://localhost:3000/baja",
        method: 'POST',
        data: `id=${id}`,
        contentType: 'application/x-www-form-urlencoded',
        success: function (resultado) {
            console.log(JSON.parse(resultado).message);
        },
        error: function () {
            console.log("Error");
        },
        complete: function () {
            console.log("Complete");
            alert('Baja exitosa');
            //location.reload();
        }
    })
}

/**
 * Alta Jquery
 * @param {*} item 
 */
function altaAjax(item) {
    gif.style.visibility = 'visible';

    $.ajax({
        url: "http://localhost:3000/alta",
        method: 'POST',
        data: JSON.stringify(item),
        contentType: 'application/json',
        success: function (resultado) {
            gif.style.visibility = 'hidden';
            console.log(JSON.parse(resultado).message);
        },
        error: function () {
            console.log("Error");
        },
        complete: function () {
            gif.style.visibility = 'hidden';
            console.log("Complete");
            //alert('Baja exitosa');
            //location.reload();
        }
    })
}

//----Local Storage-----
const taerLocal = () => {
    let auxFiltros = JSON.parse(localStorage.getItem('listaAnuncios'));
    filtroCheckPref = auxFiltros;

    if (auxFiltros) {
        console.dir(auxFiltros)
        auxFiltros.forEach(item => {
            console.dir(item.checked)
            //document.getElementById(item.nameId).checked = item.checked;
            document.getElementById(item.nameId).checked =false;
        });
    }
};

const altaLocal = (array) => {
    localStorage.setItem('listaAnuncios', JSON.stringify(array));
    //location.reload()
};

//-----Filtros Columnas--------//
/**
 * Capturo el evento del checkbok seleccionado
 *  * @param {*} event 
 */
const modifyCheckBok = (event) => {
    let checkboxAux, newArrayData, checkboxAuxName, targetValue = event.target.value;

    if (targetValue) {
        checkboxAux = document.getElementById(targetValue);
        switch (targetValue) {
            case 'idCheck':
                checkboxAuxName = { name: 'Id', position: 0, otherName: 'id' }
                break;
            case 'tituloCheck':
                checkboxAuxName = { name: 'Título', position: 1, otherName: 'titulo' }
                break;
            case 'transaccionCheck':
                checkboxAuxName = { name: 'Transacción', position: 2, otherName: 'transaccion' }
                break;
            case 'descripcionCheck':
                checkboxAuxName = { name: 'Descripción', position: 3, otherName: 'descripcion' }
                break;
            case 'precioCheck':
                checkboxAuxName = { name: 'Precio', position: 4, otherName: 'precio' }
                break;
            case 'numeroPuertasCheck':
                checkboxAuxName = { name: 'Numero Puertas', position: 5, otherName: 'num_puertas' }
                break;
            case 'numeroKmsCheck':
                checkboxAuxName = { name: 'Numero Kms', position: 6, otherName: 'num_kms' }
                break;
            case 'potenciaCheck':
                checkboxAuxName = { name: 'Potencia', position: 7, otherName: 'potencia' }
                break;
            default:
                break;
        };

        if (checkboxAux.checked) {
            //agrego columnas
            if (!arrayData.find(item => item.name === checkboxAuxName.name)) {
                arrayData.splice(checkboxAuxName.position, 0, checkboxAuxName);
            }
            //saco de lista de preferencia
            if (filtroCheckPref) {
                let aux = filtroCheckPref.filter(item => item.name !== checkboxAuxName.name)
                filtroCheckPref = aux;
            }
        } else {
            //saco columnas
            newArrayData = arrayData.filter(item => item.name !== checkboxAuxName.name);
            arrayData = newArrayData;
            //add de lista de preferencia
            if (filtroCheckPref) {
                filtroCheckPref.push({ name: checkboxAuxName.name, nameId: targetValue, fieldName: checkboxAuxName.otherName });
            } else {
                filtroCheckPref = [{ name: checkboxAuxName.name, nameId: targetValue, fieldName: checkboxAuxName.otherName }]
            }
        }

        table.innerHTML = '';
        altaLocal(filtroCheckPref);
        agregarRowTableTh(arrayData)
        agregarRowTableTd(anuncios, arrayData)
    }
}

/**
 * Filtro Transaccion 
 */
const modifyfiltroTransaccion = (event) => {
    let flag = true, array, auxArray, cantidadAux = 0, precioAux = 0;

    if (event.target.value) {
        table.innerHTML = '';
        agregarRowTableTh(arrayData);

        Object.values(anuncios).forEach(anuncio => {
            if (anuncio.transaccion === event.target.value) {
                let tr = document.createElement("tr");
                tr.setAttribute('onclick', "setIndex(this)");
                precioAux += parseInt(anuncio.precio);
                cantidadAux++;

                if (filtroCheckPref.length) {
                    filtroCheckPref.forEach(field => {
                        if (flag) {
                            array = Object.keys(anuncio).filter(item => item !== field.fieldName);
                            auxArray = array;
                            flag = false;
                        } else {
                            array = auxArray.filter(item => item !== field.fieldName);
                            auxArray = array
                        }
                    })
                    array.forEach(item => {
                        let td = document.createElement('td');
                        td.innerHTML = anuncio[item];
                        tr.appendChild(td)
                    })
                } else {
                    Object.values(anuncio).forEach(item => {
                        let td = document.createElement('td');
                        td.innerHTML = item;
                        tr.appendChild(td)
                    })
                }
                table.appendChild(tr)
            }
        });
        document.getElementById('promedio').value = `$ ${precioAux ? (precioAux / cantidadAux) : 0}`;
    }
}

/**
 * agrega un renglon de la tabla (th),
 *  al primer template
 * @param {renglon} element 
 */
const agregarRowTableTh = (element) => {
    let array, tr = document.createElement("tr");

    if (filtroCheckPref.length) {
        filtroCheckPref.forEach(field => {
            array = element.filter(item => item.name !== field.name);
            element = array;
        })
    }
    else {
        array = element;
    }

    array.forEach((item) => {
        let th = document.createElement('th');
        let icon = document.createElement("i");
        icon.className = "fas fa-sort px-2";
        th.innerHTML = item.name;
        th.addEventListener("click", sortTable);
        th.appendChild(icon);
        tr.appendChild(th)
    })
    table.appendChild(tr)
};

/**
 * agrega un renglon a la tabla (td),
 * al segundo template.
 * @param {renglon} element 
 */
const agregarRowTableTd = (anuncios, arrayData) => {
    let array = [];

    if (arrayData) {
        let auxArrayData;

        if (filtroCheckPref.length) {
            filtroCheckPref.forEach(field => {
                auxArrayData = arrayData.filter(item => item.name !== field.name);
                arrayData = auxArrayData;
            })
        }
        else {
            auxArrayData = arrayData;
        }

        anuncios.forEach(anuncio => {
            let tr = document.createElement("tr");
            tr.setAttribute('onclick', "setIndex(this)");
            auxArrayData.forEach(any => {
                let td = document.createElement('td');
                td.innerHTML = anuncio[any.otherName];
                tr.appendChild(td)
            })
            table.appendChild(tr)
        })
    }
    else {
        anuncios.forEach(anuncio => {
            let flag = true, auxArray, tr = document.createElement("tr");
            tr.setAttribute('onclick', "setIndex(this)");

            if (filtroCheckPref.length) {
                filtroCheckPref.forEach(field => {
                    if (flag) {
                        array = Object.keys(anuncio).filter(item => item !== field.fieldName);
                        auxArray = array;
                        flag = false;
                    } else {
                        array = auxArray.filter(item => item !== field.fieldName);
                        auxArray = array
                    }
                })

                array.forEach(item => {
                    let td = document.createElement('td');
                    td.innerHTML = anuncio[item];
                    tr.appendChild(td)
                })
            } else {
                Object.values(anuncio).forEach(item => {
                    let td = document.createElement('td');
                    td.innerHTML = item;
                    tr.appendChild(td)
                })
            }
            table.appendChild(tr)
        })
    }
};

function llenarFiltros(id) {
    let select = document.getElementById(id);
    for (const key in Etransaccion) {
        let option = document.createElement("option");
        option.text = Etransaccion[key];
        option.value = Etransaccion[key];
        select.appendChild(option);
    }
    // select.addEventListener("change", handleFilterEvent);
}

/**
 * Setea el indice "indiceRow" y 
 * da visibilidad a los botones editar, eliminar y cancelar
 * @param {evento que proviene del onclick(this)} e 
 */
window.setIndex = (e) => {
    boxButtons.style.visibility = 'visible';
    indiceRow = e.rowIndex;
};

/**
 * Guardar en Base de datos
 * @param {*} event 
 */
window.guardar = async (event) => {

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
        //modificarLocal({ id, titulo, transaccion, descripcion, precio, num_puertas, num_kms, potencia })
    } else {
        await altaAjax({ id: null, titulo, transaccion, descripcion, precio, num_puertas, num_kms, potencia })
        //id = (anuncios ? (anuncios.length + 1) : 1).toString();
        //altaLocal({ id, titulo, transaccion, descripcion, precio, num_puertas, num_kms, potencia })
    };
}

window.borrar = async () => {
    boxButtons.style.visibility = 'hidden';
    await bajaAjax(anuncios[indiceRow - 1].id);
    //bajaLocal(anuncios[indiceRow - 1].id)
};

window.cancelar = () => {
    boxButtons.style.visibility = 'hidden';
    indiceRow = '';
    document.getElementById('form').reset();
};

window.editar = () => {
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

function sortTable() {
    const getCellValue = (tr, idx) =>
        tr.children[idx].innerText || tr.children[idx].textContent;

    const comparer = (idx, asc) => (a, b) =>
        ((v1, v2) =>
            v1 !== "" && v2 !== "" && !isNaN(v1) && !isNaN(v2)
                ? v1 - v2
                : v1.toString().localeCompare(v2))(
                    getCellValue(asc ? a : b, idx),
                    getCellValue(asc ? b : a, idx)
                );

    document.querySelectorAll("tr:first-child th").forEach((td) =>
        td.addEventListener("click", () => {
            const table = document.getElementById("table");
            Array.from(table.querySelectorAll("tr:nth-child(n+2)"))
                .sort(
                    comparer(
                        Array.from(td.parentNode.children).indexOf(td),
                        (this.asc = !this.asc)
                    )
                )
                .forEach((tr) => table.appendChild(tr));
        })
    );
}

// Funcion de inicio
(() => {
    llenarFiltros('transaccion')
    llenarFiltros('idFiltrarTransaccion')
    traerAjax();
})()