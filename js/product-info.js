var product = {};

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

// Funcion para ingresar comentario nuevo
function loadComments() {
    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            // Muestro los comentarios guardados
            showFeedback(resultObj.data);

            // Generar comentario nuevo
            let form = document.getElementById('leaveCommentForm');
            form.addEventListener('submit', function (e) {
                e.preventDefault();

                let rate = document.getElementById('formRate').value;
                let message = document.getElementById('formMessage').value;
                let name = document.getElementById('formName').value;
                // formateamos la fecha
                let tzoffset = (new Date()).getTimezoneOffset() * 60000; // Creamos objeto "Date" vacio, con el método getTimezoneOffset (en minutos)*60000(60*1000=60000 milisegundos) expresamos la hora local en milisegundos
                let date = (new Date(Date.now() - tzoffset)).toISOString().substr(0, 19).replace('T', ' '); // el método toISOString me devuelve la cadena en formato simplificado extendido
                                                                                                            // con el método substr devuelvo los caracteres que quiero inicio en 0 y longitud de 19 caracteres

                // Convertimos comentarios en un objeto
                let comment = {
                    'score': rate,
                    'description': message,
                    'user': name,
                    'dateTime': date
                };

                // Añadir nuevo comentario al array, mostrar comentarios, limpiar formulario
                resultObj.data.push(comment); // con método push añadimos comentario
                showFeedback(resultObj.data);
                document.getElementById('leaveCommentForm').reset();
            });
        }
    });
}

// Funcion con la que mostramos los comentarios
function showFeedback(array) {
    let htmlContentToAppend = "";

    // Recorremos todos los comentarios con el for
    for (let i = 0; i < array.length; i++) {
        let feed = array[i];
        let user = feed.user;
        let comment = feed.description;
        let date = feed.dateTime;

        htmlContentToAppend += `
        <div class="list-group-item list-group-item-action">
            <div class="d-flex w-100 justify-content-between">
                <div class="flex-column">
                    <h5 class="mb-3"><b>` + user + `</b> dice:</h5>
                    <span class="ml-3">"` + comment + `"</span>
                </div>
                <div class="row d-flex">
                    <small class="text-muted">` + date + `</small>
                </div>
            </div>
            <div class="mt-3 d-flex justify-content-center star-container"> 
                <span class="fa fa-star"></span>
                <span class="fa fa-star"></span>
                <span class="fa fa-star"></span>
                <span class="fa fa-star"></span>
                <span class="fa fa-star"></span>
            </div>
        </div>
        `;
    }
    document.getElementById('comments').innerHTML = htmlContentToAppend;

    // Obtenemos un array con contenedores de estrellas
    let starCont = document.getElementsByClassName('star-container');
    // Llamamos a la funcion para pintar las estrellas
    fillStars(array, starCont);
}

// Funcion para pintar estrellas
function fillStars(array, starCont) {
    // Recorre los contenedores
    for (let i = 0; i < starCont.length; i++) {
        let rate = array[i].score;

        // Recorre las estrellas del contenedor
        for (let check = 0; check < rate; check++) {
            // Mientras que el numero de estrellas sea menor que el puntaje, la pinta
            let star = starCont[i].children;
            star[check].classList.add('checked');
        }
    }
}
// Funcion con la que mostramos los datos del producto
function showProductData() {
    getJSONData(PRODUCT_INFO_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            product = resultObj.data;

            let productNameHTML = document.getElementById("productName");
            let productDescriptionHTML = document.getElementById("productDescription");
            let productSoldCountHTML = document.getElementById("productSoldCount");
            let productCostHTML = document.getElementById("productCost");

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
    loadComments();

    // Agregar nombre de usuario al form de contacto
    var nameHTML = document.getElementById('formName');
    var name = localStorage.getItem('name');

    if (name) {
        nameHTML.setAttribute('value', name);
    } else {
        nameHTML.setAttribute('value', 'Usuario Anónimo');
    }
    // Impedir modificacion del campo
    nameHTML.classList.add('disabled');
    nameHTML.setAttribute('disabled', 'disabled');
});