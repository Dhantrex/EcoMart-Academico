/*=========================================================
                    FILTROS
=========================================================*/

let categoriaSeleccionada = "todos";

let textoBusqueda = "";


/*=========================================================*/

function iniciarFiltros(){

    iniciarBusqueda();

}


/*=========================================================*/

function iniciarBusqueda(){

    const input = document.querySelector("#searchInput");

    if(!input){

        return;

    }

    input.addEventListener("input",(e)=>{

        textoBusqueda = e.target.value.toLowerCase().trim();

        aplicarFiltros();

    });

}


/*=========================================================*/

function cambiarCategoria(categoria){

    categoriaSeleccionada = categoria;

    aplicarFiltros();

}


/*=========================================================*/

function aplicarFiltros(){

    const productos=document.querySelectorAll(".product-card");

    productos.forEach(producto=>{

        const categoria=

        producto.dataset.category;

        const nombre=

        producto.querySelector(".product-name")

        .textContent

        .toLowerCase();

        const mostrar=

        (categoriaSeleccionada==="todos"

        ||

        categoria===categoriaSeleccionada)

        &&

        nombre.includes(textoBusqueda);

        producto.style.display=

        mostrar

        ?

        "flex"

        :

        "none";

    });

}


window.cambiarCategoria=cambiarCategoria;