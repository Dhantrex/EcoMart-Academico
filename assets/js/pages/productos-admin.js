/*=========================================================
            PRODUCTOS ADMIN
=========================================================*/

let productos = [];

let categoriaSeleccionada = "todas";

let productoEditando = null;

let productoEliminar = null;

document.addEventListener(

    "DOMContentLoaded",

    iniciarProductosAdmin

);

async function iniciarProductosAdmin(){

    await cargarAdminLayout();

    await cargarModalProducto();

    activarMenu();

    await cargarTablaProductos();

    cargarCategorias();

    iniciarBuscador();

    iniciarModal();

    iniciarFormulario();

    //iniciarEliminar();

    console.log("Panel Administrativo de productos iniciado");

}

/*---------------------------------------------------------
            Cargar tabla
---------------------------------------------------------*/

async function cargarTablaProductos(){

    const tbody = document.querySelector("#tablaProductos");

    if(!tbody){

        return; 

    }

    try{

        const respuesta = await fetch("../data/productos.json");

        productos = await respuesta.json();

        mostrarTabla(productos);

    }

    catch(error){

        console.error(error);

    }

}
/*---------------------------------------------------------
            Crear fila
---------------------------------------------------------*/

function crearFila(producto){

    const estado =

        producto.stock > 20

        ? "Disponible"

        : producto.stock > 5

        ? "Poco Stock"

        : "Agotado";

    const clase =

        producto.stock > 20

        ? "status-ok"

        : producto.stock > 5

        ? "status-warning"

        : "status-danger";

    return `

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

                S/. ${producto.precio.toFixed(2)}

            </td>

            <td>

                ${producto.stock}

            </td>

            <td>

                <span class="${clase}">

                    ${estado}

                </span>

            </td>

            <td>

                <button 
                    class="table-button view tooltip"
                    data-tooltip="Ver producto">

                    <i class="fa-solid fa-eye"></i>

                </button>

                <button 
                    class="table-button edit tooltip"
                    data-tooltip="Editar producto"
                    onclick="abrirModalEditarProducto(${producto.id})">

                    <i class="fa-solid fa-pen"></i>

                </button>

                <button 
                    class="table-button delete tooltip"
                    data-tooltip="Eliminar producto">

                    <i class="fa-solid fa-trash"></i>

                </button>

            </td>

        </tr>

    `;

}

/*---------------------------------------------------------
            Mostrar tabla
---------------------------------------------------------*/

function mostrarTabla(lista){

    const tbody = document.querySelector("#tablaProductos");

    tbody.innerHTML = "";

    if (lista.length === 0) {

        tbody.innerHTML = `

            <tr>

                <td colspan="7" class="tabla-vacia">

                    <i class="fa-solid fa-magnifying-glass"></i>

                    <p>
                    
                    No se encontraron productos.
                    
                    </p>

                </td>

            </tr>

        `;

        return;

    }
    
    let html = "";

    lista.forEach(producto=>{

        html += crearFila(producto);

    });

    tbody.innerHTML = html;

}

/*---------------------------------------------------------
            Buscador
---------------------------------------------------------*/

function iniciarBuscador(){

    const buscador = document.querySelector("#buscarProducto");

    const categoria = document.querySelector("#filtroCategoria");

    buscador.addEventListener(

        "input",

        aplicarFiltros

    );

    categoria.addEventListener(

        "change",

        aplicarFiltros

    );

}

/*---------------------------------------------------------
            Categorías
---------------------------------------------------------*/

function cargarCategorias(){

    const select = document.querySelector("#filtroCategoria");

    if(!select){

        return;

    }

    const categorias = [

        ...new Set(

            productos.map(

                producto=>producto.categoria

            )

        )

    ];

    categorias.forEach(categoria=>{

        select.innerHTML += `

            <option value="${categoria.toLowerCase()}">

                ${categoria}

            </option>

        `;

    });

}

/*---------------------------------------------------------
            Aplicar filtros
---------------------------------------------------------*/

function aplicarFiltros(){

    const texto = document

        .querySelector("#buscarProducto")

        .value

        .toLowerCase();

    const categoria = document

        .querySelector("#filtroCategoria")

        .value;

    const filtrados = productos.filter(producto=>{

        const coincideNombre = producto.nombre

            .toLowerCase()

            .includes(texto);

        const coincideCategoria =

            categoria==="todas"

            ||

            producto.categoria.toLowerCase()

            ===

            categoria;

        return coincideNombre && coincideCategoria;

    });

    mostrarTabla(filtrados);

}

/*---------------------------------------------------------
            Modal
---------------------------------------------------------*/

function iniciarModal(){

    const botonNuevo = document.querySelector("#nuevoProducto");

    const modal = document.querySelector("#modalProducto");

    const cerrar = document.querySelector("#cerrarModal");

    const cancelar = document.querySelector("#cancelarModal");

    botonNuevo.addEventListener(

        "click",

        abrirModalNuevoProducto

    );

    cerrar.addEventListener("click",()=>{

        cerrarModal();

    });

    cancelar.addEventListener("click",()=>{

        cerrarModal();

    });

    modal.addEventListener("click",(e)=>{

        if(e.target===modal){

            cerrarModal();

        }

    });

}

