var n = document.getElementById('n');
var e = document.getElementById('e');
var s = document.getElementById('s');
var w = document.getElementById('w');
/*
n.addEventListener('click', function(e){
  console.log("Go North");
});

e.addEventListener('click', function(e){
  console.log("Go East");
});

s.addEventListener('click', function(e){
  console.log("Go South");
});

w.addEventListener('click', function(e){
  console.log("Go West");
});
*/
n.addEventListener('click', function(e){
  moveNorth();
});
function moveNorth(){
  console.log('go north');
}

e.addEventListener('click', function(e){
  moveEast();
});
function moveEast(evt){
  console.log('go east');
}

s.addEventListener('click', function(e){
  moveSouth();
})
function moveSouth(){
  console.log('move south');
}

w.addEventListener('click', function(e){
  moveWest();
});
function moveWest(){
  console.log('move west');
}


var grid = function(x, y){
  var totalCells = x * y;
  var cells = [];
  var unvisited = [];
  // console.log(x + ":" + y);
  for(var i = 0; i < y; i++){
      cells[i] = [];
      unvisited[i] = [];
      for(var j = 0; j < x; j++){
        cells[i][j] = [0, 0, 0, 0];
        unvisited[i][j] = true;
      }
  }
  var currentCell = [Math.floor(Math.random() * y), Math.floor(Math.random() * x)];
  var path = [currentCell];
  unvisited[currentCell[0]][currentCell[1]] = false;

  var noOfVisited = 1;

  while(noOfVisited < totalCells){
    var possible = [[currentCell[0]-1, currentCell[1], 0, 2], // we are checking if the y value of neighbor cell (top) is inside of the grid
                    [currentCell[0], currentCell[1]+1, 1, 3], // check if x value of neighbor of cell (right) is inside the grid
                    [currentCell[0]+1, currentCell[1], 2, 0], //checking y value of neighbor (below) current cell is in the grid
                    [currentCell[0]-1], [currentCell[1]-1, 3, 1]]; //checking for the cell (left) of the current cell inside the grid
    var neighbors = [];

    for(var l = 0; l < 4; l++){
      if(possible[l][0] > -1 &&
        possible[l][0] < y &&
        possible[l][1] > -1 &&
        possible[l][1] < x &&
        unvisited[possible[l][0]][possible[l][1]]){
          neighbors.push(possible[l]);
        }
    }
  }


}(4, 4);
//function(){} /***  ()   ****/; automatically runs the function witout needing to call it seperately
