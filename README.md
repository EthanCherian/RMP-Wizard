# Rate My Professors Project :)
A project to advance our Natural Language Processing skills using a practical, real-world dataset: the comments on Rate My Professor.

## Who are we?
We are students at Texas A&M University, mostly studying Computer Science, who decided to make use of our summer and create something quite unique. 

### Why did we decide to do this?
As college students, we noticed a few features missing from the Rate My Professors (RMP) website that we thought we could take upon ourselves to implement. We quickly realized, however, the depth of interesting things that could be done with such a robust and relatively untapped dataset. 
### What is it we've done here?
The current stage of the project consists mainly of a **sentiment classifier** of comments on RMP. To that end, we have also constructed a Google Chrome extension that injects our findings onto RMP's website itself in an appealing manner. We currently have plans to extend this project into topic modeling and text summarization, though these endeavors promise an far greater challenge.

#### What is *sentiment analysis*?
Sentiment analysis is one of many *classification* tasks in Natural Language Processing (NLP, the use of machine learning on written text data). To be quite honest, a binary classification task (classifying between two categories, like sentiment analysis) is considered by most to be among the simplest possible NLP tasks. However, being that we essentially started from scratch and accomplished everything in ~8 weeks, we are quite proud of our progress.

Sentiment analysis involves the classification of text as either positive or negative sentiment, based on the words and context of the text. In our case, we look *only* at the text in an RMP review and classify it as conveying either positive or negative sentiment.

## What did working on this project look like?
In general, there were three main domains/areas related to programming that we were came face-to-face with throughout working on this project. Everyone ended up working a little with everything, but the main contributors to each are noted below.

| *Domain*             | *Contributors*|
|:--------------------:|:-------------:|
| Web scraping         | Dien          |
| Machine learning     | Ethan, Dien   |
| Frontend development | Krish, Mohith |

### Web scraping
Web scraping was used to obtain a good sample of RMP comment and professor data by making HTML requests to the RMP backend. 

**dien add the rest of this lol**
### Machine learning
Machine learning was originally thought to be the main bulk of our project, and, indeed, it did probably end up being the single largest domain we had to tackle. More specifically, the bulk of this project was spent on data science (practice of analyzing our data and attempting to find and explain patterns), but machine learning is a better buzzword.

Starting from scratch, we had to learn many of the basics of NLP, such as stopword removal, stemming, lemmatization, bag of words, TF-IDF, and Word2Vec. From there, we began to look closer at the data scraped from RMP and perform exploratory data analysis (EDA). The things that were examined included, but were *not* limited to: how many comments used contractions or emoticons, what the date distribution of comments looked like, what the star distribution looked like, prevalence of swear words, why some HTML entities were encoded, common abbreviations, domain-specific words of note, etc.

Following EDA, the next step, traditionally, is to begin working on a machine learning model to perform our determined task. Before an NLP model can be trained, however, we knew that we had to clean the data and remove a lot of noise. This is accomplished through things like dropping invalid (or otherwise unusable) reviews, lemmatization, stopword removal, removing non-alphabetic characters, handling HTML entities, expanding contractions, negation handling, etc. After preprocessing, the data is sufficiently prepared to analyzed by the model, though some work must be done before the model is capable of learning. Indeed, computers are inherently incapable of understanding text, so the review texts must be presented in a format that a computer can understand.

To that end, the bag of words (or TF-IDF) process essentially converts comments into vectors of integer counts (or floats), allowing computers to understand them. Due to the large size of our dataset and its relative lack of cleanliness (given that we did it all ourselves), our vector was practically a massive sparse matrix consisting mostly of zeros. Each column of this matrix is representative of a "feature" in our dataset, which is either a single word or a pair of consecutive words, and each row represents a single comment. To give a sense of how large this matrix could be, in a sample of 300k comments, we could reach well over 1.3 million total features, making our matrix store around 4 billion elements. It's worth noting, that we actually had over 5 million comments

To prevent us from having to whip around such a comically oversized matrix, we used a process called feature selection, where we select the top quarter of the 1.3 million features that are deemed to be the most indicative of sentiment. It determines this correlation by utilizing the $\chi^2$ method of testing the null hypothesis. 

From here, the model can finally understand our comments and can start to properly learn and predict. The next challenge was determining which type of NLP model to use, of which we had a few feasible choices without getting too unnecessarily complex. The (oversimplified) pros and cons of each are outlined below. 

* Naive Bayes (Multinomial)
  * Pros: 
    * Simple to implement
    * Quite fast
    * If features are independent, will likely give very good results
  * Cons: 
    * In most cases, features are not independent, so results can be quite poor
    * Zero probability problem - when a new feature is encountered, it is given weight 0 and essentially ignored
    * Can struggle with continuous variables (irrelevant to us) and imbalanced datasets (very relevant to us)
* Logistic Regression
  * Pros: 
    * Performs very well when data is linearly separable
    * Can interpret model coefficients as indicators of feature importance
    * Less inclined to overfitting, though it can overfit when given higher dimensions of data
  * Cons:
    * Requires independent variables be linearly related to logarithmic odds correlated
    * Tough to obtain complex relationships between variables
    * Forms linear separations in data, which can lead to signficant loss of clarity
* Random Forest
  * Pros:
    * Robust to outliers
    * Lower risk of overfitting
    * Runs efficiently on large datasets
  * Cons: 
    * Often biased when dealing with categorical variables (of which we have none)
    * Not suitable for training on sparse feature sets (like ours)
    * Slow training (understatement of the century)
* Support Vector Machine (SVM)
  * Pros: 
    * Excels when separation between classes is large
    * Relatively memory efficient
    * More effective in higher dimensional spaces (ie. when many features are present)
  * Cons:
    * Lacks probabilistic explanation for classifications
    * Generally unsuitable for large datasets
    * Loses performance dramatically when data is not perfectly clean

It didn't take long for us to determine that Multinomial Naive Bayes was the most efficient model (time-wise) that didn't sacrifice too much accuracy. 
### Frontend development*
**mohith and krish add the rest of this lol**
