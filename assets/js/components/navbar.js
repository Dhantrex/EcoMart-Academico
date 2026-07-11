/*=========================================================
                    NAVBAR.JS
=========================================================*/

function iniciarNavbar(){

    efectoScroll();

    eventosNavbar();

}


/*=========================================================
                EFECTO SCROLL
=========================================================*/

function efectoScroll(){

    const header = document.querySelector(".header");

    if(!header){

        return;

    }

    window.addEventListener("scroll",()=>{

        if(window.scrollY > 10){

            header.classList.add("scrolled");

        }else{

            header.classList.remove("scrolled");

        }

    });

}


/*=========================================================
                EVENTOS NAVBAR
=========================================================*/

function eventosNavbar(){

    const login = document.querySelector("#loginButton");

    const favoritos = document.querySelector("#favoriteButton");

    const carrito = document.querySelector("#cartButton");

    const buscador = document.querySelector("#searchInput");

    const botonBuscar = document.querySelector("#searchButton");


    if(login){

        login.addEventListener("click",()=>{

            window.location.href="login.html";

        });

    }


    if(carrito){

        carrito.addEventListener("click",()=>{

            window.location.href="carrito.html";

        });

    }


    if(favoritos){

        favoritos.addEventListener("click",()=>{

            alert("Módulo de favoritos en desarrollo.");

        });

    }


    if(botonBuscar){

        botonBuscar.addEventListener("click",buscarProducto);

    }


    if(buscador){

        buscador.addEventListener("keypress",(e)=>{

            if(e.key==="Enter"){

                buscarProducto();

            }

        });

    }

}


/*=========================================================
                BUSCADOR
=========================================================*/

function buscarProducto(){

    const buscador=document.querySelector("#searchInput");

    if(!buscador){

        return;

    }

    const texto=buscador.value.trim();

    if(texto===""){

        buscador.focus();

        return;

    }

    console.log("Buscar:",texto);

}