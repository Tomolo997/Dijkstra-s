//select a container
const container = document.querySelector('.container');
console.log(container);
//make a grid
const COLS = 20;
const ROWS = 20;
function grid() {
  for (let i = 0; i < ROWS; i++) {
    for (let j = 0; j < COLS; j++) {
      const div = document.createElement('div');
      div.setAttribute('data-rows', i);
      div.setAttribute('data-cols', j);
      div.classList.add('node');
      container.append(div);
    }
  }
}

function setStartingPoint(rows, cols) {}

function init() {
  grid();
}
init();
