/*
1. 추가 함수 - O
2. 삭제 함수 -> 버튼 디테일 추가, 체크박스 주변 영역 클릭 시 선택되는 이벤트 추가
3. 로컬스토리지 - O
4. 수정 함수 -> value값을 받아 모달창에서 수정하기
5. 게시물 클릭 시 모달화면 띄워서 보여주기
*/

//? 모달 관련 요소
const modalDisplay = document.querySelector(".modal-wrap");
const modalOffAndSubmit = document.querySelector(".submit-btn");
const modalOffCancel = document.querySelector(".cancel-btn");
const modalOnAdd = document.querySelector(".add-btn");

//? 입력 관련 요소
const inputTitle = document.querySelector(".title");
const inputContent = document.querySelector(".content");

//? 알림 목록 및 버튼
const modalRemoveBtn = document.querySelector(".remove-btn");
const notifyWrap = document.querySelector(".notify-wrap")
const xBtn = document.querySelector(".fa-plus")

let notifys = [];

// 모달 표시
function modalDisplayOn() {
  modalDisplay.classList.remove("hidden")
}

// 모달 숨김
function modalDisplayOff(e) {
  e.preventDefault()
  modalDisplay.classList.add("hidden")
  inputTitle.value = "";
  inputContent.value = "";
}

// 로컬스토리지 생성
function saveNotifys() {
  localStorage.setItem("notifys", JSON.stringify(notifys));
}

// HTML 추가
function modalNotifyAdd(newNotify) {
  notifyWrap.innerHTML += `<a href="" class="notify-list-link"><li class="notify-list" id="${newNotify.id}">
  <input type="checkbox" class="remove-checkbox hidden-check">
  <p class="display-title">${newNotify.title}</p>
  <p class="display-content">${newNotify.content}</p>
  </li></a>`

  addCheckboxEventListeners()
}

// 체크박스 숨김/표시 로직
function notifyRemoveCheck() {
  const removeCheckBoxes = document.querySelectorAll(".remove-checkbox");

  removeCheckBoxes.forEach((checkbox) => {
    // 삭제 버튼 클릭 시 hidden-check 클래스를 제거하여 체크박스를 표시
    checkbox.classList.toggle("hidden-check");
  });

  addCheckboxEventListeners();
}

function notifyRemove() {
  const removeCheckBoxes = document.querySelectorAll(".remove-checkbox");

  removeCheckBoxes.forEach((checkbox) => {
    if (checkbox.checked) {
      const notifyItem = checkbox.closest(".notify-list");
      notifyItem.remove();
      notifys = notifys.filter((notify) => notify.id !== parseInt(notifyItem.id));
    }
  });
  notifyRemoveCheck();
  saveNotifys();
  notifyReomveBtnChangeHandler();
  hideCheckBoxes();
  // 삭제버튼 클릭 시 체크박스 표시가 안 되는 버그 수정 해야됨.
}

// 체크박스에 하나라도 입력될 시 체크 아이콘이 활성화 되면서 모달창 실행
function notifyReomveBtnChangeHandler() {
  const removeCheckBoxes = document.querySelectorAll(".remove-checkbox");

  let isChecked = false;

  removeCheckBoxes.forEach(checkbox => {
    if(checkbox.checked) {
      isChecked = true;
    }
  })

  if(isChecked) {
    modalRemoveBtn.classList.add("fa-check")
  } else {
    modalRemoveBtn.classList.remove("fa-check");
  }
  // + 버튼이 체크 버튼으로 바뀌는걸 쓰레기통 버튼이 바뀌는걸로 설정 해야함.
}

// 체크박스를 숨기는 함수
function hideCheckBoxes() {
  const removeCheckBoxes = document.querySelectorAll(".remove-checkbox");

  removeCheckBoxes.forEach((checkbox) => {
    checkbox.classList.add("hidden-check");
  });
}

function modalBtnHandler(e) {
  const newNotifytitle = inputTitle.value.trim();
  const newNotifyContent = inputContent.value.trim();

  if (!newNotifytitle && !newNotifyContent) {
    alert("아무것도 적혀있지 않습니다.")
    return;
  } else if(newNotifytitle && !newNotifyContent) {
    alert("내용이 비어 있습니다.")
    return;
  } else if(!newNotifytitle && newNotifyContent) {
    alert("제목이 비어 있습니다.")
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
  notifyRemoveCheck();
  saveNotifys();
  hideCheckBoxes();
}

// 체크박스에 이벤트 리스너 추가
function addCheckboxEventListeners() {
  const removeCheckBoxes = document.querySelectorAll(".remove-checkbox");
  removeCheckBoxes.forEach((checkbox) => {
    checkbox.removeEventListener("change", notifyReomveBtnChangeHandler);
    checkbox.addEventListener("change", notifyReomveBtnChangeHandler);
  });
}

modalOnAdd.addEventListener("click", modalDisplayOn);
modalOffCancel.addEventListener("click", modalDisplayOff);
modalOffAndSubmit.addEventListener("click", modalBtnHandler);
modalRemoveBtn.addEventListener("click", notifyRemoveCheck);

//* localStorage에 저장된 배열을 화면에 렌더링
const savedNotifys = localStorage.getItem("notifys");
if (savedNotifys !== null) {
  const parsedNotifys = JSON.parse(savedNotifys);
  notifys = parsedNotifys;
  parsedNotifys.forEach(modalNotifyAdd);
  notifyRemoveCheck();
  hideCheckBoxes();
}