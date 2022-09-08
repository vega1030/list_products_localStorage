/**
 * It takes a string as an argument and if the string is not empty, it sets the string as the value of
 * the 'name' key in localStorage
 * @param user_Name - The name of the user.
 * @returns the value of the localStorage.setItem method.
 */

const add_Name_At_LocalStorage = (user_Name)=>{
    if(user_Name === ''){
        return false;
    }
    else{
        return localStorage.setItem('name', user_Name);
    }
}

//*********** --------------------------- ***********/

/**
 * It deletes the element from the local storage
 * @param element - The element you want to delete from localStorage.
 * @returns the localStorage.removeItem(element) method.
 */

const delete_All_Elements_At_LocalStorage = (element)=>{
    
    return localStorage.removeItem(element);

}

//*********** --------------------------- ***********/



//******************* Save list in localStorage and view in html *******/
/**
 * 
 * @param [data] - The data to be saved in localStorage.
 */
const saveDataLocalStorage = (data='') => {
    if(data.product && data.select==='' || null ){
    return false
    }
    else {
        let dataLocalStorage = [];
        dataLocalStorage = JSON.parse(localStorage.getItem('lists')) || [];
        dataLocalStorage.push(data)
        localStorage.setItem('lists', JSON.stringify(dataLocalStorage))
        const dataStorageParce = JSON.parse(localStorage.getItem('lists'))        
        return dataStorageParce
    }
}

//*********** --------------------------- ***********/
/**
 * This function takes in four parameters, and returns an object with the values of the parameters. If
 * the first two parameters are empty, it returns false
 * @param [inputProducto] - The value of the input field.
 * @param [selection] - The value of the select element.
 * @param [textArea] - The textarea value
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

const deleted = (productId='')=>{
    let dataStorageParce = JSON.parse(localStorage.getItem('lists'))
    dataStorageParce = dataStorageParce.filter(data=>{
        return data.id != productId;       
    })

    const viewFilterList = ()=>{
        const filterDataParse = dataStorageParce
        localStorage.setItem('lists',JSON.stringify(filterDataParse))
    }
    viewFilterList()
}



export{
    add_Name_At_LocalStorage,
    delete_All_Elements_At_LocalStorage,
    saveDataLocalStorage, 
    saveInfo,saveDataLocalStorage,
    deleted
}