//Global Variables ====================================================================
//Authorization key
var apiKey = "d3de3d59457b4ba89c9eeaa9d7876f70";

//Search Parameters ====================================================================

var queryTerm = "";
var numResults = 0;
var startYear = 0;
var endYear = 0;

//URL Base ====================================================================

var queryURLBase = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=" + apiKey;

//Variable to track number of articles
var articleCounter = 0;
 
//Functions ====================================================================
function runQuery(numArticles, queryURL) { 
    //AJAX function
    $.ajax({
        url: queryURL, 
        method: "GET"
    }).done(function(NYTData) {

        //function to clear out search
        $("#wellSection").empty();

        //Logging to console to check if information is being pulled
        //Checking to see my base url is correct
        console.log(queryURL);
        //Creating a separator
        console.log("---------------------");
        //Logging # of articles in #retrieve
        console.log(numArticles);
        //Additional separator
        console.log("---------------------");
        //Logging Api data
        console.log(NYTData);

        //Logging headline, publishing date, and author via "for loop"
        for (var i = 0; i<numArticles; i++) {
            console.log(NYTData.response.docs[i].headline.main);
            console.log(NYTData.response.docs[i].section_name);
            console.log(NYTData.response.docs[i].pub_date);
            console.log(NYTData.response.docs[i].byline.original);
            console.log(NYTData.response.docs[i].web_url);

        //Storing data in a container called "wellSection"
        var wellSection = $("<div>");
        wellSection.addClass("well");
        wellSection.attr("id", "articleWell-" + i);
        $("#wellSection").append(wellSection);

        // Conditionals for getting rid of "undefined"
        if (NYTData.response.docs[i].headline != null) {
            console.log(NYTData.response.docs[i].headline.main);
            $("#articleWell-" + i).append("<h4>" + NYTData.response.docs[i].headline.main + "</h4>");
        }

        if (NYTData.response.docs[i].byline && NYTData.response.docs[i].byline.hasOwnProperty("original")) {
            console.log(NYTData.response.docs[i].byline.original);
            $("#articleWell-" + i).append("<h5>" + NYTData.response.docs[i].byline.original + "</h5>");
        }

        //Appending above data to HTML
        $("#articleWell-" + i).append("<h5>" + NYTData.response.docs[i].section_name + "</h5>");
        $("#articleWell-" + i).append("<h5>" + NYTData.response.docs[i].pub_date + "</h5>");
        $("#articleWell-" + i).append("<a href=" + NYTData.response.docs[i].web_url + ">" + NYTData.response.docs[i].web_url + "</a>");
        }
    });
}
 
$("#search-button").on("click", function() {

    //Get search term
    var queryTerm = $("#search-term").val().trim();
    
    //This adds the value of the search term to the URL
    var newURL = queryURLBase + "&q=" + queryTerm;

    //This retrieves the number of articles available
    numResults = $("#retrieve").val();

    //This, added to the URL, gets the start year and end year
    //startYear isn't working in the final product
    startYear = $("#start-year").val().trim();
    endYear = $("#end-year").val().trim();
       
    if (parseInt(startYear)) {
        startYear = startYear + "0101";
        newURL = newURL + "&begin_date=" + startYear;
    }

    if (parseInt(endYear)) {
        endYear = endYear + "0101";
        newURL = newURL + "&end_date=" + endYear;
    }
    
    runQuery(numResults, newURL); 
   return false; 
});
 

//Step Breakdown ====================================================================
// 1. Retrieve user input and convert variables
// 2. Use those variables to run an AJAX call to tje New York Times
// 3. Break down the NYT object into useable fields.
// 4. Dynamically generate html content
// 5. Deal with "bugs"