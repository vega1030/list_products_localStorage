
//Clase modal
var modalcarga = new bootstrap.Modal(document.getElementById('staticBackdrop'), {}) //no me acepto el cambio de id en el modal

//Captura pantallas
let interfazComienzo = document.getElementById('interfaz1');
let interfazListado = document.getElementById('interfazlistado');
let pantallaFinal = document.getElementById('pantallafinal');
let uiFormLogin = document.querySelector('#formLogin')
let uiWelcome = document.querySelector ('#contentEmptyList')
let contentModelNameUser = document.getElementById('sectionNameUser');
let flagUiValidate = false
let linkListUi = document.getElementById('linkViewList')
//Captura de datos 

let padre = document.getElementById('padre');

//*************SAVE NAME USER IN LOCALSTORAGE******************* */

const viewNameInDom = (nameDom='')=>{

    const contentModelWelcomeNoName = document.getElementById('sectionWelcome');
  
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
        uiWelcome.style.display = 'flex'
        flagUiValidate = true
        uiFormLogin.style.display = 'none'
    }
}

const btnName = document.getElementById('sendNameUser').addEventListener('click', ()=>{
    const userName = document.getElementById('nameUserInput').value;
    console.log(localStorage.getItem('name'))
    //validation of name and view in HTML5

    if (userName === '' &&localStorage.getItem('name') === null) {
        alert('Complete with your Name');
        uiFormLogin.style.display='flex';
        interfazComienzo.style.display = 'none'
        localStorage.getItem('name');
        
    }

    else{
        localStorage.setItem('name', userName);
        viewNameInDom(localStorage.getItem('name'));
        uiFormLogin.style.display='none';
        uiWelcome.style.display = 'flex';
        interfazComienzo.style.display = 'flex';
        contentModelNameUser.style.display = 'flex';
    }
        
    })
//************************ */

//************* Delete user at localStorage */
const btnclearUser = document.querySelector('#clearNameStorage').addEventListener('click',()=>{
    localStorage.removeItem('name');
    const clearNameUser = document.getElementById('nameUserInput');
    clearNameUser.value = '';
    window.location.reload();
})
//******************************* */


//************ Load user name when refresh page*/

window.addEventListener('DOMContentLoaded',()=>{
    viewNameInDom(localStorage.getItem('name'))
    flagUiValidate === false? interfazComienzo.style.display = 'none':interfazComienzo.style.display = 'display'
    
    
});

//******************************* */


    //View list in HTML


//******************* Save list in localStorage and view in html *******/
const saveDataLocalStorage = (data='') => {
    if(data==='' || null){
    interfazListado.style.display = 'none'
    return console.log('error')

    }
    else {
        let dataLocalStorage = [];
        dataLocalStorage = JSON.parse(localStorage.getItem('lists')) || [];
        dataLocalStorage.push(data)
        localStorage.setItem('lists', JSON.stringify(dataLocalStorage))
        const dataStorageParce = JSON.parse(localStorage.getItem('lists'))
        viewListHTML(dataStorageParce)

    }
}

let dataStorageParce = JSON.parse(localStorage.getItem('lists'))


const buttonGuardar = document.getElementById('btnguardar').addEventListener('click', ()=> {
    
    //input
    const inputProducto = document.getElementById('inputalimento').value;
    //seleccion icono
    const seleccion = document.getElementById('seleccionicono').value;
    //text area
    const textArea = document.getElementById('detalle').value;
    const id =  crypto.randomUUID().slice(4,13)
    const listProducts= {
        product:inputProducto,
        select:seleccion,
        textArea:textArea,
        id:id
    }

    console.log(listProducts)
    listProducts.product && listProducts.select && listProducts.textArea !=='' 
    ? saveDataLocalStorage(listProducts): console.log('list error')
    
    
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

//******************************* */



//********** Fuction view list in HTML *******
const viewListHTML = (data='') =>{

    if(data!==null){

        let modeloLista = ''
            
        data.forEach((element, index)=>{
            modeloLista += `
            <li class="list-group-item" data-producto="${element.product}" data-icono="${element.select}" data-detalle="${element.textArea}" data-id="${element.id}"><img src="${element.select}" alt="${element.product}" class="contenido3__icono">
            ${element.product}
            </li>`
            padre.innerHTML = modeloLista
            })

        }
    }

//******************************* */


//****************** view list with </a> tag ******/ 
/* This is a function that is called when the user clicks on the link to view the list. */
linkListUi.addEventListener('click',()=>{

    interfazListado.style.display = 'block'
    interfazComienzo.style.display = 'none'
    const dataStorageParce = JSON.parse(localStorage.getItem('lists'))
    viewListHTML(dataStorageParce)

    })

//******************************* */



localStorage.getItem('lists')!==null? linkListUi.style.display = 'flex' :
linkListUi.style.display = 'none'
//********************************/


//**************** Delete Fuction */

const btnDelete = document.querySelector('#btn_delete')
btnDelete.addEventListener('click', ()=>{
const data_Id_Btn = btnDelete.getAttribute('data-id')


const deleted = (productId='')=>{
    dataStorageParce = dataStorageParce.filter(data=>{
        return data.id != productId;

        // productIdParse.indexOf(index) == -1
        
    })

}
deleted(data_Id_Btn)
const filterDataParse = dataStorageParce
console.log('data filtrada',filterDataParse)

})


//********************************/

const llamadaFinal = document.getElementById('padre').addEventListener('click', (e)=> {
    const buttons = document.getElementById('buttons')
    
    document.getElementById('subtitulofinal').innerHTML = e.target.getAttribute('data-producto')
    document.getElementById('iconocontenido4').src = e.target.getAttribute('data-icono')
    document.getElementById('detallefinal').innerHTML = e.target.getAttribute('data-detalle')
    pantallaFinal.style.display = 'block'
    interfazListado.style.display = 'none'
    buttons.style.display = 'block'

    document.getElementById('btn_delete').setAttribute('data-id',e.target.getAttribute('data-id'))

})




const forwardButton = document.querySelector('#forwardButton').addEventListener('click', ()=>{
    interfazComienzo.style.display = 'flex'
    interfazListado.style.display = 'none'
    location.reload()
})