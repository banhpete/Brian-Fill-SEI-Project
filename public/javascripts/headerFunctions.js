// DOM Elements
let actPopUpEl = document.getElementById("act-pop-up");
let bodyEl = document.querySelector("body");

// State
let popUpStatus = 0;

bodyEl.onclick = function (event) {
  if (event.target == actPopUpEl) return;
  if (event.target.nodeName == "IMG") {
    if (!popUpStatus) {
      actPopUpEl.style.display = "block";
      popUpStatus = 1;
    }
  } else {
    actPopUpEl.style.display = "none";
    popUpStatus = 0;
  }

  // if (popUpStatus) {
  //   actPopUpEl.style.display = "none";
  //   popUpStatus = 0;
  // } else {
  //   actPopUpEl.style.display = "block";
  //   popUpStatus = 1;
  // }
};
