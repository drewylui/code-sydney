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

function render (grid) {
	var count = 0;
	for (var row in gridObj) {
		rowArray = gridObj[row];
		for (i=0; i<rowArray.length; i++) {
			divId = '#' + count + i;	
			$(divId).text(rowArray[i]);
		}
		count++;
	}


}

function placeXO (cellID) {
	console.log(cellID);
	cellIDarr = cellID.split("");
	gridRow = gridObj[cellIDarr[0]];

	// check that there isn't already a character at the location
	if (gridRow[cellIDarr[1]] === "") {
		gridRow[cellIDarr[1]] = XOchar;
		render(gridObj);

		if (XOchar === 'X') {
			XOchar = 'O';
			$('#header').text("Player O's turn.");
		}
		else { // XOchar === 'O'
			XOchar = 'X';
			$('#header').text("Player X's turn.");
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

$(document).ready(function() {
	render(gridObj);
	$('#board td').on('click', function () {
		placeXO($(this).attr('id'));
	});
})