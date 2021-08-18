

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(){
    document.getElementById("submitbutton").addEventListener("click", function() {
      let usuario = document.getElementById("usuario");
      let clave = document.getElementById("clave");
      let camposCompletos = true; // flag 

      if (usuario.value === '') {
        usuario.classList.add("invalido");
        camposCompletos = false;
      } else {
        usuario.classList.remove("invalido");
      }
      if (clave.value === '') {
        clave.classList.add("invalido");
        camposCompletos = false;
      } else {
       clave.classList.remove("invalido");
      }
      if (camposCompletos){
        window.location = 'inicio.html'
      }
      });
    });
  