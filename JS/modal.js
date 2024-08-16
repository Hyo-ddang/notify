const modalDisplay = document.querySelector(".modal-wrap");
const modalOffSubmit = document.querySelector(".submit-btn");
const modalOffCancel = document.querySelector(".cancel-btn");
const modalOnAdd = document.querySelector(".add-btn");

function modalDisplayOn() {
  modalDisplay.classList.remove("hidden")
  console.log("first")
}

function modalDisplayOff(e) {
  e.preventDefault()
  modalDisplay.classList.add("hidden")
}

modalOnAdd.addEventListener("click", modalDisplayOn);
modalOffSubmit.addEventListener("click", modalDisplayOff);
modalOffCancel.addEventListener("click", modalDisplayOff);