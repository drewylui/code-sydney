/*
Stage 1: Build a set of divs for each image, style the divs
Stage 2: Hide all images and show one at a time
Stage 3: Implement left/right controls
Stage 4: Build a set of 'circle' controls for each image div that can be clicked to show the div
Stage 5: Implement settimeout to automatically show images
Extra
Stage 6: Read an image file from directory, create a div referencing the image. See http://jqfaq.com/how-to-load-all-files-from-directory-using-jquery/
Stage 7: Read all image files from directory, build a set of divs referencing the images, style the divs

*/

var path = 'images/';

var imageSet = {
	image1: 'choc1.jpeg',
	image2: 'choc2.jpeg',
	image3: 'choc3.jpeg',
	image4: 'choc4.jpeg',
	image5: 'choc5.jpeg',
};

var imageCount;
var imageIndex;

var timeoutId;
var slideshowSpeed = 2000;
var fadeInSpeed = 1000;

// Build a set of hidden divs for each image in the object that is passed in.
function buildCarousel (images) {
	var divStr;

	imageCount = 0;
	for (var image in images) {
		divStr = "<div class='images' id='pic" + imageCount + "' style='display:none'><img src='" + path + images[image] + "'></div>"
		console.log(divStr);
		$('#carousel-frame').append(divStr);
		imageCount++;
	}
	
	$('#pic0').show(); // show the first image
	imageIndex = 0; // set the index to 0, as the first image is shown

	buildControls(); // Build the arrows and dot controls for the carousel
}

// Builds a set of divs to control the display of the images, including prev next arrows and dots for each image
function buildControls () {
	var divStr;

	$('#carousel-controls').append("<div id='prev' class='arrows'><img src='grey-arrow-left.png' class='buttons'></bu>");

	for (i=0; i<imageCount; i++) {
		divStr = "<div class='dots' id='dot" + i + "'></div>"
		$('#carousel-controls').append(divStr);
	}

	$('#carousel-controls').append("<div id='next' class='arrows'><img src='grey-arrow-right.png' class='buttons'></div>");

	$('#dot0').css('background-color','white');

}

// Show the image at the index that is passed in. Hide all other images.
function showImage(index) {
	var count = 0;
	$('.images').each(function() {
		if (count === index) {
			$(this).fadeIn(fadeInSpeed);
		}
		else {
			$(this).hide();
		}
		count++;
	});

	highlightDot(index);
}

// Show the image at the index that is passed in. Hide all other images.
function highlightDot(index) {
	var count = 0;
	$('.dots').each(function() {
		if (count === index) {
			$(this).css('background-color','white');
		}
		else {
			$(this).css('background-color','grey');
		}
		count++;
	});
}

// Shows the previous or next image by calling the appropriate function, depending on which arrow was clicked
function prevnextImage(div) {
	if ($(div).attr('id') === 'prev') {
		prevImage();
	}
	else if ($(div).attr('id') === 'next') {
		nextImage();
	}
	else {
		console.log ("Can't identify prev/next div");
	}
}

// Shows the previous image
function prevImage() {
	if (imageIndex === 0) {
		imageIndex = imageCount-1;
	}
	else {
		imageIndex--;
	}
	showImage(imageIndex);
}

// Shows the next image
function nextImage() {
	if (imageIndex === (imageCount-1)) {
		imageIndex = 0;
	}
	else {
		imageIndex++;
	}
	showImage(imageIndex);
}

// start a slideshow that shows images in sequence
function slideshow () {
	timeoutId = setTimeout(function (){
		nextImage();
		slideshow();
	}, slideshowSpeed) 
} 

// Main function
$(document).ready(function(){

	// build the page
	buildCarousel(imageSet); 

	// add event listener for arrows
	$('.arrows').on('click',function() {
		prevnextImage(this);
	});

	$('.dots').on('click',function() {
		imageIndex = Number(($(this).attr('id')).substr(3));
		showImage(imageIndex);
	});	

	// change mouse icon on hover over buttons
	$('.buttons, .dots').hover(function() {
		$(this).css('cursor','pointer');
	});

	$("html").on('keydown',function(event) {	
		if (event.keyCode===27) {
			clearTimeout(timeoutId);
		}
	});	

	slideshow();

})






