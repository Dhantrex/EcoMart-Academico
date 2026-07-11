/*=========================================================
                PEDIDOS ADMIN
=========================================================*/

let pedidos = [];

document.addEventListener(

    "DOMContentLoaded",

    iniciarPedidos

);

async function iniciarPedidos(){

    await cargarAdminLayout();

    activarMenu();

    await cargarPedidos();

    console.log("Pedidos iniciados");

}

/*---------------------------------------------------------
                Cargar pedidos
---------------------------------------------------------*/

async function cargarPedidos(){

    const tbody = document.querySelector("#tablaPedidos");

    if(!tbody){

        return;

    }

    try{

        const respuesta = await fetch("../data/pedidos.json");

        pedidos = await respuesta.json();

        mostrarPedidos(pedidos);

    }

    catch(error){

        console.error(error);

    }

}

/*---------------------------------------------------------
                Mostrar pedidos
---------------------------------------------------------*/

function mostrarPedidos(lista){

    const tbody = document.querySelector("#tablaPedidos");

    tbody.innerHTML = "";

    lista.forEach(pedido=>{

        let clase = "";

        switch(pedido.estado){

            case "Entregado":

                clase = "status-ok";

                break;

            case "Pendiente":

                clase = "status-warning";

                break;

            case "Enviado":

                clase = "status-info";

                break;

            default:

                clase = "";

        }

        tbody.innerHTML += `

            <tr>

                <td>

                    #${pedido.id}

                </td>

                <td>

                    ${pedido.cliente}

                </td>

                <td>

                    ${pedido.fecha}

                </td>

                <td>

                    <span class="${clase}">

                        ${pedido.estado}

                    </span>

                </td>

                <td>

                    S/. ${pedido.total.toFixed(2)}

                </td>

            </tr>

        `;

    });

}