/*---------------------------------------------------------
            Formulario
---------------------------------------------------------*/

function iniciarFormulario(){

    const formulario = document.querySelector("#formProducto");

    formulario.addEventListener(

        "submit",

        guardarProducto

    );

}

/*---------------------------------------------------------
            Guardar producto
---------------------------------------------------------*/

function guardarProducto(e){

    e.preventDefault();

    const nombre = document.querySelector("#nombreProducto").value.trim();

    const categoria = document.querySelector("#categoriaProducto").value.trim();

    const precio = parseFloat(

        document.querySelector("#precioProducto").value

    );

    const stock = parseInt(

        document.querySelector("#stockProducto").value

    );

    const precioAnterior = parseFloat(

        document.querySelector("#precioAnterior").value

    ) || precio;

    const descuento =

        document.querySelector("#descuentoProducto").value.trim()

        ||

        "-0%";

    const imagen =

        document.querySelector("#imagenProducto").value.trim()

        ||

        "https://placehold.co/400x400?text=EcoMart";

    if(

        nombre===""

        ||

        categoria===""

        ||

        isNaN(precio)

        ||

        isNaN(stock)

    ){

        alert("Complete todos los campos obligatorios.");

        return;

    }

    const nuevoProducto={

        id:Date.now(),

        nombre,

        categoria,

        precio,

        precioAnterior,

        descuento,

        stock,

        imagen

    };

    if(productoEditando){

        productoEditando.nombre = nombre;

        productoEditando.categoria = categoria;

        productoEditando.precio = precio;

        productoEditando.stock = stock;

        productoEditando.precioAnterior = precioAnterior;

        productoEditando.descuento = descuento;

        productoEditando.imagen = imagen;

        productoEditando = null;

    }
    else{

        productos.push(nuevoProducto);

    }
    mostrarTabla(productos);

    actualizarCategorias();

    cerrarModal();

    limpiarFormulario();

}

/*---------------------------------------------------------
            Cerrar modal
---------------------------------------------------------*/

function cerrarModal(){

    document

        .querySelector("#modalProducto")

        .classList

        .remove("active");

    limpiarFormulario();

}

/*---------------------------------------------------------
            Limpiar formulario
---------------------------------------------------------*/

function limpiarFormulario(){

    document

        .querySelector("#formProducto")

        .reset();

    productoEditando = null;

    document
        .querySelector(".modal-header h2")
        .textContent = "Nuevo Producto";

}

/*---------------------------------------------------------
            Actualizar categorías
---------------------------------------------------------*/

function actualizarCategorias(){

    const select = document.querySelector("#filtroCategoria");

    select.innerHTML =

    `

        <option value="todas">

            Todas las categorías

        </option>

    `;

    cargarCategorias();

}

/*---------------------------------------------------------
            Editar producto
---------------------------------------------------------*/

function abrirModalEditarProducto(id){

    productoEditando = productos.find(

        producto => producto.id === id

    );

    if(!productoEditando){

        return;

    }

    document.querySelector("#nombreProducto").value =
        productoEditando.nombre;

    document.querySelector("#categoriaProducto").value =
        productoEditando.categoria;

    document.querySelector("#precioProducto").value =
        productoEditando.precio;

    document.querySelector("#stockProducto").value =
        productoEditando.stock;

    document.querySelector("#precioAnterior").value =
        productoEditando.precioAnterior;

    document.querySelector("#descuentoProducto").value =
        productoEditando.descuento;

    document.querySelector("#imagenProducto").value =
        productoEditando.imagen;

    document.querySelector(".modal-header h2").textContent =
        "Editar Producto";

    document.querySelector("#modalProducto")
        .classList
        .add("active");

}

/*---------------------------------------------------------
            Nuevo producto
---------------------------------------------------------*/

function abrirModalNuevoProducto(){

    limpiarFormulario();

    document
        .querySelector(".modal-header h2")
        .textContent = "Nuevo Producto";

    document
        .querySelector("#modalProducto")
        .classList
        .add("active");

}

function abrirModalEliminar(id){

    productoEliminar = id;

    document
        .querySelector("#modalEliminar")
        .classList
        .add("active");

}

function iniciarEliminar(){

    document

        .querySelector("#cancelarEliminar")

        .addEventListener(

            "click",

            cerrarModalEliminar

        );

    document

        .querySelector("#confirmarEliminar")

        .addEventListener(

            "click",

            eliminarProducto

        );

}

function cerrarModalEliminar(){

    document

        .querySelector("#modalEliminar")

        .classList

        .remove("active");

    productoEliminar = null;

}

function eliminarProducto(){

    productos = productos.filter(

        producto => producto.id !== productoEliminar

    );

    mostrarTabla(productos);

    actualizarCategorias();

    cerrarModalEliminar();

}

window.abrirModalEditarProducto = abrirModalEditarProducto;
window.abrirModalEliminar = abrirModalEliminar;