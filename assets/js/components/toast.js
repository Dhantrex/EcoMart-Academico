/*=========================================================
                    TOAST
=========================================================*/

function mostrarToast(mensaje){

    let toast = document.querySelector(".toast");

    if(!toast){

        toast=document.createElement("div");

        toast.className="toast";

        toast.innerHTML=`

            <i class="fa-solid fa-circle-check"></i>

            <span></span>

        `;

        document.body.appendChild(toast);

    }

    toast.querySelector("span").textContent=mensaje;

    toast.classList.add("show");

    clearTimeout(window.toastTimer);

    window.toastTimer=setTimeout(()=>{

        toast.classList.remove("show");

    },2500);

}

window.mostrarToast=mostrarToast;