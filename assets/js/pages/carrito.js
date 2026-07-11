/*=========================================================
                    CARRITO.JS
=========================================================*/

let carrito = [];

/*---------------------------------------------------------
    Inicio de la página
---------------------------------------------------------*/

document.addEventListener(
    
    "DOMContentLoaded",

    iniciarPaginaCarrito

);

async function iniciarPaginaCarrito(){

    await cargarLoader();

    await cargarNavbar();

    iniciarNavbar();

    iniciarCarrito();

    ocultarLoader();

    mostrarProductos();

    actualizarResumen();

const botonVaciar = document.querySelector("#emptyCartButton");

if(botonVaciar){

    botonVaciar.addEventListener(

        "click",

        vaciarCarrito

    );

}
}

/*---------------------------------------------------------
    Inicializar carrito
---------------------------------------------------------*/

function iniciarCarrito(){

    const datos = localStorage.getItem("carrito");

    carrito = datos ? JSON.parse(datos) : [];

    actualizarContador();

}

/*---------------------------------------------------------
    Obtener carrito
---------------------------------------------------------*/

function obtenerCarrito(){

    return carrito;

}

/*---------------------------------------------------------
    Guardar carrito
---------------------------------------------------------*/

function guardarCarrito(){

    localStorage.setItem(

        "carrito",

        JSON.stringify(carrito)

    );

}

/*---------------------------------------------------------
    Agregar producto
---------------------------------------------------------*/

function agregarAlCarrito(producto){

    const existente = carrito.find(

        item => item.id === producto.id

    );

    if(existente){

        existente.cantidad++;

    }

    else{

        carrito.push({

            ...producto,

            cantidad:1

        });

    }

    guardarCarrito();

    actualizarContador();

}

/*---------------------------------------------------------
    Eliminar producto
---------------------------------------------------------*/

function eliminarProducto(id){

    carrito = carrito.filter(

        producto => producto.id !== id

    );

    guardarCarrito();

    actualizarContador();

    mostrarProductos();

    actualizarResumen();

}
/*---------------------------------------------------------
    Vaciar carrito
---------------------------------------------------------*/

function vaciarCarrito(){

    const confirmar = confirm(

        "¿Deseas eliminar todos los productos del carrito?"

    );

    if(!confirmar){

        return;

    }

    carrito = [];

    guardarCarrito();

    actualizarContador();

    mostrarProductos();

    actualizarResumen();

}

/*---------------------------------------------------------
    Aumentar cantidad
---------------------------------------------------------*/

function aumentarCantidad(id){

    const producto = carrito.find(

        item => item.id === id

    );

    if(!producto){

        return;

    }

    producto.cantidad++;

    guardarCarrito();

    actualizarContador();

    mostrarProductos();

    actualizarResumen();

}

/*---------------------------------------------------------
    Disminuir cantidad
---------------------------------------------------------*/

function disminuirCantidad(id){

    const producto = carrito.find(

        item => item.id === id

    );

    if(!producto){

        return;

    }

    producto.cantidad--;

    if(producto.cantidad<=0){

        eliminarProducto(id);

        return;

    }

    guardarCarrito();

    actualizarContador();

    mostrarProductos();

    actualizarResumen();

}

/*---------------------------------------------------------
    Cantidad total
---------------------------------------------------------*/

function obtenerCantidadProductos(){

    let cantidad = 0;

    carrito.forEach(producto=>{

        cantidad += producto.cantidad;

    });

    return cantidad;

}

/*---------------------------------------------------------
    Total
---------------------------------------------------------*/

function obtenerTotal(){

    let total = 0;

    carrito.forEach(producto=>{

        total += producto.precio * producto.cantidad;

    });

    return total;

}

/*---------------------------------------------------------
    Actualizar contador
---------------------------------------------------------*/

function actualizarContador(){

    const contador = document.querySelector("#cartCounter");

    if(!contador){

        return;

    }

    contador.textContent = obtenerCantidadProductos();

}

/*---------------------------------------------------------
    Mostrar productos
---------------------------------------------------------*/

function mostrarProductos(){

    const contenedor = document.querySelector("#cartItems");

    if(!contenedor){

        return;

    }

    if(carrito.length===0){

        contenedor.innerHTML=`

            <div class="cart-empty">

                <i class="fa-solid fa-cart-shopping"></i>

                <h2>

                    Tu carrito está vacío

                </h2>

                <p>

                    Agrega algunos productos desde el catálogo.

                </p>

            </div>

        `;

        return;

    }

    contenedor.innerHTML="";

    carrito.forEach(producto=>{

        contenedor.innerHTML += `

        <article class="cart-item">

            <img
                src="${producto.imagen}"
                alt="${producto.nombre}"
                class="cart-image">

            <div class="cart-info">

                <h3>

                    ${producto.nombre}

                </h3>

                <span class="cart-category">

                    ${producto.categoria}

                </span>

                <p class="cart-price">

                    Precio unitario

                </p>

                <strong>

                    S/. ${producto.precio.toFixed(2)}

                </strong>

            </div>

            <div class="cart-controls">

                <button
                    onclick="disminuirCantidad(${producto.id})">

                    -

                </button>

                <span>

                    ${producto.cantidad}

                </span>

                <button
                    onclick="aumentarCantidad(${producto.id})">

                    +

                </button>

            </div>

            <div class="cart-subtotal">

                S/. ${(producto.precio*producto.cantidad).toFixed(2)}

            </div>

            <button
                class="cart-delete"
                onclick="eliminarProducto(${producto.id})">

                <i class="fa-solid fa-trash"></i>

            </button>

        </article>

        `;

    });

}

/*---------------------------------------------------------
    Actualizar resumen
---------------------------------------------------------*/

function actualizarResumen(){

    const subtotal = document.querySelector("#subtotal");

    const total = document.querySelector("#total");

    if(!subtotal || !total){

        return;

    }

    const importe = obtenerTotal();

    subtotal.textContent = `S/. ${importe.toFixed(2)}`;

    total.textContent = `S/. ${importe.toFixed(2)}`;

}

/*---------------------------------------------------------
    Exponer funciones
---------------------------------------------------------*/

window.agregarAlCarrito = agregarAlCarrito;
window.aumentarCantidad = aumentarCantidad;
window.disminuirCantidad = disminuirCantidad;
window.eliminarProducto = eliminarProducto;
window.vaciarCarrito = vaciarCarrito;