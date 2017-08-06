
//array of things in nature
var somethingArray=["sunset","mountain","cloud","tree","snow","sea"];


//dispaying buttons in the array
function renderButtons(){
	//emptying button panel
	console.log(somethingArray);
	$("#buttonsPanel").empty();
	//looping through the array and dynamically creating a button to each element in the array
	for(var i = 0; i < somethingArray.length; i++){
		var button = $("<button>");
		button.addClass("somethingButton");
		button.attr("data-something",somethingArray[i]);
		button.text(somethingArray[i]);

		//add button to HTML
		$("#buttonPanel").append(button);
	}//end for loop
} //end renderButtons



//event handler for user to add more buttons
$("#add-something").on("click", function(event) {

	event.preventDefault();
	//get input from text box
	var somthing = $("#something-input").val().trim();
	//adding the text to the array in order to creat the button 
	somethingArray.push(somthing);
	$("#somthing-input").val("");

	renderButtons();

}); //end function(event)



//fetching gifs from api
function fetchSomethingGifs() {
  //get element from array when button is clicked 
  var somethingName = $(this).attr("data-something");
  var somethingStr = somethingName.split(" ").join("+");	
  
  var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=039e302706e04dc9935175cd77b88df2&q=" + somethingStr + "&limit=25&offset=0&rating=G&lang=en";
  // make AJAX call giphy api
  $.ajax({
    method: "GET",
    url: queryURL,
  }).done(function( results ) {
  	//get results from array
  	var dataArray = results.data;
  	//creat and display div elements for each one of the returned Gifs
  	$("#gifCol").empty();
    for (var i = 0; i < dataArray.length; i++) {

    	var newDiv = $("<div>");
      	newDiv.addClass("somethingGif");

      	var newRating = $("<h2>").html("Rating: " + dataArray[i].rating);
     	newDiv.append(newRating);

     	var img = $("<img>");
     	 img.attr("src", dataArray[i].images.fixed_height_still.url);
      	 img.attr("data-still", dataArray[i].images.fixed_height_still.url);
     	 img.attr("data-animate", dataArray[i].images.fixed_height.url);
     	 img.attr("data-state", "still");
     	 newDiv.append(img);

      // display ne gifs on the top 
      $("#gifCol").append(newDiv);
    }//end for loop

  });//end function result

}//end fetchSomethingGifs

//animate still gifs and vice versa
function animateGifs() {
  
  var state = $(this).find("img").attr("data-state");

  if (state === "still") 
  {
    $(this).find("img").attr("src", $(this).find("img").attr("data-animate"));
    $(this).find("img").attr("data-state", "animate");
  } 
  else 
  {
    $(this).find("img").attr("src", $(this).find("img").attr("data-still"));
    $(this).find("img").attr("data-state", "still");
  }

}//end animatGifs

$(document).ready(function() {
  renderButtons();
});
//event handler to fetch gifs
$(document).on("click", ".somethingButton", fetchSomethingGifs);
//event handler to animate and stop gifs
$(document).on("click", ".somethingGif", animateGifs);