// Function to GeneratePdf
function GeneratePdf() {
  // validateForm
  var textFields = document.querySelectorAll(".text-field");
  var textFieldsArr = Array.prototype.slice.call(textFields);
  textFieldsArr.forEach(validateTextFields)
  function validateTextFields(element) {
    if (element.value.length <= 0) {
      element.classList.add("hide-on-print");
      element.parentElement.classList.remove("special-pb");
    }
    if (element.value.length > 0) {
      element.classList.remove("hide-on-print");
      element.parentElement.classList.add("special-pb");
    }
  }


  window.print();
}

const sectionsTitles = document.querySelectorAll('.toggle-section');
for (let i = 0; i < sectionsTitles.length; i++) {
  sectionsTitles[i].addEventListener("click", openSection, false);
}
function openSection() {
  this.parentElement.parentElement.classList.toggle('open');
}

const texareas = document.getElementsByTagName("textarea");
for (let i = 0; i < texareas.length; i++) {
  texareas[i].addEventListener("input", OnInput, false);
}
function OnInput() {
  this.style.height = 0;
  this.style.height = (this.scrollHeight) + "px";
}

const triggers = document.querySelectorAll('.overlay-trigger');
const closeBtns = document.querySelectorAll('.close-video-icon');
for (const trigger of triggers) {
  trigger.addEventListener('click', showOverlay);
}
function showOverlay(event) {
  const selector = event.target.value;
  const overlay = document.getElementById(selector);
  if (overlay !== null) {
    overlay.style.display = "flex";
  }
}
for (const closeBtn of closeBtns) {
  closeBtn.addEventListener('click', closeOverlay);
}
function closeOverlay(event) {
  const closeBtn = event.currentTarget;
  const overlaywrapper = closeBtn.parentElement.parentElement;
  overlaywrapper.style.display = "none"

  const videoWrapper = closeBtn.parentElement
  const src = videoWrapper.childNodes[1].getAttribute('src');

  videoWrapper.childNodes[1].src = ""; // stop audio when modal is closed
  videoWrapper.childNodes[1].src = src; // bring bak the source of the video
}

var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();
var date = document.getElementById("date")

today = mm + '/' + dd + '/' + yyyy;

date.innerHTML = 'Printed on:' + today;

const tbodyMembers = document.getElementById("our-team-members-tbody");
const createMemberBtn = document.querySelector(".add-member-btn");

if (createMemberBtn) {
  createMemberBtn.addEventListener("click", createMemberRow);
}

function createMemberRow() {
  let temp = document.createElement('template');
  var number = Math.floor(Math.random() * 1000);
  temp.innerHTML = `
    <tr class="team-members-tr" id="dynamic-tr">
      <td class="w-20"><textarea class="w-100" value=""></textarea></td>
      <td class="w-20"><textarea class="w-100" value=""></textarea></td>
      <td class="members-notes"><textarea class="w-100 resize-vertical" value=""></textarea></td>
      <td class="actions d-flex items-center justify-center cursor-pointer"><img class="delete-tr-icon" src="`+ shortcodeObj.location + `/icons/blue-delete-btn.svg" alt="Delete table row"></td>
    </tr>
  `;
  let clon = temp.content.cloneNode(true);
  clon.querySelector('.team-members-tr').id = number;
  tbodyMembers.appendChild(clon);

}

document.addEventListener('click', function (event) {
  if (event.target && event.target.classList.contains('delete-tr-icon')) {
    var row = event.target.closest('tr');
    row.remove();
  }
});

const tbodyKeyPlayers = document.getElementById("key-players-tbody");
const createKeyPlayerBtn = document.querySelector(".add-key-player-btn");
if (createKeyPlayerBtn) {
  createKeyPlayerBtn.addEventListener("click", createKeyPlayerRow);
}

