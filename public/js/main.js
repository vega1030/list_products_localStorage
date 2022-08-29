//Captura pantallas
const uiStart = document.getElementById('interfaz1');
const uiList = document.getElementById('interfazlistado');
const uiFinish = document.getElementById('pantallafinal');
const uiFormLogin = document.querySelector('#formLogin')
const uiWelcome = document.querySelector ('#contentNavigate')
const contentModelNameUser = document.getElementById('sectionNameUser');
const linkListUi = document.getElementById('linkViewList')
const optionsInUiStart = document.querySelector('#options_list')
const div_btn_foward = document.querySelector('#div_btn_foward')
const content_btn_add = document.querySelector ('#content_button_add')
const padre = document.getElementById('padre');
let viewportWidth = window.innerWidth;

//*************SAVE NAME USER IN LOCALSTORAGE******************* */

/**
 * It takes a string as an argument and returns a string
 * @param [nameDom] - The name of the user that is passed to the function.
 */

document.querySelector('#btncarga1').addEventListener('click',()=>{
    document.querySelector('.modal_mobile').style.display='block'
})


const viewNameInDom = (nameDom='')=>{

    //html with user name
    const modelUserName = 
    `            
    <main class="welcomeUser" id="welcomeUser">
        <h2>Hola</h2>
        
        <h2 class="name_user">  ${nameDom}!!</h2>
    </main>
    `
    contentModelNameUser.innerHTML=modelUserName;
}

/* This is a function that is called when the user clicks on the button to save the name. */
const btnName = document.querySelector('#form_name').addEventListener('submit', (e)=>{
    const userName = document.getElementById('nameUserInput').value;
    //validation of name and view in HTML5

    if (userName === '') {

        notification('Complete with your Name','error_notifications');
        section_notifications.style.display='flex'
    
    }
    
    else{
        const logOutUser = document.querySelector('#logOutUser')
        optionsInUiStart.style.display = 'flex'
        content_btn_add.style.display='flex';
        localStorage.setItem('name', userName);
        viewNameInDom(localStorage.getItem('name'));
        uiFormLogin.style.display='none';
        contentModelNameUser.style.display = 'flex';
        uiStart.style.display = 'flex';
        formDynamicModel(viewportWidth);
        uiList.style.display='flex';   
        optionsInUiStart.style.display='flex';  
        logOutUser.style.display='flex';   
        loadDOMList();
    }
    e.preventDefault();
    })
//************************ */

//************* Delete localStorage */
const btnclearStorage = document.querySelector('#clearStorage').addEventListener('click',()=>{
    const $iconsNav = document.querySelector('#icons_options')
    localStorage.removeItem('lists');
    $iconsNav.style.display='none';
    notification('Delete complete lists','save_ok')
    window.location.reload()
})
//******************************* */

 

//************ Delete User *****************/

const logOutUserStorage = document.querySelector('#logOutUser')
.addEventListener('click',()=>{
    localStorage.removeItem('name');
    localStorage.removeItem('lists')
    const clearNameUser = document.getElementById('nameUserInput');
    clearNameUser.value = '';
    window.location.reload()
})

//******************************* */

//************ Load user name when refresh page*/

