
//Clase modal
var modalcarga = new bootstrap.Modal(document.getElementById('staticBackdrop'), {}) //no me acepto el cambio de id en el modal

//Captura pantallas
let interfazComienzo = document.getElementById('interfaz1');
let interfazListado = document.getElementById('interfazlistado');
let pantallaFinal = document.getElementById('pantallafinal');


//Captura de datos 

let padre = document.getElementById('padre');

//*************SAVE NAME USER IN LOCALSTORAGE******************* */

const viewNameInDom = (nameDom='')=>{
    
    const contentModelWelcomeNoName = document.getElementById('sectionWelcome');
    const contentModelNameUser = document.getElementById('sectionNameUser');
    const viewList = document.getElementById('viewList');
  
    //html with user name
    const modelUserName = 

    `            
    <main class="welcomeUser" id="welcomeUser">
        <h1>Welcome</h1>
        <h2>${nameDom}</h2>
    </main>
    `
    const contentUserNameSend = document.getElementById('content_input');

    if (nameDom!==null){
        contentModelNameUser.innerHTML=modelUserName;
        contentModelWelcomeNoName.style.display='none';
        contentUserNameSend.style.display = 'none';

    }
}

//delete user at localStorage
const btnclearUser = document.querySelector('#clearNameStorage').addEventListener('click',()=>{
    localStorage.removeItem('name');
    const clearNameUser = document.getElementById('nameUserInput');
    clearNameUser.value = '';
    window.location.reload();
})

window.addEventListener('DOMContentLoaded',()=>{
    viewNameInDom(localStorage.getItem('name'))   

})
const btnName = document.getElementById('sendNameUser').addEventListener('click', ()=>{
    const userName = document.getElementById('nameUserInput').value;
    const contentEmptyList = document.querySelector('#contentEmptyList')
    // contentEmptyList.style.display='none'
    localStorage.setItem('name', userName) 
    viewNameInDom(localStorage.getItem('name'))   
    })
//******************************* */



//**************************** Save list in localStorage and view in html *******/


const buttonGuardar = document.getElementById('btnguardar').addEventListener('click', ()=> {

    //input
    const inputProducto = document.getElementById('inputalimento').value;
    //seleccion icono
    const seleccion = document.getElementById('seleccionicono').value;
    seleccion === null ? alert('complete with information'): console.log('good') 
    //text area
    const textArea = document.getElementById('detalle').value;

    // if(inputProducto||seleccion||textArea === ''){
    //     alert('completa todo los campos')
    // }
    // else{
    //     buttonGuardar()
    // }

    //View list in HTML
    
    //localStorage
    const listProducts= {
        product:inputProducto,
        select:seleccion,
        textArea:textArea
    }
    const saveDataLocalStorage = (data) => {
        let modeloLista = ''
        let dataLocalStorage = [];
        dataLocalStorage = JSON.parse(localStorage.getItem('listes')) || [];
        dataLocalStorage.push(data)
        localStorage.setItem('listes', JSON.stringify(dataLocalStorage))
        const dataStorageParce = JSON.parse(localStorage.getItem('listes'))
        console.log(dataStorageParce)
        dataStorageParce.forEach((element, index)=>{
            modeloLista = `<li class="list-group-item" data-producto="${element.product}" data-icono="${element.select}" data-detalle="${element.textArea}"><img src="${element.select}" alt="${inputProducto}" class="contenido3__icono">${element.product}</li>`
            padre.innerHTML += modeloLista
        })
        return dataStorageParce
    }
    
    saveDataLocalStorage(listProducts)    
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

const linkListUi = document.getElementById('linkViewList')

localStorage.getItem('listes')!==null? linkListUi.style.display = 'flex' :
console.log('no hay nada')

linkListUi.addEventListener('click',()=>{
    interfazListado.style.display = 'block'
    interfazComienzo.style.display = 'none'

})

//*****/


const llamadaFinal = document.getElementById('padre').addEventListener('click', (e)=> {
    const buttons = document.getElementById('buttons')
    document.getElementById('subtitulofinal').innerHTML = e.target.getAttribute('data-producto')
    document.getElementById('iconocontenido4').src = e.target.getAttribute('data-icono')
    document.getElementById('detallefinal').innerHTML = e.target.getAttribute('data-detalle')
    pantallaFinal.style.display = 'block'
    interfazListado.style.display = 'none'
    buttons.style.display = 'block'

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

