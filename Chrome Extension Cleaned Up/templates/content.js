const redColor = 'rgb(255, 156, 156)';
const greenColor = 'rgb(127, 246, 195)';
const yellowColor = 'rgb(255, 241, 112)';
const blueColor = 'rgb(196, 223, 230)';

function loadRatingsInfo() {  
      
    $(document).ready(function() {
        //this is to make sure there isn't a graph that this function will
        //generate. Was used when button clicks triggered this function
        var checkSentiment = document.querySelector('div[class="insertPosNeg pos_neg_score"]');

        if(checkSentiment != null)
            return;

        //generates space for the graph on the website
        document.querySelector('ul[id="ratingsList"]').insertAdjacentHTML('beforebegin', '<div class="OurAnalysis analysis_specs"><b>Our Analysis</b></div>');
        document.querySelector('ul[id="ratingsList"]').insertAdjacentHTML('beforebegin', '<div class="chart_card"></div>');
        document.querySelector('div[class="chart_card"]').insertAdjacentHTML('beforeend', '<div class="chart_size"><canvas id="sentimentMultiBarBiGram"></canvas></div>');
        document.querySelector('div[class="chart_size"]').insertAdjacentHTML('afterend', '<div class="chart_size"><canvas id="setimentMultBarHist"></canvas></div>');
        document.querySelector('div[class="chart_size"]').insertAdjacentHTML('afterend', '<div class="chart_size"><canvas id="sentimentDoughnut"></canvas></div>');


   
        var getScripts = document.getElementsByTagName("script");
 
        var clientCall;

        for(var i = 0; i < getScripts.length; i++) {
            if(getScripts[i].innerHTML.indexOf("window.__RELAY_STORE__") !== -1) {
                clientCall = getScripts[i];
                break;
            }
        }

        //gets the unique ID for each professor that rate my professor assigns

        var getClientCallDetails = clientCall.innerHTML;
        var regexToGetID = /\}\},"(.*?)"/gm;
        var profID = regexToGetID.exec(getClientCallDetails)[1];
        var getData; 

        //Used to fetch all of the reviews for a professor from ratemyprofessor
        fetch('https://www.ratemyprofessors.com/graphql', {
            method: 'POST',
            body: JSON.stringify({
            'query': "query RatingsListQuery(\n  $count: Int!\n  $id: ID!\n  $courseFilter: String\n  $cursor: String\n) {\n  node(id: $id) {\n    __typename\n    ... on Teacher {\n      ...RatingsList_teacher_4pguUW\n    }\n    id\n  }\n}\n\nfragment RatingsList_teacher_4pguUW on Teacher {\n  id\n  legacyId\n  lastName\n  numRatings\n  school {\n    id\n    legacyId\n    name\n    city\n    state\n    avgRating\n    numRatings\n  }\n  ...Rating_teacher\n  ...NoRatingsArea_teacher\n  ratings(first: $count, after: $cursor, courseFilter: $courseFilter) {\n    edges {\n      cursor\n      node {\n        ...Rating_rating\n        id\n        __typename\n      }\n    }\n    pageInfo {\n      hasNextPage\n      endCursor\n    }\n  }\n}\n\nfragment Rating_teacher on Teacher {\n  ...RatingFooter_teacher\n  ...RatingSuperHeader_teacher\n  ...ProfessorNoteSection_teacher\n}\n\nfragment NoRatingsArea_teacher on Teacher {\n  lastName\n  ...RateTeacherLink_teacher\n}\n\nfragment Rating_rating on Rating {\n  comment\n  flagStatus\n  createdByUser\n  teacherNote {\n    id\n  }\n  ...RatingHeader_rating\n  ...RatingSuperHeader_rating\n  ...RatingValues_rating\n  ...CourseMeta_rating\n  ...RatingTags_rating\n  ...RatingFooter_rating\n  ...ProfessorNoteSection_rating\n}\n\nfragment RatingHeader_rating on Rating {\n  date\n  class\n  helpfulRating\n  clarityRating\n  isForOnlineClass\n}\n\nfragment RatingSuperHeader_rating on Rating {\n  legacyId\n}\n\nfragment RatingValues_rating on Rating {\n  helpfulRating\n  clarityRating\n  difficultyRating\n}\n\nfragment CourseMeta_rating on Rating {\n  attendanceMandatory\n  wouldTakeAgain\n  grade\n  textbookUse\n  isForOnlineClass\n  isForCredit\n}\n\nfragment RatingTags_rating on Rating {\n  ratingTags\n}\n\nfragment RatingFooter_rating on Rating {\n  id\n  comment\n  adminReviewedAt\n  flagStatus\n  legacyId\n  thumbsUpTotal\n  thumbsDownTotal\n  thumbs {\n    userId\n    thumbsUp\n    thumbsDown\n    id\n  }\n  teacherNote {\n    id\n  }\n}\n\nfragment ProfessorNoteSection_rating on Rating {\n  teacherNote {\n    ...ProfessorNote_note\n    id\n  }\n  ...ProfessorNoteEditor_rating\n}\n\nfragment ProfessorNote_note on TeacherNotes {\n  comment\n  ...ProfessorNoteHeader_note\n  ...ProfessorNoteFooter_note\n}\n\nfragment ProfessorNoteEditor_rating on Rating {\n  id\n  legacyId\n  class\n  teacherNote {\n    id\n    teacherId\n    comment\n  }\n}\n\nfragment ProfessorNoteHeader_note on TeacherNotes {\n  createdAt\n  updatedAt\n}\n\nfragment ProfessorNoteFooter_note on TeacherNotes {\n  legacyId\n  flagStatus\n}\n\nfragment RateTeacherLink_teacher on Teacher {\n  legacyId\n  numRatings\n  lockStatus\n}\n\nfragment RatingFooter_teacher on Teacher {\n  id\n  legacyId\n  lockStatus\n  isProfCurrentUser\n}\n\nfragment RatingSuperHeader_teacher on Teacher {\n  firstName\n  lastName\n  legacyId\n  school {\n    name\n    id\n  }\n}\n\nfragment ProfessorNoteSection_teacher on Teacher {\n  ...ProfessorNote_teacher\n  ...ProfessorNoteEditor_teacher\n}\n\nfragment ProfessorNote_teacher on Teacher {\n  ...ProfessorNoteHeader_teacher\n  ...ProfessorNoteFooter_teacher\n}\n\nfragment ProfessorNoteEditor_teacher on Teacher {\n  id\n}\n\nfragment ProfessorNoteHeader_teacher on Teacher {\n  lastName\n}\n\nfragment ProfessorNoteFooter_teacher on Teacher {\n  legacyId\n  isProfCurrentUser\n}\n",
            'variables': {
                        'count': -1,
                        'cursor': "",
                        'id': profID,
                        'courseFilter': null
                },
            
            }),
                headers: {'Accept-Language': 'en-US,en;q=0.9', 
                'Authorization': 'Basic dGVzdDp0ZXN0',  
                'Content-Type': 'application/json', }

        }).then(res => res.json()).then(data => getData = data).then(function(getData) {
                //this was determined by the post request ratemyprofessor made
                //to get info

                var nodes = getData.data.node.ratings.edges;
                

                //to sort the gathered data from the RMP database on this professor by date
                //in ascending order
                nodes.sort(function(a,b) {
                    return a.node.date.localeCompare(b.node.date);
                });

                var comments = [];

                for(var i = 0; i < nodes.length; i++) {
                    comments.push([nodes[i].node.comment, getData.data.node.firstName, getData.data.node.lastName]);
                }

                const c = JSON.stringify(comments);

                //where the magic happens. The ajax function from jquery sends data to
                //Python's flask server. The Python method called processAndSend will process
                //the data using the model built and sends the sentiment values back.
                //Make sure the python server is running while developing for it to work
                $.ajax({
                    url:"https://dnchow.pythonanywhere.com/processAndSend",
                    type:"POST",
                    contentType:"application/json",
                    data:JSON.stringify(c),
        
                    success: function(response) {
                        //sentiments is filled with either "Positive" or "Negative"
                        sentiments = JSON.parse(response);

                        //adds Positive or Negative for each review on the ratemyprofessor tab for now
                        var sentimentsCounter = 0;
                        var numYearsDisplay = 5;
                        var forConfRatings = document.querySelector('div[class*="RatingsFilterList__StyledRatingsFilterList"]');

                        var positives = 0;
                        var negatives = 0;
                        var unclear = 0;

                        var getDataByYear = [];
                        
                        //first row = Positives by year
                        //second row = Negatives by year
                        //Third row = Unclear by year
                        /*
                            Structure of getDataByYear
                                            (Max Year - Number of Years to Display)              Max Year
                            Positive    ->              0                           ...             0    
                            Negative    ->              0                           ...             0  
                            Unclear     ->              0                           ...             0

                            So, this is a 3 x (Number of Years to Display) matrix. It was structured this way
                            to make it easier to assign all of the types of reviews' frequency counts from each year
                            by utilizing row-major design of arrays. 

                        */
                        for (let i = 0; i < 3; i++) {
                          getDataByYear.push([]);
                          for (let j = 0; j < numYearsDisplay; j++) {
                            getDataByYear[i].push(0);
                          }
                        }

                        var maxYear = Number(nodes[nodes.length-1].node.date.substring(0,4));                        
                        var prevYear = maxYear;
                        var index = numYearsDisplay-1;
                        
                        //The loop starts from the end of the list that contains the latest
                        //review and goes backward. It stops once the current review's year
                        //is past the limit of years to display from the latest year.
                        for(var i = sentiments[0].length-1; i >= 0; i--) {
                            var thisYear = Number(nodes[i].node.date.substring(0,4));

                            
                            if(thisYear != prevYear) {
                                //to account for years that that do not have reviews
                                var diff = prevYear - thisYear;
                                index -= diff;
                                prevYear -= diff;
                            }

                            
                            var rating = nodes[i].node.clarityRating;

                            //If the rating is above 3.3 which indicates a positive review 
                            //(this was to inculde ratings before 2016 that had decimal reviews),
                            if(rating > 3.3) {
                                //If the model conflicts with the quality rating, then unclear is ticked
                                if(sentiments[0][i] == 'Negative') {
                                    //should only update this if the index falls in the range
                                    //of maxYear and maxYear - maxYearsToDisplay. This is for the 
                                    //time series chart.
                                    if(index >= 0)
                                        getDataByYear[2][index] += 1;
                                    
                                    unclear++;
                                }
                                //If the model agrees, then it adds one to the positives counter
                                else {
                                    if(index >= 0)
                                        getDataByYear[0][index] += 1;
                                    positives++;
                                }
                                
                            } 
                            //If the quality rating is within 2.7 <= x <= 3.3, then
                            //unclear is appended by one due to the nature of these types
                            //of reviews
                            else if(2.7 <= rating && rating <= 3.3) {
                                //should only update this if the index falls in the range
                                //of maxYear and maxYear - maxYearsToDisplay. This is for the 
                                //time series chart.
                                if(index >= 0)
                                    getDataByYear[2][index] += 1;
                                unclear++;
                            } 
                            else {
                                //if the model conflicts with the quality rating, then unclear is ticked
                                if(sentiments[0][i] == 'Positive') {
                                    //should only update this if the index falls in the range
                                    //of maxYear and maxYear - maxYearsToDisplay. This is for the 
                                    //time series chart.
                                    if(index >= 0)
                                        getDataByYear[2][index] += 1;
                                    unclear++;
                                }
                                //if the model agrees, then it adds one to the negatives counter
                                else {
                                    if(index >= 0)
                                        getDataByYear[1][index] += 1;
                                    negatives++;
                                }
                            }
                            
                        }



                        const posVsNegDoughnut = document.getElementById('sentimentDoughnut');
                        const posVsNegMultBar = document.getElementById('sentimentMultiBarBiGram');
                        const posVsNegMultBarHist = document.getElementById('setimentMultBarHist');

                        tempLabels = ['1', '2', '3', '4', '5'];

                        const addMultiBarBiGram = new Chart(posVsNegMultBar, {
                            type: "bar",
                            data: {
                                datasets: [{
                                    data: sentiments[3],
                                    label: 'Bi-Gram',
                                    backgroundColor: blueColor,
                                    borderWidth: 2,
                                    borderColor: '#000',

                                }
                                ],
                                labels: sentiments[2]
                            },
                            options: {
                                aspectRatio: 1,
                                scales: {
                                    x: {
                                        stacked: true
                                    },
                                    y: {
                                        beginAtZero: true,
                                        stacked: true
                                    }
                                },
                                plugins: {
                                    legend: {
                                        labels: {
                                            font: {
                                                weight: 'bold'
                                            },

                                        },
                                        position: 'bottom',
                                        align: 'center'
                                    },
                                    title: {
                                        display: true,
                                        text: 'Popular Phrases'
                                    }
                                },
                            }
                        });


                        //used for x-axis labels
                        var years = [];

                        for(var i = numYearsDisplay-1; i > -1; i--) 
                            years.push(maxYear - i);
                        
                        const addMultiBarHist = new Chart(posVsNegMultBarHist, {
                            type: "bar",
                            data: {
                                datasets: [{
                                    data: getDataByYear[0],
                                    label: 'Positive',
                                    backgroundColor: greenColor,
                                    borderWidth: 2,
                                    borderColor: '#000',
                                },
                                {
                                    data: getDataByYear[1],
                                    label: 'Negative',
                                    backgroundColor: redColor,
                                    borderWidth: 2,
                                    borderColor: '#000',
                                },
                                {
                                    data: getDataByYear[2],
                                    label: 'Unclear',
                                    backgroundColor: yellowColor,
                                    borderWidth: 2,
                                    borderColor: '#000',
                                }],
                                labels: years
                            },
                            options: {
                                aspectRatio: 1,
                                plugins: {
                                    legend: {
                                        labels: {
                                            font: {
                                                weight: 'bold'
                                            }
                                        },
                                        position: 'bottom'
                                    },
                                    title: {
                                        display: true,
                                        text: 'Past 5 Years'
                                    }
                                },
                            }
                        }); 
                        
                        //calculating percentages to use for the doughnut chart
                        var total = positives + negatives + unclear;

                        var positivesPercent = ((positives/total) * 100).toFixed(2);
                        var negativesPercent = ((negatives/total) * 100).toFixed(2);
                        var unclearPercent = ((unclear/total) * 100).toFixed(2);

                    
                        //posVsNegDoughnut specs
                        const addSentimentChart = new Chart(posVsNegDoughnut, {
                            // type: "pie",
                            type: "doughnut",
                            data: {
                                datasets: [{
                                    borderWidth: 2,
                                    borderColor: '#000',
                                    data: [positives, negatives, unclear],
                                    backgroundColor: [
                                        greenColor,
                                        redColor,
                                        yellowColor
    
                                    ]
                                }],
    
                                labels: [
                                    'Positives   ' + positivesPercent + '%',
                                    'Negatives ' + negativesPercent + '%',
                                    'Unclear     ' + unclearPercent + '%'
                                ]
                            },
                            options: {
                                title: {
                                display: true,
                                text: "Positive vs. Negative vs. Unclear"
                                },
                                plugins: {
                                    legend: {
                                        labels: {
                                            font: {
                                                weight: 'bold'
                                            },

                                        },
                                        position: 'bottom',
                                        align: 'center'
                                    },
                                    title: {
                                        display: true,
                                        text: 'Kinds of Reviews'
                                    }
                                },
                                responsive: false
                            },
                        });
                    }
                    
                });
        });
    });

}

