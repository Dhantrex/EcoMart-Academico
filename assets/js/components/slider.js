/*==========================================================
    ECOMART
    SLIDER.JS
==========================================================*/

let slideActual = 0;

let slides = [];

let indicadores = [];

let intervalo = null;

/*==========================================================
    INICIALIZAR
==========================================================*/

document.addEventListener("DOMContentLoaded", () => {

    slides = document.querySelectorAll(".slide");

    indicadores = document.querySelectorAll(".slider-dot");

    if(slides.length === 0) return;

    mostrarSlide(0);

    iniciarSlider();

    eventosSlider();

});

/*==========================================================
    EVENTOS
==========================================================*/

function eventosSlider(){

    const siguiente = document.querySelector(".slider-next");

    const anterior = document.querySelector(".slider-prev");

    if(siguiente){

        siguiente.addEventListener("click", siguienteSlide);

    }

    if(anterior){

        anterior.addEventListener("click", anteriorSlide);

    }

    indicadores.forEach((dot,index)=>{

        dot.addEventListener("click",()=>{

            mostrarSlide(index);

            reiniciarSlider();

        });

    });

}

/*==========================================================
    MOSTRAR SLIDE
==========================================================*/

function mostrarSlide(indice){

    slides.forEach((slide)=>{

        slide.classList.remove("active");

    });

    indicadores.forEach((dot)=>{

        dot.classList.remove("active");

    });

    slideActual = indice;

    slides[slideActual].classList.add("active");

    if(indicadores.length){

        indicadores[slideActual].classList.add("active");

    }

}

/*==========================================================
    SIGUIENTE
==========================================================*/

function siguienteSlide(){

    slideActual++;

    if(slideActual >= slides.length){

        slideActual = 0;

    }

    mostrarSlide(slideActual);

}

/*==========================================================
    ANTERIOR
==========================================================*/

function anteriorSlide(){

    slideActual--;

    if(slideActual < 0){

        slideActual = slides.length - 1;

    }

    mostrarSlide(slideActual);

}

/*==========================================================
    AUTO PLAY
==========================================================*/

function iniciarSlider(){

    intervalo = setInterval(()=>{

        siguienteSlide();

    },5000);

}

/*==========================================================
    REINICIAR
==========================================================*/

function reiniciarSlider(){

    clearInterval(intervalo);

    iniciarSlider();

}

/*==========================================================
    PAUSA AL PASAR EL MOUSE
==========================================================*/

const hero = document.querySelector(".hero");

if(hero){

    hero.addEventListener("mouseenter",()=>{

        clearInterval(intervalo);

    });

    hero.addEventListener("mouseleave",()=>{

        iniciarSlider();

    });

}

/*==========================================================
    TECLADO
==========================================================*/

document.addEventListener("keydown",(e)=>{

    if(e.key==="ArrowRight"){

        siguienteSlide();

        reiniciarSlider();

    }

    if(e.key==="ArrowLeft"){

        anteriorSlide();

        reiniciarSlider();

    }

});

/*==========================================================
    TOUCH (MÓVILES)
==========================================================*/

let inicioX = 0;

let finX = 0;

if(hero){

    hero.addEventListener("touchstart",(e)=>{

        inicioX = e.changedTouches[0].screenX;

    });

    hero.addEventListener("touchend",(e)=>{

        finX = e.changedTouches[0].screenX;

        if(inicioX - finX > 60){

            siguienteSlide();

        }

        if(finX - inicioX > 60){

            anteriorSlide();

        }

        reiniciarSlider();

    });

}