window.addEventListener('DOMContentLoaded',()=>{
    viewNameInDom(localStorage.getItem('name'))
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
        const messageNotification = 'Save data OK!'
        notification(messageNotification,'save_ok')
        

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
    
    `<div class="content_notification fadeOut" id="notification_save_data">
        <p class="save_ok ${color}" id="message_save">
            ${message}
        </p>
    </div>                
    `    
    section_notifications.innerHTML=modelNotificationDOM
    section_notifications.style.display='flex'
    const timeDiv = ()=>{
        setTimeout(() => section_notifications.style.display='none',5000)
    }
        timeDiv()
    }
/*******************---------------------------------***************** */



/**
 * It saves the information in the local storage
 */            
const saveInfoForm = document.querySelector('#form_note')
saveInfoForm.addEventListener('submit', (e)=> {

    const saveInfo = ()=>{
        //input
            const inputProducto = document.querySelector('#inputalimento').value;
             //seleccion icono
            const seleccion = document.querySelector('#seleccionicono').value;
             //text area
            const textArea = document.querySelector('#detalle').value;
            const id =  crypto.randomUUID().slice(4,13)
            const listProducts= {
                product:inputProducto,
                select:seleccion,
                textArea:textArea,
                id:id
            }


            if (listProducts.product && listProducts.select !==''){
                //reset modal
                document.getElementById('inputalimento').value = "";
                document.getElementById('seleccionicono').value = "";
                document.getElementById('detalle').value = "";
                const basket = document.querySelector('.basquet_trash')
                basket.style.display = 'flex'
                notification('save ok')
                if(viewportWidth<990){
                    uiStart.style.display = 'none'
                    uiList.style.display = 'flex'
                    uiFinish.style.display = 'none' 
                    uiFormLogin.style.display = 'none' 

                }
                else{
                    //displays
                    uiStart.style.display = 'flex'
                    uiList.style.display = 'flex'
                    uiFinish.style.display = 'none' 
                    uiFormLogin.style.display = 'none' 
                }
                return saveDataLocalStorage(listProducts)
            } 
        
        }
        saveInfo()     
        e.preventDefault()


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
            <li class=" p-3 mb-5 list-group-item list_products" data-producto="${element.product}" data-icono="${element.select}" data-detalle="${element.textArea}" data-id="${element.id}"><img src="${element.select}" alt="${element.product}" class="contenido3__icono">
            ${element.product}
            </li>`
            padre.innerHTML = modeloLista
            })
        
        
        const itemsList = document.querySelectorAll(".list_products")
        const lastItem = itemsList[itemsList.length-1]
        lastItem.scrollIntoView()
        }
    }

//******************************* */



let btn_foward_uiList_to_uiMain = document.querySelector('#foward_UIlist_to_UImain')
btn_foward_uiList_to_uiMain.addEventListener('click',()=>{
    document.querySelector('.modal_mobile').style.display='none'
    uiList.style.display = 'none'
    uiStart.style.display = 'flex'

})

//****************** view list with option tag and select with querySelectorAll the li elements******/ 
/* The above code is creating a function that will display the list of products that the user has
created. */

const li_Elements=document.querySelectorAll('.list_products')
const trash = document.querySelector('.basquet_trash')
if(JSON.parse(localStorage.getItem('lists')) === null || JSON.parse(localStorage.getItem('lists')).length===0){

trash.style.display = 'none'
linkListUi.style.display = 'none'
}
else{
    linkListUi.style.display = 'flex'
    trash.style.display = 'flx'

}


linkListUi.addEventListener('click',()=>{
    const view_Li_Elements = ()=>{
        const li_Elements=document.querySelectorAll('.list_products')
        li_Event(li_Elements)
        
    } 
    uiList.style.display = 'flex'
    uiStart.style.display = 'none'
    const dataStorageParce = JSON.parse(localStorage.getItem('lists'))
    viewListHTML(dataStorageParce)
    btn_foward_uiList_to_uiMain.style.display = 'flex'    

    view_Li_Elements()
    })

//********************************/





//**************** Delete Element in LocalStorage */

/* This is a function that is called when the user clicks on the button to delete the list.
And remove individual item at LocalStorage
*/

const btnDelete = document.querySelector('#btn_delete')
btnDelete.addEventListener('click', ()=>{
const data_Id_Btn = btnDelete.getAttribute('data-id')

const messageDelete = 'Delete complete!'

const deleted = (productId='')=>{
    dataStorageParce = dataStorageParce.filter(data=>{
        return data.id != productId;       
    })

}

deleted(data_Id_Btn)
const filterDataParse = dataStorageParce
localStorage.setItem('lists',JSON.stringify(filterDataParse))


notification(messageDelete,'delete_ok')

setTimeout(() => window.location.reload(),5000)
})


//************----------------------------------*************/




    //listener of btn Edit

    //******* Call modal edit *********/ 
const btn_Edit = document.querySelector('#btn_edit')
btn_Edit.addEventListener('click', ()=>{

    const contentModalEdit = document.querySelector('#form_note_edit')
    const data_Id_Btn_Edit = btn_Edit.getAttribute('data-id')
    
    const id_Filter = (editProductId ='')=>{
        dataStorageParce = dataStorageParce.filter(data=>{
            return data.id === editProductId
        })
        
    }

  

    id_Filter(data_Id_Btn_Edit)
    const editElement = (element)=>{
    let modelModalEdit = ''
    element.forEach(item=>{
        modelModalEdit=
        `
        <div class="col-md-4 text_direction_start">
        <label for="editInputProduct" class="form-label">Name of the product</label>
        <input type="text" class="form-control" id="editInputProduct"
            placeholder="Verdura/bebidas/comida para mi gato" maxlength="10" required="required" value=${item.product}>
        <div class="valid-feedback">
            Good!
        </div>
    <div class="invalid-feedback">
        Please, enter the product.
    </div>
    </div>

    <div class="col-md-3 text_direction_start">
        <label for="seleccionicono" class="form-label">Category</label>
        <select class="form-select" id="editSeletIcon" required>
            <option selected disabled value="">Choose...</option>
            <option value="img/comidita.svg">Comidita</option>
            <option value="img/electronica.svg">Electronica</option>
            <option value="img/ferreteria2.svg">Ferreteria</option>
            <option value="img/limpieza.svg">Limpieza</option>
            <option value="img/mascota.svg">Mascotas</option>
            <option value="img/perfumeria.svg">Perfumeria</option>
            <option value="img/varios.svg">Varios</option>
        </select>

        <div class="invalid-feedback">
            Please, select one category.
        </div>
    </div>

    <div class="mb-3 text_direction_start">
    <label for="editDetail" class="form-label">Any detail?</label>
        <textarea class="form-control is-invalid" id="editDetail" rows="3" maxlength="20" required>${item.textArea}</textarea>
    </div>

</form>


    `
    })
    contentModalEdit.innerHTML+=modelModalEdit;

    }
//************----------------------------------*************/
    editElement(dataStorageParce)
})

const saveEdit = document.querySelector('#form_note_edit')
saveEdit.addEventListener('submit', ()=>{
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

    notification(message_Notification,'edit_ok')

    setTimeout(() => window.location.reload(),5000)

})



//************---------------------------------------------------------------- */

/* This is a function that is called when the user clicks on the list item. */



const li_Event = (array_Li)=>{
    array_Li.forEach(elements=>{
        elements.addEventListener('click',(e)=>{
            const buttons = document.getElementById('buttons');
            const content_ForwardListUi_to_MainUi= document.querySelector('#content_forwardButtonToListUi');
        
        
            document.getElementById('subtitulofinal').innerHTML = e.target.getAttribute('data-producto');
            document.getElementById('iconocontenido4').src = e.target.getAttribute('data-icono');
            document.getElementById('detallefinal').innerHTML = e.target.getAttribute('data-detalle');
            uiFinish.style.display = 'flex';
            uiList.style.display = 'none';
            buttons.style.display = 'flex';
            content_ForwardListUi_to_MainUi.style.display = 'flex';
        
            
            
            document.getElementById('btn_delete').setAttribute('data-id',e.target.getAttribute('data-id'))
            document.getElementById('btn_edit').setAttribute('data-id',e.target.getAttribute('data-id'))
            
            content_ForwardListUi_to_MainUi.addEventListener('click',()=>{
                uiFinish.style.display = 'none';
                uiList.style.display = 'flex'
        
            })
        })
    })
}



// const llamadaFinal = document.querySelector('#padre').addEventListener('click', (e)=> {

// })






//Load DOM and view list

/**
 * The function loadDOMList() is called when the DOM is loaded. It checks if the user is logged in or
 * not. If the user is logged in, it displays the list of items. If the user is not logged in, it
 * displays the login form
 */
const loadDOMList = ()=>window.addEventListener('DOMContentLoaded', (e) => {

    let nameInStorage = localStorage.getItem('name')
    let logOutIcon = document.querySelector('#logOutUser')

    const displayList = (size)=>{
        const capture_Li_In_DOM = ()=>{
    
            document.querySelector('#padre').addEventListener('mouseover',(e)=>{
                const li_Elements_Send = e.target.querySelectorAll('.list_products');
                for (let i = 0; i < li_Elements_Send.length; i++) {
                        const element = li_Elements_Send[i];
                        if (element.length!=0) {
                            li_Event(li_Elements_Send)
                            document.querySelector('#padre').removeEventListener('mouseover',(e)=>{
                                console.log(e);
                        })
                        }
                        else {
                            console.log('end');
                        }               
                    }
                })
        }
        if(size >= 991) {
            const formInputs = document.querySelector('#form_note')
            formDynamicModel(size)
            capture_Li_In_DOM()
            uiStart.style.display = 'flex'
            uiFinish.style.display = 'none' 
            uiFormLogin.style.display = 'none' 
            formInputs.style.display = 'flex'
        }  
        
        else {
            formDynamicModel(size)
            uiStart.style.display = 'flex'
            uiFinish.style.display = 'none' 
            uiFormLogin.style.display = 'none' 
        
        };
    }
    
    const displayOptionsDOMLoad = ()=>
    
    {
        logOutIcon.style.display = 'flex'
        uiFormLogin.style.display='none'
        uiStart.style.display = 'flex';
        displayList(viewportWidth)
        uiFinish.style.display = 'none' 
        viewListHTML(dataStorageParce)
    }
    const displayDOMForm = ()=>{
        uiStart.style.display = 'none';
        uiFormLogin.style.display = 'flex'
        uiList.style.display = 'none'
        uiFinish.style.display = 'none'

    }
    
    nameInStorage===null? displayDOMForm():displayOptionsDOMLoad();

    
});


/**
 * A function that creates a form with the inputs and selects that are necessary to create a note.
 * @param [sizeDevice] - The size of the device.
 * @returns the form with the inputs and the buttons.
 */

const formDynamicModel=(sizeDevice = '')=>{
    const $form = document.querySelector('#form_note') //<form></form>
    const modelForm_Inputs = 
    `               
    <div class="modal-body" >
                    

    <div class="col-md-4 text_direction_start style_form_dektop___content_input">
    <label for="inputalimento" class="form-label">Name of the product</label>
    <input type="text" class="form-control" id="inputalimento"placeholder="Verdura/bebidas/comida para mi gato" maxlength="15" required>
    <div class="valid-feedback">
        Good!
    </div>
    <div class="invalid-feedback">
        Please, enter the product.
    </div>
</div>
    

    <div class="col-md-3 text_direction_start style_form_dektop___content_select">
        <label for="seleccionicono" class="form-label">Category</label>
        <select class="form-select" id="seleccionicono" required>
            <option selected disabled value="">Choose...</option>
            <option value="img/comidita.svg">Food</option>
            <option value="img/electronica.svg">Electronic</option>
            <option value="img/ferreteria2.svg">Ferreteria</option>
            <option value="img/limpieza.svg">Limpieza</option>
            <option value="img/mascota.svg">Animales</option>
            <option value="img/perfumeria.svg">Perfumeria</option>
            <option value="img/varios.svg">Varios</option>
        </select>
    <div class="invalid-feedback">
        Please, select one category.
    </div>
</div>

    <div class="mb-3 text_direction_start style_form_dektop___content_text_area">
        <label for="detalle" class="form-label">Any detail?</label>
        <textarea class="form-control is-invalid" id="detalle" placeholder="color black" rows="3" maxlength="20"  required></textarea>
        <div class="invalid-feedback">
            Please enter a comment.
        </div>
    </div>

    <div class="col-12 style_form_dektop___content_buttons">
            <button type="button" class="btn btn-secondary btn-close-modal style_btns" data-bs-dismiss="modal" >X</button>
            <button class="btn1 btn btn-primary btn-ok-modal style_btns" type="submit">OK</button>
    </div>
    </div>


    `
    

    if(sizeDevice>990){
        return $form.innerHTML = modelForm_Inputs
    }
    else{
        const contentFormMobile = document.querySelector('#content_form_mobile')
        $form.innerHTML=modelForm_Inputs
        
        return contentFormMobile.appendChild($form)
    }

}



//************

//control the scope where call of the arrow function





const formResize = ()=> {
window.addEventListener('resize',(e)=>{
    
    if (window.innerWidth>991) {   
        formDynamicModel(window.innerWidth)
        window.location.reload()
        // timeResizeRefresh()
    }
    e.preventDefault
},true)};


loadDOMList()
formResize()


