const modalDisplay = document.querySelector(".modal-wrap");
const modalOffAndSubmit = document.querySelector(".submit-btn");
const modalOffCancel = document.querySelector(".cancel-btn");
const modalOnAdd = document.querySelector(".add-btn");

const inputTitle = document.querySelector(".title");
const inputContent = document.querySelector(".content");

const notifyWrap = document.querySelector(".notify-wrap")

let notifys = [];

function modalDisplayOn() {
  modalDisplay.classList.remove("hidden")
}

function modalDisplayOff(e) {
  e.preventDefault()
  modalDisplay.classList.add("hidden")
  inputTitle.value = "";
  inputContent.value = "";
}

function modalNotifyAdd(newNotify) {
  notifyWrap.innerHTML += `<a href="" class="notify-list-link"><li class="notify-list" id="${newNotify.id}">
  <p class="display-title">${newNotify.title}</p>
  <p class="display-content">${newNotify.content}</p>
  </li></a>`
}

function modalBtnHandler(e) {
  e.preventDefault()
  const newNotifytitle = inputTitle.value;
  inputTitle.value = "";
  const newNotifyContent = inputContent.value;
  inputContent.value = "";

  if (!newNotifytitle) {
    
  }

  const notifyObj = {
    title: newNotifytitle,
    content: newNotifyContent,
    id: Date.now(),
  };
  notifys.push(notifyObj);
  modalNotifyAdd(notifyObj);
}

modalOnAdd.addEventListener("click", modalDisplayOn);
modalOffCancel.addEventListener("click", modalDisplayOff);
modalOffAndSubmit.addEventListener("click", modalNotifyAdd);
modalOffAndSubmit.addEventListener("click", modalDisplayOff);
