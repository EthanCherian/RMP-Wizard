var previousURL = ''
//used to see if the webpage's url changes
// chrome.webNavigation.onHistoryStateUpdated.addListener((details) => {

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {

    console.log("here");
    //if a change did occur, then it gets the current active tab
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        //since this is a background tab, we have to make sure that tab
        //only reloads if the domain is ratemyprofessors.com. Reason for 
        //reload is because ratemyprofessor being a single-page JS application
        //doesn't reload it's fetch request that we use to get the prof's 
        //ratemyprofessor id. The reload helps update the ID which we then
        //use to do analysis.
        
        //makes sure that the tab is defined, tab changed from previous url, and
        //domain is ratemyprofessors.com. The "search" and "ShowRatings" checks
        //make sure the user is on a prof's reviews site and not in the search
        //list for similar professor names or home page.
        if(tabs != null && tabs[0].url != null && tabs[0].url != previousURL &&  
            tabs[0].url.indexOf("https://www.ratemyprofessors.com/") != -1 &&
            tabs[0].url.indexOf("search") == -1 &&
            tabs[0].url.indexOf("ShowRatings") != -1) {
            previousURL = tabs[0].url;
            chrome.tabs.update({url: tabs[0].url});
        }
    });
// });
        
}); 
