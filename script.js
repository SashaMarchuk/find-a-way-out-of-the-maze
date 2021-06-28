// const arrMaze = [
//   ["#", "#", "#", "#", "#", "#", "#", "#", "#"],

//   ["#", "+", "+", "+", "#", "+", "+", "+", "#"],

//   ["#", "#", "#", "+", "#", "+", "#", "+", "#"],

//   ["+", "+", "#", "+", "0", "+", "#", "+", "#"],

//   ["#", "+", "#", "+", "#", "#", "+", "+", "#"],

//   ["#", "+", "+", "#", "#", "#", "+", "#", "#"],

//   ["#", "#", "+", "+", "+", "+", "+", "#", "#"],

//   ["#", "#", "#", "#", "#", "#", "#", "#", "#"],
// ];

const arrMaze = [
  ["#", "#", "#", "#", "#", "#", "#", "#", "#"],

  ["#", "+", "+", "+", "#", "+", "+", "+", "#"],

  ["#", "+", "#", "+", "#", "+", "#", "+", "#"],

  ["+", "+", "#", "+", "0", "+", "#", "+", "#"],

  ["#", "#", "#", "+", "#", "#", "#", "#", "#"],

  ["#", "#", "+", "+", "#", "#", "#", "#", "#"],

  ["#", "#", "+", "#", "#", "#", "#", "#", "#"],

  ["#", "#", "#", "#", "#", "#", "#", "#", "#"],
];

console.log(arrMaze);

const objectCordsStart = {},
  objectCordsEnd = {};
let outputArrayWay = [];

const searchEnds = (array) => {
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array[i].length; j++) {
      if (
        i == array.length - array.length ||
        i == array.length - 1 ||
        j == array[i].length - array[i].length ||
        j == array[i].length - 1
      ) {
        if (array[i][j] == "+") {
          objectCordsEnd.x = j;
          objectCordsEnd.y = i;
        }
      } else {
        if (array[i][j] == "0") {
          objectCordsStart.x = j;
          objectCordsStart.y = i;
        }
      }
    }
  }
  return objectCordsStart, objectCordsEnd;
};

searchEnds(arrMaze);

const searchPath = (start, end) => {
  arrMaze[start.y][start.x] = "-";
  let siblings = getValidSib(start);

  if (siblings.length > 0) {
    for (let i = 0; i < siblings.length; i++) {
      const current = siblings[i];

      const isSolved = current.x === end.x && current.y === end.y;
      const notVisited = arrMaze[current.y][current.x] !== "-";

      if (isSolved || (notVisited && searchPath(current, end))) {
        outputArrayWay.push(current.side);
        return outputArrayWay;
      }
    }
  }
  return false;
};

const getValidSib = (cord) => {
  const { x, y } = cord;

  let cords = [];

  if (arrMaze[y - 1] !== undefined) {
    cords.push({ x: x, y: y - 1, val: arrMaze[y - 1][x], side: "top" });
  }
  if (arrMaze[y + 1] !== undefined) {
    cords.push({ x: x, y: y + 1, val: arrMaze[y + 1][x], side: "bottom" });
  }
  if (arrMaze[y][x - 1] !== undefined) {
    cords.push({ x: x - 1, y: y, val: arrMaze[y][x - 1], side: "left" });
  }
  if (arrMaze[y][x + 1] !== undefined) {
    cords.push({ x: x + 1, y: y, val: arrMaze[y][x + 1], side: "right" });
  }
  return cords.filter((crd) => crd.val === "+");
};

searchPath(objectCordsStart, objectCordsEnd);
outputArrayWay = outputArrayWay.reverse();
console.log(outputArrayWay); //['left', 'top','top','left','left','bottom','bottom','left']`

