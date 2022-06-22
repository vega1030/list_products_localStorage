
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
let optionsInUiStart = document.querySelector('#options_list')
let div_btn_foward = document.querySelector('#div_btn_foward')
const content_btn_add = document.querySelector ('#content_button_add')
let padre = document.getElementById('padre');


//Captura de datos 


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
        content_btn_add.style.display='flex'
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
    window.location.reload()
})
//******************************* */


//************ Load user name when refresh page*/

window.addEventListener('DOMContentLoaded',()=>{
    viewNameInDom(localStorage.getItem('name'))
    flagUiValidate === false? uiStart.style.display = 'none':uiStart.style.display = 'display'
    
    
});

//******************************* */


    //View list at HTML


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

//************* Notifications ********************************************//

/**
 * The function creates a notification div with a message and displays it for 3 seconds
 */
const notification = (message='',color='')=>{
    const section_notifications = document.querySelector('#content_notifications')
    let modelNotificationDOM = 
    
    `<div class="content_notification" id="notification_save_data">
        <p class="save_ok ${color}" id="message_save">
            ${message}
        </p>
    </div>                
    `    
    section_notifications.innerHTML=modelNotificationDOM
    section_notifications.style.display='flex'

    const timeDiv = ()=>setTimeout(() => section_notifications.remove(),3000)
    timeDiv()

    // flag===true? timeOutNotification():console.log('error');
}
    

/*******************---------------------------------***************** */



const buttonGuardar = document.getElementById('btnguardar').addEventListener('click', ()=> {
    const saveInfo = ()=>{
        //input
            const messageNotification = 'Save data OK!'
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
             
            if (listProducts.product && listProducts.select && listProducts.textArea !==''){
                saveDataLocalStorage(listProducts)
                notification(messageNotification,'save_ok')
            } 
             else{
                console.log('list error')
             }
     
            //reset modal
            document.getElementById('inputalimento').value = "";
            document.getElementById('seleccionicono').value = "";
            document.getElementById('detalle').value = "";
        }
     
    saveInfo();
    window.location.reload()    

    //displays
    uiStart.style.display = 'none'
    uiList.style.display = 'flex'
    uiFinish.style.display = 'none' 
    div_btn_foward.style.display='flex'  
})


    

/**
 * It takes an array of objects as an argument, and returns a string of HTML
 * @param [data] - The data that will be used to create the list.
 */
const viewListHTML = (data='',flag=null) =>{

    if(data!==null||flag ===true){

        let modeloLista = ''
            
        data.forEach((element)=>{
            modeloLista += `
            <li class="list-group-item list_products" data-producto="${element.product}" data-icono="${element.select}" data-detalle="${element.textArea}" data-id="${element.id}"><img src="${element.select}" alt="${element.product}" class="contenido3__icono">
            ${element.product}
            </li>`
            padre.innerHTML = modeloLista
            })

        }
    }

//******************************* */



//****************** view list with option tag ******/ 
/* This is a function that is called when the user clicks on the link to view the list. */


JSON.parse(localStorage.getItem('lists'))=== null || JSON.parse(localStorage.getItem('lists')).length===0?
optionsInUiStart.style.display = 'none':optionsInUiStart.style.display = 'flex'

linkListUi.addEventListener('click',()=>{
    uiList.style.display = 'flex'
    uiStart.style.display = 'none'
    div_btn_foward.style.display='flex'
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

const messageDelete = 'Delete element complete!'

const deleted = (productId='')=>{
    dataStorageParce = dataStorageParce.filter(data=>{
        return data.id != productId;       
    })

}

deleted(data_Id_Btn)
const filterDataParse = dataStorageParce
localStorage.setItem('lists',JSON.stringify(filterDataParse))
  
notification(messageDelete,'delete_ok')

loadDOMList()

})


//************----------------------------------*************/




    //listener of btn Edit

