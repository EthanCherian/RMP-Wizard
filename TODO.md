# Our TODO list:

## General stuff
* Migrate from JavaScript to TypeScript
  * TypeScript is supposed to be easier to debug
* AWS Lambda, Docker
  * Cloud deployment as an additional technology would be nice
  * Would likely eliminate a current issue we have: our server can take a good 30 seconds to wake up sometimes, which is very unfriendly to users
* More filtering (GraphQL) - sentiment and quality rating
  * For some reason, RMP doesn't let you filter by quality rating, so adding that would be nice
  * In order to add more filtering, we'd need to essentially make our own database, for which GraphQL would be useful
* Avoid memory constraints in deployment
  * Currently limited to 512MB on our server, which we are just barely staying under
  * Solution to this may be the cloud, but that may incur an additional charge
* *LOW PRIORITY*: 
  * Changing time-series graph so slider can be used to choose time interval
  * Generate WordCloud
    * Difficult to generate in JavaScript; could generate in Python and send PNG to frontend, but that may be pretty funky as well

## NLP-specific ideas
* Negation handling
* Using Apache Spark for preprocessing
  * Allegedly just a faster pandas, so it's not necessary as of now, but implementing some of the other TODOs might change that
* Abbreviations and acronyms (solid for now, but could probably be better)
* Text summarization
* Aspect-based SA
* Removing non-English reviews (perhaps requires spaCy)
* Rather than removing professor names, add a dummy feature like "\_prof\_"
  * unsure how much this will help accuracy, but might make results more consistent
