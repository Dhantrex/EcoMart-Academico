/*=========================================================
                CATEGORÍAS ADMIN
=========================================================*/

let productos = [];

document.addEventListener(

    "DOMContentLoaded",

    iniciarCategorias

);

async function iniciarCategorias(){

    await cargarAdminLayout();

    activarMenu();

    await cargarCategorias();

    console.log("Categorías iniciadas");

}

/*---------------------------------------------------------
                Cargar categorías
---------------------------------------------------------*/

async function cargarCategorias(){

    const tbody = document.querySelector("#tablaCategorias");

    if(!tbody){

        return;

    }

    try{

        const respuesta = await fetch("../data/productos.json");

        productos = await respuesta.json();

        mostrarCategorias(productos);

    }

    catch(error){

        console.error(error);

    }

}

/*---------------------------------------------------------
                Mostrar categorías
---------------------------------------------------------*/

function mostrarCategorias(lista){

    const tbody = document.querySelector("#tablaCategorias");

    tbody.innerHTML = "";

    const categorias = {};

    lista.forEach(producto=>{

        if(categorias[producto.categoria]){

            categorias[producto.categoria]++;

        }

        else{

            categorias[producto.categoria] = 1;

        }

    });

    for(const categoria in categorias){

        tbody.innerHTML += `

            <tr>

                <td>

                    <span class="category-tag">

                        ${categoria}

                    </span>

                </td>

                <td>

                    ${categorias[categoria]}

                </td>

                <td>

                    <span class="status-ok">

                        Activa

                    </span>

                </td>

            </tr>

        `;

    }

}