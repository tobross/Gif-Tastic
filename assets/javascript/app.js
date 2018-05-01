      // Initial array of gifs
      var topics = ["Dragon", "Jester", "Dwarves", "LotR", "Mashup"];
      $("#gifs-view").on("click", ".gif-btn", function() {
        var giffy = $(this).attr("gifName");
        console.log(giffy);
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
          giffy + "&api_key=dc6zaTOxFJmzC&limit=10";
        console.log(queryURL);
        $.ajax({
          url: queryURL,
          method: "GET"
        }).then(function (response) {
          var results = response.data;
          for (var i = 0; i < results.length; i++) {
          var gifDiv = $("<div class='gif'>");
          var rating = results[i].rating;
          var ratingLine = $("<p>").text("Rating : " + rating);
          var movingPic = results[i].images.fixed_height.url;
          var stoppedPic = results[i].images.fixed_height_still.url;
          var gifStats = $("<img>");
          gifStats.attr("data-state", "animate");
          gifStats.attr("class", "gif");
          gifStats.attr("src", movingPic);
          gifStats.attr("data-still", stoppedPic);
          gifStats.attr("data-animate", movingPic);
          gifStats.attr("alt", "You are missing out on gifs!");
          $("#gifs-collection").prepend(gifStats, ratingLine);
          }
        })
      });
    $(document).on("click", ".gif", function() {
      console.log("ive been clicked");
      // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
      var state = $(this).attr("data-state");
      // If the clicked image's state is still, update its src attribute to what its data-animate value is.
      // Then, set the image's data-state to animate
      // Else set src to the data-still value
      var animate = $(this).attr("data-animate");
      var still = $(this).attr("data-still");
      if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
        console.log("whoo"); 
      } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
        console.log($(this).attr("src"));
      }
    });

      // Function for displaying gif buttons
      function renderButtons() {
        $("#gifs-view").empty();
        for (var i = 0; i < topics.length; i++) {
          var a = $("<button>");
          a.addClass("gif-btn");
          a.attr("gifName", topics[i]);
          a.text(topics[i]);
          $("#gifs-view").append(a);
        }
      }
      // function for adding new buttons.
      $("#add-gif").on("click", function (event) {
        event.preventDefault();
        var gif = $("#gif-input").val().trim();
        topics.push(gif);
        renderButtons();
      });
      renderButtons();