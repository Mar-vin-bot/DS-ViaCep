function State(){
    this.listSection = null
}

const state = new State()

export function init(){
    state.listSection = document.querySelector("#list-section")
}

export function addCard(address){
    const card = createCard(address)
    state.listSection.appendChild(card)
}

function createCard(address){
    const div = document.createElement("div")
    div.classList.add("card-list-item") //add class css

    const h3 = document.createElement("h3")
    h3.innerHTML = address.city;

    const line_Street = document.createElement("p");
    line_Street.classList.add("adreess-line")
    line_Street.innerHTML = `${address.street}, ${address.number} `

    const cep = document.createElement("p")
    cep.classList.add("adress-cep")
    cep.innerHTML = address.cep; 

    div.appendChild(h3)
    div.appendChild(line_Street)
    div.appendChild(cep)

    return div

}

