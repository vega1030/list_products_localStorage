import {
    set_Element_At_LocalStorage,
    get_Elements_At_LocalStorage,
    delete_Elements_At_LocalStorage,
    data_At_Storage_JSON ,
    data_At_Storage_String
} from './model.js'


const name_Of_Key_Note_Storage = 'lists'

/**
 * It takes a string as an argument and if the string is not empty, it sets the string as the value of
 * the 'name' key in localStorage
 * @param user_Name - The name of the user.
 * @returns the value of the localStorage.setItem method.
 */

const add_Name_At_LocalStorage = (user_Name)=>{
const name_Of_Key_User = 'name'
    if(user_Name === ''){
        return false;
    }
    else{
        return set_Element_At_LocalStorage(name_Of_Key_User, user_Name);
    }
}

//*********** --------------------------- ***********/

/**
 * It deletes the element from the local storage
 * @param element - The element you want to delete from localStorage.
 * @returns the localStorage.removeItem(element) method.
 */

const delete_All_Elements_At_LocalStorage = (element)=>{
    
    return delete_Elements_At_LocalStorage(element);

}

//*********** --------------------------- ***********/



//******************* Save list in localStorage and view in html *******/
/**
 * @param [data] - This is the data that will be saved in the local storage.
 */

const saveDataLocalStorage = (data='') => {
    if(data.product && data.select==='' || null ){
    return false
    }
    else {
        let dataLocalStorage = [];
        
        dataLocalStorage = JSON.parse(get_Elements_At_LocalStorage(name_Of_Key_Note_Storage)) || [];
        dataLocalStorage.push(data)
        set_Element_At_LocalStorage(name_Of_Key_Note_Storage,JSON.stringify(dataLocalStorage))

        const dataStorageParceJson = JSON.stringify(get_Elements_At_LocalStorage(name_Of_Key_Note_Storage))
        return dataStorageParceJson
    }
}

//*********** --------------------------- ***********/

/**
 * It takes in four parameters, and returns an object with the parameters as properties, if the first
 * two parameters are not empty
 * @param [inputProducto] - The value of the input field.
 * @param [selection] - The value of the selected option in the select element.
 * @param [textArea] - The text area where the user will write the description of the product.
 * @param [id] - This is the id of the product.
 */

const saveInfo = (inputProducto ='',selection ='', textArea ='', id ='')=>{

        const listProducts= {
            product:inputProducto,
            select:selection,
            textArea:textArea,
            id:id
        }

        if (listProducts.product ==='' && listProducts.select ===''){
            return false
        }
        else{
            return listProducts
        }
    }

//*********** --------------------------- ***********/




/**
 * It takes a productId as an argument, gets the data from localStorage, filters it, and then sets the
 * filtered data back to localStorage
 * @param [productId] - The id of the product you want to delete.
 */

const deleted = (productId='')=>{
    
    let dataStorageParceToJSON = JSON.parse(get_Elements_At_LocalStorage(name_Of_Key_Note_Storage))

    dataStorageParceToJSON = dataStorageParceToJSON.filter(data=>{
        return data.id != productId;       
    })

    const viewFilterList = ()=>{
        const filterDataParse = dataStorageParceToJSON
        set_Element_At_LocalStorage(name_Of_Key_Note_Storage,JSON.stringify(filterDataParse))
    
    }
    viewFilterList()
}

//*********** --------------------------- ***********/

/**
 * It takes a product id as an argument, filters the data from the local storage, and returns the
 * filtered data
 * @param [editProductId] - The id of the product to be edited.
 * @returns The data_Filter is being returned.
 */

const id_Filter = (editProductId ='')=>{
    let data_Filter = data_At_Storage_JSON
    data_Filter = data_Filter.filter(data=>{
        return data.id === editProductId
    })
    return data_Filter;
}

const upDateProduct = (newData)=>{
    let data_List = data_At_Storage_JSON
    const upDate = data_List.findIndex(e=>e.id === newData.id)
    data_List.splice(upDate,1,newData)
    console.log(data_List);
    set_Element_At_LocalStorage('lists', JSON.stringify(data_List))

}




export{
    add_Name_At_LocalStorage,
    delete_All_Elements_At_LocalStorage,
    saveDataLocalStorage, 
    saveInfo,saveDataLocalStorage,
    deleted,id_Filter,upDateProduct
}