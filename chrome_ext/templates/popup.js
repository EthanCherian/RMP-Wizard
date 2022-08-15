// console.log("here");

let PredictionButton = document.getElementById("PredictionButton");


PredictionButton.addEventListener("click", async () => {
    // console.log("Yo, why?");
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    //executes setPredictions() using the ratemyprofessors tab
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: setPredictions,
    });
});

function setPredictions() {

    // var writeJquery = document.getElementById("ratingsList");
    // writeJquery.insertAdjacentHTML("beforebegin", '<script type="text/javascript src="https://code.jquery.com/jquery-3.6.0.min.js"></script>');
    // // console.log(jQuery());

    //all of the reviews we want are in the li tag
    var els = document.getElementsByTagName("li")
    var reviews = []

    // console.log($());
    // console.log("got in setPredictions test23; length" + els.length);

    for(var i = 0; i < els.length; i++) {
        //reviews are found after the "Comments_StyledComments ..." tag. Here, queryselector
        //partially matches it with Comments_StyledComments because there are other
        //random digits and letters after this string
        var getLine = els[i].querySelector('div[class*="Comments__StyledComments"')
        if(getLine != null) {
            // console.log(getLine.firstChild.nodeValue);
            reviews.push(getLine.firstChild.nodeValue);
        }
    }

    //Stringify converts a JS object or value to a JSON string that python can use
    const s = JSON.stringify(reviews);
    sentiments = []
    
    //where the magic happens. The ajax function from jquery sends data to
    //Python's flask server. The Python method called processAndSend will process
    //the data using the model built and sends the sentiment values back.
    //Make sure the python server is running while developing for it to work
    $(document).ready(function() {
        // console.log('yo12');
        // window.alert('yo12');
        $.ajax({
            url:"http://127.0.0.1:5000/processAndSend",
            type:"POST",
            contentType:"application/json",
            data:JSON.stringify(s),

            success: function(response) {
                sentiments = JSON.parse(response);
                // console.log(sentiments);
                // console.log("ended AJAX");

                //adds Positive or Negative for each review on the ratemyprofessor tab for now
                var sentimentsCounter = 0;
                for(var i = 0; i < els.length; i++) {
                    // els[i].innerHTML += "<div>Positive</div>";
                    var getLine = els[i].querySelector('[role*="img"]')
                    if(getLine != null) {
                        els[i].insertAdjacentHTML("beforebegin", '<h2 id="insertedRealOrFake"><strong>' + sentiments[sentimentsCounter++] + '</strong></h2>')
                        // console.log("here");
                    }
                    
                    // console.log(els[i].querySelector('[role*="img"]'));
                }
            }
            
        });
    });

    

    // $(document).ready(function() { $("div").css("border", "3px solid red"); });

}


