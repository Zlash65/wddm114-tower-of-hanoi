document.querySelectorAll(".column").forEach(function(el) {
  el.addEventListener("click", chooseTopDisc);
});

document.querySelectorAll(".level-btn").forEach(function(el) {
  el.addEventListener("click", startGame);
});

function chooseTopDisc(e) {
  let selected = document.getElementById(e.target.id);

  let selectedColumns = document
    .getElementById("towerBoard")
    .querySelectorAll(".column.selected");

  var selectedColumn = selectedColumns.length > 0 ? selectedColumns[0] : null;

  var thisColumn = selected;

  if (!selectedColumn) {
    if (thisColumn.querySelectorAll(".disc:first-of-type").length < 1) {
      return;
    }
    thisColumn.classList.toggle("selected");
    return;
  }

  if (selectedColumn.id === thisColumn.id) {
    thisColumn.classList.toggle("selected");
    return;
  }

  if (validMove(selectedColumn, thisColumn)) {
    var disc = selectedColumn
      .querySelectorAll(".disc:first-of-type")[0]
      .parentElement.removeChild(
        selectedColumn.querySelectorAll(".disc:first-of-type")[0]
      );
    thisColumn.prepend(disc);
    selectedColumn.classList.remove("selected");
    incrementScore();
    isItAWin();
  }
}

function validMove(from, to) {
  if (to.querySelectorAll(".disc").length === 0) return true;
  if (from.querySelectorAll(".disc").length === 0) return false;

  var topOfTo = to.querySelectorAll(".disc:first-of-type")[0];
  var topOfFrom = from.querySelectorAll(".disc:first-of-type")[0];

  return (
    topOfTo.getAttribute("data-layer") >
    topOfFrom.getAttribute("data-layer")
  );
}

function isItAWin() {
  if (
    document.querySelector("#column1").querySelectorAll(".disc").length == 0 &&
    document.querySelector("#column2").querySelectorAll(".disc").length == 0
  ) {
    document.querySelector("#towerBoard").classList.add("game-won");
    document.querySelectorAll(".column").forEach(function(el) {
      el.style.opacity = 0;
    });
    document.querySelector("#score-board").style.opacity = 0;
    document.querySelector("#win").style.opacity = 1;
    document.querySelector("#win").style.zIndex = 20;
  }
}

function startGame(e) {
  var layerCount = e.target.getAttribute("data-layers");
  for (var i = 1; i <= layerCount; i++) {
    document
      .querySelector("#column1")
      .insertAdjacentHTML(
        "beforeend",
        '<div class="disc layer' + i + '" data-layer="' + i + '"></div>'
      );
  }

  document.querySelector("#options").style.display = "none";
  document.querySelectorAll(".column").forEach(function(el) {
    el.style.opacity = 1;
  });
  document.querySelector("#score-board").style.opacity = 100;

  document.querySelector("#towerBoard").setAttribute("data-score", 0);
}

function incrementScore() {
  var currentScore =
    Number(document.querySelector("#towerBoard").getAttribute("data-score")) +
    1;
  document
    .querySelector("#towerBoard")
    .setAttribute("data-score", currentScore);
  document.querySelector("#score-board").innerHTML = currentScore;
  document.querySelector("#final-score").innerHTML = currentScore;
}

function playAgain() {
  location.reload();
}