function createKeyPlayerRow() {
  let temp2 = document.createElement('template');
  var number = Math.floor(Math.random() * 1000);
  temp2.innerHTML = `
    <tr class="key-players-tr" id="tr-${ number }">
      <td class="contact"><textarea class="w-100" value=""></textarea></td>
      <td class="title"><textarea class="w-100" type="text" value=""></textarea></td>
      <td class="table-carrots"><textarea class="w-100 resize-vertical" value=""></textarea></td>
      <td class="table-sticks"><textarea class="w-100 resize-vertical" value=""></textarea></td>
      <td class="influence">
        <select id="i-${ number }">
          <option class="text-red">Low</option>
          <option class="text-yellow">Medium</option>
          <option class="text-green">High</option>
          <option selected="selected">(Unknown)</option>
        </select>
      </td>
      <td class="positivity" id="p-${ number }">
        <select class="positivity-select">
          <option value="blocker" class="text-red">Blocker</option>
          <option value="negative" class="text-red">Negative</option>
          <option value="neutral" class="text-yellow">Neutral</option>
          <option value="positive" class="text-green">Positive</option>
          <option value="advocate" class="text-green">Advocate</option>
          <option value="unknown" selected="selected">(Unknown)</option>
        </select>
      </td>
      <td class="actions d-flex items-center justify-center cursor-pointer">
        <img class="delete-tr-icon" src="`+ shortcodeObj.location + `/icons/blue-delete-btn.svg" alt="Delete table row">
      </td>
    </tr>
  `;
  let clon = temp2.content.cloneNode(true);
  tbodyKeyPlayers.appendChild(clon);

  // Add event listeners to the select elements to update classes
  var trElement = tbodyKeyPlayers.lastElementChild;
  var selectElements = trElement.querySelectorAll('select');
  /* Negociation Plan */
  selectElements.forEach(function (selectElement) {
    selectElement.addEventListener('change', UpdateSelectColor);
  });
}



// manager reviews
document.querySelectorAll(
  'input[type=radio].uncheck-possible').forEach((elem) => {
    elem.addEventListener('click', allowUncheck);
    elem.previous = elem.checked;
  });

function allowUncheck(e) {
  if (this.previous) {
    this.checked = false;
  }
  document.querySelectorAll(
    `input[type=radio].uncheck-possible[name=${ this.name }]`).forEach((elem) => {
      elem.previous = elem.checked;
    });
}

/* Negociation Plan */
var commercialCircles = document.querySelectorAll('.commercial-circle');

for (let i = 0; i < commercialCircles.length; i++) {
  commercialCircles[i].addEventListener('click', function () {
    var clickedCircle = this;
    var parentColumn = clickedCircle.closest('.commercial-circles-col');
    var sameColumnCircles = parentColumn.querySelectorAll('.commercial-circle');

    if (clickedCircle.classList.contains('blue-circle')) {
      clickedCircle.classList.remove('blue-circle');
      connectBlueCircles();
    } else {
      for (let j = 0; j < sameColumnCircles.length; j++) {
        sameColumnCircles[j].classList.remove('blue-circle');
        connectBlueCircles();
      }
      clickedCircle.classList.add('blue-circle');
      connectBlueCircles();
    }
  });
}

function connectBlueCircles() {
  var clickedCircles = document.querySelectorAll('.blue-circle');
  console.log(clickedCircles.length)

  if (clickedCircles.length === 3) {
    var circle1 = clickedCircles[0]
    var circle2 = clickedCircles[1]
    var circle3 = clickedCircles[2]
    var x1 = circle1.offsetLeft + circle1.offsetWidth / 2;
    var y1 = circle1.offsetTop + circle1.offsetHeight / 2;
    var x2 = circle2.offsetLeft + circle2.offsetWidth / 2;
    var y2 = circle2.offsetTop + circle2.offsetHeight / 2;
    var x3 = circle3.offsetLeft + circle3.offsetWidth / 2;
    var y3 = circle3.offsetTop + circle3.offsetHeight / 2;
    console.log(x1, y1, x2, y2, x3, y3)
    blueLineDraw(x1, y1, x2, y2, '.commercial-circles-wrapper')
    blueLineDraw(x2, y2, x3, y3, '.commercial-circles-wrapper')
  } else {
    var lines = document.querySelectorAll('.blue-connecting-line');
    for (var i = 0; i < lines.length; i++) {
      lines[i].parentNode.removeChild(lines[i]);
    }
  }
}

function blueLineDraw(x1, y1, x2, y2, parentCass) {
  if (x2 < x1) {
    var tmp;
    tmp = x2; x2 = x1; x1 = tmp;
    tmp = y2; y2 = y1; y1 = tmp;
  }

  var lineLength = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
  var m = (y2 - y1) / (x2 - x1);

  var degree = Math.atan(m) * 180 / Math.PI;

  var newLine = document.createElement('div');
  newLine.className = 'blue-connecting-line';
  newLine.style.transform = 'rotate(' + degree + 'deg)';
  newLine.style.width = lineLength + 'px';
  newLine.style.top = y1 + 'px';
  newLine.style.left = x1 + 'px';

  document.querySelector(parentCass).appendChild(newLine);
}



var personalCircles = document.querySelectorAll('.personal-circle');

