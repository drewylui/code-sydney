/*
Create a js object to represent a cell
Cell object needs:
	Array to represent neighbours
	Function to show cell and neighbours
	Function to mark
	Function to show bomb
Build a grid of cells
	Build an array of rows
	In each column of each row, place a cell
	For each cell, define its neighbours
*/
var numRows = 9;
var numCols = 9;
var numBombs = 5;
var gridArray;

function Cell(cellDiv, xcoord, ycoord) {
	
	this.x = xcoord;
	this.y = ycoord;
	this.bomb = false;
	this.flag = false;
	this.show = false;
	this.div = cellDiv;

	var cell = this; // set the scope to the cell, not the document

	this.div.on('contextmenu', function() {
		return false;
	})

	this.div.on('mouseup',function(event){
		console.log(String(cell.x) + ',' + String(cell.y));
		if (event.button === 0) {
			if (cell.flag === false) {
				if (cell.bomb === true) {
					cell.div.css('background-color','red');
					alert('bomb! you lose!');
				}
				else {
					cell.div.css('background-color','white');
					cell.show = true;
				}
			}
			// else do nothing
		}
		else if (event.button === 2) {
			if (cell.show === false) {
				if (cell.flag === true) {				
					cell.flag = false;
					cell.div.css('background-color','#DEDEDE');
				} 
				else {
					cell.flag = true;
					cell.div.css('background-color','blue');
				}
			}
			// else do nothing
		}
		else {
			console.log ('Error: invalid button code');
		}
	});

	return this;

}

function placeBombs (rows, cols, numBombs) {

	for (i=0; i<numBombs; i++) {
		
		var bombCoordX = Math.floor(Math.random()*cols);
		var bombCoordY = Math.floor(Math.random()*rows);

		gridArray[bombCoordY][bombCoordX].bomb = true;
		// debug
		console.log('Bomb at:' + gridArray[bombCoordY][bombCoordX].x + ',' + gridArray[bombCoordY][bombCoordX].y);

	}
}

function buildGrid (rows, cols) {
	
	gridArray = new Array(rows);

	for (y=0; y<rows; y++) {

		// Append row divs to grid div
		var rowDiv = $('<div>').addClass('row');
		$('#grid').append(rowDiv);
		// Build an empty array for the row
		var rowArray = new Array(cols);

		for (x=0; x<cols; x++) {
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



$(document).ready(function() {

	buildGrid(numRows,numCols);
	console.log(gridArray);
	placeBombs(numRows,numCols,numBombs);	
})

