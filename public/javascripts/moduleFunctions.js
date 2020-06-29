// DELETE POP UP
// Dom Elements
let modConEl = document.querySelector("#module-container");
let formEl = null;
let delPopUp = document.getElementById("pop-up-delete");
let delBackdrop = document.getElementById("delete-backdrop");
let delYes = document.getElementById("del-yes");
let delNo = document.getElementById("del-no");

// Events
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

// LIKE BUTTON
// Dom Elements
let usefulBtn = document.getElementById("useful-btn");

// Events
if (usefulBtn) {
  usefulBtn.onclick = function (event) {
    let values = usefulBtn.value.split("-");
    let uid = values[1];
    let mid = values[0];

    if (uid.length < 15) {
      return;
    }
    fetch("http://localhost:3000/modules/useful/" + uid + "/" + mid)
      .then(function (response) {
        return response.json();
      })
      .then(function (response) {
        if (response.index == -1) {
          usefulBtn.innerHTML =
            "You and " +
            (response.total - 1) +
            " Found This Module Useful<div class='line'></div>";
        } else {
          usefulBtn.innerHTML =
            response.total +
            " Found This Module Useful<div class='line'></div>";
        }
      })
      .catch(function (err) {
        return;
      });
  };
}

// MORE INFO
// Dom Elements
let arrows = document.querySelectorAll(".arrow");

arrows.forEach((arrow) => {
  arrow.onclick = function (event) {
    console.log("hi");
    event.target.parentElement.previousElementSibling.classList.toggle(
      "module-info-activate"
    );
  };
});

// GUIDED NOTES CHECK
// Dom Elements
let gnEl = document.getElementById("gn-container");

// Events
gnEl.onchange = function (event) {
  if (event.target.tagName != "INPUT") return;
  if (event.target.value == event.target.id) {
    event.target.style.background = "green";
  }
};

// 3D FLIP
// Dom Elements
let flips = document.querySelectorAll(".switch");
let flipper = document.querySelector(".module-positioner");
let window1 = document.getElementById("window-1");
let window2 = document.getElementById("window-2");
let fib1 = document.querySelector("#window-1 .fib-container");
let fib2 = document.querySelector("#window-2 .fib-container");

// State
let fibheight1 = fib1.offsetHeight + "px";
let fibheight2 = fib2.offsetHeight + "px";
let height1 = window1.offsetHeight + "px";
let height2 = window2.offsetHeight + "px";

fib1.style.height = fibheight1;
fib2.style.height = "0px";

// Events
flips.forEach((flip) => {
  flip.onclick = function (event) {
    if (window1.style.position == "absolute") {
      var activeWindow = window2;
      var activeFib = fib2;
      var newWindow = window1;
      var newFib = fib1;
      var fibheight = fibheight1;
    } else {
      var activeWindow = window1;
      var activeFib = fib1;
      var newWindow = window2;
      var newFib = fib2;
      var fibheight = fibheight2;
    }
    setTimeout(function () {
      activeFib.style.height = "0";
      setTimeout(function () {
        newWindow.style.opacity = "100%";
        activeWindow.style.opacity = "0%";
        setTimeout(function () {
          newWindow.style.position = "relative";
          newWindow.style.zIndex = "1";
          activeWindow.style.position = "absolute";
          activeWindow.style.zIndex = "-1";
          newFib.style.height = fibheight;
        }, 300);
      }, 300);
    });
  };
});
