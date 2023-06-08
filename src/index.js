import _ from 'lodash';
import './style.css';
// import Node from './module';

// const makeBoard = () => {
//   const board = [];
//   for (let i = 0; i < 8; i++) {
//     board[i] = [];
//     for (let j = 0; j < 8; j++) {
//       board[i][j] = `[${i}, ${j}]`;
//     }
//   }
//   console.log(board);
//   return board;
// };
// makeBoard();

// function Node(pos, path) {
//   if (pos[0] < 0 || pos[0] > 7 || pos[1] < 0 || pos[1] > 7) {
//     return null;
//   }
//   // console.log('aaaaaa', pos, path);
//   return { pos, path };
// }

// function knightMoves([x, y], [a, b]) {
//   const q = [Node([x, y], [[x, y]])];
//   // console.log(q);
//   let currentNode = q.shift();
//   console.log('hello', currentNode);

//   while (currentNode.pos[0] !== a || currentNode.pos[1] !== b) {
//     const moves = [
//       [currentNode.pos[0] + 2, currentNode.pos[1] - 1],
//       [currentNode.pos[0] + 2, currentNode.pos[1] + 1],
//       [currentNode.pos[0] - 2, currentNode.pos[1] - 1],
//       [currentNode.pos[0] - 2, currentNode.pos[1] + 1],
//       [currentNode.pos[0] + 1, currentNode.pos[1] - 2],
//       [currentNode.pos[0] + 1, currentNode.pos[1] + 2],
//       [currentNode.pos[0] - 1, currentNode.pos[1] - 2],
//       [currentNode.pos[0] - 1, currentNode.pos[1] + 2],
//     ];
//     moves.forEach((move) => {
//       const node = Node(move, currentNode.path.concat([move]));
//       // console.log(move);
//       if (node) {
//         q.push(node);
//       }
//     });
//     currentNode = q.shift();
//   }
//   console.log(
//     `=> You made it in ${currentNode.path.length - 1} moves!  Here's your path:`,
//   );
//   currentNode.path.forEach((pos) => {
//     console.log(pos);
//   });
// }
// knightMoves([3, 3], [7, 7]);

// function knightMoves(start, end) {
//   const queue = [start]; // Очередь для BFS
//   const visited = new Set(); // Множество посещенных клеток
//   const prev = {}; // Хранит предыдущую клетку для каждой клетки
//   let found = false; // Флаг, указывающий на достижение конечной клетки

//   // Функция для проверки допустимости клетки
//   function isValidCell(cell) {
//     const [x, y] = cell;
//     return x >= 0 && x < 8 && y >= 0 && y < 8;
//   }

//   // Функция для получения всех возможных ходов коня из данной клетки
//   function getKnightMoves(cell) {
//     const [x, y] = cell;
//     const moves = [
//       [x - 2, y - 1],
//       [x - 2, y + 1],
//       [x - 1, y - 2],
//       [x - 1, y + 2],
//       [x + 1, y - 2],
//       [x + 1, y + 2],
//       [x + 2, y - 1],
//       [x + 2, y + 1],
//     ];
//     return moves.filter(isValidCell);
//   }

//   // Начинаем обход BFS
//   while (queue.length > 0) {
//     const current = queue.shift();

//     if (current[0] === end[0] && current[1] === end[1]) {
//       found = true;
//       break; // Конечная клетка достигнута, выходим из цикла
//     }

//     const moves = getKnightMoves(current);

//     for (const move of moves) {
//       const [x, y] = move;
//       const key = `${x}-${y}`;

//       if (!visited.has(key)) {
//         visited.add(key);
//         prev[key] = current;
//         queue.push(move);
//       }
//     }
//   }

//   if (!found) {
//     return []; // Конечная клетка недостижима, возвращаем пустой путь
//   }

//   // Восстанавливаем путь от конечной клетки к начальной
//   const path = [];
//   let current = end;
//   while (current) {
//     path.unshift(current);
//     const key = `${current[0]}-${current[1]}`;
//     current = prev[key];
//   }

//   return path;
// }

// Примеры использования
// console.log(knightMoves([0, 0], [1, 2])); // [[0,0],[1,2]]
// console.log(knightMoves([0, 0], [3, 3])); // [[0,0],[1,2],[3,3]]
// console.log(knightMoves([3, 3], [0, 0])); // [[3,3],[1,2],[0,0]]

function knightMoves(start, end) {
  const queue = [[start]];
  const visited = {};
  const maxLength = 8; // Максимальная длина пути (количество ходов коня)

  function isValidCell(cell) {
    const [x, y] = cell;
    return x >= 0 && x < 8 && y >= 0 && y < 8;
  }

  function getKnightMoves(cell) {
    const [x, y] = cell;
    const moves = [
      [x - 2, y - 1],
      [x - 2, y + 1],
      [x - 1, y - 2],
      [x - 1, y + 2],
      [x + 1, y - 2],
      [x + 1, y + 2],
      [x + 2, y - 1],
      [x + 2, y + 1],
    ];
    return moves.filter(isValidCell);
  }

  while (queue.length > 0) {
    const path = queue.shift();
    const current = path[path.length - 1];
    // console.log(path);

    if (current[0] === end[0] && current[1] === end[1]) {
      // console.log(path);
      return path;
    }
    // console.log(current);
    const moves = getKnightMoves(current);
    // console.log(moves);
    moves.forEach((move) => {
      // console.log(move);
      const [x, y] = move;
      const key = `${x}-${y}`;
      // console.log(key);

      if (!visited[key] && path.length < maxLength) {
        visited[key] = true;
        // console.log(path, move);
        queue.push([...path, move]);
      }
    });
  }

  return [];
}

// console.log(knightMoves([0, 0], [1, 2])); // [[0,0],[1,2]]
knightMoves([0, 0], [7, 7]); // [[0,0],[1,2],[3,3]]
// console.log(knightMoves([3, 3], [0, 0])); // [[3,3],[1,2],[0,0]]
