const modalDisplay = document.querySelector(".modal-wrap");
const modalOffAndSubmit = document.querySelector(".submit-btn");
const modalOffCancel = document.querySelector(".cancel-btn");
const modalOnAdd = document.querySelector(".add-btn");
const modalRemoveBtn = document.querySelector(".remove-btn");


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

function saveNotifys() {
  localStorage.setItem("notifys", JSON.stringify(notifys));
}

function modalNotifyAdd(newNotify) {
  notifyWrap.innerHTML += `<a href="" class="notify-list-link"><li class="notify-list" id="${newNotify.id}">
  <input type="checkbox" class="remove-checkbox hidden-check">
  <p class="display-title">${newNotify.title}</p>
  <p class="display-content">${newNotify.content}</p>
  </li></a>`
}

function notifyRemoveCheck() {
  const removeCheckBoxes = document.querySelectorAll(".remove-checkbox");

  removeCheckBoxes.forEach((checkbox) => {
    checkbox.classList.toggle("hidden-check")
  })
}

function notifyRemove() {
  const removeCheckBoxes = document.querySelectorAll(".remove-checkbox");

  removeCheckBoxes.forEach((checkbox) => {
    if (checkbox.checked) {
      const notifyItem = checkbox.closest(".notify-list");
      notifyItem.remove();
      // notifys 배열에서도 삭제 (필요 시)
      notifys = notifys.filter((notify) => notify.id !== parseInt(notifyItem.id));
    }
  });
  notifyRemoveCheck()
  saveNotifys()
}

function modalBtnHandler(e) {
  e.preventDefault()
  const newNotifytitle = inputTitle.value.trim();
  const newNotifyContent = inputContent.value.trim();

  if (!newNotifytitle || !newNotifyContent) {
    alert("아무것도 적혀있지 않습니다.")
    return;
  }

  const notifyObj = {
    title: newNotifytitle,
    content: newNotifyContent,
    id: Date.now(),
  };
  notifys.push(notifyObj);
  modalNotifyAdd(notifyObj);
  modalDisplayOff(e);
  saveNotifys()
}

modalOnAdd.addEventListener("click", modalDisplayOn);
modalOffCancel.addEventListener("click", modalDisplayOff);
modalOffAndSubmit.addEventListener("click", modalBtnHandler);
modalRemoveBtn.addEventListener("click", notifyRemove);
