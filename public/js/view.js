import { add_Name_At_LocalStorage, 
        delete_All_Elements_At_LocalStorage,
        saveInfo,
        saveDataLocalStorage,
        deleted,id_Filter,
        upDateProduct } from "./controller.js";

let viewportWidth = window.innerWidth;


document.querySelector('#btncarga1').addEventListener('click',()=>{
    document.querySelector('.modal_mobile').style.display='block'
})

/**
 * It takes a string as an argument and returns a string
 * @param [nameDom] - The name of the user that is passed to the function.
 */


const createMainUi = (nameDom='')=>{
    if(nameDom === false){
        return notification('Complete with your Name','error_notifications')    
    }
    else{
        const modelUserName = 
        `            
        <main class="welcomeUser" id="welcomeUser">
            <h2>Hola</h2>
            
            <h2 class="name_user">  ${nameDom}!!</h2>
        </main>
        `
/**
 * It hides the login form and displays the start page and the options in the start page
 */
        const display_At_Ui_Main=()=>{
            document.querySelector('#formLogin').style.display='none';
            document.querySelector('#interfaz1').style.display='flex';
            document.querySelector('#options_list').style.display='flex';  
        }
        
        display_At_Ui_Main()
        const contentModelNameUser = document.getElementById('sectionNameUser');
        return contentModelNameUser.innerHTML=modelUserName;
    }

}

//*************************************************/

/* The above code is creating a listener for the DOMContentLoaded event. When the event is fired, the
createMainUi function is called with the value of the name key in localStorage. */

window.addEventListener('DOMContentLoaded',()=>{
    createMainUi(localStorage.getItem('name'))
});

const ui_Start_View = ()=>{
    document.querySelector('#interfaz1').style.display='flex';
    document.querySelector ('#contentNavigate').style.display='flex';
    document.querySelector ('#sectionNameUser').style.display='flex';
    document.querySelector('#formLogin').style.display='none'

}

//*************************************************/

/* The above code is adding an event listener to the form element with the id of form_name. The event
listener is listening for a submit event. When the submit event is triggered, the function is
called. The function is getting the value of the input element with the id of nameUserInput. The
function is then calling the add_Name_At_LocalStorage function and passing the userName variable as
an argument. The function is then calling the createMainUi function and passing the
localStorage.getItem('name') as an argument. The function is then calling the formDynamicModel */

document.querySelector('#form_name').addEventListener('submit', (e)=>{
    const userName = document.getElementById('nameUserInput').value;

    add_Name_At_LocalStorage(userName)

    createMainUi(localStorage.getItem('name'))
    
    formDynamicModel(viewportWidth)
    
    ui_Start_View()
    
    e.preventDefault();
    })


//*************************************************/

/* The above code is deleting all the lists from the local storage. */

document.querySelector('#clearStorage').addEventListener('click',()=>{
    const $iconsNav = document.querySelector('#options_list')

    delete_All_Elements_At_LocalStorage('lists')
    $iconsNav.style.display='none';
    
    notification('Delete complete lists','save_ok')
    
    setTimeout(()=>window.location.reload(),6000);
    
})
//******************************* */



/* The above code is deleting the name of the user from the local storage and reloading the page. */

document.querySelector('#logOutUser')
.addEventListener('click',()=>{
    delete_All_Elements_At_LocalStorage('name');
    const clearNameUser = document.getElementById('nameUserInput');
    clearNameUser.value = '';
    window.location.reload()
})


//******************************* */


/**
 * It takes a state_body as an argument and returns a blur filter to the main section of the page if
 * the state_body is not empty
 * @param state_ - This is the state of the body. If it's empty, the blur filter is removed. If
 * it's not empty, the blur filter is applied.
 * @returns the mainSection.style.filter property.
 */

const blur_filter = (state_)=>{
    const mainSection = document.querySelector('.mainSection');
    if(state_!=''){
        return mainSection.style.filter = 'blur(0.6rem)'
    }
    else {
        return mainSection.style.filter = 'blur(0px)'
    }
}

