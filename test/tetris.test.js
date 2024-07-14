const { expect } = import("chai");
const {
  createMatrix,
  collide,
  merge,
  playerReset,
  rotate,
} = require("../tetris"); // Adjust path as per your project structure

describe("Tetris Game Tests", function () {
  let arena, player;

  beforeEach(function () {
    // Initialize test data before each test
    arena = createMatrix(12, 20);
    player = {
      pos: { x: 5, y: 0 },
      matrix: [
        [0, 0, 0],
        [1, 1, 1],
        [0, 1, 0],
      ],
      nextMatrix: [
        [0, 0],
        [2, 2],
      ],
      score: 0,
      spins: 0,
      crazySpins: false,
      level: 1,
      lines: 0,
    };
  });

  // Test for createMatrix function
  it("createMatrix should create a matrix of specified size", function () {
    const matrix = createMatrix(5, 10);
    expect(matrix.length).to.equal(10);
    expect(matrix[0].length).to.equal(5);
    expect(matrix.every((row) => row.every((val) => val === 0))).to.be.true;
  });

  // Test for collide function
  it("collide should detect collision between player and arena", function () {
    arena[1][5] = 1; // Simulate a block in the arena
    player.pos = { x: 5, y: 1 }; // Set player position to collide with the above block
    expect(collide(arena, player)).to.be.true;
  });

  // Test for merge function
  it("merge should merge player matrix into the arena", function () {
    merge(arena, player);
    expect(arena.some((row) => row.some((val) => val !== 0))).to.be.true;
  });

  // Test for playerReset function
  it("playerReset should reset player position and matrix", function () {
    player.pos = { x: 0, y: 18 }; // Simulate collision
    playerReset(arena, player);
    expect(player.pos).to.deep.equal({ x: 5, y: 0 });
    expect(player.matrix).to.not.deep.equal(player.nextMatrix); // Ensure matrix change
  });

  // Test for rotate function
  it("rotate should rotate the matrix in the correct direction", function () {
    const matrix = [
      [1, 1],
      [0, 1],
    ];
    rotate(matrix, 1); // Rotate clockwise
    expect(matrix).to.deep.equal([
      [0, 1],
      [1, 1],
    ]);
    rotate(matrix, -1); // Rotate counterclockwise
    expect(matrix).to.deep.equal([
      [1, 1],
      [1, 0],
    ]);
  });

  // Additional tests can be added for other functions and game behaviors
});