for (let i = 0; i < personalCircles.length; i++) {
  personalCircles[i].addEventListener('click', function () {
    var clickedCircle = this;
    var parentColumn = clickedCircle.closest('.personal-circles-col');
    var sameColumnCircles = parentColumn.querySelectorAll('.personal-circle');

    if (clickedCircle.classList.contains('orange-circle')) {
      clickedCircle.classList.remove('orange-circle');
      connectCircles();
    } else {
      for (let j = 0; j < sameColumnCircles.length; j++) {
        sameColumnCircles[j].classList.remove('orange-circle');
        connectCircles();
      }
      clickedCircle.classList.add('orange-circle');
      connectCircles();
    }
  });
}

function connectCircles() {
  var clickedCircles = document.querySelectorAll('.orange-circle');
  console.log(clickedCircles.length)

  if (clickedCircles.length === 3) {
    var circle1 = clickedCircles[0]
    var circle2 = clickedCircles[1]
    var circle3 = clickedCircles[2]
    var x1 = circle1.offsetLeft + circle1.offsetWidth / 2;
    var y1 = circle1.offsetTop + circle1.offsetHeight / 2;
    var x2 = circle2.offsetLeft + circle2.offsetWidth / 2;
    var y2 = circle2.offsetTop + circle2.offsetHeight / 2;
    var x3 = circle3.offsetLeft + circle3.offsetWidth / 2;
    var y3 = circle3.offsetTop + circle3.offsetHeight / 2;
    console.log(x1, y1, x2, y2, x3, y3)
    orangeLineDraw(x1, y1, x2, y2)
    orangeLineDraw(x2, y2, x3, y3)
  } else {
    var lines = document.querySelectorAll('.orange-connecting-line');
    for (var i = 0; i < lines.length; i++) {
      lines[i].parentNode.removeChild(lines[i]);
    }
  }
}

function orangeLineDraw(x1, y1, x2, y2) {
  if (x2 < x1) {
    var tmp;
    tmp = x2; x2 = x1; x1 = tmp;
    tmp = y2; y2 = y1; y1 = tmp;
  }

  var lineLength = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
  var m = (y2 - y1) / (x2 - x1);
  var degree = Math.atan(m) * 180 / Math.PI;
  var newLine = document.createElement('div');

  newLine.className = 'orange-connecting-line';
  newLine.style.transform = 'rotate(' + degree + 'deg)';
  newLine.style.width = lineLength + 'px';
  newLine.style.top = y1 + 'px';
  newLine.style.left = x1 + 'px';
  document.querySelector('.personal-circles-wrapper').appendChild(newLine);
}

const tbodyMainVariables = document.getElementById("deal-sheet-body");
const createVariableBtn = document.querySelector(".add-cv-btn");

if (createVariableBtn) {
  createVariableBtn.addEventListener("click", createCustomVariable);
}

function createCustomVariable() {
  let temp = document.createElement('template');
  var number = Math.floor(Math.random() * 1000);
  temp.innerHTML = `
    <tr class="main-variable-tr">
      <td class="w-20">
        <textarea class="w-100"></textarea>
      </td>
      <td class="w-38"><textarea class="w-100"></textarea></td>
      <td class="w-38"><textarea class="w-100"></textarea></td>
      <td class="actions d-flex items-center justify-center cursor-pointer">
      <img class="delete-tr-icon" src="./icons/blue-delete-btn.svg" alt="Delete table row">
      </td>
    </tr>
  `;
  let clon = temp.content.cloneNode(true);
  clon.querySelector('.main-variable-tr').id = number;
  tbodyMainVariables.appendChild(clon);
}


// Add event listeners to the select elements to update classes
var tbodyGets = document.getElementById('gets-table-body')
var getsSelectElements = tbodyGets.querySelectorAll('select');
getsSelectElements.forEach(function (getsSelectElement) {
  getsSelectElement.addEventListener('change', UpdateSelectColor);
});

function UpdateSelectColor() {
  var selectedOptionClass = this.options[this.selectedIndex].className;
  if (selectedOptionClass === "text-red") {
    this.style.color = "#BF4030";
  }
  else if (selectedOptionClass === "text-yellow") {
    this.style.color = "#FFA500";
  }
  else if (selectedOptionClass === "text-green") {
    this.style.color = "#0B9A0B";
  } else {
    this.style.color = "#596172";
  }
}

const createGetBtn = document.querySelector(".add-gets-btn");
var totalGetsMC = document.getElementById("total-gets-monetized-cost")
totalGetsMC.innerHTML = '$0'
var totalGetsMV = document.getElementById("total-gets-monetized-value")
totalGetsMV.innerHTML = '$0'

