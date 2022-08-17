# Progress so far
---
## Preprocessing ##

[**`preprocessing.ipynb`**](https://github.com/EthanCherian/RMP/blob/main/preprocessing.ipynb "preprocessing")

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

[**`Models/naive-bayes.ipynb`**](https://github.com/EthanCherian/RMP/blob/main/Models/naive-bayes.ipynb "Naive Bayes model")

All models used 4000 max features for sake of time efficiency

|                | Accuracy | F1 Score |
|----------------|----------|----------|
| Unigram        | 85.54214 | 85.58620 |
| Bigram         | 83.73709 | 83.58267 |
| Unigram+Bigram | 85.80465 | 86.11170 |

#### After using Chi Squared for feature selection

[**`Models/chi-squared.ipynb`**](https://github.com/EthanCherian/RMP/blob/main/Models/chi-squared.ipynb "Naive Bayes + Chi Squared")

Select top 25% of features in 20k sample

|                | Accuracy | F1 Score |
|----------------|----------|----------|
| Unigram        | 87.16000 | 87.11392 |
| Bigram         | 81.80000 | 78.78603 |
| Unigram+Bigram | 90.17500 | 89.56781 |

We finally pass 90% accuracy :)

### Logistic Regression

[**`Models/log-reg.ipynb`**](https://github.com/EthanCherian/RMP/blob/main/Models/log-reg.ipynb "Logistic Regression Model")

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

[**`Models/random-forest.ipynb`**](https://github.com/EthanCherian/RMP/blob/main/Models/random-forest.ipynb "Random Forest Model (limited)")

The most complicated model type, and by far the most resource intensive. To that end, I was only able to run RF model based on unigrams and had to settle for a 50k sample. I'll keep trying the others, but I'm not sure if this is a good use of my time tbh.

| Max Depth | # Estimators | Accuracy | F1 Score |
|-----------|--------------|----------|----------|
| 20        | 50           | 74.46745 | 64.25268 |
|           | 100          | 73.90739 | 62.92680 |
| None      | 50           | 83.97840 | 82.53333 |
|           | 100          | 83.65837 | 81.93426 |

### Support Vector Machine (SVM)

[**`Models/svm-ipynb`**](https://github.com/EthanCherian/RMP/blob/main/Models/svm.ipynb "Support Vector Machine model")

Used TF-IDF vectorization with 7000 max features on 200k sample.

|                | Accuracy | F1 Score |
|----------------|----------|----------|
| Unigram        | 86.66683 | 91.13486 |
| Bigram         | 84.87174 | 90.16018 |
| Unigram+Bigram | 87.63938 | 91.73465 |

Thoroughly unimpressive results honestly :/

---

## Attempts

All attempts save for the first were run using a separate scrape of comments that allowed for splitting by professor. To test for overfitting, the best models were additionally run on a sample from the original scrape as well. This was accomplished in [`pred-test.ipynb`](https://github.com/EthanCherian/RMP/blob/main/pred-test.ipynb), and results are shown when applicable.

### Attempt 1

[**`attempts/pausers.ipnyb`**](https://github.com/EthanCherian/RMP/blob/main/attempts/pausers.ipynb "First attempt")

Constraints:

* Took 15k sample
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

[**`attempts/attempt-2.ipynb`**](https://github.com/EthanCherian/RMP/blob/main/attempts/attempt-2.ipynb "Second attempt")

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

Not-insignificant decrease, but to be somewhat expected considering the lack of feature selection. Next try will incorporate chi squared to show thusly.

### Attempt 3

[**`attempts/attempt-3.ipynb`**](https://github.com/EthanCherian/RMP/blob/main/attempts/attempt-3.ipynb "Third attempt")

* Took 15k sample
* Performed barebones preprocessing
  * Drop empty comments or comments with relatively few words
  * Remove HTML codes, URLs, phone numbers, and email addresses
  * Remove non-alphabetic characters
  * Replace any triple occurence with a single
  * Lowercase comment
* Used features consisting of both unigrams and bigrams
* Used professor-based train-test split
* Used chi squared for selecting the top quarter of relevant features

| Input data from | Accuracy | F1 Score |
|:---------------:|----------|----------|
| New scrape      | 93.44046 | 93.22968 |
| Original scrape | 86.29621 | 85.30637 |

Our best performance by a good bit~

### Attempt 4

[**`attempts/attempt-4.ipynb`**](https://github.com/EthanCherian/RMP/blob/main/attempts/attempt-4.ipynb "Fourth attempt")

* Took 25k sample
* Performed almost full preprocessing
  * Drop empty comments or comments with relatively few words
  * Remove HTML codes, URLs, phone numbers, and email addresses
  * Remove non-alphabetic characters
  * Replace any triple occurence with a single
  * *Lemmatize and remove stopwords*
  * Lowercase comment
* Used features consisting of both unigrams and bigrams
* Used professor-based train-test split
* Used chi squared for selecting the top quarter of relevant features

| Accuracy | F1 Score |
| -------- | -------- |
| 91.29066 | 90.63802 |

For some reason, full preprocessing actually worsens our model, which doesn't make sense based on how NLP is supposed to work. This requires further investigation...

### Attempt 5

[**`attempts/attempt-5.ipynb`**](https://github.com/EthanCherian/RMP/blob/main/attempts/attempt-5.ipynb "Fifth attempt")

* Took 25k sample
* Performed barebones preprocessing
  * Drop empty comments or comments with relatively few words
  * Remove HTML codes, URLs, phone numbers, and email addresses
  * Remove non-alphabetic characters
  * Replace any triple occurence with a single
  * Lowercase comment
* Used features consisting of both unigrams and bigrams
* Used professor-based train-test split
* Used chi squared for selecting the top quarter of relevant features
* *Used average of `helpfulRating` and `clarityRating`* columns to determine actual star value
  * Sentiment based on this average instead

| Input data from | Accuracy | F1 Score |
|:---------------:|----------|----------|
| New scrape      | 93.76185 | 93.58414 |
| Original scrape | 87.27402 | 86.51325 |

Effectively same as `attempt-3`, with which it shares most attributes. The logical conclusion, then, is that determining the actual star value (via averaging) doesn't significantly improve the model.

### Attempt 6

[**`attempts/attempt-6.ipynb`**](https://github.com/EthanCherian/RMP/blob/main/attempts/attempt-6.ipynb "Sixth (last?) attempt")

* Took 25k sample
* Performed barebones preprocessing
  * Drop empty comments or comments with relatively few words
  * Remove HTML codes, URLs, phone numbers, and email addresses
  * Remove non-alphabetic characters
  * Replace any triple occurence with a single
  * Lowercase comment
* Used features consisting of both unigrams and bigrams
* Used professor-based train-test split
* Used chi squared for selecting the top quarter of relevant features
* Used average of `helpfulRating` and `clarityRating` columns to determine actual star value
  * Sentiment based on this average instead
* *Dropped 3 star reviews*

| Input data from | Accuracy | F1 Score |
|:---------------:|----------|----------|
| New scrape      | 94.92477 | 94.80281 |
| Original scrape | 88.40393 | 88.02801 |

Best yet, but only marginally, and I'm honestly not convinced that removing middling reviews will be beneficial in the long run. In the interest of time, this may be the model that we end up running with, though I'm sure we'll eventually find ways to improve it.

### Attempt 7

[**`attempts/log-reg-attempt.ipynb`**](https://github.com/EthanCherian/RMP/blob/main/attempts/log-reg-attempt.ipynb "Logistic regression attempt")

* Took 25k sample
* Performed barebones preprocessing
  * Drop empty comments or comments with relatively few words
  * Remove HTML codes, URLs, phone numbers, and email addresses
  * Remove non-alphabetic characters
  * Replace any triple occurence with a single
  * Lowercase comment
* Used features consisting of both unigrams and bigrams
* Used professor-based train-test split
* Used chi squared for selecting the top quarter of relevant features
* Used average of `helpfulRating` and `clarityRating` columns to determine actual star value
  * Sentiment based on this average instead
* Dropped 3 star reviews
* *Used logistic regression model rather than naive bayes as all previous attempts have*

| Input data from | Accuracy | F1 Score |
|:---------------:|----------|----------|
| New scrape      | 91.53380 | 91.35359 |
| Original scrape | 87.94975 | 87.80400 |

It was worth trying logistic regression, and tbh its accuracy on originally scraped data is admirable. That said, the drop in accuracy on test data is discouraging and means it probably won't get used that much lol.

### Attempt 8

[**`attempts/svm-attempt.ipynb`**](https://github.com/EthanCherian/RMP/blob/main/attempts/svm-attempt.ipynb "SVM attempt")

* Took 20k sample
* Performed barebones preprocessing
  * Drop empty comments or comments with relatively few words
  * Remove HTML codes, URLs, phone numbers, and email addresses
  * Remove non-alphabetic characters
  * Replace any triple occurence with a single
  * Lowercase comment
* Used features consisting of both unigrams and bigrams
* Used professor-based train-test split
* Used chi squared for selecting the top quarter of relevant features
* Used average of `helpfulRating` and `clarityRating` columns to determine actual star value
  * Sentiment based on this average instead
* Dropped 3 star reviews
* *Used SVM model*

| Input data from | Accuracy | F1 Score |
|:---------------:|----------|----------|
| New scrape      | 91.94856 | 91.65182 |
| Original scrape | 89.74018 | 89.42577 |

Yooo, SVM seems to result in the lowest amount of overfitting, resulting in a better performance on data from the original scrape. BUT, its performance in testing is not great, outperformed pretty handily by most serious naive bayes attempts.
