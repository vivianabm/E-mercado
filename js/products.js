var categoriesArray = [];

function showProductsList(){

    let htmlContentToAppend = "";
    for(let i = 0; i < currentProductsArray.length; i++){
        let products = currentProductsArray[i];
htmlContentToAppend += `
<tr>
                <td>` + currentProductsArray[i].name + `</td>
                <td>`+ currentProductsArray[i].cost + `</td>
                <td>`+ currentProductsArray[i].description + `</td>
            
                </tr> 

            `;
        }

        document.getElementById("results").innerHTML = htmlContentToAppend;
    }

















//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCTS_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            categoriesArray = resultObj.data;
            //Muestro las categorías ordenadas
            showCategoriesList(categoriesArray);
        }
    });
});