if (createGetBtn) {
  createGetBtn.addEventListener("click", createGetRow);
}

function createGetRow() {
  let temp = document.createElement('template');
  var number = Math.floor(Math.random() * 1000);
  temp.innerHTML = `
    <tr class="gets-tr">
      <td class="gets-example"><textarea class="w-100"></textarea></td>
      <td class="cost-to-them">
        <select class="w-100">
          <option value="" selected="" disabled="" hidden="">Select</option>
          <option class="text-red">1 - Low</option>
          <option class="text-yellow">2 - Low to Moderate</option>
          <option class="text-yellow">3 - Moderate</option>
          <option class="text-green">4 - Moderate to High</option>
          <option class="text-green">5 - High</option>
        </select>
      </td>
      <td class="monetized-cost"><input class="money-input mc w-100" type="text" name="mc-value"></td>
      <td class="value-to-us">
        <select class="w-100">
          <option value="" selected="" disabled="" hidden="">Select</option>
          <option class="text-red">1 - Low</option>
          <option class="text-yellow">2 - Low to Moderate</option>
          <option class="text-yellow">3 - Moderate</option>
          <option class="text-green">4 - Moderate to High</option>
          <option class="text-green">5 - High</option>
        </select>
      </td>
      <td class="monetized-value"><input class="money-input mv w-100" type="text" name="mc-value"></td>
      <td class="actions d-flex items-center justify-center cursor-pointer">
        <img class="delete-tr-icon" src="./icons/blue-delete-btn.svg" alt="Delete table row">
      </td>
    </tr>
  `;
  let clon = temp.content.cloneNode(true);
  clon.querySelector('.gets-tr').id = number;
  tbodyGets.appendChild(clon);
  totalSum(Array.from(document.querySelectorAll('.money-input.mc')), totalGetsMC);
  totalSum(Array.from(document.querySelectorAll('.money-input.mv')), totalGetsMV);

  var moneyInputs = document.querySelectorAll('.money-input');
  moneyInputs.forEach(moneyInput => {
    moneyInput.addEventListener('keydown', preventNonNumericalAndZeroFirstInput);

    moneyInput.addEventListener('blur', function () {
      var cleanValue = this.value.replace(/,/g, '');
      this.value = addCommas(cleanValue);
      totalSum(Array.from(document.querySelectorAll('.money-input.mc')), totalGetsMC);
      totalSum(Array.from(document.querySelectorAll('.money-input.mv')), totalGetsMV);
    });
    moneyInput.addEventListener('focus', function () {
      this.value = this.value.replace(/,/g, '');
      // totalSum(Array.from(document.querySelectorAll('.money-input.mc')));
    });
  });

  // Add event listeners to the select elements to update classes
  var trElement = tbodyGets.lastElementChild;
  var selectElements = trElement.querySelectorAll('select');
  /* Negociation Plan */
  selectElements.forEach(function (selectElement) {
    selectElement.addEventListener('change', UpdateSelectColor);
  });
}

const tcTriggers = document.querySelectorAll('.tc-trigger');
const closeIdeasBtns = document.querySelectorAll('.close-idea-modal');
for (const tcTrigger of tcTriggers) {
  tcTrigger.addEventListener('click', showModal);
}
function showModal(event) {
  const selector = event.target.value;
  const overlay = document.getElementById(selector);
  if (overlay !== null) {
    overlay.style.display = "flex";
  }
}
for (const closeIdeasBtn of closeIdeasBtns) {
  closeIdeasBtn.addEventListener('click', closeModal);
}
function closeModal(event) {
  const closeIdeasBtn = event.currentTarget;
  const overlaywrapper = closeIdeasBtn.closest('.tc-modal-overlay');
  overlaywrapper.style.display = "none"
}

function showContent(tab) {
  // Remove the active class from all buttons
  var buttons = document.querySelectorAll(".ideas-tabs button");
  for (var i = 0; i < buttons.length; i++) {
    buttons[i].classList.remove("ideas-active-tab");
  }
  // Add the active class to the clicked button
  document.querySelector(".ideas-tabs button[data-tab='" + tab + "']").classList.add("ideas-active-tab");

  // Hide all content divs
  var ideasContent = document.getElementsByClassName("ideas-content");
  for (var i = 0; i < ideasContent.length; i++) {
    ideasContent[i].style.display = "none";
  }
  // Show the clicked tab's content
  var selectedContent = document.querySelectorAll(".ideas-content." + tab);
  for (var i = 0; i < selectedContent.length; i++) {
    selectedContent[i].style.display = "block";
  }
}

