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
  // console.log(selectElements)
  selectElements.forEach(function (selectElement) {
    selectElement.addEventListener('change', function () {
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
    });
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
var circles = document.querySelectorAll('.circle');

for (let i = 0; i < circles.length; i++) {
  circles[i].addEventListener('click', function () {
    var clickedCircle = this;
    var parentColumn = clickedCircle.closest('.circles-col');
    var sameColumnCircles = parentColumn.querySelectorAll('.circle');

    if (clickedCircle.classList.contains('orange-circle')) {
      clickedCircle.classList.remove('orange-circle');
    } else {
      for (let j = 0; j < sameColumnCircles.length; j++) {
        sameColumnCircles[j].classList.remove('orange-circle');
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
    linedraw(x1, y1, x2, y2)
    linedraw(x2, y2, x3, y3)
  } else {
    var lines = document.querySelectorAll('.circle-connecting-line');
    for (var i = 0; i < lines.length; i++) {
      lines[i].parentNode.removeChild(lines[i]);
    }
  }
}

function linedraw(x1, y1, x2, y2) {
  if (x2 < x1) {
    var tmp;
    tmp = x2; x2 = x1; x1 = tmp;
    tmp = y2; y2 = y1; y1 = tmp;
  }

  var lineLength = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
  var m = (y2 - y1) / (x2 - x1);

  var degree = Math.atan(m) * 180 / Math.PI;

  document.querySelector('.circles-wrapper').innerHTML += "<div class='circle-connecting-line' style='transform-origin: top left; transform: rotate(" + degree + "deg); width: " + lineLength + "px; height: 1px; background: var(--orange); pointer-events: none; z-index:1; position: absolute; top: " + y1 + "px; left: " + x1 + "px;'></div>";
}