//*************************************************/

/**
 * It listens for changes in the body element, and when it detects a change in the class attribute, it
 * calls the blur_filter function
 */

const listen_Changes_In_Body = ()=>{
    const view_Body = document.querySelector('body')  

    const observer_Body = new MutationObserver((listMutation)=>{
    listMutation.forEach(mutation => {
        if(mutation.attributeName==='class'){
            blur_filter(view_Body.className)
        }
    })
    })
    observer_Body.observe(view_Body,{attributes:true})
}
listen_Changes_In_Body();

//*************************************************/



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
    
    setTimeout(() => section_notifications.style.display='none',7000)
    }

//*************************************************/


/**
 * It saves the information at the local storage
 */            
const myModal = document.querySelector('#staticBackdrop')
const instanceMyModal =  new bootstrap.Modal(myModal)

const eventForm = document.querySelector('#form_note')
eventForm.addEventListener('submit', (e)=> {

    const inputProducto = document.querySelector('#inputalimento').value;
    const seleccion = document.querySelector('#seleccionicono').value;
    const textArea = document.querySelector('#detalle').value;
    const id =  crypto.randomUUID().slice(4,13)

    let data_At_Storage = '';

    data_At_Storage = saveDataLocalStorage(saveInfo(inputProducto, seleccion, textArea, id));

    

    document.getElementById('inputalimento').value = "";
    document.getElementById('seleccionicono').value = "";
    document.getElementById('detalle').value = "";
            
    notification('Saved')
            
    

    document.querySelector('#formLogin').style.display='none';
    document.querySelector('#interfaz1').style.display='flex';
    document.querySelector('#options_list').style.display='flex'; 

    
    
    if(viewportWidth<990){
        document.querySelector('#interfaz1').style.display = 'none'
        document.querySelector('#interfazlistado').style.display = 'flex'
        document.querySelector('.basquet_trash').style.display = 'flex'
        }
    else{
        document.querySelector('#interfaz1').style.display  = 'flex'
        document.querySelector('#interfazlistado').style.display  = 'flex'
        document.querySelector('#UiCardProduct').style.display = 'none' 
        document.querySelector('#formLogin').style.display = 'none' 
        document.querySelector('.basquet_trash').style.display = 'flex'
        }  
                
    viewListHTML(JSON.parse(localStorage.getItem('lists')))
    
    document.getElementById('interfazlistado').style.display = 'flex';
    
    instanceMyModal.hide()
    
    e.preventDefault()
})

//*************************************************/


/**
 * It takes an array of objects as an argument, and returns a string of HTML
 * @param [data] - The data that will be used to create the list.
 */

const viewListHTML = (data='',flag=null) =>{

    if(data!==null||flag === true){
        const ul_Main = document.querySelector('#ul_content_list') 
        let modeloLista = ''    
        data.forEach((element)=>{
            modeloLista += `
            <li class=" p-3 mb-5 list-group-item list_products" data-producto="${element.product}" data-icono="${element.select}" data-detalle="${element.textArea}" data-id="${element.id}"><img src="${element.select}" alt="${element.product}" class="contenido3__icono">
            ${element.product}
            </li>`
            ul_Main.innerHTML = modeloLista
            })
        const itemsList = document.querySelectorAll(".list_products")
        li_Event(itemsList)
        const lastItem = itemsList[itemsList.length-1]
        lastItem.scrollIntoView()
    }
    }

//*************************************************/


/* The above code is a button that is used to go back to the main page. */

document.querySelector('#foward_UIlist_to_UImain').addEventListener('click',()=>{
    document.querySelector('.modal_mobile').style.display='none'
    document.querySelector('#interfazlistado').style.display = 'none'
    window.location.reload();
})

//*************************************************/


/* The above code is creating a function that will display the list of products that the user has
created. */

