var animals = [];
var results;
var animalDiv;


// displayanimalInfo function re-renders the HTML to display the appropriate content
function displayanimalInfo() {
  var animal = $(this).attr("data-name");
  var queryURL =
    "https://api.giphy.com/v1/gifs/search?q=" +
    animal +
    "&api_key=5WDrhuuHx2YgYEscJfpkNZ27D4v1Vw7m&limit=10";

  // Creating an AJAX call for the specific animal button being clicked
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    // Creating a div to hold the animal
    console.log(response);
    results = response.data;
    for (var i = 0; i < results.length; i++) {
      animalDiv = $("<div class='animal'>");

      // Storing the rating data
      var rating = results[i].rating;

      // // Creating an element to have the rating displayed
      var pOne = $("<p>").text("Rating: " + rating);

      // // Displaying the rating
      animalDiv.append(pOne);

      // Retrieving the URL for the image
      var imgURL = results[i].images.fixed_width_still.url;

      // Creating an element to hold the image
      var image = $("<img>").attr("src", imgURL);
      image.attr("id", i);
      image.attr("gif", false);

      // Appending the image
      animalDiv.append(image);

      $("#animals-view").prepend(animalDiv);
      console.log("DEBUG >>>" + response);
    }

    $("img").on("click", function() {
    
      // console.log(" DEBUG>>>clicked");
      // console.log(this.id);
      
      
        showGif(this.id);
      
     
      
        // var imgURLgif = results[i].images.fixed_width.url;
        //  imagegif = $("<img>").attr("src", imgURLgif);
        // animalDiv.append(imagegif);
        // $("#animals-view").prepend(animalDiv);
      
    });


    //  $("img").on("click", function() {
    //   switchGif(this.id);
    // });




  });
}
var gifNotRunning = true;
function showGif(id){
  var imgURLgif = results[id].images.fixed_width.url;
  var imgURL = results[id].images.fixed_width_still.url;
  var thisImg = $("#"+id);
  console.log(thisImg.attr("gif"));
  
  if (gifNotRunning){
    gifNotRunning = false;
    thisImg.attr("src", imgURLgif);
  }else{
    gifNotRunning = true;
    thisImg.attr("src", imgURL);
  }
        //  imagegif = $("<img>").attr("src", imgURLgif);
        // animalDiv.append(imagegif);
};

//how about if the gif is playing
//you click on it and it switches back to 
//static image?


function switchGif(id){
  var imgURL = results[id].images.fixed_width_still.url;
  var thisImg = $("#"+id);
  thisImg.attr("gif", false);
  thisImg.attr("src", imgURL);

};



// Function for displaying animal data
function renderButtons() {
  // Deleting the animals prior to adding new animals
  // (this is necessary otherwise you will have repeat buttons)
  $("#buttons-view").empty();

  // Looping through the array of animals
  for (var i = 0; i < animals.length; i++) {
    // Then dynamicaly generating buttons for each animal in the array
    // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
    var a = $("<button>");
    // Adding a class of animal-btn to our button
    a.addClass("animal-btn");
    // Adding a data-attribute
    a.attr("data-name", animals[i]);
    // Providing the initial button text
    a.text(animals[i]);
    // Adding the button to the buttons-view div
    $("#buttons-view").append(a);
  }
}

// This function handles events where a animal button is clicked
$("#add-animal").on("click", function(event) {
  event.preventDefault();
  // This line grabs the input from the textbox
  var animal = $("#animal-input")
    .val()
    .trim();

  // Adding animal from the textbox to our array
  animals.push(animal);

  // Calling renderButtons which handles the processing of our animal array
  renderButtons();
});

// Adding a click event listener to all elements with a class of "animal-btn"
$(document).on("click", ".animal-btn", displayanimalInfo);

// Calling the renderButtons function to display the intial buttons
renderButtons();

//on click js checks the id of the image
//uses the id to look for the index in the gifAnimals array
//then, change the img src to that of the gifAnimals array
