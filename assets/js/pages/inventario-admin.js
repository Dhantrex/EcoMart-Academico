/*=========================================================
            INVENTARIO ADMIN
=========================================================*/

let productos = [];

document.addEventListener(

    "DOMContentLoaded",

    iniciarInventario

);

async function iniciarInventario(){

    await cargarAdminLayout();

    activarMenu();

    await cargarInventario();

    console.log("Inventario iniciado");

}

/*---------------------------------------------------------
            Cargar inventario
---------------------------------------------------------*/

async function cargarInventario(){

    const tbody = document.querySelector("#tablaProductos");

    if(!tbody){

        return;

    }

    try{

        const respuesta = await fetch("../data/productos.json");

        productos = await respuesta.json();

        mostrarInventario(productos);

    }

    catch(error){

        console.error(error);

    }

}

/*---------------------------------------------------------
            Mostrar tabla
---------------------------------------------------------*/

function mostrarInventario(lista){

    const tbody = document.querySelector("#tablaProductos");

    tbody.innerHTML = "";

    lista.forEach(producto=>{

        let estado = "";
        let clase = "";

        if(producto.stock > 20){

            estado = "Disponible";
            clase = "status-ok";

        }

        else if(producto.stock > 5){

            estado = "Poco stock";
            clase = "status-warning";

        }

        else{

            estado = "Agotado";
            clase = "status-danger";

        }

        tbody.innerHTML += `

            <tr>

                <td>

                    <img
                        src="${producto.imagen}"
                        class="table-image"
                        alt="${producto.nombre}">

                </td>

                <td>

                    ${producto.nombre}

                </td>

                <td>

                    <span class="category-tag">

                        ${producto.categoria}

                    </span>

                </td>

                <td>

                    ${producto.stock}

                </td>

                <td>

                    <span class="${clase}">

                        ${estado}

                    </span>

                </td>

            </tr>

        `;

    });

}