const trash = document.querySelector('.basquet_trash')
if(JSON.parse(localStorage.getItem('lists')) === null || JSON.parse(localStorage.getItem('lists')).length===0){
trash.style.display = 'none'
document.getElementById('linkViewList').style.display = 'none'
}
else{
    document.getElementById('linkViewList').style.display = 'flex'
    trash.style.display = 'flex'
}

//******************-----------**********************/
/* The above code is adding an event listener to the linkListUi element. When the linkListUi element is
clicked, the view_Li_Elements function is called. The view_Li_Elements function is a function that
calls the li_Event function. The li_Event function is a function that adds an event listener to all
the li elements. The li elements are the elements that are created when the user creates a list. The
li elements are created in the viewListHTML function. The viewListHTML function is called in the
above code. The viewListHTML function */

document.getElementById('linkViewList').addEventListener('click',()=>{
    const view_Li_Elements = ()=>{
        const li_Elements=document.querySelectorAll('.list_products')
        li_Event(li_Elements)
    } 
    document.querySelector('#interfazlistado').style.display = 'flex'
    document.querySelector('#interfaz1').style.display = 'none'
    viewListHTML(JSON.parse(localStorage.getItem('lists')))
    document.querySelector('#foward_UIlist_to_UImain').style.display = 'flex'    
    view_Li_Elements()
    })

//*************************************************/


//**************** Delete Element in LocalStorage */


const btnDelete = document.querySelector('#btn_delete')
btnDelete.addEventListener('click', ()=>{
    const data_Id_Btn = btnDelete.getAttribute('data-id')

    const messageDelete = 'Delete complete!'
    deleted(data_Id_Btn)
    notification(messageDelete,'delete_ok')
    setTimeout(() => window.location.reload(),8000)

})
//************----------------------------------*************/


    //******* Call modal edit *********/ 
/* The above code is creating a function that will be executed when the user clicks on the edit button. */

    const btn_Edit = document.querySelector('#btn_edit')
    btn_Edit.addEventListener('click', ()=>{
    
        const contentModalEdit = document.querySelector('#form_note_edit')
        const data_Id_Btn_Edit = btn_Edit.getAttribute('data-id')
    
        const editElement = (element)=>{
        let modelModalEdit = ''
        element.forEach(item=>{
            modelModalEdit=
            `
            <div class="modal-body modal-edit-style" id="modalEdit">
            <div class="col-md-4 text_direction_start">
            <label for="editInputProduct" class="form-label">Name of the product</label>
            <input type="text" class="form-control" id="editInputProduct"
                placeholder="vegetable/pen drive/pets articles" maxlength="15" required="required" value=${item.product} autofocus>
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
                <option value="img/comidita.svg">Food</option>
                <option value="img/electronica.svg">Electronic</option>
                <option value="img/ferreteria2.svg">Hardware Store</option>
                <option value="img/limpieza.svg">Cleaning Articles</option>
                <option value="img/mascota.svg">Pets</option>
                <option value="img/perfumeria.svg">Perfumery</option>
                <option value="img/varios.svg">Others</option>
            </select>
            <div class="invalid-feedback">
                Please, select one category.
            </div>
        </div>
        <div class="mb-3 text_direction_start">
        <label for="editDetail" class="form-label">Any detail?</label>
            <textarea class="form-control is-invalid" id="editDetail" rows="3" maxlength="20" required>${item.textArea}</textarea>
        </div>
    </div>
    <div class="modal-footer col-12 style_form_dektop___content_buttons">                    
    <button class="btn btn-ok-modal edit_btn_dimensions" type="submit">Save</button>
    <button type="button" class="btn btn-close-modal edit_btn_dimensions" data-bs-dismiss="modal" id='close-btn-modal'>Close</button>
    </div>
        `
        contentModalEdit.innerHTML=modelModalEdit;
    })
        }
        editElement(id_Filter(data_Id_Btn_Edit));
})

