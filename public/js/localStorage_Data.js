'use strict'

//Methods for drive the LocalStorage

const set_Element_At_LocalStorage = (name_Key_Data, data) =>  localStorage.setItem(name_Key_Data, data)

const get_Elements_At_LocalStorage = (view_Data) =>  localStorage.getItem(view_Data)

const delete_Elements_At_LocalStorage = (delete_Data) => localStorage.removeItem(delete_Data)

const name_Of_Key_Note_Storage = 'lists'

let data_At_Storage_JSON = JSON.parse(localStorage.getItem(name_Of_Key_Note_Storage)) 

let data_At_Storage_String = localStorage.getItem(name_Of_Key_Note_Storage)

export{
    set_Element_At_LocalStorage,
    get_Elements_At_LocalStorage,
    delete_Elements_At_LocalStorage,
    data_At_Storage_JSON,
    data_At_Storage_String
}