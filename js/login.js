
//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    document.getElementById("loginform").addEventListener('submit', validarFormulario); 
    function validarFormulario(evento) {
        evento.preventDefault();
        var usuario = document.getElementById('usuario').value;
        if(usuario.length == 0) {
          alert('Debe ingresar su usuario');
          return;
        }
        var clave = document.getElementById('clave').value;
        if (clave.length == 0) {
          alert('Debe ingresar una contraseña');
          return;
        }
        this.submit();
      }
      function redireccionar(){
        window.location.href="index2.html";
      } 
});