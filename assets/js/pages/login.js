/*==========================================================
    ECOMART
    LOGIN.JS
==========================================================*/

/*==========================================================
    USUARIOS DE PRUEBA
==========================================================*/

const usuarios = [

    {

        id:1,

        nombre:"Administrador",

        email:"admin@ecomart.com",

        password:"admin123",

        rol:"admin"

    },

    {

        id:2,

        nombre:"Cliente",

        email:"cliente@ecomart.com",

        password:"123456",

        rol:"cliente"

    }

];


/*==========================================================
    LOGIN
==========================================================*/

function iniciarSesion(event){

    if(event){

        event.preventDefault();

    }

    const email = document.querySelector("#email");

    const password = document.querySelector("#password");

    if(!email || !password){

        return;

    }

    const usuario = usuarios.find(u =>

        u.email === email.value.trim() &&

        u.password === password.value.trim()

    );

    if(!usuario){

        mostrarMensaje(

            "Correo o contraseña incorrectos",

            "error"

        );

        return;

    }

    localStorage.setItem(

        "usuario",

        JSON.stringify(usuario)

    );

    mostrarMensaje(

        "Bienvenido " + usuario.nombre,

        "success"

    );

    setTimeout(()=>{

        window.location.href="index.html";

    },1200);

}


/*==========================================================
    CERRAR SESIÓN
==========================================================*/

function cerrarSesion(){

    localStorage.removeItem("usuario");

    window.location.href="login.html";

}


/*==========================================================
    USUARIO ACTUAL
==========================================================*/

function obtenerUsuario(){

    return JSON.parse(

        localStorage.getItem("usuario")

    );

}


/*==========================================================
    VALIDAR SESIÓN
==========================================================*/

function validarSesion(){

    const usuario = obtenerUsuario();

    if(!usuario){

        window.location.href="login.html";

    }

}


/*==========================================================
    ES ADMINISTRADOR
==========================================================*/

function esAdministrador(){

    const usuario = obtenerUsuario();

    if(!usuario){

        return false;

    }

    return usuario.rol === "admin";

}


/*==========================================================
    PROTEGER PANEL ADMIN
==========================================================*/

function protegerAdministrador(){

    const usuario = obtenerUsuario();

    if(!usuario){

        window.location.href="login.html";

        return;

    }

    if(usuario.rol !== "admin"){

        window.location.href="index.html";

    }

}


/*==========================================================
    MOSTRAR USUARIO EN NAVBAR
==========================================================*/

function cargarUsuarioNavbar(){

    const usuario = obtenerUsuario();

    if(!usuario){

        return;

    }

    const nombre = document.querySelector("#user-name");

    const rol = document.querySelector("#user-role");

    if(nombre){

        nombre.textContent = usuario.nombre;

    }

    if(rol){

        rol.textContent = usuario.rol;

    }

}


/*==========================================================
    MENSAJES
==========================================================*/

function mostrarMensaje(texto,tipo){

    const mensaje = document.querySelector("#mensaje");

    if(!mensaje){

        alert(texto);

        return;

    }

    mensaje.textContent = texto;

    mensaje.className="";

    mensaje.classList.add("mensaje");

    mensaje.classList.add(tipo);

    mensaje.style.display="block";

    setTimeout(()=>{

        mensaje.style.display="none";

    },3000);

}


/*==========================================================
    REGISTRO (TEMPORAL)
==========================================================*/

function registrarUsuario(event){

    if(event){

        event.preventDefault();

    }

    const nombre=document.querySelector("#nombre");

    const email=document.querySelector("#registro-email");

    const password=document.querySelector("#registro-password");

    if(

        !nombre ||

        !email ||

        !password

    ){

        return;

    }

    const existe=usuarios.find(

        u=>u.email===email.value.trim()

    );

    if(existe){

        mostrarMensaje(

            "El correo ya existe",

            "error"

        );

        return;

    }

    usuarios.push({

        id:usuarios.length+1,

        nombre:nombre.value,

        email:email.value,

        password:password.value,

        rol:"cliente"

    });

    mostrarMensaje(

        "Usuario registrado correctamente",

        "success"

    );

    setTimeout(()=>{

        window.location.href="login.html";

    },1500);

}


/*==========================================================
    RECORDAR SESIÓN
==========================================================*/

function recordarSesion(){

    const usuario = obtenerUsuario();

    if(usuario){

        cargarUsuarioNavbar();

    }

}


/*==========================================================
    INICIO
==========================================================*/

document.addEventListener("DOMContentLoaded",()=>{

    recordarSesion();

});