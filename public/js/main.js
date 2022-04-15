
//Clase modal
var modalcarga = new bootstrap.Modal(document.getElementById('staticBackdrop'), {}) //no me acepto el cambio de id en el modal

//Captura pantallas
let interfazComienzo = document.getElementById('interfaz1')
let interfazListado = document.getElementById('interfazlistado')
let pantallaFinal = document.getElementById('pantallafinal')


//Captura de datos 

let padre = document.getElementById('padre');

//*************SAVE NAME USER IN LOCALSTORAGE******************* */

const viewNameInDom = (nameDom)=>{
    
    const contentEmptyList = document.getElementById('contentEmptyList')
    const modelHeader = 
    `            
    <main class="welcomeUser"><h1>Welcome</h1><h2>${nameDom}</h2>
    `
    contentEmptyList.innerHTML=modelHeader    

}

const saveNameUser = (nameUser) =>{
    localStorage.setItem('name', nameUser) 
    viewNameInDom(localStorage.getItem('name'))   
        }


    //******************************* */

    window.addEventListener('DOMContentLoaded',()=>{
        viewNameInDom(localStorage.getItem('name'))   
    
    })


const btnName = document.getElementById('sendNameUser').addEventListener('click', ()=>{
    const contentEmptyList = document.querySelector('#contentEmptyList')
    // contentEmptyList.style.display='none'
    const userName = document.getElementById('nameUserInput').value;
        saveNameUser(userName)
    })
   

const buttonGuardar = document.getElementById('btnguardar').addEventListener('click', ()=> {
    
    //Validate form information

    //input
    const inputProducto = document.getElementById('inputalimento').value;
    //seleccion icono
    const seleccion = document.getElementById('seleccionicono').value;
    seleccion === null ? alert('complete with information'): console.log('good') 
    //text area
    const textArea = document.getElementById('detalle').value;


    //Lista
    const modeloLista = `<li class="list-group-item" data-producto="${inputProducto}" data-icono="${seleccion}" data-detalle="${textArea}"><img src="${seleccion}" alt="${inputProducto}" class="contenido3__icono">${inputProducto}</li>`

    //View list in HTML
    padre.innerHTML += modeloLista

    //localStorage
    const listProducts= {
        product:inputProducto,
        select:seleccion,
        textArea:textArea
    }
    const saveDataLocalStorage = (data) => {
        let dataLocalStorage = [];
        dataLocalStorage = JSON.parse(localStorage.getItem('lists')) || [];
        dataLocalStorage.push(data)
        localStorage.setItem('lists', JSON.stringify(dataLocalStorage))
        const dataStorageParce = JSON.parse(localStorage.getItem('lists'))
        console.log(dataStorageParce)
        return dataStorageParce
    }
    
    saveDataLocalStorage(listProducts)

    // localStorage.setItem('list',JSON.stringify(listProducts));
    
    // const listProductsLocalStorage = JSON.parse(localStorage.getItem('list'));



    // Object.values(listProductsLocalStorage).forEach(val=>{console.log('in forEach: ',val.product)})


    
    const ui1 = document.querySelector('#interfaz1')
    
    
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


const llamadaFinal = document.getElementById('padre').addEventListener('click',  (e)=> {
    const buttons = document.getElementById('buttons')
    document.getElementById('subtitulofinal').innerHTML = e.target.getAttribute('data-producto')
    document.getElementById('iconocontenido4').src = e.target.getAttribute('data-icono')
    document.getElementById('detallefinal').innerHTML = e.target.getAttribute('data-detalle')
    pantallaFinal.style.display = 'block'
    interfazListado.style.display = 'none'
    buttons.style.display = 'block'
    userName.style.display = 'none'

})

const cerrarPantallafinal = document.getElementById('cerrardetalle').addEventListener('click', function () {
    pantallaFinal.style.display = 'none'
    interfazListado.style.display = 'block'
})

const enviarDetalle = document.getElementById('enviardetalle').addEventListener('click', function () {
    pantallaFinal.style.display = 'none'
    interfazListado.style.display = 'none'
    interfazComienzo.style.display = 'flex'

    alert('Tu listado se envio con exito')


})

//validacion de formulario con ifå