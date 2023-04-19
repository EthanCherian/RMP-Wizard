# Rate My Professors Project :)
A project to advance our Natural Language Processing skills using a practical, real-world dataset: the comments on Rate My Professor. Here's a link to a quick video to showcase our [extension.](https://drive.google.com/file/d/1jrBeuaZ0NQyXyRWPuCV8DuvFsApgXPGp/view?usp=sharing)

## Who are we?
We are students at Texas A&M University, mostly studying Computer Science, who decided to make use of our summer and create something quite unique. 

### Why did we decide to do this?
As college students, we noticed a few features missing from the Rate My Professors (RMP) website that we thought we could take upon ourselves to implement. We quickly realized, however, the depth of interesting things that could be done with such a robust and relatively untapped dataset. 
### What is it we've done here?
The current stage of the project consists mainly of a **sentiment classifier** of comments on RMP. To that end, we have also constructed a Google Chrome extension that injects our findings onto RMP's website itself in an appealing manner. We currently have plans to extend this project into topic modeling and text summarization, though these endeavors promise a far greater challenge.

#### What is *sentiment analysis*?
Sentiment analysis is one of many *classification* tasks in Natural Language Processing (NLP, the use of machine learning on written text data). To be quite honest, a binary classification task (classifying between two categories, like sentiment analysis) is considered by most to be among the simplest possible NLP tasks. However, being that we essentially started from scratch and accomplished everything in ~8 weeks, we are quite proud of our progress.

Sentiment analysis involves the classification of text as either positive or negative sentiment, based on the words and context of the text. In our case, we look *only* at the text in an RMP review and classify it as conveying either positive or negative sentiment.

# What did working on this project look like?
In general, there were three main domains/areas related to programming that we were came face-to-face with throughout working on this project. Everyone ended up working a little with everything, but the main contributors to each are noted below.

| *Domain*             | *Contributors*|
|:--------------------:|:-------------:|
| Web scraping         | Dien          |
| Machine learning     | Ethan, Dien   |
| Frontend development | Krish, Mohith |

## Web scraping
Web scraping was used to obtain large samples of RMP comments and professor data by using Scrapy to make HTML requests to the RMP backend. 

The scrape was started over a period of 2 weeks in mid-july during off traffic hours. POST requests were made to the underlying GraphQL database in RMP to collect about 500k professors and 8 million comments. Due to the nature of the scrape, professors added earlier in the site's lifetime would be scraped leading to a dataset with a disproportionate amount of reviews from previous years.

<img src = "https://github.com/EthanCherian/RMP/blob/master/screenshots/date-dist.png" height = 300, width = 350>

## Machine learning
Machine learning was originally thought to be the main bulk of our project, and, indeed, it did probably end up being the single largest domain we had to tackle. More specifically, the bulk of this project was spent on data science (practice of analyzing our data and attempting to find and explain patterns), but machine learning is a better buzzword.

Starting from scratch, we had to learn many of the basics of NLP, such as stopword removal, stemming, lemmatization, bag of words, TF-IDF, and Word2Vec. From there, we began to look closer at the data scraped from RMP and perform exploratory data analysis (EDA). The things that were examined included, but were *not* limited to: how many comments used contractions or emoticons, what the date distribution of comments looked like, what the star distribution looked like, prevalence of swear words, why some HTML entities were encoded, common abbreviations, domain-specific words of note, etc.

### Preprocessing (or cleaning)
After exploring our data, the next thing to do is clean it, minimizing the amount of noise the model must attempt to interpret. This is accomplished through things like dropping invalid (or otherwise unusable) reviews, lemmatization, stopword removal, removing non-alphabetic characters, handling HTML entities, expanding contractions, negation handling, etc. After preprocessing, the data is sufficiently prepared to analyzed by the model, though some work must be done before the model is capable of learning. Indeed, computers are inherently incapable of understanding text, so the review texts must be presented in a format that a computer can understand.

To that end, the bag of words (or TF-IDF) process essentially converts comments into vectors of integer counts (or floats), allowing computers to understand them. Due to the large size of our dataset and its relative lack of cleanliness (given that we did it all ourselves), our vector was practically a massive sparse matrix consisting mostly of zeros. Each column of this matrix is representative of a "feature" in our dataset, which is either a single word, a pair of consecutive words, or a triplet of words, and each row represents a single comment. To give a sense of how large this matrix could be, in a sample of 300k comments, we could reach well over 1.3 million total features, making our matrix store around 4 billion elements. It's worth noting, that we actually had over 5 million comments, so I'll let you do the math on how big that matrix could potentially get.

To prevent us from having to whip around such a comically oversized matrix, we used a process called feature selection, where we select the top quarter of the 1.3 million features that are deemed to be the most indicative of sentiment. It determines this correlation by utilizing the $\chi^2$ method of testing the null hypothesis.

