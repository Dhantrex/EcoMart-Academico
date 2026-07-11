/*=========================================================
                    CARRITO
=========================================================*/

let carrito = [];

/*---------------------------------------------------------
    Inicializar carrito
---------------------------------------------------------*/

function iniciarCarrito(){

    const carritoGuardado = localStorage.getItem("carrito");

    if(carritoGuardado){

        carrito = JSON.parse(carritoGuardado);

    }

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
    Actualizar contador
---------------------------------------------------------*/

function actualizarContador(){

    const contador = document.querySelector("#cartCounter");

    if(!contador){

        return;

    }

    let cantidad = 0;

    carrito.forEach(producto=>{

        cantidad += producto.cantidad;

    });

    contador.textContent = cantidad;

}

/*=========================================================*/

window.iniciarCarrito = iniciarCarrito;
window.obtenerCarrito = obtenerCarrito;
window.guardarCarrito = guardarCarrito;
window.actualizarContador = actualizarContador;
/*---------------------------------------------------------
    Agregar producto al carrito
---------------------------------------------------------*/

function agregarAlCarrito(producto){

    const existe = carrito.find(item => item.id === producto.id);

    if(existe){

        existe.cantidad++;

    }else{

        carrito.push({

            ...producto,

            cantidad:1

        });

    }

    guardarCarrito();

    actualizarContador();

}

window.agregarAlCarrito = agregarAlCarrito;