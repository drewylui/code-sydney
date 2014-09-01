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

/*
	Defines attributes for and binds events to a cell in the grid
	TODO: move functions into cell prototype
	TODO: Investigate the JQuery data method to bind data to a DOM element
	TODO: Investigate filter and map
*/
function Cell(cellDiv, xcoord, ycoord) {
	
	this.x = xcoord;
	this.y = ycoord;
	this.bomb = false;
	this.flag = false;
	this.show = false;
	this.div = cellDiv;

	var cell = this; // set the scope to the cell, not the document

	// prevent the right-click from showing the context menu
	this.div.on('contextmenu', function(event) {
		event.preventDefault();
	})

	this.div.on('mouseup',function(event){
		console.log(String(cell.x) + ',' + String(cell.y));
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

/*
	Place bombs at random locations by setting the bomb attribute of the relevant cells
	TODO: Need to make sure that you don't place a bomb in the same cell more than once.
*/
function placeBombs (rows, cols, numBombs) {

	for (i=0; i<numBombs; i++) {		

		var bombCoordX = Math.floor(Math.random()*cols);
		var bombCoordY = Math.floor(Math.random()*rows);

		gridArray[bombCoordY][bombCoordX].bomb = true;
		// debug
		console.log('Bomb at:' + gridArray[bombCoordY][bombCoordX].x + ',' + gridArray[bombCoordY][bombCoordX].y);

	}
}

/*
	Build the divs and arrays of Cells to make the grid
*/
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
	for (i=0; i < neighbours.length; i++) {		
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
	// if the cell hasn't already been flagged, reveal it
	if (cellObj.flag === false) {
		if (cellObj.bomb === false) {
			cellObj.div.css('background-color','white');
			cellObj.show = true;

			var neighbours = getNeighbours(cellObj.x,cellObj.y);
			for (index in neighbours) {
				console.log('coords: ' + neighbours[index].x + ',' + neighbours[index].y);
				// do stuff to the cells at each coords
			}

		}
		else {
			cellObj.div.css('background-color','red');
			alert('bomb! you lose!');
		}
	}
	// else do nothing
}

/* 
	On page load, build the grid and place bombs
*/
$(document).ready(function() {

	buildGrid(numRows,numCols);
	placeBombs(numRows,numCols,numBombs);	

})

