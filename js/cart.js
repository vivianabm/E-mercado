// Cargar carrito desde el JSON (se usa JSON de desafío con 2 productos y se expresa en dólares)
function mostrarCarrito(array) {
    var listadoCarrito = "";
  
    for (let i = 0; i < array.length; i++) {
      let itemCarrito = array[i];
  
      if (itemCarrito.currency == "UYU") { //si la moneda es en pesos la pasamos a dólares
        itemCarrito.unitCost = (itemCarrito.unitCost / 40).toFixed(2);
        itemCarrito.currency = "USD";
      }
  //guardamos el contenido a mostrar en la variable "listadoCarrito"
      listadoCarrito += ` 
      <table class="table table-borderless table-shopping-cart" id="item${i}"> 
                <thead class="text-muted">
                  <tr class="small text-uppercase">
                    <th scope="col">Producto</th>
                    <th scope="col" width="120">Cantidad</th>
                    <th scope="col" width="120">Precio</th>
                    <th scope="col" class="text-right" width="200"></th>
                  </tr>
                </thead>
                <tbody>
                      <tr>
                          <td>
                      <figure class="itemside">
                          <div class="aside">
                          <img src=${itemCarrito.src} class="img-sm" width="150" />
                          </div>
                          <figcaption class="info">
                          <a href="#" class="title text-dark"
                              >${itemCarrito.name}</a
                          >
                          </figcaption>
                      </figure>
                      </td>
                      <td>
                          <input class="cantidadItem" id="cantidad${i}" type="number" value=${ itemCarrito.count} min="0" max="1000" step="1" onchange="actualizar(${i});"/>
                      </td>
                      <td>
                      <div class="price-wrap">
                          <var class="price">${itemCarrito.currency} <var class="priceItem" id="price${i}">${itemCarrito.count * itemCarrito.unitCost}</var></var><br>
                          <small class="text-muted" >${itemCarrito.currency} <var class="text-muted" id="precioUnitario${i}"> ${ itemCarrito.unitCost} </var> c/u</small>
                      </div>
                  
                      </td>
            <td class="text-right">
                      <button
                          data-original-title="Save to Wishlist"
                          title=""
                          
                          class="btn btn-light"
                          data-toggle="tooltip"
                      >
                          <i class="fa fa-heart"></i
                      ></button>
  
              <button  class="btn btn-light" id="borrar${i}" onclick="borrarItem(${i});"> <i class="fas fa-trash-alt"></i></button>
                      </td>
                  </tr>
    </tbody>
    </table>
    `;
    }
    // Si hay un carrito guardado en local storage trae ese carrito
     if (localStorage["guardarCarrito"] != null) {
      document.getElementById("itemsCarrito").innerHTML = JSON.parse(localStorage["guardarCarrito"]);
  
      
      for (let i = 0; i < array.length; i++) {
        if (localStorage[`guardarCantidad${i}`] != 0){
      document.getElementById(`cantidad${i}`).value = JSON.parse(localStorage[`guardarCantidad${i}`]);
      }
    }
       } 
  
      //  Si no hay un carrito guardado en localStorage crea uno nuevo y lo guarda en localStorage
      else { 
    document.getElementById("itemsCarrito").innerHTML = listadoCarrito;
    localStorage["guardarCarrito"] = JSON.stringify($("#itemsCarrito").html());
  
    for (let i = 0; i < array.length; i++) {
       localStorage[`guardarCantidad${i}`] = document.getElementById(`cantidad${i}`).value;
      }
      }
  
    
  }
  
  // Función que se ejecuta al cambiar la cantidad de un producto, calcula el precio total del item
  function actualizar(indice) {
    cantidad = document.getElementById(`cantidad${indice}`).value;
    precioUnit = JSON.parse(document.getElementById(`precioUnitario${indice}`).innerHTML);
  
    totalItem = cantidad * precioUnit;
  
    document.getElementById(`price${indice}`).innerHTML = totalItem;
    calcularST();
    localStorage["guardarCarrito"] = JSON.stringify($("#itemsCarrito").html());
    localStorage[`guardarCantidad${indice}`] = cantidad;
    // Se guardan modificaciones hechas al carrito en localStorage
  }
  
  // Función que realiza la suma del subtotal, se ejecuta al actualizar cantidades. 
  function calcularST() {
    sumatoria = document.querySelectorAll(".priceItem");
    cantidades = document.querySelectorAll(".cantidadItem");
    
    var st = 0;
    var envio = 0;
    var total = 0;
   
    // Calculo subtotal
    for (let i = 0; i < sumatoria.length; i++) {
      const sumat = sumatoria[i].innerHTML;
      st += parseFloat(sumat);
    }
  
    document.getElementById("subTotal").innerHTML = "USD" + " " + st;
  
  
  
    // Calculo del total
    total = (parseFloat(st) + parseFloat(envio)).toFixed(2); //redondeamos el numero para mantener solo 2 decimales
    document.getElementById("total").innerHTML = "USD" + " " + total;
  
   
  }
  
  
  
  //Función que se ejecuta una vez que se haya lanzado el evento de
  //que el documento se encuentra cargado, es decir, se encuentran todos los
  //elementos HTML presentes.
  document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(CART_INFO_URL).then(function (resultObj) {
      if (resultObj.status === "ok") {
        itemsCarrito = resultObj.data.articles;
        console.log(itemsCarrito);
        mostrarCarrito(itemsCarrito);
        calcularST();
      }
    });
  });
  
  // Función para borrar item del carrito
  function borrarItem(indice) {
    document.getElementById(`item${indice}`).remove();
    localStorage[`guardarCantidad${indice}`] = 0;
    calcularST();
    localStorage["guardarCarrito"] = JSON.stringify($("#itemsCarrito").html());
  };
  
  
  
  