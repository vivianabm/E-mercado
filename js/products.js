const ORDER_ASC_BY_NAME = "AZ";
const ORDER_DESC_BY_NAME = "ZA";
const ORDER_BY_PROD_COUNT = "Cant.";
var currentCategoriesArray = [];
var currentSortCriteria = undefined;
var minCount = undefined;
var maxCount = undefined;

function sortCategories(criteria, array){
    let result = [];
    if (criteria === ORDER_ASC_BY_NAME)
    {
        result = array.sort(function(a, b) {
            if ( a.name < b.name ){ return -1; }
            if ( a.name > b.name ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_DESC_BY_NAME){
        result = array.sort(function(a, b) {
            if ( a.name > b.name ){ return -1; }
            if ( a.name < b.name ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_BY_PROD_COUNT){
        result = array.sort(function(a, b) {
            let aCount = parseInt(a.productCount);
            let bCount = parseInt(b.productCount);

            if ( aCount > bCount ){ return -1; }
            if ( aCount < bCount ){ return 1; }
            return 0;
        });
    }

    return result;
}

var productsArray = []; // declaro la variable productsArray como un array vacio donde guardo lo que encuentre en el JSON
function showProductsList(array){ //declaro función

    let htmlContentToAppend = ""; //para no cargar contenido cada vez
    for(let i = 0; i < array.length; i++){ // inicio el contador, recorro la lista y aumento el contador hasta que la condición no sea verdadera
        let product = array[i];
htmlContentToAppend += `
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

 document.getElementById("results").innerHTML = htmlContentToAppend; //agrego el contenido a "results"
}
//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCTS_URL).then(function(resultObj){ // le pasamos por parámetro la URL
        if (resultObj.status === "ok") // si está todo ok ejecuto el código
        {
           productsArray = resultObj.data;
            //Muestro las categorías ordenadas
            showProductsList(productsArray);
        }
    });
});
