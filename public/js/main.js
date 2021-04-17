
//Clase modal
var modalcarga = new bootstrap.Modal(document.getElementById('staticBackdrop'), {}) //no me acepto el cambio de id en el modal

//Captura pantallas
let interfazComienzo = document.getElementById('interfaz1')
let interfazListado = document.getElementById('interfazlistado')
let pantallaFinal = document.getElementById('pantallafinal')


//Captura de datos 

let padre = document.getElementById('padre');

let buttonGuardar = document.getElementById('btnguardar').addEventListener('click', function () {
    //input
    let inputProducto = document.getElementById('inputalimento').value;
    //seleccion icono
    let seleccion = document.getElementById('seleccionicono').value;
    //text area
    let textArea = document.getElementById('detalle').value;

    //Lista
    let modeloLista = `<li class="list-group-item" data-producto="${inputProducto}" data-icono="${seleccion}" data-detalle="${textArea}"><img src="${seleccion}" alt="${inputProducto}" class="contenido3__icono">${inputProducto}</li>`


    padre.innerHTML += modeloLista

    //reinicio modal
    document.getElementById('inputalimento').value = "";
    document.getElementById('seleccionicono').value = "";
    document.getElementById('detalle').value = "";

    //Instancia de la clase Modal
    modalcarga.hide()

    //displays
    interfazComienzo.style.display = 'none'
    interfazListado.style.display = 'block'
    pantallaFinal.style.display = 'none'

})
//*****/

llamadaFinal = document.getElementById('interfazlistado').addEventListener('click', function (e) {
    document.getElementById('subtitulofinal').innerHTML = e.target.getAttribute('data-producto')
    document.getElementById('iconocontenido4').src = e.target.getAttribute('data-icono')
    document.getElementById('detallefinal').innerHTML = e.target.getAttribute('data-detalle')
    pantallaFinal.style.display = 'block'
    interfazListado.style.display = 'none'
})

cerrarPantallafinal = document.getElementById('cerrardetalle').addEventListener('click', function () {
    pantallaFinal.style.display = 'none'
    interfazListado.style.display = 'block'
})

enviarDetalle = document.getElementById('enviardetalle').addEventListener('click', function () {
    pantallaFinal.style.display = 'none'
    interfazListado.style.display = 'none'
    interfazComienzo.style.display = 'flex'

    alert('Tu listado se envio con exito')


})

//validacion de formulario con ifå