//************----------------------------------*************/


/* The above code is the event listener of the form of the edit modal, it is taking the values of the
inputs and the text area and sending them to the function upDateProduct, which is in charge of
updating the data in the database. */

const myModalEdit = document.querySelector('#exampleModal')

const instanceMyModalEdit = new bootstrap.Modal(myModalEdit)

document.querySelector('#form_note_edit')
.addEventListener('submit', (e)=>{

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

    upDateProduct(editListProducts)

    instanceMyModalEdit.hide()
    
    notification(message_Notification,'edit_ok')

    e.preventDefault()

    setTimeout(() => window.location.reload(),5000)

})

//************---------------------------------------------------------------- */



/* This is a function that is called when the user clicks on the list item. */



const li_Event = (array_Li)=>{
    array_Li.forEach(elements=>{
        elements.addEventListener('click',(e)=>{
            const buttons = document.getElementById('buttons');
            
            document.getElementById('subtitulofinal').innerHTML = e.target.getAttribute('data-producto');
            document.getElementById('iconocontenido4').src = e.target.getAttribute('data-icono');
            document.getElementById('detallefinal').innerHTML = e.target.getAttribute('data-detalle');
            document.querySelector('#UiCardProduct').style.display = 'flex';
            document.querySelector('#interfazlistado').style.display = 'none'
            buttons.style.display = 'flex';
            document.querySelector('#foward_UIlist_to_UImain').style.display = 'flex';
            
            
            
            document.getElementById('btn_delete').setAttribute('data-id',e.target.getAttribute('data-id'))
            document.getElementById('btn_edit').setAttribute('data-id',e.target.getAttribute('data-id'))
            
            
        })
    })

}

document.querySelector('#forwardButtonToListUi')
.addEventListener('click',()=>{
    document.querySelector('#UiCardProduct').style.display = 'none';
    document.querySelector('#interfazlistado').style.display = 'flex'
})







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

        if(size >= 991) {
            const formInputs = document.querySelector('#form_note')
            formDynamicModel(size)
            uiStart.style.display = 'flex'
            uiFinish.style.display = 'none' 
            document.querySelector('#formLogin').style.display = 'none' 
            formInputs.style.display = 'flex'
        }  
        
        else {
            formDynamicModel(size)
            document.querySelector('#interfaz1').style.display = 'flex'
            document.querySelector('#UiCardProduct').style.display = 'none';
            document.querySelector('#formLogin').style.display = 'none' 
        
        };
    }
    
    const displayOptionsDOMLoad = ()=>
    
    {
        const uiStart = document.getElementById('interfaz1');

        logOutIcon.style.display = 'flex'
        document.querySelector('#formLogin').style.display='none'
        uiStart.style.display = 'flex';
        displayList(viewportWidth)
        document.querySelector('#UiCardProduct').style.display = 'none';
        viewListHTML(JSON.parse(localStorage.getItem('lists')))
    }
    const displayDOMForm = ()=>{
        uiStart.style.display = 'none';
        document.querySelector('#formLogin').style.display = 'flex'
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
    <div class="modal-body modal-body-style" >
                    
    <div class="col-md-4 text_direction_start style_form_dektop___content_input">
    <label for="inputalimento" class="form-label">Name of the product</label>
    <input type="text" class="form-control" id="inputalimento"
    placeholder="vegetable/pen drive/pets articles" maxlength="15" required>
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
            <option value="img/ferreteria2.svg">Hardware Store</option>
            <option value="img/limpieza.svg">Cleaning Articles</option>
            <option value="img/mascota.svg">Pets</option>
            <option value="img/perfumeria.svg">Perfumery</option>
            <option value="img/varios.svg">Others</option>
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
            <button class="btn1 btn  btn-ok-modal style_btns" type="submit">OK</button>
            <button type="button" class="btn btn-close-modal style_btns" data-bs-dismiss="modal" >Cancel</button>
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
