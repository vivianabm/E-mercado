
//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(){
    document.getElementById("submitbutton").addEventListener("submit", function() {
      let usuarioprueb = document.getElementById("usuario");
      let claveprueb = document.getElementById("clave");
      let camposCompletos = true; // flag 

      if (usuarioprueb.value === '') {
        usuarioprueb.classList.add("invalido");
        camposCompletos = false;
      } else {
        usuarioprueb.classList.remove("invalido");
      }
      if (claveprueb.value === '') {
        claveprueb.classList.add("invalido");
        camposCompletos = false;
      } else {
       claveprueb.classList.remove("invalido");
      }
      if (camposCompletos){
        window.location = "inicio.html";
      }
      });
    });
  