# Progress so far
---
## Preprocessing ##

**preprocessing.ipynb**

1. Read scraped comments CSV file and parse dates so `'date'` column has type `datetime64` rather than `object` (aka `string`)
2. Drop reviews with: empty comments, comments consisting of string `"No Comments"`, or comments with 5 or fewer words
    * Reset indices of dataframe as well, dropping these will leave gaps in indices that can cause problems in following steps
3.  *Regex Stuff*, mostly courtesy of Dien, performed on each comment in dataframe
    * Remove HTML codes
      * Code for question mark often evades previous line, so remove it here
    * Remove links, phone numbers, and email addresses
    * Remove any characters that are not letters (uppercase or lowercase) or spaces
    * Remove any numbers with more than 4 digits **!!uhh, shouldn't this happen before above!!**
    * Remove any extraneous spaces created by above steps
    * Lowercase entire comment
4. Not quite sure to what extent we want to do this, but list of stopwords provided by spaCy includes some words we want to keep, so ensure those words remain by amending `STOP_WORDS` here
5. *Tokenization, Lemmatization, Stop Word Removal*
    * Kinda complicated tbh, but broadly:
      * `lemma_list` = list of every token's lemma (lowercased) in a given comment that isn't included in the list of stopwords
      * `preproc_pipe` = list of lists, where inner lists are comprised of each comment's `lemma_list`
6. Drop unnecessary columns and create new `cleanedComment` column for results of `preproc_pipe` corresponding to their original comment
7. Create new `sentiment` column using `clarityRating` as a tentative indicator of a comment's sentiment
    * Considering two different versions of `sentiment` column, will decide as we go along
      * Binary, where every review over 2.5 stars is considered positive and every less is negative
      * Ternary, where a review of 3 stars is neutral, more is positive, and less is negative
8. (Optional) Write dataframe to a new CSV file, so this code doesn't have to be run every time

For a slightly less optimal version of this code, step *5* took ~4 hours to run with the full dataset we currently have, so I think we'd be lucky if this took ~3.5 hours with the slightly faster code.

---

## Models
