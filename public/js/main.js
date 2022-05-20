
//Clase modal
var myModal = new bootstrap.Modal(
    document.getElementById('exampleModal'),{
        backdrop:'static'
    })


//Captura pantallas
let uiStart = document.getElementById('interfaz1');
let uiList = document.getElementById('interfazlistado');
let uiFinish = document.getElementById('pantallafinal');
let uiFormLogin = document.querySelector('#formLogin')
let uiWelcome = document.querySelector ('#contentEmptyList')
let contentModelNameUser = document.getElementById('sectionNameUser');
let flagUiValidate = false
let linkListUi = document.getElementById('linkViewList')
//Captura de datos 

let padre = document.getElementById('padre');

//*************SAVE NAME USER IN LOCALSTORAGE******************* */

/**
 * It takes a string as an argument and returns a string
 * @param [nameDom] - The name of the user that is passed to the function.
 */
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

/* This is a function that is called when the user clicks on the button to save the name. */
const btnName = document.getElementById('sendNameUser').addEventListener('click', ()=>{
    const userName = document.getElementById('nameUserInput').value;
    //validation of name and view in HTML5

    if (userName === '' &&localStorage.getItem('name') === null) {
        alert('Complete with your Name');
        uiFormLogin.style.display='flex';
        uiStart.style.display = 'none'
        localStorage.getItem('name');
        
    }

    else{
        localStorage.setItem('name', userName);
        viewNameInDom(localStorage.getItem('name'));
        uiFormLogin.style.display='none';
        uiWelcome.style.display = 'flex';
        uiStart.style.display = 'flex';
        contentModelNameUser.style.display = 'flex';
    }
        
    })
//************************ */

//************* Delete user at localStorage */
const btnclearStorage = document.querySelector('#clearStorage').addEventListener('click',()=>{
    localStorage.removeItem('name');
    localStorage.removeItem('lists');
    const clearNameUser = document.getElementById('nameUserInput');
    clearNameUser.value = '';
    window.location.reload();
})
//******************************* */


//************ Load user name when refresh page*/

window.addEventListener('DOMContentLoaded',()=>{
    viewNameInDom(localStorage.getItem('name'))
    flagUiValidate === false? uiStart.style.display = 'none':uiStart.style.display = 'display'
    
    
});

//******************************* */


    //View list in HTML


//******************* Save list in localStorage and view in html *******/
/**
 * 
 * @param [data] - The data to be saved in localStorage.
 */
const saveDataLocalStorage = (data='') => {

    if(data==='' || null ){
    uiList.style.display = 'none'
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

    listProducts.product && listProducts.select && listProducts.textArea !=='' 
    ? saveDataLocalStorage(listProducts): console.log('list error')
    
    
    //reset modal
    document.getElementById('inputalimento').value = "";
    document.getElementById('seleccionicono').value = "";
    document.getElementById('detalle').value = "";
    

    //displays
    uiStart.style.display = 'none'
    uiList.style.display = 'block'
    uiFinish.style.display = 'none'   
})

//******************************* */



//********** Fuction view list in HTML *******
/**
 * It takes an array of objects as an argument, and returns a string of HTML
 * @param [data] - The data that will be used to create the list.
 */
const viewListHTML = (data='') =>{

    if(data!==null){

        let modeloLista = ''
            
        data.forEach((element)=>{
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


JSON.parse(localStorage.getItem('lists'))=== null || JSON.parse(localStorage.getItem('lists')).length===0?
linkListUi.style.display = 'none':linkListUi.style.display = 'flex'

linkListUi.addEventListener('click',()=>{
    uiList.style.display = 'block'
    uiStart.style.display = 'none'
    const dataStorageParce = JSON.parse(localStorage.getItem('lists'))
    viewListHTML(dataStorageParce)
    })


//********************************/


//**************** Delete Element in LocalStorage */

/* This is a function that is called when the user clicks on the button to delete the list.
And remove individual item at LocalStorage
*/
const btnDelete = document.querySelector('#btn_delete')

btnDelete.addEventListener('click', ()=>{
const data_Id_Btn = btnDelete.getAttribute('data-id')


const deleted = (productId='')=>{
    dataStorageParce = dataStorageParce.filter(data=>{
        return data.id != productId;
        
    })

}
deleted(data_Id_Btn)
const filterDataParse = dataStorageParce
localStorage.setItem('lists',JSON.stringify(filterDataParse))


uiFinish.style.display ='none'
uiStart.style.display='block'
location.reload()
})


//********************************/


// Edit element

const editElement = (element)=>{
    const editInput = document.querySelector('#inputalimento');
    const editIcon = document.querySelector('#seleccionicono');
    const editComment  = document.querySelector('#detalle')
    console.log(editComment.value)
    console.log(editIcon.value)
    element.forEach(data =>{
        editInput.value = data.product
        editIcon.options = data.select
        editComment.value = data.textArea 
    })
}

const btnEdit = document.querySelector('#btn_edit');
btnEdit.addEventListener('click', ()=>{
    editElement(JSON.parse(localStorage.getItem('lists')))})

const editBtn = document.querySelector('#saveChanges')


/* This is a function that is called when the user clicks on the list item. */

const llamadaFinal = document.getElementById('padre').addEventListener('click', (e)=> {
    const buttons = document.getElementById('buttons')
    
    document.getElementById('subtitulofinal').innerHTML = e.target.getAttribute('data-producto')
    document.getElementById('iconocontenido4').src = e.target.getAttribute('data-icono')
    document.getElementById('detallefinal').innerHTML = e.target.getAttribute('data-detalle')
    uiFinish.style.display = 'block'
    uiList.style.display = 'none'
    buttons.style.display = 'block'

    document.getElementById('btn_delete').setAttribute('data-id',e.target.getAttribute('data-id'))

})


/* This is a function that is called when the user clicks on the button to return to the main screen. */
const forwardButton = document.querySelector('#forwardButton').addEventListener('click', ()=>{
    uiStart.style.display = 'flex'
    uiList.style.display = 'none'
    location.reload()
})