### Creating our model
From here, the model can finally understand our comments and can start to properly learn and predict. The next challenge was determining which type of NLP model to use, of which we had a few feasible choices without getting too unnecessarily complex. As we were just starting to dip our toes into data science and machine learning, we didn't want to use any of the more advanced ML techniques, such as deep learning or neural networks. Instead, we stuck to their simpler, more beginner friendly alternatives, including:

* Naive Bayes
* Logistic Regression
* Random Forest
* Support Vector Machine (SVM)

Early on, we stuck almost entirely to *Multinomial Naive Bayes* (other than briefly testing out the others), due to its simplicity and ability to run without much action on our end. However, as we progressed, we realized that *Logistic Regression* might actually be strictly superior. This is for a number of reasons, but the two most relevant are:

* Naive Bayes has very little in the way of optimizations we can make to the model itself, so all forward progress had to come from preprocessing. Logistic Regression, on the other hand, has a number of hyperparameters that we could tune to improve our accuracy in classification.
* The results produced by Naive Bayes were relatively difficult to interpret: beyond the sentiment itself, we couldn't see into the mind of the model, so to speak. By contrast, Logistic Regression provides a few mathematical ways of determining what the model was thinking when it made a particular classification
  * This point in particular played into our decision to switch, due to a new feature we were looking to implement that would be made a lot easier with this information. 
    * *see [version 1.1 in our patchnotes](https://github.com/EthanCherian/RMP-Wizard/blob/master/PATCHNOTES.md#v11-oct-25-2022)*
  
In the end, we switched to Logistic Regression, performed some hyperparameter tuning, and ended up with our final model. This model ended up with around **92.35%** accuracy in predicting sentiment, an impressive feat all things considered.

## Frontend development
We needed a way to display our results right on the website without having to run a script on some console, so we decided to use a Chrome extension to 
display our results more effectively. This was a brand new territory for us and a huge chunk of our time was spent on learning how to configure the 
extension, reading up on the documentation of Chrome extensions, and making the main JavaScript file to display properly.

### But how did we get the results?
The results that were collected from the machine learning models were written in Python. So, we needed to get those results
from the Python functions to the JavaScript files. Initially, we tried to insert these functions into the website with pyscript, but we had problems 
with Chrome extension's content policy saying we cannot have dynamically executed code (meaning no running scripts directly on the html code). So, we
decided to look for Python servers that we could use to get the machine learning functions to talk to our JavaScript file. Then, we found Python Flask,
which is a small and lightweight web framework. This was enough to get our initial project to work with our Chrome extension.

### Getting Our Data
Before we could do any sort processing, we had to get the reviews the user would be looking at. This was done with using fetch request in JavaScript that 
helped us get the data from the RMP database. With that taken care of, we then set up an AJAX post request that allowed us to talk with the Python functions
written by Dien and Ethan from JavaScript. An AJAX post is a specific type of function found in JQuery that can make POST and GET requests. This allowed us
to send a message (in this case, the data on the currently opened RMP tab) to the Python functions and receive our results. Then, it was a matter of displaying
our results in a simple, easy to understand way that should also integrate well with the RMP website.

### Displaying Our Data
JavaScript has many libraries to display charts, but the one we chose to go with was Chart.js. Chart.js was simple to get started with, as long as we had the
documentation on the parameters we can set, and it produced great charts with minimal changes. After looking through the documentation, we made it look more appealing, or, at least, that's what we think (you decide with the screenshot below :) ). For the reviews displayed on the page, we went ahead and highlighted the boxes the reviews were in to indicate whether or not our model agreed with the quality rating shown. If the model agreed, then it's either positive (for quality ratings above 3.3 and a green border was added) or negative (for quality ratings below 2.7 and a red border was added). If it disagreed or the quality ratings were between 2.7 and 3.3, then a yellow border was added to indicate an unclear rating. Reviews that fell under the 2.7 - 3.3 range tend to have mixed feelings and depending on how it's worded, the model may not accurately predict the sentiment. In addition to this, we used CSS to make the charts line up properly and to follow RMP's structure to make our integrations more visually appealing.


| **Before** | **After** |
|--------|-------|
| <img src="https://github.com/EthanCherian/RMP/blob/master/screenshots/beforeChange.png"> | <img src="https://github.com/EthanCherian/RMP/blob/master/screenshots/afterChange2.png"> |

# What's next?

Unfortunately, we are all full time students, and this was just supposed to be a fun little project we worked on to increase our employability, so progress on this project slows considerably during college semesters. However, we do have a running list of features, etc. that we would like to implement, which you can find [here](https://github.com/EthanCherian/RMP-Wizard/blob/master/TODO.md). In general, we will kinda just pick whatever elements from the list that would be the easiest or most important to implement, but we do intend to get around to everything eventually. 

Finally, we'd like to direct your attention [here](https://github.com/EthanCherian/RMP-Wizard/blob/master/PROGRESS.md), which outlines a lot of the early learning we did in figuring out the best way to even approach a project as broad and terrifying in scope as this one was, even though it only covers the machine learning aspect. Needless to say, we are extremely proud of the product we've created and will continue working to make it even better. :)
