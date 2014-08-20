/* 
1. Create a JS object with the grid
2. Render the grid from the object
3. Capture click event and add character to object and grid where user has clicked. Make the character alternate between X and O
4. Build three functions: 
	checkRow() which checks if a row is complete, then determines if someone has won
	checkColumn() which is the same as checkRow, but for a column 
	checkDiagonal() which is the same as checkRow, but for a diagonal
5. Call two or three of these functions depending on where character is placed
*/

var gridObj = {
	0 : ["","",""],
	1 : ["","",""],
	2 : ["","",""]
}

var XOchar = "X";

var gameOver = false;

// This function renders the content of the cells in the grid based 
// on the grid object passed in
function render (grid) {
	var count = 0;
	for (var row in gridObj) {
		var rowArray = gridObj[row];
		for (i=0; i<rowArray.length; i++) {
			divId = '#' + count + i;	
			$(divId).text(rowArray[i]);
		}
		count++;
	}
}


// This function is called when a player clicks a cell in the grid.
// It checks if there is an existing character. If not, it adds the character to the grid object
// renders the grid and changes the header message.
function placeXO (cellID) {
	var cellIDarr = cellID.split("");
	var gridRow = gridObj[cellIDarr[0]];

	if (gameOver === false) {
		// check that there isn't already a character at the location
		if (gridRow[cellIDarr[1]] === "") {
			gridRow[cellIDarr[1]] = XOchar;
			render(gridObj);

			checkDiagonal(cellIDarr[0],cellIDarr[1]);

			// Check if that is the winning move
			if (checkWinner(cellIDarr[0],cellIDarr[1])===true) {
				if (XOchar === 'X') {
					$('#header').text("Player X is the winner!");
				}
				else { // XOchar === 'O'
					$('#header').text("Player O is the winner!");
				}	
				gameOver = true;
			}
			else {
				if (XOchar === 'X') {
					XOchar = 'O';
					$('#header').text("Player O's turn.");
				}
				else { // XOchar === 'O'
					XOchar = 'X';
					$('#header').text("Player X's turn.");
				}
			}
		}
		else { // there is an X or an O at the location		
			if (XOchar === 'X') {
				$('#header').text("There is a character already there. Player X's turn.");
			}
			else { // XOchar === 'O'
				$('#header').text("There is a character already there. Player O's turn.");
			}
		}
	}
}

function checkWinner (rowNum, colNum) {
	if (checkRow(rowNum) === true) {
		return true;
	}
	else if (checkColumn(colNum) === true) {
		return true;
	}
	else if (checkDiagonal() === true) {
		return true;
	}
	else {
		return false;
	}
}


// Checks to see if there are three matching characters in a specified row 
function checkRow (rowNum) {
	var gridRow = gridObj[rowNum];
	if ((gridRow[0] === gridRow[1]) && (gridRow[0] === gridRow[2])) {
		return true;
	}
	else {
		return false;
	}
}

// Checks to see if there are three matching characters in a specified column
function checkColumn (colNum) {
	var count = 0;
	var colArray = [];
	for (var row in gridObj) {
		var rowArray = gridObj[row];
		colArray[count] = rowArray[colNum];
		count++;
	}

	if ((colArray[0] === colArray[1]) && (colArray[0] === colArray[2])) {
		return true;
	}
	else {
		return false;
	}	
}

// Checks to see if there are three matching characters in the diagonals
function checkDiagonal () {

	if ((gridObj[0][0] === gridObj[1][1]) && (gridObj[0][0] === gridObj[2][2])) {
		if (gridObj[1][1] != "") {
			return true;
		}
		else {
			return false;
		}
	}
	else if ((gridObj[0][2] === gridObj[1][1]) && (gridObj[0][2] === gridObj[2][0])) {
		if (gridObj[1][1] != "") {
			return true;
		}
		else {
			return false;
		}
	}
	else {
		return false;
	}
}


$(document).ready(function() {
	render(gridObj);
	$('#board td').on('click', function () {
		placeXO($(this).attr('id'));
	});
})