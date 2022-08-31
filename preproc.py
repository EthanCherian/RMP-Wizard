import pandas as pd
from sklearn.base import BaseEstimator, TransformerMixin
from corpora import EMOTICONS, STOPWORDS
import re

# https://towardsdatascience.com/pipelines-custom-transformers-in-scikit-learn-the-step-by-step-guide-with-python-code-4a7d9b068156

def convert_emoticons(text):
  return EMOTICONS.get(text, text)

def remove_urls(text):
    return re.sub(r'https?://\S+|www\.\S+', ' ', text)

def remove_phones(text):
    return re.sub(r'\d{3}-\d{3}-\d{4}', ' ', text)

def remove_emails(text):
    return re.sub(r'[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+', ' ', text)

def remove_html_entities(text):
    text = re.sub('&[0-9a-zA-Z#]+;', ' ', text)
    return re.sub('&#63;?', '', text)

def remove_html_tags(text):
    return re.sub('<.{1,6}?>', ' ', text)

class Preproc(BaseEstimator, TransformerMixin):
    # stopwords = ["the", "an", "i", "a", "and", "but", "words", "here"]
    preproc_comments = []

    def __init__(self):
        pass

    def preproc(self, reviews: pd.DataFrame, sentiment=None):
        print("Entering preprocessing")
        comments_proper = []
        X_ = reviews.copy()

        for index, review in X_.iterrows():
            comment = review['comment']
            fname = review['firstName'].lower().split(' ')
            lname = review['lastName'].lower().split(' ')
            names = set(fname + lname)

            comment = remove_urls(comment)
            comment = remove_phones(comment)
            comment = remove_emails(comment)
            comment = remove_html_entities(comment)
            comment = remove_html_tags(comment)

            comment_split = comment.split(' ')
            new_comment_split = []
            for i, word in enumerate(comment_split):
                word = convert_emoticons(word)
                word = word.lower()
                word = re.sub("[^a-zA-Z\s]+", ' ', word)    # replace characters that are not alphabetic, space, or underscore
                word = re.sub(r'(.)\1\1+', '\g<1>', word)   # replace any three character+ sequence with one
                word = re.sub('\s+', ' ', word)
                word = word.strip()                         # trailing whitespace because punctuation replaced by space
                new_comment_split.extend(word.split(' '))

            # Remove names from the comment
            for i, word in enumerate(new_comment_split):
                if word in names:
                    new_comment_split[i] = ''               # remove professor first and last name

            comment = ' '.join(new_comment_split)
            comment = re.sub('\s+', ' ', comment)
            comment = comment.strip()

            comment = ' '.join(word for word in comment.split() if len(word) > 1 and word not in STOPWORDS)

            comments_proper.append(comment)

        self.preproc_comments = comments_proper
        return comments_proper
    
    # below methods are used to ensure that preproc class can be used as a step in sklearn.pipeline.Pipeline
    # unsure which methods it actually uses, will have to check it out
    def fit(self, X, y=None):
        return self
    
    def transform(self, X, y=None):
        return self.preproc(X)
    
    # def fit_transform(self, reviews: pd.DataFrame, sentiment=None):
    #     return self.preproc(reviews)