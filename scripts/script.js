let destination = "todos";
let typeOfMessage = "publicamente";
let userName = "";


document.querySelector(".login input").addEventListener("keyup",function(event){
  if(event.keyCode === 13){
    event.preventDefault();
    document.querySelector(".login button").click();
  }
});
function verify(){
  document.querySelector(".input").classList.add("hide") 
  document.querySelector(".loading").classList.remove("hide") 
  userName = document.querySelector(".login input").value;
  const promisse = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/uol/participants",{name:userName})
  promisse.then(accepted);
  promisse.catch(error);
  
}
function error(response){
  if(response.response.status===400){
    document.querySelector(".input").classList.remove("hide") 
    document.querySelector(".loading").classList.add("hide")
    document.querySelector(".input p").classList.remove("hide") 
  }else if(response.response.status===404){
    alert("Servidor não encontrado")
    window.location.reload()
  }else{
    alert("Ocorreu um erro inesperado")
    window.location.reload()
  }  
}
function accepted(response){
  console.log(response)
  login()
}
function login(){
  document.querySelector(".login").classList.add("hide")
  setInterval(userStatus,5000)
}
function userStatus(){
  const promisse = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/uol/status",{name:userName})
  promisse.then(checked);
  promisse.catch(error);
}
function checked(response){
  console.log(response)
}

function openSelectionTab(){
  document.querySelector(".sidebar-background").classList.toggle("show");
  document.querySelector(".sidebar").classList.toggle("sidebar-show");
} 
function selectContact(contactSelected){
  if(document.querySelector(".contacts .checkmark-selected")!==null){
    document.querySelector(".checkmark-selected").classList.add("checkmark-not-selected")
    document.querySelector(".checkmark-selected").classList.remove("checkmark-selected")
  }
  contactSelected.querySelector("span ion-icon").classList.add("checkmark-selected")
  contactSelected.querySelector("span ion-icon").classList.remove("checkmark-not-selected")
  destination=contactSelected.querySelector("p").innerHTML;
  sending(destination,typeOfMessage);
}

function selectOption(option){
  document.querySelector(".public ion-icon").setAttribute("name","lock-open");
  document.querySelector(".public span ion-icon").classList.remove("checkmark-selected")
  document.querySelector(".public span ion-icon").classList.add("checkmark-not-selected")
  document.querySelector(".private ion-icon").setAttribute("name","lock-open");
  document.querySelector(".private span ion-icon").classList.remove("checkmark-selected")
  document.querySelector(".private span ion-icon").classList.add("checkmark-not-selected")
  option.querySelector("ion-icon").setAttribute("name","lock-closed");
  option.querySelector("span ion-icon").classList.add("checkmark-selected")
  option.querySelector("span ion-icon").classList.remove("checkmark-not-selected")
  if(option.querySelector("p").innerHTML==="Reservadamente"){
    typeOfMessage="reservadamente";
  }else{
    typeOfMessage="publicamente";
  }
  sending(destination,typeOfMessage);
}
sending(destination,typeOfMessage);
function sending(name,type){
  document.querySelector(".input-message p").innerHTML = `Enviando para ${name} (${type})` 
}