// Attach event listeners to the buttons
var buttons = document.querySelectorAll(".ideas-tabs button");
for (var i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener("click", function () {
    showContent(this.dataset.tab);
  });
}

// Show 'All' content by default and make 'All' tab active
window.onload = function () {
  showContent('all');
};

// Attach event listeners to the ideas-content elements
var ideasContent = document.getElementsByClassName("ideas-content");
for (var i = 0; i < ideasContent.length; i++) {
  ideasContent[i].addEventListener("click", function (event) {
    // Find the first empty gets-example element
    // var tableBody = document.querySelector("#gets-table-body");
    var examples = tbodyGets.querySelectorAll(".gets-example");
    var emptyTextarea = null;

    for (var j = 0; j < examples.length; j++) {
      // Find the textarea inside the td
      var textarea = examples[j].querySelector("textarea");
      // Check if the textarea is empty
      if (textarea && !textarea.value) {
        emptyTextarea = textarea;
        break;
      }
    }
    // If there are no empty textareas, create a new row
    if (!emptyTextarea) {
      createGetRow();
      // After creating the new row, get the textarea in the last row
      var allRows = tbodyGets.querySelectorAll(".gets-tr");
      var lastRow = allRows[allRows.length - 1];
      var textareaInLastRow = lastRow.querySelector(".gets-example textarea");

      // Add the ideas-content's content to the textarea in the new row
      textareaInLastRow.value = this.textContent;
    } else {
      // Add the ideas-content's content to the textarea
      emptyTextarea.value = this.textContent;
    }
    closeModal(event)
  });
}


// Get the input field
var input = document.getElementById('searchIdeasBar');

// Listen for keystrokes
input.addEventListener('keyup', filterIdeas);
function filterIdeas() {
  // Get the filter value
  var filterValue = input.value.toUpperCase();
  // Get the ideas
  var ideas = document.getElementsByClassName('ideas-content');
  // Loop through all the ideas and hide those that don't match the search query
  for (var i = 0; i < ideas.length; i++) {
    var idea = ideas[i];
    if (idea.textContent.toUpperCase().indexOf(filterValue) > -1) {
      idea.style.display = '';
    } else {
      idea.style.display = 'none';
    }
  }
}

var moneyInputs = document.querySelectorAll('.money-input');
moneyInputs.forEach(moneyInput => {
  moneyInput.addEventListener('keypress', preventNonNumericalAndZeroFirstInput);
});

function preventNonNumericalAndZeroFirstInput(e) {
  if ((e.which < 48 || e.which > 57) && e.which != 8 && e.which != 13) {
    e.preventDefault();
  }
}
var monetizedCosts = document.querySelectorAll('.money-input.mc');
var monetizedCostsArr = Array.from(monetizedCosts)
var monetizedValue = document.querySelectorAll('.money-input.mv');
var monetizedValueArr = Array.from(monetizedValue)

document.addEventListener('DOMContentLoaded', triggerAddCommas())
function triggerAddCommas() {
  moneyInputs.forEach(function (moneyInput) {
    moneyInput.addEventListener('blur', function () {
      var cleanValue = this.value.replace(/,/g, '');
      this.value = addCommas(cleanValue);
      totalSum(monetizedCostsArr, totalGetsMC)
      totalSum(monetizedValueArr, totalGetsMV)
    });
    moneyInput.addEventListener('focus', function () {
      this.value = this.value.replace(/,/g, '');
    });
  });
};

function addCommas(nStr) {
  nStr += '';
  const x = nStr.split('.');
  let x1 = x[0];
  const x2 = x.length > 1 ? '.' + x[1] : '';
  const rgx = /(\d+)(\d{3})/;
  while (rgx.test(x1)) {
    x1 = x1.replace(rgx, '\$1' + ',' + '\$2');
  }
  return x1 + x2;
}



function totalSum(arr, total) {
  let sum = arr.map(x => x.value).filter(x => x !== "").map(x => parseInt(x.replaceAll(",", ""))).reduce((a, b) => a + b, 0)
  total.innerHTML = '$' + addCommas(sum)
}

document.addEventListener('click', function (event) {
  if (event.target && event.target.classList.contains('delete-trading-tr')) {
    var row = event.target.closest('tr');
    row.remove();
    totalSum(Array.from(document.querySelectorAll('.money-input.mc')), totalGetsMC);
    totalSum(Array.from(document.querySelectorAll('.money-input.mv')), totalGetsMV);
  }
});