const btn_Edit = document.querySelector('#btn_edit').addEventListener('click', ()=>{
    //******* Call modal edit *********/ 

const editElement = (element)=>{
    const modalEdit = document.querySelector('#modalEdit')
    let modelModalEdit = ''
    element.forEach(item=>{
        modelModalEdit=
        `
        <div class="mb-3" id="inputContent">
        <label for="inputalimento" class="form-label">Ingresa nombre del producto</label>
        <input type="text" class="form-control" id="editInputProduct"
            placeholder="Verdura/bebidas/comida para mi gato" maxlength="10" required="required" value=${item.product}>
    </div>
    <label for="seleccionicono" class="form-label">Ingresa nombre del producto</label>
    <select class="form-select" aria-label="Default select example" id="editSeletIcon">
        <option selected>Elegi la categoria</option>
        <option value="img/comidita.svg">Comidita</option>
        <option value="img/electronica.svg">Electronica</option>
        <option value="img/ferreteria2.svg">Ferreteria</option>
        <option value="img/limpieza.svg">Limpieza</option>
        <option value="img/mascota.svg">Mascotas</option>
        <option value="img/perfumeria.svg">Perfumeria</option>
        <option value="img/varios.svg">Varios</option>
    </select>
    <div class="mb-3">
        <label for="detalle" class="form-label">Detalles que quieras recordar</label>
        <textarea class="form-control2" id="editDetail" rows="3" maxlength="20" required="required">${item.textArea}</textarea>
    </div>
    
        `
        console.log(element);
    })
    modalEdit.innerHTML=modelModalEdit

    }
//************----------------------------------*************/
    editElement(JSON.parse(localStorage.getItem('lists')))
})

const saveEditBtn = document.querySelector('#saveChanges')
saveEditBtn.addEventListener('click', ()=>{
    const message_Notification = 'Edit complete'
    const inputProduct = document.getElementById('editInputProduct').value;
    //seleccion icono
    const selectIcon = document.getElementById('editSeletIcon').value;
    //text area
    const textAreaEdited = document.getElementById('editDetail').value;
    const data_Id_Btn = btnDelete.getAttribute('data-id')
    const editListProducts= {
        product:inputProduct,
        select:selectIcon,
        textArea:textAreaEdited,
        id:data_Id_Btn
    }
    const dataStorage = JSON.parse(localStorage.getItem('lists'))

    // const updateData = dataStorage.forEach(x=>(x.id === data_Id_Btn?{...x,update:3}:x))
    // console.log(dataStorage)

    const newUpdate = dataStorage.findIndex(element=>element.id ===editListProducts.id)
    //update at localStorage and parse JSON to String
    dataStorage.splice(newUpdate,1,editListProducts)

    localStorage.setItem('lists', JSON.stringify(dataStorage))
    myModal.hide()
    
 
    // notification(message_Notification,'edit_color_font')
    loadDOMList()
})



//************---------------------------------------------------------------- */

/* This is a function that is called when the user clicks on the list item. */

const llamadaFinal = document.getElementById('padre').addEventListener('click', (e)=> {
    const buttons = document.getElementById('buttons');
    let content_ForwardListUi_to_MainUi= document.querySelector('#content_forwardButtonToListUi');


    document.getElementById('subtitulofinal').innerHTML = e.target.getAttribute('data-producto');
    document.getElementById('iconocontenido4').src = e.target.getAttribute('data-icono');
    document.getElementById('detallefinal').innerHTML = e.target.getAttribute('data-detalle');
    uiFinish.style.display = 'flex';
    uiList.style.display = 'none';
    buttons.style.display = 'flex';
    content_ForwardListUi_to_MainUi.style.display = 'flex';
    div_btn_foward.style.display = 'none';

    content_ForwardListUi_to_MainUi.addEventListener('click',()=>{
        window.location.reload()


    })


    document.getElementById('btn_delete').setAttribute('data-id',e.target.getAttribute('data-id'))
    document.getElementById('btn_edit').setAttribute('data-id',e.target.getAttribute('data-id'))
})


/* This is a function that is called when the user clicks on the button to return to the main screen. */
const forwardButton = document.querySelector('#forwardButton').addEventListener('click', ()=>{
    uiStart.style.display = 'flex'
    content_btn_add.style.display = 'flex'
    uiList.style.display = 'none'
    div_btn_foward.style.display='none'
})

//Load DOM and view list

const loadDOMList = ()=>window.addEventListener('DOMContentLoaded', () => {
    //displays

    
    const displayListDOMLoad = ()=>
    {

        uiStart.style.display = 'none';
        uiList.style.display = 'flex'
        uiFinish.style.display = 'none' 
        div_btn_foward.style.display='flex'
        viewListHTML(dataStorageParce)
    }
    const displayStartDOMLoad = ()=>{
        uiStart.style.display = 'flex';
        content_btn_add.style.display = 'flex'
    }
    
    
        dataStorageParce===null || dataStorageParce.length ===0? displayStartDOMLoad():displayListDOMLoad();
    
    

    
});
loadDOMList()