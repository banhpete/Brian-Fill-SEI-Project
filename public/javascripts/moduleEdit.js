// DOM Elements
let submitBtnEl = document.querySelector('input[type="submit"]');
let contentEl = document.querySelector("#content");
let numbersEl = document.querySelector("#numOfBlanks");
let formEl = document.querySelector("form");
let topicEl = document.querySelector("#topic");

// State
let topic = false;
let content = false;
let number = false;
let numOfSentences = 0;

let sentences = contentEl.value.replace(/(\r\n|\n|\r)/gm, " ");
sentences = sentences.match(/\S.*?\."?(?=\s|$)/g);
numbersEl.innerText = "";
console.log(numbersEl.defval);
for (let i = 0; i <= sentences.length; i++) {
  let option = document.createElement("option");
  option.value = i;
  option.innerText = i;
  numbersEl.appendChild(option);
}
let option = document.createElement("option");
option.value = "No change";
option.innerText = "No change";
option.selected = true;
numbersEl.appendChild(option);

function checkContent(event) {
  event.stopPropagation();
  let sentences = contentEl.value.replace(/(\r\n|\n|\r)/gm, " ");
  sentences = sentences.match(/\S.*?\."?(?=\s|$)/g);
  numbersEl.innerText = "";
  for (let i = 0; i <= sentences.length; i++) {
    let option = document.createElement("option");
    option.value = i;
    option.innerText = i;
    numbersEl.appendChild(option);
  }
  submitBtnEl.disabled = true;
}

function checkForm(event) {
  topic = topicEl.value ? true : false;
  content = contentEl.value ? true : false;
  number = numbersEl.value != 0 ? true : false;

  if (topic && content && number) {
    submitBtnEl.disabled = false;
  } else {
    submitBtnEl.disabled = true;
  }
}

contentEl.onchange = checkContent;
formEl.onchange = checkForm;
