// DOM ELEMENTS
let modConEl = document.querySelector("#module-container");
let formEl = null;
let delPopUp = document.getElementById("pop-up-delete");
let delBackdrop = document.getElementById("delete-backdrop");
let delYes = document.getElementById("del-yes");
let delNo = document.getElementById("del-no");
let gnEl = document.getElementById("gn-container");
let gnBtn = document.getElementById("gn-btn");
let quizEl = document.getElementById("quiz-container");
let quizBtn = document.getElementById("quiz-btn");

console.log("connected");

modConEl.onclick = function (event) {
  if (!event.target.classList.contains("deleteBtn")) return;
  formEl = event.target.parentNode;
  delPopUp.style.display = "flex";
  delBackdrop.style.display = "block";
};

delPopUp.onclick = function (event) {
  if (event.target.tagName != "BUTTON") return;
  if (event.target.id == "del-yes") {
    formEl.submit();
  } else if (event.target.id == "del-no") {
    delPopUp.style.display = "none";
    delBackdrop.style.display = "none";
    formEl = null;
  }
};

quizBtn.onclick = function (event) {
  console.log(event);
  gnEl.style.display = "none";
  quizEl.style.display = "block";
};

gnBtn.onclick = function (event) {
  gnEl.style.display = "block";
  quizEl.style.display = "none";
};

gnEl.onchange = function (event) {
  if (event.target.tagName != "INPUT") return;
  if (event.target.value == event.target.id) {
    event.target.style.background = "green";
  }
};
