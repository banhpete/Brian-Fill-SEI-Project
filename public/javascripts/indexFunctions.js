// DOM ELEMENTS
let modConEl = document.querySelector("#modules-container");
let formEl = null;
let delPopUp = document.getElementById("pop-up-delete");
let delBackdrop = document.getElementById("delete-backdrop");
let delYes = document.getElementById("del-yes");
let delNo = document.getElementById("del-no");

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
