var productsArray = []; // declaro la variable productsArray como un array vacio donde guardo lo que encuentre en el JSON

const ORDER_ASC_BY_PRECIO = "precio menor->PRECIO MAYOR";
const ORDER_DESC_BY_PRECIO = "PRECIO MAYOR->precio menor";
const ORDER_DESC_BY_REL= "MAYOR COSTO->costo menor";


var minPrecio = undefined;
var maxPrecio = undefined;
var buscar = undefined;
function sortProducts(criterio,array){ //ordeno el listado de productos por precio ascendente, descendente y  descendente según relevancia
    let result = [];

    if (criterio === ORDER_ASC_BY_PRECIO) {
        result = array.sort(function(a,b) {
            if (a.cost < b.cost) {return -1 ;}
            if(a.cost>b.cost) {return 1;}
            return 0;
        });

     } else  if (criterio === ORDER_DESC_BY_PRECIO) {
            result = array.sort(function(a,b) {
                if (a.cost > b.cost) {return -1 ;}
                if(a.cost<b.cost) {return 1;}
                return 0;
            });

    }else if (criterio === ORDER_DESC_BY_REL) {
        result = array.sort(function(a,b){
            if (a.soldCount > b.soldCount) {return -1 ;}
            if(a.soldCount<b.soldCount) {return 1;}
            return 0;
        });
    }
    return result;
}



function showProductsList(array){ //declaro función que muestra los productos

    let htmlContentToAppend = ""; //para no cargar contenido cada vez
    for(let i = 0; i < array.length; i++){ // inicio el contador, recorro la lista y aumento el contador hasta que la condición no sea verdadera
        let product = array[i];
        if(((minPrecio == undefined)||(minPrecio != undefined && parseInt(product.cost)>=minPrecio))&&
        ((maxPrecio == undefined)|| (maxPrecio != undefined&& parseInt(product.cost)<=maxPrecio))){
            if(buscar == undefined || product.name.toLowerCase().indexOf(buscar)!= -1 ){
htmlContentToAppend += `
<a href="product-info.html" class="list-group-item list-group-item-action">
            <div class="row"> 
                <div class="col-3">
                    <img src="` + product.imgSrc + `" alt="` + `" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                    <div class="mb-1">
                        <h4 class="mb-1">`+ product.name +`</h4>
                        <p>` + product.description +`<p>
                        <p>` + product.cost +  " " + product.currency +`<p>
                        </div>
                        <small class="text-muted">` + product.soldCount + ` artículos</small>
                    </div>
 
                </div>
            </div>
        </div>
      
    `
 }
}

 document.getElementById("prod-list-container").innerHTML = htmlContentToAppend; //agrego el contenido a "results"
}
}
//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCTS_URL).then(function(resultObj){ // le pasamos por parámetro la URL
        if (resultObj.status === "ok") // si está todo ok ejecuto el código
        { productsArray = resultObj.data;
            productsArray = sortProducts(ORDER_ASC_BY_PRECIO, productsArray)
            
           
            showProductsList(productsArray);
        }
    });
document.getElementById("sortAsc").addEventListener("click", function(){
    productsArray = sortProducts(ORDER_ASC_BY_PRECIO, productsArray); // ordeno por precio ascendente cuando se hace click
    showProductsList(productsArray);
});

document.getElementById("sortDesc").addEventListener("click",function(){
    productsArray = sortProducts(ORDER_DESC_BY_PRECIO, productsArray); // ordeno por precio descendente cuando se hace click
    showProductsList(productsArray);
});

document.getElementById("sortByCount").addEventListener("click",function(){ 
    productsArray = sortProducts(ORDER_DESC_BY_REL, productsArray); //ordeno por relevancia cuando se hace click
    showProductsList(productsArray);
});





    document.getElementById("rangeFilterCount").addEventListener("click", function() {
        minPrecio = document.getElementById("rangeFilterCountMin").value;
        maxPrecio = document.getElementById("rangeFilterCountMax").value;
 
    if ((minPrecio != undefined) && (minPrecio != "") && (parseInt(minPrecio)) >= 0) {
        minPrecio = parseInt(minPrecio);
    }   
    else {
        minPrecio = undefined;
    } 
    
    if ((maxPrecio != undefined) &&(maxPrecio != "")&& (parseInt(maxPrecio))>=0){
        maxPrecio = parseInt(maxPrecio);
    }   
    else {
        maxPrecio = undefined;
    } 
 
    showProductsList(productsArray)


});

document.getElementById('clearRangeFilter').addEventListener("click", function()
{
    document.getElementById("rangeFilterCountMin").value = "";
    document.getElementById("rangeFilterCountMax").value = "";
 
    minPrecio = undefined;
    maxPrecio = undefined;
    showProductsList(productsArray)
});
document.getElementById("buscador").addEventListener("input", function() {

    buscar = document.getElementById("buscador").value.toLowerCase();
    showProductsList(productsArray);
});
});