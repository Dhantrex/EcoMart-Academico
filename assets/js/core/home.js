/*=========================================================
                    APP.JS
=========================================================*/

document.addEventListener("DOMContentLoaded", iniciarAplicacion);

async function iniciarAplicacion(){
    
    await cargarLayout();

    await cargarProductos();

    iniciarNavbar();

    iniciarSidebar();

    iniciarFiltros();

    ocultarLoader();

    iniciarCarrito();

    console.log("EcoMart iniciado correctamente");
}