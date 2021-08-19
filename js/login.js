

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function() {

  document.getElementById("submitbutton").addEventListener("click", function(e){
    let inputUsuario = document.getElementById("inputUsuario");
    let inputClave = document.getElementById("inputClave");
    let camposCompletos = true;

    if (inputUsuario.value === ''){
        inputUsuario.classList.add("invalid");
        camposCompletos = false;
      }else{
        inputUsuario.classList.remove("invalid");
    }

    if (inputClave.value === ''){
        inputClave.classList.add("invalid");
        camposCompletos = false;
      }else{
        inputClave.classList.remove("invalid");
    }

    if (camposCompletos){
        window.location = 'inicio.html';
    }else{
        alert("Debes ingresar usuario y contraseña");
    }
});
});
