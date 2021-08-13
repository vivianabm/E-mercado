function valida(){
    var usuario = document.getElementById('usuario');
    var contra = document.getElementById("contraseña");
    
    if((usuario.value == "")||(contra.value == "")){
    window.alert("Los campos usuario y contraseña no pueden estar vacios");
    }else{
    envia('login');
    }
    }





//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){

});