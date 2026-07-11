/*=========================================================
                PRODUCTOS
=========================================================*/

let listaProductos = [];

async function cargarProductos(){

    const contenedor=document.querySelector("#productosContainer");

    if(!contenedor){

        return;

    }

    try{

        const respuesta = await fetch("data/productos.json");
        
        listaProductos = await respuesta.json();

        listaProductos.forEach(producto=>{

            contenedor.innerHTML += crearCard(producto);

        });

    }

    catch(error){

        console.error(error);

    }

}

function crearCard(producto){

    return`

            <article
            class="product-card"
            data-category="${producto.categoria.toLowerCase()}">

            <span class="product-discount">

                ${producto.descuento}

            </span>

            <button class="product-favorite">

                <i class="fa-regular fa-heart"></i>

            </button>

            <img
                class="product-image"
                src="${producto.imagen}"
                alt="${producto.nombre}">

            <div class="product-info">

                <span class="product-category">

                    ${producto.categoria}

                </span>

                <h3 class="product-name">

                    ${producto.nombre}

                </h3>

                <div class="product-price">

                    <div>

                        <small>Antes</small>

                        <div class="old-price">

                            S/. ${producto.precioAnterior}

                        </div>

                    </div>

                    <div>

                        <small>Ahora</small>

                        <div class="current-price">

                            S/. ${producto.precio}

                        </div>

                    </div>

                </div>

                <span class="product-stock">

                    Stock: ${producto.stock}

                </span>

                <button 
                    class="add-cart"
                    data-id="${producto.id}">

                    🛒 Agregar


                </button>

            </div>

        </article>

    `;

}
window.cargarProductos = cargarProductos;

/*---------------------------------------------------------
    Eventos de productos
---------------------------------------------------------*/

document.addEventListener("click",async(e)=>{

    if(!e.target.classList.contains("add-cart")){

        return;

    }

    const id = Number(e.target.dataset.id);

    const producto = listaProductos.find(p => p.id === id);

    agregarAlCarrito(producto);

    const textoOriginal = e.target.textContent;

    e.target.textContent = "✔ Agregado";

    mostrarToast(`Producto "${producto.nombre}" agregado al carrito`);
    
    const carrito = document.querySelector("#cartButton");

    if(carrito){

        carrito.classList.remove("cart-bounce");

        void carrito.offsetWidth;

        carrito.classList.add("cart-bounce");

    }

    setTimeout(()=>{

        e.target.textContent = textoOriginal;

    },1000);

});