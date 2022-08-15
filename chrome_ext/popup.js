// Initialize button with user's preferred color
//This code grabs the button from popup.html and requests the color value from storage. 
//It then applies the color as the background of the button. 
//Include a script tag to popup.js in popup.html.
// const script_src = "jquery/jquery-3.6.0.js";
// var writeJquery = document.getElementById("ratingsList");
// writeJquery.insertAdjacentHTML("beforebegin", '<script id="myChange" src=" ${script_src}" type="text/javascript"></script>');

// console.log("yo");
// var script = document.createElement('script');
// script.src = 'jquery/jquery-3.6.0.js';
// script.type = 'text/javascript';
// document.getElementsByTagName('head')[0].appendChild(script);
// console.log("here");

// jQuery(document).ready(function() {
//     jQuery('#changeColor').click(function() {
//         var els = document.getElementsByTagName("li");
//         var reviews = [];

//         // console.log($());
//         console.log("got in setPredictions test23; length" + els.length);

//         for(var i = 0; i < els.length; i++) {
//             var getLine = els[i].querySelector('div[class*="Comments__StyledComments"');
//             if(getLine != null) {
//                 console.log(getLine.firstChild.nodeValue);
//                 reviews.push(getLine.firstChild.nodeValue);
//             }
//         }

//         //Stringify converts a JS object or value to a JSON string that python can use
//         const s = JSON.stringify(reviews);
        
//         jQuery(document).ready(function() {
//             console.log('here');
//             window.alert('yo12');
//             jQuery.ajax({
//             url:"http://127.0.0.1:5000/test",
//             type:"POST",
//             contentType:"application/json",
//             data:JSON.stringify(s)});
//             });

//         for(var i = 0; i < els.length; i++) {
//             // els[i].innerHTML += "<div>Positive</div>";
//             var getLine = els[i].querySelector('[role*="img"]')
//             if(getLine != null) {
//                 els[i].insertAdjacentHTML("beforebegin", '<h2 id="insertedRealOrFake"><strong>Positive</strong></h2>')
//                 console.log("here");
//             }
//         }
//     });
// });


// console.log("here");

let PredictionButton = document.getElementById("PredictionButton");


PredictionButton.addEventListener("click", async () => {
    // console.log("Yo, why?");
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: setPredictions,
    });
});

function setPredictions() {

    // var writeJquery = document.getElementById("ratingsList");
    // writeJquery.insertAdjacentHTML("beforebegin", '<script type="text/javascript src="https://code.jquery.com/jquery-3.6.0.min.js"></script>');
    // // console.log(jQuery());

    
    var els = document.getElementsByTagName("li")
    var reviews = []

    // console.log($());
    // console.log("got in setPredictions test23; length" + els.length);

    for(var i = 0; i < els.length; i++) {
        var getLine = els[i].querySelector('div[class*="Comments__StyledComments"')
        if(getLine != null) {
            // console.log(getLine.firstChild.nodeValue);
            reviews.push(getLine.firstChild.nodeValue);
        }
    }

    //Stringify converts a JS object or value to a JSON string that python can use
    const s = JSON.stringify(reviews);
    sentiments = []
    
    $(document).ready(function() {
        // console.log('yo12');
        // window.alert('yo12');
        $.ajax({
            url:"http://127.0.0.1:5000/processOrSend",
            type:"POST",
            contentType:"application/json",
            data:JSON.stringify(s),

            success: function(response) {
                sentiments = JSON.parse(response);
                // console.log(sentiments);
                // console.log("ended AJAX");

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


