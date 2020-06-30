//POP-UP MENU
//DOM Elements
let modConEl = document.querySelector("#modules-container");
let formEl = null;
let delPopUp = document.getElementById("pop-up-delete");
let delBackdrop = document.getElementById("delete-backdrop");
let delYes = document.getElementById("del-yes");
let delNo = document.getElementById("del-no");

// Events
modConEl.onclick = function (event) {
  console.log(event.target.offsetParent.classList);
  if (event.target.classList.contains("deleteBtn")) {
    formEl = event.target.parentNode;
    delPopUp.style.display = "flex";
    delBackdrop.style.display = "block";
  } else if (
    event.target.offsetParent.classList.contains("module") ||
    event.target.offsetParent.classList.contains("module-info")
  ) {
    window.location.href = event.target.offsetParent.id;
  } else {
    return;
  }
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

//INFO BOX
let infoBox = document.getElementById("info-box");
let arrows = document.querySelectorAll(".arrow");
let state = 1;

arrows.forEach((arrow) => {
  arrow.onclick = function (event) {
    let circle = document.getElementById("circle-" + state);
    let box = document.getElementById("box-" + state);
    box.style.display = "none";
    circle.style.background = "rgb(109, 109, 109)";
    if (event.target.id == "next") {
      if (++state == 4) state = 1;
    } else if (event.target.id == "prev") {
      if (--state == 0) state = 3;
    }
    box = document.getElementById("box-" + state);
    circle = document.getElementById("circle-" + state);
    box.style.display = "flex";
    circle.style.background = "#ffde00ff";
  };
});
