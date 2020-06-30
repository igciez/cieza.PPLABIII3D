import { agregarRowTableTh, agregarRowTableTd } from './generarTabla'
let table = document.getElementById('table');

/**
 * Capturo el evento del checkbok seleccionado
 *  * @param {*} event 
 */
export const modifyCheckBok = (event: any, arrayData: [], anuncios: any) => {
    let checkboxAux: any, newArrayData: any, checkboxAuxName: any, targetValue = event.target.value;

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
        //saco columnas
        if (checkboxAux.checked) {
            newArrayData = arrayData.filter((item: any) => item.name !== checkboxAuxName.name);
            arrayData = newArrayData;
        } else {
            //agrego columnas
            arrayData.splice(checkboxAuxName.position, 0, checkboxAuxName);
        }
        table.innerHTML = '';
        agregarRowTableTh(arrayData)
        agregarRowTableTd(anuncios, arrayData)
    }
}

/**
 * Filtro Transaccion 
 */
export const modifyfiltroTransaccion = (event, arrayData: any, anuncios: any) => {
    let cantidadAux = 0, precioAux = 0;

    table.innerHTML = '';
    agregarRowTableTh(arrayData);

    Object.values(anuncios).forEach((anuncio: any) => {
        if (anuncio.transaccion === event.target.value) {
            let tr = document.createElement("tr");
            tr.setAttribute('onclick', "setIndex(this)");
            precioAux += parseInt(anuncio.precio);
            cantidadAux++;
            Object.values(anuncio).forEach(item => {
                let td = document.createElement('td');
                td.innerHTML = item;
                tr.appendChild(td)
            })
            table.appendChild(tr)
        }
    });
    document.getElementById('promedio').value = (precioAux / cantidadAux);
}