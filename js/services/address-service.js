import * as requestService from './request-service.js'
import Address from '../models/address.js'

export async function findByCep(cep){

    const url = `https://viacep.com.br/ws/${cep}/json/`

    const result = await requestService.getJson(url)

    const address = new Address(result.cep, result.logradouro, null, result.localidade)

    return address
} 

export function getError(address){
    const error = {}

    if(!address.cep || address.cep == ""){
        error.cep = "Campo requerido"
    }


    if(!address.number || address.number == ""){
        error.number = "Campo number requerido"
    }

    return error
}