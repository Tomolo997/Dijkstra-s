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
console.log(nodes);
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

function dijkstra(grid, startNode, endNode) {
  //getting the starting node in the grid for dijkstra
  const visitedNodes = [];
  startNode.tentativeDistance = 0;

  //vse node ksi so unvisited => ivsited 0 false
  const unvisitedNodes = nodes;
  //dokler obstaja unvisitedNodes , je več kot 0
  while (!!unvisitedNodes.length) {
    //sortaj po distanci node
    sortNodes(unvisitedNodes);
    //vzami ven prvega
    const closestNode = unvisitedNodes.shift();
    //dodaj mu visited
    closestNode.isVisited = true;
    console.log(closestNode);
    visitedNodes.push(closestNode);
    if (closestNode === endNode) return visitedNodes;
    updateNeighbours(closestNode, nodes);
  }
}
// Najdemo neighboure
function findNeigbours(currentNode, grid) {
  const neigbours = [];
  const { row, col } = currentNode;

  console.log(nodes.find((el) => el.row === row + 1 && el.col === col));
  //dobi vse 4 neighnoure
  //zgornji neighbour
  if (row > 0)
    neigbours.push(nodes.find((el) => el.row === row - 1 && el.col === col));
  //spodnji neighbour
  if (row < grid.length - 1)
    neigbours.push(nodes.find((el) => el.row === row + 1 && el.col === col));
  //levi neighbour
  if (col > -1)
    neigbours.push(nodes.find((el) => el.row === row && el.col === col + 1));

  //desen Neigbour
  if (col < grid.length - 1)
    neigbours.push(nodes.find((el) => el.row === row && el.col === col - 1));
  //spodnji neighbour
  console.log(neigbours);
  return neigbours;
}

//updejtamo neighboure
function updateNeighbours(node, nodes) {
  const neigbours = findNeigbours(node, nodes);
  for (const neigh of neigbours) {
    neigh.tentativeDistance = node.tentativeDistance + 1;
    neigh.previousNode = node;
  }
}

//sortamo node pos distancih
function sortNodes(nodesToSort) {
  nodesToSort.sort((a, b) => {
    b.tentativeDistance - a.tentativeDistance;
  });
}

function getNodesInShortestPathOrder(finishNode) {
  const nodesInShortestPathOrder = [];
  let currentNode = finishNode;
  while (currentNode !== null) {
    nodesInShortestPathOrder.unshift(currentNode);
    currentNode = currentNode.previousNode;
  }
  return nodesInShortestPathOrder;
}
console.log(dijkstra(nodesArray, startingPoins, endPoint));
console.log(getNodesInShortestPathOrder(endPoint));
