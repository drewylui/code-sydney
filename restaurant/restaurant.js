// Set up data
var homeTabContent = {
	header: "About",
	tagline: "Blancharu is a fusion Japanese French restaurant that serves the most delicious food!",
	body: "Bacon ipsum dolor sit amet meatloaf swine shankle pig pastrami fatback. Venison leberkas jowl short ribs, shankle spare ribs sirloin swine beef ribs beef sausage flank. Shank bresaola pork chop ball tip strip steak. Flank ribeye tenderloin doner hamburger boudin pancetta turkey pig pork bresaola. Turducken salami t-bone beef andouille pastrami ham, shoulder pork chop short ribs spare ribs jerky sirloin brisket. Rump doner ground round porchetta andouille boudin pork belly cow.",
	image: "<img width=600px height=400px src='http://static3.artspan.com/member/lindarettichdesign/500/2004810.jpg' />"
}; 
var menuTabContent = {
	header: "Menu",
	tagline: "Check out our seasonal menu below",
	body: "Jujubes candy marshmallow bear claw fruitcake halvah topping donut. Apple pie cake sweet roll tootsie roll candy canes liquorice. Danish sweet roll croissant chupa chups. Fruitcake toffee croissant dessert toffee. Caramels jelly-o fruitcake chupa chups icing bear claw. Bonbon dessert wafer lemon drops jelly. Jelly pie chupa chups. Gingerbread danish danish carrot cake caramels gummi bears tootsie roll. Apple pie sugar plum gummies. Lemon drops tiramisu lemon drops macaroon dragée soufflé. Cupcake jelly apple pie gummi bears icing applicake oat cake lemon drops danish. Sesame snaps danish pudding. Brownie bonbon gummies wafer candy.",
	image: "<img width=600px height=400px src='http://3.bp.blogspot.com/_-pGw8tyU1lY/TGvQA4Z20PI/AAAAAAAABt0/R-GjuTWWU6s/s1600/Picnik+collage.jpg' />"
}; 
var contactTabContent = {
	header: "Contact",
	tagline: "Contact us. Details are below.",
	body: "Portland small batch retro, sartorial Neutra messenger bag McSweeney's Banksy polaroid forage DIY. Gluten-free try-hard four loko, asymmetrical jean shorts PBR&B kale chips actually gastropub. Fap mumblecore fixie Pitchfork, ugh actually you probably haven't heard of them plaid wolf next level disrupt put a bird on it. Forage chillwave roof party, kitsch shabby chic Pitchfork Echo Park next level church-key fap gentrify. Fashion axe ugh semiotics VHS, Carles hashtag Thundercats photo booth put a bird on it art party brunch iPhone 3 wolf moon. XOXO pug 3 wolf moon, narwhal blog farm-to-table actually Schlitz direct trade Odd Future. Disrupt actually fixie sartorial Marfa pop-up, synth mixtape letterpress pickled fingerstache pour-over VHS.",
	image: "<img width=600px height=400px src='http://media2.s-nbcnews.com/i/streams/2013/June/130625/6C8013400-g-cvr-121204-cell-phone-6a.jpg' />"
}; 
var tabContent = {
	home: homeTabContent,
	menu: menuTabContent,
	contact: contactTabContent
};



// Appends a set of divs to a specified parent div. All divs will be hidden except for the first one
// tabObj: object containing data for the tabs
// divClass: the class assigned for each new tab
// parentDivId: the div to append the divs to

function createTabs (tabObj, divClass, divId) {
	var tabLinks = "";
	var parentDivId = "#" + divId;

	$(parentDivId).append("<div id='intro'><div class='header'>Welcome to Blancharu</div><div class='body'>This is the website for the Blancharu restaurant.</div></div>");	
	$(parentDivId).append("<div id='tabheaderdiv'></div>");	
	$(parentDivId).append("<div id='bodydiv'></div>");	

	// create the tab links		
	for(var name in tabObj) { 
		var divID = "#" + name;
		var anchor = "#" + name;

		tabLinks = "<a class='tablink' href='" + anchor + "'>" + String(name).toUpperCase() + "</a>"
		$('#tabheaderdiv').append("<div class='tablinkdiv' id='" + name + "linkdiv" + "'>" + tabLinks + "</div>");		
    }    

	// create the tabs
	for(var name in tabObj) { 
		var divID = "#" + name;
		var contentObj = tabObj[name];
		// create the div for the tab
    	$('#bodydiv').append("<div class='" + divClass + "' id=" + name + "></div>");
    	// and populate the tab
    	populateTab(contentObj, divID); // add content to each tab   
    	
	}

	// hide all tabs except for the first one
	$(".tab").each(function(index) {
		divID = "#" + $(this).attr("id") + "linkdiv";
		if (index != 0) {
			$(this).hide();			
		}
		else {
			$(divID).css("background-color","#DDDDDD");
		}		
	})

    // add event handler to hide/show tabs on click
    $(".tablink").on('click', function () {
    	showTab($(this));
    	return false; // this is important! if you don't add this, the default behaviour of the click event is to navigate to the anchor (so you need to set the focus at the top of the page, making it jump around)
    })
}

// Parses a JS object to populate a tab with content, by appending elements to a specified parent div
function populateTab (contentObj, parentDivId) {
	for(var name in contentObj) {
    	$(parentDivId).append("<div class='" + name + "'> " + contentObj[name] + "</div>");	
	}
}

// Shows a tab and hides all other tabs
function showTab (element) {	
	$(".tab").each(function(index){
		tabClass = "#" + $(this).attr("id");
		divID = "#" + $(this).attr("id") + "linkdiv";

		console.log(divID);

		if ($(this).attr("id") === element.text().toLowerCase()) {
			$(this).fadeIn(1000);
			$(divID).css("background-color","#DDDDDD");
		}
		else {
			$(this).hide();
			$(divID).css("background-color","#555555");			
		}		
	})	
}


$(document).ready(function () {

	createTabs(tabContent,"tab","content");
	

})





