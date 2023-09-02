/*tratar interações com usuario*/

import Address from "../models/address.js";
import * as addressService from '../services/address-service.js'
import * as listController from './list-controller.js'

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
    state.inputNumber.addEventListener('keyup', handleinputNumberKeyUp)
    state.btnClear.addEventListener('click', handleBtnClearClick)
   
    state.btnSave.addEventListener('click', handleBtnSaveClick)

    state.inputCep.addEventListener('change', handleInputCepChange)
}

function handleinputNumberKeyUp(event){
    state.address.number = event.target.value
}

async function handleInputCepChange(event){
    const cep = event.target.value

    try{
    const address = await addressService.findByCep(cep)

    state.inputStreet.value = address.street
    state.inputCity.value = address.city
    state.address = address

    setFormError("cep", "")
    state.inputNumber.focus();
    }catch(e){
        state.inputStreet.value = ""
        state.inputCity.value = ""
        setFormError("cep", "Informe um cep valido")
    }



}



async function handleBtnSaveClick(event){
    event.preventDefault();
    listController.addCard(state.address)
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