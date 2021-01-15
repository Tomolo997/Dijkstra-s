//select a container
const container = document.querySelector('.container');
console.log(container);
//make a grid
export const nodes = [];
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
        previousNode: null,
      });
      div.classList.add('node');
      container.append(div);
    }
  }
}
function init() {
  grid();
  setEndingPoint(12, 16);
  //return
}
init();
function setStartingPoint(rows, cols) {
  const startingNode = nodes.find((el) => el.row === rows && el.col === cols);
  startingNode.name.classList.add('startingNode');
  startingNode.tentativeDistance = 0;
  return startingNode;
}

function setEndingPoint(rows, cols) {
  const endingNode = nodes.find((el) => el.row === rows && el.col === cols);
  endingNode.name.classList.add('endingNode');
  endingNode.endingNode = true;
  return endingNode;
}

//when i click the node it must log
let mouseisDown = false;
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

let endPoint = setEndingPoint(12, 16);
let startingPoins = setStartingPoint(12, 3);

// Nodes => nodes !

//find neighbbour

function findNeighbour(currentNode, grid) {
  const neighbours = [];
  const { row, col } = currentNode;

  //najdemo leve, desne neighgboure v nodes !
  neighbours.push(nodes.find((el) => el.row === row - 1 && el.col === col));
  neighbours.push(nodes.find((el) => el.row === row + 1 && el.col === col));
  neighbours.push(nodes.find((el) => el.row === row && el.col === col - 1));
  neighbours.push(nodes.find((el) => el.row === row && el.col === col + 1));

  return neighbours;
}
console.log(findNeighbour(startingPoins, nodes));
