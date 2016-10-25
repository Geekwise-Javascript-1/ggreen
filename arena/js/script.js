var n = document.getElementById('n');
var e = document.getElementById('e');
var s = document.getElementById('s');
var w = document.getElementById('w');
var tableHolder = document.getElementById('table');
var maze, thisCell, exitCell, cells;

n.addEventListener('click', function(e){
  moveNorth();
});
function moveNorth(){
  // console.log('go north');
  // console.log(thisCell);
  maze.firstChild.childNodes[thisCell[0]].childNodes[thisCell[1]].classList.remove('active');
  thisCell = [thisCell[0]-1, thisCell[1]];
  // maze.firstChild.childNodes[thisCell[0]].childNodes[thisCell[1]]classList.add('active');
  theCell(thisCell);
  checkWalls(cells);
}

e.addEventListener('click', function(e){
  moveEast();
});
function moveEast(){
  // console.log('go east');
  maze.firstChild.childNodes[thisCell[0]].childNodes[thisCell[1]].classList.remove('active');
  thisCell = [thisCell[0], thisCell[1]+1];
  theCell(thisCell);
  checkWalls(cells);
}

s.addEventListener('click', function(e){
  moveSouth();
})
function moveSouth(){
    // console.log('move south');
    maze.firstChild.childNodes[thisCell[0]].childNodes[thisCell[1]].classList.remove('active');
    thisCell = [thisCell[0]+1, thisCell[1]];
    theCell(thisCell);
    checkWalls(cells);
}

w.addEventListener('click', function(e){
  moveWest();
});
function moveWest(){
// console.log('move west');
maze.firstChild.childNodes[thisCell[0]].childNodes[thisCell[1]].classList.remove('active');
thisCell = [thisCell[0], thisCell[1]-1];
theCell(thisCell);
checkWalls(cells);
}

function enableNorth(wall){
  wall ? n.disabled = false : n.disabled = true;
  console.log(wall);
}

function enableEast(wall){
  wall ? e.disabled = false : e.disabled = true;
  console.log(wall);
}

function enableSouth(wall){
  wall ? s.disabled = false : s.disabled = true;
  console.log(wall);
}

function enableWest(wall){
  wall ? w.disabled = false : w.disabled = true;
  console.log(wall);
}

var grid = function(x, y){
  var totalCells = x * y;
  cells = [];
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
  // [3,2]
  // [y,x] first value is y
  var visited = 1;

  while(visited < totalCells){
    var possible = [
        [currentCell[0]-1, currentCell[1], 0, 2], // we are checking if the y value of neighbor cell (top) is inside of the grid
        [currentCell[0], currentCell[1]+1, 1, 3], // check if x value of neighbor of cell (right) is inside the grid
        [currentCell[0]+1, currentCell[1], 2, 0], //checking y value of neighbor (below) current cell is in the grid
        [currentCell[0], currentCell[1]-1, 3, 1]
        //checking for the cell (left) of the current cell inside the grid
      ];
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

    if(neighbors.length){
        var next = neighbors[Math.floor(Math.random() * neighbors.length)];

        cells[currentCell[0]][currentCell[1]][next[2]] = 1;
        cells[next[0]][next[1]][next[3]] = 1;
        unvisited[next[0]][next[1]] = false;

        visited++;
        currentCell = [next[0], next[1]];
        path.push(currentCell);
    }
    else {
      currentCell = path.pop();
    }
  }

  // return cells;
  gridStart(cells, path);

}(8, 8);
//function(){} /***  ()   ****/; automatically runs the function witout needing to call it seperately

function gridStart(cells, path){
  gridBuilder(cells);

  thisCell = theCell(path[0]);
  exitCell = leaveCell(path[path.length -1]);

  checkWalls(cells);
}

function gridBuilder(cells){
  maze = document.createElement('table');
  tableHolder.appendChild(maze);
  // console.log(tableHolder);
  for(var i = 0; i < cells.length; i++){
    maze.insertRow(i);
    for(var j = 0; j < cells[i].length; j++){
      maze.firstChild.childNodes[i].insertCell(j);
      thisCell = maze.firstChild .childNodes[i].childNodes[j];

      for(var k = 0; k<4; k++){
        switch(k){
          case 0:
            cells[i][j][k] ?
            thisCell.classList.remove('bt') :
            thisCell.classList.add('bt');
            break;
          case 1:
            cells[i][j][k] ?
            thisCell.classList.remove('br') :
            thisCell.classList.add('br');
            break;
          case 2:
            cells[i][j][k] ?
            thisCell.classList.remove('bb') :
            thisCell.classList.add('bb');
            break;
          case 3:
            cells[i][j][k] ?
            thisCell.classList.remove('bl') :
            thisCell.classList.add('bl');
            break;
        }
      }
    }
  }
}

function theCell(cell){
  maze.firstChild.childNodes[cell[0]].childNodes[cell[1]].classList.add('active');
  return cell;
}

function leaveCell(cell){
  maze.firstChild.childNodes[cell[0]].childNodes[cell[1]].classList.add('exit');
  return cell;
}

function checkWalls(cells){
  // console.log(thisCell);
  // console.log(grid);
  var walls = cells[thisCell[0]][thisCell[1]];
  // console.log(walls)
  for(var i = 0; i < 4; i++){
    switch(i){
      case 0:
        enableNorth(walls[i]);
        break;
      case 1:
        enableEast(walls[i]);
        break;
      case 2:
        enableSouth(walls[i]);
        break;
      case 3:
        enableWest(walls[i]);
        break;
    }
  }
}
/*
var table = document.getElementById('table');
var form = document.createElement('form');

var label1 = document.createElement('label');
label1.textContent = "Your Name";
label1.setAttribute('for', 'name');
var input1 = document.createElement('input');
// assign attribute type to equal text
input1.type = 'text';
// assign attribute id to equal name
input1.id = 'name';
input1.placeholder = "Your Name Here";

var label2 = document.createElement('label');
// add textContent for label2 text = your email
label2.textContent = "Your Email";
// assign attribute for to equal email
label2.setAttribute('for', 'email');
var input2 = document.createElement('input');
// assign attr id === email
input2.id = 'Email';
// assign adder type === email
input2.type = 'Email';
// assign placeholder === your email here
input2.placeholder = 'Your Email Here';
var submit = document.createElement('input');
// assign attr id === submit
submit.id = 'submit';
// assign attr type === submit
submit.type = 'submit';
// assign attr value === Submit your answer
submit.value = 'Submit';


label1.appendChild(input1);
label2.appendChild(input2);
form.appendChild(label1);
form.appendChild(label2);
form.appendChild(submit);

// append input2 to label2 && label2 to form
table.appendChild(form);

var formI1 = document.getElementById('name');
var formI2 = document.getElementById('email');
var formBtn = document.getElementById('submit');

// add event listener to ??
// concat values from formI1 + formI2
// alert result
formBtn.addEventListener('click', function(e){
  // e.preventDefault();
  alert(formI1.value + ":" + formI2.value);
});
*/
// or

/*
submit.addEventListener('click', function(){
  alert(input1.value + ":" + input2.value);
});
*/
