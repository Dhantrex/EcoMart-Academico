/*=========================================================
                LOADER.JS
=========================================================*/

/*=========================================================
                RUTA BASE
=========================================================*/

const BASE = window.location.pathname.includes("/dashboard/")

    ? "../"

    : "";

async function cargarComponente(selector,ruta){

    const elemento=document.querySelector(selector);

    if(!elemento){

        return;

    }

    try{

        const respuesta=await fetch(ruta);

        const html=await respuesta.text();

        elemento.innerHTML=html;

    }

    catch(error){

        console.error("Error cargando:",ruta);

    }

}

async function cargarLayout(){

    await cargarComponente(

        "#loaderContainer",

        BASE + "components/layout/loader.html"

    );

    await cargarComponente(

        "#navbar",

        BASE + "components/layout/navbar.html"

    );
    
    await cargarComponente(

        "#footer",

        BASE + "components/layout/footer.html"

    );

    await cargarComponente(

        "#sidebar",

        BASE + "components/layout/sidebar.html"

    );

    await cargarComponente(

        "#hero",

        BASE + "components/home/hero.html"

    );

    await cargarComponente(

        "#catalogo",

        BASE + "components/home/catalogo.html"

    );

}

async function cargarNavbar(){

    await cargarComponente(

        "#navbar",

        BASE + "components/layout/navbar.html"

    );

}
window.cargarNavbar = cargarNavbar;
window.cargarLayout = cargarLayout;

/*=========================================================
                LOADER VISUAL
=========================================================*/

function ocultarLoader(){

    const loader = document.querySelector("#loader");

    if(!loader){

        return;

    }

    setTimeout(()=>{

        loader.classList.add("hidden");

    },700);

}

/*=========================================================
            CARGAR LOADER
=========================================================*/

async function cargarLoader(){

    await cargarComponente(

        "#loaderContainer",

        BASE + "components/layout/loader.html"

    );

}

window.cargarLoader = cargarLoader;
window.ocultarLoader = ocultarLoader;

/*=========================================================
            ADMIN LAYOUT
=========================================================*/

async function cargarAdminLayout(){

    await cargarComponente(

        "#adminNavbar",

        BASE + "components/admin/admin-navbar.html"

    );

    await cargarComponente(

        "#adminSidebar",

        BASE + "components/admin/admin-sidebar.html"

    );

}

window.cargarAdminLayout = cargarAdminLayout;

/*=========================================================
            MODAL PRODUCTO
=========================================================*/

async function cargarModalProducto(){

    await cargarComponente(

        "#modalContainer",

        "../dashboard/components/modal-producto.html"

    );

}

window.cargarModalProducto = cargarModalProducto;