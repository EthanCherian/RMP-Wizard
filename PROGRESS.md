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

For all models, train size was set to 80%, test to 20%

1. **Naive Bayes** :: `models/naive-bayes.ipynb`
    * Use Multinomial Naive Bayes based on unigrams, bigrams, and unigrams and bigrams to predict sentiment
2. **Logistic Regression** :: `models/log-reg.ipynb`
    * Use Logistic Regression
3. **Random Forest** :: `models/random-forest.ipynb`
    * Use Random Forest
