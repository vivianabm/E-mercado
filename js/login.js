

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function() { 

  document.getElementById("submitbutton").addEventListener("click", function(e){ // una vez que el usuario haga click en el botón se ejecuta la función
    let inputUsuario = document.getElementById("inputUsuario"); // traigo los campos usuario y contraseña con el id y los guardo
    let inputClave = document.getElementById("inputClave");
    let camposCompletos = true; // flag variable que cambiará de acuerdo a la circunstancia "true" si los campos están completos

    if (inputUsuario.value === ''){
        inputUsuario.classList.add("invalid"); // le agrego clase con selector de estilo
        camposCompletos = false; // si campos no está completo cambio variable bandera
      }else{
        inputUsuario.classList.remove("invalid"); // si el usuario escribió algo saco la clase
    }

    if (inputClave.value === ''){
        inputClave.classList.add("invalid");
        camposCompletos = false;
      }else{
        inputClave.classList.remove("invalid");
    }

    if (camposCompletos){
        window.location= 'inicio.html';
  }else{
    alert("Debes ingresar usuario y contraseña");
  }

});
});
