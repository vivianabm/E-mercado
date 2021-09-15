var product = {};
var commentArray = [];



  // Funcion que muestra carousel
function showImagesGallery(array) {
    let htmlContentToAppend = "";
    let carousel = document.getElementById("productImagesGallery");

    // Recorremos cada imagen con el bucle for
    for (let i = 0; i < array.length; i++) {
        let imageSrc = array[i];

    // lo agregamos en el html
        htmlContentToAppend += `
        <div class="carousel-item">
            <img class="d-block" src="` + imageSrc + `" alt="">
        </div>
        `;
    }
    // Llena el carousel con imagenes y muestra la primera
    carousel.innerHTML = htmlContentToAppend;
    carousel.children[0].classList.add('active');
}
 // función para agregar comentario con puntuación
function newComment() {

    let comentText = document.getElementById("text").value;
    let comentScore = document.getElementById('score').value;
    let comentDate = new Date;
    commentArray = {
        "score": comentScore,
        "description": comentText,
        "user": JSON.parse(localStorage.getItem("User-Logged")).usuario, //traigo el usuario logeado
        "dateTime": comentDate.getFullYear() + "-" + comentDate.getMonth() + "-" + comentDate.getDate() + " " + comentDate.getHours() + ":" + comentDate.getMinutes() + ":" + comentDate.getSeconds() //fecha y hora de comentario nuevo
    }
  
    localStorage.setItem('newComment', JSON.stringify(commentArray));
};

// función para mostrar los comentarios
function showComments() {
    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            commentsArray = resultObj.data;
            
//agregamos comentario nuevo a listado de comentarios
            if (localStorage.getItem('newComment')) {
                let sentComment = JSON.parse(localStorage.getItem('newComment'))
                commentsArray.push(sentComment)
            }

            let commentToShow = "";  //recorremos los comentarios con el for y accedemos a los atributos
            for (let i = 0; i < commentsArray.length; i++) {
                let comment = commentsArray[i];

                let starsScore = comment.score;
                let filledStars = ` <span class="fa fa-star checked"></span> `;
                let blankStars = ` <span class="fa fa-star"></span> `;
                let calification = filledStars.repeat(starsScore) + blankStars.repeat(5 - starsScore); // calificación con estrellas pintadas

                commentToShow += `
                <dt class="d-inline">`+ comment.user + `</dt>
                <p class="d-inline">- `+ comment.dateTime + ` -</p>
                `+ calification + `
                <dd><p class="text-muted">`+ comment.description + `</p></dd>
                <hr class="my-3">
                `
            }
            document.getElementById("comments").innerHTML = commentToShow;
        }
    })
};
// Funcion con la que mostramos los datos del producto
function showProductData() {
    getJSONData(PRODUCT_INFO_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            product = resultObj.data;

            // accedemos a los id del Html y le agregamos con innerHTML los atributos del producto que vamos a mostrar
            let productCategoryHTML= document.getElementById("productCategory");
            let productNameHTML = document.getElementById("productName");
            let productDescriptionHTML = document.getElementById("productDescription");
            let productSoldCountHTML = document.getElementById("productSoldCount");
            let productCostHTML = document.getElementById("productCost");

            productCategoryHTML.innerHTML = product.category;
            productNameHTML.innerHTML = product.name;
            productDescriptionHTML.innerHTML = product.description;
            productSoldCountHTML.innerHTML = product.soldCount;
            productCostHTML.innerHTML = product.currency + ' ' + product.cost;

            // Llama a funcion para mostrar carousel
            showImagesGallery(product.images);
           
        }
    });
}


//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function () {
    showProductData();
   
    
    showComments();

});