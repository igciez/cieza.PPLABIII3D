let table = document.getElementById('table');

/**
 * agrega un renglon de la tabla (th),
 *  al primer template
 * @param {renglon} element 
 */
export const agregarRowTableTh = (element) => {
    let tr = document.createElement("tr");
    element.forEach((item) => {
        let th = document.createElement('th');
        th.innerHTML = item.name;
        tr.appendChild(th)
    })
    table.appendChild(tr)
};

/**
 * agrega un renglon a la tabla (td),
 * al segundo template.
 * @param {renglon} element 
 */
export const agregarRowTableTd = (anuncios, arrayData) => {
    if (arrayData) {
        Object.values(anuncios).forEach(anuncio => {
            let tr = document.createElement("tr");
            tr.setAttribute('onclick', "setIndex(this)");
            arrayData.forEach(any => {
                let td = document.createElement('td');
                td.innerHTML = anuncio[any.otherName];
                tr.appendChild(td)
            })
            table.appendChild(tr)
        })
    } else {
        anuncios.forEach(anuncio => {
            let tr = document.createElement("tr");
            tr.setAttribute('onclick', "setIndex(this)");
            Object.values(anuncio).forEach(item => {
                let td = document.createElement('td');
                td.innerHTML = item;
                tr.appendChild(td)
            })
            table.appendChild(tr)
        })
    }
};