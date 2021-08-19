

















//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function() {
document.getElementById("submitbotton").addEventListener("clicK", function () {
 let  inputUsuario = document.getElementById ("inputUsuario");
 let  inputClave = document.getElementById ("inputClave");
 let todoCompleto = true ;
  
 if  ( inputUsuario.value  ===  "" ) {
  inputUsuario.classList.add("invalid");
    todoCompleto = false;
}else{
  inputUsuario.classList.remove("invalid");

if ( inputClave.value  ===  "" ) {
  inputClave.classList.add("invalid");
    todoCompleto = false;
}else{
  inputClave.classList.remove("invalid");
}
if (todoCompleto){

  if (inputUsuario.value,inputClave.value){
    window.location= 'inicio.html';
  }
  else {
      alert("Usuario o contraseña incorrectas!")
  }
}
else {
  alert("Debes ingresar los datos!")
}
}
});
});

  

   