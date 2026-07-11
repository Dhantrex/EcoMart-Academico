/*=========================================================
                    SIDEBAR
=========================================================*/

function iniciarSidebar(){

    const categorias=document.querySelectorAll(".sidebar__item");

    categorias.forEach(item=>{

        item.addEventListener("click",()=>{

            categorias.forEach(cat=>{

                cat.classList.remove("active");

            });

            item.classList.add("active");

            const categoria=item.dataset.category;

            if(window.cambiarCategoria){

                window.cambiarCategoria(categoria);

            }

        });

    });

}