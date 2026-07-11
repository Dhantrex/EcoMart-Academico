/*=========================================================
                ADMIN
=========================================================*/

document.addEventListener(

    "DOMContentLoaded",

    iniciarAdmin

);

async function iniciarAdmin(){

    await cargarAdminLayout();

    activarMenu();

    await cargarEstadisticas();

    console.log("Panel Administrativo iniciado");

}
/*=========================================================
            MENÚ ACTIVO
=========================================================*/

function activarMenu(){

    const pagina = location.pathname.split("/").pop() || "index.html";

    const enlaces = document.querySelectorAll(".admin-menu__item");

    enlaces.forEach(enlace=>{

        enlace.classList.remove("active");

        const href = enlace.getAttribute("href");

        if(href === pagina){

            enlace.classList.add("active");

        }

    });

}

/*=========================================================
            ESTADÍSTICAS DASHBOARD
=========================================================*/

async function cargarEstadisticas(){

    if(!document.querySelector("#totalProductos")){

        return;

    }

    try{

        const respuestaProductos = await fetch("../data/productos.json");

        const productos = await respuestaProductos.json();

        const respuestaPedidos = await fetch("../data/pedidos.json");

        const pedidos = await respuestaPedidos.json();

        document.querySelector("#totalProductos").textContent =
            productos.length;

        document.querySelector("#totalPedidos").textContent =
            pedidos.length;

        const categorias = new Set(
            productos.map(producto=>producto.categoria)
        );

        document.querySelector("#totalCategorias").textContent =
            categorias.size;

        const bajoStock = productos.filter(producto=>producto.stock <= 5);

        document.querySelector("#productosBajoStock").textContent =
            bajoStock.length;

    }

    catch(error){

        console.error(error);

    }

}
