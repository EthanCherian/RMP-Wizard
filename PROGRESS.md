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

All models used 4000 max features for sake of time efficiency

|                | Accuracy | F1 Score |
|----------------|----------|----------|
| Unigram        | 85.54214 | 85.58620 |
| Bigram         | 83.73709 | 83.58267 |
| Unigram+Bigram | 85.80465 | 86.11170 |

### Logistic Regression

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

For some reason, accuracy and MRR are always equal. Also, count and TF-IDF are identical
