let destination = "todos";
let typeOfMessage = "publicamente";
let messageType="message";
let userName = "";
let messageTyped="";


document.querySelector(".listen").addEventListener("keyup",function(event){
  if(event.keyCode === 13){
    if(document.querySelector(".input-message input").value===""){
      event.preventDefault();
      document.querySelector(".login button").click();
    }else{
      document.querySelector(".baseboard ion-icon").click();
    }
    
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
  setInterval(userStatus,5000);
  setInterval(loadMessages,3000);
  setInterval(loadUsers,5000);
  
}
function userStatus(){
  const promisse = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/uol/status",{name:userName})
  //promisse.then(checked);
  promisse.catch(error);
}

function loadMessages(){
  const promisse = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/uol/messages")
  promisse.then(printMessages)
}
function printMessages(response){
  document.querySelector(".messages").innerHTML="";
  console.log(response)
  for(i=0;i<100;i++){
    if(response.data[i].type==="status"){
      document.querySelector(".messages").innerHTML +=`<li class="status-background">
      <span class="time">${response.data[i].time}</span><strong> ${response.data[i].from} </strong>para<strong> ${response.data[i].to}</strong>: ${response.data[i].text}
    </li>`
    }
    if(response.data[i].type==="message"){
      document.querySelector(".messages").innerHTML +=`<li class="public-background">
      <span class="time">${response.data[i].time}</span><strong> ${response.data[i].from} </strong>para<strong> ${response.data[i].to}</strong>: ${response.data[i].text}
    </li>`
    }
    if(response.data[i].type==="private_message"){ //FALTA ARRUMAR PARA NAO RECEBER DOS OUTROS
      document.querySelector(".messages").innerHTML +=`<li class="private-background">
      <span class="time">${response.data[i].time}</span><strong> ${response.data[i].from} </strong>para<strong> ${response.data[i].to}</strong>: ${response.data[i].text}
    </li>`
    }
  }
  document.querySelector(".bottom").scrollIntoView();
}

function loadUsers(){
  const promisse = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/uol/participants");
  promisse.then(printUsers)
}
function printUsers(response){
  document.querySelector(".contacts-list").innerHTML=`<li onclick="selectContact(this)">
    <div><ion-icon name="people"></ion-icon><p>Todos</p></div>
    <span><ion-icon name="checkmark-sharp" class="checkmark-selected"></ion-icon></span>
    </li>`;
  console.log(response)
  for(i=0;i<response.data.length;i++){
    document.querySelector(".contacts-list").innerHTML +=`<li onclick="selectContact(this)">
    <div><ion-icon name="person-circle" ></ion-icon><p>${response.data[i].name}</p></div>
    <span><ion-icon name="checkmark-sharp" class="checkmark-not-selected"></ion-icon></span>
  </li>`;
  }
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
    typeOfMessage="reservadamente"
    messageType="private_message";
  }else{
    typeOfMessage="publicamente";
    messageType="message";
  }
  sending(destination,typeOfMessage);
}
sending(destination,typeOfMessage);
function sending(name,type){
  document.querySelector(".input-message p").innerHTML = `Enviando para ${name} (${type})` 
}


function sendMessage(){
  messageTyped = document.querySelector(".baseboard input").value;
  document.querySelector(".baseboard input").value="";
  const promisse = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/uol/messages",{from: userName,to:destination,text:messageTyped,type: messageType});
  //promisse.then(sended)
}
