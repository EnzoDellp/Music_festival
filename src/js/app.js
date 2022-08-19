document.addEventListener("DOMContentLoaded",function(){
    iniciarApp()
});

function iniciarApp(){
    crearGaleria()
    scrollNav()
    navegacionFija();
}


function navegacionFija(){
    const barra =document.querySelector(".header");
    const sobreFestival=document.querySelector(".sobre-festival");
    const body=document.querySelector("body");


    window.addEventListener("scroll",function(){
        if(sobreFestival.getBoundingClientRect().bottom < 0){
            barra.classList.add("fijo")
            body.classList.add("body-scroll")
        }else{
            barra.classList.remove("fijo")
            body.classList.remove("body-scroll")

        }
    })
}
//*smooth scroll
function scrollNav(){
    const enlaces= document.querySelectorAll(".navegacion-principal a")
    enlaces.forEach(enlace=>{
        enlace.addEventListener("click",function(e){

           const secionScroll=e.target.attributes.href.value;
           const seccion=document.querySelector(secionScroll);
           seccion.scrollIntoView({behevior:"smooth"});
        });
    });
}



function crearGaleria(){
    const galeria=document.querySelector('.galeria-imagenes');
    for (let i=1; i<=12;i++){
        const imagen=document.createElement('picture');
        imagen.innerHTML=`
        <source srcset="build/img/thumb/${i}.avif" type="image/avif">
        <source srcset="build/img/thumb/${i}.webp" type="image/webp">
        <img loading="lazy" wdith="200" height="300" src="build/img/thumb/${i}.jpg" alt="imagen galeria">


        `;
        imagen.onclick=function(){
            mostrarImagen(i)

            
        }
        galeria.appendChild(imagen)
    }
}

function mostrarImagen(id){
    

        const imagen=document.createElement('picture');
        imagen.innerHTML=`
        <source srcset="build/img/grande/${id}.avif" type="image/avif">
        <source srcset="build/img/grande/${id}.webp" type="image/webp">
        <img loading="lazy" wdith="200" height="300" src="build/img/grande/${IDBIndex}.jpg" alt="imagen galeria">


        `;
        //crea el overlay con la imagen

        const overlay=document.createElement("DIV");
        overlay.appendChild(imagen);
        overlay.classList.add("overlay");
        overlay.onclick=function(){
            const body =document.querySelector("body");
            body.classList.remove("fijar-body")
            overlay.remove();

        }


    //boton para cerrar el modal
    const cerraModal=document.createElement("P")
    cerraModal.textContent=("X")
    cerraModal.classList.add("btn-cerrar")
    cerraModal.onclick=function(){
        const body =document.querySelector("body");
        body.classList.remove("fijar-body")
        overlay.remove();
        
    }
    overlay.append(cerraModal)


    //añadir al HTML
        const body =document.querySelector("body");
        body.appendChild(overlay);
        body.classList.add("fijar-body")
    
}