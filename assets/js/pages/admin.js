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