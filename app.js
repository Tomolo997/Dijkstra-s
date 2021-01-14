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
  makeSet();
  setEndingPoint(12, 16);
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
  return startingNode;
}

function setEndingPoint(rows, cols) {
  const endingNode = nodes.find((el) => el.row === rows && el.col === cols);
  endingNode.name.classList.add('endingNode');
  endingNode.endingNode = true;
}

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
const startingPoins = setStartingPoint(12, 3);

function dijkstra(grid, startNode, endNode) {
  //getting the starting node in the grid for dijkstra
  const startingNode = grid.find(
    (el) => el.row === startNode.row && el.col === startNode.col
  );

  //vse node ki so unvisited => ivsited 0 false
  const unvisitedNodes = grid;

  return !!unvisitedNodes.length;
}
console.log(dijkstra(nodes, startingPoins));
// Najdemo neighboure
function findNeigbours(currentNode, grid) {
  const neigbours = [];
  const { row, col } = currentNode;
  //dobi vse 4 neighnoure
  //zgornji neighbour
  if (row > -1)
    neigbours.push(grid.find((el) => el.row === row - 1 && el.col === col));
  //spodnji neighbour
  if (row < grid.length - 1)
    neigbours.push(grid.find((el) => el.row === row + 1 && el.col === col));
  //levi neighbour
  if (col > -1)
    neigbours.push(grid.find((el) => el.row === row && el.col === col - 1));
  //desen Neigbour
  if (col < grid.length - 1)
    neigbours.push(grid.find((el) => el.row === row && el.col === col + 1));
  //spodnji neighbour
  return neigbours;
}
console.log(startingPoins);
//updejtamo neighboure
function updateNeighbours(node, grid) {
  const neigbours = findNeigbours(node, grid);
  for (const neigh of neigbours) {
    neigh.tentativeDistance = node.tentativeDistance + 1;
  }
  return neigbours.filter((el) => !el.isVisited);
}
console.log(updateNeighbours(startingPoins, nodes));
