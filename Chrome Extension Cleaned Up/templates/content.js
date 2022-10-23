const redColor = 'rgb(255, 156, 156)';
const greenColor = 'rgb(127, 246, 195)';
const yellowColor = 'rgb(255, 241, 112)';
const blueColor = 'rgb(196, 223, 230)';
var previousCourseFilter = '';
var sentiments = [];
var prevFilter = "All courses";
var courseHashMap = new Map();
var comments = [];



function add_past_num_years_reviews_chart() {
    const pos_vs_neg_multbar = document.getElementById('sentimentMultiBarBiGram');

    const addMultiBarBiGram = new Chart(pos_vs_neg_multbar, {
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

}

function add_popular_hist_chart(getDataByYear, numYearsDisplay, maxYear) {
    // const posVsNegMultBarHist = document.getElementById('setimentMultBarHist');
    const pos_vs_neg_multbar_histogram = document.getElementById('setimentMultBarHist');

     //used for x-axis labels
     var years = [];

     for(var i = numYearsDisplay-1; i > -1; i--) 
         years.push(maxYear - i);
     
     const addMultiBarHist = new Chart(pos_vs_neg_multbar_histogram, {
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
     
}

function add_reviews_distribution_doughnut_chart(positives, negatives, unclear) {
    const pos_vs_neg_doughnut = document.getElementById('sentimentDoughnut');

    //calculating percentages to use for the doughnut chart
    var total = positives + negatives + unclear;

    var positivesPercent = ((positives/total) * 100).toFixed(2);
    var negativesPercent = ((negatives/total) * 100).toFixed(2);
    var unclearPercent = ((unclear/total) * 100).toFixed(2);


    //posVsNegDoughnut specs
    const addSentimentChart = new Chart(pos_vs_neg_doughnut, {
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

function addNewSentiment(els, i, forConfRatings, sentimentsCounter, courseAvg, colorToUse) {
    //add average quality for each course that the professor has
    forConfRatings[i].insertAdjacentHTML("beforeend", '<div class="insertConfidence center_box">' + 
    '<div class="insertConfText conf_rating_text">Avg<br> Course<br> Rating</div>' +
    '<div class="insertConfNum conf_rating_num">' + courseAvg + '</div>' +
    '</div>');
    
    
    
    //create checkbox to show more information
    var create_proc_button = document.createElement("input");
    create_proc_button.setAttribute("type", "checkbox");
    create_proc_button["id"] = "proc_button";
    create_proc_button.onclick = showProcessedVersion.bind(null, els, i);
    
    
    var add_proc_button_div = '<div class="add_more_info_button analysis_specs_button"><label class="more_info_switch"></label></div>';
    
    //create title
    var add_analysis = '<div class="add_analysis analysis_specs_title"><b>Our Analysis</b>' + add_proc_button_div + '</div>';


    //add slider to show sentiment value
    var insert_slider = '<div class = "add_slider">'
    + '<input type="range" min="0" max="100" value="' + sentiments[1][sentimentsCounter] + '" class="slider" id="myRange"></div>'
        
    //add percentage of slider next to the slider
    var percentage_value = '<div class="add_percentage">' + sentiments[1][sentimentsCounter] + "%</div>"; 
    
    //add all of them up to a single variable
    var create_grid = '<div class="our_info">' + '<div class="top_title_button">' + add_analysis + '</div>' 
    + '<div class="bottom">' + insert_slider + percentage_value + '</div></div>';

    //add all of the stuff from above in this block after the review on RMP website
    var insert_after_review = els[i].querySelector('div[class*="Comments__StyledComments"]');

    insert_after_review.insertAdjacentHTML('afterend', create_grid);

    var insert_after_add_proc_div = els[i].querySelector('label[class="more_info_switch"]');

    insert_after_add_proc_div.insertAdjacentElement('beforeend', create_proc_button);
    insert_after_add_proc_div.insertAdjacentHTML('beforeend', '<span class="more_info_slider"></span><span class="load_more_text">Load More</span>');
}

function showProcessedVersion(els, location) {
    
    if(els[location].querySelector('input[id="proc_button"]').checked) {
        var original = els[location].querySelector('div[class*="Comments__StyledComments"]');
        var clone = original.cloneNode(true);
        clone.className = "processedReview insert_proc_review";

        var sentimentsCounter = comments.length-1-location;

         // makes sure that the sentiment analysis and other additions are being added to the 
        // right card on the actual page
        for(; sentimentsCounter >= 0; ) {
            var checkRightReviewPlacement = els[location].querySelector('div[class*="Comments__StyledComments"]').textContent == sentiments[6][sentimentsCounter];

            if(!checkRightReviewPlacement)
                sentimentsCounter--;
            else 
                break;

        }

        clone.innerHTML = sentiments[4][sentimentsCounter];

        var wordsToHighlight = sentiments[5][sentimentsCounter];
        
        var modInnerHTML = clone.innerHTML + ' ';
        for(var i = 0; i < wordsToHighlight.length; i++) {
            modInnerHTML = modInnerHTML.replace(' ' + wordsToHighlight[i] + ' ', ' <span class="highlight">' + wordsToHighlight[i] + '</span> ');
        }
        clone.innerHTML = modInnerHTML;
        // var addProcessedString = '<div class="processedReview">' + sentiments[4][comments.length-1-location] + '</div>';

        var locateSlider = els[location].querySelector('div[class="our_info"]');
        locateSlider.insertAdjacentElement('afterend', clone);
    }
    else {
        els[location].querySelector('div[class="processedReview insert_proc_review"]').remove();
    }
}



function load_ratings_info() {  
      
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


                for(var i = 0; i < nodes.length; i++) {
                    var currentNode = nodes[i].node;
                    if(courseHashMap.has(currentNode.class)) {
                        var update = courseHashMap.get(currentNode.class);
                        update[0] += currentNode.clarityRating;
                        update[1] += 1;
                        courseHashMap.set(currentNode.class, update);
                    }
                    else {
                        courseHashMap.set(currentNode.class, [currentNode.clarityRating, 1]);
                    }
                }

                for(var i = 0; i < nodes.length; i++) {
                    var txt = document.createElement("textarea");
                    txt.innerHTML = nodes[i].node.comment;
                    comments.push(txt.value);
                }

                var dataToProcess = [];

                for(var i = 0; i < nodes.length; i++) {
                    dataToProcess.push([comments[i], getData.data.node.firstName, getData.data.node.lastName]);
                }

                const c = JSON.stringify(dataToProcess);

                //where the magic happens. The ajax function from jquery sends data to
                //Python's flask server. The Python method called process will process
                //the data using the model built and sends the sentiment values back.
                //Make sure the python server is running while developing for it to work
                $.ajax({
                    url:"http://127.0.0.1:5000/process",
                    type:"POST",
                    contentType:"application/json",
                    data:JSON.stringify(c),
        
                    success: function(response) {
                        //sentiments is filled with either "Positive" or "Negative"
                        sentiments = JSON.parse(response);
                        sentiments.push(comments);

                        set_predictions();

                        //adds Positive or Negative for each review on the ratemyprofessor tab for now
                        var sentimentsCounter = 0;
                        var numYearsDisplay = 5;

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

                            So, this is a 3 x (Number of Years to Display) matrix. It is structured this way
                            to make it easier to assign all of the types of reviews' frequency counts from each year
                            by utilizing row-major design of arrays. It makes it easier to add to the charts
                            without having to add another loop or array to store those values.

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


                        add_past_num_years_reviews_chart();

                        add_popular_hist_chart(getDataByYear, numYearsDisplay, maxYear);

                        add_reviews_distribution_doughnut_chart(positives, negatives, unclear);

                        
                    }
                    
                });
        });
    });

}

function set_predictions() {
    $(document).ready(function() {
        //all of the reviews we want are in this partially-matched div tag
        var els = document.querySelectorAll('div[class*="Rating__RatingInfo"]');
        
        var reloadSentimentsOrNot = false;
        var checkFilter = document.getElementsByClassName(' css-n2irg-placeholder')[0].textContent;

        //check if filter changed
        if(checkFilter != prevFilter) {
            reloadSentimentsOrNot = true;
            prevFilter = checkFilter;
        }
        
        //adds Positive or Negative for each review on the ratemyprofessor tab for now
        var sentimentsCounter = sentiments[0].length-1;
        var forConfRatings = document.querySelectorAll('div[class*="RatingValues__StyledRatingValues"]');
        var getOrigRating = document.querySelectorAll('div[class*="CardNumRating__CardNumRatingNumber"]');
        var getBoxes = document.querySelectorAll('div[class*="Rating__RatingBody"]');

        
        for(var i = 0; i < els.length; i++) {
            //used to place the results from the model
            var getLine = els[i].querySelector('div[class*="EmotionLabel__StyledEmotionLabel"]');
            //to make sure it doesn't place sentiment analysis in comments that already have it
            // var checkSentiment = els[i].querySelector('div[class="insertedSentiment sentiment"]');
            var checkSentiment = els[i].querySelector('div[class="add_slider"]');
            var getBox = els[i].querySelector('div[class*="Rating__RatingBody"]');
            
            //to get course average for each course the professor teaches
            var course = els[i].querySelector('div[class*="RatingHeader__StyledClass"]').textContent.trim();
            var courseSpecs = courseHashMap.get(course);
            var courseAvg = (Math.round( (courseSpecs[0] / courseSpecs[1] ) * 10) / 10).toFixed(1);

            
            var rating = parseFloat(getOrigRating[i*2].innerHTML);  
            
            // makes sure that the sentiment analysis and other additions are being added to the 
            // right card on the actual page
            for(; sentimentsCounter >= 0; ) {
                var checkRightReviewPlacement = els[i].querySelector('div[class*="Comments__StyledComments"]').textContent == sentiments[6][sentimentsCounter];

                if(!checkRightReviewPlacement)
                    sentimentsCounter--;
                else 
                    break;

            }
            
            var colorToUse;
            //This is-else branch is for highlighting the RMP boxes
            //If the rating is above 3.3 which indicates a positive review 
            //(this was to inculde ratings before 2016 that had decimal reviews),
            if(rating > 3.3) {
                //if the model conflicts with the quality rating, then it colors the
                //box's border with yellow indicating unclear. Otherwise, it's green
                if(sentiments[0][sentimentsCounter] == 'Negative')
                    colorToUse = yellowColor;
                else
                    colorToUse = greenColor;



            } 
            //all reviews that have a quality rating between 2.7 and 3.3 
            //are automatically colored with yellow due to nature of these
            //types of ratings.
            else if(2.7 <= rating && rating <= 3.3) {
                colorToUse = yellowColor;

            } 
            else {
                //if the model conflicts with the quality rating, then it colors the
                //box's border with yellow indicating unclear. Otherwise, it's red
                if(sentiments[0][sentimentsCounter] == 'Positive')
                    colorToUse = yellowColor;
                else
                    colorToUse = redColor;

            }
            
            getBoxes[i].style.border = "solid " + colorToUse;
            getBoxes[i].style.borderWidth = '5px';


            

            if(reloadSentimentsOrNot === true) {
                if(checkSentiment) {
                    var modifySlider = els[i].querySelector('input[class="slider"]');
                    modifySlider.value = sentiments[1][sentimentsCounter];

                    modifySlider = els[i].querySelector('div[class="add_percentage"]');
                    modifySlider.textContent = sentiments[1][sentimentsCounter] + '%';

                    var modifyConf = forConfRatings[i].querySelector('div[class="insertConfNum conf_rating_num"]');
                    modifyConf.textContent = courseAvg;
                }
                else {
                    addNewSentiment(els, i, forConfRatings, sentimentsCounter, courseAvg, colorToUse);
                }

            }

            else if(getLine != null && checkSentiment == null) {
                addNewSentiment(els, i, forConfRatings, sentimentsCounter, courseAvg, colorToUse);
            }  
        }

    });
}







$(document).ready(function() {
    load_ratings_info();

    //mutation observer observes for changes in the reviews
    //list, so the program can automatically add its sentiment
    //analysis to new reviews that could appear after the user
    //clicks the "Load More Ratings" button
    let RMPList = document.getElementById('ratingsList');



    observer = new MutationObserver(RMPCallback);

    function RMPCallback(mutations) {
        set_predictions();
    }

    
    observer.observe(RMPList, {childList: true});
    
    
});
