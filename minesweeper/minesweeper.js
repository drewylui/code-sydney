var numRows = 9;
var numCols = 9;
var numBombs = 10;
var gridArray;
var bombsArray = [];
var flagCount = 0;
var moveCount = 0;
var gameOverFlag = false;

/*
	Defines attributes for and binds events to a cell in the grid
*/
function Cell(cellDiv, xcoord, ycoord) {
	
	this.x = xcoord;
	this.y = ycoord;
	this.bomb = false;
	this.flag = false;
	this.show = false;
	this.div = cellDiv;
	this.bombCount = 0;

	var cell = this; // maintain reference to current object

	// prevent the right-click from showing the context menu
	this.div.on('contextmenu', function(event) {
		event.preventDefault();
	})

	this.div.on('mouseup',function(event){		

		// increase the move count if the cell is not revealed or flagged
		if ((cell.show === false) && (cell.flag === false)) {
			moveCount++;
		}

		// reveal or flag cell based on left-click or right-click respectively
		if (event.button === 0) {
			reveal(cell);
		}
		else if (event.button === 2) {
			// if the cell hasn't already been revealed, flag/unflag it
			if (cell.show === false) { 					
				if (cell.flag === true) {				
					cell.flag = false;
					cell.div.css('background-color','#DEDEDE');
				} 
				else {
					cell.flag = true;
					cell.div.css('background-color','blue');
					flagCount++;
					if (checkVictory()) {
						$('#instructions').text('Congratulations! You win!');
						$('#instructions').css('color','blue');
						$('.cell').unbind();
						gameOverFlag = true;
					}
				}
			}
			// else do nothing
		}
		else {
			console.log ('Error: invalid button code');
		}

		// update move count and the score shown to player, if the game has not ended
		if (!gameOverFlag) {
			$('#instructions').html('Total bombs: ' + numBombs + '<br/> Flags placed: ' + flagCount + ' Moves made: ' + moveCount);			
		}

	});

	return this;

}

/*
	Build the divs and arrays of Cells to make the grid
	Reference the grid like this: gridArray[y coord][x coord]
*/
function buildGrid (rows, cols) {
	
	gridArray = new Array(rows);

	for (var y=0; y<rows; y++) {

		// Append row divs to grid div
		var rowDiv = $('<div>').addClass('row');
		$('#grid').append(rowDiv);
		// Build an empty array for the row
		var rowArray = new Array(cols);

		for (var x=0; x<cols; x++) {
			// Append cell divs to the row div
			var cellDiv = $('<div>').addClass('cell');
			$(rowDiv).append(cellDiv);
			// Add the cell object to the row array
			var cell = new Cell (cellDiv,x,y);			
			rowArray[x] = cell;
		}		
		// Add the row array to the grid array
		gridArray[y] = rowArray;
	}
}

/* 
	Gets the cell at the specified coordinates in the grid
*/
function getCell (x,y) {
	return gridArray[y][x];
}

/*
	Place bombs at random locations by setting the bomb attribute of the relevant cells
*/
function placeBombs (rows, cols, numBombs) {

	for (var i=0; i<numBombs; i++) {					
		var bombCoordX = Math.floor(Math.random()*cols);
		var bombCoordY = Math.floor(Math.random()*rows);

		var cell = getCell(bombCoordX,bombCoordY);

		// Place bomb, unless there is already a bomb at the cell
		if (cell.bomb != true) {
			cell.bomb = true;			
			updateNeighbourBombCounts(cell.x,cell.y);
			bombsArray.push(cell);
		}
		else {
			// don't increment the bomb count if a bomb was not placed
			i--;
		}
	}
}

// increments the bomb count of all neighbouring cells
function updateNeighbourBombCounts(x,y) {
	var neighbours = getNeighbours(x,y);
	for (var index in neighbours) {	
		var neighbourCell = getCell(neighbours[index].x,neighbours[index].y);
		neighbourCell.bombCount++;
	}
}

/*
	Get the array of all neighbours for x,y coordinates.
*/
function getNeighbours (x,y) {

	var neighbours = [ 
	    { x: x + 1, y: y },
	    { x: x + 1, y: y - 1 },
	    { x: x + 1, y: y + 1 },
	    { x: x, y: y + 1 },
	    { x: x, y: y - 1 },
	    { x: x - 1, y: y },
	    { x: x - 1, y: y + 1 },
	    { x: x - 1, y: y - 1 }
	  ];

	  var refinedNeighbours = [];

	// refine the array to only include neighbours inside the board
	for (var i=0; i < neighbours.length; i++) {		
		if ((neighbours[i].x >= 0) && (neighbours[i].x < numRows) && (neighbours[i].y >= 0) && (neighbours[i].y < numRows)) {
			refinedNeighbours.push(neighbours[i]);
		}
	}

	return refinedNeighbours;
}

/* 
	Reveals cell and neighbours
*/
function reveal (cellObj) {
	// if the cell hasn't already been revealed or flagged, reveal it
	if (cellObj.flag === false && cellObj.show != true) {
		
		if (cellObj.bomb === false) {
			// change the cell colour and show the number of neighbouring bombs in coloured text
			cellObj.div.css('background-color','white');
			cellObj.show = true;			
			switch (cellObj.bombCount) {
				case 0:
					break;
				case 1:
					cellObj.div.text(cellObj.bombCount);
					cellObj.div.css('color','blue');
					break;
				case 2:
					cellObj.div.text(cellObj.bombCount);
					cellObj.div.css('color','green');
					break;
				case 3:
					cellObj.div.text(cellObj.bombCount);
					cellObj.div.css('color','orange');
					break;
				case 4:
					cellObj.div.text(cellObj.bombCount);
					cellObj.div.css('color','red');
					break;
				default: 
					cellObj.div.text(cellObj.bombCount);
					cellObj.div.css('color','black');
			}

			// reveal neighbouring cells recursively if empty
			var neighbours = getNeighbours(cellObj.x,cellObj.y);
			for (var index in neighbours) {	
				var neighbourCell = getCell(neighbours[index].x,neighbours[index].y);				

				if (neighbourCell.bomb === false) {
					reveal (neighbourCell);
				}
				else {
					break;
				}
			}			
		}

		else {
			// if there is a bomb, end the game
			cellObj.div.text('B');
			cellObj.div.css('background-color','red');
			$('#instructions').text('BOMB! You lose!');
			$('#instructions').css('color','red');
			$('.cell').unbind();
			gameOverFlag = true;
		}
	}
	// else do nothing
}

/*
	If all bomb cells are flagged, return true. Otherwise, return false.	
*/
function checkVictory () {

	var victoryFlag = true;

	for (var i=0; i<bombsArray.length; i++) {
		if (bombsArray[i].flag === false) {
			victoryFlag = false;
		}
	}

	return victoryFlag;

}

/* 
	On page load, build the grid and place bombs
*/
$(document).ready(function() {

	buildGrid(numRows,numCols);
	placeBombs(numRows,numCols,numBombs);	

})

