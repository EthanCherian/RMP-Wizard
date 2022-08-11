# Progress so far
---
## Preprocessing ##

**`preprocessing.ipynb`**

1. Read [scraped comments CSV](https://rmp-bucket.s3.amazonaws.com/scraped_comments.csv "full CSV file for download") file and parse dates so `'date'` column has type `datetime64` rather than `object` (aka `string`)
2. Drop reviews with: empty comments, comments consisting of string `"No Comments"`, or comments with 5 or fewer words
    * Reset indices of dataframe as well, dropping these will leave gaps in indices that can cause problems in following steps
3. Remove elements from stopword list to ensure that relevant words remain in our dataset
4.  *Regex Stuff*, mostly courtesy of Dien, performed on each comment in dataframe
    * Remove HTML codes
      * Code for question mark often evades previous line, so remove it here
    * Remove links, phone numbers, and email addresses
    * Replace emoticons (ie. `:)` or `:'(`) with a tag meant to denote the (broad) sentiment of the emoticon
    * Expand contractions (ie. `can't` --> `can not`)
    * Remove any characters that are not letters (uppercase or lowercase) or spaces
    * Replace any occurrences of three or more consecutive identical characters with one of those characters (ie. `helllllo` --> `helo`)
    * Remove any extraneous spaces created by above steps
    * Lowercase entire comment
    * Lemmatize and remove stopwords (using NLTK rather than spaCy as originally planned)
5. Drop unnecessary columns and create new `cleanedComment` column for results of preprocessing corresponding to their original comment
6. Create new `sentiment` column using `clarityRating` as a tentative indicator of a comment's sentiment
    * Considering two different versions of `sentiment` column, will decide as we go along
      * Binary, where every review over 2.5 stars is considered positive and every less is negative
      * Ternary, where a review of 3 stars is neutral, more is positive, and less is negative
7. (Optional) Write dataframe to a new CSV file, so this code doesn't have to be run every time

---

## Models

For all models, train size was set to 80%, test to 20%. Used 200k random sample of dataset.

Model performance was evaluated on unigram features, bigram features, and features consisting of both unigrams and bigrams.

### Naive Bayes

**`Models/naive-bayes.ipynb`**

All models used 4000 max features for sake of time efficiency

|                | Accuracy | F1 Score |
|----------------|----------|----------|
| Unigram        | 85.54214 | 85.58620 |
| Bigram         | 83.73709 | 83.58267 |
| Unigram+Bigram | 85.80465 | 86.11170 |

#### After using Chi Squared for feature selection

**`Models/chi-squared.ipynb`**

Select top 25% of features in 20k sample

|                | Accuracy | F1 Score |
|----------------|----------|----------|
| Unigram        | 87.16000 | 87.11392 |
| Bigram         | 81.80000 | 78.78603 |
| Unigram+Bigram | 90.17500 | 89.56781 |

We finally pass 90% accuracy :)

### Logistic Regression

**`Models/log-reg.ipynb`**

All models used `k=1` (selected top result), as when `k=2`, accuracy was always 100

| Feature Repr. | Feature Type   | Accuracy | MRR      |
|---------------|----------------|----------|----------|
| Binary        | Unigram        | 86.15345 | 86.15345 |
|               | Bigram         | 85.39942 | 85.39942 |
|---------------| Unigram+Bigram | 87.24949 | 87.24949 |
| Count         | Unigram        | 86.57946 | 86.57946 |
|               | Bigram         | 84.07936 | 84.07936 |
|---------------| Unigram+Bigram | 87.42350 | 87.42350 |
| TF-IDF        | Unigram        | 86.57946 | 86.57946 |
|               | Bigram         | 84.07936 | 84.07936 |
|---------------| Unigram+Bigram | 87.42350 | 87.42350 |

Accuracy and MRR are always equal, and there's no difference between Count and TF-IDF.

### Random Forest

**`Models/random-forest.ipynb`**

The most complicated model type, and by far the most resource intensive. To that end, I was only able to run RF model based on unigrams and had to settle for a 50k sample. I'll keep trying the others, but I'm not sure if this is a good use of my time tbh.

| Max Depth | # Estimators | Accuracy | F1 Score |
|-----------|--------------|----------|----------|
| 20        | 50           | 74.46745 | 64.25268 |
|           | 100          | 73.90739 | 62.92680 |
| None      | 50           | 83.97840 | 82.53333 |
|           | 100          | 83.65837 | 81.93426 |

---

## Attempts

### Attempt 1

**`attempts/pausers.ipnyb`**

Constraints:

* Took 15k sample (I believe I'm limited by laptop specs Sadge)
* Performed barebones preprocessing
  * Drop empty comments or comments with relatively few words
  * Remove HTML codes, URLs, phone numbers, and email addresses
  * Remove non-alphabetic characters
  * Replace any triple occurence with a single
  * Lowercase comment
* Used features consisting of both unigrams and bigrams
* Used chi squared for selecting the top quarter of relevant features

| Accuracy | F1 Score |
| -------- | -------- |
| 91.21246 | 90.74001 |

Got some pretty good results, but small sample size has me worried tbh

### Attempt 2

**`attempts/attempt-2.ipynb`**

Constraints:

* Took 15k sample
* Performed barebones preprocessing
  * Drop empty comments or comments with relatively few words
  * Remove HTML codes, URLs, phone numbers, and email addresses
  * Remove non-alphabetic characters
  * Replace any triple occurence with a single
  * Lowercase comment
* Used features consisting of both unigrams and bigrams
* Used *professor-based* train-test split
* `CountVectorizer` limited to 5k features

| Accuracy | F1 Score |
| -------- | -------- |
| 87.86168 | 88.24339 |

Not-insignificant decrease, but to be somewhat expected considering the lack of feature selection. Next try will incorporate chi squared to that end.

### Attempt 3
