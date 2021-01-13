//select a container
const container = document.querySelector('.container');
console.log(container);
//make a grid
const nodes = [];
const COLS = 20;
const ROWS = 20;
function grid() {
  for (let i = 0; i < ROWS; i++) {
    for (let j = 0; j < COLS; j++) {
      const div = document.createElement('div');
      nodes.push({ name: div, row: i, col: j });
      div.classList.add('node');
      container.append(div);
    }
  }
  console.log(nodes);
}

function init() {
  grid();
}
init();

function setStartingPoint(rows, cols) {
  const startingNode = nodes.find((el) => el.row === rows && el.col === cols);
  startingNode.name.classList.add('startingNode');
}

function setEndingPoint(rows, cols) {
  const startingNode = nodes.find((el) => el.row === rows && el.col === cols);
  startingNode.name.classList.add('endingNode');
}
setStartingPoint(12, 3);
setEndingPoint(1, 12);

//when i click the node it must log
nodes.forEach((el) =>
  el.name.addEventListener('mousemove', function (e) {
    e.target.classList.add('wall');
  })
);
