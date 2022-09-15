'use strict'

//Methods for drive the LocalStorage

const set_Element_At_LocalStorage = (name_Key_Data, data) =>  localStorage.setItem(name_Key_Data, data)

const get_Elements_At_LocalStorage = (view_Data) =>  localStorage.getItem(view_Data)

const delete_Elements_At_LocalStorage = (delete_Data) => localStorage.removeItem(delete_Data)

const KEY_NOTES_STORAGE = 'lists'

let data_At_Storage_JSON = JSON.parse(localStorage.getItem(KEY_NOTES_STORAGE)) 

let data_At_Storage_String = localStorage.getItem(KEY_NOTES_STORAGE)

export{
    set_Element_At_LocalStorage,
    get_Elements_At_LocalStorage,
    delete_Elements_At_LocalStorage,
    data_At_Storage_JSON,
    data_At_Storage_String,
    KEY_NOTES_STORAGE
}