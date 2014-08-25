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
var gridArray;

function Cell(cellDiv, xcoord, ycoord) {
	
	this.x = xcoord;
	this.y = ycoord;
	return this;
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
})

