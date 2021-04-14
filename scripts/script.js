function enterName(enter){
  enter.setAttribute("placeholder", "");
}
function login(button){
  button.parentNode.classList.add("gone")
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
}