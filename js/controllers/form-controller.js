/*tratar interações com usuario*/

import Address from "../models/address.js";

function State(){

    this.address = new Address;

    this.inputCep = null;
    this.inputStreet = null;
    this.inputNumber = null;
    this.inputCity = null;

    this.btnSave = null;
    this.btnClear = null;

    this.errorCep = null;
    this.errorNumber = null;

}

const state = new State;


export function init(){

    state.inputCep = document.forms.newAddress.cep;
    state.inputStreet = document.forms.newAddress.street;
    state.inputNumber = document.forms.newAddress.number;
    state.inputCity = document.forms.newAddress.city;
    
    state.btnSave = document.forms.newAddress.btnSave;
    state.btnClear = document.forms.newAddress.btnClear;

    state.errorCep = document.querySelector('[data-error="err-cep"]')
    state.errorNumber = document.querySelector('[data-error="err-number"]')


    state.inputNumber.addEventListener('change', handleinputNumberChange)
    state.btnClear.addEventListener('click', handleBtnClearClick)
   
}

function handleinputNumberChange(event){
    if(event.target.value == ""){
       setFormError("number", "Campo requerido")
    }else{
        setFormError("number", "")
    }
}

function handleBtnClearClick(event){
    event.preventDefault();
    clearForm()
}

function clearForm(){
    state.inputCep.value = "";
    state.inputStreet.value = "";
    state.inputNumber.value = "";
    state.inputCity.value = "";

    setFormError("cep", "");
    setFormError("number", "");
    
    state.inputCep.focus();
}


function setFormError(key, value){
    const element = document.querySelector(`[data-error="err-${key}"]`)
    element.innerHTML = value;
}