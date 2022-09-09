var previousURL = ''
//used to see if the webpage's url changes
chrome.webNavigation.onHistoryStateUpdated.addListener((details) => {


    //if a change did occur, then it gets the current active tab
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        //since this is a background tab, we have to make sure that tab
        //only reloads if the domain is ratemyprofessors.com. Reason for 
        //reload is because ratemyprofessor being a single-page JS application
        //doesn't reload it's fetch request that we use to get the prof's 
        //ratemyprofessor id. The reload helps update the ID which we then
        //use to do analysis.
        //tabs[0].url.indexOf("www.ratemyprofessors.com") !== -1
        if(tabs[0].url != previousURL && tabs[0].url.indexOf("search") === -1 && tabs[0].url.indexOf("https://www.ratemyprofessors.com/") !== -1) {
            previousURL = tabs[0].url;
            chrome.tabs.update({url: tabs[0].url});
        }
    });
        
}); 