function setPredictions() {
    $(document).ready(function() {
        //all of the reviews we want are in this partially-matched div tag
        var els = document.querySelectorAll('div[class*="Rating__RatingInfo"]');
        
        document.getElementById('ratingsList').insertAdjacentHTML('beforebegin', '<div class = "buttonClicked"></div>');
        var reviews = [];
        var getFirstName = document.querySelector('div[class*="NameTitle__Name"] span');
        var getLastName = document.querySelector('span[class*="NameTitle__LastNameWrapper"]');

        //firstname was easy to get with css selection, but lastName was within 
        var temp = getLastName.innerHTML;


        var firstName = getFirstName.innerHTML;
        var lastName = temp.substring(0,temp.indexOf("<!--"));


        for(var i = 0; i < els.length; i++) {
            //reviews are found after the "Comments_StyledComments ..." tag. Here, queryselector
            //partially matches it with Comments_StyledComments because there are other
            //random digits and letters after this string
            var getLine = els[i].querySelector('div[class*="Comments__StyledComments"]');
            var checkSentiment = els[i].querySelector('div[class="insertedSentiment sentiment"]');

            if(getLine != null && checkSentiment == null) 
                reviews.push([getLine.firstChild.nodeValue, firstName, lastName]);
            
        }

        //Stringify converts a JS object or value to a JSON string that python can use
        const s = JSON.stringify(reviews);
  
        //where the magic happens. The ajax function from jquery sends data to
        //Python's flask server. The Python method called processAndSend will process
        //the data using the model built and sends the sentiment values back.
        //Make sure the python server is running while developing for it to work
        
        $.ajax({
            url:"https://dnchow.pythonanywhere.com/processAndSendTemp",
            type:"POST",
            contentType:"application/json",
            data:JSON.stringify(s),

            success: function(response) {
                sentiments = JSON.parse(response);
                
                //adds Positive or Negative for each review on the ratemyprofessor tab for now
                var sentimentsCounter = 0;
                var forConfRatings = document.querySelectorAll('div[class*="RatingValues__StyledRatingValues"]');
                var getOrigRating = document.querySelectorAll('div[class*="CardNumRating__CardNumRatingNumber"]');
                var getBoxes = document.querySelectorAll('div[class*="Rating__RatingBody"]');

                for(var i = 0; i < els.length; i++) {
                    //used to place the results from the model
                    var getLine = els[i].querySelector('div[class*="EmotionLabel__StyledEmotionLabel"]');
                    //to make sure it doesn't place sentiment analysis in comments that already have it
                    var checkSentiment = els[i].querySelector('div[class="insertedSentiment sentiment"]');
                    var getBox = els[i].querySelector('div[class*="Rating__RatingBody"]');

                    if(getLine != null && checkSentiment == null) {
                        getLine.insertAdjacentHTML("afterend", '<div class="insertedSentiment sentiment">' + sentiments[0][sentimentsCounter] + ' text detected</div>');
                        forConfRatings[i].insertAdjacentHTML("beforeend", '<div class="insertConfidence center_box">' + 
                                                                            '<div class="insertConfText conf_rating_text">Confidence</div>' +
                                                                            '<div class="insertConfNum conf_rating_num">' + sentiments[1][sentimentsCounter] + '%</div>' +
                                                                            '</div>');

                        var rating = parseFloat(getOrigRating[i*2].innerHTML);    
                        
                        //This is-else branch is for highlighting the RMP boxes
                        //If the rating is above 3.3 which indicates a positive review 
                        //(this was to inculde ratings before 2016 that had decimal reviews),
                        if(rating > 3.3) {
                            //if the model conflicts with the quality rating, then it colors the
                            //box's border with yellow indicating unclear. Otherwise, it's green
                            if(sentiments[0][sentimentsCounter] == 'Negative')
                                getBoxes[i].style.border = "solid " + yellowColor;
                            else
                                getBoxes[i].style.border = "solid " + greenColor;



                        } 
                        //all reviews that have a quality rating between 2.7 and 3.3 
                        //are automatically colored with yellow due to nature of these
                        //types of ratings.
                        else if(2.7 <= rating && rating <= 3.3) {
                            getBoxes[i].style.border = "solid " + yellowColor;

                        } 
                        else {
                            //if the model conflicts with the quality rating, then it colors the
                            //box's border with yellow indicating unclear. Otherwise, it's red
                            if(sentiments[0][sentimentsCounter] == 'Positive')
                                getBoxes[i].style.border = "solid " + yellowColor;
                            else
                                getBoxes[i].style.border = "solid " + redColor;

                        }
                        // getBoxes[i].style.borderBottomWidth = '5px';

                        sentimentsCounter++;
                    }
                    
                }
            }
            
        });

        

    });

    
}

$(document).ready(function() {
    loadRatingsInfo();

    //mutation observer observes for changes in the reviews
    //list, so the program can automatically add its sentiment
    //analysis to new reviews that could appear after the user
    //clicks the "Load More Ratings" button
    let RMPList = document.getElementById('ratingsList');
    options = {
        childList: true
    },
    observer = new MutationObserver(RMPCallback);

    function RMPCallback(mutations) {
        setPredictions();
    }

    //some prof's don't have enough reviews for the "Load More Ratings"
    //button to show up. No need to observe for it.
    setPredictions();
    if(document.querySelector('button[class*="Buttons__Button-sc"]') != null) {
        observer.observe(RMPList, options);
    }
    
});
    
