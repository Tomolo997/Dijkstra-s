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
      nodes.push({
        name: div,
        row: i,
        col: j,
        isWall: false,
        isVisited: false,
        tentativeDistance: Infinity,
      });
      div.classList.add('node');
      container.append(div);
    }
  }
}

function init() {
  grid();
  makeSet();
}
init();
function makeSet() {
  const unVisited = new Set();
  nodes.forEach((el) => {
    if (!el.isVisited) {
      unVisited.add(el);
    }
  });
  return unVisited;
}
console.log(makeSet());
function setStartingPoint(rows, cols) {
  const startingNode = nodes.find((el) => el.row === rows && el.col === cols);
  startingNode.name.classList.add('startingNode');
  startingNode.tentativeDistance = 0;
}

function setEndingPoint(rows, cols) {
  const endingNode = nodes.find((el) => el.row === rows && el.col === cols);
  endingNode.name.classList.add('endingNode');
  endingNode.endingNode = true;
}

console.log(nodes);
setStartingPoint(12, 3);
setEndingPoint(1, 12);

//when i click the node it must log
let mouseisDown = false;
let clicked = false;
document.body.addEventListener('mousedown', function () {
  mouseisDown = true;
});

document.body.addEventListener('mouseup', function () {
  mouseisDown = false;
});
function mouseDraw() {
  nodes.forEach((el) =>
    el.name.addEventListener('mousemove', function (e) {
      if (
        mouseisDown &&
        !el.name.classList.contains('startingNode') &&
        !el.name.classList.contains('endingNode')
      ) {
        e.target.classList.add('wall');
      }
      el.isWall = true;
    })
  );
}
function drawWall() {
  mouseDraw();
}
drawWall();

//djkstra Algo
// const t = setInterval(() => {
//   nodes.forEach((el) => (el.name.style.backgroundColor = 'blue'));
// }, 100);

//iterate skozi vse neighboure in jih pobarvaj rdeco

function obarvajNode(arr, startingNodeX, startingNodeY) {
  const startingNode = arr.find(
    (el) => el.row === startingNodeX && el.col === startingNodeY
  );
  let currentX = startingNode.row;
  let currentY = startingNode.col;
  console.log(startingNode);
  let j = 0;
  let y = 0;

  const neighbours = findNeighours(arr, currentX, currentY);

  neighbours.forEach((el) => (el.name.style.backgroundColor = 'red'));
  while (j < 10) {
    for (let i = 0; i < neighbours.length; i++) {
      const nextNeigbours = findNeighours(
        arr,
        neighbours[i].row,
        neighbours[i].col
      );
      nextNeigbours.forEach((el) => (el.name.style.backgroundColor = 'red'));
    }
    j++;
  }
}

obarvajNode(nodes, 12, 3);

function findNeighours(arr, currentNodeX, currentNodeY) {
  const xCoord = currentNodeX;
  const yCoord = currentNodeY;
  const leftNeigbour = arr.find(
    (el) => el.row === xCoord - 1 && el.col === yCoord
  );
  const upNeigbour = arr.find(
    (el) => el.row === xCoord && el.col === yCoord + 1
  );
  const downNeigbour = arr.find(
    (el) => el.row === xCoord && el.col === yCoord - 1
  );
  const rightNeigbour = arr.find(
    (el) => el.row === xCoord + 1 && el.col === yCoord
  );

  return [leftNeigbour, rightNeigbour, upNeigbour, downNeigbour];
}
