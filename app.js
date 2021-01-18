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
      div.setAttribute('data-row', i);
      div.setAttribute('data-col', j);
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
  //return
}
init();
function setStartingPoint(rows, cols) {
  const startingNode = nodes.find((el) => el.row === rows && el.col === cols);
  startingNode.name.classList.add('startingNode');
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
let dragStartingNode = false;
window.onmousedown = function () {
  mouseisDown = true;
  console.log(mouseisDown);
  drawWall();
};
window.onmouseup = function () {
  mouseisDown = false;
  console.log(mouseisDown);
};

function mouseDraw() {
  if (mouseisDown) {
    nodes.forEach((el) =>
      el.name.addEventListener('mousemove', function (e) {
        if (
          mouseisDown &&
          !el.name.classList.contains('startingNode') &&
          !el.name.classList.contains('endingNode')
        ) {
          e.target.classList.add('wall');
        }
      })
    );
  }
}
function drawWall() {
  mouseDraw();
}

//djkstra Algo
// const t = setInterval(() => {
//   nodes.forEach((el) => (el.name.style.backgroundColor = 'blue'));
// }, 100);

//iterate skozi vse neighboure in jih pobarvaj rdeco

let endPoint = setEndingPoint(10, 16);
let startingPoins = setStartingPoint(3, 3);

//select the current staring point

//plan
//select the staringNodePosition
const startNo = document.querySelector('.startingNode');
const endNo = document.querySelector('.endingNode');
startNo.draggable = true;
endNo.draggable = true;
let tpdragged;
startNo.addEventListener('drag', function (event) {}, false);
endNo.addEventListener('drag', function (event) {}, false);
document.addEventListener(
  'dragstart',
  function (event) {
    // store a ref. on the dragged elem
    tpdragged = event.target;
    if (event.target.classList.contains('startingNode')) {
      event.target.classList.remove('startingNode');
    } else if (event.target.classList.contains('endingNode')) {
      event.target.classList.remove('endingNode');
    }

    console.log(tpdragged.classList);
    // make it half transparent
  },
  false
);

document.addEventListener(
  'dragend',
  function (event) {
    // reset the transparency
    event.target.style.opacity = '';
  },
  false
);
document.addEventListener(
  'dragover',
  function (event) {
    // prevent default to allow drop
    event.preventDefault();
  },
  false
);
document.addEventListener(
  'dragenter',
  function (event) {
    // highlight potential drop target when the draggable element enters it
    if (event.target.className == 'node') {
      event.target.style.background = 'grey';
      event.target.style.opacity = 1;
    }
  },

  false
);
document.addEventListener(
  'dragleave',
  function (event) {
    // reset background of potential drop target when the draggable element leaves it
    if (event.target.className == 'node') {
      event.target.style.background = '';
    }
  },
  false
);

document.addEventListener(
  'drop',
  function (event) {
    // prevent default action (open as link for some elements)
    event.preventDefault();
    console.log(event.target);

    // move dragged elem to the selected drop target
    if (event.target.className == 'node') {
      if (!nodes.find((el) => el.name.classList.contains('startingNode'))) {
        event.target.style.background = '';
        console.log(event.target.dataset.row, event.target.dataset.col);
        startingPoins = setStartingPoint(
          Number(event.target.dataset.row),
          Number(event.target.dataset.col)
        );
      } else {
        endPoint = setEndingPoint(
          Number(event.target.dataset.row),
          Number(event.target.dataset.col)
        );
      }
    }
    mouseisDown = false;
  },
  false
);
// startNo.addEventListener(
//   'dragend',
//   function (event) {
//     console.log(tpdragged);
//     tpdragged.name.classList.add('startingNode');
//   },
//   false
// );

//find neighbbour

function findNeighbour(currentNode) {
  const neighbours = [];
  const { row, col } = currentNode;

  //najdemo leve, desne neighgboure v nodes !

  neighbours.push(nodes.find((el) => el.row === row - 1 && el.col === col));
  neighbours.push(nodes.find((el) => el.row === row + 1 && el.col === col));
  neighbours.push(nodes.find((el) => el.row === row && el.col === col - 1));
  neighbours.push(nodes.find((el) => el.row === row && el.col === col + 1));
  return neighbours
    .filter((el) => el !== undefined)
    .filter((el) => (el.isVisited = true));
}

function dijkstra(grid, startingNode, endNode) {
  const visitedNodes = [];
  startingNode.tentativeDistance = 0;
  const UNVisitedNodes = grid;

  //dokler ni prazna !
  while (!!UNVisitedNodes.length) {
    //sortamo node po distance => 0 gre na začetek za začetek, tako dobimo starting node kak začetek
    sortNodes(UNVisitedNodes);
    const closestNode = UNVisitedNodes.shift();
    closestNode.isVisited = true;

    //dodamo wall ==>
    if (closestNode.name.classList.contains('wall')) continue;
    //če je closest node enak end nodu potem je SUCCSESS
    visitedNodes.push(closestNode);
    if (closestNode === endNode) return visitedNodes;
    //updejtamo neighboure
    updateNeighbours(closestNode, nodes);
  }
}

const start = document.querySelector('.startDijsktra');

start.addEventListener('click', function (e) {
  animateDijs();
});

//sortamo node, da dobimo 0 na začetku !
function sortNodes(unvisitedNodes) {
  unvisitedNodes.sort((a, b) => a.tentativeDistance - b.tentativeDistance);
}

function updateNeighbours(closestNode, grid) {
  const unvisitedNeigh = findNeighbour(closestNode, grid);
  for (const neighbour of unvisitedNeigh) {
    neighbour.tentativeDistance = closestNode.tentativeDistance + 1;
    neighbour.previousNode = closestNode;
  }
}

//returnati moramo shortest path =>
function getNodesInShortestPath(startNode) {
  const nodesShoretes = [];
  let currentNode = startNode;
  while (currentNode !== null) {
    //dodamo na začezek
    nodesShoretes.unshift(currentNode);
    currentNode = currentNode.previousNode;
  }

  return nodesShoretes;
}

//TO DO
//1. [OK] animate the neighbouring nodes that appear
//2. animate the shortest path
//3. get starting and ending node to appear any where

//1.Animate the neighboiuzrs nodest that appear
function animateDijs() {
  const visitedNodes = dijkstra(nodes, startingPoins, endPoint);
  //dijsktra returna vse visited nodese
  //loopamo skozi vsakega in mu dodamo class listo visited z delajom
  for (let i = 0; i < visitedNodes.length; i++) {
    setTimeout(() => {
      const element = visitedNodes[i];
      element.name.classList.add('visited');
    }, 10 * i);
  }

  const shortestPath = getNodesInShortestPath(endPoint);
  setTimeout(() => {
    for (let i = shortestPath.length - 1; i >= 0; i--) {
      setTimeout(() => {
        const element = shortestPath[i];
        element.name.classList.add('shoretstPath');
      }, 50 * i);
    }
  }, 10 * visitedNodes.length);
}
