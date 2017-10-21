
var apiKey = "9zBzMAEzPUHzeutAzBsUPJHSJrsAQelh";
var query; //required, search query term or phrase
var limit; // max records to return
var offset = 0; //offset val
var rating = "G";
var lang = "en";

var queryURL = "https://api.giphy.com/v1/gifs/search"

var animalArray = ["Elephant", "Flying Squirrel", "Baboon", "Aardvark", "Buffalo",
                    "Gecko", "Squid", "Mongoose", "Cow"];

function addButton(newAnimal) {
    var animalButton = $("<button>");
    animalButton.addClass("animal-button");
    animalButton.html(newAnimal);
    $(".button-container").append(animalButton);
    $("#animal-input").empty();
}

$(document).ready(function(){
    
    for (var i = 0; i < animalArray.length; i++) {
        addButton(animalArray[i]);
    }

    $("#animal-submit").on("click", function(event) {
        event.preventDefault();
        var animal = $("#animal-input");
        addButton(animal.val().trim());
        animal.val('');
    });

    $(document).on("click", ".animal-button", function(event) {
        event.preventDefault();
        query = event.target.textContent;
        limit = 10;
        queryURL += '?' + $.param({
              'api_key': apiKey,
              'q': query,
              'limit': limit,
              'offset': offset,
              'rating': rating,
              'lang': lang
            });

        $.ajax({
            url: queryURL,
            method: "GET"
        }).done(function(result) {

            var resultArray = result.data;
            var resultContainer = $("<div>");
            resultContainer.addClass("result");

            for (var i = 0; i < resultArray.length; i++) {
                
                var addGif = $("<img>");
                addGif.addClass("animal-gif");
                addGif.attr("src", resultArray[i].images.fixed_width_still.url);
                addGif.attr("data-still", resultArray[i].images.fixed_width_still.url);
                addGif.attr("data-animate", resultArray[i].images.fixed_width.url);
                addGif.attr("data-state", "still");
                
                resultContainer.append(addGif);
            }

            $(".gif-container").html(resultContainer);

        }).fail(function(err) {
            throw err;
        });

    });

    $(document).on("click", ".animal-gif", function(event) {

        var state = $(this).attr("data-state");

        if (state === "still") {
          $(this).attr("src", $(this).attr("data-animate"));
          $(this).attr("data-state", "animate");
        }
        else {
          $(this).attr("src", $(this).attr("data-still"));
          $(this).attr("data-state", "still");
        }

    });

});